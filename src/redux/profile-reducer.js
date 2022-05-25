import { usersAPI, profileAPI } from '../api/api'

//action types
const ADD_POST_TO_STATE = 'ADD-POST-TO-STATE'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
    { id: 2, message: "It's my first post", likesCount: '20 likes' },
  ],
  profile: null,
  status: '',
}

//преобразование state
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    //метод для создания нового поста в ленте
    case ADD_POST_TO_STATE: {
      //делаем поверхностную копию стейта
      return {
        ...state,
        //делаем глубокую копию стейта (с массивом), так как мы планируем менять этот массив
        posts: [
          ...state.posts,
          //добавляем в массив постов новый пост
          {
            id: 5,
            message: action.payload.newPostText,
            likesCount: '0 likes',
          },
        ],
      }
    }
    //если тип экшена SET_USER_PROFILE, то мы вернем копию стейта в которой поменяем профайл на профайл из экшена
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile }
    }
    case SET_STATUS: {
      return { ...state, status: action.status }
    }
    //редюсер обработает этот тип экшена и в профайле поменяет фото
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } }
    default:
      return state
  }
}

//ActionCreator - это ф-я,которая возвращает объект action: { type: SET_USER_PROFILE, profile }.
//action это объект в котоом инкапсулированы все данные,чтобы редюсер получил этот action и примнил изменения на свой стейт
//SET_USER_PROFILE это навание действия - что нужно сделать, profile - где нужно сделать
export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST_TO_STATE,
  payload: {
    newPostText,
  },
})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatusAction = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

//ThunkCreator
export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId)
  //тогда добавляем данные с сервера (которые теперь находятся в response), в reducer под названием setUserProfile
  //найти в пропсах экшион - setUserProfile и добавить из response данные в него, чтобы отправить
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(setStatusAction(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatusApi(status)
  //если ошибки нет(ошибка в случае 1) тогда показать статус
  if (response.data.resultCode === 0) {
    dispatch(setStatusAction(status))
  }
}
export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  //если ошибки нет(ошибка в случае 1) тогда передать фото из респонса редюсеру
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}
export const saveProfile = (profile, setStatus) => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const response = await profileAPI.saveProfile(profile)
  //необходимо заново вызвать профиль, после обновления данных
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    setStatus({ error: response.data.messages })
    return Promise.reject(response.data.messages)
  }
}

export default profileReducer

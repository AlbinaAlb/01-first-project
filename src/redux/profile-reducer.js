import { usersAPI, profileAPI } from '../api/api'

//action types
const ADD_POST_TO_STATE = 'ADD-POST-TO-STATE'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

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
  //метод для создания нового поста в ленте
  switch (action.type) {
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
export const setStatus = (status) => ({ type: SET_STATUS, status })

//ThunkCreator
export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((response) => {
    //тогда добавляем данные с сервера (которые теперь находятся в response), в reducer под названием setUserProfile
    //найти в пропсах экшион - setUserProfile и добавить из response данные в него, чтобы отправить
    dispatch(setUserProfile(response.data))
  })
}
export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data))
  })
}
export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    //если ошибки нет(ошибка в случае 1) тогда показать статус
    if(response.data.resultCode === 0){
      dispatch(setStatus(status))
    }
  })
}

export default profileReducer

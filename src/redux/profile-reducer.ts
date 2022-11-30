import { ThunkAction } from 'redux-thunk'
import { usersAPI, profileAPI } from '../api/api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { AppStateType } from './redux-store'

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
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
}

export type InitialStateType = typeof initialState

//преобразование state
const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    //метод для создания нового поста в ленте
    case ADD_POST_TO_STATE: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: '0 likes',
      }
      //делаем поверхностную копию стейта
      return {
        ...state,
        //делаем глубокую копию стейта (с массивом), так как мы планируем менять этот массив
        posts: [...state.posts, newPost],
        newPostText: '',
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
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state
  }
}

type ActionsTypes =
  | AddPostActionCreatorType
  | SetUserProfileActionType
  | SetStatusActionType
  | SavePhotoSuccessActionType

type AddPostActionCreatorType = {
  type: typeof ADD_POST_TO_STATE
  newPostText: string
}
export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorType => ({
  type: ADD_POST_TO_STATE,
  newPostText,
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatusAction = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

//ThunkCreator
export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    //тогда добавляем данные с сервера (которые теперь находятся в response), в reducer под названием setUserProfile
    //найти в пропсах экшион - setUserProfile и добавить из response данные в него, чтобы отправить
    dispatch(setUserProfile(response.data))
  }

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatusAction(response.data))
  }

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatusApi(status)
    //если ошибки нет(ошибка в случае 1) тогда показать статус
    if (response.data.resultCode === 0) {
      dispatch(setStatusAction(status))
    }
  }
export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    //если ошибки нет(ошибка в случае 1) тогда передать фото из респонса редюсеру
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos))
    }
  }
export const saveProfile =
  (profile: ProfileType, setStatus: any): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId
    if (!userId) return
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

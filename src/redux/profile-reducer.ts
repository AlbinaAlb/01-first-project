import { profileAPI } from '../api/profile-api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'

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

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD-POST-TO-STATE': {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: '0 likes',
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      }
    }
    case 'SN/PROFILE/SET_USER_PROFILE': {
      return { ...state, profile: action.profile }
    }
    case 'SN/PROFILE/SET_STATUS': {
      return { ...state, status: action.status }
    }
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'SN/PROFILE/ADD-POST-TO-STATE',
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'SN/PROFILE/SET_USER_PROFILE',
      profile,
    } as const),
  setStatusAction: (status: string) =>
    ({
      type: 'SN/PROFILE/SET_STATUS',
      status,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
}

//ThunkCreator
export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
  }

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatusAction(data))
  }

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.updateStatusApi(status)
    if (data.resultCode === 0) {
      dispatch(actions.setStatusAction(status))
    }
  }

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
    }
  }

export const saveProfile =
  (profile: ProfileType, setStatus: any): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId
    if (!userId) return
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId))
    } else {
      setStatus({ error: data.messages })
      return Promise.reject(data.messages)
    }
  }

export default profileReducer
type ActionsTypes = InferActionsTypes<typeof actions>
//для типизации ThunkCreator
type ThunkType = BaseThunkType<ActionsTypes>

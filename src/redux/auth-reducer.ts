import { ResultCodeForCaptchaEnum, ResultCodesEnum } from '../api/api'
import { authAPI } from '../api/auth-api'
import { secutityAPI } from '../api/secutity-api'
import { BaseThunkType, InferActionsTypes } from './redux-store'

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}
export type InitialStateType = typeof initialState

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SN/AUTH/SET_USER_DATA':
    case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
      return {
        //копируем стейт и в нем перезатираются id, email, login на те что будут указаны в action.data
        ...state,
        //в action создаем payload в котором будут id, email, login
        ...action.payload,
      }
    default:
      return state
  }
}

export const actions = {
  //ActionCreator, его задача вернуть объект action, который потом будет задиспатчен в reducer
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'SN/AUTH/SET_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: any) =>
    ({
      type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS',
      payload: { captchaUrl },
    } as const),
}

//ThunkCreator
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me()
  //если в дате resultCode = 0, значит мы залогинены на сервере
  if (meData.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = meData.data
    //тогда задиспатчить авторизационные данные из AC в store
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
    setStatus: any
  ): ThunkType =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    //если в дате resultCode = 0, значит мы залогинены на сервере и тогда залогиниться на нашем сайте
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      setStatus({ error: data.messages })
    }
  }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await secutityAPI.getCaptchaUrl()
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export default authReducer
type ActionsTypes = InferActionsTypes<typeof actions>
//для типизации ThunkCreator
type ThunkType = BaseThunkType<ActionsTypes>

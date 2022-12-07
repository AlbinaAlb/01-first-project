import { authAPI, ResultCodeForCaptcha, ResultCodesEnum, secutityAPI } from '../api/api'
const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = typeof initialState

//объект со стартовыми данными. Эти данные придут из action
let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}

//преобразование state путем получения данных с сервера
const authReducer = (state = initialState, action: any): InitialStateType => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
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

type SetAuthUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}

//ActionCreator, его задача вернуть объект action, который потом будет задиспатчен в reducer
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
})

export const getCaptchaUrlSuccess = (captchaUrl: any) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
})

//ThunkCreator
export const getAuthUserData = () => async (dispatch: any) => {
  const meData = await authAPI.me()
  //если в дате resultCode = 0, значит мы залогинены на сервере
  if (meData.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = meData.data
    //тогда задиспатчить авторизационные данные из AC в store
    dispatch(setAuthUserData(id, email, login, true))
  }
}

//thunk для логинизации
export const login =
  (email: string, password: string, rememberMe: boolean, setStatus: any, captcha: string) =>
  async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    //если в дате resultCode = 0, значит мы залогинены на сервере и тогда залогиниться на нашем сайте
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
      } 

      //let message = data.messages.length > 0 ? data.messages[0] : "Some Error" 
      //setStatus('login', { _error: message })
      setStatus({ error: data.messages })
    }
  }

export const getCaptchaUrl = () => async (dispatch: any) => {
  let response = await secutityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer

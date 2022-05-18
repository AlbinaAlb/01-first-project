import { authAPI, secutityAPI } from '../api/api'
const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

//объект со стартовыми данными. Эти данные придут из action
let initialState = {
  userId: null,
  email: null,
  login: null,
  //авторизация отсутствует
  isAuth: false,
  captchaUrl: null
}

//преобразование state путем получения данных с сервера
const authReducer = (state = initialState, action) => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        //копируем стейт и в нем перезатираются id, email, login на те что будут указаны в action.data
        ...state,
        //в action создаем payload в котором будут id, email, login, isAuth, captchaUrl
        ...action.payload,
      }
    default:
      return state
  }
}

//ActionCreator, его задача вернуть объект action, который потом будет задиспатчен в reducer
export const setAuthUserData = (userId, email, login, isAuth, captchaUrl) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth, captchaUrl },
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl }
})

//ThunkCreator
export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me()
      //если в дате resultCode = 0, значит мы залогинены на сервере
      if (response.data.resultCode === 0) {
        const { id, email, login } = response.data.data
        //тогда задиспатчить авторизационные данные из AC в store
        dispatch(setAuthUserData(id, email, login, true))
      }
    }

  //thunk для логинизации
export const login = (email, password, rememberMe, setStatus) => async (dispatch) => {
// const isAuthenticated = selectors.isAuthenticated(getState())
  const response = await authAPI.login(email, password, rememberMe)
    //если в дате resultCode = 0, значит мы залогинены на сервере и тогда залогиниться на нашем сайте
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      //если код ошибки 10, значит диспатчим каптчу, которая загрузит картинку для проверки
      if(response.data.resultCode ===10) {
        dispatch(getCaptchaUrl())
      }
      setStatus({ error: response.data.messages })
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await secutityAPI.getCaptchaUrl()
  //запрос возвращает url каптчи
  const captchaUrl = response.data.url 
  dispatch(getCaptchaUrlSuccess(captchaUrl))
  }

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData(setAuthUserData(null, null, null, false, null)))
    }
}

export default authReducer

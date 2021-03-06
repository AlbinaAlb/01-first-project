import { authAPI } from '../api/api'
const SET_USER_DATA = 'SET_USER_DATA'

//объект со стартовыми данными. Эти данные придут из action
let initialState = {
  userId: null,
  email: null,
  login: null,
  //авторизация отсутствует
  isAuth: false
}

//преобразование state путем получения данных с сервера
const authReducer = (state = initialState, action) => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    case SET_USER_DATA:
      return {
        //копируем стейт и в нем перезатираются id, email, login на те что будут указаны в action.data
        ...state,
        //в action создаем payload в котором будут id, email, login
        ...action.payload
      }
    default:
      return state
  }
}

//ActionCreator, его задача вернуть объект action, который потом будет задиспатчен в reducer
export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
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
    } else{
      setStatus({ error: response.data.messages })
    }
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData(setAuthUserData(null, null, null, false)))
    }
}

export default authReducer

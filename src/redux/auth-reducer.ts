import { authAPI } from '../api/api'
const SET_USER_DATA = 'SET_USER_DATA'

export type InitialStateType = typeof initialState

//объект со стартовыми данными. Эти данные придут из action
let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
}

//преобразование state путем получения данных с сервера
const authReducer = (state = initialState, action: any): InitialStateType => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    case SET_USER_DATA:
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

//ThunkCreator
export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.me()
  //если в дате resultCode = 0, значит мы залогинены на сервере
  if (response.data.resultCode === 0) {
    const { id, email, login } = response.data.data
    //тогда задиспатчить авторизационные данные из AC в store
    dispatch(setAuthUserData(id, email, login, true))
  }
}

//thunk для логинизации
export const login =
  (email: string, password: string, rememberMe: boolean, setStatus: any) => async (dispatch:any) => {
    // const isAuthenticated = selectors.isAuthenticated(getState())
    const response = await authAPI.login(email, password, rememberMe)
    //если в дате resultCode = 0, значит мы залогинены на сервере и тогда залогиниться на нашем сайте
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      setStatus({ error: response.data.messages })
    }
  }

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer

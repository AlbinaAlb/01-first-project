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
        //в action создаем data в котором будут id, email, login
        ...action.data,
        isAuth: true
      }
    
    default:
      return state
  }
}

//ActionCreator, его задача вернуть объект action, который потом будет задиспатчен в reducer
export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: {userId, email, login} })
export default authReducer

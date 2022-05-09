//Инициализация приложения (Приведение программы или устройства в состояние готовности к использованию)
import { getAuthUserData } from '../FormValidation/auth-reducer'
const INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

//объект со стартовыми данными. Эти данные придут из action
let initialState = {
  initialized: false,
}

//преобразование state путем получения данных с сервера
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALISED_SUCCESS:
      return {
        //копируем стейт и меняем initialized
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

export const initializedSuccess = () => ({
  type: INITIALISED_SUCCESS,
})

//ThunkCreator
//если мы залогинены, то запустить приложение (инициализировать)
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  //когда все промисы из getAuthUserData зарезолвятся(закончатся асинх.операции), тогда диспатчим initializedSuccess
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
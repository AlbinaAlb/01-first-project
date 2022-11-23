//Инициализация приложения (Приведение программы или устройства в состояние готовности к использованию)
import { getAuthUserData } from './auth-reducer'
const INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

export type InitialStateType = {
  initialized: boolean
}

//объект со стартовыми данными. Эти данные придут из action
let initialState: InitialStateType = {
  initialized: false,
}

//преобразование state путем получения данных с сервера
const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALISED_SUCCESS:
      return {
        //копируем стейт и меняем initialized
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

type InitializedSuccessActionType = {
  type: typeof INITIALISED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALISED_SUCCESS,
})

//ThunkCreator
//если мы залогинены, то запустить приложение (инициализировать)
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  //когда все промисы из getAuthUserData зарезолвятся(закончатся асинх.операции), тогда диспатчим initializedSuccess
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
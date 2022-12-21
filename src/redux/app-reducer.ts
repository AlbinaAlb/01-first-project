//Инициализация приложения (Приведение программы или устройства в состояние готовности к использованию)
import { getAuthUserData } from './auth-reducer'
import { InferActionsTypes } from './redux-store'

let initialState = {
  initialized: false,
}
export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALISED_SUCCESS':
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

//ActionCreators
export const actions = {
  initializedSuccess: () => ({ type: 'SN/APP/INITIALISED_SUCCESS' } as const),
}

//ThunkCreator
//если мы залогинены, то запустить приложение (инициализировать)
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  //когда все промисы из getAuthUserData зарезолвятся(закончатся асинх.операции), тогда диспатчим initializedSuccess
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default appReducer
type ActionsTypes = InferActionsTypes<typeof actions>

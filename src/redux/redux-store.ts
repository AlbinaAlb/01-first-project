import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Action,
} from 'redux'

import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

//объединить в этой ф-и все редюсеры (профиль, диалогии, сайдбар)
//воспринимать не как объект,а как стейт
let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
})

//Анализирует rootReducer и создает для него тип
type RootReducerType = typeof rootReducer
//ReturnType определяет тип возвращаемый из RootReducerType
export type AppStateType = ReturnType<RootReducerType>

//InferActionsTypes - это условный тип(дженерик)
 export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U: never

 //для типизации ThunkCreator
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//createStore создает внутри себя store со свойствами редюсерами
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
//@ts-ignore
window.__store__ = store

export default store

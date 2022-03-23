import { createStore, combineReducers, applyMiddleware } from 'redux'

import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk'

//объединить в этой ф-и все редюсеры (профиль, диалогии, сайдбар)
//воспринимать не как объект,а как стейт
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
})
//createStore создает внутри себя store со свойствами редюсерами
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store

export default store

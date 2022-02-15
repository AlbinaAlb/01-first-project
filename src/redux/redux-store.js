import { createStore, combineReducers } from 'redux'

import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'

//объединить в этой ф-и все редюсеры (профиль, диалогии, сайдбар)
//воспринимать не как объект,а как стейт
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer
})
//createStore создает внутри себя store со свойствами редюсерами
const store = createStore(reducers)

window.store = store

export default store

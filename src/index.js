import './index.css'
import store from './redux/redux-store'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MainJSApp from './App'

//ф-я занимается перерисовкой всего дерева
let renderEntireTree = () => {
  ReactDOM.render(
    <MainJSApp />,
    document.getElementById('root')
  )
}

renderEntireTree(store.getState())

//каждый раз когда стейт изменяется - подписчик срабатывает, нужно запросить у store новый стейт
//с помощью анонимной ф-и передаем дереву новый стейт,взятый из store
store.subscribe(() => {
  let state = store.getState()
  renderEntireTree(state)
})

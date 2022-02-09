import './index.css'
import store from './redux/redux-store'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

//ф-я занимается перерисовкой всего дерева
let renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        state={state}
        dispatch={store.dispatch.bind(store)}
        store={store}
        /*         addMessageToState={store.addMessageToState.bind(store)}
        updateNewPostText={store.updateNewPostText.bind(store)}
        updateNewMessageText={store.updateNewMessageText.bind(store)} */
      />
    </BrowserRouter>,
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

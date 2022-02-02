import './index.css';
import store from './redux/state'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

//ф-я занимается перерисовкой всего дерева
let renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        state={state}
        addPostToState={store.addPostToState.bind(store)}
        addMessageToState={store.addMessageToState.bind(store)}
        updateNewPostText={store.updateNewPostText.bind(store)}
        updateNewMessageText={store.updateNewMessageText.bind(store)}
      />
    </BrowserRouter>,
    document.getElementById('root')
  )
}
reportWebVitals()

renderEntireTree(store.getState())

store.subscribe(renderEntireTree)

import './index.css';
import state, {subscribe} from './redux/state'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

import {
  addPostToState,
  addMessageToState,
  updateNewPostText,
  updateNewMessageText
} from './redux/state'

//ф-я занимается перерисовкой всего дерева
let renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        state={state}
        addPostToState={addPostToState}
        addMessageToState={addMessageToState}
        updateNewPostText={updateNewPostText}
        updateNewMessageText={updateNewMessageText}
      />
    </BrowserRouter>,
    document.getElementById('root')
  )
}
reportWebVitals()

renderEntireTree(state)

subscribe(renderEntireTree)

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

  //типа данные с сервера в виде массива объектов
  let posts = [
    { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
    { id: 2, message: "It's my first post", likesCount: '20 likes' },
  ]
  let dialogs = [
    { id: 1, name: 'Dmitriy', lastname: 'Albinovych' },
    { id: 2, name: 'Serhey', lastname: 'Polunov' },
    { id: 3, name: 'Vladislav', lastname: 'Ivanov' },
    { id: 4, name: 'Elizaveta', lastname: 'Artemenko' },
    { id: 5, name: 'Oleh', lastname: 'Diyanov' },
    { id: 6, name: 'Alyona', lastname: 'Petrova' },
  ]
  let messages = [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Thank you!' },
    { id: 4, message: 'Lorem, ipsum dolor.' },
  ]

ReactDOM.render(
  <BrowserRouter>
    <App postsData={posts} dialogsData={dialogs} messagesData={messages} />
  </BrowserRouter>,
  document.getElementById('root')
)

reportWebVitals();

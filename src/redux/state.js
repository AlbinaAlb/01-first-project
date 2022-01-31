import { renderEntireTree } from "../render"

//типа данные с сервера в виде объекта массивов объектов
let state = {
  profilePage: {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
      { id: 2, message: "It's my first post", likesCount: '20 likes' },
    ],
  },
  dialogsPage: {
    dialogs: [
      { id: 1, name: 'Dmitriy', lastname: 'Albinovych' },
      { id: 2, name: 'Serhey', lastname: 'Polunov' },
      { id: 3, name: 'Vladislav', lastname: 'Ivanov' },
      { id: 4, name: 'Elizaveta', lastname: 'Artemenko' },
      { id: 5, name: 'Oleh', lastname: 'Diyanov' },
      { id: 6, name: 'Alyona', lastname: 'Petrova' },
    ],
    messages: [
      { id: 1, message: 'Hello' },
      { id: 2, message: 'How are you?' },
      { id: 3, message: 'Thank you!' },
      { id: 4, message: 'Lorem, ipsum dolor.' },
    ],
  },
  sidebar: {

  }
}

export let addPostToState = (postMessage) => {
  let newPost = {
    id: 5,
    message: postMessage,
    likesCount: '0 likes',
  }
  state.profilePage.posts.push(newPost)
  renderEntireTree(state)
}

export default state
let renderEntireTree = () =>{
  console.log('state changed');
}
//типа данные с сервера в виде объекта массивов объектов
let state = {
  profilePage: {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
      { id: 2, message: "It's my first post", likesCount: '20 likes' },
    ],
    newPostText: ''
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
    newMessageText: ''
  },
  sidebar: {

  }
}

//ф-я для создания нового поста в ленте
export const addPostToState = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: '0 likes',
  }
  //добавить новый пост
  state.profilePage.posts.push(newPost)
  //обнулить textarea после добавления поста
  state.profilePage.newPostText = ''
  renderEntireTree(state)
}

//ф-я для правильного изменения textarea, когда мы вводим текст
export const updateNewPostText = (newText) => {
  //меняем в state newPostText на введенное значение, которое прийдет в эту функцию через newText
  state.profilePage.newPostText = newText
  //и заново перерисовываем дерево
  renderEntireTree(state)
}

//ф-я для создания нового сообщения в ленте
export const addMessageToState = () => {
  let newMessage = {
    id: 5,
    message: state.dialogsPage.newMessageText,
  }
  //добавить ноое сообщение
  state.dialogsPage.messages.push(newMessage)
  //обнулить textarea после добавления сообщения
  state.dialogsPage.newMessageText = ''
  renderEntireTree(state)
}

//ф-я для правильного изменения textarea, когда мы вводим текст
export const updateNewMessageText = (newText) => {
  //меняем в state newMessageText на введенное значение, которое прийдет в эту функцию через newText
  state.dialogsPage.newMessageText = newText
  //и заново перерисовываем дерево
  renderEntireTree(state)
}

//вызываем дерево из index.js и меняем заглушку которую иы сделали раньше renderEntireTree на то что пришло в observer (на настоящее дерево)
export const subscribe = (observer) => {
renderEntireTree = observer
}

export default state

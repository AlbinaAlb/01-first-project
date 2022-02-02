let store = {
  //типа данные с сервера в виде объекта массивов объектов
  //объект
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
        { id: 2, message: "It's my first post", likesCount: '20 likes' },
      ],
      newPostText: '',
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
      newMessageText: '',
    },
    sidebar: {},
  },
  //метод возвращает _state, так как он является приватным
  getState() {
    return this._state
  },

  //метод заглушка
  _callSubscriber() {
    console.log('state changed')
  },

  //метод для создания нового поста в ленте
  addPostToState() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likesCount: '0 likes',
    }
    //добавить новый пост
    this._state.profilePage.posts.push(newPost)
    //обнулить textarea после добавления поста
    this._state.profilePage.newPostText = ''
    this._callSubscriber(this._state)
  },

  //метод для правильного изменения textarea, когда мы вводим текст
  updateNewPostText(newText) {
    //меняем в state newPostText на введенное значение, которое прийдет в эту функцию через newText
    this._state.profilePage.newPostText = newText
    //и заново перерисовываем дерево
    this._callSubscriber(this._state)
  },

  //метод для создания нового сообщения в ленте
addMessageToState() {
  let newMessage = {
    id: 5,
    message: this._state.dialogsPage.newMessageText,
  }
  //добавить ноое сообщение
  this._state.dialogsPage.messages.push(newMessage)
  //обнулить textarea после добавления сообщения
  this._state.dialogsPage.newMessageText = ''
  this._callSubscriber(this._state)
},

//метод для правильного изменения textarea, когда мы вводим текст
  updateNewMessageText(newText) {
  //меняем в state newMessageText на введенное значение, которое прийдет в эту функцию через newText
  this._state.dialogsPage.newMessageText = newText
  //и заново перерисовываем дерево
  this._callSubscriber(this._state)
},

//метод вызывает дерево из index.js и меняет заглушку которую мы сделали раньше this._callSubscriber на то что пришло в observer (на настоящее дерево)
subscribe(observer) {
this._callSubscriber = observer
}
}

export default store
window.store = store
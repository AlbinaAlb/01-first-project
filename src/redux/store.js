/* import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"

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
  //метод заглушка
  _callSubscriber() {
    console.log('state changed')
  },

  //getState и subscribe не относятся к методам которые меняют стейт
  //метод возвращает _state, так как он является приватным
  getState() {
    return this._state
  },
  //метод вызывает дерево из index.js и меняет заглушку которую мы сделали раньше this._callSubscriber на то что пришло в observer (на настоящее дерево)
  subscribe(observer) {
    this._callSubscriber = observer
  },

  //что бы не хотели поменять - в store использовать метод dispatch
  dispatch(action) {
    //передаем в редюсер текущий state и action. profilePage = новому зачению которое меняется в profileReducer
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)
    //уведомляем всех подписчиков когда происходит изменение
    this._callSubscriber(this._state)
  }
}

export default store
window.store = store
 */
const ADD_MESSAGE_TO_STATE = 'ADD-MESSAGE-TO-STATE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

//объект со стартовыми данными. В случае если в state у dialogsReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
  //метод для создания нового сообщения в диалогах
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      //создаем новый объект stateCopy, копируем все значения из старого state, но массив messages будет новый - т.е. будет меняться
      return  {
        ...state,
        //меняем в state newMessageText на введенное значение, которое прийдет в эту функцию через newText
        newMessageText: action.newText,
      }
    case ADD_MESSAGE_TO_STATE:
      let body = state.newMessageText
      return {
        ...state,
        newMessageText: '',
        messages: [...state.messages, { id: 5, message: body }],
      }
    default:
      return state
  }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE_TO_STATE })
export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: text,
})
export default dialogsReducer

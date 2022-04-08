const ADD_MESSAGE_TO_STATE = 'ADD-MESSAGE-TO-STATE'

//объект со стартовыми данными. В случае если в state у dialogsReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  dialogs: [
    { id: 1, name: 'Dmitriy', lastname: 'Albinovych' },
    { id: 2, name: 'Serhey', lastname: 'Polunov' },
    { id: 3, name: 'Vladislav', lastname: 'Ivanov' },
    { id: 4, name: 'Ulyana', lastname: 'Rublevskaya' },
    { id: 5, name: 'Aleksandr', lastname: 'Bocharnikov' },
    { id: 6, name: 'Yan', lastname: 'Bocharnikov' },
  ],
  messages: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Thank you!' },
    { id: 4, message: 'Lorem, ipsum dolor.' },
  ],
}

const dialogsReducer = (state = initialState, action) => {
  //метод для создания нового сообщения в диалогах
  switch (action.type) {
    case ADD_MESSAGE_TO_STATE:
      let body = action.payload.newMessageText
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: body }],
      }
    default:
      return state
  }
}

export const addMessageActionCreator = (newMessageText) => ({
  type: ADD_MESSAGE_TO_STATE,
  payload: {
    newMessageText,
  },
})
export default dialogsReducer

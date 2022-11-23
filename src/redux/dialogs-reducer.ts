const ADD_MESSAGE_TO_STATE = 'ADD-MESSAGE-TO-STATE'

export type InitialStateType = typeof initialState

//тип для объектов внутри стейта
type DialogType = {
  id: number,
  name: string,
  lastname:string
}

type MessageType = {
  id: number
  message: string
}

//объект со стартовыми данными. В случае если в state у dialogsReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  dialogs: [
    { id: 1, name: 'Dmitriy', lastname: 'Albinovych' },
    { id: 2, name: 'Serhey', lastname: 'Polunov' },
    { id: 3, name: 'Vladislav', lastname: 'Ivanov' },
    { id: 4, name: 'Ulyana', lastname: 'Rublevskaya' },
    { id: 5, name: 'Aleksandr', lastname: 'Bocharnikov' },
    { id: 6, name: 'Yan', lastname: 'Bocharnikov' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Thank you!' },
    { id: 4, message: 'Lorem, ipsum dolor.' },
  ] as Array<MessageType>,
}

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  //метод для создания нового сообщения в диалогах
  switch (action.type) {
    case ADD_MESSAGE_TO_STATE:
      let body = action.payload.newMessageText
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: body }]
      }
    default:
      return state
  }
}

type AddMessageActionCreatorType = {
  type: typeof ADD_MESSAGE_TO_STATE
  newMessageText: string
}

export const addMessageActionCreator = (newMessageText: string): AddMessageActionCreatorType => ({
  type: ADD_MESSAGE_TO_STATE,  newMessageText,
})
export default dialogsReducer

import { InferActionsTypes } from './redux-store'

type DialogType = {
  id: number
  name: string
  lastname: string
}

type MessageType = {
  id: number
  message: string
}

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
export type InitialStateType = typeof initialState

const dialogsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  //метод для создания нового сообщения в диалогах
  switch (action.type) {
    case 'SN/DIALOGS/ADD_MESSAGE_TO_STATE':
      let body = action.newMessageText
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: body }],
      }
    default:
      return state
  }
}

export const actions = {
  sendMessage: (newMessageText: string) =>
    ({
      type: 'SN/DIALOGS/ADD_MESSAGE_TO_STATE',
      newMessageText,
    } as const),
}

export default dialogsReducer
type ActionsTypes = InferActionsTypes<typeof actions>

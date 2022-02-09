import React from 'react'
import {
  addMessageActionCreator,
  updateNewMessageTextActionCreator,
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage

  //достаем из textarea введенное в него значение
  let onSendMessageClick = () => {
    props.store.dispatch(addMessageActionCreator())
  }

  //чтобы прокидывались изменения,которые ввели в textarea
  let onMessageChange = (body) => {
    //изменения с новым текстом, который ввели в textarea идут в state
    props.store.dispatch(updateNewMessageTextActionCreator(body))
  }

  return (
    <Dialogs
      updateNewMessageBody={onMessageChange}
      sendMessage={onSendMessageClick}
      dialogsPage={state}
    />
  )
}
export default DialogsContainer
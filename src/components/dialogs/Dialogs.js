import React from 'react'
import s from './Dialogs.module.scss'
import DialogItem from './dialogItem/DialogsItem'
import Message from './message/Message'

const Dialogs = (props) => {
 let state = props.dialogsPage
  //перебирам массив с именами и сообщениями, и создаем новый в виде jsx
  //'DialogItem' и 'Message' это компоненты выше,в которые мы передаем пропcы (name, message, id) из массивов dialogs и messages
  let dialogsElements = state.dialogs.map((d, index) => (
    <DialogItem key={`dialogsElements_${index}`} name={d.name} id={d.id} />
  ))
  let messagesElement = state.messages.map((m, index) => (
    <Message key={`messagesElement_${index}`} message={m.message} id={m.id} />
  ))
  let newMessageBody = state.newMessageText
  
  //Кликнули по кнопке, значит надо отправить сообщение
  let onSendMessageClick = () => {
    props.sendMessage()
  }

  //чтобы прокидывались изменения,которые ввели в textarea
  let onMessageChange = (e) => {
    //достаем из textarea введенное в него значение
    let body = e.target.value
    //изменения с новым текстом, который ввели в textarea идут в state
    props.updateNewMessageBody(body)
  }


  return (
    <div className={s.dialogs}>
      <div className={s.persons}>
        {/*как если бы
       <div className={s.persons__name + ' ' + s.active}>
          <NavLink to="dialogs/1">Dmitriy</NavLink>
      </div> */}
        {dialogsElements}
      </div>
      <div className={s.chats}>{messagesElement}</div>
      <div>
        <textarea
          onChange={onMessageChange}
          /* ref={newMessageElement} */
          value={newMessageBody}
        />
      </div>
      <br />
      <div>
        <button onClick={onSendMessageClick}>Send</button>
      </div>
    </div>
  )
}
export default Dialogs

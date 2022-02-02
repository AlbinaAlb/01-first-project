import React from 'react'
import s from './Dialogs.module.scss'
import DialogItem from './dialogItem/DialogsItem'
import Message from './message/Message'

const Dialogs = (props) => {
  //перебирам массив с именами и сообщениями, и создаем новый в виде jsx
  //'DialogItem' и 'Message' это компоненты выше,в которые мы передаем пропcы (name, message, id) из массивов dialogs и messages
  let dialogsElements = props.dialogsData.dialogs.map((d, index) => (
    <DialogItem key={`dialogsElements_${index}`} name={d.name} id={d.id} />
  ))
  let messagesElement = props.dialogsData.messages.map((m, index) => (
    <Message key={`messagesElement_${index}`} message={m.message} id={m.id} />
  ))

  //метод createRef у реакта - создает ссылку на какой-то элемент и привязываем к textarea, а потом можем к этой ссылке обращаться
  let newMessageElement = React.createRef()

  //достаем из textarea введенное в него значение
  let addMessage = () => {
    props.addMessageToState()
  }

  //чтобы прокидывались изменения,которые ввели в textarea
  let onMessageChange = () => {
    //достаем из textarea введенное в него значение
    let text = newMessageElement.current.value
    //изменения с новым текстом, который ввели в textarea идут в state
    props.updateNewMessageText(text)
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
      <div className={s.chats}>
        {messagesElement}
        <textarea
          onChange={onMessageChange}
          ref={newMessageElement}
          value={props.newMessageText}
        />
        <br />
        <button onClick={addMessage}>Send</button>
      </div>
    </div>
  )
}
export default Dialogs

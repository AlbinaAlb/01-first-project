import s from './Dialogs.module.scss'
import DialogItem from './dialogItem/DialogsItem'
import Message from './message/Message'

const Dialogs = (props) => {
  //перебирам массив с именами и сообщениями, и создаем новый в виде jsx
  //'DialogItem' и 'Message' это компоненты выше,в которые мы передаем пропcы (name, message, id) из массивов dialogs и messages
  let dialogsElements = props.dialogsData.map((d, index) => (
    <DialogItem key={`dialogsElements_${index}`} name={d.name} id={d.id} />
  ))
  let messagesElement = props.messagesData.map((m, index) => (
    <Message key={`messagesElement_${index}`} message={m.message} id={m.id} />
  ))

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
    </div>
  )
}
export default Dialogs

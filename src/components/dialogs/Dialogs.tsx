import s from './Dialogs.module.scss'
import DialogItem from './dialogItem/DialogsItem'
import Message from './message/Message'
import AddMessageForm from './addMessageForm/AddMessageForm'
import { InitialStateType } from '../../redux/dialogs-reducer'

type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}

const Dialogs = (props: PropsType) => {
  let state = props.dialogsPage
  //перебирам массив с именами и сообщениями, и создаем новый в виде jsx
  //'DialogItem' и 'Message' это компоненты выше,в которые мы передаем пропcы (name, message, id) из массивов dialogs и messages
  let dialogsElements = state.dialogs.map((d, index) => (
    <DialogItem key={`dialogsElements_${index}`} name={d.name} id={d.id} />
  ))
  let messagesElement = state.messages.map((m, index) => (
    <Message key={`messagesElement_${index}`} message={m.message} id={m.id} />
  ))

  //Кликнули по кнопке, значит надо отправить сообщение
  let addNewMessage = (values: { newMessageText: string }) => {
    props.sendMessage(values.newMessageText)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.persons}>{dialogsElements}</div>
      <div className={s.chats}>
        <div>{messagesElement}</div>
        <div className={s.dialogsForm}>
          <AddMessageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  )
}
export default Dialogs

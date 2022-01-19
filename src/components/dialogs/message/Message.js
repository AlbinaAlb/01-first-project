import s from './../Dialogs.module.scss'

const Message = (props) => (
  <div className={s.chats__message}>{props.message}</div>
)

export default Message


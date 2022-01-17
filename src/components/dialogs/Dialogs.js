import s from './Dialogs.module.scss'
import { NavLink } from 'react-router-dom'


const Dialogs = () => (
  <div className={s.dialogs}>
    <div className={s.persons}>
      <div className={s.persons__name + ' ' + s.active}>
        <NavLink to="dialogs/1">Dmitriy</NavLink>
      </div>
      <div className={s.persons__name}>
        <NavLink to="dialogs/2">Serhey</NavLink>
      </div>
      <div className={s.persons__name}>
        <NavLink to="dialogs/3">Vladislav</NavLink>
      </div>
      <div className={s.persons__name}>
        <NavLink to="dialogs/4">Elizaveta</NavLink>
      </div>
      <div className={s.persons__name}>
        <NavLink to="dialogs/5">Oleh</NavLink>
      </div>
      <div className={s.persons__name}>
        <NavLink to="dialogs/6">Alyona</NavLink>
      </div>
    </div>
    <div className={s.chats}>
      <div className={s.chats__message}>Hello</div>
      <div className={s.chats__message}>How are you?</div>
      <div className={s.chats__message}>Thank you!</div>
    </div>
  </div>
)

export default Dialogs

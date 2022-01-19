import s from './../Dialogs.module.scss'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => (
  <div className={s.persons__name + ' ' + s.active}>
    <NavLink to={'dialogs/' + props.id}>{props.name}</NavLink>
  </div>
)

export default DialogItem


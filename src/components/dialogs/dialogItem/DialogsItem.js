import s from './../Dialogs.module.scss'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => (
  <div className={s.persons__profile}>
    <div className={s.persons__photo}>
      <img
        src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
        alt=""
      />
    </div>
    <div className={s.persons__name + ' ' + s.active}>
      <NavLink to={'dialogs/' + props.id}>{props.name}</NavLink>
    </div>
  </div>
)

export default DialogItem


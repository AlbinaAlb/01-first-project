import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.nav__item}>
        <NavLink
          to="/profile"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Profile
        </NavLink>
      </div>
      <div className={s.nav__item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/dialogs"
        >
          Messages
        </NavLink>
      </div>
      <div className={s.nav__item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/news"
        >
          News
        </NavLink>
      </div>
      <div className={s.nav__item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/music"
        >
          Music
        </NavLink>
      </div>
      <div className={s.nav__item}>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.item)}
          to="/settings"
        >
          Settings
        </NavLink>
      </div>
    </nav>
  )
}
export default Navbar

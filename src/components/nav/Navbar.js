import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div>
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
      </div>
      <div className={s.nav__friends}>
        <div className={s.nav__item}>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : s.item)}
            to="/friends"
          >
            Friends
            <div>
              <img
                src="https://rus.team/images/article/6628/2018-01-16-837_17831-1_975211.webp"
                alt=""
              />
              <img
                src="https://rus.team/images/article/6628/2018-01-16-837_17831-1_975211.webp"
                alt=""
              />
              <img
                src="https://rus.team/images/article/6628/2018-01-16-837_17831-1_975211.webp"
                alt=""
              />
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Navbar

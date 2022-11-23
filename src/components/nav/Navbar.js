import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import friendPhoto from '../../assets/images/28.jpeg'
import friendPhoto2 from '../../assets/images/image.jpeg'
import friendPhoto3 from '../../assets/images/images.jpeg'

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
          to="/users"
        >
          Users
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
      <div className={s.nav__friends}>
        <div className={s.nav__item}>
          <NavLink
            className={(navData) => (navData.isActive ? s.active : s.item)}
            to="/friends"
          >
            Friends
            <div>
              <img src={friendPhoto} alt="" />
              <img src={friendPhoto2} alt="" />
              <img src={friendPhoto3} alt="" />
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Navbar

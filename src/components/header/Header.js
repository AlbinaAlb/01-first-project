import { NavLink } from 'react-router-dom'
import s from './Header.module.scss'
import stylesButton from '../button/Button.module.scss'

const Header = (props) =>{
  return (
    <header className={s.header}>
      <img src="https://ecom.ngo/resource/site/images/logo-white.svg" alt="" />
      <div className={s.header__loginBlock}>
        {/* если авторизованы, то показать ваш логин, иначе Login */}
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout} id='logout' className={stylesButton.button}></button>
            <label htmlFor="logout">Log out</label>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  )
}
export default Header
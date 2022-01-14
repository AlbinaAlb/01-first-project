import s from './Header.module.scss'

const Header = () =>{
  return (
    <header className={s.header}>
      <img
        src="https://ecom.ngo/resource/site/images/logo-white.svg"
        alt=""
      />
    </header>
  )
}
export default Header
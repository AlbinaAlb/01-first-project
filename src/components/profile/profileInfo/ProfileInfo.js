import s from './ProfileInfo.module.scss'

const ProfileInfo = () => {
  return (
    <div>
      <div className={s.profileImg}>
        <img
          src="https://cs8.pikabu.ru/post_img/big/2016/03/29/6/1459241134114051877.jpg"
          alt=""
        />
      </div>
      <div className={s.descriptionBlock}>ava</div>
    </div>
  )
}

export default ProfileInfo

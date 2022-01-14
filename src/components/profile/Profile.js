import MyPosts from './myPosts/MyPosts'
import s from './Profile.module.scss'

const Profile = () => {
  return (
    <div className={s.content}>
      <div className={s.profileImg}>
        <img
          src="https://cs8.pikabu.ru/post_img/big/2016/03/29/6/1459241134114051877.jpg"
          alt=""
        />
      </div>
      <div>ava</div>
      <MyPosts />
    </div>
  )
}

export default Profile

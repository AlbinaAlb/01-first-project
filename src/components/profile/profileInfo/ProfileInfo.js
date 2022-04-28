import s from './ProfileInfo.module.scss'
import Preloader from '../../common/preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
  //если профайла нет
if(!props.profile) {
  return <Preloader />
}

  return (
    <div>
      {/*  <div className={s.profileImg}>
        <img
          src="https://cs8.pikabu.ru/post_img/big/2016/03/29/6/1459241134114051877.jpg"
          alt=""
        />
      </div> */}
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="" />
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  )
}

export default ProfileInfo

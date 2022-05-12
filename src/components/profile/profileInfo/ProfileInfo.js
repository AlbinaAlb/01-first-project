import s from './ProfileInfo.module.scss'
import Preloader from '../../common/preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/cat.jpeg'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  //если профайла нет
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    //если файл выбран
    if (e.target.files.length) {
      //в колбэк savePhoto вложить выбранный файл (он будет под индексом 0)
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={s.profileImg}>
        <img
          src="https://cs8.pikabu.ru/post_img/big/2016/03/29/6/1459241134114051877.jpg"
          alt=""
        />
      </div>
      <div className={s.descriptionBlock}>
        {/* если наш профиль, то показать наше фото профиля, иначе фото которое загрузил другой пользователь */}
        {isOwner ? (
          <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt="" />
        ) : (
          <img src={profile.photos.large} className={s.mainPhoto} alt="" />
        )}
        {/* если isOwner(мы на своей странице) тогда показать инпут с выбором файла */}
        {isOwner && 
        <div>
        <input type={'file'} onChange={onMainPhotoSelected} />
        </div>}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo

import React, { useState } from 'react'
import s from './ProfileInfo.module.scss'
import stylesButton from '../../button/Button.module.scss'
import Preloader from '../../common/preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/cat.jpeg'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
  //типа локальный стейт
  //useState возвращает массив
  //В первом элементе массива первое значение стейта, вторым элементом является ф-я которая будет изменять первый элемент.
  //Деструктурирующее присваивание : editMode = 0 элемент массива (false); setEditMode = 1 элемент (ф-я)
   let [editMode, setEditMode] = useState(false)

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

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    }) 
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
        <input type={'file'} onChange={onMainPhotoSelected} id="file" className={stylesButton.button} />
        <label htmlFor="file">Choose a photo</label>
        </div>}
         { editMode
                    ? <ProfileDataForm profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() =>{setEditMode(true)}} profile={profile} isOwner={isOwner}/> } 

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

const ProfileData =({profile, isOwner, goToEditMode}) =>{
        return <div>
          {/* кнопка редактировать данные, которую видно только если мы isOwner (под своим логином), срабатывает событие и EditMode меняется на тру, открывается форма ProfileDataForm */}
          {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
          <div>
            <b>Full name:</b> {profile.fullName}
          </div>
          <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
          </div>
          {profile.lookingForAJob && (
            <div>
              <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
          )}
          <div>
            <b>About me:</b> {profile.aboutMe}
          </div>
          <div>
            <b>Contacts:</b>
            {Object.keys(profile.contacts).map((key) => {
              if (profile.contacts[key]) {
                return (
                  <Contact
                    key={key}
                    contactTitle={key}
                    contactValue={profile.contacts[key]}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
}

const Contact = ({contactTitle, contactValue}) =>{
  return <div className={s.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo

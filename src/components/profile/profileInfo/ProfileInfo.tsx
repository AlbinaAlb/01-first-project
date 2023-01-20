import s from './ProfileInfo.module.scss'
import stylesButton from '../../button/Button.module.scss'
import Preloader from '../../common/preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/cat.jpeg'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'
import { ChangeEvent, useState } from 'react'

type PropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType, setStatus: any) => Promise<any>
}

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }: PropsType) => {
   let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    //если файл выбран
    if (e.target.files?.length) {
      //в колбэк savePhoto вложить выбранный файл (он будет под индексом 0)
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType, setStatus: any) => {
    saveProfile(formData, setStatus).then(() => {
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

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData =({profile, isOwner, goToEditMode}: ProfileDataPropsType) =>{
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
            {Object
            .keys(profile.contacts)
            .map((key) => {
              if (profile.contacts[key as keyof ContactsType]) {
                return (
                  <Contact
                    key={key}
                    contactTitle={key}
                    contactValue={profile.contacts[key as keyof ContactsType]}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact = ({ contactTitle, contactValue }: ContactPropsType) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}:</b>
      {contactValue}
    </div>
  )
}

export default ProfileInfo

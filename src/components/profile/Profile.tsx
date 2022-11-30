import { ProfileType } from '../../types/types'
import MyPostsContainer from './myPosts/MyPostsСontainer'
//import s from './Profile.module.scss'
import ProfileInfo from './profileInfo/ProfileInfo'

type PropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: any) => void
  saveProfile: (profile: ProfileType, setStatus: any) => void
}

const Profile = (props: PropsType) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile

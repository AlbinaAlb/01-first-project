import React from 'react'
import MyPostsContainer from './myPosts/MyPostsСontainer'
//import s from './Profile.module.scss'
import ProfileInfo from './profileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile

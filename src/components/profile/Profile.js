import MyPosts from './myPosts/MyPosts'
//import s from './Profile.module.scss'
import ProfileInfo from './profileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        postsData={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        updateNewPostText={props.updateNewPostText}
        addPostToState={props.addPostToState}
      />
    </div>
  )
}

export default Profile

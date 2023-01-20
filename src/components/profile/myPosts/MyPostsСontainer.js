import { connect } from 'react-redux'
import {actions} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts.tsx'

//достаёт свойства из стейта
let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

//настраивает колбэки, которые мы будем отправлять в презент.компонент
let mapDispatchToProps = (dispatch) => {
  return {
    //ф-я добавляет пост
    addPost: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText))
    },
  }
}

//connect настраивает контейнерный компонент, который служит оберткой для презентационного-чистого компонента MyPosts
//MyPosts законектили к стору
//сюда придут посты
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer

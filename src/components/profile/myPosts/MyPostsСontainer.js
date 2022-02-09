import React from 'react'
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

//НЕ тупой контейнерный компонент,который служит оберткой для презентационного-чистого компонента MyPosts
//взаимодействие со store
//сюда придут посты
const MyPostsContainer = (props) => {
  let state = props.store.getState()

  //ф-я добавляет пост
  let addPost = () => {
    props.store.dispatch(addPostActionCreator())
  }

  //из MyPosts сюда попадает текст введенный в textarea и фомируется action, который диспатчится в store
  let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text)
    props.store.dispatch(action)
  }
  //передаем в MyPosts изменения для отрисовки
  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={addPost}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  )
}

export default MyPostsContainer

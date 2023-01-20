import React from 'react'
import s from './MyPosts.module.scss'
import Post from './post/Post'
import AddNewPostForm, { MyFormNewPost } from '../AddNewPostForm/AddNewPostForm'
import { PostType } from '../../../types/types'

type PropsType = {
  addPost: (newPostText: string) => void
  newPostText: string
  posts: Array<PostType>
}

//тупой компонент,запускает ф-ю которая в него пришла addPost и в эту функцию передает text
const MyPosts = (props: PropsType) => {
  console.log(props)

  //перебирам массив с постами, и создаем новый в виде jsx
  //'Post' это компонент,в который мы передаем пропcы (message, likesCount) из массива posts
  let postsElement = props.posts
    .map((p, index) => (
      <Post
        key={`postsElement_${index}`}
        message={p.message}
        likesCount={p.likesCount}
      />
    ))
    .reverse()

  //при клике на кнопку вызываетcя колбэк, который берется из MyPostsContainer и оттуда добавляет пост
  let onAddPost = (values: MyFormNewPost) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      {/* rкогда в форме будет сабмит, т.е. когда форма соберет данные, то вызвать колбэк  */}
      <AddNewPostForm onSubmit={onAddPost} />

      <div className={s.postsBlock__posts}>{postsElement}</div>
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized

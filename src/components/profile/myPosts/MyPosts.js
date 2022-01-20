import React from 'react'
import s from './MyPosts.module.scss'
import Post from './post/Post'

const MyPosts = (props) => {
  //перебирам массив с постами, и создаем новый в виде jsx
  //'Post' это компонент,в который мы передаем пропcы (message, likesCount) из массива posts
  let postsElement = props.postsData.map((p, index) => (
    <Post
      key={`postsElement_${index}`}
      message={p.message}
      likesCount={p.likesCount}
    />
  ))

  //метод createRef у реакта - создает ссылку на какой-то элемент и привязываем к textarea, а потом можем к этой ссылке обращаться
  let newPostElement = React.createRef()

  //достаем из textarea введенное в него значение
  let addPost = () => {
    let text = newPostElement.current.value 
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postsBlock__addPost}>
        <textarea ref={newPostElement}></textarea>
        <br />
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.postsBlock__posts}>{postsElement}</div>
    </div>
  )
}

export default MyPosts

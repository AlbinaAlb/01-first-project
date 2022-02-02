import React from 'react'
import s from './MyPosts.module.scss'
import Post from './post/Post'

//тупой компонент,запускает ф-ю которая в него пришла addPost и в эту функцию передает text
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

  //ф-я добавляет пост
  let addPost = () => {
    props.addPostToState()
  }

  //чтобы прокидывались изменения,которые ввели в textarea
  let onPostChange = () =>{
    //достаем из textarea введенное в него значение
    let text = newPostElement.current.value
    //изменения с новым текстом, который ввели в textarea идут в state
    props.updateNewPostText(text)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postsBlock__addPost}>
        <textarea 
        onChange={onPostChange}
        ref={newPostElement} 
        value={props.newPostText} />
        <br />
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.postsBlock__posts}>{postsElement}</div>
    </div>
  )
}

export default MyPosts

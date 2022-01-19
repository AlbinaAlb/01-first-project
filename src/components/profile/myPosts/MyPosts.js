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

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postsBlock__addPost}>
        <textarea></textarea>
        <br />
        <button>Add post</button>
      </div>
      <div className={s.postsBlock__posts}>{postsElement}</div>
    </div>
  )
}

export default MyPosts

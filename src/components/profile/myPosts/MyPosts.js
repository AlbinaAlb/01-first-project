import s from './MyPosts.module.scss'
import Post from './post/Post'

const MyPosts = () => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <div className={s.posts}>
        <Post message="Hi, how are you?" likesCount="15 likes" />
        <Post message="It's my first post" likesCount="20 likes" />
      </div>
    </div>
  )
}

export default MyPosts

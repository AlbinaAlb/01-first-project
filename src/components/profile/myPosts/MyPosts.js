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
        <Post />
      </div>
    </div>
  )
}

export default MyPosts
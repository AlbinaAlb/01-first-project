import s from './Post.module.scss'

const Post = () => {
  return (
    <div className={s.post}>
      <img
        src="https://i.pinimg.com/originals/f1/9c/f5/f19cf5aaa0ea38889c940c12d8ab41b9.jpg"
        alt=""
      />
      post 1
      <div>
        <span>like</span>
      </div>
    </div>
  )
}

export default Post

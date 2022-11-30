import styles from './users.module.scss'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/msn-icon-24.png'
import stylesButton from '../button/Button.module.scss'
import { UserType } from '../../types/types'

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const User = ({ user, followingInProgress, unfollow, follow }: PropsType) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt=""
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <span>
              <button
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  unfollow(user.id)
                }}
                id="unfollow"
                className={stylesButton.button}
              ></button>
              <label htmlFor="unfollow">Unfollow</label>
            </span>
          ) : (
            <span>
              <button
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  follow(user.id)
                }}
                id="follow"
                className={stylesButton.button}
              ></button>
              <label htmlFor="follow">Follow</label>
            </span>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{'user.location.country'}</div>
          <div>{'user.location.city'}</div>
        </span>
      </span>
    </div>
  )
}

export default User

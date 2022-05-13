import React from 'react'
import styles from './users.module.scss'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/msn-icon-24.png'
import stylesButton from '../button/Button.module.scss'

const User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          {/* ссылка на профайл определенного юзера */}
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
            // внутри анонимной ф-и вызывается follow/unfollow, который приходит из ActionCreator c UsersContainer
            <span>
              <button
                //чтобы на кнопку нельзя было нажать много раз
                //если в массиве хоть один id равный id пользователя, то тогда disabled=true
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

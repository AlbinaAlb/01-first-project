import React from 'react'
import styles from './users.module.scss'
import { NavLink } from 'react-router-dom'

const User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          {/* ссылка на профайл определенного юзера */}
          <NavLink to={'/profile/' + user.id}>
            <img
              src={
                user.photos.small !== null
                  ? user.photos.small
                  : 'https://www.freeiconspng.com/uploads/msn-icon-24.png'
              }
              alt=""
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            // внутри анонимной ф-и вызывается follow/unfollow, который приходит из ActionCreator c UsersContainer
            <button
              //чтобы на кнопку нельзя было нажать много раз
              //если в массиве хоть один id равный id пользователя, то тогда disabled=true
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id)
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id)
              }}
            >
              Follow
            </button>
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

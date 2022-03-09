import React from "react";
import styles from './users.module.scss'
import { NavLink } from 'react-router-dom'


let Users = (props) =>{
  //кол-во юзеров на странице
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < 10) {
      pages.push(i)
    }
  }

  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              //если текущая страница равна p (странице которая сейчас на экране), то применить стиль (выделить жирным) selectedPage
              className={props.currentPage === p && styles.selectedPage}
              //p по которой мы итерируемся теперь будет текущей страницей
              onClick={(e) => {
                props.onPageChanged(p)
              }}
            >
              {p}
            </span>
          )
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              {/* ссылка на профайл определенного юзера */}
              <NavLink to={'/profile/' + u.id}>
                <img
                  src={
                    u.photos.small !== null
                      ? u.photos.small
                      : 'https://www.freeiconspng.com/uploads/msn-icon-24.png'
                  }
                  alt=""
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id)
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id)
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{'u.location.country'}</div>
              <div>{'u.location.city'}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Users
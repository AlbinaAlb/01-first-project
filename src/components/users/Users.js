import React from 'react'
import styles from './users.module.scss'
import * as axios from 'axios'

class Users extends React.Component {
  componentDidMount() {
    //запрос на сервер и получение двнных оттуда и вставкой выбранной страницы и размер кол-ва юзеров на странице
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        //получить всех пользователей с сервера
        this.props.setUsers(response.data.items)
        //получить все страницы с сервера
        this.props.setTotalUsersCount(response.data.totalCount)
      })
  }

  //по клику на кнопку
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    //запрос на сервер и получение двнных оттуда
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items)
      })
  }

  render() {
    //кол-во юзеров на странице
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

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
                className={this.props.currentPage === p && styles.selectedPage}
                //p по которой мы итерируемся теперь будет текущей страницей
                onClick={(e) => {
                  this.onPageChanged(p)
                }}
              >
                {p}
              </span>
            )
          })}
        </div>
        {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <img
                  src={
                    u.photos.small !== null
                      ? u.photos.small
                      : 'https://www.freeiconspng.com/uploads/msn-icon-24.png'
                  }
                  alt=""
                  className={styles.userPhoto}
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id)
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id)
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
}
export default Users

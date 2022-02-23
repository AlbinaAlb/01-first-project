import React from 'react'
import { connect } from 'react-redux'
import {
  follow,
  setUsers,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
} from '../../redux/users-reducer'
import Preloader from '../common/preloader/Preloader'
import * as axios from 'axios'
import Users from './Users'

//ф-я делает AJAX запрос на сервер
class UsersContainer extends React.Component {
  componentDidMount() {
    //когда запрос идет на сервер
    this.props.toggleIsFetching(true)
    //запрос на сервер и получение двнных оттуда и вставкой выбранной страницы и размер кол-ва юзеров на странице
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        //когда пришел ответ с сервера
        this.props.toggleIsFetching(false)
        //получить всех пользователей с сервера
        this.props.setUsers(response.data.items)
        //получить все страницы с сервера
        this.props.setTotalUsersCount(response.data.totalCount)
      })
  }

  //по клику на кнопку
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.props.toggleIsFetching(true)
    //запрос на сервер и получение двнных оттуда
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(response.data.items)
      })
  }

  render() {
    return (
      <>
        {/* если данные с сервера получаются (грузятся), то вставляем картинку, или ничего */}
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          onPageChanged={this.onPageChanged}
        />
      </>
    )
  }
}

//state берется из redux-store, который в свою очередь берется из users-reducer
//данная ф-я из стейта достает разные данные
let mapStateToProps = (state) => {
  return {
    //из стейта достаем usersPage в котором все юзеры
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  }
}

//ф-я возвращает объекты в которых есть колбэки
//диспатчит действия(экшены) в стор
//после изменения стора заново срабатывает ф-я mapStateToProps
//follow передается в компонент с параметром userId, потом вызывается ActionCreator с тем же параметром, АС возвращает объект экшен с определенным типом и данными и мы диспатчим этот объект
/* let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber))
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount))
    },
    toggleIsFetching: (isFetching) => {
      dispatch(togglesFetchAC(isFetching))
    },
  }
} */

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching
})(UsersContainer)
import React from 'react'
import { connect } from 'react-redux'
import { followAC, setUsersAC, unfollowAC, setCurrentPageAC, setTotalUsersCountAC } from '../../redux/users-reducer'
import * as axios from 'axios'
import Users from './Users'


//ф-я делает AJAX запрос на сервер 
class UsersContainer extends React.Component {
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
    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        onPageChanged={this.onPageChanged}
      />
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
    isFetching: state.usersPage.isFetching
  }
}

//ф-я возвразает объекты в которых есть колбэки
//диспатчит действия(экшены) в стор
//после изменения стора заново срабатывает ф-я mapStateToProps
let mapDispatchToProps = (dispatch) => {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  requestUsers,
} from '../../redux/users-reducer'
import Preloader from '../common/preloader/Preloader'
import Users from './Users'
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress
} from '../../redux/selectors/users-selectors'

//компонент вызывает колбэк, который делает AJAX запрос на сервер
class UsersContainer extends React.Component {
  componentDidMount() {
    //с помощью деструктуризации достаем из пропсов currentPage и pageSize
    const { currentPage, pageSize } = this.props
    this.props.requestUsers(currentPage, pageSize)
  }

  //по клику на кнопку
  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props
    this.props.requestUsers(pageNumber, pageSize)
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
          followingInProgress={this.props.followingInProgress}
        />
      </>
    )
  }
}

//state берется из redux-store, который в свою очередь берется из users-reducer
//данная ф-я из стейта достает разные данные
let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

export default compose(
  connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  requestUsers,
}))(UsersContainer)
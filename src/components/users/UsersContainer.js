import Users from './Users'
import { connect } from 'react-redux'
import { followAC, setUsersAC, unfollowAC, setCurrentPageAC, setTotalUsersCountAC } from '../../redux/users-reducer'

//state берется из redux-store, который в свою очередь берется из users-reducer
//данная ф-я из стейта достает разные данные
let mapStateToProps = (state) => {
  return {
    //из стейта достаем usersPage в котором все юзеры
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
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
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
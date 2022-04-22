import { createSelector } from "reselect"

//примитивный селектор
const getUsersSelector = (state) => {
  return state.usersPage.users
}
//сложный селектор, который принимает примитивный и кладет его данные в users
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true)
})

export function getPageSize(state) {
  return state.usersPage.pageSize
}

export function getTotalUsersCount(state) {
  return state.usersPage.totalUsersCount
}

export function getCurrentPage(state) {
  return state.usersPage.currentPage
}

export function getIsFetching(state) {
  return state.usersPage.isFetching
}

export function getFollowingInProgress(state) {
  return state.usersPage.followingInProgress
}

export const countSomethingDifficult = (state) => {
  debugger
  let count = 23
  return count
}
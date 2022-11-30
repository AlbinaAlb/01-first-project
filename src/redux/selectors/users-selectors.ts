import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"

//примитивный селектор
const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
}
//сложный селектор, который принимает примитивный и кладет его данные в users
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true)
})

export function getPageSize(state: AppStateType) {
  return state.usersPage.pageSize
}

export function getTotalUsersCount(state: AppStateType) {
  return state.usersPage.totalUsersCount
}

export function getCurrentPage(state: AppStateType) {
  return state.usersPage.currentPage
}

export function getIsFetching(state: AppStateType) {
  return state.usersPage.isFetching
}

export function getFollowingInProgress(state: AppStateType) {
  return state.usersPage.followingInProgress
}

export const countSomethingDifficult = (state: AppStateType) => {
  debugger
  let count = 23
  return count
}
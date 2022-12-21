import { Dispatch } from 'redux'
import { usersAPI } from '../api/users-api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/object-helpers'
import { InferActionsTypes, BaseThunkType } from './redux-store' 

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
}
export type InitialStateType = typeof initialState

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    //если нужно зафолловить пользователя
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    //когда с сервера придут пользователи, мы берем старый стейт и к старым пользователям добавляем новых 
    case 'SN/USERS/SET_USERS':
      return { ...state, users: action.users }
    //при клике на кнопку стейт будет менять активную страницу
    case 'SN/USERS/SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.count }
    }
    case 'SN/USERS/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? //если идет подписка, то добавить айди в массив followingInProgress
            [...state.followingInProgress, action.userId]
          : //если идет отписка то удаляем этот айди из массива followingInProgress с помощью фильтрации
            state.followingInProgress.filter((id) => id !== action.userId),
      }
    }
    default:
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'SN/USERS/FOLLOW',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'SN/USERS/UNFOLLOW',
      userId,
    } as const),

  //юзеры будут приходить с сервера, поэтому создаем переменную которая будет добавлять юзеров в стейт
  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SN/USERS/SET_USERS',
      users,
    } as const),

  //изменить текущую страницу кликая по страничкам
  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SN/USERS/SET_CURRENT_PAGE',
      currentPage,
    } as const),

  //установить общее кол-во пользователей получаемое с сервера
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
      count: totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'SN/USERS/TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
}

//ThunkCreator
export const requestUsers = (page: number, pageSize: number): ThunkType => {
  //ф-я thunk, которая получает пользователей
  return async (dispatch) => {
    //когда запрос идет на сервер
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    //запрос на сервер и получение данных оттуда и вставкой выбранной страницы и размер кол-ва юзеров на странице
    const data = await usersAPI.getUsers(page, pageSize)
    //когда пришел ответ с сервера
    dispatch(actions.toggleIsFetching(false))
    //получить всех пользователей с сервера
    dispatch(actions.setUsers(data.items))
    //получить все страницы с сервера
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

//ф-я для того что б не дублировалась логика follow и unfollow
const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  const response = await apiMethod(userId)
  //если подписка произошла тогда диспатчим колбэк follow в редюсер
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    )
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    )
  }
}

export default usersReducer
type ActionsTypes = InferActionsTypes<typeof actions>
//для типизации ThunkCreator
type ThunkType = BaseThunkType<ActionsTypes>

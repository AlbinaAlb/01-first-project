import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/object-helpers'
import { AppStateType, InferActionsTypes } from './redux-store'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
}

export type InitialStateType = typeof initialState

//преобразование state путем получения данных с сервера
const usersReducer = (state = initialState, action: any): InitialStateType => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    //если нужно зафолловить пользователя, то
    case 'FOLLOW':
      return {
        //копируем стейт,
        ...state,
        //копируем юзеров в нем
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    //когда с сервера придут пользователи, мы берем старый стейт и к старым пользователям добавляем новых [...state.users, ...action.users] или перезатираем стейт полностью
    case 'SET_USERS':
      return { ...state, users: action.users }
    //при клике на кнопку стейт будет менять активную страницу
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.count }
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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
//создали тип, в джинерике(универсальном типе) которого, все экшионы
//и можем извлечь возвращаемый тип любой функции
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  //юзеры будут приходить с сервера, поэтому создаем переменную которая будет добавлять юзеров в стейт
  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  //изменить текущую страницу кликая по страничкам
  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  //установить общее кол-во пользователей получаемое с сервера
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      count: totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

//ThunkCreator это функция, которая может что-то принимать и возвращает ф-ю thunk
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

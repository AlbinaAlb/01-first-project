import { usersAPI } from '../api/api'
import {updateObjectInArray} from '../utils/object-helpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
}

//преобразование state путем получения данных с сервера
const usersReducer = (state = initialState, action) => {
  //редюсер из экшена достает свойства: action.currentPage, action.isFetching и тд
  switch (action.type) {
    //если нужно зафолловить пользователя, то
    case FOLLOW:
      return {
        //копируем стейт,
        ...state,
        //копируем юзеров в нем
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }
    //когда с сервера придут пользователи, мы берем старый стейт и к старым пользователям добавляем новых [...state.users, ...action.users] или перезатираем стейт полностью
    case SET_USERS:
      return { ...state, users: action.users }
    //при клике на кнопку стейт будет менять активную страницу
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage }
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count }
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
//юзеры будут приходить с сервера, поэтому создаем переменную которая будет добавлять юзеров в стейт
export const setUsers = (users) => ({ type: SET_USERS, users })
//изменить текущую страницу кликая по страничкам
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE,currentPage})
//установить общее кол-во пользователей получаемое с сервера
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

//ThunkCreator это функция, которая может что-то принимать и возвращает ф-ю thunk
export const requestUsers = (page, pageSize) => {
  //ф-я thunk, которая получает пользователей
  return async (dispatch) => {
    //когда запрос идет на сервер
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    //запрос на сервер и получение данных оттуда и вставкой выбранной страницы и размер кол-ва юзеров на странице
    const data = await usersAPI.getUsers(page, pageSize)
      //когда пришел ответ с сервера
      dispatch(toggleIsFetching(false))
      //получить всех пользователей с сервера
      dispatch(setUsers(data.items))
      //получить все страницы с сервера
      dispatch(setTotalUsersCount(data.totalCount))
  }
}

//ф-я для того что б не дублировалась логика follow и unfollow
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId))
  const response = await apiMethod(userId)
  //если подписка произошла тогда диспатчим колбэк follow в редюсер
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId))
}

//ThunkCreator 
export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    )
  }
}
//ThunkCreator 
export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    )
  }
}


export default usersReducer

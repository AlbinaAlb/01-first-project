const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1
}

//преобразование state путем получения данных с сервера
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    //если нужно зафолловить пользователя, то
    case FOLLOW:
      return {
        //копируем стейт,
        ...state,
        //копируем юзеров в нем
        users: state.users.map((u) => {
          //если пользователь в стейте совпадает с  пользователем из action (на которого нажали), то меняем followed этого пользователя на true
          if (u.id === action.userId) {
            //копируем юзера и меняем followed на true
            return { ...u, followed: true }
          }
          return u
        }),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false }
          }
          return u
        }),
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
    default:
      return state
  }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
//юзеры будут приходить с сервера, поэтому создаем переменную которая будет добавлять юзеров в стейт
export const setUsersAC = (users) => ({ type: SET_USERS, users })
//изменить текущую страницу кликая по страничкам
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
//установить общее кол-во пользователей получаемое с сервера
export const setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export default usersReducer

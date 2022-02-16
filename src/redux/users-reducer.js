const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  users: [],
}

//преобразование state
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
    //когда с сервера придут пользователи, мы берем старый стейт и к старым пользователям добавляем новых [...state.users, ...action.users]
    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] }
    default:
      return state
  }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
//юзеры будут приходить с сервера, поэтому создаем переменную которая будет добавлять юзеров в стейт
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export default usersReducer

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  users: [
   /*  {
      id: 1,
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/220px-Dmitry_Nagiev_2017_4.jpg',
      followed: false,
      fullName: 'Dmitry',
      status: 'I am a boss',
      location: { city: 'Minsk', country: 'Belarus' },
    },
    {
      id: 2,
      photoUrl:
        'https://icdn.lenta.ru/images/2019/12/18/16/20191218163928484/square_320_4228bbfbd5d3f7ba836392280aa08e35.jpg',
      followed: true,
      fullName: 'Sasha',
      status: 'I am a boss too',
      location: { city: 'Moscow', country: 'Russia' },
    },
    {
      id: 3,
      photoUrl:
        'https://www.ladbible.com/cdn-cgi/image/width=720,quality=70,format=jpeg,fit=pad,dpr=1/https%3A%2F%2Fs3-images.ladbible.com%2Fs3%2Fcontent%2Fc108530658884b252cdc054dc1786045.jpg',
      followed: false,
      fullName: 'Andrew',
      status: 'I am a boss too',
      location: { city: 'Kiev', country: 'Ukraine' },
    }, */
  ],
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

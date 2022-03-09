//action types
const ADD_POST_TO_STATE = 'ADD-POST-TO-STATE'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
    { id: 2, message: "It's my first post", likesCount: '20 likes' },
  ],
  newPostText: '',
  profile: null
}

//преобразование state
const profileReducer = (state = initialState, action) => {
  //метод для создания нового поста в ленте
  switch (action.type) {
    case ADD_POST_TO_STATE: {
      //делаем поверхностную копию стейта
      return {
        ...state,
        newPostText: '',
        //делаем глубокую копию стейта (с массивом), так как мы планируем менять этот массив
        posts: [
          ...state.posts,
          //добавляем в массив постов новый пост
          { id: 5, message: state.newPostText, likesCount: '0 likes' },
        ],
      }
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        //меняем в stateCopy newPostText на введенное значение, которое прийдет в эту функцию через newText
        newPostText: action.newText,
      }
    }
    //если тип экшена SET_USER_PROFILE, то мы вернем копию стейта в которой поменяем профайл на профайл из экшена
    case SET_USER_PROFILE:{
      return {...state, profile: action.profile}
    }
    default:
      return state
  }
}

//ActionCreator - это ф-я,которая возвращает объект action: { type: SET_USER_PROFILE, profile }. 
//action это объект в котоом инкапсулированы все данные,чтобы редюсер получил этот action и примнил изменения на свой стейт
//SET_USER_PROFILE это навание действия - что нужно сделать, profile - где нужно сделать
export const addPostActionCreator = () => ({ type: ADD_POST_TO_STATE })
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export default profileReducer

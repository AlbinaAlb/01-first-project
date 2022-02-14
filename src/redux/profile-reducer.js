const ADD_POST_TO_STATE = 'ADD-POST-TO-STATE'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

//объект со стартовыми данными. В случае если в state у profileReducer ничего не приходит, то этот обект будет начальным стейтом
let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
    { id: 2, message: "It's my first post", likesCount: '20 likes' },
  ],
  newPostText: '',
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
    default:
      return state
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST_TO_STATE })
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
})

export default profileReducer

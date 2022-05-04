import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer'

  let state = {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: '15 likes' },
      { id: 2, message: "It's my first post", likesCount: '20 likes' },
    ],
  }

  //добавить пост и проверить длину
test('length of posts should be incremented', () => {
  //тестовые данные
  let action = addPostActionCreator('it-kam')
  //действие - диспатчим action в стейт редюсера профайла
  let newState = profileReducer(state, action)
  //ожидание - длина нового стейта равна трем
  expect(newState.posts.length).toBe(3)
})

//добавить пост и проверить текст  нем
test('message of new post should be correct', () => {
  //тестовые данные
  let action = addPostActionCreator('it-kam')
  let newState = profileReducer(state, action)
  //проверяем соответствие текста в третьем элементе
  expect(newState.posts[2].message).toBe('it-kam')
})
import * as Yup from 'yup'

const EMAIL_VALIDATION = Yup.string()
  //проверка email на текст@текст.текст
  .email('Invalid email format')
  //максимальная длина - 30 символов
  .max(30, 'Nice try, nobody has a first name that long')
  .required('Required')

const PASSWORD_VALIDATION = Yup.string()
  .min(8, 'Must be longer than 8 characters')
  .required('Required')

const NEW_POST_TEXT_VALIDATION = Yup.string()
  //максимальная длина - 1000 символов
  .max(1000, 'Must be less  than 1000 characters')
  .required('Required')

  const NEW_MESSAGE_TEXT_VALIDATION = Yup.string()
     .max(500, 'Must be less  than 500 characters')
     .required('Required')

export const LoginSchema = Yup.object().shape({
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
})

export const PostSchema = Yup.object().shape({
  newPostText: NEW_POST_TEXT_VALIDATION
})

export const MessageSchema = Yup.object().shape({
  newMessageText: NEW_MESSAGE_TEXT_VALIDATION,
})
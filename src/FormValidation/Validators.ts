import * as Yup from 'yup'

const EMAIL_VALIDATION = Yup.string()
  //проверка email на текст@текст.текст
  .email('Invalid email format')
  //максимальная длина - 30 символов
  .max(30, 'Nice try, nobody has a first name that long')
  .required('Please, enter email')

const PASSWORD_VALIDATION = Yup.string()
  .min(8, 'Must be longer than 8 characters')
  .required('Please, enter password')

const NEW_POST_TEXT_VALIDATION = Yup.string()
  //максимальная длина - 1000 символов
  .max(1000, 'Must be less  than 1000 characters')
  .required('Required')

const NEW_MESSAGE_TEXT_VALIDATION = Yup.string()
  .max(500, 'Must be less  than 500 characters')
  .required('Required')
     
const FULL_NAME_VALIDATION = Yup.string()
  .min(2, 'Must be longer than 2 characters')
 .max(20, 'Must be less  than 20 characters')
 //только буквы (латиница и кириллица) - и _
 .matches(/^[а-яА-ЯёЁa-zA-Z-_]{1,20}$/, 'Only letters, dash and underscores must be used')
 .required('Required field')

 //чтобы если false писало ошибку
 const LOOKING_FOR_A_JOB = Yup.bool().oneOf([true], 'Field must be noted')

 const LOOKING_FOR_A_JOB_DESCRIPTION = Yup.string()
   .max(500, 'Must be less  than 500 characters')
   .required('Required field')

const ABOUT_ME = Yup.string()
   .max(500, 'Must be less  than 500 characters')
  .required('Required field')

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

export const ProfileDataSchema = Yup.object().shape({
  fullName: FULL_NAME_VALIDATION,
  lookingForAJob: LOOKING_FOR_A_JOB,
  lookingForAJobDescription: LOOKING_FOR_A_JOB_DESCRIPTION,
  aboutMe: ABOUT_ME,
})
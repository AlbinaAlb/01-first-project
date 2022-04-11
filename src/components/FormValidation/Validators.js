import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
  email: Yup.string()
    //проверка email на текст@текст.текст
    .email('Invalid email format')
    //максимальная длина - 20 символов
    .max(20, 'Nice try, nobody has a first name that long')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be longer than 8 characters')
    .required('Required'),
  newPostText: Yup.string()
    //максимальная длина - 1000 символов
    .max(1000, 'Must be less  than 1000 characters')
    .required('Required'),
  newMessageText: Yup.string()
    .max(500, 'Must be less  than 500 characters')
    .required('Required'),
})

export default FormSchema

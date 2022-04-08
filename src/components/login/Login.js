import { Formik, Form, Field, ErrorMessage } from 'formik'
import loginFormSchema from '../FormValidation/LoginFormSchema';

const Login = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validate={(values) => {
        const errors = {}
        //если в эмейле ничего не введено, то вывести Required под ним
        //иначе проверить чтоб были введены буквы, собачка, точка, текст, если не верно то 'Invalid email address'
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
      onSubmit={(values) => {
        console.log(values)
      }}
      //опора для автоматической проверки вашей формы на основе объекта Yup.
      validationSchema={loginFormSchema}
    >
      {() => (
        <Form>
          <div>
            <Field type={'text'} name={'email'} placeholder={'e-mail'} />
          </div>
          <ErrorMessage name="email" component="div" />

          <div>
            <Field type={'password'} name={'password'} placeholder={'password'}
            />
          </div>
          <ErrorMessage name="password" component="div" />

          <div>
            <Field type={'checkbox'} name={'rememberMe'} />
            <label htmlFor={'rememberMe'}> remember me </label>
          </div>

          <button type={'submit'}>Login</button>
        </Form>
      )}
    </Formik>
  </div>
)

export default Login
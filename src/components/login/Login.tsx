import { LoginSchema } from '../../FormValidation/Validators'
import styles from '../../FormValidation/Validators.module.scss'
import { useFormik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import * as selectors from '../../redux/selectors'
import { Navigate } from 'react-router-dom'
import stylesButton from '../button/Button.module.scss'
import { AppStateType } from '../../redux/redux-store'

interface MyFormValues {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector<AppStateType, boolean>(selectors.isAuthenticated)
  const captchaUrl = useSelector<AppStateType, string>(selectors.isCaptchaUrl)
  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues: {
      email: 'albinakovalevaa@gmail.com',
      password: '46265642aA*',
      rememberMe: false,
      captcha: '',
    },
    onSubmit: (formData, { setStatus }) => {
      dispatch(
        login(
          formData.email,
          formData.password,
          formData.rememberMe,
          formData.captcha,
          setStatus
        )
      )
    },
    validationSchema: LoginSchema,
  })

  let apiErrors
  if (formik.status) {
    apiErrors = formik.status.error.map((item: any, index: number) => (
      <span key={index}>{item}</span>
    ))
  }
  //если пользователь авторизован, то вместо страницы логин показывать страницу профиля
  if (isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            id="email"
            type="text"
            placeholder={'e-mail'}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <input
            id="password"
            type="password"
            placeholder={'password'}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            onChange={formik.handleChange}
          />
          <label htmlFor={'rememberMe'}>remember me</label>
        </div>
        {captchaUrl && <img src={captchaUrl} alt="" />}
        {captchaUrl && (
          <div>
            <input
              id="captcha"
              type="text"
              placeholder={'Symbols from image'}
              {...formik.getFieldProps('captcha')}
            />
          </div>
        )}
        <div>
          {' '}
          {apiErrors ? (
            <div className={styles.formSummaryError}>{apiErrors}</div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            id="login"
            className={stylesButton.button}
          ></button>
          <label htmlFor="login">Login</label>
        </div>
      </form>
    </div>
  )
}

export default Login

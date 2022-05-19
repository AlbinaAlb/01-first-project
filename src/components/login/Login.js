import {LoginSchema} from '../../FormValidation/Validators'
import styles from '../../FormValidation/Validators.module.scss'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import * as selectors from '../../redux/selectors'
import { Navigate } from 'react-router-dom'
import stylesButton from '../button/Button.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectors.isAuthenticated)
  const captchaUrl = useSelector(selectors.isCaptchaUrl)
  const formik = useFormik({
    initialValues: {
      email: 'albinakovalevaa@gmail.com',
      password: '46265642aA*',
      rememberMe: false,
      captcha: ''
    },
    onSubmit: (formData, {setStatus}) =>
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha , setStatus)
      ),
    validationSchema: LoginSchema,
  })

  let apiErrors 
  if (formik.status) {
    apiErrors = formik.status.error.map((item, index) => (
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
        <div className={styles.formControl + ' ' + (formik.errors.email ? styles.error : '')}>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder={'e-mail'}
          />
          <div>{formik.errors.email && <span>{formik.errors.email}</span>}</div>
        </div>
        <div className={ styles.formControl +   ' ' +  (formik.errors.password ? styles.error : '')}>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder={'password'}
          />
          <div>
            {formik.errors.password && <span>{formik.errors.password}</span>}
          </div>
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
        {/* если url каптчи есть, то показать картинку взятую с сервера */}
        { captchaUrl && <img src={captchaUrl} alt='' />}
        { captchaUrl &&  
        <div>
          <input
            id="captcha"
            name="captcha"
            type="text"
            onChange={formik.handleChange}
            placeholder={'Symbols from image'}
            /> 
          </div>}
       <div> {apiErrors ? <div className={styles.formSummaryError}>{apiErrors}</div> : null}</div>
        <div>
          <button type="submit" id='login' className={stylesButton.button}></button>
          <label htmlFor="login">Login</label>
        </div>
      </form>
    </div>
  )
}

export default Login
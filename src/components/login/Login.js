import FormSchema from '../FormValidation/Validators'
import styles from '../FormValidation/Validators.module.scss'
import { useFormik } from 'formik'

const Login = (props) => {
   const formik = useFormik({
     initialValues: {
       email: '',
       password: '',
       rememberMe: false,
     },
     onSubmit: props.onSubmit,
     validationSchema: FormSchema
   })
   return (
     <div>
       <h1>Login</h1>
       <form onSubmit={formik.handleSubmit}>
         <div className={ styles.formControl + ' ' + (formik.errors.email ? styles.error : '')}>
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
         <div className={styles.formControl + ' ' + (formik.errors.password ? styles.error : '')}>
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
         <div>
           <button type="submit">Login</button>
         </div>
       </form>
     </div>
   )
}

export default Login
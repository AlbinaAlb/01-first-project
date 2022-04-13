import { useFormik } from 'formik'
import { MessageSchema } from '../../FormValidation/Validators'
import styles from '../../FormValidation/Validators.module.scss'

const AddMessageForm = (props) => {
  const formik = useFormik({
    initialValues: {
      newMessageText: '',
    },
    onSubmit: props.onSubmit,
    validationSchema: MessageSchema,
  })
  const hasError = formik.errors.newMessageText
  return (
    //вызов onSubmit, срабатывает после нажатия на кнопку
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="newMessageText">Enter your message</label>
      </div>
      <div
        className={styles.formControl + ' ' + (hasError ? styles.error : '')}
      >
        <textarea
          id="newMessageText"
          name="newMessageText"
          type="textarea"
          //срабатывает при вводе значений в форму и сохраняет в формик, пока не будет нажата кнопка submit
          onChange={formik.handleChange}
          value={formik.values.newMessageText}
        />
        <div>{hasError && <span>{hasError}</span>}</div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddMessageForm

import { useFormik } from 'formik'
import {PostSchema} from '../../FormValidation/Validators'
import styles from '../../FormValidation/Validators.module.scss'

const AddNewPostForm = (props) => {
  const formik = useFormik({
    initialValues: {
      newPostText: '',
    },
    onSubmit: props.onSubmit,
    validationSchema: PostSchema,
  })
  //достаем из формика ошибку
  const hasError = formik.errors.newPostText
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* если есть ошибка hasError, то использовать класс styles.error, иначе ничего */}
      <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
        <textarea
          id="newPostText"
          name="newPostText"
          type="textarea"
          onChange={formik.handleChange}
          value={formik.values.newPostText}
        />
        <div>{hasError && <span>{hasError}</span>}</div>
      </div>
      <div>
        <button type="submit">Add post</button>
      </div>
    </form>
  )
}
export default AddNewPostForm

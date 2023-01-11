import { FormikProps, useFormik } from 'formik'
import { MessageSchema } from '../../../FormValidation/Validators'
import styles from '../../../FormValidation/Validators.module.scss'
import stylesButton from '../../button/Button.module.scss'

interface MyFormValues {
  newMessageText: string
}

type Props = {
  onSubmit: (values: MyFormValues) => void
}

const AddMessageForm = (props: Props) => {
  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues: {
      newMessageText: '',
    },
    onSubmit: props.onSubmit,
    validationSchema: MessageSchema,
  })
  const hasError = formik.errors.newMessageText
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="newMessageText">Enter your message</label>
      </div>
      <div
        className={styles.formControl + ' ' + (hasError ? styles.error : '')}
      >
        <textarea
          id="newMessageText"
          //срабатывает при вводе значений в форму и сохраняет в формик, пока не будет нажата кнопка submit
          onChange={formik.handleChange}
          value={formik.values.newMessageText}
        />
        <div>{hasError && <span>{hasError}</span>}</div>
      </div>
      <div>
        <button
          type="submit"
          className={stylesButton.button}
          id="submit"
        ></button>
        <label htmlFor="submit">Submit</label>
      </div>
    </form>
  )
}

export default AddMessageForm

import { useFormik } from 'formik'
import * as Yup from 'yup'

const AddMessageForm = (props) => {
  const formik = useFormik({
    initialValues: {
      newMessageText: '',
    },
    onSubmit: props.onSubmit,
    validationSchema: Yup.object().shape({
      newMessageText: Yup.string()
        .max(500, 'Must be less  than 500 characters')
        .required('Required'),
    }),
  })

  return (
    //вызов onSubmit, срабатывает после нажатия на кнопку
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="newMessageText">Enter your message</label>
      </div>
      <textarea
        id="newMessageText"
        name="newMessageText"
        type="textarea"
        //срабатывает при вводе значений в форму и сохраняет в формик, пока не будет нажата кнопка submit
        onChange={formik.handleChange}
        value={formik.values.newMessageText}
      />
      {formik.errors.newMessageText && (
        <div>{formik.errors.newMessageText}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddMessageForm
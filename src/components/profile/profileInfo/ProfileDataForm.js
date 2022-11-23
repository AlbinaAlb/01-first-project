import { useFormik } from 'formik'
import s from './ProfileInfo.module.scss'
import styles from '../../../FormValidation/Validators.module.scss'
import {ProfileDataSchema} from '../../../FormValidation/Validators'
import { useDispatch } from 'react-redux'
import { saveProfile } from '../../../redux/profile-reducer'

const ProfileDataForm = (props) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      fullName: '',
      lookingForAJob: false,
      lookingForAJobDescription: '',
      aboutMe: '',
      contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
      },
    },
    onSubmit: (formData, { setStatus }) => {
      props.onSubmit(formData)
      dispatch(saveProfile(formData, setStatus))
    },
    validationSchema: ProfileDataSchema,
  })
    let apiErrors
    //если в форме есть ошибка с сервера, то вывести
    /* if (formik.status) {
      apiErrors = formik.status.error.map((item, index) => (
        <div key={index}>{item}</div>
      ))
    }  */
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.formControl + ' ' + (formik.errors.fullName ? styles.error : '')}>
        <b>Full name: </b>
        <div>
          <input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
        </div>
        {formik.errors.fullName && <span>{formik.errors.fullName}</span>}
      </div>
      <div className={styles.formControl + ' ' + (formik.errors.lookingForAJob ? styles.error : '')}>
        <b>Looking for a job: </b>
        <input
          id="lookingForAJob"
          name="lookingForAJob"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lookingForAJob}
        />
        <div>
        {formik.errors.lookingForAJob && (
          <span>{formik.errors.lookingForAJob}</span>
        )}</div>
      </div>
      <div className={styles.formControl + ' ' + (formik.errors.lookingForAJobDescription ? styles.error : '')}>
        <b>My professional skills: </b>
        <div>
          <textarea
            id="lookingForAJobDescription"
            name="lookingForAJobDescription"
            placeholder="Enter your professional skills"
            type="textarea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lookingForAJobDescription}
          />
        </div>
        <div>
        {formik.errors.lookingForAJobDescription && (
          <span>{formik.errors.lookingForAJobDescription}</span>
        )}</div>
      </div>
      <div className={styles.formControl + ' ' + (formik.errors.aboutMe ? styles.error : '')}>
        <b>About me: </b>
        <div>
          <textarea
            id="aboutMe"
            name="aboutMe"
            placeholder="Write about yourself"
            type="textarea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.aboutMe}
          />
        </div>
        <div>
        {formik.errors.aboutMe && <span>{formik.errors.aboutMe}</span>}
        </div>
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(formik.values.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <b>{key}: </b>
              <div>
                <input
                  id={`contacts.` + key}
                  name={`contacts.` + key}
                  placeholder={`Type your ` + key + ` link`}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contacts.key}
                />
              </div>
            </div>
          )
        })}
        {formik.errors.contacts && <div>{formik.errors.contacts}</div>}
      </div>
        <div> {apiErrors ? <div className={styles.formSummaryError}>{apiErrors}</div> : null}</div>
      <button type="submit">Submit</button>
    </form>
  )
}
export default ProfileDataForm

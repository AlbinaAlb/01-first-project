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
      lookingForAJob: '',
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
    onSubmit: (formData, {setStatus} ) =>{
      dispatch(saveProfile(formData.fullName, formData.lookingForAJob, formData.lookingForAJobDescription, formData.aboutMe, formData.contacts, setStatus))
      //setStatus.resetForm()
    },
    validationSchema: ProfileDataSchema,
  })
    let apiErrors
    if (formik.status) {
      apiErrors = formik.status.error.map((item, index) => (
        <span key={index}>{item}</span>
      ))
    }
    console.log(formik.status);
   // console.log(formik);
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
      <div>
        <b>Looking for a job: </b>
        <input
          id="lookingForAJob"
          name="lookingForAJob"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lookingForAJob}
        />
        {formik.errors.lookingForAJob && (
          <div>{formik.errors.lookingForAJob}</div>
        )}
      </div>
      <div>
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
        {formik.errors.lookingForAJobDescription && (
          <div>{formik.errors.lookingForAJobDescription}</div>
        )}
      </div>
      <div>
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
        {formik.errors.aboutMe && <div>{formik.errors.aboutMe}</div>}
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
                  placeholder={`Type your `+ key}
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

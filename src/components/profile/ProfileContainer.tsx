import { useEffect } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { compose } from 'redux'
import { useState } from 'react'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'

type MapStatePropsType = {
  autorizedUserId: number | null
  profile: ProfileType | null
  isAuth: boolean
  status: string
}

type MapDispatchPropsType = {
  savePhoto: (file: any) => void
  saveProfile: (profile: ProfileType, setStatus: any) => void
  updateStatus: (status: string) => void
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
}

type ParamsType = {
  //updateStatus: string
  userId: number
}

type PropsType = MapStatePropsType & MapDispatchPropsType & ParamsType

function ProfileContainer(props: PropsType) {
  // когда будем писать на хуках, будет юзаться для того чтоб диспатчить экшины и thunk в стор из функциональных компонетов
  const dispatch = useDispatch()
  //в App cоздали Route "/profile/:userId", и данный хук вытаскивает параметр - то что после :
  const params = useParams()
  const [isMe, setIsMe] = useState(false)

  //хук принимает колбэк и массив 'зависимостей', при изменении этих зависимостей будет вызываться колбэк (чтобы ф-я вызвалась один раз при загрузке страницы)
  useEffect(() => {
    //если мы не на чужом айди профиля или на айди своего, то переключить на тру
    if (params.userId) {
      if (+params.userId === props.autorizedUserId) {
        setIsMe(true)
      }
      dispatch(getUserProfile(+params.userId))
      dispatch(getStatus(+params.userId))
      return
    }

    if (props.autorizedUserId) {
      dispatch(getUserProfile(props.autorizedUserId))
      dispatch(getStatus(props.autorizedUserId))
    }
  }, [])
  //раскрыть то что в пропсах и вставить как атрибуты в профайл */
  //и добавить кроме тех пропсов что пришли в Profile из вне - profile из mapStateToProps
  //компонент Profile получает в пропсах profile
  return (
    <Profile
      {...props}
      isOwner={isMe}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
    />
  )
}

//когда ф-я возвращает объект нужно ставить круглые скобки.
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

//compose ф-я, которая позволяет получить результат одной функци, а потом обработать его при помощи другой функции
export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  //вызываем HOC и кладем ему в параметр Profile
  withAuthRedirect
)(ProfileContainer)

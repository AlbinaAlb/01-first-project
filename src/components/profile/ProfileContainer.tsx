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

type DispatchPropsType = {
  savePhoto: (file: any) => void
  saveProfile: (profile: ProfileType, setStatus: any) => Promise<any>
  updateStatus: (status: string) => void
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
}

type ParamsType = {
  userId: number
}

type PropsType = MapStatePropsType & DispatchPropsType & ParamsType

function ProfileContainer(props: PropsType) {
  // чтобы диспатчить экшины и thunk в стор из функциональных компонетов
  const dispatch = useDispatch()
  //в App cоздали Route "/profile/:userId", и данный хук вытаскивает параметр - то что после :
  const params = useParams()
  const [isMe, setIsMe] = useState(false)
  //хук принимает колбэк и массив 'зависимостей', при изменении этих зависимостей ([params?.userId]) будет вызываться колбэк
  useEffect(() => {
    //если мы не на чужом айди профиля и на айди своего, то переключить на тру
    if (!params?.userId && props.autorizedUserId) {
      setIsMe(true)
    }
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
  }, [params?.userId])

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
let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

//compose ф-я, которая позволяет получить результат одной функци, а потом обработать его при помощи другой функции
export default compose<React.ComponentType>(
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

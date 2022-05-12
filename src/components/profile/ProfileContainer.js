import React, { useEffect } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { compose } from 'redux'
import { useState } from 'react'

function ProfileContainer(props) {
  // когда будем писать на хуках, будет юзаться для того чтоб диспатчить экшины и thunk в стор из функциональных компонетов
  const dispatch = useDispatch()
  //в App cоздали Route "/profile/:userId", и данный хук вытаскивает параметр - то что после :
  const params = useParams()
  const [isMe, setIsMe] = useState(false)

  //хук принимает колбэк и массив 'зависимостей', при изменении этих зависимостей будет вызываться колбэк (чтобы ф-я вызвалась один раз при загрузке страницы)
  useEffect(() => {
    //если мы не на чужом айди профиля или на айди своего, то переключить на тру
      if (!params.userId || (params.userId === props.autorizedUserId)) {
        setIsMe(true)
      }
    dispatch(getUserProfile(params.userId || props.autorizedUserId))
    dispatch(getStatus(params.userId || props.autorizedUserId))
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
    />
  )
}

//когда ф-я возвращает объект нужно ставить круглые скобки.
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

//compose ф-я, которая позволяет получить результат одной функци, а потом обработать его при помощи другой функции
export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
  //вызываем HOC и кладем ему в параметр Profile
  withAuthRedirect
)(ProfileContainer)

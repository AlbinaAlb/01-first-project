import React, { useEffect } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { useParams } from 'react-router-dom'
import {useDispatch} from "react-redux";
import { compose } from 'redux'

function ProfileContainer(props) {
  // когда будем писать на хуках, будет юзаться для того чтоб диспатчить экшины и thunk в стор из функциональных компонетов
  const dispatch = useDispatch()
  const params = useParams()
   if (!params.userId) {
     params.userId = props.autorizedUserId
   }
  //хук принимает колбэк и массив 'зависимостей', при изменении этих зависимостей будет вызываться колбэк (чтобы ф-я вызвалась один раз при загрузке страницы)
  useEffect(() => {
    dispatch(getUserProfile(params.userId))
    dispatch(getStatus(params.userId))
  }, [])
  //раскрыть то что в пропсах и вставить как атрибуты в профайл */
  //и добавить кроме тех пропсов что пришли в Profile из вне - profile из mapStateToProps
  //компонент Profile получает в пропсах profile
  return (
    <Profile
      {...props}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
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
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  //вызываем HOC и кладем ему в параметр Profile
  withAuthRedirect
)(ProfileContainer)

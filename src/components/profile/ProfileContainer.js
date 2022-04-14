import React, { useEffect } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import { useParams } from 'react-router-dom'
import {useDispatch} from "react-redux";
import { compose } from 'redux'

function ProfileContainer(props) {
  // когда будем писать на хуках, будет юзаться для того чтоб диспатчить экшины и thunk в стор из функциональных компонетов
  const dispatch = useDispatch()
  const params = useParams()
   if (!params.userId) {
     params.userId = 11
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
//данная ф-я из стейта profile
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
})

//compose ф-я, которая позволяет получить результат одной функци, а потом обработать его при помощи другой функции
//первые скобки это вызов ф-и, вторые скобки это ф-я которую вернул первый вызов compose
export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  //вызываем HOC и кладем ему в параметр Profile
  //withAuthRedirect
)(ProfileContainer)

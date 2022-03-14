import React, { useEffect } from 'react'
import Profile from './Profile'
import * as axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/profile-reducer'
import { useParams } from 'react-router-dom'

function ProfileContainer(props) {
  const params = useParams()
  //хук принимает колбэк и массив 'зависимостей', при изменении этих зависимостей будет вызываться колбэк (чтобы ф-я вызвалась один раз при загрузке страницы)
  useEffect(() => {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0//profile/${
          params.userId || 2
        }`
      )
      .then((response) => {
        //тогда добавляем данные с сервера (которые теперь находятся в response), в reducer под названием setUserProfile
        //найти в пропсах setUserProfile и добавить из response данные
        props.setUserProfile(response.data)
      })
  }, [])
  //раскрыть то что в пропсах и вставить как атрибуты в профайл */
  //и добавить кроме тех пропсов что пришли в Profile из вне - profile из mapStateToProps
  //компонент Profile получает в пропсах profile
  return <Profile {...props} profile={props.profile} />
}

//когда ф-я возвращает объект нужно ставить круглые скобки.
//данная ф-я из стейта profile
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

// первым параметром передаем ф-ю которая возвращает объект,а вторым ActionCreator
export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)

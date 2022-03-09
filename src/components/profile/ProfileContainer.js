import React from 'react'
import Profile from './Profile'
import * as axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/profile-reducer'
import { useMatch, useParams } from 'react-router-dom'

//костыль для React Router v6 с использованием withRouter
export const withRouter = (Component) => {
  let RouterComponent = (props) => {
    const match = useMatch('/profile/:userId/')
    debugger
    return <Component {...props} match={match} />
  }
  return RouterComponent
}  


//контейн.компонент,который просто берет всё что пришло в него и прокидывает дальше и может делать ajax запросы
class ProfileContainer extends React.Component {
  //делаем запрос на сервер
  componentDidMount() {
    //достаем айди юзера
let userId = this.props.match.params.userId
    if (!userId) {
      userId = 2
    } 
    //когда выполнится запрос на сервер,
    axios
      .get(`https://social-network.samuraijs.com/api/1.0//profile/2`)
      .then((response) => {
        //тогда добавляем данные с сервера (которые теперь находятся в response), в reducer под названием setUserProfile
        //найти в пропсах setUserProfile и добавить из response данные
        debugger
        this.props.setUserProfile(response.data)
      })
  }
  render() {
    return (
      /* раскрыть то что в пропсах и вставить как атрибуты в профайл */
      //и добавить кроме тех пропсов что пришли в Profile из вне - profile из mapStateToProps
      //компонент Profile получает в пропсах profile
      <Profile {...this.props} profile={this.props.profile} />
    )
  }
}

//когда ф-я возвращает объект нужно ставить круглые скобки.
//данная ф-я из стейта profile
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

//первым параметром передаем ф-ю которая возвращает объект,а вторым ActionCreator
export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
)

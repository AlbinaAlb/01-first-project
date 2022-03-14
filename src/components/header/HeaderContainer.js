import React from 'react'
import * as axios from 'axios'
import Header from './Header'
import { connect } from 'react-redux'
import { setAuthUserData } from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //Чтобы браузер передал вместе с запросом куки и HTTP-авторизацию
        withCredentials: true
      })
      .then((response) => {
        //если в дате resultCode = 0, значит мы залогинены
        if (response.data.resultCode === 0) {
          let {id, email, login} = response.data.data
          //тогда задиспатчить авторизационные данные из AC в store
          this.props.setAuthUserData(id, email, login)
        }
      })
  }
  render() {
    return <Header {...this.props} />
  }
}
const mapStateToProps = (state) =>({
isAuth: state.auth.isAuth,
//если авторизованы, то показать логин
login: state.auth.login
})

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer)

import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { setAuthUserData } from '../../redux/auth-reducer'
import { usersAPI } from '../../api/api'


class HeaderContainer extends React.Component {
  componentDidMount() {
    usersAPI.header()
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

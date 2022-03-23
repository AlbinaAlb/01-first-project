import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { getAuthUserData } from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {
  componentDidMount() {
    //обращаемся к бизнесу за данными (к thunk getAuthUserData в auth-user)
    this.props.getAuthUserData()
  }
  render() {
    return <Header {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  //если авторизованы, то показать логин
  login: state.auth.login,
})

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer)

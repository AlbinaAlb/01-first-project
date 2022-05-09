import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../FormValidation/auth-reducer'
import * as selectors from '../../redux/selectors'

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  isAuth: selectors.isAuthenticated(state),
  //если авторизованы, то показать логин
  login: state.auth.login,
})

export default connect(mapStateToProps, {logout })(
  HeaderContainer
)

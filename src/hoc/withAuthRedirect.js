import React from "react";
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

  let mapStateToPropsForRedirect = (state) => ({
    //теперь в диалоги придет флаг, зарегистрированы мы или нет
    isAuth: state.auth.isAuth
  })
//в ф-ю withAuthRedirect будут приходить разные целевые компоненты (напр. Dialogs, Profile)
//и будет создаваться RedirectComponent для каждого целевого компонента, с логикой, которая будет использоваться для каждого целевого комп.
export const withAuthRedirect = (Component) =>{
  class RedirectComponent extends React.Component {
    render() {
      //если пользователь не залогинен, то перебросить его на страницу регистрации
      if (!this.props.isAuth) return <Navigate to="/login" />
      //все пропсы, которые попали в контейн.компонент с помощью деструктуризации прокидываются в целевой компонент
      return <Component {...this.props} />
    }
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

  return ConnectedAuthRedirectComponent
}

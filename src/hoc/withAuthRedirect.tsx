import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../redux/redux-store'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  //теперь в диалоги придет флаг, зарегистрированы мы или нет
  isAuth: state.auth.isAuth,
})

type MapPropsType = {
  isAuth: boolean
}
type DispatchPropsType = {}

//в ф-ю withAuthRedirect будут приходить разные целевые компоненты (напр. Dialogs, Profile)
//и будет создаваться RedirectComponent для каждого целевого компонента, с логикой, которая будет использоваться для каждого целевого комп.
export function withAuthRedirect<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    //достаем из пропсов isAuth, и создаем новую переменную restProps без isAuth
    let { isAuth, ...restProps } = props
    //если пользователь не залогинен, то перебросить его на страницу регистрации
    if (!isAuth) return <Navigate to="/login" />
    //все пропсы, которые попали в контейн.компонент с помощью деструктуризации прокидываются в целевой компонент
    return <WrappedComponent {...restProps as WCP} />
  }

  let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType,  WCP, AppStateType>(mapStateToPropsForRedirect, {})
  (RedirectComponent)

  return ConnectedAuthRedirectComponent
}

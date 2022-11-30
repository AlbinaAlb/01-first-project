import React, { Component, Suspense } from 'react'
import './App.scss'
import HeaderContainer from './components/header/HeaderContainer'
import Navbar from './components/nav/Navbar'
import { initializeApp } from './redux/app-reducer'
import { connect } from 'react-redux'

import store from './redux/redux-store'
import { Provider } from 'react-redux'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import Preloader from './components/common/preloader/Preloader'

//Lazy loading
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'))
const News = React.lazy(() => import('./components/news/News'))
const Music = React.lazy(() => import('./components/music/Music'))
const Settings = React.lazy(() => import('./components/settings/Settings'))
const Friends = React.lazy(() => import('./components/friends/Friends'))
const Login = React.lazy(() => import('./components/login/Login'))

class App extends Component {
  componentDidMount() {
    //обращаемся к бизнесу за данными (к thunk getAuthUserData в auth-user)
    this.props.initializeApp()
  }
  render() {
    //будем возвращать всю разметку, только если проинициализировались,иначе загрузку
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="row">
          <Navbar />
          <div className="app-wrapper-content">
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route path="/profile" element={<ProfileContainer />} />
                <Route path="/dialogs/*" element={<DialogsContainer />} />
                <Route path="/users/*" element={<UsersContainer pageTitle={"Users"} />} />
                <Route path="/news/*" element={<News />} />
                <Route path="/music/*" element={<Music />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/friends/*" element={<Friends />} />
                <Route path="/login/*" element={<Login />} />
                <Route path="*" element={'404 NOT FOUND'} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    )
  }
}

//теперь наш App получит данные проинициализированно ли приложение
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer =  connect(mapStateToProps, { initializeApp })(App)

const MainJSApp = () =>{
  return (
    //HashRouter вместо BrowserRouter, для того чтобы можно было обновлять страницу, так как сервер через github
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}
export default MainJSApp
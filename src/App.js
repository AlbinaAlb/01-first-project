import React, { Component } from 'react'
import './App.scss'
import HeaderContainer from './components/header/HeaderContainer'
import Navbar from './components/nav/Navbar'
import ProfileContainer from './components/profile/ProfileContainer'
import DialogsContainer from './components/dialogs/DialogsContainer'
import News from './components/news/News'
import Music from './components/music/Music'
import Settings from './components/settings/Settings'
import Friends from './components/friends/Friends'
import UsersContainer from './components/users/UsersContainer'
import Login from './components/login/Login'
import { initializeApp } from './redux/app-reducer'
import { connect } from 'react-redux'

import { Routes, Route } from 'react-router-dom'
import Preloader from './components/common/preloader/Preloader'

class App extends Component {
  componentDidMount() {
    //обращаемся к бизнесу за данными (к thunk getAuthUserData в auth-user)
    this.props.initializeApp()
  }
  render() {
    //будем возвращать всю разметку, только если проинициализировались,иначе загрузку
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="row">
          <Navbar />
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/users/*" element={<UsersContainer />} />
              <Route path="/news/*" element={<News />} />
              <Route path="/music/*" element={<Music />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="/friends/*" element={<Friends />} />
              <Route path="/login/*" element={<Login />} />
            </Routes>
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

export default connect(mapStateToProps, { initializeApp })(App)

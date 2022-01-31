import './App.scss'
import Header from './components/header/Header'
import Navbar from './components/nav/Navbar'

import Profile from './components/profile/Profile'
import Dialogs from './components/dialogs/Dialogs'
import News from './components/news/News'
import Music from './components/music/Music'
import Settings from './components/settings/Settings'
import Friends from './components/friends/Friends'

import { Routes,  Route } from 'react-router-dom'

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="row">
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route
              path="/profile/*"
              element={
                <Profile
                  postsData={props.state.profilePage}
                  addPostToState={props.addPostToState}
                />
              }
            />
            <Route
              path="/dialogs/*"
              element={<Dialogs dialogsData={props.state.dialogsPage} />}
            />
            <Route path="/news/*" element={<News />} />
            <Route path="/music/*" element={<Music />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/friends/*" element={<Friends />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App

import './App.css'
import Header from './components/header/Header'
import Navbar from './components/nav/Navbar'
import Profile from './components/profile/Profile'

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="row">
        <Navbar />
        <Profile />
      </div>
    </div>
  )
}

export default App

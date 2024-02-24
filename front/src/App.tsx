import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login-page/Login'
import Registration from './pages/registration-page/Registration'
import Main from './pages/main-page/Main'
import IsLoggedIn from './hoc/IsLoggedIn'
import "./app.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/' element={<IsLoggedIn><Main /></IsLoggedIn>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
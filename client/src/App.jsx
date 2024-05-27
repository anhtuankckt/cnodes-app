import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import NotFound from './pages/NotFound/NotFound'
import Notification from './pages/Notification/Notification'

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Notification />} />
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<SignUp />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>{routes}</div>
  )
}

export default App
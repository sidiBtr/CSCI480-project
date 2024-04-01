import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './app.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import EventCalender from './pages/EventCalender'
import AboutUs from './pages/AboutUs'
import AdminDashbord from './pages/AdminDashbord'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
    <div className='container'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutUs' element={<AboutUs/>}/>
          <Route path='/events' element={<EventCalender/>}/>
          <Route path='/login' element={<Login/>} />
          <Route element={<PrivateRoute/>}>
              <Route path='/dashbord' element={<AdminDashbord/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import History from './pages/History'
import EventCalender from './pages/EventCalender'
import AboutUs from './pages/AboutUs'

function App() {

  return (
    <div className='container'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutUs' element={<AboutUs/>}/>
          <Route path='/events' element={<EventCalender/>}/>
          <Route path='/history' element={<History/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

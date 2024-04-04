import React from 'react'
import { Link } from 'react-router-dom'
import  './NavBarStyle.css'
import logo from '../images/logo.png'

export default function Navbar() {
  return (
    <div className="nav">
      <Link to={'/'}>
        <img src={logo} className="logo"/>
      </Link>
      <nav className='navbar'>
        <ul>
            {/*<Link to={'/'}>
            <li><img src={logo} /></li>
            </Link>*/}
            <Link to={'/events'}>
            <li>Events</li>
            </Link>
           <Link to={'/aboutUs'}>
           <li>About Us</li>
           </Link>
           <Link to={'/login'}>
           <li>Login</li>
           </Link>
        </ul>
      </nav>
      <div className="clear"></div>
    </div>
  )
}

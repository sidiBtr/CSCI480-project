import React from 'react'
import { Link } from 'react-router-dom'
import  './NavBarStyle.css'

export default function Navbar() {
  return (
      <nav className='navbar'>
        <ul>
            <Link to={'/'}>
            <li>Home</li>
            </Link>
            <Link to={'/events'}>
            <li>Events</li>
            </Link>
           <Link to={'/aboutUs'}>
           <li>About Us</li>
           </Link>
           <Link to={'/login'}>
           <li>Login</li>
           </Link>
           <Link to={'/dashbord'}>
           <li>Admin</li>
           </Link>
        </ul>
      </nav>
  )
}

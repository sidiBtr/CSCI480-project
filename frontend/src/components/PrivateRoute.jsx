import React, {useState, useEffect} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
// this makes the dashbord routes private
export default function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    useEffect(() => {
      // get the token from the local storage
        const token = localStorage.getItem('token')
        setIsAuthenticated(!!token)
    },[])
    //const auth = {isAuth: true}

  return (
    isAuthenticated? <Outlet/> : <Navigate to={'/login'}/>
  )
}

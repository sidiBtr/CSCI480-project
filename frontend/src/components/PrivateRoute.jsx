import React, {useState, useEffect} from 'react'
import {Outlet, Navigate} from 'react-router-dom'

export default function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    useEffect(() => {
        console.log('cheking authentication')
        const token = localStorage.getItem('token')
        console.log('token:', token)
        setIsAuthenticated(!!token)
    },[])
    console.log(isAuthenticated)
    //const auth = {isAuth: true}

  return (
    isAuthenticated? <Outlet/> : <Navigate to={'/login'}/>
  )
}

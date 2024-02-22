import React, { useState } from 'react'
import './admin.css'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [adminInfos, setAdminInfo] = useState({})
  const [loading, setLoading] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setAdminInfo({...adminInfos, [e.target.id]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
      try{
        setLoading(true)
        const response = await fetch('http://localhost:5555/api/user/signup', {
          method: 'POST',
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(adminInfos)
        })
        if(!response){
          setLoading(false)
          throw new Error('an error occured', response.status) 
        }
        const data = await response.json()
        console.log('succssfull sign up')
        setLoading(false)
        navigate('/dashbord')
      } catch(error){
        console.log(error)
        setLoading(false)
      }
  }
  return (
    <div className='admin-container'>
      <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' id='username' required placeholder='Username'/>
            <input onChange={handleChange} type='text' id='email' required placeholder='Email'/>
            <input onChange={handleChange} type='text' id='password' required placeholder='Password'/>
            <div>
              <button>{loading? '.....' : 'Sign Up'}</button>
            </div>
      </form>
    </div>
  )
}

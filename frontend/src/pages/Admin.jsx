import React from 'react'
import './admin.css'

export default function Admin() {
  return (
    <div className='admin-container'>
      <form>
            <input type='text' id='username' required placeholder='Username'/>
            <input type='text' id='email' required placeholder='Email'/>
            <input type='text' id='password' required placeholder='Password'/>
            <div>
              <button>Login</button>
            </div>
      </form>
    </div>
  )
}

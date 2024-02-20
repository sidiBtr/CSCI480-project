import React from 'react'
import './admin.css'

export default function Admin() {
  return (
    <div className='admin-container'>
      <form>
        <div>
            <label>Username</label>
            <input type='text' id='username' required placeholder='Username'/>
        </div>
        <div>
            <label>Password</label>
            <input type='text' id='username' required placeholder='Password'/>
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

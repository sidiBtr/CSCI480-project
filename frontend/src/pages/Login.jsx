import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [adminInfos, setAdminInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdminInfo({ ...adminInfos, [id]: value });

    // Cleare it
    if (errors[id]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  email format validation
    if (!/^\S+@\S+\.\S+$/.test(adminInfos.email)) {
      setErrors({ ...errors, email: 'Invalid email format' });
      return;
    }

    //  password strength validation
    if (adminInfos.password.length < 8 || !/\d/.test(adminInfos.password)) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters long and contain at least one number',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/user/signin', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(adminInfos),
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error('An error occurred', response.status);
      }
      const data = await response.json();
      console.log(data)
      localStorage.setItem('token',data.token)
      console.log(data.token)
      console.log('Successful login');
      setLoading(false);
      navigate('/dashbord');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className='admin-parent-container'>
      <div className='admin-container'>
      <form onSubmit={handleSubmit} className='admin-form'>
        <input
          onChange={handleChange}
          type='email'
          id='email'
          required
          placeholder='Email'
          className='admin-input'
        />
        {errors.email && <p className='error'>{errors.email}</p>}
        <input
          onChange={handleChange}
          type='password'
          id='password'
          required
          placeholder='Password'
          className='admin-input'
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        <div className='button-container'>
          <button className='submit-button'>{loading ? '.....' : 'Login'}</button>
        </div>
      </form>
    </div>
    </div>
    
  )
}

import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

/**
 * Component for user login.
 * 
 * @returns {JSX.Element} - Returns the Login component.
 */
export default function Login() {
  const [adminInfos, setAdminInfo] = useState({}); // State for admin information
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [errors, setErrors] = useState({}); // State for error handling
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_KEY; // Import API key from .env file

  // Handle changes in input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdminInfo({ ...adminInfos, [id]: value });

    // Clear errors if any
    if (errors[id]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email format validation
    if (!/^\S+@\S+\.\S+$/.test(adminInfos.email)) {
      setErrors({ ...errors, email: 'Invalid email format' });
      return;
    }

    // Password strength validation
    if (adminInfos.password.length < 8 || !/\d/.test(adminInfos.password)) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters long and contain at least one number',
      });
      return;
    }

    try {
      setLoading(true);
      // Send API call to the login endpoint
      const response = await fetch(`${api}/api/user/signin`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(adminInfos),
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error('An error occurred', response.status);
      }
      const data = await response.json();
      // Store token in local storage upon successful login
      localStorage.setItem('token', data.token);
      setLoading(false);
      navigate('/dashboard');
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
  );
}

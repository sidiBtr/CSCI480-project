import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * Component for handling private routes.
 * 
 * @returns {JSX.Element} - Returns the PrivateRoute component.
 */
export default function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    // If user is authenticated, render the child routes (Outlet), otherwise redirect to login
    isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
  );
}

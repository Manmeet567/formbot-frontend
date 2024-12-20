import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const location = useLocation(); // Get current location
  const token = localStorage.getItem('token'); // Check for token in localStorage

  if (!token) {
   
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, allow access to nested routes
  return <Outlet />;
};

export default PrivateRoute;

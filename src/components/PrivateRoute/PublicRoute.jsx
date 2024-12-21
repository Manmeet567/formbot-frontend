import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/workspace" />;
  }

  // If the user is not logged in, render the public route (login or signup)
  return <Outlet />;
};

export default PublicRoute;

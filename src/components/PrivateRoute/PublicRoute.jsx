import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { userData } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={`/workspace/${userData?.workspaceId}`} />;
  }

  // If the user is not logged in, render the public route (login or signup)
  return <Outlet />;
};

export default PublicRoute;

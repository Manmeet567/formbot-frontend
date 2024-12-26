import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { userData } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  if (token && userData) {
    return <Navigate to={`/workspace/${userData?.workspaceAccess[0]}`} />;
  }

  return <Outlet />;
};

export default PublicRoute;

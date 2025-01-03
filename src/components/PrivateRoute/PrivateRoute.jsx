import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

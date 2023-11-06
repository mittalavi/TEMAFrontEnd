import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.userInfo.accessToken); // to be decided by api response
  if (token === undefined || token === "") {
    return <Navigate to="/"></Navigate>;
  }
  return <Outlet />;
};

export default ProtectedRoute;

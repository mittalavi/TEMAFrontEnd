import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const AdminRoute = () => {
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr.find((role) => role === "ROLE_ADMIN");
  if (role === "ROLE_ADMIN") {
    return <Outlet />;
  }
  return <Navigate to="/dashboard"></Navigate>;
};

export default AdminRoute;
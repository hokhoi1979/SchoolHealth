import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.account);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.roleID)) {
    switch (user.roleID) {
      case 1:
        return <Navigate to="/admin" replace />;
      case 2:
        return <Navigate to="/manager" replace />;
      case 3:
        return <Navigate to="/nurse" replace />;
      case 4:
        return <Navigate to="/parent" replace />;
      case 5:
        return <Navigate to="/student" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;

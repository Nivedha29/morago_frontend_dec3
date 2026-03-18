import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("currentUser");

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = JSON.parse(storedUser);
  const userRole = currentUser.roles;

  if (allowedRole && userRole !== allowedRole) {
    if (userRole === "ROLE_TRANSLATOR") {
      return <Navigate to="/translator-home" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;

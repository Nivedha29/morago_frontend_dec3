import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("currentUser");

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = JSON.parse(storedUser);
  const userRoles = Array.isArray(currentUser.roles)
    ? currentUser.roles
    : [currentUser.roles];

  if (allowedRole && !userRoles.includes(allowedRole)) {
    if (userRoles.includes("ROLE_TRANSLATOR")) {
      return <Navigate to="/translator/home" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
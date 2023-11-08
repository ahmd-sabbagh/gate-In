import React from "react";
import { Navigate } from "react-router-dom";
import isAuthenticated from "../Utlis/Auth";


const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  if (!isAuth) {
    return <Navigate to="register/login" />;
  }
  return children;
};

export default ProtectedRoute;

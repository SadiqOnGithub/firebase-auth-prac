import { getAuth } from "firebase/auth";
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let { currentUser } = getAuth();

  if (!currentUser) {
    return <Navigate to="login" />;
  }
  return children;
}

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Prevent rendering until auth state is known
  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

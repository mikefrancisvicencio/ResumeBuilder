import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthUser } from "../lib/useAuthUser";

function ProtectedRoute({ children }) {
  // hook
  const { user, isLoading } = useAuthUser();

  return isLoading ? (
    <div>isLoading</div>
  ) : !user ? (
    <Navigate to="/login" />
  ) : (
    children
  );
}

export default ProtectedRoute;

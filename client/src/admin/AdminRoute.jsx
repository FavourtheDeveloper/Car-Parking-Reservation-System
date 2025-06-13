import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ admin, children }) {
  if (!admin) return <Navigate to="/admin-login" replace />;
  return children;
}

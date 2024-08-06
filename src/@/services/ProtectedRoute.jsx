// src/components/PrivateRoute.js

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const PrivateRoute = () => {
  const { user } = useUserContext();
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

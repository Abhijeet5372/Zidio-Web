// frontend/src/components/admin/AdminRoute.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../ui/Loader'; // Assuming Loader component exists

const AdminRoute = ({ adminOnly = false }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // If userInfo is still loading or not available, show a loader
  if (userInfo === undefined) { // Check if userInfo is still undefined (loading state)
    return <Loader />;
  }

  // If adminOnly is true, check if user is admin. Otherwise, just check if user is logged in.
  if (userInfo) {
    if (adminOnly && !userInfo.isAdmin) {
      return <Navigate to="/login" replace />; // Redirect non-admins to login
    }
    return <Outlet />; // Render child routes if authenticated and authorized
  } else {
    return <Navigate to="/login" replace />; // Redirect unauthenticated users to login
  }
};

export default AdminRoute;
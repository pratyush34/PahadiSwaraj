import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
<<<<<<< HEAD

  return <>{children}</>;
=======
  return children;
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
}

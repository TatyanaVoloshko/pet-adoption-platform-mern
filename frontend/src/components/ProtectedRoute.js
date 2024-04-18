// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Redirect to the login page if no user is logged in
        return <Navigate to="/api/auth/login" />;
    }

    return children; // Render children if user is logged in
};

export default ProtectedRoute;

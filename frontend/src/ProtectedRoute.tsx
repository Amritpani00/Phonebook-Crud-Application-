import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from "../Context/userContext";

function PrivateRoute({ children }) {
    const { isAuthenticated } = useUser();
    return isAuthenticated === true ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
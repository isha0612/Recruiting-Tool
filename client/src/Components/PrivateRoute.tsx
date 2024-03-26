import React , {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from "../Context/userContext";

interface PrivateRouteProps {
    children: ReactNode;
}

interface UserDetails {
    isAuthenticated: boolean;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useUser() as UserDetails;
    return isAuthenticated === true ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
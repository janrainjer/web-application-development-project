import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
    const { isAuthenticated, isLogged, isLoading } = useAuth();
    if (isLoading) {
        return <>Loading</>;
    }

    if (!isAuthenticated && !isLogged) {
        return <Navigate to={'/login'} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoutes;

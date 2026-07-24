import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivateRoute({ children, redirectTo = '/' }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return user ? children : <Navigate to={redirectTo} replace />;
}

export default PrivateRoute;

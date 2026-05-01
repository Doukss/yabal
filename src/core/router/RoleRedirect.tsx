import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRedirect = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Rediriger selon le rôle
  switch (state.user?.role) {
    case 'CHARGEUR':
      return <Navigate to="/chargeur" replace />;
    case 'LIVREUR':
      return <Navigate to="/livreur" replace />;
    case 'ADMIN':
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleRedirect;
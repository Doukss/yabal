import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'CHARGEUR' | 'LIVREUR' | 'ADMIN'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { state } = useAuth();

  // Non connecté
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier le rôle si spécifié
  if (allowedRoles && state.user && !allowedRoles.includes(state.user.role)) {
    // Rediriger vers le bon dashboard
    switch (state.user.role) {
      case 'CHARGEUR':
        return <Navigate to="/chargeur" replace />;
      case 'LIVREUR':
        return <Navigate to="/livreur" replace />;
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import ProtectedRoute from './core/router/ProtectedRoute';
import RoleRedirect from './core/router/RoleRedirect';

// Pages publiques
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Dashboards (à créer)
import DashboardChargeur from './pages/chargeur/DashboardChargeur';
import DashboardLivreur from './pages/livreur/DashboardLivreur';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Redirection après connexion */}
          <Route path="/dashboard" element={<RoleRedirect />} />
          
          {/* Dashboard Chargeur */}
          <Route 
            path="/chargeur/*" 
            element={
              <ProtectedRoute allowedRoles={['CHARGEUR']}>
                <DashboardChargeur />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard Livreur */}
          <Route 
            path="/livreur/*" 
            element={
              <ProtectedRoute allowedRoles={['LIVREUR']}>
                <DashboardLivreur />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard Admin */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
import { useAuth } from '../../core/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚚</span>
            <span className="text-xl font-bold text-primary">LOXO</span>
            <span className="text-gray-500 ml-2">Administrateur</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              👋 Bonjour, {state.user?.nom}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-gray-500">Utilisateurs</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-gray-500">Annonces</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-gray-500">Colis livrés</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">0 FCFA</div>
            <div className="text-gray-500">Revenus</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-primary text-white p-4 rounded-lg hover:bg-opacity-90 transition">
            👥 Gérer les utilisateurs
          </button>
          <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-opacity-90 transition">
            📦 Voir toutes les annonces
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
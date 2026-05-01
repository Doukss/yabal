import { useAuth } from '../../core/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardLivreur = () => {
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
            <span className="text-gray-500 ml-2">Livreur</span>
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
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Livreur</h1>
        
        {/* Infos utilisateur */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Mes informations</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Nom :</span> {state.user?.nom}</p>
            <p><span className="font-medium">Email :</span> {state.user?.email}</p>
            <p><span className="font-medium">Téléphone :</span> {state.user?.phone}</p>
            <p><span className="font-medium">Note :</span> {state.user?.rating} / 5</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary text-white p-4 rounded-lg hover:bg-opacity-90 transition">
            🔍 Annonces disponibles
          </button>
          <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-opacity-90 transition">
            📋 Mes missions
          </button>
          <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-opacity-90 transition">
            📊 Mon historique
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLivreur;
import { useState } from "react";
import { useAuth } from "../../core/context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardChargeur = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Données statiques pour les cartes
  const stats = [
    {
      title: "Crédits disponibles",
      value: state.user?.credits || 0,
      unit: "crédits",
      icon: "💰",
      color: "bg-gradient-to-r from-gray-100 to-gray-50",
    },
    {
      title: "Colis envoyés",
      value: 24,
      unit: "colis",
      icon: "📦",
      color: "bg-gradient-to-r from-gray-100 to-gray-50",
    },
    {
      title: "Taux de livraison",
      value: "98",
      unit: "%",
      icon: "✅",
      color: "bg-gradient-to-r from-gray-100 to-gray-50",
    },
    {
      title: "Note moyenne",
      value: state.user?.rating || 4.5,
      unit: "/5",
      icon: "⭐",
      color: "bg-gradient-to-r from-gray-100 to-gray-50 ",
    },
  ];

  const recentAnnounces = [
    {
      id: 1,
      from: "Dakar",
      to: "Thiès",
      weight: "5 kg",
      price: "1 500 FCFA",
      status: "En cours",
      date: "02/05/2026",
    },
    {
      id: 2,
      from: "Dakar",
      to: "Mbour",
      weight: "12 kg",
      price: "3 000 FCFA",
      status: "Livré",
      date: "30/04/2026",
    },
    {
      id: 3,
      from: "Dakar",
      to: "Saint-Louis",
      weight: "8 kg",
      price: "2 000 FCFA",
      status: "En attente",
      date: "28/04/2026",
    },
  ];

  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: "📊",
      color: "text-blue-500",
    },
    {
      id: "new-annonce",
      label: "Nouvelle annonce",
      icon: "➕",
      color: "text-green-500",
    },
    {
      id: "my-annonces",
      label: "Mes annonces",
      icon: "📋",
      color: "text-purple-500",
    },
    {
      id: "buy-credits",
      label: "Acheter des crédits",
      icon: "💳",
      color: "text-yellow-500",
    },
    { id: "profile", label: "Mon profil", icon: "👤", color: "text-gray-500" },
    {
      id: "history",
      label: "Historique",
      icon: "📜",
      color: "text-indigo-500",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "new-annonce":
        return (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">
              📝 Publier une nouvelle annonce
            </h2>
            <p className="text-gray-500">
              Formulaire de création d'annonce (à venir)
            </p>
          </div>
        );
      case "my-annonces":
        return (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">📋 Mes annonces</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Départ</th>
                    <th>Destination</th>
                    <th>Poids</th>
                    <th>Prix</th>
                    <th>Statut</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAnnounces.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.from}</td>
                      <td>{item.to}</td>
                      <td>{item.weight}</td>
                      <td>{item.price}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "Livré"
                              ? "bg-green-100 text-green-700"
                              : item.status === "En cours"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "buy-credits":
        return (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">💰 Acheter des crédits</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[5, 10, 20, 50].map((credits) => (
                <button
                  key={credits}
                  className="border-2 border-primary rounded-xl p-4 text-center hover:bg-primary hover:text-white transition"
                >
                  <div className="text-2xl font-bold">{credits}</div>
                  <div className="text-sm">crédits</div>
                  <div className="text-primary font-bold mt-2">
                    {credits * 200} FCFA
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition duration-300`}
                >
                  <div className="flex justify-between items-start text-gray-600">
                    <div>
                      <p className="text-sm opacity-90">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">
                        {stat.value}
                        <span className="text-lg ml-1">{stat.unit}</span>
                      </p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Section rapide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br  rounded-2xl shadow-lg p-6 text-gray-600 from-gray-100 to-gray-50">
                <h3 className="text-xl font-bold mb-2">Besoin de crédits ?</h3>
                <p className="mb-4 opacity-90">
                  Achetez des crédits pour publier vos annonces
                </p>
                <button
                  onClick={() => setActiveTab("buy-credits")}
                  className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Acheter maintenant
                </button>
              </div>
              <div className="bg-gradient-to-br rounded-2xl shadow-lg p-6 text-gray-600 from-gray-100 to-gray-50">
                <h3 className="text-xl font-bold mb-2">Nouveau colis ?</h3>
                <p className="mb-4 opacity-90">
                  Publiez une annonce en quelques secondes
                </p>
                <button
                  onClick={() => setActiveTab("new-annonce")}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Publier une annonce
                </button>
              </div>
            </div>

            {/* Activités récentes */}
            <div className="bg-gray-50 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-600">
                📋 Activités récentes
              </h2>
              <div className="space-y-3">
                {recentAnnounces.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3 text-gray-800">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="font-semibold">
                          {item.from} → {item.to}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.weight} • {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{item.price}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === "Livré"
                            ? "bg-green-100 text-green-700"
                            : item.status === "En cours"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-72" : "w-20"} bg-gray-50 shadow-xl transition-all duration-300 fixed h-full z-20`}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-between">
          <div
            className={`flex items-center gap-2 ${!isSidebarOpen && "justify-center w-full"}`}
          >
            <span className="text-3xl">
              <img src="/logo.png" alt="" className="w-8 h-8" />
            </span>
            {isSidebarOpen && (
              <span className="text-xl font-bold text-primary">YABAL</span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-primary"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Profil utilisateur */}
        <div className={`p-4 border-b ${!isSidebarOpen && "text-center"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {state.user?.nom?.charAt(0) || "U"}
            </div>
            {isSidebarOpen && (
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  {state.user?.nom}
                </p>
                <p className="text-xs text-gray-500">Chargeur</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                activeTab === item.id
                  ? " bg-gray-300 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Déconnexion */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}
      >
        {/* Header */}
        <div className="bg-gray-50 shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {menuItems.find((item) => item.id === activeTab)?.label ||
                  "Tableau de bord"}
              </h1>
              <p className="text-sm text-gray-500">
                Bienvenue {state.user?.nom} !
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-primary">
                  🔔
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
};

export default DashboardChargeur;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../core/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, state } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Redirection selon le rôle
      if (state.user?.role === "CHARGEUR") {
        navigate("/chargeur");
      } else if (state.user?.role === "LIVREUR") {
        navigate("/livreur");
      } else if (state.user?.role === "ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      setErrors({ email: "Email ou mot de passe incorrect" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Partie gauche - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=1200&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-primary bg-opacity-20"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="bg-black bg-opacity-30 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Bienvenue sur YABAL</h2>
            <p className="text-lg mb-2">
              La solution simple et fiable pour vos transports de colis au
              Sénégal.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Suivi en temps réel</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Système de confiance</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Tarifs transparents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          {/* Logo mobile */}
          <div className="text-center lg:hidden mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">🚚</span>
              <span className="text-2xl font-bold text-primary">YABAL</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
            <p className="text-gray-500 mt-1">Accédez à votre compte</p>
          </div>

          {/* Logo desktop */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🚚</span>
              <span className="text-2xl font-bold text-primary">YABAL</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Connexion</h2>
            <p className="text-gray-500 mt-1">Accédez à votre compte YABAL</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Se souvenir de moi
                </span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {state.isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Lien vers inscription */}
          <p className="text-center text-gray-600">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>

          {/* Retour à l'accueil */}
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-500 hover:text-primary text-sm">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

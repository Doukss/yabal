import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../core/context/AuthContext";
import type { RegisterData } from "../../services/api/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, state } = useAuth();
  const [formData, setFormData] = useState<
    RegisterData & { confirmPassword: string }
  >({
    nom: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "CHARGEUR",
  });
  const [errors, setErrors] = useState<{
    nom?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer l'erreur du champ
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: typeof errors = {};

    if (!formData.nom) newErrors.nom = "Nom requis";
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.phone) newErrors.phone = "Numéro de téléphone requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register({
        nom: formData.nom,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });
      // Redirection après inscription
      if (formData.role === "CHARGEUR") {
        navigate("/chargeur");
      } else {
        navigate("/livreur");
      }
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data?.message ||
          error.message ||
          "Erreur lors de l'inscription",
      });
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
              'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=1200&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-primary bg-opacity-20"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="bg-black bg-opacity-30 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Rejoignez YABAL</h2>
            <p className="text-lg mb-2">
              Que vous soyez commerçant ou conducteur, YABAL est fait pour vous.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Gagnez du temps et de l'argent</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Accédez à plus de clients</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Système de notation fiable</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="max-w-md w-full">
          {/* Logo mobile */}
          <div className="text-center lg:hidden mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">🚚</span>
              <span className="text-2xl font-bold text-primary">YABAL</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Inscription</h2>
            <p className="text-gray-500 mt-1">Créez votre compte</p>
          </div>

          {/* Logo desktop */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🚚</span>
              <span className="text-2xl font-bold text-primary">YABAL</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Inscription</h2>
            <p className="text-gray-500 mt-1">Créez votre compte YABAL</p>
          </div>

          {/* Erreur générale */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.nom ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Mamadou Diop"
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-500">{errors.nom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="contact@exemple.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="77 000 00 00"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Je suis *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full text-gray-600 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="CHARGEUR">
                  📦 Chargeur (J'envoie des colis)
                </option>
                <option value="LIVREUR">
                  🚚 Livreur (Je transporte des colis)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 mt-4"
            >
              {state.isLoading ? "Inscription en cours..." : "Créer mon compte"}
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

          {/* Lien vers connexion */}
          <p className="text-center text-gray-600">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Se connecter
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

export default RegisterPage;

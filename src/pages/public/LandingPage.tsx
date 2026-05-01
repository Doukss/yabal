import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../core/context/AuthContext";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdMonetizationOn } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
const LandingPage = () => {
  const { state } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8">
              <img src="/logo.png" alt="" />
            </span>
            <span className="text-2xl font-bold text-primary">YABAL</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#fonctionnalites"
              className="text-gray-700 hover:text-primary transition"
            >
              Fonctionnalités
            </a>
            <a
              href="#comment-ca-marche"
              className="text-gray-700 hover:text-primary transition"
            >
              Comment ça marche
            </a>
            <a
              href="#tarifs"
              className="text-gray-700 hover:text-primary transition"
            >
              Tarifs
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary transition"
            >
              Contact
            </a>
          </div>

          <div className="flex space-x-3">
            {state.isAuthenticated ? (
              <Link
                to={state.user?.role === "CHARGEUR" ? "/chargeur" : "/livreur"}
                className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Tableau de bord
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-primary text-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Hero Section - Version Parallaxe */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond avec effet parallaxe */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: 'url("/camion.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // Effet parallaxe
          }}
        >
          {/* Overlay dégradé (plus élégant que noir simple) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Contenu */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
              Envoyez vos colis en toute
              <span className="text-primary"> confiance</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              YABAL connecte les commerçants et particuliers avec des conducteurs
              fiables pour le transport interurbain au Sénégal. Suivez vos colis
              en temps réel et bénéficiez d'un système de confiance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition transform hover:scale-105 shadow-lg"
              >
                Commencer maintenant
              </Link>
              <a
                href="#comment-ca-marche"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-primary transition"
              >
                En savoir plus
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-white/90">Colis transportés</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  100+
                </div>
                <div className="text-sm text-white/90">
                  Livreurs partenaires
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  97%
                </div>
                <div className="text-sm text-white/90">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>

        {/* Flèche de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer">
          <a
            href="#fonctionnalites"
            className="text-white text-3xl opacity-70 hover:opacity-100 transition"
          >
            ↓
          </a>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="fonctionnalites" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Pourquoi choisir YABAL ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une plateforme simple et fiable pour tous vos transports de colis
              entre les villes du Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-accent">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En 3 étapes simples, envoyez vos colis en toute sérénité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent">
                Publiez votre annonce
              </h3>
              <p className="text-gray-600">
                Indiquez la destination, le poids et le prix de votre colis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent">
                Un livreur accepte
              </h3>
              <p className="text-gray-600">
                Un conducteur sur votre trajet prend votre colis en charge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent">
                Suivez et recevez
              </h3>
              <p className="text-gray-600">
                Suivez votre colis en temps réel et confirmez la réception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Une commission transparente
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vous ne payez que lorsque vous envoyez un colis. Pas d'abonnement
              caché.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primary p-6 text-white text-center">
              <h3 className="text-2xl font-bold">Offre simple</h3>
              <div className="text-4xl font-bold mt-2">200 FCFA</div>
              <p className="text-sm opacity-90">par colis transporté</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-success text-xl">✓</span>
                  <span>Suivi en temps réel</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success text-xl">✓</span>
                  <span>Système de confiance (notes)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success text-xl">✓</span>
                  <span>Code de confirmation à la livraison</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success text-xl">✓</span>
                  <span>Support client 7j/7</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block text-center bg-primary text-white py-3 rounded-lg font-semibold mt-6 hover:bg-opacity-90 transition"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-gray-600">
              Découvrez ce que nos utilisateurs disent de LOXO
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex text-primary mb-2">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.comment}"
                </p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à envoyer vos colis ?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Rejoignez YABAL aujourd'hui et simplifiez vos envois de colis.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Créer un compte gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🚚</span>
                <span className="text-xl font-bold">YABAL</span>
              </div>
              <p className="text-gray-400 text-sm">
                La solution simple et fiable pour le transport de colis au
                Sénégal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#fonctionnalites"
                    className="hover:text-primary transition"
                  >
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a
                    href="#comment-ca-marche"
                    className="hover:text-primary transition"
                  >
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#tarifs" className="hover:text-primary transition">
                    Tarifs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📞 +221 77 000 00 00</li>
                <li>✉️ contact@loxo.sn</li>
                <li>📍 Dakar, Sénégal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2026 YABAL. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Données statiques
const features = [
  {
    icon: <MdSecurity className="w-20 h-20 text-gray-800" />,
    title: "Sécurisé et fiable",
    description:
      "Système de réputation et code de confirmation à chaque livraison.",
  },
  {
    icon: <FaMapLocationDot className="w-20 h-20 text-gray-800" />,
    title: "Suivi en temps réel",
    description: "Géolocalisez votre colis à chaque étape du transport.",
  },
  {
    icon: <MdMonetizationOn className="w-20 h-20 text-gray-800" />,
    title: "Tarifs transparents",
    description: "Commission fixe de 200 FCFA par colis, pas de surprise.",
  },
  {
    icon: <IoPhonePortrait className="w-20 h-20 text-gray-800" />,
    title: "Facile à utiliser",
    description: "Interface simple, fonctionne même sans connexion internet.",
  },
  {
    icon: <FaTruck className="w-20 h-20 text-gray-800" />,
    title: "Large réseau",
    description: "Des livreurs sur tous les axes routiers du Sénégal.",
  },
  {
    icon: <FaStar className="w-20 h-20 text-gray-800" />,
    title: "Communauté de confiance",
    description: "Notez vos livreurs et consultez leurs évaluations.",
  },
];

const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Commerçante - Marché Sandaga",
    rating: 5,
    comment:
      "Grâce à LOXO, j'envoie mes tissus à Thiès sans souci. Je sais où est mon colis à tout moment !",
  },
  {
    name: "Mamadou Diop",
    role: "Conducteur - Dakar-Mbour",
    rating: 5,
    comment:
      "Je gagne plus d'argent avec les colis. L'application est simple et les clients sont sérieux.",
  },
  {
    name: "Fatou Ndiaye",
    role: "Boutiquière - Saint-Louis",
    rating: 4,
    comment:
      "Plus besoin d'attendre des jours. Mes fournitures arrivent maintenant le jour même.",
  },
];

export default LandingPage;

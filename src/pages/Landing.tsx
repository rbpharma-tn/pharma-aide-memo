import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronRight, ChevronDown } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import ThemeCarousel from "@/components/ThemeCarousel";
import { useState, useEffect } from "react";

export default function Landing() {
  // État pour détecter le mode mobile / desktop (pour l'orientation des flèches)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Liste des niveaux simplifiée
  const niveaux = [
    { label: "Débutant", stars: 1 },
    { label: "Intermédiaire", stars: 2 },
    { label: "Avancé", stars: 3 },
    { label: "Expert", stars: 4 },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col font-inter">
      <AppHeader />
      {/* Section de titre principale */}
      <section className="flex flex-col items-center justify-center w-full py-14 px-4">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-5 tracking-tight font-inter">
          Mémofiches conseil à l&apos;officine
        </h1>
        <p className="text-base md:text-xl font-medium text-gray-500 text-center max-w-2xl font-inter">
          Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques
        </p>
      </section>
      {/* Carrousel */}
      <section className="w-full max-w-5xl mx-auto px-4 py-1">
        <ThemeCarousel />
      </section>
      {/* Blocs stats sobres */}
      <section className="w-full max-w-3xl mx-auto px-4 py-8 mt-2">
        <div className="flex flex-wrap gap-5 justify-center items-center mb-9">
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-xl md:text-2xl font-bold text-gray-900 font-inter">110</div>
            <div className="text-xs md:text-sm text-gray-500 font-inter">Mémofiches</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg md:text-xl font-bold text-gray-900 font-inter">16</div>
            <div className="text-xs md:text-sm text-gray-500 font-inter">Compétences</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg md:text-xl font-bold text-gray-900 font-inter">4</div>
            <div className="text-xs md:text-sm text-gray-500 font-inter">Niveaux</div>
          </div>
        </div>
      </section>
      {/* Niveaux de progression d'apprentissage : version épurée, étoiles sous le label */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-10 flex flex-col items-center">
        <div className="text-lg md:text-xl font-semibold text-gray-900 tracking-wide mb-7 text-center uppercase font-inter">
          Niveaux d&apos;apprentissage
        </div>
        <nav
          aria-label="Parcours niveaux"
          className="flex flex-row items-end justify-center w-full animate-fade-in mt-2"
        >
          {niveaux.map((step, i) => (
            <div key={step.label} className="flex flex-row items-end">
              {/* Bloc niveau : label en haut, étoiles en bas */}
              <div className="flex flex-col items-center mx-2">
                <span className="text-base md:text-lg font-medium text-gray-800 mb-2">{step.label}</span>
                <div className="flex gap-1">
                  {[...Array(step.stars)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 md:w-5 md:h-5 text-gray-700 fill-gray-900"
                      strokeWidth={1.1}
                    />
                  ))}
                </div>
              </div>
              {/* Flèche vers la droite pour la progression (sauf le dernier) */}
              {i < niveaux.length - 1 && (
                <ChevronRight className="w-7 h-7 mx-2 text-gray-400 mb-3" aria-label="progresse vers" />
              )}
            </div>
          ))}
        </nav>
      </section>
      {/* Bloc d'appel à l'action */}
      <section className="w-full flex justify-center py-12 px-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow border border-gray-100 flex flex-col items-center py-10 px-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-3">Prêt à commencer votre formation&nbsp;?</h2>
          <p className="text-gray-500 text-base md:text-lg text-center mb-8">
            Découvrez nos mémofiches interactives et commencez à approfondir vos connaissances dès maintenant.
          </p>
          <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
            <Link
              to="/generateur"
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-gray-900 text-white font-semibold text-base shadow hover:bg-gray-800 transition min-w-[200px] text-center"
            >
              Voir les mémofiches
              <ArrowRight className="ml-1 w-5 h-5" />
            </Link>
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 font-semibold text-base shadow-sm hover:bg-gray-100 transition min-w-[200px] text-center"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>
      <footer className="text-center text-xs text-gray-400 py-5 opacity-90 font-inter">
        &copy; {new Date().getFullYear()} PharmIA – conçu pour l’officine moderne
      </footer>
    </main>
  );
}

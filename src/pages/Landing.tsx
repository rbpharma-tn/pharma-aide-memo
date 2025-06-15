
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import ThemeCarousel from "@/components/ThemeCarousel";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-inter">
      <AppHeader />
      {/* Section de titre principale avec taille réduite */}
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
      {/* Niveaux de progression d'apprentissage : titre + timeline améliorée */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-10 flex flex-col items-center">
        <div className="text-lg md:text-xl font-semibold text-gray-900 tracking-wide mb-5 text-center uppercase font-inter">
          Niveaux d&apos;apprentissage
        </div>
        {/* Timeline visuelle et animée */}
        <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
          <ol className="flex items-center justify-between w-full gap-0 md:gap-4 px-2 relative">
            {[
              { label: "Débutant", color: "from-blue-400 to-blue-700", dot: "bg-blue-700", text: "text-blue-700" },
              { label: "Intermédiaire", color: "from-green-400 to-green-600", dot: "bg-green-600", text: "text-green-700" },
              { label: "Avancé", color: "from-yellow-300 to-yellow-500", dot: "bg-yellow-400", text: "text-yellow-600" },
              { label: "Expert", color: "from-fuchsia-500 to-fuchsia-800", dot: "bg-fuchsia-700", text: "text-fuchsia-800" },
            ].map((step, i, arr) => (
              <li key={step.label} className="flex-1 flex flex-col items-center relative group">
                {/* Connecteur gauche */}
                {i > 0 && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-0 w-1/2 h-2 rounded-l-full
                    bg-gradient-to-l ${step.color}
                    ${i === arr.length-1 ? "" : ""}
                  `} />
                )}
                {/* Dot animée */}
                <div className={`z-10 w-10 h-10 rounded-full border-4 shadow-md flex items-center justify-center
                  ${step.dot} border-white group-hover:scale-110 transition-transform duration-200 animate-scale-in
                `}>
                  <span className="text-base font-bold text-white drop-shadow-sm">{i + 1}</span>
                </div>
                {/* Label */}
                <div className={`mt-2 text-xs md:text-sm font-semibold text-center ${step.text} transition-all group-hover:scale-105`}>
                  {step.label}
                </div>
                {/* Connecteur droit */}
                {i < arr.length - 1 && (
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 z-0 w-1/2 h-2 rounded-r-full
                    bg-gradient-to-r ${step.color}
                  `} />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* Bloc d'appel à l'action inspiré de l'image */}
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

import { Link } from "react-router-dom";
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
      {/* Niveaux de progression d'apprentissage : titre + timeline UNIQUEMENT */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-8 flex flex-col items-center">
        <div className="text-lg md:text-xl font-semibold text-gray-900 tracking-wide mb-5 text-center uppercase font-inter">
          Niveaux de progression d&apos;apprentissage
        </div>
        <div className="w-full max-w-2xl">
          <ol className="flex items-center justify-between w-full px-2">
            {[
              { label: "Débutant", color: "bg-gray-900 text-white border-none", bold: true },
              { label: "Intermédiaire", color: "bg-white text-gray-600 border-2 border-gray-300", bold: false },
              { label: "Avancé", color: "bg-white text-gray-600 border-2 border-gray-300", bold: false },
              { label: "Expert", color: "bg-black text-white border-none", bold: true }
            ].map((level, i, arr) => (
              <li key={level.label} className="flex-1 flex flex-col items-center relative">
                <div className={`
                  flex items-center justify-center z-10
                  w-10 h-10 rounded-full
                  font-semibold
                  text-base
                  ${level.color}
                `}>
                  {i + 1}
                </div>
                <div className="mt-2 text-xs md:text-sm font-normal text-center text-gray-700 w-20">{level.label}</div>
                {/* Connecteur */}
                {i < arr.length - 1 && (
                  <div className={`
                    absolute top-1/2 left-full h-0.5 w-full border-t-2
                    ${i === 0 ? "border-gray-300" : "border-gray-200"}
                    -translate-y-1/2
                    z-0
                  `} />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <footer className="text-center text-xs text-gray-400 py-5 opacity-90 font-inter">
        &copy; {new Date().getFullYear()} PharmIA – conçu pour l’officine moderne
      </footer>
    </main>
  );
}

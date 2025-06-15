import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ThemeCarousel from "@/components/ThemeCarousel";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-inter">
      <AppHeader />
      <section className="flex flex-col items-center justify-center w-full py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-6 tracking-tight font-inter">
          Mémofiches conseil à l&apos;officine
        </h1>
        <p className="text-base md:text-xl font-medium text-gray-500 text-center max-w-2xl font-inter">
          Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques
        </p>
      </section>
      <section className="w-full max-w-5xl mx-auto px-4 py-1">
        <ThemeCarousel />
      </section>
      <section className="w-full max-w-3xl mx-auto px-4 py-7 mt-1">
        <div className="flex flex-wrap gap-5 justify-center items-center mb-8">
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-xl font-bold text-gray-900 font-inter">110</div>
            <div className="text-xs text-gray-500 font-inter">Mémofiches</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg font-bold text-gray-900 font-inter">16</div>
            <div className="text-xs text-gray-500 font-inter">Compétences</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg font-semibold text-gray-800 font-inter">4</div>
            <div className="text-xs text-gray-500 font-inter">Niveaux</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg font-semibold text-gray-800 font-inter">65%</div>
            <div className="text-xs text-gray-500 font-inter">Progression</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-9 shadow text-center border border-gray-100 max-w-2xl mx-auto flex flex-col items-center">
          <div className="text-2xl font-bold mb-3 text-gray-900 font-inter">
            Commencer votre progression&nbsp;?
          </div>
          <div className="text-base text-gray-500 mb-7 font-inter">
            Explorez les mémofiches interactives et développez vos compétences dès maintenant.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center font-inter">
            <Link
              to="/generateur"
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white text-base rounded-lg font-semibold shadow transition border-2 border-gray-900 font-inter"
            >
              Voir les mémofiches
            </Link>
            <Link
              to="/auth"
              className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 text-base rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition font-inter"
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

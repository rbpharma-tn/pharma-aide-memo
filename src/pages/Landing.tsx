
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ThemeCarousel from "@/components/ThemeCarousel";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sora">
      <AppHeader />
      {/* HERO épuré */}
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center pt-14 pb-9 px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 text-center mb-5 leading-tight tracking-tight">
          Les <span className="font-playfair text-gray-800">Mémofiches</span> du conseil pharmaceutique
        </h1>
        <p className="text-base md:text-lg text-gray-600 font-normal text-center max-w-2xl mb-10">
          Micro-apprentissage épuré et adaptatif, pour tous les personnels d&apos;officine. Cas pratiques, expertise concrète.
        </p>
      </section>

      {/* Theme carousel élégant, monochrome */}
      <section className="w-full max-w-5xl mx-auto px-4 py-1">
        <ThemeCarousel />
      </section>

      {/* Stats sobres */}
      <section className="w-full max-w-3xl mx-auto px-4 py-7 mt-1">
        <div className="flex flex-wrap gap-5 justify-center items-center mb-8">
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-xl font-bold text-gray-900">110</div>
            <div className="text-xs text-gray-500">Mémofiches</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg font-bold text-gray-900">16</div>
            <div className="text-xs text-gray-500">Compétences</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg font-semibold text-gray-800">4</div>
            <div className="text-xs text-gray-500">Niveaux</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
            <div className="text-lg font-semibold text-gray-800">65%</div>
            <div className="text-xs text-gray-500">Progression</div>
          </div>
        </div>
        {/* CTA */}
        <div className="bg-white rounded-2xl p-8 shadow text-center border border-gray-100">
          <div className="text-xl font-semibold mb-3 text-gray-900">
            Commencer votre progression ?
          </div>
          <div className="text-gray-600 mb-5">
            Explorez les mémofiches interactives et développez vos compétences dès maintenant.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generateur"
              className="px-7 py-3 bg-gray-900 hover:bg-gray-800 text-white text-base rounded-lg font-semibold shadow transition"
            >
              Voir les mémofiches
            </Link>
            <Link
              to="/auth"
              className="px-7 py-3 border-2 border-gray-900 text-gray-900 text-base rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>
      <footer className="text-center text-xs text-gray-400 py-5 opacity-90">
        &copy; {new Date().getFullYear()} PharmIA – conçu pour l’officine moderne
      </footer>
    </main>
  );
}

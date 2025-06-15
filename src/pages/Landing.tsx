
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-blue-100 font-sora flex flex-col">
      <AppHeader />
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-10 md:py-0 w-full">
        {/* Illustration */}
        <div className="w-full md:w-2/5 flex items-center justify-center mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=640&q=80"
            alt="PharmIA Illustration"
            className="w-80 h-80 rounded-3xl object-cover shadow-xl border-4 border-white"
            loading="lazy"
          />
        </div>
        {/* Hero Content */}
        <section className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-blue-900 mb-3 leading-tight drop-shadow-sm">
            PharmIA&nbsp;Memofiches
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-blue-600 mb-6">
            Fiches pratiques IA : apprendre, réviser et conseiller au comptoir
          </h2>
          <ul className="mb-7 text-gray-700 text-base md:text-lg space-y-2 md:pl-2">
            <li>
              <span className="inline-block mr-2 text-blue-400">✓</span>
              Générateur IA de mémofiches contextualisées
            </li>
            <li>
              <span className="inline-block mr-2 text-blue-400">✓</span>
              Consultations rapides : médicaments, pathologies, conseils
            </li>
            <li>
              <span className="inline-block mr-2 text-blue-400">✓</span>
              Micro-apprentissage guidé conçu pour les équipes d’officine
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 w-full mb-3">
            <Link
              to="/auth"
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white text-lg rounded-lg font-semibold shadow-lg w-full sm:w-auto transition"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/generateur"
              className="px-8 py-3 border-2 border-blue-700 text-blue-700 text-lg rounded-lg font-semibold shadow-sm hover:bg-blue-50 w-full sm:w-auto transition"
            >
              Tester le générateur
            </Link>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Développé par :
            <a
              href="https://github.com/rbpharma-tn/pharmia-memofiches"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-600 underline hover:text-blue-800 transition"
            >
              rbpharma-tn/pharmia-memofiches
            </a>
          </div>
        </section>
      </div>
      <footer className="text-center text-xs text-gray-400 py-5">
        &copy; {new Date().getFullYear()} PharmIA – Conçu pour l’officine moderne
      </footer>
    </main>
  );
}


import AppHeader from "@/components/AppHeader";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg py-12 px-8 flex flex-col items-center text-center">
          <span className="mb-3 text-6xl">🤔</span>
          <h2 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900">
            Oups ! Page introuvable
          </h2>
          <div className="mb-6 text-base text-gray-600">
            La page que vous cherchez n’existe pas ou a été déplacée.
          </div>
          <Link
            to="/"
            className="bg-neutral-900 text-white rounded px-6 py-3 font-medium hover:bg-neutral-800 transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

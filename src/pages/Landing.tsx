
import AppHeader from "@/components/AppHeader";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg py-14 px-8 flex flex-col items-center text-center">
          <span className="mb-3 text-xl md:text-2xl text-gray-500 font-medium">
            Mémofiches Cas Comptoir à l'Officine
          </span>
          <h2 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Micro-apprentissage du comptoir officinal
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
            <Link
              to="/auth"
              className="bg-neutral-900 text-white rounded px-6 py-3 font-medium hover:bg-neutral-800 transition"
            >
              Connexion / Inscription
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

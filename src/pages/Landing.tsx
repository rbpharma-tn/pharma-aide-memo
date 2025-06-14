
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-1 text-black flex items-center justify-center gap-2">
          <span role="img" aria-label="pilule">💊</span>
          PharmIA
        </h1>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Mémofiches Cas Comptoir à l'Officine
        </h2>
        <div className="mb-7 text-base text-gray-600">
          Micro-apprentissage du comptoir officinal
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth"
            className="bg-black text-white rounded px-6 py-3 font-medium hover:bg-neutral-800 transition"
          >
            Connexion / Inscription
          </Link>
        </div>
      </div>
    </main>
  );
}

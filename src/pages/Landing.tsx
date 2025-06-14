
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <span role="img" aria-label="pilule">💊</span>
          PharmIA
        </h1>
        <h2 className="text-lg font-semibold text-blue-800 mb-4">
          Mémofiches Cas Comptoir à l'Officine
        </h2>
        <div className="mb-3 text-base text-cyan-700">
          Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques
        </div>
        <p className="text-md text-gray-700 mb-8">
          Plateforme interactive et éducative pour les professionnels de la pharmacie permettant de réviser et d'approfondir leurs connaissances sur des sujets clés rencontrés au comptoir de l'officine.<br />
          <span className="text-sm text-gray-500">Sélectionnez une option pour commencer :</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth" className="bg-blue-600 text-white rounded px-6 py-3 font-medium hover:bg-blue-700 transition">
            Connexion / Inscription
          </Link>
        </div>
      </div>
    </main>
  );
}

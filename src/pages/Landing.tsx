
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4">rbpharma-tn</h1>
        <p className="text-lg text-gray-700 mb-8">
          Plateforme de mémofiches interactives pour la pharmacie<br />
          Sélectionnez une option pour commencer :
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

import AppHeader from "@/components/AppHeader";

export default function AdminHome() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg py-14 px-8 flex flex-col items-center text-center">
          <span className="mb-3 text-xl md:text-2xl text-gray-500 font-medium">
            Espace Admin
          </span>
          <h2 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Gestion des mémofiches
          </h2>
          <div className="mb-2 text-base text-gray-600">
            Interface administrateur pour gérer les mémofiches et les utilisateurs.
          </div>
        </div>
      </div>
    </main>
  );
}

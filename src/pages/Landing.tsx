import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { ArrowLeft, ArrowRight, CircleHelp } from "lucide-react";

const expertises = [
  {
    icon: <ArrowRight className="h-6 w-6 mb-2 text-blue-700" />,
    title: "Ordonnances",
    desc: "Analyse et dispensation des prescriptions médicales",
  },
  {
    icon: <CircleHelp className="h-6 w-6 mb-2 text-blue-700" />,
    title: "Micronutrition",
    desc: "Compléments alimentaires et conseils nutritionnels",
  },
  {
    icon: <ArrowRight className="h-6 w-6 mb-2 text-blue-700" />,
    title: "Dermo-cosmétique",
    desc: "Soins de la peau et produits de beauté",
  },
  {
    icon: <Heart className="h-6 w-6 mb-2 text-blue-700" />,
    title: "Pharmacie vétérinaire",
    desc: "Santé animale et médicaments vétérinaires",
  },
];

const steps = [
  {
    title: "Fondamentaux du conseil",
    level: "Débutant",
    desc: "Maîtriser les bases du conseil pharmaceutique au comptoir",
    done: true,
    stats: "100%",
    fiches: "15",
    time: "2-4 semaines",
  },
  {
    title: "Expertise approfondie",
    level: "Intermédiaire",
    desc: "Développez vos compétences en conseils spécialisés",
    done: true,
    stats: "65%",
    fiches: "25",
    time: "4-6 semaines",
  },
  {
    title: "Spécialisation experte",
    level: "Avancé",
    desc: "Perfectionnez-vous dans des domaines pointus",
    done: false,
    stats: "0%",
    fiches: "30",
    time: "6-8 semaines",
  },
  {
    title: "Maîtrise complète",
    level: "Expert",
    desc: "Devenez référent en conseil pharmaceutique",
    done: false,
    stats: "0%",
    fiches: "40",
    time: "8-12 semaines",
  },
];

function Heart(props: any) {
  // mini heart icon for vet
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.9 4 9.5C4 6.5 6.5 4 9.5 4C11.04 4 12.53 4.81 13.32 6.09C14.11 4.81 15.6 4 17.13 4C20.14 4 22.63 6.5 22.63 9.5C22.63 13.9 15 21 15 21H12Z" />
    </svg>
  );
}

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-blue-100 font-sora flex flex-col">
      <AppHeader />
      {/* Section 1: Hero */}
      <section className="w-full max-w-5xl mx-auto flex flex-col items-center pt-12 pb-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair text-blue-900 text-center mb-4 leading-tight drop-shadow-sm">
          Mémofiches conseil à l&apos;officine
        </h1>
        <p className="text-lg md:text-xl text-gray-800 font-medium text-center max-w-2xl mb-10">
          Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques.
        </p>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Domaines d&apos;expertise</h2>
          <div className="flex flex-wrap gap-5 justify-center mb-6">
            {expertises.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl px-6 py-6 flex flex-col items-center w-60 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                {item.icon}
                <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                <div className="text-sm text-gray-500 text-center">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Progression learning steps */}
      <section className="w-full max-w-6xl mx-auto px-4 py-7">
        <h2 className="text-lg md:text-xl font-semibold text-blue-900 text-center mb-5">Parcours d&apos;apprentissage personnalisé</h2>
        <div className="flex flex-col items-center">
          <p className="text-gray-700 text-center mb-7 max-w-3xl">
            Progressez étape par étape dans votre maîtrise du conseil pharmaceutique. Chaque niveau débloque de nouvelles compétences et mémofiches spécialisées.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`rounded-xl border px-6 py-6 shadow-sm bg-white flex flex-col items-center text-center ${
                  !step.done ? "opacity-50" : ""
                }`}
              >
                <div className="mb-1 text-base font-bold text-blue-800">
                  {step.title}
                </div>
                <div className="text-xs font-semibold text-gray-500 mb-2">{step.level}</div>
                <div className="text-gray-700 text-sm mb-3">{step.desc}</div>
                <div className="flex flex-col items-center mt-auto">
                  <div className="text-sm text-blue-600 font-medium">
                    Progression {step.stats}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{step.fiches} Mémofiches · {step.time} Durée</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: stats and CTA */}
      <section className="w-full max-w-3xl mx-auto px-4 py-7">
        <div className="flex flex-wrap gap-6 justify-center items-center mb-7">
          <div className="bg-white rounded-xl px-7 py-5 shadow border flex flex-col items-center min-w-[120px]">
            <div className="text-2xl font-bold text-blue-900">110</div>
            <div className="text-xs text-gray-600">Mémofiches totales</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow border flex flex-col items-center min-w-[120px]">
            <div className="text-xl font-bold text-green-700">1/4</div>
            <div className="text-xs text-gray-600">Niveaux complétés</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow border flex flex-col items-center min-w-[120px]">
            <div className="text-xl font-bold text-blue-700">65%</div>
            <div className="text-xs text-gray-600">Progression actuelle</div>
          </div>
          <div className="bg-white rounded-xl px-7 py-5 shadow border flex flex-col items-center min-w-[120px]">
            <div className="text-xl font-bold text-purple-600">16</div>
            <div className="text-xs text-gray-600">Compétences acquises</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow text-center border">
          <div className="text-xl font-semibold mb-3">Prêt à commencer votre formation&nbsp;?</div>
          <div className="text-gray-700 mb-5">
            Découvrez nos mémofiches interactives et commencez à approfondir vos connaissances dès maintenant.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generateur"
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white text-lg rounded-lg font-semibold shadow transition"
            >
              Voir les mémofiches
            </Link>
            <Link
              to="/auth"
              className="px-8 py-3 border-2 border-blue-700 text-blue-700 text-lg rounded-lg font-semibold shadow-sm hover:bg-blue-50 transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-xs text-gray-400 py-5">
        &copy; {new Date().getFullYear()} PharmIA – Conçu pour l’officine moderne
      </footer>
    </main>
  );
}

import { useState } from "react";
import { Home, Podcast, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemoficheAccordion } from "./MemoficheAccordion";

// Ajout des props pour overrider le contenu si généré par IA
type Section = { id: string; label: string; content: string };
type Props = {
  onClose?: () => void;
  overrideTitle?: string;
  overrideSubtitle?: string;
  overrideDescription?: string;
  overrideSections?: Section[];
};

export function MemofichePreview({
  onClose,
  overrideTitle,
  overrideSubtitle,
  overrideDescription,
  overrideSections,
}: Props) {
  const [activeTab, setActiveTab] = useState("memo");
  const TABS = [
    { id: "memo", label: "Memo", enabled: true },
    { id: "flashcards", label: "Flashcards", enabled: false },
    { id: "quiz", label: "Quiz", enabled: false },
    { id: "glossaire", label: "Glossaire", enabled: false },
    { id: "kahoot", label: "Kahoot!", enabled: false },
  ];
  const PROGRESS = 0;

  // Affichage dynamique du contenu IA ou fallback sur mock
  const title = overrideTitle || "Candidose Vaginale";
  const subtitle = overrideSubtitle || "";
  const description = overrideDescription || "";
  const sections: Section[] =
    overrideSections ||
    [
      { id: "memo", label: "Mémo", content: "Contenu généré par l'IA ici…" },
      { id: "cas", label: "Cas comptoir", content: "…" },
      { id: "questions", label: "Questions à poser", content: "…" },
      { id: "orienter", label: "Quand orienter vers le médecin", content: "…" },
      { id: "pathologie", label: "Pathologie et signes typiques", content: "…" },
      { id: "conseils", label: "Conseils produit principal", content: "…" },
      { id: "associes", label: "Produits associés", content: "…" },
      { id: "hygiene", label: "Hygiène de vie & Alimentation", content: "…" },
      { id: "references", label: "Références bibliographiques", content: "…" },
    ];

  return (
    <div className="relative py-10 px-6 md:px-16 bg-gray-50 min-h-[90vh] rounded-xl shadow-lg max-w-3xl mx-auto my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex flex-col items-center grow">
          <span className="text-xl md:text-2xl text-gray-500 font-medium mb-1">Mémo fiche conseil</span>
          <span className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{title}</span>
          {subtitle && (
            <span className="text-base text-gray-500 font-medium mt-1">{subtitle}</span>
          )}
        </div>
        {onClose ? (
          <Button variant="ghost" size="icon" aria-label="Fermer l’aperçu" onClick={onClose}>
            ×
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="/">
              <Home size={20} />
              <span className="hidden md:inline">Accueil</span>
            </a>
          </Button>
        )}
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8 w-full overflow-x-auto items-center">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`px-5 py-2 rounded-lg border transition font-medium min-w-[100px] text-base ${
              activeTab === tab.id
                ? "bg-neutral-900 text-white shadow"
                : tab.enabled
                  ? "bg-white text-neutral-700 hover:bg-gray-100"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!tab.enabled}
            onClick={() => tab.enabled && setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <a
          className="px-2 py-2 rounded-lg border bg-white text-neutral-500 ml-auto flex items-center gap-1 hover:bg-gray-100 transition"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Podcast"
        >
          <Podcast size={20} />
        </a>
        <a
          className="px-2 py-2 rounded-lg border bg-white text-neutral-500 flex items-center gap-1 hover:bg-gray-100 transition"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
      </div>
      {/* Progression */}
      <div className="mb-5 flex items-center gap-4 w-full">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            style={{ width: `${PROGRESS}%` }}
            className="h-full bg-neutral-900 transition-all"
          />
        </div>
        <span className="text-xs font-semibold text-neutral-600 min-w-[80px] text-right">Progression: {PROGRESS}%</span>
      </div>
      {/* Accordéons */}
      <div className="w-full mt-6 space-y-3">
        {sections.map(section => (
          <div key={section.id} className="mb-3 bg-white rounded-lg shadow border">
            <div className="text-base font-medium px-5 py-4">{section.label}</div>
            <div className="px-6 pb-5 text-muted-foreground whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>
      {description && (
        <div className="mt-8 text-gray-600 text-base leading-relaxed">
          <strong>Description :</strong> {description}
        </div>
      )}
    </div>
  );
}

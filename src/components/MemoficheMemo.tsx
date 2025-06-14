
import { useState } from "react";
import { Home } from "lucide-react";
import { MemoficheAccordion } from "./MemoficheAccordion";
import { Button } from "@/components/ui/button";

const TABS = [
  { id: "memo", label: "Memo", enabled: true },
  { id: "flashcards", label: "Flashcards", enabled: false },
  { id: "quiz", label: "Quiz", enabled: false },
  { id: "glossaire", label: "Glossaire", enabled: false },
  { id: "kahoot", label: "Kahoot!", enabled: false },
  // Optionally: icons for voice/video, left as placeholders
];

export function MemoficheMemo() {
  const [activeTab, setActiveTab] = useState("memo");
  const PROGRESS = 0; // To be updated when IA, quiz, etc. arrive

  return (
    <div className="relative py-10 px-6 md:px-16 bg-gray-50 min-h-[90vh] rounded-xl shadow-lg max-w-3xl mx-auto">
      {/* Header & Accueil */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex flex-col items-center grow">
          <span className="text-xl md:text-2xl text-gray-500 font-medium mb-1">Mémo fiche conseil</span>
          <span className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Candidose Vaginale</span>
        </div>
        <Button variant="outline" size="sm" className="gap-2" asChild>
          <a href="/">
            <Home size={20} />
            <span className="hidden md:inline">Accueil</span>
          </a>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 w-full overflow-x-auto">
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
        {/* Optionally: mic + video buttons */}
        <button
          className="px-2 py-2 rounded-lg border bg-white text-neutral-500 ml-auto"
          disabled
          aria-label="Micro (à venir)"
        >
          <svg width="20" height="20" className="inline" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/><rect x="8" y="5" width="4" height="7" rx="2" fill="currentColor"/></svg>
        </button>
        <button
          className="px-2 py-2 rounded-lg border bg-white text-neutral-500"
          disabled
          aria-label="Vidéo (à venir)"
        >
          <svg width="20" height="20" className="inline" fill="none"><rect x="3" y="6" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="9" width="3" height="2" rx="1" fill="currentColor"/></svg>
        </button>
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

      {/* Accordéons par section */}
      <MemoficheAccordion />
    </div>
  );
}


import { BookOpenText, BookCopy, Link2, Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeSuggestionsSidebarProps {
  onSuggestionClick: (theme: string) => void;
  className?: string;
}

export function ThemeSuggestionsSidebar({ onSuggestionClick, className }: ThemeSuggestionsSidebarProps) {
  return (
    <aside className={`w-64 bg-gradient-to-b from-[#f7f7fa] to-[#ececf2] border-r min-h-svh flex flex-col p-4 gap-4 ${className || ""}`}>
      <h2 className="text-lg font-bold mb-3 text-gray-900 font-inter">
        Suggestions
      </h2>
      <ul className="space-y-2">
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start font-inter"
            onClick={() => onSuggestionClick("Otite du nourrisson")}
          >
            Otite du nourrisson
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start font-inter"
            onClick={() => onSuggestionClick("Candidose orale")}
          >
            Candidose orale
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start font-inter"
            onClick={() => onSuggestionClick("Conseils mal de gorge")}
          >
            Conseils mal de gorge
          </Button>
        </li>
      </ul>
      <div className="mt-6 flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-start py-2 font-inter"
        >
          <BookOpenText className="w-4 h-4" />
          Prendre en charge la base de connaissance
        </Button>
        <Button
          variant="secondary"
          className="w-full flex items-center gap-2 justify-start py-2 font-inter"
        >
          <Link2 className="w-4 h-4" />
          Voir les sources IA
        </Button>
        <a
          href="#"
          className="w-full inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-inter mt-1"
          tabIndex={0}
        >
          <BookCopy className="w-4 h-4" />
          Ajouter à la base de mémofiches
        </a>
      </div>
      <div className="mt-8">
        <div className="text-xs text-gray-400 mb-1 font-inter">
          À venir : Historique !
        </div>
        <div className="bg-white rounded p-2 text-gray-400 text-sm text-center font-inter">
          Votre historique de mémofiches s’affichera ici.
        </div>
      </div>
    </aside>
  );
}

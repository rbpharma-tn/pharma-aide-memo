
import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Pill,
  Leaf,
  Sparkles,
  Heart,
  FlaskConical,
  MessageCircle,
  Wrench,
} from "lucide-react";

const themes = [
  {
    id: "maladies-courantes",
    title: "Maladies courantes",
    description: "Pathologies fréquentes au comptoir et leur prise en charge",
    icon: Stethoscope,
  },
  {
    id: "ordonnances",
    title: "Ordonnances",
    description: "Analyse et dispensation des prescriptions médicales",
    icon: Pill,
  },
  {
    id: "micronutrition",
    title: "Micronutrition",
    description: "Compléments alimentaires et conseils nutritionnels",
    icon: Leaf,
  },
  {
    id: "dermo-cosmetique",
    title: "Dermo-cosmétique",
    description: "Soins de la peau et produits de beauté",
    icon: Sparkles,
  },
  {
    id: "pharmacie-veterinaire",
    title: "Pharmacie vétérinaire",
    description: "Santé animale et médicaments vétérinaires",
    icon: Heart,
  },
  {
    id: "dispositifs",
    title: "Dispositifs",
    description: "Dispositifs médicaux et matériel de santé",
    icon: Wrench,
  },
  {
    id: "pharmacologie",
    title: "Pharmacologie",
    description: "Mécanismes d'action et interactions médicamenteuses",
    icon: FlaskConical,
  },
  {
    id: "communication",
    title: "Communication",
    description: "Relation patient et techniques de communication",
    icon: MessageCircle,
  },
];

export default function ThemeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Cartes visibles selon la largeur
  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 4;
  };

  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };
    handleResize();
    window.addEventListener("resize", debouncedResize, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // défilement auto
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = themes.length - visibleCards;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleCards]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = themes.length - visibleCards;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };
  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = themes.length - visibleCards;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };
  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative select-none">
      {/* En-tête */}
      <h3 className="text-base md:text-lg font-semibold text-gray-900 tracking-wide mb-6 text-center uppercase">Domaines d&apos;expertise</h3>
      {/* Carrousel */}
      <div className="relative overflow-visible">
        {/* Boutons nav */}
        <button
          onClick={prevSlide}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:bg-gray-100"
          aria-label="Précédent"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:bg-gray-100"
          aria-label="Suivant"
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
        {/* Cards */}
        <div className="mx-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {themes.map((theme, idx) => {
              const Icon = theme.icon;
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={theme.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / visibleCards}%` }}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setIsAutoPlaying(true);
                  }}
                >
                  <div className={`h-full bg-white border border-gray-200 rounded-xl p-6 text-center transition-all duration-200 ease-out group
                    ${isHovered ? "shadow-md scale-105 border-gray-300 ring-1 ring-gray-100" : "shadow-sm"}
                  `}>
                    <div className="flex items-center justify-center mb-4">
                      <Icon className={`h-9 w-9 mx-auto ${isHovered ? "text-gray-800" : "text-gray-400"} transition-colors`} />
                    </div>
                    <div className={`font-semibold text-base mb-2 ${isHovered ? "text-gray-900" : "text-gray-700"} transition-colors`}>
                      {theme.title}
                    </div>
                    <div className="text-sm text-gray-500 leading-snug">{theme.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Indicateurs */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: themes.length - visibleCards + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200
              ${currentIndex === i ? "bg-gray-900 w-5" : "bg-gray-300 hover:bg-gray-400"}
            `}
            aria-label={`Aller au groupe ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

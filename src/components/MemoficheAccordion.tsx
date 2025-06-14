
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mise à jour et ajout des sections, dans l'ordre demandé :
const SECTIONS = [
  { id: "memo", label: "Mémo" },
  { id: "cas", label: "Cas comptoir" },
  { id: "questions", label: "Questions à poser" },
  { id: "orienter", label: "Quand orienter vers le médecin" },
  { id: "pathologie", label: "Pathologie et signes typiques" },
  { id: "conseils", label: "Conseils produit principal" },
  { id: "associes", label: "Produits associés" },
  { id: "hygiene", label: "Hygiène de vie & Alimentation" },
  { id: "references", label: "Références bibliographiques" },
];

export function MemoficheAccordion() {
  return (
    <Accordion type="multiple" className="w-full mt-6">
      {SECTIONS.map(section => (
        <AccordionItem key={section.id} value={section.id} className="mb-3 bg-white rounded-lg shadow border">
          <AccordionTrigger className="text-base font-medium px-5 py-4">{section.label}</AccordionTrigger>
          <AccordionContent className="px-6 pb-5 text-muted-foreground">
            {/* Placeholder content, IA coming soon! */}
            <span>Contenu généré par l&apos;IA ici…</span>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}


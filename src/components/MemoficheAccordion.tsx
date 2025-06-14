
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SECTIONS = [
  { id: "cas", label: "Cas comptoir" },
  { id: "questions", label: "Questions à poser" },
  { id: "orienter", label: "Quand orienter vers le médecin" },
  { id: "pathologie", label: "Pathologie et signes typiques" },
  { id: "conseils", label: "Conseils produits" },
  { id: "hygiene", label: "Hygiène de vie" },
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

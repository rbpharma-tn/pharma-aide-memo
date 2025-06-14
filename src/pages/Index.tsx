
import { MemoficheMemo } from "@/components/MemoficheMemo";

const Index = () => {
  // À terme tu pourras proposer la génération IA ou le choix du type/maladie dans une modale/page d'accueil !
  // Pour cette première version, on affiche un exemple statique d'une mémofiche Candidose Vaginale.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white py-16">
      <MemoficheMemo />
    </div>
  );
};

export default Index;

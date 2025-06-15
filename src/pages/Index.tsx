
import AppHeader from "@/components/AppHeader";
import { MemoficheMemo } from "@/components/MemoficheMemo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-white">
      <AppHeader />
      <main className="flex-1 flex items-center justify-center py-16">
        <MemoficheMemo />
      </main>
    </div>
  );
};

export default Index;

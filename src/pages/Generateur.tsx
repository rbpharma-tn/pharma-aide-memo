
import { useState } from "react";
import { MemofichePreview } from "@/components/MemofichePreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

type MemoficheStruct = {
  title: string;
  subtitle?: string;
  description?: string;
  sections?: { id: string; label: string; content: string }[];
};

export default function Generateur() {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [memofiche, setMemofiche] = useState<MemoficheStruct | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMemofiche(null);

    try {
      const resp = await fetch(
        "https://fxohysiwchvmyhzdtffq.functions.supabase.co/generate-memofiche-together",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme }),
        }
      );
      const data = await resp.json();

      if (!resp.ok || !data.memofiche) {
        setError(
          data?.error ||
            "Erreur : la génération IA n’a pas abouti. Merci de réessayer plus tard."
        );
        setLoading(false);
        return;
      }

      setMemofiche(data.memofiche);
    } catch (err: any) {
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Erreur inconnue lors de la génération IA."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <SidebarProvider>
        <div className="flex flex-1 min-h-0 w-full">
          {/* Sidebar gauche : suggestions ou historique */}
          <aside className="w-64 bg-gradient-to-b from-[#f7f7fa] to-[#ececf2] border-r min-h-svh flex flex-col p-4 gap-4">
            <h2 className="text-lg font-bold mb-3 text-gray-900">Suggestions</h2>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme("Otite du nourrisson")}
                >
                  Otite du nourrisson
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme("Candidose orale")}
                >
                  Candidose orale
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme("Conseils mal de gorge")}
                >
                  Conseils mal de gorge
                </Button>
              </li>
              {/* À personnaliser ou rendre dynamique plus tard */}
            </ul>
            {/* Placeholder : historique, filtres, ou autre utile */}
            <div className="mt-8">
              <div className="text-xs text-gray-400 mb-1">À venir : Historique&nbsp;!</div>
              <div className="bg-white rounded p-2 text-gray-400 text-sm text-center">Votre historique de mémofiches s’affichera ici.</div>
            </div>
          </aside>

          {/* Corps central */}
          <SidebarInset className="flex-1 flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-b from-white to-gray-50">
            <main className="w-full max-w-2xl mx-auto">
              <Card className="bg-white shadow-lg rounded-xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  Générateur de mémofiches IA
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <Input
                    placeholder="Entrez un sujet, ex : Otite du nourrisson"
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    required
                    autoFocus
                    className="text-base"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    className="mt-1"
                    disabled={loading || !theme.trim()}
                  >
                    {loading ? "Génération en cours..." : "Générer"}
                  </Button>
                  {loading && (
                    <div className="text-gray-500 animate-pulse text-center">
                      Patientez un instant…<br />Votre mémofiche se prépare !
                    </div>
                  )}
                  {error && (
                    <div className="text-center text-red-500 bg-red-50 rounded px-2 py-1 text-sm">
                      {error}
                    </div>
                  )}
                </form>
              </Card>
              {memofiche && (
                <div className="mt-6">
                  <MemofichePreview
                    overrideTitle={memofiche.title}
                    overrideSubtitle={memofiche.subtitle}
                    overrideDescription={memofiche.description}
                    overrideSections={memofiche.sections}
                  />
                </div>
              )}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

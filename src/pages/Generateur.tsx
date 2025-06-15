
import { useState } from "react";
import { MemofichePreview } from "@/components/MemofichePreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { BookOpenText, BookCopy, Link2 } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <AppHeader />
      <SidebarProvider>
        <div className="flex flex-1 min-h-0 w-full">
          {/* Sidebar Suggestions */}
          <aside className="w-64 bg-gradient-to-b from-[#f7f7fa] to-[#ececf2] border-r min-h-svh flex flex-col p-4 gap-4">
            <h2 className="text-lg font-bold mb-3 text-gray-900 font-inter">
              Suggestions
            </h2>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-inter"
                  onClick={() => setTheme("Otite du nourrisson")}
                >
                  Otite du nourrisson
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-inter"
                  onClick={() => setTheme("Candidose orale")}
                >
                  Candidose orale
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-inter"
                  onClick={() => setTheme("Conseils mal de gorge")}
                >
                  Conseils mal de gorge
                </Button>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              {/* Inspiré de Perplexity : liens raccourcis pour IA */}
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
          {/* Corps central */}
          <SidebarInset className="flex-1 flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-b from-white to-gray-50 font-inter">
            <main className="w-full max-w-2xl mx-auto">
              <Card className="bg-white shadow-lg rounded-xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center font-inter">
                  Générateur de Mémofiches
                </h1>
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-4">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 font-inter"
                  >
                    <BookCopy className="w-5 h-5" />
                    Ajouter dans la base
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 font-inter"
                  >
                    <Link2 className="w-5 h-5" />
                    Sources IA
                  </Button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <Input
                    placeholder="Entrez un sujet, ex : Otite du nourrisson"
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    required
                    autoFocus
                    className="text-base font-inter"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    className="mt-1 font-inter"
                    disabled={loading || !theme.trim()}
                  >
                    {loading ? "Génération en cours..." : "Générer"}
                  </Button>
                  {loading && (
                    <div className="text-gray-500 animate-pulse text-center font-inter">
                      Patientez un instant…<br />Votre mémofiche se prépare !
                    </div>
                  )}
                  {error && (
                    <div className="text-center text-red-500 bg-red-50 rounded px-2 py-1 text-sm font-inter">
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

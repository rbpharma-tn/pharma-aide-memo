
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MemofichePreview } from "./MemofichePreview";

type MemoficheStruct = {
  title: string;
  subtitle?: string;
  description?: string;
  sections?: { id: string; label: string; content: string }[];
};

export function MemoficheAIGenerator({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [memofiche, setMemofiche] = useState<MemoficheStruct | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAiError(null);
    setMemofiche(null);

    try {
      const resp = await fetch(
        "https://fxohysiwchvmyhzdtffq.functions.supabase.co/generate-memofiche-together",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ theme }),
        }
      );
      const data = await resp.json();

      if (!resp.ok || !data.memofiche) {
        setAiError(
          data?.error ||
            "Erreur : la génération IA n’a pas abouti. Merci de réessayer plus tard."
        );
        setLoading(false);
        return;
      }

      setMemofiche(data.memofiche);
      setShowPreview(true);
    } catch (err: any) {
      setAiError(
        typeof err === "string"
          ? err
          : err?.message || "Erreur inconnue lors de la génération IA."
      );
    } finally {
      setLoading(false);
    }
  }

  // Pour réinitialiser la modale à chaque ouverture
  function handleDialogOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setTheme("");
      setLoading(false);
      setShowPreview(false);
      setMemofiche(null);
      setAiError(null);
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-2xl px-0 py-0 bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-1 tracking-tight text-gray-900">
            Générer une mémofiche IA
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center w-full px-8 pt-4 pb-6">
          {!showPreview ? (
            <form
              className="w-full max-w-md flex flex-col items-center gap-4"
              onSubmit={handleSubmit}
            >
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
                className="w-full mt-1"
                disabled={loading || !theme.trim()}
              >
                {loading ? "Génération en cours..." : "Générer"}
              </Button>
              {loading && (
                <div className="mt-4 text-gray-500 animate-pulse text-center">
                  Patientez un instant…<br />Votre mémofiche se prépare !
                </div>
              )}
              {aiError && (
                <div className="mt-2 text-center text-red-500 bg-red-50 rounded px-2 py-1 text-sm">
                  {aiError}
                </div>
              )}
            </form>
          ) : memofiche ? (
            <div className="w-full">
              <MemofichePreview
                {...(memofiche && {
                  overrideTitle: memofiche.title,
                  overrideSubtitle: memofiche.subtitle,
                  overrideDescription: memofiche.description,
                  overrideSections: memofiche.sections,
                })}
                onClose={() => handleDialogOpenChange(false)}
              />
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full text-center py-8 text-gray-500">
              Erreur lors de la génération de la mémofiche.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

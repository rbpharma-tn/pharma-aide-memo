
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MemofichePreview } from "./MemofichePreview";

export function MemoficheAIGenerator({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
    }, 1700);
  }

  // Pour réinitialiser la modale à chaque ouverture
  function handleDialogOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setTheme("");
      setLoading(false);
      setShowPreview(false);
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
            </form>
          ) : (
            <div className="w-full">
              <MemofichePreview
                // On injecte le sujet dans la preview
                onClose={() => handleDialogOpenChange(false)}
              />
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


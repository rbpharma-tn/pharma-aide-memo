import { useState } from "react";
import { MemofichePreview } from "@/components/MemofichePreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { BookCopy, Link2 } from "lucide-react";
import { ThemeSuggestionsSidebar } from "@/components/ThemeSuggestionsSidebar";
import { ManualFields } from "@/components/ManualFields";
import { SupplementDocumentsBlock } from "@/components/SupplementDocumentsBlock";
import { ErrorWithDetails } from "@/components/ErrorWithDetails";

type MemoficheStruct = {
  title: string;
  subtitle?: string;
  description?: string;
  sections?: { id: string; label: string; content: string }[];
};

type SupplementFile = {
  name: string;
  type: string;
  content: string; // encodé en base64 ou texte brut selon le type
};

export default function Generateur() {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [memofiche, setMemofiche] = useState<MemoficheStruct | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Champs manuels
  const [manualPhoto, setManualPhoto] = useState<File | null>(null);
  const [manualPhotoName, setManualPhotoName] = useState<string>("");
  const [manualTitle, setManualTitle] = useState<string>("");
  const [manualYoutube, setManualYoutube] = useState<string>("");
  const [manualPodcast, setManualPodcast] = useState<string>("");

  // Support documentaire
  const [supplementFiles, setSupplementFiles] = useState<SupplementFile[]>([]);
  const [supplementText, setSupplementText] = useState("");

  // Pour afficher le détail de l’erreur brute
  const [rawError, setRawError] = useState<any>(null);

  // Gestion de l’upload multi-fichiers texte/pdf
  async function handleSupplementFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr = Array.from(e.target.files);
      const readPromises = filesArr.map(
        file =>
          new Promise<SupplementFile>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              let content = "";
              if (file.type === "application/pdf") {
                content = ""; // Extraction PDF côté backend
              } else {
                content = reader.result as string;
              }
              resolve({ name: file.name, type: file.type, content });
            };
            reader.onerror = () => reject(reader.error);
            if (file.type.startsWith("text/")) {
              reader.readAsText(file);
            } else if (file.type === "application/pdf") {
              resolve({
                name: file.name,
                type: file.type,
                content: "",
              });
            } else {
              resolve({
                name: file.name,
                type: file.type,
                content: "",
              });
            }
          })
      );
      const docs = await Promise.all(readPromises);
      setSupplementFiles(docs.filter(f => f.content !== "" || f.type === "application/pdf"));
    } else {
      setSupplementFiles([]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMemofiche(null);
    setRawError(null);

    try {
      const supplement = {
        text: supplementText,
        files: supplementFiles,
      };

      const resp = await fetch(
        "https://fxohysiwchvmyhzdtffq.functions.supabase.co/generate-memofiche-gemini",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme, supplement }),
        }
      );
      const data = await resp.json();

      // Ajout d'un log détaillé pour debug
      console.log("[DEBUG Gemini response]", data);

      if (!resp.ok || !data.memofiche) {
        setError(
          data?.error ||
            "Erreur : la génération IA n’a pas abouti. Merci de réessayer plus tard."
        );
        setRawError(data?.raw || JSON.stringify(data, null, 2) || "Aucun détail transmis.");
        return;
      }

      setMemofiche(data.memofiche);
    } catch (err: any) {
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Erreur inconnue lors de la génération IA."
      );
      setRawError(err?.stack || null);
    } finally {
      setLoading(false);
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setManualPhoto(e.target.files[0]);
      setManualPhotoName(e.target.files[0].name);
    } else {
      setManualPhoto(null);
      setManualPhotoName("");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sora">
      <AppHeader />
      <SidebarProvider>
        <div className="flex flex-1 min-h-0 w-full">
          {/* Sidebar Suggestions */}
          <ThemeSuggestionsSidebar onSuggestionClick={setTheme} />
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
                    className="text-lg font-inter py-4 px-5 rounded-lg shadow-sm border-2 border-indigo-200 w-full mb-2 focus:ring-2 focus:ring-indigo-300"
                    disabled={loading}
                  />
                  {/* --- Champs Manuels sous le champ sujet --- */}
                  <ManualFields
                    manualPhotoName={manualPhotoName}
                    loading={loading}
                    manualTitle={manualTitle}
                    manualYoutube={manualYoutube}
                    manualPodcast={manualPodcast}
                    onPhotoChange={handlePhotoChange}
                    onTitleChange={e => setManualTitle(e.target.value)}
                    onYoutubeChange={e => setManualYoutube(e.target.value)}
                    onPodcastChange={e => setManualPodcast(e.target.value)}
                  />
                  {/* --- Support documentaire IA (text/pdf) --- */}
                  <SupplementDocumentsBlock
                    supplementFiles={supplementFiles}
                    loading={loading}
                    onFilesChange={handleSupplementFilesChange}
                    supplementText={supplementText}
                    onTextChange={e => setSupplementText(e.target.value)}
                  />
                  {/* --- Fin support documentaire --- */}
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
                  <ErrorWithDetails error={error} rawError={rawError} />
                  {/* Affichage direct du rawError à l'écran, même si vide */}
                  {rawError && (
                    <div className="mt-2 text-xs text-orange-800 bg-orange-50 border rounded p-2 font-mono whitespace-pre-wrap break-all">
                      <strong>Erreur brute/Debug :</strong>
                      <br />
                      {typeof rawError === "string"
                        ? rawError
                        : JSON.stringify(rawError, null, 2)}
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

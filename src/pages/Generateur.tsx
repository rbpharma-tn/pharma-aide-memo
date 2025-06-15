
import { useState } from "react";
import { MemofichePreview } from "@/components/MemofichePreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { BookOpenText, BookCopy, Link2, Upload, File } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type MemoficheStruct = {
  title: string;
  subtitle?: string;
  description?: string;
  sections?: { id: string; label: string; content: string }[];
};

// Structure pour l’envoi de docs additionnels
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

  // Nouveaux états pour les champs d’intro manuelle
  const [manualPhoto, setManualPhoto] = useState<File | null>(null);
  const [manualPhotoName, setManualPhotoName] = useState<string>("");
  const [manualTitle, setManualTitle] = useState<string>("");
  const [manualYoutube, setManualYoutube] = useState<string>("");
  const [manualPodcast, setManualPodcast] = useState<string>("");

  // Nouveaux états pour le support documentaire
  const [supplementFiles, setSupplementFiles] = useState<SupplementFile[]>([]);
  const [supplementText, setSupplementText] = useState("");

  // Gestion de l’upload multi-fichiers texte/pdf (contextes annexes)
  async function handleSupplementFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      // On lit chaque fichier (max 3 Mo/fichier conseillé)
      const filesArr = Array.from(e.target.files);
      const readPromises = filesArr.map(
        file =>
          new Promise<SupplementFile>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              let content = "";
              if (file.type === "application/pdf") {
                content = ""; // Extraction PDF côté backend (optionnel)
              } else {
                content = reader.result as string;
              }
              resolve({ name: file.name, type: file.type, content });
            };
            reader.onerror = () => reject(reader.error);
            if (file.type.startsWith("text/")) {
              reader.readAsText(file);
            } else if (file.type === "application/pdf") {
              // On n’extrait pas le PDF côté front, placeholder
              resolve({
                name: file.name,
                type: file.type,
                content: "", // Extraction à prévoir côté backend
              });
            } else {
              // Format non supporté : ignoré
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

    try {
      // Prépare les supplements (texte + fichiers)
      const supplement = {
        text: supplementText,
        files: supplementFiles,
      };

      const resp = await fetch(
        "https://fxohysiwchvmyhzdtffq.functions.supabase.co/generate-memofiche-together",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme, supplement }),
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
                    className="text-lg font-inter py-4 px-5 rounded-lg shadow-sm border-2 border-indigo-200 w-full mb-2 focus:ring-2 focus:ring-indigo-300"
                    disabled={loading}
                  />
                  {/* --- Champs Manuels sous le champ sujet --- */}
                  <div className="flex flex-col gap-3 mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Photo Mémofiche
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="text-base font-inter"
                      disabled={loading}
                    />
                    {manualPhotoName && (
                      <div className="text-xs text-gray-500">
                        Fichier sélectionné : {manualPhotoName}
                      </div>
                    )}

                    <label className="text-sm font-medium text-gray-700 mt-2">
                      Titre Mémofiche
                    </label>
                    <Input
                      type="text"
                      placeholder="Titre de la mémofiche"
                      value={manualTitle}
                      onChange={e => setManualTitle(e.target.value)}
                      disabled={loading}
                      className="text-base font-inter"
                    />

                    <label className="text-sm font-medium text-gray-700 mt-2">
                      Lien Youtube
                    </label>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/xxx"
                      value={manualYoutube}
                      onChange={e => setManualYoutube(e.target.value)}
                      disabled={loading}
                      className="text-base font-inter"
                    />

                    <label className="text-sm font-medium text-gray-700 mt-2">
                      Lien podcast
                    </label>
                    <Input
                      type="url"
                      placeholder="https://podcast.com/xxx"
                      value={manualPodcast}
                      onChange={e => setManualPodcast(e.target.value)}
                      disabled={loading}
                      className="text-base font-inter"
                    />
                  </div>
                  {/* --- Support documentaire IA (text/pdf) --- */}
                  <div className="flex flex-col gap-3 mb-2 mt-2 p-4 bg-gray-50 rounded border border-gray-200">
                    <label className="text-md font-semibold text-gray-800 flex gap-2 items-center">
                      <Upload size={16} /> Ajouter documents ou extraits pour l’IA (optionnel)
                    </label>
                    <Input
                      type="file"
                      multiple
                      accept=".txt,.pdf,text/plain,application/pdf"
                      onChange={handleSupplementFilesChange}
                      className="text-base font-inter"
                      disabled={loading}
                    />
                    {supplementFiles.length > 0 && (
                      <ul className="text-xs text-gray-600 mt-1">
                        {supplementFiles.map((f, idx) => (
                          <li key={f.name + idx} className="flex items-center gap-1 mb-1">
                            <File size={14} className="text-gray-400" /> {f.name}
                            {f.type === "application/pdf" && (
                              <span className="ml-2 text-amber-500">(PDF : texte extrait côté IA)</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label className="text-sm font-medium text-gray-700 mt-2">
                      Coller du texte ou extrait de cours (optionnel)
                    </label>
                    <Textarea
                      value={supplementText}
                      onChange={e => setSupplementText(e.target.value)}
                      placeholder="Collez ici votre cours, QCM, extrait de notice à fournir à l’IA…"
                      rows={4}
                      className="font-inter text-base"
                      disabled={loading}
                    />
                  </div>
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

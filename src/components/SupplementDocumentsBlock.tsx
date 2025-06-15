
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File } from "lucide-react";

type SupplementFile = {
  name: string;
  type: string;
  content: string;
};

interface SupplementDocumentsBlockProps {
  supplementFiles: SupplementFile[];
  loading: boolean;
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  supplementText: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function SupplementDocumentsBlock({
  supplementFiles,
  loading,
  onFilesChange,
  supplementText,
  onTextChange,
}: SupplementDocumentsBlockProps) {
  return (
    <div className="flex flex-col gap-3 mb-2 mt-2 p-4 bg-gray-50 rounded border border-gray-200">
      <label className="text-md font-semibold text-gray-800 flex gap-2 items-center">
        <Upload size={16} /> Ajouter documents ou extraits pour l’IA (optionnel)
      </label>
      <Input
        type="file"
        multiple
        accept=".txt,.pdf,text/plain,application/pdf"
        onChange={onFilesChange}
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
        onChange={onTextChange}
        placeholder="Collez ici votre cours, QCM, extrait de notice à fournir à l’IA…"
        rows={4}
        className="font-inter text-base"
        disabled={loading}
      />
    </div>
  );
}

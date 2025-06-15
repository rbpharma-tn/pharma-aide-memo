
import { Input } from "@/components/ui/input";

interface ManualFieldsProps {
  manualPhotoName: string;
  loading: boolean;
  manualTitle: string;
  manualYoutube: string;
  manualPodcast: string;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onYoutubeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPodcastChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ManualFields({
  manualPhotoName,
  loading,
  manualTitle,
  manualYoutube,
  manualPodcast,
  onPhotoChange,
  onTitleChange,
  onYoutubeChange,
  onPodcastChange,
}: ManualFieldsProps) {
  return (
    <div className="flex flex-col gap-3 mb-2">
      <label className="text-sm font-medium text-gray-700">
        Photo Mémofiche
      </label>
      <Input
        type="file"
        accept="image/*"
        onChange={onPhotoChange}
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
        onChange={onTitleChange}
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
        onChange={onYoutubeChange}
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
        onChange={onPodcastChange}
        disabled={loading}
        className="text-base font-inter"
      />
    </div>
  );
}

import { useState } from "react";
import { Camera, Loader2, Trash2, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  images: string[];
  onImagesChange: (urls: string[]) => void;
}

export function CloudinaryUpload({ images, onImagesChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "djaz5fcbu";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const file = files[0];
      
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        toast.error("Archivo no válido", {
          description: "Por favor selecciona un archivo de imagen.",
        });
        setUploading(false);
        return;
      }

      // Validar tamaño (ej. 10MB máximo)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Archivo demasiado grande", {
          description: "La imagen debe pesar menos de 10 MB.",
        });
        setUploading(false);
        return;
      }

      // Crear FormData para Cloudinary API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || "Error al subir la imagen");
      }

      const data = await response.json();
      const secureUrl = data.secure_url;

      if (secureUrl) {
        onImagesChange([...images, secureUrl]);
        toast.success("Imagen subida", {
          description: "La foto se ha guardado correctamente.",
        });
      } else {
        throw new Error("No se recibió la URL de la imagen.");
      }
    } catch (error: any) {
      console.error("Error al subir a Cloudinary:", error);
      toast.error("Error al subir", {
        description: error.message || "Verifica tu conexión y configuración de Cloudinary.",
      });
    } finally {
      setUploading(false);
      // Limpiar el input para permitir volver a subir el mismo archivo si se desea
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const nextImages = images.filter((_, idx) => idx !== indexToRemove);
    onImagesChange(nextImages);
    toast.info("Imagen removida");
  };

  return (
    <div className="space-y-3">
      {/* Botones de subida y estado */}
      <div className="flex flex-wrap items-center gap-2">
        <label className={`relative flex items-center justify-center gap-2 rounded-lg border border-dashed border-red-500/30 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500/10 cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <Camera className="h-4 w-4" />
          <span>Tomar Foto / Subir Imagen</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="sr-only"
          />
        </label>

        {uploading && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse pl-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-red-400" />
            <span>Subiendo archivo...</span>
          </div>
        )}
      </div>

      {/* Grid de imágenes subidas */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
          {images.map((url, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-lg border border-border bg-background/50 overflow-hidden shadow-sm hover:border-red-500/30 transition-colors"
            >
              <img
                src={url.replace("/upload/", "/upload/w_200,h_200,c_fill,q_auto,f_auto/")}
                alt={`Hallazgo ${index + 1}`}
                className="h-full w-full object-cover transition-transform group-hover:scale-105 cursor-zoom-in"
                onClick={() => setActiveImageUrl(url)}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-red-400 opacity-90 sm:opacity-0 hover:bg-red-500 hover:text-white sm:group-hover:opacity-100 transition-all"
                title="Eliminar foto"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox para previsualizar imágenes a pantalla completa */}
      {activeImageUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-all animate-in fade-in duration-200"
          onClick={() => setActiveImageUrl(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/85 cursor-pointer"
            onClick={() => setActiveImageUrl(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={activeImageUrl}
            alt="Hallazgo Ampliado"
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

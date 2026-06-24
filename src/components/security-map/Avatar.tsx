import { useMemo } from "react";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

// @ts-ignore
const fotosGlob = import.meta.glob('/public/fotos/*.jpeg', { eager: true, query: '?url', import: 'default' });

const fotosList = Object.entries(fotosGlob).map(([path, url]) => {
  const fileName = path.split('/').pop()?.replace('.jpeg', '') || '';
  const normalized = fileName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return { fileName, normalized, url: url as string };
});

export function getPhotoUrl(name: string): string | null {
  const normalizedName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const parts = normalizedName.split(' ');
  const firstTwo = parts.slice(0, 2).join(' ');

  for (const photo of fotosList) {
    if (normalizedName === photo.normalized) return photo.url;
    if (photo.normalized === firstTwo) return photo.url;
    if (normalizedName.includes(photo.normalized)) return photo.url;
    
    // Reverse check for cases like "VICTOR SIMENTAL" vs "VICTOR MANUEL DE JESUS SIMENTAL"
    if (photo.normalized.includes(parts[0]) && parts.length > 1 && photo.normalized.includes(parts[parts.length - 1])) {
       return photo.url;
    }
  }
  return null;
}

export function Avatar({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const url = useMemo(() => getPhotoUrl(name), [name]);
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  if (!url) {
    return (
      <div className={`flex shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-bold ${className}`}>
        <span className="text-[10px]">{initials}</span>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={`shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}>
          <img
            src={url}
            alt={`Foto de ${name}`}
            className="h-full w-full rounded-full object-cover border border-border/50 cursor-zoom-in transition-transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('fallback-avatar');
            }}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-transparent border-none shadow-none p-0 flex flex-col justify-center items-center gap-4">
        <DialogTitle className="sr-only">Foto de {name}</DialogTitle>
        <img
          src={url}
          alt={`Foto de ${name}`}
          className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border text-center shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <p className="text-lg font-bold text-foreground">{name}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

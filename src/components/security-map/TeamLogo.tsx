import { useMemo } from "react";
import { Users } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const KNOWN_LOGOS = [
  "BREWMAN.jpeg",
  "CUCHILLAS.png",
  "ELABORACION.png",
  "LOS ANDAMOS CON TODO.png",
  "LOS BRAVOS DEL FRIO.png",
  "LOS BRONCOS.png",
  "LOS CAZADORES DEL AMARGOR.png",
  "LOS FUERTES DEL FRIO.png",
  "LOS NAHUALES.png",
  "LOS PANCHITOS.png",
  "MASH-RAINBOW.png",
  "MOSTO-BOYS.png",
  "MUNICH.png",
  "REYES DE LA MEZCLA.png"
];

const logosList = KNOWN_LOGOS.map((file) => {
  const fileName = file.replace(/\.(png|jpeg|jpg)$/, '');
  const normalized = fileName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return { fileName, normalized, url: `/logos/${file}` };
});

export function getTeamLogoUrl(teamName: string): string | null {
  const normalizedName = teamName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  for (const logo of logosList) {
    if (normalizedName === logo.normalized) return logo.url;
    // Handle cases like "NAHUALES" matching "LOS NAHUALES"
    if (logo.normalized.includes(normalizedName)) return logo.url;
    if (normalizedName.includes(logo.normalized)) return logo.url;
  }
  return null;
}

export function TeamLogo({ team, className = "h-8 w-8", disableDialog = false }: { team: string; className?: string; disableDialog?: boolean }) {
  const url = useMemo(() => getTeamLogoUrl(team), [team]);
  const initials = team.substring(0, 2).toUpperCase();

  if (!url) {
    return (
      <div className={`flex shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold ${className}`}>
        <span className="text-[10px]"><Users className="h-4 w-4" /></span>
      </div>
    );
  }

  const imgElement = (
    <img
      src={url}
      alt={`Logo de ${team}`}
      className={`h-full w-full rounded-lg object-contain bg-white/5 border border-border/50 p-0.5 transition-transform ${disableDialog ? '' : 'cursor-zoom-in hover:scale-105'}`}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement?.classList.add('fallback-logo');
      }}
    />
  );

  if (disableDialog) {
    return <div className={`shrink-0 rounded-lg overflow-hidden ${className}`}>{imgElement}</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={`shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 overflow-hidden ${className}`}>
          {imgElement}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-transparent border-none shadow-none p-0 flex flex-col justify-center items-center gap-4">
        <DialogTitle className="sr-only">Logo de {team}</DialogTitle>
        <img
          src={url}
          alt={`Logo de ${team}`}
          className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20"
        />
        <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border text-center shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <p className="text-lg font-bold text-cyan-400">{team}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

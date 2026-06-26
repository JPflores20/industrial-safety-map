import {
  Factory,
  Zap,
  Flame,
  ArrowDownToLine,
  ShieldAlert,
  AlertTriangle,
  Thermometer,
  Crown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getMaxRiskLevel,
  TEAM_META,
  DEFAULT_TEAM_META,
  ESTADO_META,
  getAreaStatus,
  type Area,
} from "./data";
import { TeamLogo } from "./TeamLogo";

interface Props {
  areas: Area[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// ─── Risk icon selector ────────────────────────────────────────────────────────
function RiskIcon({ risk }: { risk: string }) {
  const r = risk.toLowerCase();
  if (/eléctric|electric|tensión|arco/.test(r))
    return <Zap className="h-3 w-3 text-yellow-400" />;
  if (/explosión|explosion|incendio/.test(r))
    return <Flame className="h-3 w-3 text-red-400" />;
  if (/caliente|temperatura alta/.test(r))
    return <Thermometer className="h-3 w-3 text-red-400" />;
  if (/temperatura baja/.test(r))
    return <Thermometer className="h-3 w-3 text-blue-400" />;
  if (/caída|caida|alturas|desnivel/.test(r))
    return <ArrowDownToLine className="h-3 w-3 text-sky-400" />;
  if (/atrapamiento|confinad|corrosiv|radiac/.test(r))
    return <ShieldAlert className="h-3 w-3 text-orange-400" />;
  return <AlertTriangle className="h-3 w-3 text-slate-400" />;
}

// ─── Semáforo badge ────────────────────────────────────────────────────────────
const LEVEL_META = {
  danger: {
    ring: "border-red-500/40 bg-red-500/10",
    dot: "bg-red-400",
    label: "Peligro",
  },
  alert: {
    ring: "border-orange-500/40 bg-orange-500/10",
    dot: "bg-orange-400",
    label: "Alerta",
  },
  warning: {
    ring: "border-amber-500/40 bg-amber-500/10",
    dot: "bg-amber-400",
    label: "Precaución",
  },
} as const;

const CARD_META = {
  "al-dia": {
    selectedRing: "focus-visible:ring-emerald-400",
    selectedClasses: "border-emerald-400 bg-emerald-400/10 shadow-[0_0_22px_-4px_rgba(52,211,153,0.55)]",
    unselectedClasses: "border-border bg-surface-zone hover:border-emerald-400/40 hover:shadow-[0_0_15px_-4px_rgba(52,211,153,0.3)]",
    iconSelected: "bg-emerald-400/20 text-emerald-400",
    iconUnselected: "bg-background/40 text-emerald-400/70",
  },
  "pendiente": {
    selectedRing: "focus-visible:ring-amber-400",
    selectedClasses: "border-amber-400 bg-amber-400/10 shadow-[0_0_22px_-4px_rgba(251,191,36,0.55)]",
    unselectedClasses: "border-border bg-surface-zone hover:border-amber-400/40 hover:shadow-[0_0_15px_-4px_rgba(251,191,36,0.3)]",
    iconSelected: "bg-amber-400/20 text-amber-400",
    iconUnselected: "bg-background/40 text-amber-400/70",
  },
  "retrasado": {
    selectedRing: "focus-visible:ring-red-400",
    selectedClasses: "border-red-400 bg-red-400/10 shadow-[0_0_22px_-4px_rgba(248,113,113,0.55)]",
    unselectedClasses: "border-border bg-surface-zone hover:border-red-400/40 hover:shadow-[0_0_15px_-4px_rgba(248,113,113,0.3)]",
    iconSelected: "bg-red-400/20 text-red-400",
    iconUnselected: "bg-background/40 text-red-400/70",
  },
};

export function PlantMap({ areas, selectedId, onSelect }: Props) {
  // ── Calculate min and max scores for highlighting ──
  const validScores = areas.map(a => a.ultimaCalificacion).filter((val): val is number => val !== undefined);
  const maxScore = validScores.length > 0 ? Math.max(...validScores) : null;
  const minScore = validScores.length > 0 ? Math.min(...validScores) : null;

  // Group areas by team
  const grouped = new Map<string, Area[]>();
  for (const area of areas) {
    if (!grouped.has(area.equipo)) grouped.set(area.equipo, []);
    grouped.get(area.equipo)!.push(area);
  }

  // Running card index for stagger delays (computed during render, not a hook)
  let cardIndex = 0;

  if (grouped.size === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface-plant py-20 text-muted-foreground">
        <AlertTriangle className="h-10 w-10 opacity-20" />
        <p className="text-sm">No hay áreas con los filtros actuales.</p>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={250}>
      <div className="flex flex-col gap-5">
        {[...grouped.entries()].map(([equipo, teamAreas]) => {
          const meta = TEAM_META[equipo] ?? DEFAULT_TEAM_META;
          return (
            <section key={equipo} aria-label={`Equipo ${equipo}`}>
              {/* Group header */}
              <div
                className={`mb-3 flex items-center gap-2.5 rounded-lg border px-3 py-2 ${meta.border} bg-surface-plant`}
              >
                <TeamLogo team={equipo} className="h-5 w-5" />
                <h2
                  className={`text-xs font-bold uppercase tracking-widest ${meta.color}`}
                >
                  {equipo}
                </h2>
                <span className="ml-auto text-xs text-muted-foreground">
                  {teamAreas.length} área{teamAreas.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {teamAreas.map((area) => {
                  const delay = cardIndex++ * 40;
                  const isSelected = selectedId === area.id;
                  const maxLevel = getMaxRiskLevel(area.riesgos);
                  const levelMeta = LEVEL_META[maxLevel];
                  const estado = getAreaStatus(area.ultimaInspeccion);
                  const estadoMeta = ESTADO_META[estado];
                  const cardStyles = CARD_META[estado];

                  const isBest = maxScore !== null && area.ultimaCalificacion === maxScore;
                  const isWorst = minScore !== null && area.ultimaCalificacion === minScore;
                  
                  let specialClasses = "";
                  if (isBest) {
                    specialClasses = "ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] border-yellow-300 dark:border-yellow-600";
                  } else if (isWorst) {
                    specialClasses = "animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(239,68,68,0.8)] ring-2 ring-red-500 border-red-400 dark:border-red-600";
                  }

                  return (
                    <button
                      key={area.id}
                      id={`area-card-${area.id}`}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => onSelect(area.id)}
                      style={{ animationDelay: `${delay}ms` }}
                      className={`area-card-enter group relative flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 ${cardStyles.selectedRing} ${
                        isSelected
                          ? cardStyles.selectedClasses
                          : cardStyles.unselectedClasses
                      } ${specialClasses}`}
                    >
                      {/* Golden Crown Badge */}
                      {isBest && (
                        <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 text-yellow-950 flex items-center justify-center shadow-lg border border-yellow-200 z-10 drop-shadow-md">
                          <Crown className="h-4 w-4 fill-current" />
                        </div>
                      )}


                      {/* Icon row */}
                      <div className="flex items-start gap-2">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors overflow-hidden ${
                            isSelected
                              ? cardStyles.iconSelected
                              : cardStyles.iconUnselected
                          }`}
                        >
                          <TeamLogo team={area.equipo} disableDialog={true} className="h-full w-full object-cover" />
                        </div>
                        <span
                          className={`rounded-full border px-1.5 py-0.5 text-[10px] font-bold leading-tight ${
                            isSelected
                              ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                              : "border-border bg-background/30 text-muted-foreground"
                          }`}
                        >
                          {area.riesgos.length}R
                        </span>
                      </div>

                      {/* Area name */}
                      <h3
                        className={`line-clamp-2 pr-5 text-xs font-semibold leading-snug ${
                          isSelected ? "text-amber-100" : "text-foreground"
                        }`}
                      >
                        {area.nombre}
                      </h3>

                      {/* Risk icons with tooltips */}
                      <div className="flex flex-wrap gap-1">
                        {area.riesgos.slice(0, 3).map((r) => (
                          <Tooltip key={r}>
                            <TooltipTrigger asChild>
                              <span
                                className={`flex items-center justify-center rounded-md p-1 transition-colors ${
                                  isSelected
                                    ? "bg-amber-400/10 text-amber-300"
                                    : "bg-background/30 text-muted-foreground"
                                }`}
                              >
                                <RiskIcon risk={r} />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs">
                              {r}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                        {area.riesgos.length > 3 && (
                          <span className="rounded-md bg-background/20 px-1 py-0.5 text-[9px] text-muted-foreground">
                            +{area.riesgos.length - 3}
                          </span>
                        )}
                      </div>

                      {/* ── Compliance strip (Mejora 1) ── */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className={`flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${estadoMeta.border} ${estadoMeta.bg} ${estadoMeta.color}`}
                              >
                                <span className={`h-1 w-1 rounded-full ${estadoMeta.dot}`} />
                                {estadoMeta.label}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs">
                              Última insp.: {area.ultimaInspeccion || "Sin inspección"}
                            </TooltipContent>
                          </Tooltip>
                          {area.ultimaCalificacion !== undefined && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="font-mono text-xs font-bold text-foreground bg-background/50 border px-2 py-0.5 rounded-md shadow-sm">
                                  {area.ultimaCalificacion}%
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="text-xs">
                                Calificación de la última evaluación
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>

                      {/* Selected glow line */}
                      {isSelected && (
                        <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-xl bg-gradient-to-r from-amber-500 to-yellow-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
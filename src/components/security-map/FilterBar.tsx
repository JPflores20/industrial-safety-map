import { useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  areas,
  RISK_CATEGORIES,
  TEAM_META,
  DEFAULT_TEAM_META,
  ESTADO_META,
  type RiskCategory,
  type EstadoArea,
} from "./data";

const ALL_TEAMS = [...new Set(areas.map((a) => a.equipo))];
const ALL_ESTADOS: EstadoArea[] = ["al-dia", "pendiente", "vencido"];

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  activeEquipos: Set<string>;
  onToggleEquipo: (equipo: string) => void;
  activeCategorias: Set<RiskCategory>;
  onToggleCategoria: (cat: RiskCategory) => void;
  activeResponsable: string;
  onResponsableChange: (r: string) => void;
  activeEstados: Set<EstadoArea>;
  onToggleEstado: (e: EstadoArea) => void;
  totalVisible: number;
  onClearAll: () => void;
}

export function FilterBar({
  query,
  onQueryChange,
  activeEquipos,
  onToggleEquipo,
  activeCategorias,
  onToggleCategoria,
  activeResponsable,
  onResponsableChange,
  activeEstados,
  onToggleEstado,
  totalVisible,
  onClearAll,
}: Props) {
  const hasFilters =
    !!query.trim() ||
    activeEquipos.size > 0 ||
    activeCategorias.size > 0 ||
    !!activeResponsable ||
    activeEstados.size > 0;

  const responsables = useMemo(
    () => [...new Set(areas.map((a) => a.responsable))].sort(),
    []
  );

  return (
    <div className="no-print flex flex-col gap-3 rounded-2xl border border-border bg-surface-plant p-4">
      {/* ── Row 1: Search + Responsable select ── */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="area-search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar área, responsable, equipo o riesgo…"
            className="w-full rounded-xl border border-border bg-surface-zone py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <Select
          value={activeResponsable || "__all__"}
          onValueChange={(v) => onResponsableChange(v === "__all__" ? "" : v)}
        >
          <SelectTrigger
            id="responsable-select"
            className="w-56 shrink-0 border-border bg-surface-zone text-sm"
          >
            <SelectValue placeholder="Todos los responsables" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="__all__">Todos los responsables</SelectItem>
            {responsables.map((r) => (
              <SelectItem key={r} value={r} className="text-xs">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Row 2: Team chips ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3 w-3" />
          Equipo:
        </span>
        {ALL_TEAMS.map((equipo) => {
          const meta = TEAM_META[equipo] ?? DEFAULT_TEAM_META;
          const active = activeEquipos.has(equipo);
          return (
            <button
              key={equipo}
              type="button"
              onClick={() => onToggleEquipo(equipo)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                active ? meta.activeChip : meta.inactiveChip
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {equipo}
            </button>
          );
        })}
      </div>

      {/* ── Row 3: Risk category chips ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3 w-3" />
          Riesgo:
        </span>
        {RISK_CATEGORIES.map((cat) => {
          const active = activeCategorias.has(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggleCategoria(cat.id)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                active
                  ? `${cat.color} border-current bg-current/10`
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Row 4: Estado chips (Mejora 1) ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3 w-3" />
          Estado:
        </span>
        {ALL_ESTADOS.map((estado) => {
          const meta = ESTADO_META[estado];
          const active = activeEstados.has(estado);
          return (
            <button
              key={estado}
              type="button"
              id={`filter-estado-${estado}`}
              onClick={() => onToggleEstado(estado)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                active ? meta.chipActive : meta.chipInactive
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </button>
          );
        })}
      </div>

      {/* ── Status bar (only when filters active) ── */}
      {hasFilters && (
        <div className="flex items-center justify-between border-t border-border pt-2.5">
          <span className="text-xs text-muted-foreground">
            Mostrando{" "}
            <span className="font-semibold text-amber-400">{totalVisible}</span>{" "}
            de {areas.length} áreas
          </span>
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}

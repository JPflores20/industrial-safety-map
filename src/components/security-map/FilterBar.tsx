// ─── Importaciones y Componentes ──────────────────────────────────────────────
import { useMemo } from "react"; // Cache bust
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RISK_CATEGORIES,
  TEAM_META,
  DEFAULT_TEAM_META,
  ESTADO_META,
  type RiskCategory,
  type EstadoArea,
  type Area,
} from "./data";

// ─── Propiedades del Componente FilterBar ─────────────────────────────────────
interface Props {
  areas: Area[]; // Áreas a filtrar
  query: string; // Texto de búsqueda
  onQueryChange: (q: string) => void;
  activeEquipos: Set<string>; // Filtros de equipo activos
  onToggleEquipo: (equipo: string) => void;
  activeCategorias: Set<RiskCategory>; // Filtros de categorías de riesgo activos
  onToggleCategoria: (cat: RiskCategory) => void;
  activeResponsable: string; // Responsable seleccionado en el combo box
  onResponsableChange: (r: string) => void;
  activeEstados: Set<EstadoArea>; // Estados activos (al día, pendiente, etc)
  onToggleEstado: (e: EstadoArea) => void;
  activeTerritorios: Set<string>; // Territorios activos (T1, T2, etc)
  onToggleTerritorio: (t: string) => void;
  totalVisible: number; // Cantidad de áreas mostrándose después de aplicar filtros
  onClearAll: () => void; // Función para limpiar todos los filtros
}

// ─── Componente Principal FilterBar ──────────────────────────────────────────
export function FilterBar({
  areas,
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
  activeTerritorios,
  onToggleTerritorio,
  totalVisible,
  onClearAll,
}: Props) {
  // ─── Datos Dinámicos Únicos para Filtros ──────────────────────────────────────
  const ALL_TEAMS = useMemo(() => [...new Set(areas.map((a) => a.equipo))], [areas]);
  const ALL_ESTADOS: EstadoArea[] = ["al-dia", "pendiente", "retrasado"];
  const ALL_TERRITORIOS = useMemo(() => [...new Set(areas.map((a) => a.territorio))].sort(), [areas]);

  // Comprueba si existe al menos un filtro activo (para mostrar el botón de limpiar)
  const hasFilters =
    !!query.trim() ||
    activeEquipos.size > 0 ||
    activeCategorias.size > 0 ||
    !!activeResponsable ||
    activeEstados.size > 0 ||
    activeTerritorios.size > 0;

  // Memoiza y ordena alfabéticamente la lista de responsables para el Select
  const responsables = useMemo(
    () => [...new Set(areas.map((a) => a.responsable))].sort(),
    [areas]
  );

  return (
    <div className="no-print flex flex-col gap-3 rounded-2xl border border-border bg-surface-plant p-4">
      {/* ── Fila 1: Barra de Búsqueda + Selector de Responsable ── */}
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

      {/* ── Fila 2: Botones de filtro por Equipo (Team) ── */}
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

      {/* ── Fila 3: Botones de filtro por Categoría de Riesgo ── */}
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

      {/* ── Fila 4: Botones de filtro por Estado de Inspección ── */}
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

      {/* ── Fila 5: Botones de filtro por Territorio ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3 w-3" />
          Territorio:
        </span>
        {ALL_TERRITORIOS.map((territorio) => {
          const active = activeTerritorios.has(territorio);
          return (
            <button
              key={territorio}
              type="button"
              onClick={() => onToggleTerritorio(territorio)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                active
                  ? "border-amber-400 bg-amber-400/10 text-amber-400"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {territorio}
            </button>
          );
        })}
      </div>

      {/* ── Barra inferior de estado (Visible sólo si hay filtros activos) ── */}
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

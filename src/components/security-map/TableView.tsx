import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { getMaxRiskLevel, ESTADO_META, type Area } from "./data";
import { Avatar } from "./Avatar";

type SortKey = "nombre" | "equipo" | "responsable" | "riesgos" | "nivel" | "cumplimiento";
type SortDir = "asc" | "desc";

interface Props {
  areas: Area[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const LEVEL_ORDER: Record<string, number> = { danger: 3, alert: 2, warning: 1 };
const LEVEL_LABELS: Record<string, string> = {
  danger: "Peligro",
  alert: "Alerta",
  warning: "Precaución",
};
const LEVEL_STYLES: Record<string, string> = {
  danger:
    "border-red-500/30 bg-red-500/10 text-red-300 shadow-[0_0_6px_-2px_rgba(239,68,68,0.4)]",
  alert: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

function MiniBar({ value, estado }: { value: number; estado: Area["estado"] }) {
  const color =
    estado === "vencido"
      ? "bg-red-400"
      : estado === "pendiente"
        ? "bg-amber-400"
        : "bg-emerald-400";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-border/40">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground">{value}%</span>
    </div>
  );
}

export function TableView({ areas, selectedId, onSelect }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...areas].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "nombre") cmp = a.nombre.localeCompare(b.nombre, "es");
    else if (sortKey === "equipo") cmp = a.equipo.localeCompare(b.equipo, "es");
    else if (sortKey === "responsable")
      cmp = a.responsable.localeCompare(b.responsable, "es");
    else if (sortKey === "riesgos") cmp = a.riesgos.length - b.riesgos.length;
    else if (sortKey === "nivel")
      cmp =
        LEVEL_ORDER[getMaxRiskLevel(a.riesgos)] -
        LEVEL_ORDER[getMaxRiskLevel(b.riesgos)];
    else if (sortKey === "cumplimiento") cmp = a.cumplimiento - b.cumplimiento;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const columns: { key: SortKey; label: string }[] = [
    { key: "nombre", label: "Área" },
    { key: "equipo", label: "Equipo" },
    { key: "responsable", label: "Responsable" },
    { key: "riesgos", label: "Riesgos" },
    { key: "nivel", label: "Nivel" },
    { key: "cumplimiento", label: "Cumplimiento" },
  ];

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3 w-3 text-amber-400" />
    ) : (
      <ArrowDown className="h-3 w-3 text-amber-400" />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-plant">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-zone">
              {columns.map(({ key, label }) => (
                <th key={key} className="text-left">
                  <button
                    type="button"
                    onClick={() => handleSort(key)}
                    className="flex w-full items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                    <SortIcon col={key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((area, i) => {
              const isSelected = selectedId === area.id;
              const level = getMaxRiskLevel(area.riesgos);
              const estadoMeta = ESTADO_META[area.estado];
              return (
                <tr
                  key={area.id}
                  id={`table-row-${area.id}`}
                  onClick={() => onSelect(area.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelect(area.id);
                  }}
                  aria-selected={isSelected}
                  className={`cursor-pointer border-b border-border/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 ${
                    isSelected
                      ? "bg-amber-400/10"
                      : i % 2 === 0
                        ? "hover:bg-surface-zone"
                        : "bg-background/10 hover:bg-surface-zone"
                  }`}
                >
                  <td
                    className={`px-4 py-3 font-semibold ${isSelected ? "text-amber-200" : "text-foreground"}`}
                  >
                    {area.nombre}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {area.equipo}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar name={area.responsable} className="h-6 w-6" />
                      <span className="truncate max-w-[120px] lg:max-w-none" title={area.responsable}>
                        {area.responsable}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 text-xs font-bold text-muted-foreground">
                      {area.riesgos.length}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[level]}`}
                    >
                      {LEVEL_LABELS[level]}
                    </span>
                  </td>
                  {/* ── Compliance column (Mejora 1) ── */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${estadoMeta.border} ${estadoMeta.bg} ${estadoMeta.color}`}
                      >
                        <span className={`h-1 w-1 rounded-full ${estadoMeta.dot}`} />
                        {estadoMeta.label}
                      </span>
                      <MiniBar value={area.cumplimiento} estado={area.estado} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  No hay áreas con los filtros actuales.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border px-4 py-2 text-right text-xs text-muted-foreground">
        {sorted.length} área{sorted.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

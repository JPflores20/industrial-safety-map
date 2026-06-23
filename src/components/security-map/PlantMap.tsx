import { Droplet, Factory, Layers, Zap } from "lucide-react";
import type { Area } from "./data";

interface Props {
  areas: Area[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

type Accent = "warning" | "alert" | "danger";

const accentStyles: Record<
  Accent,
  {
    icon: string;
    badge: string;
    selected: string;
    ring: string;
  }
> = {
  warning: {
    icon: "text-safety-warning",
    badge:
      "border-safety-warning/60 bg-safety-warning/10 text-safety-warning",
    selected:
      "border-safety-warning shadow-[0_0_24px_-4px_var(--color-safety-warning)]",
    ring: "focus-visible:ring-safety-warning",
  },
  alert: {
    icon: "text-safety-alert",
    badge: "border-safety-alert/60 bg-safety-alert/10 text-safety-alert",
    selected:
      "border-safety-alert shadow-[0_0_24px_-4px_var(--color-safety-alert)]",
    ring: "focus-visible:ring-safety-alert",
  },
  danger: {
    icon: "text-safety-danger",
    badge: "border-safety-danger/60 bg-safety-danger/10 text-safety-danger",
    selected:
      "border-safety-danger shadow-[0_0_24px_-4px_var(--color-safety-danger)]",
    ring: "focus-visible:ring-safety-danger",
  },
};

const zoneMeta: Record<
  string,
  { icon: typeof Zap; gridArea: string; accent: Accent }
> = {
  subestacion: { icon: Zap, gridArea: "1 / 1 / 2 / 2", accent: "danger" },
  mezanine: { icon: Layers, gridArea: "1 / 2 / 2 / 3", accent: "alert" },
  "cto-bombas": {
    icon: Droplet,
    gridArea: "2 / 1 / 3 / 2",
    accent: "warning",
  },
  "planta-baja": {
    icon: Factory,
    gridArea: "2 / 2 / 3 / 3",
    accent: "alert",
  },
};

export function PlantMap({ areas, selectedId, onSelect }: Props) {
  return (
    <div className="relative h-full min-h-[520px] rounded-2xl border border-border bg-surface-plant p-4 shadow-inner">
      {/* grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mb-3 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>Plano esquemático · Planta</span>
        <span className="rounded border border-border px-2 py-0.5">N ↑</span>
      </div>

      <div
        className="relative grid h-[calc(100%-2rem)] gap-4"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        {areas.map((area) => {
          const meta = zoneMeta[area.id];
          const Icon = meta?.icon ?? Factory;
          const isSelected = selectedId === area.id;
          const accent: Accent = meta?.accent ?? "warning";
          const styles = accentStyles[accent];
          return (
            <button
              key={area.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(area.id)}
              style={{ gridArea: meta?.gridArea }}
              className={`group relative flex flex-col justify-between rounded-xl border-2 bg-surface-zone p-4 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 ${styles.ring} ${
                isSelected
                  ? styles.selected
                  : "border-border hover:border-foreground/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-background/40 ${styles.icon}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${styles.badge}`}
                >
                  {area.riesgos.length} riesgos
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {area.nombre}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {area.equipo}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* legend */}
      <div className="relative mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium uppercase tracking-wider">Leyenda:</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-safety-warning" />
          Precaución
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-safety-alert" />
          Alerta
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-safety-danger" />
          Peligro
        </span>
      </div>
    </div>
  );
}
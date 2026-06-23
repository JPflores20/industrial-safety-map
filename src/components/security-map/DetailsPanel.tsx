import { Map, ShieldAlert, User, Users } from "lucide-react";
import { classifyRisk, type Area, type RiskLevel } from "./data";

interface Props {
  area: Area | null;
}

const riskStyles: Record<RiskLevel, string> = {
  warning:
    "border-safety-warning/60 bg-safety-warning/10 text-safety-warning",
  alert: "border-safety-alert/60 bg-safety-alert/10 text-safety-alert",
  danger: "border-safety-danger/60 bg-safety-danger/10 text-safety-danger",
};

export function DetailsPanel({ area }: Props) {
  return (
    <aside
      aria-live="polite"
      className="flex h-full min-h-[520px] flex-col rounded-2xl border border-border bg-card p-6 shadow-lg"
    >
      {!area ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/40">
            <Map className="h-7 w-7" />
          </div>
          <p className="max-w-[14rem] text-sm">
            Selecciona un área en el plano para ver los detalles y
            responsables.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-6">
          <header>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Área seleccionada
            </p>
            <h2 className="mt-1 text-xl font-semibold text-foreground">
              {area.nombre}
            </h2>
          </header>

          <div className="space-y-3">
            <InfoRow
              icon={<User className="h-4 w-4" />}
              label="Responsable"
              value={area.responsable}
            />
            <InfoRow
              icon={<Users className="h-4 w-4" />}
              label="Equipo autónomo"
              value={area.equipo}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldAlert className="h-4 w-4 text-safety-warning" />
              Riesgos identificados
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                {area.riesgos.length}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {area.riesgos.map((riesgo) => {
                const level = classifyRisk(riesgo);
                return (
                  <li
                    key={riesgo}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium ${riskStyles[level]}`}
                  >
                    {riesgo}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
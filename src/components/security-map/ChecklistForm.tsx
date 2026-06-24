import { useState } from "react";
import {
  ClipboardCheck,
  Building,
  Sparkles,
  BugOff,
  UserCheck,
  FlaskConical,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Save,
  X,
} from "lucide-react";
import type { Area } from "./data";

export interface EvaluationData {
  evaluador: string;
  cumplimiento: number;
  respuestas: Record<string, "cumple" | "no-cumple" | "na">;
  observaciones: Record<string, string>;
}

interface Props {
  area: Area;
  onClose: () => void;
  onSave: (data: EvaluationData) => void;
}

const CATEGORIAS = [
  {
    id: "infra",
    title: "Infraestructura y Mantenimiento",
    icon: <Building className="h-4 w-4" />,
    items: [
      "Debe proporcionarse una adecuada ventilación y extracción en áreas de almacenamiento y procesamiento.",
      "Donde se hacen reparaciones temporales, estas deben ser controladas y reparadas de forma permanente lo antes posible.",
      "Las puertas deben mantenerse en buenas condiciones y cerrar adecuadamente sin dejar espacios.",
      "Equipo de medición se mantiene correctamente, limpio, calibrado y en buenas condiciones.",
    ],
  },
  {
    id: "limpieza",
    title: "Limpieza y Almacenamiento",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      "Todos los materiales y equipos se almacenan fuera del piso en estibas limpias, bastidores o estantes.",
      "La madera no debe ser utilizada en áreas de productos abiertos. Si hay, debe monitorearse continuamente.",
      "Toda el agua utilizada en la planta que pueda ponerse en contacto con el producto debe ser potable.",
    ],
  },
  {
    id: "quimicos",
    title: "Control de Químicos y Objetos",
    icon: <FlaskConical className="h-4 w-4" />,
    items: [
      "Productos de limpieza, lubricantes o químicos potenciales se almacenan lejos del producto y tanques abiertos.",
      "Se requiere el control del uso de implementos afilados de metal (cuchillos, agujas). Cortadores con hojas desprendibles no se deben utilizar.",
    ],
  },
];

type Res = "cumple" | "no-cumple" | "na" | null;

export function ChecklistForm({ area, onClose, onSave }: Props) {
  const [evaluador, setEvaluador] = useState("");
  const [respuestas, setRespuestas] = useState<Record<string, Res>>({});
  const [observaciones, setObservaciones] = useState<Record<string, string>>({});

  const handleResp = (itemId: string, res: Res) => {
    setRespuestas((prev) => ({ ...prev, [itemId]: res }));
    if (res !== "no-cumple") {
      // Clear observation if changed from no-cumple
      setObservaciones((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
    }
  };

  const handleObs = (itemId: string, text: string) => {
    setObservaciones((prev) => ({ ...prev, [itemId]: text }));
  };

  // Calculate score
  let totalApplicable = 0;
  let totalComply = 0;
  
  Object.values(respuestas).forEach((r) => {
    if (r === "cumple") {
      totalComply++;
      totalApplicable++;
    } else if (r === "no-cumple") {
      totalApplicable++;
    }
    // "na" does not count towards totalApplicable
  });

  const percent = totalApplicable > 0 ? Math.round((totalComply / totalApplicable) * 100) : 0;
  const isComplete = 
    evaluador.trim() !== "" && 
    CATEGORIAS.flatMap(c => c.items).every(item => respuestas[item] !== undefined && respuestas[item] !== null);

  const getStatusColor = (val: number) => {
    if (val >= 85) return "text-emerald-400";
    if (val >= 65) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 sm:p-6 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-zone px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold text-foreground">Evaluación de Prerrequisitos</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Área: <span className="font-semibold text-foreground">{area.nombre}</span> • Resp: {area.responsable}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-background/50 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Evaluador Field */}
        <div className="bg-muted/30 border-b border-border px-6 py-4 shrink-0">
          <label className="text-sm font-bold text-foreground mb-2 block">
            Nombre del evaluador <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={evaluador}
            onChange={(e) => setEvaluador(e.target.value)}
            placeholder="Ej. Juan Pérez"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-8">
          {CATEGORIAS.map((cat) => (
            <section key={cat.id} className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400/90 border-b border-border/50 pb-2">
                <span className="rounded bg-amber-500/10 p-1.5">{cat.icon}</span>
                {cat.title}
              </h3>
              
              <div className="space-y-3">
                {cat.items.map((item) => {
                  const r = respuestas[item];
                  return (
                    <div key={item} className="flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-3 transition-colors hover:border-border/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-sm text-foreground flex-1 leading-snug">{item}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleResp(item, "cumple")}
                            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
                              r === "cumple" 
                                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_-2px_rgba(52,211,153,0.3)]" 
                                : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"
                            }`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Cumple
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResp(item, "no-cumple")}
                            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
                              r === "no-cumple" 
                                ? "border-red-500/50 bg-red-500/20 text-red-400 shadow-[0_0_10px_-2px_rgba(248,113,113,0.3)]" 
                                : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"
                            }`}
                          >
                            <XCircle className="h-3.5 w-3.5" /> No Cumple
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResp(item, "na")}
                            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
                              r === "na" 
                                ? "border-slate-500/50 bg-slate-500/20 text-slate-300" 
                                : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"
                            }`}
                          >
                            <MinusCircle className="h-3.5 w-3.5" /> N/A
                          </button>
                        </div>
                      </div>
                      
                      {/* Observation field when No Cumple */}
                      {r === "no-cumple" && (
                        <div className="mt-2 pl-2 border-l-2 border-red-500/30">
                          <input
                            type="text"
                            placeholder="Describa el hallazgo u observación..."
                            value={observaciones[item] || ""}
                            onChange={(e) => handleObs(item, e.target.value)}
                            className="w-full bg-background/50 border border-red-500/20 rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-surface-zone px-6 py-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Cumplimiento Calculado</span>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-black leading-none ${getStatusColor(percent)}`}>
                {percent}%
              </span>
              <span className="text-xs text-muted-foreground mb-1">
                ({totalComply}/{totalApplicable} aplicables)
              </span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => onSave({ evaluador: evaluador.trim(), cumplimiento: percent, respuestas: respuestas as any, observaciones })}
            disabled={!isComplete}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
              isComplete 
                ? "bg-amber-500 text-amber-950 hover:bg-amber-400 hover:shadow-[0_0_15px_-3px_rgba(251,191,36,0.5)]" 
                : "bg-surface-plant text-muted-foreground cursor-not-allowed border border-border/50"
            }`}
          >
            <Save className="h-4 w-4" />
            {isComplete ? "Guardar Evaluación" : "Completa todos los campos"}
          </button>
        </div>
      </div>
    </div>
  );
}

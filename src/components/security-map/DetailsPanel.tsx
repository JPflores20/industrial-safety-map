// ─── Importaciones de React, Iconos y Componentes ─────────────────────────────
import { useState } from "react";
import {
  Map,
  User,
  Users,
  Zap,
  Flame,
  ArrowDownToLine,
  ShieldAlert,
  AlertTriangle,
  Thermometer,
  CalendarCheck,
  CalendarX,
  ChevronDown,
  HardHat,
  ChevronUp,
  ListChecks,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { classifyRisk, type Area, type RiskLevel, ESTADO_META, getAreaStatus } from "./data";
import { getRiskControl } from "./riskControls";
import { ChecklistForm, type EvaluationData } from "./ChecklistForm";
import { EvaluationHistory } from "./EvaluationHistory";
import { Avatar } from "./Avatar";
import { TeamLogo } from "./TeamLogo";
import { db } from "@/lib/firebase"; // Conexión a Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Utilidades de Firestore
import { toast } from "sonner"; // Librería de notificaciones

// Propiedades que recibe el panel (el área seleccionada en el mapa o nulo si no hay selección)
interface Props {
  area: Area | null;
}

// ─── Estilos por Nivel de Riesgo ──────────────────────────────────────────────
const riskStyles: Record<RiskLevel, { chip: string; glow: string }> = {
  warning: {
    chip: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    glow: "", // Sin resplandor extra
  },
  alert: {
    chip: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    glow: "", // Sin resplandor extra
  },
  danger: {
    chip: "border-red-500/40 bg-red-500/10 text-red-300",
    glow: "shadow-[0_0_8px_-2px_rgba(239,68,68,0.5)]", // Resplandor rojo intenso
  },
};

// ─── Selector de Iconos para la lista de riesgos ────────────────────────────
function RiskIcon({ risk }: { risk: string }) {
  const r = risk.toLowerCase();
  if (/eléctric|electric|tensión|arco/.test(r))
    return <Zap className="h-3.5 w-3.5 text-yellow-400" />;
  if (/explosión|explosion|incendio/.test(r))
    return <Flame className="h-3.5 w-3.5 text-red-400" />;
  if (/caliente|temperatura alta/.test(r))
    return <Thermometer className="h-3.5 w-3.5 text-red-400" />;
  if (/temperatura baja/.test(r))
    return <Thermometer className="h-3.5 w-3.5 text-blue-400" />;
  if (/caída|caida|alturas|desnivel/.test(r))
    return <ArrowDownToLine className="h-3.5 w-3.5 text-sky-400" />;
  if (/atrapamiento|confinad|corrosiv|radiac/.test(r))
    return <ShieldAlert className="h-3.5 w-3.5 text-orange-400" />;
  return <AlertTriangle className="h-3.5 w-3.5 text-slate-400" />;
}

// ─── Componente de Ítem de Riesgo (Desplegable) ─────────────────────────────
// Muestra el nombre del riesgo y, si se expande, muestra el EPP requerido y medidas de control
function RiskItem({ riesgo }: { riesgo: string }) {
  const [expanded, setExpanded] = useState(false);
  const level = classifyRisk(riesgo);
  const { chip, glow } = riskStyles[level];
  const control = getRiskControl(riesgo);

  return (
    <li className={`rounded-lg border ${chip} ${glow} overflow-hidden`}>
      {/* Botón principal del ítem de riesgo */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium ${control ? "cursor-pointer" : "cursor-default"}`}
        aria-expanded={expanded}
      >
        <RiskIcon risk={riesgo} />
        <span className="flex-1 text-left">{riesgo}</span>
        {control && (
          <span className="shrink-0 opacity-60">
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </span>
        )}
      </button>

      {/* Panel Expandido: EPP, Medidas y Normas */}
      {expanded && control && (
        <div className="border-t border-current/20 bg-black/20 px-3 pb-3 pt-2 space-y-3">
          {/* Sección de EPP (Equipo de Protección Personal) */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-70">
              <HardHat className="h-3 w-3" />
              EPP Requerido
            </div>
            <div className="flex flex-wrap gap-1.5">
              {control.epp.map((e) => (
                <span
                  key={e.label}
                  className="flex items-center gap-1 rounded-md border border-current/20 bg-black/20 px-2 py-0.5 text-[10px]"
                >
                  <span>{e.icono}</span>
                  {e.label}
                </span>
              ))}
            </div>
          </div>

          {/* Sección de Medidas de control */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-70">
              <ListChecks className="h-3 w-3" />
              Medidas de Control
            </div>
            <ul className="space-y-1">
              {control.medidas.map((m) => (
                <li key={m} className="flex items-start gap-1.5 text-[10px] opacity-80">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Sección de Normas / Permisos (Si existen) */}
          {(control.norma || control.permiso) && (
            <div className="flex flex-wrap gap-2">
              {control.norma && (
                <span className="flex items-center gap-1 rounded-md border border-current/20 bg-black/10 px-2 py-0.5 text-[10px] opacity-70">
                  <FileText className="h-2.5 w-2.5" />
                  {control.norma}
                </span>
              )}
              {control.permiso && (
                <span className="flex items-center gap-1 rounded-md border border-current/30 bg-current/10 px-2 py-0.5 text-[10px] font-semibold">
                  ⚠ {control.permiso}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

// ─── Componente Principal DetailsPanel ──────────────────────────────────────
// Muestra el panel lateral de detalles de un área (responsable, riesgos, historial)
export function DetailsPanel({ area }: Props) {
  const [showChecklist, setShowChecklist] = useState(false); // Modal de evaluación
  const [activeTab, setActiveTab] = useState<"detalles" | "historial">("detalles"); // Pestañas

  // Guarda la evaluación en Firebase y muestra una notificación
  const handleSaveChecklist = async (data: EvaluationData) => {
    try {
      if (!area) return;
      
      const evalRef = collection(db, "evaluaciones");
      await addDoc(evalRef, {
        areaId: area.id,
        areaNombre: area.nombre,
        equipo: area.equipo,
        responsable: area.responsable,
        evaluador: data.evaluador,
        cumplimiento: data.cumplimiento,
        respuestas: data.respuestas,
        observaciones: data.observaciones,
        fecha: serverTimestamp(),
      });
      
      toast.success("Evaluación guardada", {
        description: `Se guardó correctamente con un ${data.cumplimiento}% de cumplimiento.`,
      });
      setShowChecklist(false);
    } catch (error) {
      console.error("Error al guardar evaluación:", error);
      toast.error("Error al guardar", {
        description: "Revisa tu conexión o configuración de Firebase.",
      });
    }
  };


  const estado = area ? getAreaStatus(area.ultimaInspeccion) : null;

  return (
    <aside
      aria-live="polite"
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      {!area ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center text-muted-foreground">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/40">
            <Map className="h-7 w-7" />
          </div>
          <p className="max-w-[14rem] text-sm leading-relaxed">
            Selecciona un área en el mapa para ver sus detalles y responsables.
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80">
              Área seleccionada
            </p>
            <h2 className="text-lg font-bold leading-snug text-foreground">
              {area.nombre}
            </h2>
          </header>

          {/* Separador visual color ámbar */}
          <div className="h-px bg-gradient-to-r from-amber-500/40 via-border to-transparent" />

          {/* Tarjetas de Información del Dueño y Equipo Autónomo */}
          <div className="space-y-3">
            <InfoRow
              icon={<User className="h-4 w-4 text-amber-400" />}
              label="Responsable"
              value={area.responsable}
              avatar={<Avatar name={area.responsable} className="h-10 w-10" />}
            />
            <InfoRow
              icon={<Users className="h-4 w-4 text-cyan-400" />}
              label="Equipo autónomo"
              value={area.equipo}
              avatar={<TeamLogo team={area.equipo} className="h-10 w-10" />}
            />
          </div>

          {/* ── Sección de Cumplimiento / Estado de Inspección ── */}
          <div className="rounded-xl border border-border bg-background/30 p-3 space-y-3">
            {/* Etiqueta del Estado (Badge) */}

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {estado === "al-dia" ? (
                  <CalendarCheck className="h-4 w-4 text-emerald-400" />
                ) : (
                  <CalendarX className={`h-4 w-4 ${estado === "retrasado" ? "text-red-400" : "text-amber-400"}`} />
                )}
                <span className="text-xs font-semibold text-foreground">Inspección</span>
              </div>
              {estado && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${ESTADO_META[estado].border} ${ESTADO_META[estado].bg} ${ESTADO_META[estado].color}`}
                >
                  {ESTADO_META[estado].label}
                </span>
              )}
            </div>



            {/* Dates */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <p className="text-muted-foreground">Última inspección</p>
                <span className="text-foreground">
                  {area.ultimaInspeccion ? new Date(area.ultimaInspeccion + "T12:00:00").toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "Sin inspección"}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground">Próxima inspección</p>
                <p className={`font-semibold ${estado === "retrasado" ? "text-red-400" : "text-foreground"}`}>
                  {new Date(area.proximaInspeccion + "T12:00:00").toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Eval Button */}
            <button
              type="button"
              onClick={() => setShowChecklist(true)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-400 transition-colors hover:bg-amber-500/20"
            >
              <ClipboardCheck className="h-4 w-4" />
              Nueva Evaluación
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-background/50 p-1 rounded-lg border border-border">
            <button 
              onClick={() => setActiveTab("detalles")}
              className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${activeTab === "detalles" ? "bg-amber-500/20 text-amber-400 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Riesgos
            </button>
            <button 
              onClick={() => setActiveTab("historial")}
              className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${activeTab === "historial" ? "bg-amber-500/20 text-amber-400 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Historial
            </button>
          </div>

          {activeTab === "detalles" ? (
          <div className="flex flex-1 flex-col gap-3">
            {/* Risks with expandable controls (Mejora 3) */}
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                Riesgos identificados
              </span>
              <span className="ml-auto rounded-full border border-border bg-background/40 px-2 py-0.5 text-xs text-muted-foreground">
                {area.riesgos.length}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Toca un riesgo para ver EPP y medidas de control
            </p>
            <ul className="flex flex-col gap-2">
              {area.riesgos.map((riesgo) => (
                <RiskItem key={riesgo} riesgo={riesgo} />
              ))}
            </ul>
          </div>
          ) : (
            <div className="flex flex-1 flex-col gap-3 min-h-[200px]">
              <EvaluationHistory areaId={area.id} />
            </div>
          )}

          {/* Pie del Panel */}
          <div className="rounded-lg border border-border/50 bg-surface-zone px-3 py-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Sistema de Seguridad Industrial
          </div>

          {/* Modal de Evaluación (ChecklistForm) visible cuando se requiere */}
          {showChecklist && area && (
            <ChecklistForm
              area={area}
              onClose={() => setShowChecklist(false)}
              onSave={handleSaveChecklist}
            />
          )}
        </>
      )}
    </aside>
  );
}

function InfoRow({
  icon,
  label,
  value,
  avatar,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  avatar?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
      {avatar && <div>{avatar}</div>}
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
          {icon}
          {label}
        </div>
        <p className="text-sm font-semibold leading-snug text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
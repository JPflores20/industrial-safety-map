import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  X,
  ClipboardCheck,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Award,
} from "lucide-react";
import { CATEGORIAS } from "./ChecklistForm";

interface Props {
  evaluation: {
    id: string;
    evaluador?: string;
    cumplimiento: number;
    observaciones?: any;
    imagenes?: Record<string, string[]>;
    respuestas?: Record<string, "cumple" | "no-cumple" | "na" | null>;
    fecha: Date | null;
  };
  areaNombre: string;
  onClose: () => void;
}

export function EvaluationDetailModal({ evaluation, areaNombre, onClose }: Props) {
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);

  const getStatusColor = (val: number) => {
    if (val >= 85) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (val >= 65) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-red-400 border-red-500/30 bg-red-500/10";
  };

  const getBadgeStyle = (resp: "cumple" | "no-cumple" | "na" | null | undefined) => {
    switch (resp) {
      case "cumple":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "no-cumple":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      case "na":
        return "border-slate-500/30 bg-slate-500/10 text-slate-300";
      default:
        return "border-border bg-background text-muted-foreground";
    }
  };

  // Convertir las observaciones a un objeto
  let obsObj: Record<string, string> = {};
  if (evaluation.observaciones) {
    if (typeof evaluation.observaciones === "object" && evaluation.observaciones !== null) {
      obsObj = evaluation.observaciones;
    } else if (typeof evaluation.observaciones === "string") {
      try {
        const parsed = JSON.parse(evaluation.observaciones);
        if (typeof parsed === "object" && parsed !== null) {
          obsObj = parsed;
        }
      } catch (e) {
        // No era JSON stringificado
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent 
        className="max-w-3xl w-full p-0 border-none bg-transparent shadow-none [&>button]:hidden flex flex-col justify-start overflow-hidden h-[100dvh] sm:h-auto sm:max-h-[95vh] left-0 top-0 translate-x-0 translate-y-0 sm:left-[50%] sm:top-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2 z-50"
      >
        <div className="flex h-full w-full flex-col overflow-hidden sm:rounded-2xl border-0 sm:border border-border bg-card shadow-none sm:shadow-2xl">
          
          {/* Encabezado del Modal */}
          <div className="flex items-start justify-between border-b border-border bg-surface-zone px-4 sm:px-6 py-4 gap-2 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-amber-400 shrink-0" />
                <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">Detalle de la Evaluación</h2>
              </div>
              <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">
                Área: <span className="font-semibold text-foreground">{areaNombre}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-background/50 hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Información de Metadatos (Evaluador, Fecha, Score) */}
          <div className="grid grid-cols-3 gap-3 bg-muted/20 border-b border-border px-6 py-4 shrink-0 text-xs">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Evaluador</p>
                <p className="font-semibold text-foreground truncate max-w-[150px]">{evaluation.evaluador || "Anónimo"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fecha</p>
                <p className="font-semibold text-foreground">
                  {evaluation.fecha ? new Intl.DateTimeFormat('es-MX', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  }).format(evaluation.fecha) : '---'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Cumplimiento</p>
                <span className={`inline-block font-black px-1.5 py-0.5 rounded border text-xs ${getStatusColor(evaluation.cumplimiento)}`}>
                  {evaluation.cumplimiento}%
                </span>
              </div>
            </div>
          </div>

          {/* Cuerpo Desplazable del Checklist */}
          <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-8">
            {CATEGORIAS.map((cat) => {
              // Filtrar si esta categoría tiene respuestas registradas en esta evaluación
              // Para retrocompatibilidad o si no existen respuestas completas
              const hasAnswers = evaluation.respuestas && Object.keys(evaluation.respuestas).length > 0;
              
              return (
                <section key={cat.id} className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                    <span className="text-amber-400">{cat.icon}</span>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">{cat.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((item) => {
                      const res = evaluation.respuestas?.[item];
                      const comentario = obsObj[item];
                      const fotos = evaluation.imagenes?.[item] || [];

                      // Si el registro no tiene las respuestas completas guardadas, solo mostramos los fallos de esta categoría
                      if (!hasAnswers && !comentario) return null;

                      return (
                        <div key={item} className="flex flex-col gap-2.5 rounded-xl border border-border bg-background/30 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <span className="text-xs text-foreground flex-1 leading-relaxed text-justify pr-2">{item}</span>
                            
                            {/* Estado (badge) */}
                            {hasAnswers && (
                              <span className={`flex items-center gap-1 self-start rounded-full border px-2 py-0.5 text-[10px] font-bold shrink-0 mt-1 sm:mt-0 ${getBadgeStyle(res)}`}>
                                {res === "cumple" && <CheckCircle2 className="h-3 w-3" />}
                                {res === "no-cumple" && <XCircle className="h-3 w-3" />}
                                {res === "na" && <MinusCircle className="h-3 w-3" />}
                                {res === "cumple" && "Cumple"}
                                {res === "no-cumple" && "No Cumple"}
                                {res === "na" && "N/A"}
                              </span>
                            )}
                          </div>

                          {/* Observación y fotos de incumplimiento */}
                          {comentario && (
                            <div className="mt-1 pl-3 border-l-2 border-red-500/30 bg-red-500/5 p-2.5 rounded-r-lg space-y-2">
                              <div className="flex items-start gap-1.5">
                                <span className="text-red-500/60 font-serif text-base leading-none">"</span>
                                <p className="text-xs text-red-300/90 italic flex-1 leading-relaxed">{comentario}</p>
                                <span className="text-red-500/60 font-serif text-base leading-none">"</span>
                              </div>

                              {fotos.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1 border-t border-red-500/10">
                                  {fotos.map((imgUrl, imgIdx) => (
                                    <button
                                      key={imgIdx}
                                      type="button"
                                      onClick={() => setActiveImageUrl(imgUrl)}
                                      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-background/50 hover:opacity-85 active:scale-95 transition-all cursor-zoom-in"
                                    >
                                      <img
                                        src={imgUrl.replace("/upload/", "/upload/w_100,h_100,c_fill,q_auto,f_auto/")}
                                        alt={`Foto Hallazgo ${imgIdx + 1}`}
                                        className="h-full w-full object-cover"
                                      />
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Botón de cerrar abajo */}
          <div className="border-t border-border bg-surface-zone px-4 sm:px-6 py-4 flex justify-end shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center rounded-xl bg-background border border-border px-5 py-2.5 text-xs font-bold text-foreground transition-all hover:bg-muted cursor-pointer"
            >
              Cerrar Detalle
            </button>
          </div>

        </div>

        {/* Lightbox para previsualizar imágenes a pantalla completa */}
        {activeImageUrl && (
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/95 p-4 transition-all animate-in fade-in duration-200"
            onClick={() => setActiveImageUrl(null)}
          >
            {/* Cache bust 8 */}
            <img
              src={activeImageUrl}
              alt="Hallazgo Ampliado"
              className="w-[65vw] h-[65vh] object-contain animate-in zoom-in-95 duration-300 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="z-[110] flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-md hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-white/10 shadow-2xl"
              onClick={() => setActiveImageUrl(null)}
              title="Cerrar foto"
            >
              <X className="h-5 w-5" /> Cerrar Imagen
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

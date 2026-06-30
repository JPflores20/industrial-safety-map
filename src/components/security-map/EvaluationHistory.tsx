// ─── Importaciones de React, Firebase y UI ──────────────────────────────────
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Conexión a la base de datos Firestore
import { ESTADO_META } from "./data";
import { Calendar, CheckCircle2, AlertCircle, Loader2, ClipboardList, X } from "lucide-react";
import { EvaluationDetailModal } from "./EvaluationDetailModal";

// Estructura de datos para un registro de evaluación histórica
interface EvalRecord {
  id: string; // ID único del documento en Firebase
  evaluador?: string; // Nombre de quien evaluó
  cumplimiento: number; // Porcentaje obtenido (0-100)
  observaciones: any; // Texto u objeto de observaciones
  imagenes?: Record<string, string[]>; // Imágenes asociadas
  respuestas?: Record<string, "cumple" | "no-cumple" | "na">; // Respuestas completas
  fecha: Date | null; // Fecha y hora en que se realizó la evaluación
}

export function EvaluationHistory({ areaId, areaNombre }: { areaId: string; areaNombre?: string }) {
  const [evaluations, setEvaluations] = useState<EvalRecord[]>([]); // Lista de evaluaciones
  const [loading, setLoading] = useState(true); // Estado de carga de datos
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null); // Lightbox para imágenes
  const [selectedEval, setSelectedEval] = useState<EvalRecord | null>(null); // Evaluación para ver detalle

  useEffect(() => {
    // Si no hay un ID de área seleccionado, no hacemos nada
    if (!areaId) return;

    setLoading(true);
    
    // Consulta a la colección "evaluaciones" filtrando por el areaId
    const q = query(
      collection(db, "evaluaciones"),
      where("areaId", "==", areaId)
    );

    // Escuchamos en tiempo real los cambios en los datos de Firebase (onSnapshot)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records: EvalRecord[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          evaluador: data.evaluador,
          cumplimiento: data.cumplimiento || 0,
          observaciones: data.observaciones || "",
          imagenes: data.imagenes || null,
          respuestas: data.respuestas || null,
          fecha: data.fecha?.toDate() || null,
        };
      });

      // Ordenamos en el cliente para evitar requerir índices compuestos en Firestore
      records.sort((a, b) => {
        const dateA = a.fecha?.getTime() || 0;
        const dateB = b.fecha?.getTime() || 0;
        return dateB - dateA; // Orden descendente (más nuevo primero)
      });

      setEvaluations(records);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching evaluations: ", error);
      setLoading(false);
    });

    // Función de limpieza: se desuscribe de Firebase cuando el componente se desmonta
    return () => unsubscribe();
  }, [areaId]); // Se vuelve a ejecutar si cambia el areaId

  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Si no hay evaluaciones previas, mostrar un mensaje de estado vacío (Empty State)
  if (evaluations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-muted-foreground">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 border border-border">
          <ClipboardList className="h-5 w-5 opacity-50" />
        </div>
        <p className="text-sm">No hay evaluaciones previas para esta área.</p>
      </div>
    );
  }

  // Renderizar la lista de evaluaciones históricas
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      {evaluations.map((ev) => {
        const isPassed = ev.cumplimiento >= 80;
        
        return (
          <div 
            key={ev.id}
            onClick={() => setSelectedEval(ev)}
            className="group relative overflow-hidden rounded-xl border border-border bg-background/30 p-4 transition-all hover:bg-background/50 hover:border-border/80 cursor-pointer active:scale-[0.99]"
          >
            {/* Indicador lateral de color */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${isPassed ? 'bg-emerald-500' : 'bg-red-500'} opacity-80`} />
            
            <div className="flex items-center justify-between mb-3 pl-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {ev.fecha ? new Intl.DateTimeFormat('es-MX', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(ev.fecha) : 'Fecha desconocida'}
                </div>
                {ev.evaluador && (
                  <div className="text-[10px] text-muted-foreground/80 font-semibold uppercase tracking-wider pl-5">
                    Eval: {ev.evaluador}
                  </div>
                )}
              </div>
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${isPassed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {isPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                {ev.cumplimiento}%
              </div>
            </div>

            {/* Renderizado condicional de las observaciones (sólo si existen) */}
            {(() => {
              let obsObj: Record<string, string> | null = null;
              let obsText = "";

              if (typeof ev.observaciones === 'object' && ev.observaciones !== null) {
                obsObj = ev.observaciones;
              } else if (typeof ev.observaciones === 'string') {
                try {
                  // Intentar parsear por si es un JSON stringificado
                  const parsed = JSON.parse(ev.observaciones);
                  if (typeof parsed === 'object' && parsed !== null) {
                    obsObj = parsed;
                  } else {
                    obsText = ev.observaciones;
                  }
                } catch (e) {
                  obsText = ev.observaciones;
                }
              }

              if (obsObj && Object.keys(obsObj).length > 0) {
                return (
                  <div className="pl-2 mt-3 space-y-2">
                    {Object.entries(obsObj).map(([pregunta, comentario], idx) => (
                      <div key={idx} className="bg-background/40 p-2.5 rounded-lg border border-border/50 text-xs space-y-2">
                        <p className="font-semibold text-foreground/90 mb-1 leading-snug" title={pregunta}>
                          {pregunta}
                        </p>
                        <div className="flex items-start gap-1.5 border-t border-border/30 pt-1.5">
                          <span className="text-muted-foreground/50 font-serif text-base leading-none">"</span>
                          <p className="text-muted-foreground/90 italic flex-1">{comentario}</p>
                          <span className="text-muted-foreground/50 font-serif text-base leading-none">"</span>
                        </div>

                        {/* Imágenes asociadas al hallazgo en el historial */}
                        {ev.imagenes && ev.imagenes[pregunta] && ev.imagenes[pregunta].length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-border/20">
                            {ev.imagenes[pregunta].map((imgUrl, imgIdx) => (
                              <button
                                key={imgIdx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageUrl(imgUrl);
                                }}
                                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-background/50 hover:opacity-85 active:scale-95 transition-all cursor-zoom-in"
                              >
                                <img
                                  src={imgUrl.replace("/upload/", "/upload/w_100,h_100,c_fill,q_auto,f_auto/")}
                                  alt={`Hallazgo ${imgIdx + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }

              if (!obsText || obsText.trim() === '') return null;
              
              return (
                <div className="pl-2 mt-3">
                  <p className="text-xs text-muted-foreground/80 leading-relaxed italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                    "{obsText}"
                  </p>
                </div>
              );
            })()}
          </div>
        );
      })}

      {/* Lightbox para previsualizar imágenes a pantalla completa */}
      {activeImageUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-all animate-in fade-in duration-200"
          onClick={() => setActiveImageUrl(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/85 cursor-pointer"
            onClick={() => setActiveImageUrl(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={activeImageUrl}
            alt="Hallazgo Histórico Ampliado"
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Modal de Detalle de Evaluación */}
      {selectedEval && (
        <EvaluationDetailModal
          evaluation={selectedEval}
          areaNombre={areaNombre || "Área Seleccionada"}
          onClose={() => setSelectedEval(null)}
        />
      )}
    </div>
  );
}

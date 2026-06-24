import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ESTADO_META } from "./data";
import { Calendar, CheckCircle2, AlertCircle, Loader2, ClipboardList } from "lucide-react";

interface EvalRecord {
  id: string;
  evaluador?: string;
  cumplimiento: number;
  observaciones: string;
  fecha: Date | null;
}

export function EvaluationHistory({ areaId }: { areaId: string }) {
  const [evaluations, setEvaluations] = useState<EvalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!areaId) return;

    setLoading(true);
    const q = query(
      collection(db, "evaluaciones"),
      where("areaId", "==", areaId)
    );

    // Escuchamos en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records: EvalRecord[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          evaluador: data.evaluador,
          cumplimiento: data.cumplimiento || 0,
          observaciones: data.observaciones || "",
          fecha: data.fecha?.toDate() || null,
        };
      });

      // Ordenamos en el cliente para evitar requerir índices compuestos en Firestore
      records.sort((a, b) => {
        const dateA = a.fecha?.getTime() || 0;
        const dateB = b.fecha?.getTime() || 0;
        return dateB - dateA; // Descendente (más nuevo primero)
      });

      setEvaluations(records);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching evaluations: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [areaId]);

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

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

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      {evaluations.map((ev) => {
        const isPassed = ev.cumplimiento >= 80;
        
        return (
          <div 
            key={ev.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-background/30 p-4 transition-all hover:bg-background/50 hover:border-border/80"
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

            {(() => {
              const obsText = typeof ev.observaciones === 'object' 
                ? (ev.observaciones && Object.keys(ev.observaciones).length > 0 ? JSON.stringify(ev.observaciones) : null) 
                : ev.observaciones;
                
              if (!obsText || obsText.toString().trim() === '') return null;
              
              return (
                <div className="pl-2">
                  <p className="text-xs text-muted-foreground/80 leading-relaxed italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                    "{obsText}"
                  </p>
                </div>
              );
            })()}
          </div>
        );
      })}
    </div>
  );
}

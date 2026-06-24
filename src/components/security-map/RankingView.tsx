import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Target, Trophy } from "lucide-react";
import { areas } from "./data";
import { Avatar } from "./Avatar";
import { TeamLogo } from "./TeamLogo";

interface EvalRecord {
  areaId: string;
  cumplimiento: number;
}

interface AreaRanking {
  id: string;
  nombre: string;
  equipo: string;
  responsable: string;
  promedio: number;
  totalEvaluaciones: number;
}

const teamLeaders: Record<string, string> = {
  "LOS PANCHITOS": "JOSE FRANCISCO TORRES LÓPEZ",
  "MASH-RAINBOW": "RODRÍGUEZ RANGEL JOSÉ LUIS",
  "NAHUALES": "LUIS MANUEL GARCIA VICTORIO",
  "LOS CAZADORES DEL AMARGOR": "FATIMA NEDITH GOMEZ MIRELES",
  "CUCHILLAS": "JUAN SALAZAR BANDA",
  "MOSTO-BOYS": "OBED CALVILLO RAMIREZ"
};

export function RankingView() {
  const [rankings, setRankings] = useState<AreaRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "evaluaciones"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records: EvalRecord[] = snapshot.docs.map(doc => ({
        areaId: doc.data().areaId,
        cumplimiento: doc.data().cumplimiento || 0,
      }));

      // Agrupar y calcular promedios
      const areaStats = new Map<string, { total: number, count: number }>();
      
      records.forEach(record => {
        const current = areaStats.get(record.areaId) || { total: 0, count: 0 };
        areaStats.set(record.areaId, {
          total: current.total + record.cumplimiento,
          count: current.count + 1
        });
      });

      // Mapear con datos de áreas estáticas y calcular promedios finales
      const rankingData: AreaRanking[] = [];
      
      areas.forEach(area => {
        const stats = areaStats.get(area.id);
        if (stats && stats.count > 0) {
          rankingData.push({
            id: area.id,
            nombre: area.nombre,
            equipo: area.equipo,
            responsable: area.responsable,
            promedio: Math.round(stats.total / stats.count),
            totalEvaluaciones: stats.count
          });
        }
      });

      // Ordenar por promedio de mayor a menor
      rankingData.sort((a, b) => b.promedio - a.promedio);

      setRankings(rankingData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching ranking: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#1e3a8a]" />
        <p>Cargando tabla de posiciones...</p>
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/50 border-2 border-dashed border-border">
          <Target className="h-8 w-8 opacity-50" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Aún no hay datos suficientes</h2>
          <p className="text-sm mt-1">Realiza evaluaciones en las diferentes áreas para generar la tabla.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto space-y-8 pb-12">
      
      {/* HEADER SECTION */}
      <div className="flex items-center gap-4 bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] dark:text-blue-400">
          <Trophy className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a8a] dark:text-blue-400 uppercase tracking-tight">
            Tabla de Posiciones de Seguridad
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Ranking general basado en inspecciones y evaluaciones de las áreas
          </p>
        </div>
      </div>

      {/* TABLE VIEW */}
      <div className="w-full overflow-x-auto rounded-t-lg shadow-md border border-[#1e3a8a]/20">
        <table className="w-full text-sm text-left border-collapse bg-white dark:bg-card">
          <thead className="bg-[#1e3a8a] text-white text-[11px] font-bold uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-center border-r border-white/20 w-16">#</th>
              <th className="px-6 py-4 border-r border-white/20 w-56">Área / Zona</th>
              <th className="px-6 py-4 border-r border-white/20 w-64">Responsable del área</th>
              <th className="px-4 py-4 text-center border-r border-white/20 w-40">Equipo Autónomo</th>
              <th className="px-6 py-4 border-r border-white/20 w-64">Líder de equipo autónomo</th>
              <th className="px-4 py-4 text-center border-r border-white/20 w-32">Inspecciones</th>
              <th className="px-6 py-4 text-center w-32">Cumplimiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rankings.map((area, index) => {
              const isRed = area.promedio < 85;
              const isTop = index < 3;
              
              const teamLeader = teamLeaders[area.equipo] || "LÍDER ASIGNADO";

              return (
                <tr 
                  key={area.id} 
                  className={`group transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${isTop ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}`}
                >
                  {/* Posición */}
                  <td className="px-4 py-6 text-center border-r border-border align-middle">
                    <span className={`text-base font-black ${isTop ? 'text-amber-500' : 'text-slate-400'}`}>
                      {index + 1}
                    </span>
                  </td>

                  {/* Área / Zona */}
                  <td className="px-6 py-6 border-r border-border align-middle">
                    <div className="font-bold text-base text-foreground">
                      {area.nombre}
                    </div>
                    {isRed && (
                      <div className="mt-1 inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 uppercase">
                        Zona Crítica
                      </div>
                    )}
                  </td>

                  {/* Responsable del área */}
                  <td className="px-6 py-4 border-r border-border align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar name={area.responsable} className="h-12 w-12 shrink-0 rounded-md shadow-sm border border-border" />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight text-foreground uppercase">
                          {area.responsable}
                        </span>
                        <div className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-[10px] font-bold border border-teal-200 dark:border-teal-800 uppercase mt-1 w-fit">
                          LÍDER ASIGNADO
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Equipo Autónomo (Logo y nombre) */}
                  <td className="px-4 py-4 border-r border-border text-center align-middle">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-border shadow-sm bg-black">
                        <TeamLogo team={area.equipo} className="h-full w-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-[#1e3a8a] dark:text-blue-400 uppercase tracking-wider text-center px-2">
                        {area.equipo}
                      </span>
                    </div>
                  </td>

                  {/* Líder de equipo autónomo */}
                  <td className="px-6 py-4 border-r border-border align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar name={teamLeader} className="h-12 w-12 shrink-0 rounded-full shadow-md border-2 border-slate-200 dark:border-slate-700" />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight text-foreground uppercase">
                          {teamLeader}
                        </span>
                        <div className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] font-bold border border-indigo-200 dark:border-indigo-800 uppercase mt-1 w-fit">
                          LÍDER DE EQUIPO
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Inspecciones */}
                  <td className="px-4 py-6 border-r border-border text-center align-middle">
                    <div className="inline-flex items-center justify-center h-8 px-4 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-bold text-sm">
                      {area.totalEvaluaciones}
                    </div>
                  </td>

                  {/* Cumplimiento (Nivel Autonomía style box) */}
                  <td className="px-6 py-6 text-center align-middle">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 overflow-hidden rounded border border-border shadow-sm">
                        <div className={`py-1 text-[10px] font-bold text-white uppercase ${isRed ? 'bg-red-600' : isTop ? 'bg-amber-500' : 'bg-[#1e3a8a]'}`}>
                          PROMEDIO
                        </div>
                        <div className="bg-white dark:bg-card py-2 text-xl font-black text-[#1e3a8a] dark:text-foreground">
                          {area.promedio}%
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

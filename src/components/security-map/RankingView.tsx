// ─── Importaciones de librerías y componentes ────────────────────────────────
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti"; // Para animación de celebración
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Configuración de base de datos
import { Loader2, Target, Trophy, Crown, AlertTriangle } from "lucide-react"; // Iconos UI
import { areas, getAreaStatus, ESTADO_META, type EstadoArea } from "./data";
import { Avatar } from "./Avatar";
import { TeamLogo } from "./TeamLogo";

// ─── Interfaces y Tipos de Datos ─────────────────────────────────────────────
// Representa un registro de evaluación obtenido de Firebase
interface EvalRecord {
  areaId: string;
  cumplimiento: number;
  fecha: Date | null;
  respuestas?: Record<string, string>;
}

// Representa los datos combinados para mostrar el ranking de un área
interface AreaRanking {
  id: string;
  nombre: string;
  equipo: string;
  responsable: string;
  promedio: number;
  totalEvaluaciones: number;
  estado: EstadoArea;
}

interface FindingRanking {
  pregunta: string;
  total: number;
  areas: Record<string, number>; // areaId -> count
}

// Diccionario estático de líderes por equipo
const teamLeaders: Record<string, string> = {
  "LOS PANCHITOS": "JOSE FRANCISCO TORRES LÓPEZ",
  "MASH-RAINBOW": "RODRÍGUEZ RANGEL JOSÉ LUIS",
  "NAHUALES": "LUIS MANUEL GARCIA VICTORIO",
  "LOS CAZADORES DEL AMARGOR": "FATIMA NEDITH GOMEZ MIRELES",
  "CUCHILLAS": "JUAN SALAZAR BANDA",
  "MOSTO-BOYS": "OBED CALVILLO RAMIREZ"
};

// ─── Componente Principal RankingView ────────────────────────────────────────
// Muestra una tabla de posiciones con el promedio de cumplimiento de cada área
export function RankingView() {
  const [rankings, setRankings] = useState<AreaRanking[]>([]);
  const [topFindings, setTopFindings] = useState<FindingRanking[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga de datos
  const [selectedMonth, setSelectedMonth] = useState("all"); // Filtro de mes
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null); // Referencia para el canvas de confeti

  // ── Hook para obtener datos de Firebase en tiempo real ──
  useEffect(() => {
    setLoading(true);
    // Consulta a la colección "evaluaciones"
    const q = query(collection(db, "evaluaciones"));

    // Suscripción a cambios en Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Mapeo de documentos a objetos EvalRecord
      const records: EvalRecord[] = snapshot.docs.map(doc => ({
        areaId: doc.data().areaId,
        cumplimiento: doc.data().cumplimiento || 0,
        fecha: doc.data().fecha?.toDate() || null,
        respuestas: doc.data().respuestas || {},
      })).filter(record => {
        // Filtro por mes seleccionado
        if (selectedMonth === "all") return true;
        if (!record.fecha) return false;
        return (record.fecha.getMonth() + 1).toString() === selectedMonth;
      });

      // Agrupar evaluaciones por área y sumar para calcular el promedio
      const areaStats = new Map<string, { total: number, count: number, latest: Date | null }>();
      
      records.forEach(record => {
        const current = areaStats.get(record.areaId) || { total: 0, count: 0, latest: null };
        let newLatest = current.latest;
        if (record.fecha && (!newLatest || record.fecha > newLatest)) {
          newLatest = record.fecha;
        }
        
        areaStats.set(record.areaId, {
          total: current.total + record.cumplimiento,
          count: current.count + 1,
          latest: newLatest
        });
      });

      // Procesar ranking de hallazgos negativos
      const findingsStats = new Map<string, { total: number; areas: Record<string, number> }>();
      
      records.forEach(record => {
        if (record.respuestas) {
          for (const [pregunta, respuesta] of Object.entries(record.respuestas)) {
            if (respuesta === "no-cumple") {
              const current = findingsStats.get(pregunta) || { total: 0, areas: {} };
              current.total += 1;
              current.areas[record.areaId] = (current.areas[record.areaId] || 0) + 1;
              findingsStats.set(pregunta, current);
            }
          }
        }
      });

      const findingRankingData: FindingRanking[] = Array.from(findingsStats.entries()).map(([pregunta, stats]) => ({
        pregunta,
        total: stats.total,
        areas: stats.areas,
      })).sort((a, b) => b.total - a.total).slice(0, 10); // top 10 hallazgos
      
      setTopFindings(findingRankingData);

      // Mapear con datos de áreas estáticas y calcular promedios finales
      const rankingData: AreaRanking[] = [];
      
      areas.forEach(area => {
        const stats = areaStats.get(area.id);
        
        let estadoDate = "";
        if (stats && stats.latest) {
          const latest = stats.latest;
          const localDate = new Date(latest.getTime() - latest.getTimezoneOffset() * 60000);
          estadoDate = localDate.toISOString().split('T')[0];
        }
        
        rankingData.push({
          id: area.id,
          nombre: area.nombre,
          equipo: area.equipo,
          responsable: area.responsable,
          promedio: stats && stats.count > 0 ? Math.round(stats.total / stats.count) : 0,
          totalEvaluaciones: stats ? stats.count : 0,
          estado: getAreaStatus(estadoDate),
        });
      });

      // Ordenar por estado (Al Día > Pendiente > Retrasado) y luego por mayor promedio
      const estadoWeight = { "al-dia": 3, "pendiente": 2, "retrasado": 1 };
      rankingData.sort((a, b) => {
        if (estadoWeight[a.estado] !== estadoWeight[b.estado]) {
          return estadoWeight[b.estado] - estadoWeight[a.estado];
        }
        return b.promedio - a.promedio;
      });

      setRankings(rankingData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching ranking: ", error);
      setLoading(false);
    });

    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, [selectedMonth]);

  // Obtener la mejor y peor área del ranking
  const bestArea = rankings.length > 0 && rankings[0].promedio > 0 ? rankings[0] : null;
  const worstArea = rankings.length > 0 ? rankings[rankings.length - 1] : null;

  // ── Efecto de animación de confeti para la mejor área ──
  useEffect(() => {
    if (bestArea && confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: false
      });
      const interval = setInterval(() => {
        myConfetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#FFD700', '#FFA500', '#FF8C00']
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [bestArea]);

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
      
      {/* ── SECCIÓN DE ENCABEZADO (Mejor Área, Logo Central, Peor Área) ── */}
      <div className="flex flex-col xl:flex-row gap-4 mb-6 relative bg-slate-950/50 p-4 rounded-2xl border border-border/50 shadow-inner">
        {/* IZQUIERDA: TARJETA DE LA MEJOR ÁREA */}
        {bestArea ? (
          <div className="flex-1 rounded-[1.25rem] bg-[#0a1120] border-2 border-emerald-500/20 p-4 relative overflow-hidden group shadow-lg">
            <canvas ref={confettiCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
            
            <div className="flex justify-center items-center gap-2 mb-3 relative z-20">
              <Trophy className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em]">Mejor Área</span>
            </div>

            <div className="flex items-center justify-between relative z-20">
              {/* Left: Team Logo Box */}
              <div className="flex-shrink-0 w-[5.5rem] h-[5.5rem] rounded-xl bg-emerald-950/30 flex items-center justify-center border border-emerald-500/10 shadow-inner">
                <TeamLogo team={bestArea.equipo} className="w-16 h-16 object-contain opacity-100" />
              </div>

              {/* Center: Info & Progress */}
              <div className="flex-1 px-5 flex flex-col items-center">
                <h2 className="text-white font-black text-lg text-center uppercase leading-tight mb-2 tracking-wide">
                  {bestArea.nombre}
                </h2>
                <div className="w-full flex items-center gap-3 mb-1.5">
                  <div className="flex-1 h-1.5 bg-emerald-950/50 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" style={{ width: `${bestArea.promedio}%` }} />
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">{bestArea.promedio.toFixed(2)}%</span>
                </div>
                <span className="text-emerald-500/60 text-[9px] font-bold uppercase tracking-wider">
                  Equipo: {bestArea.equipo}
                </span>
              </div>

              {/* Right: Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center w-24">
                <Avatar name={bestArea.responsable} className="w-11 h-11 rounded-full border border-emerald-500/30 mb-1.5 shadow-sm bg-emerald-950 text-emerald-200" />
                <span className="text-emerald-500/60 text-[8px] font-bold uppercase tracking-wider mb-0.5">DUEÑO</span>
                <span className="text-white text-[9px] font-bold uppercase text-center leading-[1.1] max-w-[80px]">
                  {bestArea.responsable}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 rounded-[1.25rem] bg-[#0a1120] border-2 border-border/20 p-5 flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium">Sin datos</span>
          </div>
        )}

        {/* CENTRO: LOGO PRINCIPAL Y FILTRO DE MESES */}
        <div className="flex flex-col items-center justify-center px-2 shrink-0 py-2">
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg mb-3 overflow-hidden border border-white/5 bg-black">
            <img src="/logos/BREWMAN.jpeg" alt="Brewman" className="h-full w-full object-cover" />
          </div>
          <div className="text-center mb-2">
            <div className="text-slate-400/70 text-[9px] font-bold uppercase tracking-[0.15em] mb-0.5">Tabla de Posiciones</div>
            <div className="text-blue-400 font-black text-[11px] uppercase tracking-[0.1em]">Vista Global</div>
          </div>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-900/50 border border-border/40 text-slate-300 text-[9px] font-bold uppercase tracking-wider rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500/50 outline-none w-full text-center hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <option className="bg-slate-900" value="all">TODOS LOS MESES</option>
            <option className="bg-slate-900" value="1">ENERO</option>
            <option className="bg-slate-900" value="2">FEBRERO</option>
            <option className="bg-slate-900" value="3">MARZO</option>
            <option className="bg-slate-900" value="4">ABRIL</option>
            <option className="bg-slate-900" value="5">MAYO</option>
            <option className="bg-slate-900" value="6">JUNIO</option>
            <option className="bg-slate-900" value="7">JULIO</option>
            <option className="bg-slate-900" value="8">AGOSTO</option>
            <option className="bg-slate-900" value="9">SEPTIEMBRE</option>
            <option className="bg-slate-900" value="10">OCTUBRE</option>
            <option className="bg-slate-900" value="11">NOVIEMBRE</option>
            <option className="bg-slate-900" value="12">DICIEMBRE</option>
          </select>
        </div>

        {/* DERECHA: TARJETA DEL ÁREA FOCO (PEOR ÁREA) */}
        {worstArea ? (
          <div className="flex-1 rounded-[1.25rem] bg-[#0a1120] border-2 border-red-500/30 p-4 relative overflow-visible group">
            {/* PULSING EFFECT */}
            <div className="absolute inset-0 rounded-[1.25rem] ring-2 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse pointer-events-none z-0" />
            <div className="absolute inset-0 rounded-[1.25rem] bg-red-500/10 blur-md animate-pulse z-0 pointer-events-none" />
            
            <div className="flex justify-center items-center gap-2 mb-3 relative z-10">
              <Target className="h-3.5 w-3.5 text-red-400" />
              <span className="text-red-400 font-bold text-[10px] uppercase tracking-[0.2em]">Área Foco</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              {/* Left: Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center w-24">
                <Avatar name={worstArea.responsable} className="w-11 h-11 rounded-full border border-red-500/30 mb-1.5 shadow-sm bg-red-950 text-red-200" />
                <span className="text-red-500/60 text-[8px] font-bold uppercase tracking-wider mb-0.5">DUEÑO</span>
                <span className="text-white text-[9px] font-bold uppercase text-center leading-[1.1] max-w-[80px]">
                  {worstArea.responsable}
                </span>
              </div>

              {/* Center: Info & Progress */}
              <div className="flex-1 px-5 flex flex-col items-center">
                <h2 className="text-white font-black text-lg text-center uppercase leading-tight mb-2 tracking-wide">
                  {worstArea.nombre}
                </h2>
                <div className="w-full flex items-center gap-3 mb-1.5">
                  <span className="text-red-400 font-bold text-xs">{worstArea.promedio.toFixed(2)}%</span>
                  <div className="flex-1 h-1.5 bg-red-950/50 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ width: `${worstArea.promedio}%` }} />
                  </div>
                </div>
                <span className="text-red-500/60 text-[9px] font-bold uppercase tracking-wider">
                  Equipo: {worstArea.equipo}
                </span>
              </div>

              {/* Right: Team Logo Box */}
              <div className="flex-shrink-0 w-[5.5rem] h-[5.5rem] rounded-xl bg-red-950/30 flex items-center justify-center border border-red-500/10 shadow-inner">
                <TeamLogo team={worstArea.equipo} className="w-16 h-16 object-contain opacity-100" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 rounded-[1.25rem] bg-[#0a1120] border-2 border-border/20 p-5 flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium">Sin datos</span>
          </div>
        )}
      </div>

      {/* ── VISTA DE TABLA DE POSICIONES ── */}
      <div className="w-full overflow-x-auto rounded-t-lg shadow-md border border-[#1e3a8a]/20">
        <table className="w-full text-sm text-left border-collapse bg-white dark:bg-card">
          <thead className="bg-[#1e3a8a] text-white text-[11px] font-bold uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-center border-r border-white/20 w-16">#</th>
              <th className="px-6 py-4 border-r border-white/20 w-56">Área / Zona</th>
              <th className="px-6 py-4 border-r border-white/20 w-64">DUEÑOS</th>
              <th className="px-4 py-4 text-center border-r border-white/20 w-40">Equipo Autónomo</th>
              <th className="px-6 py-4 border-r border-white/20 w-64">Líder de equipo autónomo</th>
              <th className="px-4 py-4 text-center border-r border-white/20 w-32">Inspecciones</th>
              <th className="px-6 py-4 text-center w-32">Cumplimiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rankings.map((area, index) => {
              const isRed = area.estado === "retrasado";
              const isTop = index === 0 && area.estado === "al-dia";
              
              const teamLeader = teamLeaders[area.equipo] || "LÍDER ASIGNADO";

              return (
                <tr 
                  key={area.id} 
                  className={`group transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${isTop ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}`}
                >
                  {/* Posición */}
                  <td className="px-4 py-6 text-center border-r border-border align-middle">
                    <div className="flex flex-col items-center justify-center">
                      {isTop && <Crown className="h-4 w-4 text-amber-500 mb-1" />}
                      <span className={`text-base font-black ${isTop ? 'text-amber-500' : 'text-slate-400'}`}>
                        {index + 1}
                      </span>
                    </div>
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
                          DUEÑO
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
                        <div className={`py-1 text-[10px] font-bold text-white uppercase ${
                          area.estado === "al-dia" ? "bg-emerald-500" :
                          area.estado === "pendiente" ? "bg-amber-500" :
                          "bg-red-500"
                        }`}>
                          {ESTADO_META[area.estado]?.label || "SIN EVALUAR"}
                        </div>
                        <div className={`bg-white dark:bg-card py-2 text-xl font-black ${
                          area.estado === "al-dia" ? "text-emerald-600 dark:text-emerald-400" :
                          area.estado === "pendiente" ? "text-amber-600 dark:text-amber-400" :
                          area.estado === "retrasado" ? "text-red-600 dark:text-red-400" :
                          "text-amber-600 dark:text-amber-400"
                        }`}>
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

      {/* ── RANKING DE HALLAZGOS ── */}
      <div className="mt-12 bg-[#0a1120] rounded-2xl border border-border/50 p-6 shadow-xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Top Hallazgos Negativos</h2>
          <span className="text-sm text-slate-400 ml-auto font-medium hidden sm:block">Preguntas con más incumplimientos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {topFindings.map((finding, index) => (
            <div key={index} className="bg-slate-900/60 rounded-xl border border-red-500/20 p-5 relative overflow-hidden flex flex-col group hover:border-red-500/40 transition-colors shadow-sm hover:shadow-md">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500/60" />
              <div className="flex justify-between items-start mb-3 gap-2">
                <span className="text-red-400 font-black text-3xl leading-none opacity-80 group-hover:opacity-100 transition-opacity">#{index + 1}</span>
                <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-500/20 whitespace-nowrap tracking-wider shadow-inner">
                  {finding.total} INCIDENCIAS
                </span>
              </div>
              <p className="text-sm text-slate-200 font-semibold mb-5 flex-1 leading-snug">{finding.pregunta}</p>
              
              <div className="border-t border-white/10 pt-4 mt-auto">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2.5">Áreas más afectadas:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(finding.areas)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([areaId, count]) => {
                      const areaData = areas.find(a => a.id === areaId);
                      return (
                        <span key={areaId} className="bg-black/40 text-slate-300 text-[10px] font-medium px-2 py-1 rounded border border-white/5 flex items-center gap-1.5">
                          {areaData?.nombre || areaId}
                          <span className="text-red-400 font-black px-1.5 py-0.5 bg-red-500/10 rounded-sm leading-none">{count}</span>
                        </span>
                      );
                  })}
                </div>
              </div>
            </div>
          ))}
          {topFindings.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500 border border-dashed border-white/10 rounded-xl bg-slate-900/30">
              <Target className="h-10 w-10 opacity-30 mb-3" />
              <p className="text-sm font-medium">No hay hallazgos negativos registrados con los filtros actuales.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

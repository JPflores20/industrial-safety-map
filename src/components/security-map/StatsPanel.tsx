// ─── Importaciones principales ────────────────────────────────────────────────
import { useState, useMemo } from "react";
// Librería Recharts para mostrar gráficas
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  BarChart2,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Shield,
  Users2,
  ClipboardCheck,
  AlertCircle,
  CheckCircle2,
  Target,
} from "lucide-react";
import {
  areas,
  getRiskCategory,
  RISK_CATEGORIES,
  getMaxRiskLevel,
  TEAM_META,
  DEFAULT_TEAM_META,
  KPI_MENSUAL,
} from "./data";

// ─── Estadísticas Precalculadas (Derivadas de los datos estáticos) ─────────────
// Se calculan globalmente una sola vez en lugar de hacerlo en cada renderizado
const allRisks = areas.flatMap((a) => a.riesgos); // Todos los riesgos en un solo arreglo
const totalAreas = areas.length;
const uniqueRisks = new Set(allRisks).size; // Número de riesgos sin duplicados
const totalTeams = new Set(areas.map((a) => a.equipo)).size;
const dangerCount = areas.filter((a) => getMaxRiskLevel(a.riesgos) === "danger").length; // Áreas en estado "danger"
const vencidoCount = areas.filter((a) => a.estado === "vencido").length; // Áreas vencidas

// ─── Estilos comunes para los tooltips de las gráficas ───────────────────────
const chartTooltipStyle = {
  background: "#1a1f35",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontSize: "12px",
};

type Tab = "general" | "kpi"; // Pestañas disponibles en el panel

// ─── Componente Principal StatsPanel ─────────────────────────────────────────
// Muestra el panel desplegable superior con estadísticas generales y gráficas de KPI
export function StatsPanel() {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar el panel
  const [tab, setTab] = useState<Tab>("general"); // Pestaña actual activa

  // Memoización de los datos de categoría de riesgos para la gráfica de barras
  const riskCategoryData = useMemo(
    () =>
      RISK_CATEGORIES.map((cat) => ({
        name: cat.label,
        count: allRisks.filter((r) => getRiskCategory(r) === cat.id).length,
        fill: cat.hex,
      })),
    []
  );

  // Memoización de la distribución de equipos para la gráfica de pastel (Pie chart)
  const teamData = useMemo(
    () =>
      [...new Set(areas.map((a) => a.equipo))].map((equipo) => ({
        name: equipo,
        value: areas.filter((a) => a.equipo === equipo).length,
        fill: (TEAM_META[equipo] ?? DEFAULT_TEAM_META).hex,
      })),
    []
  );

  // ─── Cálculos de KPI (Derivados de datos estáticos mensuales) ────────────
  // Obtiene los datos del último mes y el anterior para calcular las tendencias (pp)
  const latestKpi = KPI_MENSUAL[KPI_MENSUAL.length - 1];
  const prevKpi = KPI_MENSUAL[KPI_MENSUAL.length - 2];
  const kpiTrend = latestKpi.cumplimiento - prevKpi.cumplimiento;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* ── Collapsed header / toggle ── */}
      <button
        type="button"
        id="stats-panel-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-accent/10"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BarChart2 className="h-4 w-4 text-amber-400" />
            Dashboard de Seguridad
          </div>
          <MetricPill icon={<Shield className="h-3 w-3" />} label={`${totalAreas} áreas`} />
          <MetricPill icon={<TrendingUp className="h-3 w-3" />} label={`${uniqueRisks} riesgos únicos`} />
          <MetricPill icon={<Users2 className="h-3 w-3" />} label={`${totalTeams} equipos`} />
          <MetricPill
            icon={<span className="h-2 w-2 rounded-full bg-red-400" />}
            label={`${dangerCount} en Peligro`}
            danger
          />
          {vencidoCount > 0 && (
            <MetricPill
              icon={<span className="h-2 w-2 rounded-full bg-orange-400" />}
              label={`${vencidoCount} vencidas`}
              warning
            />
          )}
          <MetricPill
            icon={<ClipboardCheck className="h-3 w-3 text-emerald-400" />}
            label={`KPI ${latestKpi.cumplimiento}% (${latestKpi.mesCorto})`}
            success
          />
        </div>
        <div className="shrink-0 text-muted-foreground">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* ── Contenido Expandido ── */}
      {open && (
        <div className="border-t border-border">
          {/* ── Navegación por pestañas (Tabs) ── */}
          <div className="flex gap-1 border-b border-border px-5 pt-4">
            <TabBtn id="tab-general" active={tab === "general"} onClick={() => setTab("general")}>
              <BarChart2 className="h-3.5 w-3.5" />
              General
            </TabBtn>
            <TabBtn id="tab-kpi" active={tab === "kpi"} onClick={() => setTab("kpi")}>
              <ClipboardCheck className="h-3.5 w-3.5" />
              KPIs Prerrequisitos
            </TabBtn>
          </div>

          {/* ── Pestaña: General ── */}
          {tab === "general" && (
            <div className="px-5 pb-5">
              <div className="grid grid-cols-1 gap-6 pt-5 md:grid-cols-2">
                {/* Bar chart — risk categories */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Frecuencia por categoría de riesgo
                  </p>
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart
                      data={riskCategoryData}
                      layout="vertical"
                      margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <RechartsTooltip
                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                        contentStyle={chartTooltipStyle}
                        formatter={(v: number) => [`${v} ocurrencias`, "Conteo"]}
                      />
                      <Bar dataKey="count" radius={[0, 5, 5, 0]}>
                        {riskCategoryData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* ── Gráfica de Pastel (Pie Chart) — Áreas por equipo ── */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Distribución de áreas por equipo
                  </p>
                  <ResponsiveContainer width="100%" height={190}>
                    <PieChart>
                      <Pie
                        data={teamData}
                        dataKey="value"
                        nameKey="name"
                        cx="40%"
                        cy="50%"
                        outerRadius={78}
                        innerRadius={40}
                        paddingAngle={2}
                      >
                        {teamData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={chartTooltipStyle}
                        formatter={(v: number, name: string) => [`${v} áreas`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Legend */}
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                    {teamData.map((t) => (
                      <span key={t.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="h-2 w-2 rounded-full" style={{ background: t.fill }} />
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Pestaña: KPIs ── */}
          {tab === "kpi" && (
            <div className="px-5 pb-5 pt-5">
              {/* Tarjetas resumen de los principales indicadores mensuales */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <KpiCard
                  icon={<Target className="h-4 w-4 text-emerald-400" />}
                  label="Cumplimiento Jun"
                  value={`${latestKpi.cumplimiento}%`}
                  trend={kpiTrend > 0 ? `+${kpiTrend}pp vs. mayo` : `${kpiTrend}pp vs. mayo`}
                  trendUp={kpiTrend >= 0}
                />
                <KpiCard
                  icon={<ClipboardCheck className="h-4 w-4 text-sky-400" />}
                  label="Auditorías Jun"
                  value={`${latestKpi.auditoriasRealizadas}/${latestKpi.auditoriasPlaneadas}`}
                  trend={`${Math.round((latestKpi.auditoriasRealizadas / latestKpi.auditoriasPlaneadas) * 100)}% ejecución`}
                  trendUp={latestKpi.auditoriasRealizadas >= latestKpi.auditoriasPlaneadas}
                />
                <KpiCard
                  icon={<AlertCircle className="h-4 w-4 text-amber-400" />}
                  label="Obs. abiertas"
                  value={`${latestKpi.observacionesAbiertas}`}
                  trend={`${latestKpi.observacionesCerradas} cerradas en Jun`}
                  trendUp={latestKpi.observacionesAbiertas < prevKpi.observacionesAbiertas}
                />
                <KpiCard
                  icon={<CheckCircle2 className="h-4 w-4 text-violet-400" />}
                  label="Acciones correct."
                  value={`${latestKpi.accionesCerradas}/${latestKpi.accionesCorrectivas}`}
                  trend="Cerradas en Jun"
                  trendUp={latestKpi.accionesCerradas >= latestKpi.accionesCorrectivas}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* ── Gráfica de Líneas — Tendencia mensual de cumplimiento ── */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Tendencia cumplimiento (Ene – Jun 2026)
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={KPI_MENSUAL} margin={{ left: -20, right: 10, top: 4, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey="mesCorto"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[60, 100]}
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <RechartsTooltip
                        contentStyle={chartTooltipStyle}
                        formatter={(v: number) => [`${v}%`, "Cumplimiento"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="cumplimiento"
                        stroke="#34d399"
                        strokeWidth={2.5}
                        dot={{ fill: "#34d399", r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: "#34d399" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* ── Gráfica de Barras Agrupadas — Observaciones abiertas vs cerradas ── */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Observaciones abiertas vs. cerradas
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={KPI_MENSUAL} margin={{ left: -20, right: 10, top: 4, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey="mesCorto"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <RechartsTooltip contentStyle={chartTooltipStyle} />
                      <Legend
                        wrapperStyle={{ fontSize: "10px", color: "#94a3b8", paddingTop: "8px" }}
                        formatter={(value) => (value === "observacionesAbiertas" ? "Abiertas" : "Cerradas")}
                      />
                      <Bar dataKey="observacionesAbiertas" name="observacionesAbiertas" fill="#f87171" radius={[3, 3, 0, 0]} maxBarSize={20} />
                      <Bar dataKey="observacionesCerradas" name="observacionesCerradas" fill="#34d399" radius={[3, 3, 0, 0]} maxBarSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sub-Componentes UI Reutilizables ────────────────────────────────────────

// Pequeña píldora métrica usada en el encabezado
function MetricPill({
  icon,
  label,
  danger,
  warning,
  success,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
}) {
  const cls = danger
    ? "border-red-500/30 bg-red-500/10 text-red-300"
    : warning
      ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
      : success
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
        : "border-border bg-background/40 text-muted-foreground";
  return (
    <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

// Botón de las pestañas de navegación (General / KPI)
function TabBtn({
  id,
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-t-lg border-b-2 px-4 pb-3 text-xs font-semibold transition-colors ${
        active
          ? "border-amber-400 text-amber-300"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

// Tarjeta que muestra un indicador KPI, su valor y su tendencia
function KpiCard({
  icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3">
      <div className="mb-2 flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className={`mt-1 text-[10px] ${trendUp ? "text-emerald-400" : "text-red-400"}`}>{trend}</p>
    </div>
  );
}

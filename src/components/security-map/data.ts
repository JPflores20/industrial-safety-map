// ─── Interfaces del Área ────────────────────────────────────────────────────────
// Tipos de estado posibles para determinar si el área ha sido inspeccionada a tiempo
export type EstadoArea = "al-dia" | "pendiente" | "retrasado";

// Interfaz que define la estructura de datos de un área de la planta
export interface Area {
  id: string; // Identificador único
  nombre: string; // Nombre visible del área
  responsable: string; // Dueño o encargado del área
  equipo: string; // Equipo autónomo asignado
  riesgos: string[]; // Lista de riesgos identificados en el área
  // ── Campos de cumplimiento (Compliance) ──
  territorio: string; // Zona física a la que pertenece
  ultimaInspeccion: string; // Fecha de última inspección (YYYY-MM-DD)
  proximaInspeccion: string; // Fecha estimada para la siguiente
}


// ─── Lógica para determinar el Estado del Área ───────────────────────────────
// Esta función evalúa la fecha de última inspección para decirnos si está al día
export function getAreaStatus(ultimaInspeccion: string): EstadoArea {
  const hoy = new Date();
  
  if (ultimaInspeccion) {
    const fechaInspeccion = new Date(ultimaInspeccion);
    // Si estamos en el mismo mes y año que la inspección, está "al día"
    if (hoy.getFullYear() === fechaInspeccion.getFullYear() && hoy.getMonth() === fechaInspeccion.getMonth()) {
      return 'al-dia';
    }
  }
  
  // Si no se inspeccionó este mes, evaluamos qué día del mes es hoy.
  // Se da un periodo de gracia hasta el día 20 para hacer la inspección.
  if (hoy.getDate() <= 20) {
    return 'pendiente';
  } else {
    // Si pasa del día 20, ya se considera "retrasado"
    return 'retrasado';
  }
}

export const areas: Area[] = [
  { id: "lobby-recepcion", nombre: "Lobby Recepción", responsable: "HUGO ALBERTO CARDONA ESPINOZA", equipo: "LOS PANCHITOS", riesgos: ["Caídas a desnivel"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "planta-baja-c-1-y-2", nombre: "Planta baja C 1 Y 2", responsable: "EDGAR ZAMARRON ACOSTA", equipo: "MASH-RAINBOW", riesgos: ["Superficies calientes", "Ruido"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cuarto-de-bombas", nombre: "Cuarto de bombas", responsable: "JAIME LOPEZ CHAVEZ", equipo: "MASH-RAINBOW", riesgos: ["Riesgo Eléctrico", "Objetos a baja altura", "Corriente estática"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "planta-baja-c-3-y-4", nombre: "Planta baja C 3 Y 4", responsable: "RIGOBERTO MOTA CORTES", equipo: "MASH-RAINBOW", riesgos: ["Atrapamiento", "Superficies calientes"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-de-atemperamiento", nombre: "Area de atemperamiento", responsable: "J GUADALUPE GUZMAN MUÑOZ", equipo: "MASH-RAINBOW", riesgos: ["Temperatura baja"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "subestacion-electrica-1", nombre: "Subestacion Electrica 1", responsable: "JUAN ANTONIO RIVERA NAJAR", equipo: "NAHUALES", riesgos: ["Riesgo Eléctrico Alta Tensión", "Arco eléctrico"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "tableros-electricos-cuarto-de-bombas", nombre: "Tableros electricos cuarto de bombas", responsable: "JUAN ANTONIO RIVERA NAJAR", equipo: "NAHUALES", riesgos: ["Riesgo Eléctrico"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "seccion-cocedor-macerador", nombre: "Sección Cocedor-Macerador", responsable: "OMAR ALBERTO ROBLES SOSA", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Espacios confinados", "Temperaturas Altas"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "seccion-olla-rotapool", nombre: "Sección Olla-Rotapool", responsable: "URIEL ESCOBEDO MURO", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Superficies calientes", "Atrapamiento"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "subestacion-electrica-2", nombre: "Subestacion Electrica 2", responsable: "JUAN ANTONIO RIVERA NAJAR", equipo: "NAHUALES", riesgos: ["Riesgo Eléctrico Alta Tensión"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "bodega-de-lupulo-1", nombre: "Bodega de lupulo 1", responsable: "JOSÉ LUIS MALDONADO", equipo: "CUCHILLAS", riesgos: ["Transito de montacargas", "Temperatura baja"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "bodega-de-lupulo-2-y-cuarto-de-atempermiento", nombre: "Bodega de lupulo 2 y Cuarto de atempermiento", responsable: "ADRIAN HERNANDEZ DE AVILA", equipo: "CUCHILLAS", riesgos: ["Temperatura baja"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "taller-de-molinos", nombre: "Taller de Molinos", responsable: "JOSE MARIA LUJAN SORIANO", equipo: "NAHUALES", riesgos: ["Ruido", "Riesgo de explosión (Polvos)"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cto-electrico-plcs", nombre: "Cto electrico PLCs", responsable: "JUAN ANTONIO RIVERA NAJAR", equipo: "NAHUALES", riesgos: ["Riesgo Eléctrico"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "comedores", nombre: "Comedores", responsable: "ERIKA IVONE IBARRA NAVA", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Caídas a desnivel"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "vestidores-banos-hombres", nombre: "Vestidores/Baños (Hombres)", responsable: "JUAN ANTONIO VALDEZ LICERIO", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Caídas a desnivel"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "caseta-de-quimicos", nombre: "Caseta de quimicos", responsable: "JOSE MANUEL VARELA ROSALES", equipo: "LOS PANCHITOS", riesgos: ["Sustancias químicas corrosivas"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-recibo-de-quimicos", nombre: "Area Recibo de quimicos", responsable: "HECTOR HUGO VALDEZ PIÑA", equipo: "LOS PANCHITOS", riesgos: ["Sustancias químicas corrosivas", "Transito de camiones"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-recibo-de-dextrosa", nombre: "Area Recibo de dextrosa y tanque de almacenamiento", responsable: "EDGAR EMANUEL JUAREZ ALBA", equipo: "LOS PANCHITOS", riesgos: ["Transito de camiones"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cuarto-de-control-y-vitral", nombre: "Cuarto de control y Vitral", responsable: "CARLOS RIVERA REYES", equipo: "MASH-RAINBOW", riesgos: ["Caídas a desnivel"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "quas-team-room", nombre: "QUAs/Team room", responsable: "J MANUEL RAYGOZA JUAREZ", equipo: "MASH-RAINBOW", riesgos: ["Riesgo a definir"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "azotea-chiller", nombre: "Azotea de acceso chiller de glicol, Azotea de oficinas", responsable: "ALBERTO NUÑEZ VELEZ", equipo: "MASH-RAINBOW", riesgos: ["Trabajo en alturas"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cuarto-de-valvulas", nombre: "Cuarto de Valvulas", responsable: "EDUARDO NERI DE LUNA", equipo: "NAHUALES", riesgos: ["Atrapamiento"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "oficinas-de-mtto", nombre: "Oficinas de mtto", responsable: "SERGIO TRUJILLO", equipo: "NAHUALES", riesgos: ["Riesgo a definir"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "bodega-de-mat-aux", nombre: "Bodega de mat aux", responsable: "EDUARDO VALLE ARIAS", equipo: "MOSTO-BOYS", riesgos: ["Transito de montacargas"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "nivel-tolvas-molido", nombre: "Nivel tolvas molido", responsable: "J JESUS RIVERA MEDINA", equipo: "MOSTO-BOYS", riesgos: ["Riesgo de explosión (Polvos)"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "azotea-coc-y-acidulacion", nombre: "Azotea coc y Area de acidulación", responsable: "JOSE LUIS CAZARES PINALES", equipo: "MOSTO-BOYS", riesgos: ["Trabajo en alturas"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "nivel-molinos", nombre: "Nivel molinos", responsable: "ALDO ADRIAN SIFUENTES VELOZ", equipo: "MOSTO-BOYS", riesgos: ["Atrapamiento", "Ruido"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "nivel-soplantes", nombre: "Nivel soplantes y Azotea Soplantes", responsable: "JOSE CARLOS CARDONA LOERA", equipo: "MOSTO-BOYS", riesgos: ["Ruido", "Trabajo en alturas"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "sotano-silos", nombre: "Sotano silos", responsable: "MARIO ALBERTO ZAMARRIPA LLANAS", equipo: "CUCHILLAS", riesgos: ["Espacios confinados"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "linternilla-1-y-2", nombre: "Linternilla 1 Y 2", responsable: "CONCEPCIÓN REYES MONTERO", equipo: "CUCHILLAS", riesgos: ["Trabajo en alturas"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cuarto-de-filtros", nombre: "Cuarto de filtros", responsable: "VALERIA NATALY CASTAÑON RAMIREZ", equipo: "CUCHILLAS", riesgos: ["Riesgo de explosión (Polvos)"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "tolvas-de-recibo-de-grano", nombre: "Tolvas de Recibo de grano", responsable: "ABEL GUILLERMO MAZATAN PAREDES", equipo: "CUCHILLAS", riesgos: ["Caídas a desnivel"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "sub-estacion-electrica-silos", nombre: "Sub estacion electrica silos", responsable: "ARTURO RODARTE", equipo: "NAHUALES", riesgos: ["Riesgo Eléctrico Alta Tensión"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "tolvas-generales-de-bagazo", nombre: "Tolvas generales de bagazo", responsable: "MANUEL DE JESUS DEL REAL ESQUIVEL", equipo: "CUCHILLAS", riesgos: ["Espacios confinados"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cuarto-de-carga-montacargas", nombre: "Cuarto de Carga - Montacargas", responsable: "JOSE AMADOR RODRIGUEZ JUAREZ", equipo: "MOSTO-BOYS", riesgos: ["Transito de montacargas", "Riesgo Eléctrico"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "andenes-area-descarga", nombre: "Andenes (Norte, Poniente) y Area de desacarga", responsable: "MANUEL DE JESUS CHAVEZ GARCIA", equipo: "MOSTO-BOYS", riesgos: ["Transito de camiones", "Transito de montacargas"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-bajo-mezzanine", nombre: "Área Bajo Mezzanine", responsable: "J MARIO TRUJILLO MEZA", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Objetos a baja altura"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "seccion-a-y-b", nombre: "Sección A y B", responsable: "JUAN RAMON JIMENEZ DELGADO", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Riesgo a definir"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "mezanine-disolucion", nombre: "Mezanine Disolución (TQ 1 Y TQ 2)", responsable: "MARCO AURELIO CUAUCOATL RAMIREZ", equipo: "LOS CAZADORES DEL AMARGOR", riesgos: ["Caídas a desnivel"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "oficina-bodega-de-grits", nombre: "Oficina Bodega de Grits", responsable: "LEOBARDO VARELA NIETO", equipo: "LOS PANCHITOS", riesgos: ["Riesgo a definir"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "eto-bodega-de-grits", nombre: "ETO Bodega de Grits", responsable: "SANTIAGO HERRERA AMADOR", equipo: "LOS PANCHITOS", riesgos: ["Riesgo de explosión (Polvos)"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "cto-electrico", nombre: "Cto electrico", responsable: "ARTURO RODARTE", equipo: "NAHUALES", riesgos: ["Riesgo Eléctrico"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "bancos-de-trabajo", nombre: "Bancos de Trabajo", responsable: "VICTOR SIMENTAL", equipo: "NAHUALES", riesgos: ["Riesgo a definir"], territorio: "Zona Oeste", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-de-motores", nombre: "Area de Motores", responsable: "ARTURO VELAZQUEZ", equipo: "NAHUALES", riesgos: ["Ruido", "Atrapamiento"], territorio: "Zona Norte", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-de-valvulas", nombre: "Area de Valvulas", responsable: "VITOR MENDOZA", equipo: "NAHUALES", riesgos: ["Atrapamiento"], territorio: "Zona Sur", ultimaInspeccion: "", proximaInspeccion: "" },
  { id: "area-de-soldadura", nombre: "Area de Soldadura", responsable: "FLAVIO CESAR DIAZ MALDONADO", equipo: "NAHUALES", riesgos: ["Radiaciones no ionizantes", "Incendio"], territorio: "Zona Este", ultimaInspeccion: "", proximaInspeccion: "" },
];

// ─── Estilos y Metadata de Cumplimiento ───────────────────────────────────────
// Define los colores y clases CSS que se utilizarán según el estado del área
export const ESTADO_META: Record<EstadoArea, {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  chipActive: string;
  chipInactive: string;
}> = {
  "al-dia": {
    label: "Evaluado",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    dot: "bg-emerald-400",
    chipActive: "border-emerald-400 bg-emerald-400/20 text-emerald-300",
    chipInactive: "border-border text-muted-foreground hover:border-emerald-400/50",
  },
  "pendiente": {
    label: "Sin evaluar",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    dot: "bg-amber-400",
    chipActive: "border-amber-400 bg-amber-400/20 text-amber-300",
    chipInactive: "border-border text-muted-foreground hover:border-amber-400/50",
  },
  "retrasado": {
    label: "Retrasado",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/40",
    dot: "bg-red-400",
    chipActive: "border-red-400 bg-red-400/20 text-red-300",
    chipInactive: "border-border text-muted-foreground hover:border-red-400/50",
  },
};


// ─── Lógica para Niveles de Riesgo ──────────────────────────────────────────
export type RiskLevel = "danger" | "alert" | "warning";

// Clasifica el nivel de un riesgo basándose en palabras clave
export function classifyRisk(risk: string): RiskLevel {
  const r = risk.toLowerCase();
  // Riesgos muy altos (danger)
  if (/eléctric|electric|incendio|arco|alta tensión|tensión/.test(r)) return "danger";
  if (/explosión|explosion/.test(r)) return "danger";
  // Riesgos medios (alert)
  if (/caída|caida|atrapamiento|montacargas|confinad|obstácul|obstacul|baja altura|alturas|desnivel|corrosiv|radiac/.test(r))
    return "alert";
  // Riesgos estándar (warning)
  return "warning";
}

// Obtiene el nivel de riesgo más alto de una lista de riesgos
export function getMaxRiskLevel(riesgos: string[]): RiskLevel {
  if (riesgos.some((r) => classifyRisk(r) === "danger")) return "danger";
  if (riesgos.some((r) => classifyRisk(r) === "alert")) return "alert";
  return "warning";
}

// ─── Categorías de Riesgos (Agrupación Visual) ──────────────────────────────
export type RiskCategory =
  | "electrico"
  | "fuego"
  | "alturas"
  | "atrapamiento"
  | "otro";

// Configuración de colores para cada categoría de riesgo
export const RISK_CATEGORIES: {
  id: RiskCategory;
  label: string;
  color: string;
  hex: string;
}[] = [
  { id: "electrico", label: "Eléctrico", color: "text-yellow-400", hex: "#facc15" },
  { id: "fuego", label: "Fuego / Calor", color: "text-red-400", hex: "#f87171" },
  { id: "alturas", label: "Alturas / Caídas", color: "text-sky-400", hex: "#38bdf8" },
  { id: "atrapamiento", label: "Atrapamiento", color: "text-orange-400", hex: "#fb923c" },
  { id: "otro", label: "Otro", color: "text-slate-400", hex: "#94a3b8" },
];

// Asigna una categoría a una cadena de riesgo mediante expresiones regulares
export function getRiskCategory(risk: string): RiskCategory {
  const r = risk.toLowerCase();
  if (/eléctric|electric|tensión|arco/.test(r)) return "electrico";
  if (/explosión|explosion|incendio|caliente|temperatura/.test(r)) return "fuego";
  if (/caída|caida|alturas|desnivel/.test(r)) return "alturas";
  if (/atrapamiento|confinad|corrosiv|radiac/.test(r)) return "atrapamiento";
  return "otro";
}

// ─── Metadatos y colores por Equipo (Team metadata) ──────────────────────────
// Cada equipo tiene colores distintivos en la UI
export const TEAM_META: Record<
  string,
  { color: string; hex: string; activeChip: string; inactiveChip: string; dot: string; border: string; header: string }
> = {
  "MASH-RAINBOW": {
    color: "text-cyan-400",
    hex: "#22d3ee",
    activeChip: "border-cyan-400 bg-cyan-400/20 text-cyan-300",
    inactiveChip: "border-border text-muted-foreground hover:border-cyan-400/50",
    dot: "bg-cyan-400",
    border: "border-cyan-500/20",
    header: "text-cyan-400 border-cyan-500/30",
  },
  "NAHUALES": {
    color: "text-violet-400",
    hex: "#a78bfa",
    activeChip: "border-violet-400 bg-violet-400/20 text-violet-300",
    inactiveChip: "border-border text-muted-foreground hover:border-violet-400/50",
    dot: "bg-violet-400",
    border: "border-violet-500/20",
    header: "text-violet-400 border-violet-500/30",
  },
  "LOS CAZADORES DEL AMARGOR": {
    color: "text-orange-400",
    hex: "#fb923c",
    activeChip: "border-orange-400 bg-orange-400/20 text-orange-300",
    inactiveChip: "border-border text-muted-foreground hover:border-orange-400/50",
    dot: "bg-orange-400",
    border: "border-orange-500/20",
    header: "text-orange-400 border-orange-500/30",
  },
  "CUCHILLAS": {
    color: "text-rose-400",
    hex: "#fb7185",
    activeChip: "border-rose-400 bg-rose-400/20 text-rose-300",
    inactiveChip: "border-border text-muted-foreground hover:border-rose-400/50",
    dot: "bg-rose-400",
    border: "border-rose-500/20",
    header: "text-rose-400 border-rose-500/30",
  },
  "MOSTO-BOYS": {
    color: "text-emerald-400",
    hex: "#34d399",
    activeChip: "border-emerald-400 bg-emerald-400/20 text-emerald-300",
    inactiveChip: "border-border text-muted-foreground hover:border-emerald-400/50",
    dot: "bg-emerald-400",
    border: "border-emerald-500/20",
    header: "text-emerald-400 border-emerald-500/30",
  },
  "LOS PANCHITOS": {
    color: "text-amber-400",
    hex: "#fbbf24",
    activeChip: "border-amber-400 bg-amber-400/20 text-amber-300",
    inactiveChip: "border-border text-muted-foreground hover:border-amber-400/50",
    dot: "bg-amber-400",
    border: "border-amber-500/20",
    header: "text-amber-400 border-amber-500/30",
  },
};

// Estilos por defecto para equipos no mapeados explícitamente
export const DEFAULT_TEAM_META = {
  color: "text-slate-400",
  hex: "#94a3b8",
  activeChip: "border-slate-400 bg-slate-400/20 text-slate-300",
  inactiveChip: "border-border text-muted-foreground",
  dot: "bg-slate-400",
  border: "border-slate-500/20",
  header: "text-slate-400 border-slate-500/30",
};

// ─── KPI Mensual — Programa de Prerrequisitos 2026 (Mejora 2) ─────────────────
// Interfaz para definir la estructura de los datos mensuales de Key Performance Indicators
export interface KpiMes {
  mes: string;
  mesCorto: string; // Para gráficos y leyendas
  cumplimiento: number; // % cumplimiento general del programa
  auditoriasRealizadas: number;
  auditoriasPlaneadas: number;
  observacionesAbiertas: number;
  observacionesCerradas: number;
  accionesCorrectivas: number;
  accionesCerradas: number;
}

// Datos estadísticos estáticos (mock) para la visualización mensual
export const KPI_MENSUAL: KpiMes[] = [
  { mes: "Enero 2026",   mesCorto: "Ene", cumplimiento: 72, auditoriasRealizadas: 18, auditoriasPlaneadas: 22, observacionesAbiertas: 14, observacionesCerradas: 8,  accionesCorrectivas: 11, accionesCerradas: 6 },
  { mes: "Febrero 2026", mesCorto: "Feb", cumplimiento: 75, auditoriasRealizadas: 20, auditoriasPlaneadas: 22, observacionesAbiertas: 12, observacionesCerradas: 10, accionesCorrectivas: 9,  accionesCerradas: 7 },
  { mes: "Marzo 2026",   mesCorto: "Mar", cumplimiento: 78, auditoriasRealizadas: 21, auditoriasPlaneadas: 24, observacionesAbiertas: 10, observacionesCerradas: 13, accionesCorrectivas: 8,  accionesCerradas: 8 },
  { mes: "Abril 2026",   mesCorto: "Abr", cumplimiento: 82, auditoriasRealizadas: 23, auditoriasPlaneadas: 24, observacionesAbiertas: 9,  observacionesCerradas: 15, accionesCorrectivas: 7,  accionesCerradas: 9 },
  { mes: "Mayo 2026",    mesCorto: "May", cumplimiento: 85, auditoriasRealizadas: 24, auditoriasPlaneadas: 24, observacionesAbiertas: 7,  observacionesCerradas: 17, accionesCorrectivas: 6,  accionesCerradas: 10 },
  { mes: "Junio 2026",   mesCorto: "Jun", cumplimiento: 88, auditoriasRealizadas: 22, auditoriasPlaneadas: 24, observacionesAbiertas: 5,  observacionesCerradas: 18, accionesCorrectivas: 4,  accionesCerradas: 11 },
];
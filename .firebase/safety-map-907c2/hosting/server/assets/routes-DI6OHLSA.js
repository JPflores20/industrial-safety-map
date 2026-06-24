import { r as db, t as Route } from "./routes-JH-63Ccp.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { Activity, AlertCircle, AlertTriangle, ArrowDown, ArrowDownToLine, ArrowUp, ArrowUpDown, BarChart2, Building, Calendar, CalendarCheck, CalendarX, Check, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, Circle, ClipboardCheck, ClipboardList, Download, Factory, FileDown, FileText, Flame, FlaskConical, HardHat, ListChecks, Loader2, Map as Map$1, MapIcon, MinusCircle, Moon, Save, Search, Settings, Shield, ShieldAlert, SlidersHorizontal, Sparkles, Sun, TableIcon, Target, Thermometer, TrendingUp, Trophy, User, Users, Users2, X, XCircle, Zap } from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip$1 = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
//#endregion
//#region src/components/security-map/data.ts
var areas = [
	{
		id: "lobby-recepcion",
		nombre: "Lobby Recepción",
		responsable: "HUGO ALBERTO CARDONA ESPINOZA",
		equipo: "LOS PANCHITOS",
		riesgos: ["Caídas a desnivel"],
		estado: "al-dia",
		cumplimiento: 95,
		ultimaInspeccion: "2026-06-10",
		proximaInspeccion: "2026-07-10"
	},
	{
		id: "planta-baja-c-1-y-2",
		nombre: "Planta baja C 1 Y 2",
		responsable: "EDGAR ZAMARRON ACOSTA",
		equipo: "MASH-RAINBOW",
		riesgos: ["Superficies calientes", "Ruido"],
		estado: "al-dia",
		cumplimiento: 88,
		ultimaInspeccion: "2026-06-05",
		proximaInspeccion: "2026-07-05"
	},
	{
		id: "cuarto-de-bombas",
		nombre: "Cuarto de bombas",
		responsable: "JAIME LOPEZ CHAVEZ",
		equipo: "MASH-RAINBOW",
		riesgos: [
			"Riesgo Eléctrico",
			"Objetos a baja altura",
			"Corriente estática"
		],
		estado: "al-dia",
		cumplimiento: 92,
		ultimaInspeccion: "2026-06-01",
		proximaInspeccion: "2026-07-01"
	},
	{
		id: "planta-baja-c-3-y-4",
		nombre: "Planta baja C 3 Y 4",
		responsable: "RIGOBERTO MOTA CORTES",
		equipo: "MASH-RAINBOW",
		riesgos: ["Atrapamiento", "Superficies calientes"],
		estado: "pendiente",
		cumplimiento: 71,
		ultimaInspeccion: "2026-05-15",
		proximaInspeccion: "2026-06-15"
	},
	{
		id: "area-de-atemperamiento",
		nombre: "Area de atemperamiento",
		responsable: "J GUADALUPE GUZMAN MUÑOZ",
		equipo: "MASH-RAINBOW",
		riesgos: ["Temperatura baja"],
		estado: "al-dia",
		cumplimiento: 100,
		ultimaInspeccion: "2026-06-18",
		proximaInspeccion: "2026-07-18"
	},
	{
		id: "subestacion-electrica-1",
		nombre: "Subestacion Electrica 1",
		responsable: "JUAN ANTONIO RIVERA NAJAR",
		equipo: "NAHUALES",
		riesgos: ["Riesgo Eléctrico Alta Tensión", "Arco eléctrico"],
		estado: "al-dia",
		cumplimiento: 98,
		ultimaInspeccion: "2026-06-20",
		proximaInspeccion: "2026-07-20"
	},
	{
		id: "tableros-electricos-cuarto-de-bombas",
		nombre: "Tableros electricos cuarto de bombas",
		responsable: "JUAN ANTONIO RIVERA NAJAR",
		equipo: "NAHUALES",
		riesgos: ["Riesgo Eléctrico"],
		estado: "al-dia",
		cumplimiento: 96,
		ultimaInspeccion: "2026-06-20",
		proximaInspeccion: "2026-07-20"
	},
	{
		id: "seccion-cocedor-macerador",
		nombre: "Sección Cocedor-Macerador",
		responsable: "OMAR ALBERTO ROBLES SOSA",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Espacios confinados", "Temperaturas Altas"],
		estado: "pendiente",
		cumplimiento: 67,
		ultimaInspeccion: "2026-05-20",
		proximaInspeccion: "2026-06-20"
	},
	{
		id: "seccion-olla-rotapool",
		nombre: "Sección Olla-Rotapool",
		responsable: "URIEL ESCOBEDO MURO",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Superficies calientes", "Atrapamiento"],
		estado: "al-dia",
		cumplimiento: 85,
		ultimaInspeccion: "2026-06-08",
		proximaInspeccion: "2026-07-08"
	},
	{
		id: "subestacion-electrica-2",
		nombre: "Subestacion Electrica 2",
		responsable: "JUAN ANTONIO RIVERA NAJAR",
		equipo: "NAHUALES",
		riesgos: ["Riesgo Eléctrico Alta Tensión"],
		estado: "al-dia",
		cumplimiento: 97,
		ultimaInspeccion: "2026-06-20",
		proximaInspeccion: "2026-07-20"
	},
	{
		id: "bodega-de-lupulo-1",
		nombre: "Bodega de lupulo 1",
		responsable: "JOSÉ LUIS MALDONADO",
		equipo: "CUCHILLAS",
		riesgos: ["Transito de montacargas", "Temperatura baja"],
		estado: "vencido",
		cumplimiento: 48,
		ultimaInspeccion: "2026-03-10",
		proximaInspeccion: "2026-04-10"
	},
	{
		id: "bodega-de-lupulo-2-y-cuarto-de-atempermiento",
		nombre: "Bodega de lupulo 2 y Cuarto de atempermiento",
		responsable: "ADRIAN HERNANDEZ DE AVILA",
		equipo: "CUCHILLAS",
		riesgos: ["Temperatura baja"],
		estado: "al-dia",
		cumplimiento: 90,
		ultimaInspeccion: "2026-06-12",
		proximaInspeccion: "2026-07-12"
	},
	{
		id: "taller-de-molinos",
		nombre: "Taller de Molinos",
		responsable: "JOSE MARIA LUJAN SORIANO",
		equipo: "NAHUALES",
		riesgos: ["Ruido", "Riesgo de explosión (Polvos)"],
		estado: "pendiente",
		cumplimiento: 74,
		ultimaInspeccion: "2026-05-28",
		proximaInspeccion: "2026-06-28"
	},
	{
		id: "cto-electrico-plcs",
		nombre: "Cto electrico PLCs",
		responsable: "JUAN ANTONIO RIVERA NAJAR",
		equipo: "NAHUALES",
		riesgos: ["Riesgo Eléctrico"],
		estado: "al-dia",
		cumplimiento: 94,
		ultimaInspeccion: "2026-06-19",
		proximaInspeccion: "2026-07-19"
	},
	{
		id: "comedores",
		nombre: "Comedores",
		responsable: "ERIKA IVONE IBARRA NAVA",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Caídas a desnivel"],
		estado: "al-dia",
		cumplimiento: 100,
		ultimaInspeccion: "2026-06-22",
		proximaInspeccion: "2026-07-22"
	},
	{
		id: "vestidores-banos-hombres",
		nombre: "Vestidores/Baños (Hombres)",
		responsable: "JUAN ANTONIO VALDEZ LICERIO",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Caídas a desnivel"],
		estado: "al-dia",
		cumplimiento: 100,
		ultimaInspeccion: "2026-06-22",
		proximaInspeccion: "2026-07-22"
	},
	{
		id: "caseta-de-quimicos",
		nombre: "Caseta de quimicos",
		responsable: "JOSE MANUEL VARELA ROSALES",
		equipo: "LOS PANCHITOS",
		riesgos: ["Sustancias químicas corrosivas"],
		estado: "al-dia",
		cumplimiento: 93,
		ultimaInspeccion: "2026-06-14",
		proximaInspeccion: "2026-07-14"
	},
	{
		id: "area-recibo-de-quimicos",
		nombre: "Area Recibo de quimicos",
		responsable: "HECTOR HUGO VALDEZ PIÑA",
		equipo: "LOS PANCHITOS",
		riesgos: ["Sustancias químicas corrosivas", "Transito de camiones"],
		estado: "pendiente",
		cumplimiento: 68,
		ultimaInspeccion: "2026-05-22",
		proximaInspeccion: "2026-06-22"
	},
	{
		id: "area-recibo-de-dextrosa",
		nombre: "Area Recibo de dextrosa y tanque de almacenamiento",
		responsable: "EDGAR EMANUEL JUAREZ ALBA",
		equipo: "LOS PANCHITOS",
		riesgos: ["Transito de camiones"],
		estado: "al-dia",
		cumplimiento: 87,
		ultimaInspeccion: "2026-06-11",
		proximaInspeccion: "2026-07-11"
	},
	{
		id: "cuarto-de-control-y-vitral",
		nombre: "Cuarto de control y Vitral",
		responsable: "CARLOS RIVERA REYES",
		equipo: "MASH-RAINBOW",
		riesgos: ["Caídas a desnivel"],
		estado: "al-dia",
		cumplimiento: 91,
		ultimaInspeccion: "2026-06-09",
		proximaInspeccion: "2026-07-09"
	},
	{
		id: "quas-team-room",
		nombre: "QUAs/Team room",
		responsable: "J MANUEL RAYGOZA JUAREZ",
		equipo: "MASH-RAINBOW",
		riesgos: ["Riesgo a definir"],
		estado: "pendiente",
		cumplimiento: 55,
		ultimaInspeccion: "2026-04-30",
		proximaInspeccion: "2026-05-30"
	},
	{
		id: "azotea-chiller",
		nombre: "Azotea de acceso chiller de glicol, Azotea de oficinas",
		responsable: "ALBERTO NUÑEZ VELEZ",
		equipo: "MASH-RAINBOW",
		riesgos: ["Trabajo en alturas"],
		estado: "al-dia",
		cumplimiento: 89,
		ultimaInspeccion: "2026-06-16",
		proximaInspeccion: "2026-07-16"
	},
	{
		id: "cuarto-de-valvulas",
		nombre: "Cuarto de Valvulas",
		responsable: "EDUARDO NERI DE LUNA",
		equipo: "NAHUALES",
		riesgos: ["Atrapamiento"],
		estado: "al-dia",
		cumplimiento: 82,
		ultimaInspeccion: "2026-06-03",
		proximaInspeccion: "2026-07-03"
	},
	{
		id: "oficinas-de-mtto",
		nombre: "Oficinas de mtto",
		responsable: "SERGIO TRUJILLO",
		equipo: "NAHUALES",
		riesgos: ["Riesgo a definir"],
		estado: "pendiente",
		cumplimiento: 60,
		ultimaInspeccion: "2026-05-10",
		proximaInspeccion: "2026-06-10"
	},
	{
		id: "bodega-de-mat-aux",
		nombre: "Bodega de mat aux",
		responsable: "EDUARDO VALLE ARIAS",
		equipo: "MOSTO-BOYS",
		riesgos: ["Transito de montacargas"],
		estado: "vencido",
		cumplimiento: 42,
		ultimaInspeccion: "2026-02-20",
		proximaInspeccion: "2026-03-20"
	},
	{
		id: "nivel-tolvas-molido",
		nombre: "Nivel tolvas molido",
		responsable: "J JESUS RIVERA MEDINA",
		equipo: "MOSTO-BOYS",
		riesgos: ["Riesgo de explosión (Polvos)"],
		estado: "al-dia",
		cumplimiento: 86,
		ultimaInspeccion: "2026-06-07",
		proximaInspeccion: "2026-07-07"
	},
	{
		id: "azotea-coc-y-acidulacion",
		nombre: "Azotea coc y Area de acidulación",
		responsable: "JOSE LUIS CAZARES PINALES",
		equipo: "MOSTO-BOYS",
		riesgos: ["Trabajo en alturas"],
		estado: "al-dia",
		cumplimiento: 91,
		ultimaInspeccion: "2026-06-13",
		proximaInspeccion: "2026-07-13"
	},
	{
		id: "nivel-molinos",
		nombre: "Nivel molinos",
		responsable: "ALDO ADRIAN SIFUENTES VELOZ",
		equipo: "MOSTO-BOYS",
		riesgos: ["Atrapamiento", "Ruido"],
		estado: "pendiente",
		cumplimiento: 73,
		ultimaInspeccion: "2026-05-25",
		proximaInspeccion: "2026-06-25"
	},
	{
		id: "nivel-soplantes",
		nombre: "Nivel soplantes y Azotea Soplantes",
		responsable: "JOSE CARLOS CARDONA LOERA",
		equipo: "MOSTO-BOYS",
		riesgos: ["Ruido", "Trabajo en alturas"],
		estado: "al-dia",
		cumplimiento: 84,
		ultimaInspeccion: "2026-06-06",
		proximaInspeccion: "2026-07-06"
	},
	{
		id: "sotano-silos",
		nombre: "Sotano silos",
		responsable: "MARIO ALBERTO ZAMARRIPA LLANAS",
		equipo: "CUCHILLAS",
		riesgos: ["Espacios confinados"],
		estado: "vencido",
		cumplimiento: 38,
		ultimaInspeccion: "2026-01-15",
		proximaInspeccion: "2026-02-15"
	},
	{
		id: "linternilla-1-y-2",
		nombre: "Linternilla 1 Y 2",
		responsable: "CONCEPCIÓN REYES MONTERO",
		equipo: "CUCHILLAS",
		riesgos: ["Trabajo en alturas"],
		estado: "al-dia",
		cumplimiento: 88,
		ultimaInspeccion: "2026-06-17",
		proximaInspeccion: "2026-07-17"
	},
	{
		id: "cuarto-de-filtros",
		nombre: "Cuarto de filtros",
		responsable: "VALERIA NATALY CASTAÑON RAMIREZ",
		equipo: "CUCHILLAS",
		riesgos: ["Riesgo de explosión (Polvos)"],
		estado: "al-dia",
		cumplimiento: 79,
		ultimaInspeccion: "2026-06-04",
		proximaInspeccion: "2026-07-04"
	},
	{
		id: "tolvas-de-recibo-de-grano",
		nombre: "Tolvas de Recibo de grano",
		responsable: "ABEL GUILLERMO MAZATAN PAREDES",
		equipo: "CUCHILLAS",
		riesgos: ["Caídas a desnivel"],
		estado: "pendiente",
		cumplimiento: 65,
		ultimaInspeccion: "2026-05-18",
		proximaInspeccion: "2026-06-18"
	},
	{
		id: "sub-estacion-electrica-silos",
		nombre: "Sub estacion electrica silos",
		responsable: "ARTURO RODARTE",
		equipo: "NAHUALES",
		riesgos: ["Riesgo Eléctrico Alta Tensión"],
		estado: "al-dia",
		cumplimiento: 95,
		ultimaInspeccion: "2026-06-21",
		proximaInspeccion: "2026-07-21"
	},
	{
		id: "tolvas-generales-de-bagazo",
		nombre: "Tolvas generales de bagazo",
		responsable: "MANUEL DE JESUS DEL REAL ESQUIVEL",
		equipo: "CUCHILLAS",
		riesgos: ["Espacios confinados"],
		estado: "vencido",
		cumplimiento: 45,
		ultimaInspeccion: "2026-02-28",
		proximaInspeccion: "2026-03-28"
	},
	{
		id: "cuarto-de-carga-montacargas",
		nombre: "Cuarto de Carga - Montacargas",
		responsable: "JOSE AMADOR RODRIGUEZ JUAREZ",
		equipo: "MOSTO-BOYS",
		riesgos: ["Transito de montacargas", "Riesgo Eléctrico"],
		estado: "al-dia",
		cumplimiento: 83,
		ultimaInspeccion: "2026-06-02",
		proximaInspeccion: "2026-07-02"
	},
	{
		id: "andenes-area-descarga",
		nombre: "Andenes (Norte, Poniente) y Area de desacarga",
		responsable: "MANUEL DE JESUS CHAVEZ GARCIA",
		equipo: "MOSTO-BOYS",
		riesgos: ["Transito de camiones", "Transito de montacargas"],
		estado: "pendiente",
		cumplimiento: 70,
		ultimaInspeccion: "2026-05-30",
		proximaInspeccion: "2026-06-30"
	},
	{
		id: "area-bajo-mezzanine",
		nombre: "Área Bajo Mezzanine",
		responsable: "J MARIO TRUJILLO MEZA",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Objetos a baja altura"],
		estado: "al-dia",
		cumplimiento: 80,
		ultimaInspeccion: "2026-06-10",
		proximaInspeccion: "2026-07-10"
	},
	{
		id: "seccion-a-y-b",
		nombre: "Sección A y B",
		responsable: "JUAN RAMON JIMENEZ DELGADO",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Riesgo a definir"],
		estado: "pendiente",
		cumplimiento: 58,
		ultimaInspeccion: "2026-05-05",
		proximaInspeccion: "2026-06-05"
	},
	{
		id: "mezanine-disolucion",
		nombre: "Mezanine Disolución (TQ 1 Y TQ 2)",
		responsable: "MARCO AURELIO CUAUCOATL RAMIREZ",
		equipo: "LOS CAZADORES DEL AMARGOR",
		riesgos: ["Caídas a desnivel"],
		estado: "al-dia",
		cumplimiento: 92,
		ultimaInspeccion: "2026-06-15",
		proximaInspeccion: "2026-07-15"
	},
	{
		id: "oficina-bodega-de-grits",
		nombre: "Oficina Bodega de Grits",
		responsable: "LEOBARDO VARELA NIETO",
		equipo: "LOS PANCHITOS",
		riesgos: ["Riesgo a definir"],
		estado: "pendiente",
		cumplimiento: 52,
		ultimaInspeccion: "2026-04-25",
		proximaInspeccion: "2026-05-25"
	},
	{
		id: "eto-bodega-de-grits",
		nombre: "ETO Bodega de Grits",
		responsable: "SANTIAGO HERRERA AMADOR",
		equipo: "LOS PANCHITOS",
		riesgos: ["Riesgo de explosión (Polvos)"],
		estado: "al-dia",
		cumplimiento: 77,
		ultimaInspeccion: "2026-06-06",
		proximaInspeccion: "2026-07-06"
	},
	{
		id: "cto-electrico",
		nombre: "Cto electrico",
		responsable: "ARTURO RODARTE",
		equipo: "NAHUALES",
		riesgos: ["Riesgo Eléctrico"],
		estado: "al-dia",
		cumplimiento: 93,
		ultimaInspeccion: "2026-06-19",
		proximaInspeccion: "2026-07-19"
	},
	{
		id: "bancos-de-trabajo",
		nombre: "Bancos de Trabajo",
		responsable: "VICTOR SIMENTAL",
		equipo: "NAHUALES",
		riesgos: ["Riesgo a definir"],
		estado: "vencido",
		cumplimiento: 40,
		ultimaInspeccion: "2026-02-10",
		proximaInspeccion: "2026-03-10"
	},
	{
		id: "area-de-motores",
		nombre: "Area de Motores",
		responsable: "ARTURO VELAZQUEZ",
		equipo: "NAHUALES",
		riesgos: ["Ruido", "Atrapamiento"],
		estado: "al-dia",
		cumplimiento: 86,
		ultimaInspeccion: "2026-06-08",
		proximaInspeccion: "2026-07-08"
	},
	{
		id: "area-de-valvulas",
		nombre: "Area de Valvulas",
		responsable: "VITOR MENDOZA",
		equipo: "NAHUALES",
		riesgos: ["Atrapamiento"],
		estado: "al-dia",
		cumplimiento: 81,
		ultimaInspeccion: "2026-06-03",
		proximaInspeccion: "2026-07-03"
	},
	{
		id: "area-de-soldadura",
		nombre: "Area de Soldadura",
		responsable: "FLAVIO CESAR DIAZ MALDONADO",
		equipo: "NAHUALES",
		riesgos: ["Radiaciones no ionizantes", "Incendio"],
		estado: "al-dia",
		cumplimiento: 88,
		ultimaInspeccion: "2026-06-11",
		proximaInspeccion: "2026-07-11"
	}
];
var ESTADO_META = {
	"al-dia": {
		label: "Al día",
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
		border: "border-emerald-500/40",
		dot: "bg-emerald-400",
		chipActive: "border-emerald-400 bg-emerald-400/20 text-emerald-300",
		chipInactive: "border-border text-muted-foreground hover:border-emerald-400/50"
	},
	"pendiente": {
		label: "Pendiente",
		color: "text-amber-400",
		bg: "bg-amber-500/10",
		border: "border-amber-500/40",
		dot: "bg-amber-400",
		chipActive: "border-amber-400 bg-amber-400/20 text-amber-300",
		chipInactive: "border-border text-muted-foreground hover:border-amber-400/50"
	},
	"vencido": {
		label: "Vencido",
		color: "text-red-400",
		bg: "bg-red-500/10",
		border: "border-red-500/40",
		dot: "bg-red-400",
		chipActive: "border-red-400 bg-red-400/20 text-red-300",
		chipInactive: "border-border text-muted-foreground hover:border-red-400/50"
	}
};
function classifyRisk(risk) {
	const r = risk.toLowerCase();
	if (/eléctric|electric|incendio|arco|alta tensión|tensión/.test(r)) return "danger";
	if (/explosión|explosion/.test(r)) return "danger";
	if (/caída|caida|atrapamiento|montacargas|confinad|obstácul|obstacul|baja altura|alturas|desnivel|corrosiv|radiac/.test(r)) return "alert";
	return "warning";
}
function getMaxRiskLevel(riesgos) {
	if (riesgos.some((r) => classifyRisk(r) === "danger")) return "danger";
	if (riesgos.some((r) => classifyRisk(r) === "alert")) return "alert";
	return "warning";
}
var RISK_CATEGORIES = [
	{
		id: "electrico",
		label: "Eléctrico",
		color: "text-yellow-400",
		hex: "#facc15"
	},
	{
		id: "fuego",
		label: "Fuego / Calor",
		color: "text-red-400",
		hex: "#f87171"
	},
	{
		id: "alturas",
		label: "Alturas / Caídas",
		color: "text-sky-400",
		hex: "#38bdf8"
	},
	{
		id: "atrapamiento",
		label: "Atrapamiento",
		color: "text-orange-400",
		hex: "#fb923c"
	},
	{
		id: "otro",
		label: "Otro",
		color: "text-slate-400",
		hex: "#94a3b8"
	}
];
function getRiskCategory(risk) {
	const r = risk.toLowerCase();
	if (/eléctric|electric|tensión|arco/.test(r)) return "electrico";
	if (/explosión|explosion|incendio|caliente|temperatura/.test(r)) return "fuego";
	if (/caída|caida|alturas|desnivel/.test(r)) return "alturas";
	if (/atrapamiento|confinad|corrosiv|radiac/.test(r)) return "atrapamiento";
	return "otro";
}
var TEAM_META = {
	"MASH-RAINBOW": {
		color: "text-cyan-400",
		hex: "#22d3ee",
		activeChip: "border-cyan-400 bg-cyan-400/20 text-cyan-300",
		inactiveChip: "border-border text-muted-foreground hover:border-cyan-400/50",
		dot: "bg-cyan-400",
		border: "border-cyan-500/20",
		header: "text-cyan-400 border-cyan-500/30"
	},
	"NAHUALES": {
		color: "text-violet-400",
		hex: "#a78bfa",
		activeChip: "border-violet-400 bg-violet-400/20 text-violet-300",
		inactiveChip: "border-border text-muted-foreground hover:border-violet-400/50",
		dot: "bg-violet-400",
		border: "border-violet-500/20",
		header: "text-violet-400 border-violet-500/30"
	},
	"LOS CAZADORES DEL AMARGOR": {
		color: "text-orange-400",
		hex: "#fb923c",
		activeChip: "border-orange-400 bg-orange-400/20 text-orange-300",
		inactiveChip: "border-border text-muted-foreground hover:border-orange-400/50",
		dot: "bg-orange-400",
		border: "border-orange-500/20",
		header: "text-orange-400 border-orange-500/30"
	},
	"CUCHILLAS": {
		color: "text-rose-400",
		hex: "#fb7185",
		activeChip: "border-rose-400 bg-rose-400/20 text-rose-300",
		inactiveChip: "border-border text-muted-foreground hover:border-rose-400/50",
		dot: "bg-rose-400",
		border: "border-rose-500/20",
		header: "text-rose-400 border-rose-500/30"
	},
	"MOSTO-BOYS": {
		color: "text-emerald-400",
		hex: "#34d399",
		activeChip: "border-emerald-400 bg-emerald-400/20 text-emerald-300",
		inactiveChip: "border-border text-muted-foreground hover:border-emerald-400/50",
		dot: "bg-emerald-400",
		border: "border-emerald-500/20",
		header: "text-emerald-400 border-emerald-500/30"
	},
	"LOS PANCHITOS": {
		color: "text-amber-400",
		hex: "#fbbf24",
		activeChip: "border-amber-400 bg-amber-400/20 text-amber-300",
		inactiveChip: "border-border text-muted-foreground hover:border-amber-400/50",
		dot: "bg-amber-400",
		border: "border-amber-500/20",
		header: "text-amber-400 border-amber-500/30"
	}
};
var DEFAULT_TEAM_META = {
	color: "text-slate-400",
	hex: "#94a3b8",
	activeChip: "border-slate-400 bg-slate-400/20 text-slate-300",
	inactiveChip: "border-border text-muted-foreground",
	dot: "bg-slate-400",
	border: "border-slate-500/20",
	header: "text-slate-400 border-slate-500/30"
};
var KPI_MENSUAL = [
	{
		mes: "Enero 2026",
		mesCorto: "Ene",
		cumplimiento: 72,
		auditoriasRealizadas: 18,
		auditoriasPlaneadas: 22,
		observacionesAbiertas: 14,
		observacionesCerradas: 8,
		accionesCorrectivas: 11,
		accionesCerradas: 6
	},
	{
		mes: "Febrero 2026",
		mesCorto: "Feb",
		cumplimiento: 75,
		auditoriasRealizadas: 20,
		auditoriasPlaneadas: 22,
		observacionesAbiertas: 12,
		observacionesCerradas: 10,
		accionesCorrectivas: 9,
		accionesCerradas: 7
	},
	{
		mes: "Marzo 2026",
		mesCorto: "Mar",
		cumplimiento: 78,
		auditoriasRealizadas: 21,
		auditoriasPlaneadas: 24,
		observacionesAbiertas: 10,
		observacionesCerradas: 13,
		accionesCorrectivas: 8,
		accionesCerradas: 8
	},
	{
		mes: "Abril 2026",
		mesCorto: "Abr",
		cumplimiento: 82,
		auditoriasRealizadas: 23,
		auditoriasPlaneadas: 24,
		observacionesAbiertas: 9,
		observacionesCerradas: 15,
		accionesCorrectivas: 7,
		accionesCerradas: 9
	},
	{
		mes: "Mayo 2026",
		mesCorto: "May",
		cumplimiento: 85,
		auditoriasRealizadas: 24,
		auditoriasPlaneadas: 24,
		observacionesAbiertas: 7,
		observacionesCerradas: 17,
		accionesCorrectivas: 6,
		accionesCerradas: 10
	},
	{
		mes: "Junio 2026",
		mesCorto: "Jun",
		cumplimiento: 88,
		auditoriasRealizadas: 22,
		auditoriasPlaneadas: 24,
		observacionesAbiertas: 5,
		observacionesCerradas: 18,
		accionesCorrectivas: 4,
		accionesCerradas: 11
	}
];
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/security-map/TeamLogo.tsx
var logosList = Object.entries(/* @__PURE__ */ Object.assign({})).map(([path, url]) => {
	const fileName = path.split("/").pop()?.replace(/\.(png|jpeg|jpg)$/, "") || "";
	return {
		fileName,
		normalized: fileName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
		url
	};
});
function getTeamLogoUrl(teamName) {
	const normalizedName = teamName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	for (const logo of logosList) {
		if (normalizedName === logo.normalized) return logo.url;
		if (logo.normalized.includes(normalizedName)) return logo.url;
		if (normalizedName.includes(logo.normalized)) return logo.url;
	}
	return null;
}
function TeamLogo({ team, className = "h-8 w-8" }) {
	const url = useMemo(() => getTeamLogoUrl(team), [team]);
	team.substring(0, 2).toUpperCase();
	if (!url) return /* @__PURE__ */ jsx("div", {
		className: `flex shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold ${className}`,
		children: /* @__PURE__ */ jsx("span", {
			className: "text-[10px]",
			children: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" })
		})
	});
	return /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: `shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${className}`,
			children: /* @__PURE__ */ jsx("img", {
				src: url,
				alt: `Logo de ${team}`,
				className: "h-full w-full rounded-lg object-contain bg-white/5 border border-border/50 p-0.5 cursor-zoom-in transition-transform hover:scale-105",
				onError: (e) => {
					e.currentTarget.style.display = "none";
					e.currentTarget.parentElement?.classList.add("fallback-logo");
				}
			})
		})
	}), /* @__PURE__ */ jsxs(DialogContent, {
		className: "max-w-md bg-transparent border-none shadow-none p-0 flex flex-col justify-center items-center gap-4",
		children: [
			/* @__PURE__ */ jsxs(DialogTitle, {
				className: "sr-only",
				children: ["Logo de ", team]
			}),
			/* @__PURE__ */ jsx("img", {
				src: url,
				alt: `Logo de ${team}`,
				className: "max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border text-center shadow-lg animate-in fade-in slide-in-from-bottom-4",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-lg font-bold text-cyan-400",
					children: team
				})
			})
		]
	})] });
}
//#endregion
//#region src/components/security-map/PlantMap.tsx
function RiskIcon$1({ risk }) {
	const r = risk.toLowerCase();
	if (/eléctric|electric|tensión|arco/.test(r)) return /* @__PURE__ */ jsx(Zap, { className: "h-3 w-3 text-yellow-400" });
	if (/explosión|explosion|incendio/.test(r)) return /* @__PURE__ */ jsx(Flame, { className: "h-3 w-3 text-red-400" });
	if (/caliente|temperatura alta/.test(r)) return /* @__PURE__ */ jsx(Thermometer, { className: "h-3 w-3 text-red-400" });
	if (/temperatura baja/.test(r)) return /* @__PURE__ */ jsx(Thermometer, { className: "h-3 w-3 text-blue-400" });
	if (/caída|caida|alturas|desnivel/.test(r)) return /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-3 w-3 text-sky-400" });
	if (/atrapamiento|confinad|corrosiv|radiac/.test(r)) return /* @__PURE__ */ jsx(ShieldAlert, { className: "h-3 w-3 text-orange-400" });
	return /* @__PURE__ */ jsx(AlertTriangle, { className: "h-3 w-3 text-slate-400" });
}
var LEVEL_META = {
	danger: {
		ring: "border-red-500/40 bg-red-500/10",
		dot: "bg-red-400",
		label: "Peligro"
	},
	alert: {
		ring: "border-orange-500/40 bg-orange-500/10",
		dot: "bg-orange-400",
		label: "Alerta"
	},
	warning: {
		ring: "border-amber-500/40 bg-amber-500/10",
		dot: "bg-amber-400",
		label: "Precaución"
	}
};
function MiniComplianceBar({ value, estado }) {
	return /* @__PURE__ */ jsx("div", {
		className: "h-0.5 w-full overflow-hidden rounded-full bg-border/30",
		children: /* @__PURE__ */ jsx("div", {
			className: `h-full rounded-full ${estado === "vencido" ? "bg-red-400" : estado === "pendiente" ? "bg-amber-400" : "bg-emerald-400"}`,
			style: { width: `${value}%` }
		})
	});
}
function PlantMap({ areas, selectedId, onSelect }) {
	const grouped = /* @__PURE__ */ new Map();
	for (const area of areas) {
		if (!grouped.has(area.equipo)) grouped.set(area.equipo, []);
		grouped.get(area.equipo).push(area);
	}
	let cardIndex = 0;
	if (grouped.size === 0) return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface-plant py-20 text-muted-foreground",
		children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-10 w-10 opacity-20" }), /* @__PURE__ */ jsx("p", {
			className: "text-sm",
			children: "No hay áreas con los filtros actuales."
		})]
	});
	return /* @__PURE__ */ jsx(TooltipProvider, {
		delayDuration: 250,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-5",
			children: [...grouped.entries()].map(([equipo, teamAreas]) => {
				const meta = TEAM_META[equipo] ?? DEFAULT_TEAM_META;
				return /* @__PURE__ */ jsxs("section", {
					"aria-label": `Equipo ${equipo}`,
					children: [/* @__PURE__ */ jsxs("div", {
						className: `mb-3 flex items-center gap-2.5 rounded-lg border px-3 py-2 ${meta.border} bg-surface-plant`,
						children: [
							/* @__PURE__ */ jsx(TeamLogo, {
								team: equipo,
								className: "h-5 w-5"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: `text-xs font-bold uppercase tracking-widest ${meta.color}`,
								children: equipo
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: [
									teamAreas.length,
									" área",
									teamAreas.length !== 1 ? "s" : ""
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: teamAreas.map((area) => {
							const delay = cardIndex++ * 40;
							const isSelected = selectedId === area.id;
							const levelMeta = LEVEL_META[getMaxRiskLevel(area.riesgos)];
							const estadoMeta = ESTADO_META[area.estado];
							return /* @__PURE__ */ jsxs("button", {
								id: `area-card-${area.id}`,
								type: "button",
								"aria-pressed": isSelected,
								onClick: () => onSelect(area.id),
								style: { animationDelay: `${delay}ms` },
								className: `area-card-enter group relative flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isSelected ? "border-amber-400 bg-amber-400/10 shadow-[0_0_22px_-4px_rgba(251,191,36,0.55)]" : "border-border bg-surface-zone hover:border-foreground/25 hover:shadow-md"}`,
								children: [
									/* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ jsx("span", {
											className: `absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border ${levelMeta.ring}`,
											children: /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${levelMeta.dot}` })
										})
									}), /* @__PURE__ */ jsx(TooltipContent, {
										side: "left",
										className: "text-xs",
										children: levelMeta.label
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isSelected ? "bg-amber-400/20 text-amber-400" : "bg-background/40 text-muted-foreground"}`,
											children: /* @__PURE__ */ jsx(Factory, { className: "h-4 w-4" })
										}), /* @__PURE__ */ jsxs("span", {
											className: `rounded-full border px-1.5 py-0.5 text-[10px] font-bold leading-tight ${isSelected ? "border-amber-400/60 bg-amber-400/10 text-amber-300" : "border-border bg-background/30 text-muted-foreground"}`,
											children: [area.riesgos.length, "R"]
										})]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: `line-clamp-2 pr-5 text-xs font-semibold leading-snug ${isSelected ? "text-amber-100" : "text-foreground"}`,
										children: area.nombre
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap gap-1",
										children: [area.riesgos.slice(0, 3).map((r) => /* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
											asChild: true,
											children: /* @__PURE__ */ jsx("span", {
												className: `flex items-center justify-center rounded-md p-1 transition-colors ${isSelected ? "bg-amber-400/10 text-amber-300" : "bg-background/30 text-muted-foreground"}`,
												children: /* @__PURE__ */ jsx(RiskIcon$1, { risk: r })
											})
										}), /* @__PURE__ */ jsx(TooltipContent, {
											className: "text-xs",
											children: r
										})] }, r)), area.riesgos.length > 3 && /* @__PURE__ */ jsxs("span", {
											className: "rounded-md bg-background/20 px-1 py-0.5 text-[9px] text-muted-foreground",
											children: ["+", area.riesgos.length - 3]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
												asChild: true,
												children: /* @__PURE__ */ jsxs("span", {
													className: `flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${estadoMeta.border} ${estadoMeta.bg} ${estadoMeta.color}`,
													children: [/* @__PURE__ */ jsx("span", { className: `h-1 w-1 rounded-full ${estadoMeta.dot}` }), estadoMeta.label]
												})
											}), /* @__PURE__ */ jsxs(TooltipContent, {
												side: "bottom",
												className: "text-xs",
												children: ["Última insp.: ", area.ultimaInspeccion]
											})] }), /* @__PURE__ */ jsxs("span", {
												className: "text-[9px] text-muted-foreground",
												children: [area.cumplimiento, "%"]
											})]
										}), /* @__PURE__ */ jsx(MiniComplianceBar, {
											value: area.cumplimiento,
											estado: area.estado
										})]
									}),
									isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-0.5 rounded-b-xl bg-gradient-to-r from-amber-500 to-yellow-400" })
								]
							}, area.id);
						})
					})]
				}, equipo);
			})
		})
	});
}
//#endregion
//#region src/components/security-map/riskControls.ts
var RISK_CONTROLS = [
	{
		match: /alta tensión|alto voltaje/,
		control: {
			epp: [
				{
					icono: "🧤",
					label: "Guantes dieléctricos clase 2"
				},
				{
					icono: "👓",
					label: "Careta anti-arco"
				},
				{
					icono: "🦺",
					label: "Ropa ignífuga"
				},
				{
					icono: "🥾",
					label: "Botas dieléctricas"
				}
			],
			medidas: [
				"Aplicar procedimiento LOTO (Lockout/Tagout)",
				"Solo personal certificado en alta tensión",
				"Verificar ausencia de voltaje con detector homologado",
				"Mantener distancias de seguridad reglamentarias",
				"Prohibido trabajar solo — acompañante obligatorio"
			],
			norma: "NOM-029-STPS / NFPA 70E",
			permiso: "Permiso de trabajo eléctrico de alta tensión"
		}
	},
	{
		match: /eléctric|electric|arco eléctrico|corriente estática/,
		control: {
			epp: [
				{
					icono: "🧤",
					label: "Guantes dieléctricos"
				},
				{
					icono: "👓",
					label: "Lentes de seguridad"
				},
				{
					icono: "🦺",
					label: "Ropa de algodón (antiestática)"
				},
				{
					icono: "🥾",
					label: "Botas dieléctricas"
				}
			],
			medidas: [
				"Aplicar procedimiento LOTO antes de intervenir",
				"Verificar ausencia de tensión con multímetro",
				"No trabajar con manos húmedas",
				"Uso de herramientas aisladas",
				"Conectar a tierra equipos antes de manipular"
			],
			norma: "NOM-029-STPS",
			permiso: "Permiso de trabajo eléctrico"
		}
	},
	{
		match: /explosión|explosion|polvos/,
		control: {
			epp: [
				{
					icono: "😷",
					label: "Respirador para polvos P100"
				},
				{
					icono: "👓",
					label: "Lentes herméticos"
				},
				{
					icono: "🦺",
					label: "Ropa antiestática"
				},
				{
					icono: "🧤",
					label: "Guantes de nitrilo"
				}
			],
			medidas: [
				"Mantener concentración de polvo < 50 mg/m³",
				"Ventilación mecánica continua del área",
				"Eliminar fuentes de ignición (no celulares, no llamas)",
				"Revisión periódica de acumulación de polvo en superficies",
				"Sistema de supresión de explosión activo y verificado",
				"Prohibido fumar en un radio de 25 m"
			],
			norma: "NOM-005-STPS / NFPA 652",
			permiso: "Permiso de trabajo en zona ATEX"
		}
	},
	{
		match: /incendio/,
		control: {
			epp: [
				{
					icono: "🧯",
					label: "Extintor portátil a la mano"
				},
				{
					icono: "🦺",
					label: "Ropa ignífuga"
				},
				{
					icono: "🧤",
					label: "Guantes de cuero"
				},
				{
					icono: "👓",
					label: "Careta de soldador"
				}
			],
			medidas: [
				"Verificar extintor cargado antes de iniciar trabajo",
				"Remover materiales combustibles en radio de 3 m",
				"Colocar manta ignífuga alrededor del punto de trabajo",
				"Vigilante de fuego durante la operación y 30 min después",
				"Conocer ubicación de salidas de emergencia"
			],
			norma: "NOM-002-STPS",
			permiso: "Permiso de trabajo en caliente"
		}
	},
	{
		match: /caliente|temperatura alta|superficies calientes/,
		control: {
			epp: [
				{
					icono: "🧤",
					label: "Guantes térmicos resistentes al calor"
				},
				{
					icono: "🦺",
					label: "Mandil de cuero"
				},
				{
					icono: "👓",
					label: "Lentes de seguridad"
				}
			],
			medidas: [
				"Verificar temperatura de superficie antes de contacto",
				"No tocar superficies sin señalización de temperatura",
				"Hidratación frecuente — cada 20 minutos en zonas >35°C",
				"Rotación de personal en exposición prolongada al calor",
				"Señalización visible: 'Superficie Caliente'"
			],
			norma: "NOM-015-STPS (estrés térmico)"
		}
	},
	{
		match: /temperatura baja/,
		control: {
			epp: [
				{
					icono: "🧥",
					label: "Ropa térmica de 3 capas"
				},
				{
					icono: "🧤",
					label: "Guantes térmicos"
				},
				{
					icono: "🧢",
					label: "Pasamontañas / gorro térmico"
				},
				{
					icono: "🥾",
					label: "Botas térmicas impermeables"
				}
			],
			medidas: [
				"Límite de exposición: 45 minutos continuos en zona fría",
				"Zona de calentamiento disponible fuera del área",
				"Nunca ingresar solo a cuartos de refrigeración",
				"Verificar señal de alarma y comunicación antes de entrar",
				"Revisión diaria de estado de puertas de emergencia"
			],
			norma: "NOM-015-STPS (estrés térmico por frío)"
		}
	},
	{
		match: /caída|caida|desnivel/,
		control: {
			epp: [
				{
					icono: "⛑️",
					label: "Casco de seguridad"
				},
				{
					icono: "🥾",
					label: "Botas con suela antiderrapante"
				},
				{
					icono: "🦺",
					label: "Chaleco de alta visibilidad"
				}
			],
			medidas: [
				"Mantener pasillos y áreas de tránsito libres de obstáculos",
				"Señalizar desniveles con cinta amarilla / negro",
				"Revisar estado de pisos, escalones y guardas",
				"Buena iluminación en todo momento",
				"Reporte inmediato de pisos mojados o resbaladizos"
			],
			norma: "NOM-001-STPS"
		}
	},
	{
		match: /alturas|altura/,
		control: {
			epp: [
				{
					icono: "🪝",
					label: "Arnés de cuerpo completo tipo A"
				},
				{
					icono: "⛑️",
					label: "Casco con barbuquejo"
				},
				{
					icono: "🥾",
					label: "Botas antiderrapantes"
				},
				{
					icono: "🧤",
					label: "Guantes de agarre"
				}
			],
			medidas: [
				"Inspección del arnés y línea de vida antes de cada uso",
				"Anclar en punto certificado ≥ 2x el peso del trabajador",
				"Prohibido trabajar en alturas con viento >50 km/h",
				"Zona delimitada debajo del área de trabajo",
				"Dos puntos de anclaje simultáneos al desplazarse",
				"Certificación vigente del personal en trabajo en alturas"
			],
			norma: "NOM-009-STPS",
			permiso: "Permiso de trabajo en alturas"
		}
	},
	{
		match: /atrapamiento/,
		control: {
			epp: [
				{
					icono: "🧤",
					label: "Guantes sin manguitos (no de tela suelta)"
				},
				{
					icono: "🦺",
					label: "Ropa ajustada sin partes sueltas"
				},
				{
					icono: "👓",
					label: "Lentes de seguridad"
				}
			],
			medidas: [
				"Bloquear y etiquetar (LOTO) antes de cualquier intervención",
				"Verificar que todas las guardas estén instaladas",
				"Prohibido operar maquinaria con guardas removidas",
				"No usar joyería, relojes ni ropa suelta cerca de partes móviles",
				"Revisión de estado de guardas en cada turno"
			],
			norma: "NOM-004-STPS",
			permiso: "Permiso de intervención en equipo"
		}
	},
	{
		match: /confinado|espacios confinados/,
		control: {
			epp: [
				{
					icono: "😷",
					label: "Equipo de respiración autónoma (SCBA)"
				},
				{
					icono: "🦺",
					label: "Arnés de rescate con trípode"
				},
				{
					icono: "📡",
					label: "Radio de comunicación"
				},
				{
					icono: "🔦",
					label: "Lámpara antiexplosiva"
				}
			],
			medidas: [
				"Medición de atmósfera (O₂, LEL, CO, H₂S) antes de entrar",
				"Ventilación forzada mínima 10 minutos antes del ingreso",
				"Vigilante externo presente en todo momento",
				"Plan de rescate documentado y probado",
				"Máximo 2 personas en el interior simultáneamente",
				"Comunicación cada 5 minutos con el vigilante"
			],
			norma: "NOM-033-STPS",
			permiso: "Permiso de entrada a espacio confinado"
		}
	},
	{
		match: /montacargas/,
		control: {
			epp: [
				{
					icono: "⛑️",
					label: "Casco de seguridad"
				},
				{
					icono: "🦺",
					label: "Chaleco de alta visibilidad"
				},
				{
					icono: "🥾",
					label: "Botas de seguridad punta de acero"
				}
			],
			medidas: [
				"Respetar rutas peatonales y cruces señalizados",
				"Contacto visual obligatorio con operador antes de cruzar",
				"Velocidad máxima del montacargas: 8 km/h en interiores",
				"Bocina activa en todos los cruces ciegos",
				"No permanecer detrás del montacargas en movimiento",
				"Operador con licencia interna vigente"
			],
			norma: "NOM-006-STPS"
		}
	},
	{
		match: /camiones|transito de camion/,
		control: {
			epp: [
				{
					icono: "⛑️",
					label: "Casco de seguridad"
				},
				{
					icono: "🦺",
					label: "Chaleco de alta visibilidad clase III"
				},
				{
					icono: "🥾",
					label: "Botas de seguridad"
				}
			],
			medidas: [
				"Permanecer en zonas peatonales delimitadas",
				"No cruzar área de maniobra sin indicación del guía",
				"Uso de guía de tráfico para maniobras de reversa",
				"Velocidad máxima de vehículos en planta: 15 km/h",
				"Señal acústica y luminosa al retroceder"
			],
			norma: "NOM-001-STPS (vías de tránsito)"
		}
	},
	{
		match: /corrosiv|químic/,
		control: {
			epp: [
				{
					icono: "🥽",
					label: "Lentes herméticos anti-salpicadura"
				},
				{
					icono: "🧤",
					label: "Guantes de neopreno largo"
				},
				{
					icono: "🦺",
					label: "Delantal resistente a químicos"
				},
				{
					icono: "😷",
					label: "Respirador con filtro químico"
				},
				{
					icono: "🥾",
					label: "Botas de hule resistentes a ácidos"
				}
			],
			medidas: [
				"Leer SDS (Hoja de Seguridad) antes de manipular",
				"Regadera de emergencia verificada y desbloqueada",
				"Lava ojos accesible dentro de 10 segundos",
				"Recipientes etiquetados y cerrados cuando no se usan",
				"No mezclar químicos sin instrucción específica",
				"Zona de derrames con kit de contención disponible"
			],
			norma: "NOM-018-STPS / NOM-114-SEMARNAT",
			permiso: "Manejo de sustancias peligrosas"
		}
	},
	{
		match: /radiac/,
		control: {
			epp: [
				{
					icono: "🧤",
					label: "Guantes de cuero grueso"
				},
				{
					icono: "👓",
					label: "Careta de soldador / vidrio UV5"
				},
				{
					icono: "🦺",
					label: "Mandil y mangas de cuero"
				},
				{
					icono: "😷",
					label: "Respirador para humos metálicos"
				}
			],
			medidas: [
				"Delimitar área de radiación con biombos opacos",
				"Personal no involucrado: mínimo 3 m de distancia",
				"Verificar niveles de ventilación para humos de soldadura",
				"Dosímetro personal para operaciones prolongadas",
				"Pausas programadas fuera de la zona de radiación"
			],
			norma: "NOM-013-STPS (radiaciones no ionizantes)"
		}
	},
	{
		match: /ruido/,
		control: {
			epp: [{
				icono: "🎧",
				label: "Tapones auditivos (NRR ≥ 29 dB)"
			}, {
				icono: "🎧",
				label: "Orejeras para zonas >100 dB"
			}],
			medidas: [
				"Límite de exposición sin EPP: 85 dB por 8 horas",
				"Rotación de personal en áreas >90 dB",
				"Audiometría anual obligatoria para personal expuesto",
				"Señalización: 'Zona de ruido intenso — EPP obligatorio'",
				"Programa de mantenimiento preventivo para reducir ruido en fuente"
			],
			norma: "NOM-011-STPS"
		}
	},
	{
		match: /baja altura|objetos.*baja/,
		control: {
			epp: [{
				icono: "⛑️",
				label: "Casco de seguridad"
			}, {
				icono: "👓",
				label: "Lentes de seguridad"
			}],
			medidas: [
				"Señalizar obstáculos a baja altura con franjas amarillo/negro",
				"Colocar protectores de espuma en esquinas peligrosas",
				"Mantener iluminación adecuada en el área",
				"Revisión mensual del estado de la señalización"
			],
			norma: "NOM-001-STPS"
		}
	}
];
function getRiskControl(riesgo) {
	const r = riesgo.toLowerCase();
	const match = RISK_CONTROLS.find((rc) => rc.match.test(r));
	return match ? match.control : null;
}
//#endregion
//#region src/components/security-map/ChecklistForm.tsx
var CATEGORIAS = [
	{
		id: "infra",
		title: "Infraestructura y Mantenimiento",
		icon: /* @__PURE__ */ jsx(Building, { className: "h-4 w-4" }),
		items: [
			"Debe proporcionarse una adecuada ventilación y extracción en áreas de almacenamiento y procesamiento.",
			"Donde se hacen reparaciones temporales, estas deben ser controladas y reparadas de forma permanente lo antes posible.",
			"Las puertas deben mantenerse en buenas condiciones y cerrar adecuadamente sin dejar espacios.",
			"Equipo de medición se mantiene correctamente, limpio, calibrado y en buenas condiciones."
		]
	},
	{
		id: "limpieza",
		title: "Limpieza y Almacenamiento",
		icon: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
		items: [
			"Todos los materiales y equipos se almacenan fuera del piso en estibas limpias, bastidores o estantes.",
			"La madera no debe ser utilizada en áreas de productos abiertos. Si hay, debe monitorearse continuamente.",
			"Toda el agua utilizada en la planta que pueda ponerse en contacto con el producto debe ser potable."
		]
	},
	{
		id: "quimicos",
		title: "Control de Químicos y Objetos",
		icon: /* @__PURE__ */ jsx(FlaskConical, { className: "h-4 w-4" }),
		items: ["Productos de limpieza, lubricantes o químicos potenciales se almacenan lejos del producto y tanques abiertos.", "Se requiere el control del uso de implementos afilados de metal (cuchillos, agujas). Cortadores con hojas desprendibles no se deben utilizar."]
	}
];
function ChecklistForm({ area, onClose, onSave }) {
	const [evaluador, setEvaluador] = useState("");
	const [respuestas, setRespuestas] = useState({});
	const [observaciones, setObservaciones] = useState({});
	const handleResp = (itemId, res) => {
		setRespuestas((prev) => ({
			...prev,
			[itemId]: res
		}));
		if (res !== "no-cumple") setObservaciones((prev) => {
			const copy = { ...prev };
			delete copy[itemId];
			return copy;
		});
	};
	const handleObs = (itemId, text) => {
		setObservaciones((prev) => ({
			...prev,
			[itemId]: text
		}));
	};
	let totalApplicable = 0;
	let totalComply = 0;
	Object.values(respuestas).forEach((r) => {
		if (r === "cumple") {
			totalComply++;
			totalApplicable++;
		} else if (r === "no-cumple") totalApplicable++;
	});
	const percent = totalApplicable > 0 ? Math.round(totalComply / totalApplicable * 100) : 0;
	const isComplete = evaluador.trim() !== "" && CATEGORIAS.flatMap((c) => c.items).every((item) => respuestas[item] !== void 0 && respuestas[item] !== null);
	const getStatusColor = (val) => {
		if (val >= 85) return "text-emerald-400";
		if (val >= 65) return "text-amber-400";
		return "text-red-400";
	};
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 sm:p-6 backdrop-blur-sm",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-b border-border bg-surface-zone px-6 py-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(ClipboardCheck, { className: "h-5 w-5 text-amber-400" }), /* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-foreground",
							children: "Evaluación de Prerrequisitos"
						})]
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							"Área: ",
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-foreground",
								children: area.nombre
							}),
							" • Resp: ",
							area.responsable
						]
					})] }), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-full p-2 text-muted-foreground hover:bg-background/50 hover:text-foreground transition-colors",
						children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-muted/30 border-b border-border px-6 py-4 shrink-0",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "text-sm font-bold text-foreground mb-2 block",
						children: ["Nombre del evaluador ", /* @__PURE__ */ jsx("span", {
							className: "text-red-500",
							children: "*"
						})]
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						value: evaluador,
						onChange: (e) => setEvaluador(e.target.value),
						placeholder: "Ej. Juan Pérez",
						className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto min-h-0 p-6 space-y-8",
					children: CATEGORIAS.map((cat) => /* @__PURE__ */ jsxs("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400/90 border-b border-border/50 pb-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "rounded bg-amber-500/10 p-1.5",
								children: cat.icon
							}), cat.title]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-3",
							children: cat.items.map((item) => {
								const r = respuestas[item];
								return /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-3 transition-colors hover:border-border/80",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-foreground flex-1 leading-snug",
											children: item
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 shrink-0",
											children: [
												/* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => handleResp(item, "cumple"),
													className: `flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${r === "cumple" ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_-2px_rgba(52,211,153,0.3)]" : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"}`,
													children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }), " Cumple"]
												}),
												/* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => handleResp(item, "no-cumple"),
													className: `flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${r === "no-cumple" ? "border-red-500/50 bg-red-500/20 text-red-400 shadow-[0_0_10px_-2px_rgba(248,113,113,0.3)]" : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"}`,
													children: [/* @__PURE__ */ jsx(XCircle, { className: "h-3.5 w-3.5" }), " No Cumple"]
												}),
												/* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => handleResp(item, "na"),
													className: `flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${r === "na" ? "border-slate-500/50 bg-slate-500/20 text-slate-300" : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"}`,
													children: [/* @__PURE__ */ jsx(MinusCircle, { className: "h-3.5 w-3.5" }), " N/A"]
												})
											]
										})]
									}), r === "no-cumple" && /* @__PURE__ */ jsx("div", {
										className: "mt-2 pl-2 border-l-2 border-red-500/30",
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											placeholder: "Describa el hallazgo u observación...",
											value: observaciones[item] || "",
											onChange: (e) => handleObs(item, e.target.value),
											className: "w-full bg-background/50 border border-red-500/20 rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
										})
									})]
								}, item);
							})
						})]
					}, cat.id))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-t border-border bg-surface-zone px-6 py-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold",
							children: "Cumplimiento Calculado"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: `text-3xl font-black leading-none ${getStatusColor(percent)}`,
								children: [percent, "%"]
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs text-muted-foreground mb-1",
								children: [
									"(",
									totalComply,
									"/",
									totalApplicable,
									" aplicables)"
								]
							})]
						})]
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => onSave({
							evaluador: evaluador.trim(),
							cumplimiento: percent,
							respuestas,
							observaciones
						}),
						disabled: !isComplete,
						className: `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${isComplete ? "bg-amber-500 text-amber-950 hover:bg-amber-400 hover:shadow-[0_0_15px_-3px_rgba(251,191,36,0.5)]" : "bg-surface-plant text-muted-foreground cursor-not-allowed border border-border/50"}`,
						children: [/* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }), isComplete ? "Guardar Evaluación" : "Completa todos los campos"]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/security-map/EvaluationHistory.tsx
function EvaluationHistory({ areaId }) {
	const [evaluations, setEvaluations] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!areaId) return;
		setLoading(true);
		const unsubscribe = onSnapshot(query(collection(db, "evaluaciones"), where("areaId", "==", areaId)), (snapshot) => {
			const records = snapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					evaluador: data.evaluador,
					cumplimiento: data.cumplimiento || 0,
					observaciones: data.observaciones || "",
					fecha: data.fecha?.toDate() || null
				};
			});
			records.sort((a, b) => {
				const dateA = a.fecha?.getTime() || 0;
				return (b.fecha?.getTime() || 0) - dateA;
			});
			setEvaluations(records);
			setLoading(false);
		}, (error) => {
			console.error("Error fetching evaluations: ", error);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [areaId]);
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex h-32 items-center justify-center text-muted-foreground",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin" })
	});
	if (evaluations.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center gap-3 py-10 text-center text-muted-foreground",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex h-12 w-12 items-center justify-center rounded-full bg-background/50 border border-border",
			children: /* @__PURE__ */ jsx(ClipboardList, { className: "h-5 w-5 opacity-50" })
		}), /* @__PURE__ */ jsx("p", {
			className: "text-sm",
			children: "No hay evaluaciones previas para esta área."
		})]
	});
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-4 animate-in fade-in slide-in-from-bottom-2",
		children: evaluations.map((ev) => {
			const isPassed = ev.cumplimiento >= ESTADO_META;
			return /* @__PURE__ */ jsxs("div", {
				className: "group relative overflow-hidden rounded-xl border border-border bg-background/30 p-4 transition-all hover:bg-background/50 hover:border-border/80",
				children: [
					/* @__PURE__ */ jsx("div", { className: `absolute left-0 top-0 bottom-0 w-1 ${isPassed ? "bg-emerald-500" : "bg-red-500"} opacity-80` }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-3 pl-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground font-medium",
								children: [/* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }), ev.fecha ? new Intl.DateTimeFormat("es-MX", {
									day: "2-digit",
									month: "short",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit"
								}).format(ev.fecha) : "Fecha desconocida"]
							}), ev.evaluador && /* @__PURE__ */ jsxs("div", {
								className: "text-[10px] text-muted-foreground/80 font-semibold uppercase tracking-wider pl-5",
								children: ["Eval: ", ev.evaluador]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: `flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${isPassed ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`,
							children: [
								isPassed ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(AlertCircle, { className: "h-3.5 w-3.5" }),
								ev.cumplimiento,
								"%"
							]
						})]
					}),
					ev.observaciones && /* @__PURE__ */ jsx("div", {
						className: "pl-2",
						children: /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground/80 leading-relaxed italic bg-black/20 p-2.5 rounded-lg border border-white/5",
							children: [
								"\"",
								ev.observaciones,
								"\""
							]
						})
					})
				]
			}, ev.id);
		})
	});
}
//#endregion
//#region src/components/security-map/Avatar.tsx
var fotosList = Object.entries(/* @__PURE__ */ Object.assign({
	"/public/fotos/ABEL GUILLERMO MAZATAN.jpeg": "/assets/ABEL%20GUILLERMO%20MAZATAN-Cg-XO1yD.jpeg",
	"/public/fotos/ADRIAN HERNANDEZ.jpeg": "/assets/ADRIAN%20HERNANDEZ-D6Y00sF7.jpeg",
	"/public/fotos/ALDO ADRIAN SIFUENTES.jpeg": "/assets/ALDO%20ADRIAN%20SIFUENTES-C-L0v_-E.jpeg",
	"/public/fotos/ANA PAOLA PERERA.jpeg": "/assets/ANA%20PAOLA%20PERERA-CYuWrAdq.jpeg",
	"/public/fotos/ANDRES SARABIA.jpeg": "/assets/ANDRES%20SARABIA-CaUep2s5.jpeg",
	"/public/fotos/ARTURO SAUCEDO.jpeg": "/assets/ARTURO%20SAUCEDO-CoTpHy6I.jpeg",
	"/public/fotos/ARTURO VELAZQUEZ.jpeg": "/assets/ARTURO%20VELAZQUEZ-DRqLpX7m.jpeg",
	"/public/fotos/BENITO VALLE.jpeg": "/assets/BENITO%20VALLE-gYf1COfz.jpeg",
	"/public/fotos/BETSAIDA GUERRERO.jpeg": "/assets/BETSAIDA%20GUERRERO-D2Q0mnv9.jpeg",
	"/public/fotos/DIAS MARRUFO ADRIAN.jpeg": "/assets/DIAS%20MARRUFO%20ADRIAN-32yxnv28.jpeg",
	"/public/fotos/EDGAR RENE DIAZ.jpeg": "/assets/EDGAR%20RENE%20DIAZ-6vkJMWqI.jpeg",
	"/public/fotos/EDGAR ZAMARRON.jpeg": "/assets/EDGAR%20ZAMARRON-D6yTtgyA.jpeg",
	"/public/fotos/ERIKA IVOONE IBARRA.jpeg": "/assets/ERIKA%20IVOONE%20IBARRA-Ch_xL8wa.jpeg",
	"/public/fotos/FILIBERTO PINEDO.jpeg": "/assets/FILIBERTO%20PINEDO-iS9KOgg8.jpeg",
	"/public/fotos/FÁTIMA NEDITH GOMEZ MIRELES.jpeg": "/assets/F%C3%81TIMA%20NEDITH%20GOMEZ%20MIRELES-DeEuP886.jpeg",
	"/public/fotos/GUILLERMO GERARDO GONZALES.jpeg": "/assets/GUILLERMO%20GERARDO%20GONZALES-bPNUr5-7.jpeg",
	"/public/fotos/J JESUS RIVERA.jpeg": "/assets/J%20JESUS%20RIVERA-CwZmjLOc.jpeg",
	"/public/fotos/J MANUEL RAYGOZA.jpeg": "/assets/J%20MANUEL%20RAYGOZA-B06_wuaK.jpeg",
	"/public/fotos/J. JESUS ALVARADO TENORIO.jpeg": "/assets/J.%20JESUS%20ALVARADO%20TENORIO-B9MBlNxc.jpeg",
	"/public/fotos/JAIME LOPEZ.jpeg": "/assets/JAIME%20LOPEZ-BmJmjbsy.jpeg",
	"/public/fotos/JOSE FRANCISCO TORRES LÓPEZ.jpeg": "/assets/JOSE%20FRANCISCO%20TORRES%20L%C3%93PEZ-D4tAfML_.jpeg",
	"/public/fotos/JOSE GUADALUPE VALLE.jpeg": "/assets/JOSE%20GUADALUPE%20VALLE-BYEjZbmb.jpeg",
	"/public/fotos/JOSE LEANDRO MARTINEZ.jpeg": "/assets/JOSE%20LEANDRO%20MARTINEZ-FQ_5qfMV.jpeg",
	"/public/fotos/JOSE LUIS CAZARES.jpeg": "/assets/JOSE%20LUIS%20CAZARES-DOvqZhvW.jpeg",
	"/public/fotos/JOSE LUIS MALDONADO.jpeg": "/assets/JOSE%20LUIS%20MALDONADO-B7mcfYWj.jpeg",
	"/public/fotos/JOSE MARIA LUJAN.jpeg": "/assets/JOSE%20MARIA%20LUJAN-Du5Q3ESG.jpeg",
	"/public/fotos/JUAN ANTONIO RIVERA.jpeg": "/assets/JUAN%20ANTONIO%20RIVERA-CLgr-kvM.jpeg",
	"/public/fotos/JUAN ANTONIO VALDEZ.jpeg": "/assets/JUAN%20ANTONIO%20VALDEZ-BAdOaeZ6.jpeg",
	"/public/fotos/JUAN FRANCISCO GARCIA.jpeg": "/assets/JUAN%20FRANCISCO%20GARCIA-By6gA0nC.jpeg",
	"/public/fotos/JUAN ISIDRO CAMPOS.jpeg": "/assets/JUAN%20ISIDRO%20CAMPOS-Cl-6O1M_.jpeg",
	"/public/fotos/JUAN SALAZAR BANDA.jpeg": "/assets/JUAN%20SALAZAR%20BANDA-DR5JKEbl.jpeg",
	"/public/fotos/LUIS FERNANDO GUTIERREZ.jpeg": "/assets/LUIS%20FERNANDO%20GUTIERREZ-CNqPDD1W.jpeg",
	"/public/fotos/LUIS MANUEL GARCIA VICTORIO.jpeg": "/assets/LUIS%20MANUEL%20GARCIA%20VICTORIO-CL4Fk1Qz.jpeg",
	"/public/fotos/LUIS OTONIEL PACHECO.jpeg": "/assets/LUIS%20OTONIEL%20PACHECO-DmvBm7Eb.jpeg",
	"/public/fotos/MANUEL DE JESUS DEL REAL.jpeg": "/assets/MANUEL%20DE%20JESUS%20DEL%20REAL-D4Pd7Cx4.jpeg",
	"/public/fotos/MANUEL DE JESUS FALCON.jpeg": "/assets/MANUEL%20DE%20JESUS%20FALCON-BudsyN19.jpeg",
	"/public/fotos/MARCO AURELIO CUAUCOATL.jpeg": "/assets/MARCO%20AURELIO%20CUAUCOATL-C4JFKcEJ.jpeg",
	"/public/fotos/MARIO ALBERTO ZAMARRIPA.jpeg": "/assets/MARIO%20ALBERTO%20ZAMARRIPA-LE_q6ytC.jpeg",
	"/public/fotos/MARIO DAVID CASTAÑEDA.jpeg": "/assets/MARIO%20DAVID%20CASTA%C3%91EDA-D7v-m5Cj.jpeg",
	"/public/fotos/OBED CALVILLO RAMIREZ.jpeg": "/assets/OBED%20CALVILLO%20RAMIREZ-vA84TPp6.jpeg",
	"/public/fotos/OSCAR IVAN IBARRA.jpeg": "/assets/OSCAR%20IVAN%20IBARRA-eSt-mIQA.jpeg",
	"/public/fotos/OSCAR NUÑEZ CALZADA.jpeg": "/assets/OSCAR%20NU%C3%91EZ%20CALZADA-COB_pri0.jpeg",
	"/public/fotos/OSCAR RODRIGUEZ.jpeg": "/assets/OSCAR%20RODRIGUEZ-B5csIxJS.jpeg",
	"/public/fotos/RAFAEL VERA.jpeg": "/assets/RAFAEL%20VERA-mti2HZ20.jpeg",
	"/public/fotos/RAUL BAÑUELOS.jpeg": "/assets/RAUL%20BA%C3%91UELOS-rZcKrG6V.jpeg",
	"/public/fotos/RICARDO ESPARZA.jpeg": "/assets/RICARDO%20ESPARZA-Cew8Bsug.jpeg",
	"/public/fotos/RIGOBERTO MOTA.jpeg": "/assets/RIGOBERTO%20MOTA-C63DZ09T.jpeg",
	"/public/fotos/RODOLFO ESPARZA.jpeg": "/assets/RODOLFO%20ESPARZA-CTI4z0m_.jpeg",
	"/public/fotos/RODRIGO REGALADO.jpeg": "/assets/RODRIGO%20REGALADO-Dly3n5-L.jpeg",
	"/public/fotos/RODRÍGUEZ RANGEL JOSÉ LUIS.jpeg": "/assets/RODR%C3%8DGUEZ%20RANGEL%20JOS%C3%89%20LUIS-Cl_qjGOD.jpeg",
	"/public/fotos/SAMANTHA MONTSERRAT ROJERO.jpeg": "/assets/SAMANTHA%20MONTSERRAT%20ROJERO-uJ7pUBBF.jpeg",
	"/public/fotos/SERGIO TRUJILLO.jpeg": "/assets/SERGIO%20TRUJILLO-C5wX9PYk.jpeg",
	"/public/fotos/SHERLYN GARCIA.jpeg": "/assets/SHERLYN%20GARCIA-Dq0_eAq2.jpeg",
	"/public/fotos/URIEL ESCOBEDO.jpeg": "/assets/URIEL%20ESCOBEDO-Ce_9gplA.jpeg",
	"/public/fotos/VALERIA NATALY CASTAÑON.jpeg": "/assets/VALERIA%20NATALY%20CASTA%C3%91ON-pUg1LAr-.jpeg",
	"/public/fotos/VICTOR HUGO ZAPATA.jpeg": "/assets/VICTOR%20HUGO%20ZAPATA-BnW7ytHV.jpeg",
	"/public/fotos/VICTOR MANUEL DE JESUS SIMENTAL.jpeg": "/assets/VICTOR%20MANUEL%20DE%20JESUS%20SIMENTAL-npw3s6hH.jpeg"
})).map(([path, url]) => {
	const fileName = path.split("/").pop()?.replace(".jpeg", "") || "";
	return {
		fileName,
		normalized: fileName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
		url
	};
});
function getPhotoUrl(name) {
	const normalizedName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	const parts = normalizedName.split(" ");
	const firstTwo = parts.slice(0, 2).join(" ");
	for (const photo of fotosList) {
		if (normalizedName === photo.normalized) return photo.url;
		if (photo.normalized === firstTwo) return photo.url;
		if (normalizedName.includes(photo.normalized)) return photo.url;
		if (photo.normalized.includes(parts[0]) && parts.length > 1 && photo.normalized.includes(parts[parts.length - 1])) return photo.url;
	}
	return null;
}
function Avatar({ name, className = "h-8 w-8" }) {
	const url = useMemo(() => getPhotoUrl(name), [name]);
	const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
	if (!url) return /* @__PURE__ */ jsx("div", {
		className: `flex shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-bold ${className}`,
		children: /* @__PURE__ */ jsx("span", {
			className: "text-[10px]",
			children: initials
		})
	});
	return /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: `shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`,
			children: /* @__PURE__ */ jsx("img", {
				src: url,
				alt: `Foto de ${name}`,
				className: "h-full w-full rounded-full object-cover border border-border/50 cursor-zoom-in transition-transform hover:scale-105",
				onError: (e) => {
					e.currentTarget.style.display = "none";
					e.currentTarget.parentElement?.classList.add("fallback-avatar");
				}
			})
		})
	}), /* @__PURE__ */ jsxs(DialogContent, {
		className: "max-w-md bg-transparent border-none shadow-none p-0 flex flex-col justify-center items-center gap-4",
		children: [
			/* @__PURE__ */ jsxs(DialogTitle, {
				className: "sr-only",
				children: ["Foto de ", name]
			}),
			/* @__PURE__ */ jsx("img", {
				src: url,
				alt: `Foto de ${name}`,
				className: "max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border text-center shadow-lg animate-in fade-in slide-in-from-bottom-4",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-lg font-bold text-foreground",
					children: name
				})
			})
		]
	})] });
}
//#endregion
//#region src/components/security-map/DetailsPanel.tsx
var riskStyles = {
	warning: {
		chip: "border-amber-500/40 bg-amber-500/10 text-amber-300",
		glow: ""
	},
	alert: {
		chip: "border-orange-500/40 bg-orange-500/10 text-orange-300",
		glow: ""
	},
	danger: {
		chip: "border-red-500/40 bg-red-500/10 text-red-300",
		glow: "shadow-[0_0_8px_-2px_rgba(239,68,68,0.5)]"
	}
};
function RiskIcon({ risk }) {
	const r = risk.toLowerCase();
	if (/eléctric|electric|tensión|arco/.test(r)) return /* @__PURE__ */ jsx(Zap, { className: "h-3.5 w-3.5 text-yellow-400" });
	if (/explosión|explosion|incendio/.test(r)) return /* @__PURE__ */ jsx(Flame, { className: "h-3.5 w-3.5 text-red-400" });
	if (/caliente|temperatura alta/.test(r)) return /* @__PURE__ */ jsx(Thermometer, { className: "h-3.5 w-3.5 text-red-400" });
	if (/temperatura baja/.test(r)) return /* @__PURE__ */ jsx(Thermometer, { className: "h-3.5 w-3.5 text-blue-400" });
	if (/caída|caida|alturas|desnivel/.test(r)) return /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-3.5 w-3.5 text-sky-400" });
	if (/atrapamiento|confinad|corrosiv|radiac/.test(r)) return /* @__PURE__ */ jsx(ShieldAlert, { className: "h-3.5 w-3.5 text-orange-400" });
	return /* @__PURE__ */ jsx(AlertTriangle, { className: "h-3.5 w-3.5 text-slate-400" });
}
function RiskItem({ riesgo }) {
	const [expanded, setExpanded] = useState(false);
	const { chip, glow } = riskStyles[classifyRisk(riesgo)];
	const control = getRiskControl(riesgo);
	return /* @__PURE__ */ jsxs("li", {
		className: `rounded-lg border ${chip} ${glow} overflow-hidden`,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setExpanded((e) => !e),
			className: `flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium ${control ? "cursor-pointer" : "cursor-default"}`,
			"aria-expanded": expanded,
			children: [
				/* @__PURE__ */ jsx(RiskIcon, { risk: riesgo }),
				/* @__PURE__ */ jsx("span", {
					className: "flex-1 text-left",
					children: riesgo
				}),
				control && /* @__PURE__ */ jsx("span", {
					className: "shrink-0 opacity-60",
					children: expanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
				})
			]
		}), expanded && control && /* @__PURE__ */ jsxs("div", {
			className: "border-t border-current/20 bg-black/20 px-3 pb-3 pt-2 space-y-3",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-70",
					children: [/* @__PURE__ */ jsx(HardHat, { className: "h-3 w-3" }), "EPP Requerido"]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-1.5",
					children: control.epp.map((e) => /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1 rounded-md border border-current/20 bg-black/20 px-2 py-0.5 text-[10px]",
						children: [/* @__PURE__ */ jsx("span", { children: e.icono }), e.label]
					}, e.label))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-70",
					children: [/* @__PURE__ */ jsx(ListChecks, { className: "h-3 w-3" }), "Medidas de Control"]
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-1",
					children: control.medidas.map((m) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-1.5 text-[10px] opacity-80",
						children: [/* @__PURE__ */ jsx("span", { className: "mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" }), m]
					}, m))
				})] }),
				(control.norma || control.permiso) && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [control.norma && /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1 rounded-md border border-current/20 bg-black/10 px-2 py-0.5 text-[10px] opacity-70",
						children: [/* @__PURE__ */ jsx(FileText, { className: "h-2.5 w-2.5" }), control.norma]
					}), control.permiso && /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1 rounded-md border border-current/30 bg-current/10 px-2 py-0.5 text-[10px] font-semibold",
						children: ["⚠ ", control.permiso]
					})]
				})
			]
		})]
	});
}
function ComplianceBar({ value }) {
	return /* @__PURE__ */ jsx("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-border/40",
		children: /* @__PURE__ */ jsx("div", {
			className: `h-full rounded-full transition-all duration-700 ${value >= 85 ? "bg-emerald-400" : value >= 65 ? "bg-amber-400" : "bg-red-400"}`,
			style: { width: `${value}%` }
		})
	});
}
function DetailsPanel({ area }) {
	const [showChecklist, setShowChecklist] = useState(false);
	const [activeTab, setActiveTab] = useState("detalles");
	const handleSaveChecklist = async (data) => {
		try {
			if (!area) return;
			await addDoc(collection(db, "evaluaciones"), {
				areaId: area.id,
				areaNombre: area.nombre,
				equipo: area.equipo,
				responsable: area.responsable,
				evaluador: data.evaluador,
				cumplimiento: data.cumplimiento,
				respuestas: data.respuestas,
				observaciones: data.observaciones,
				fecha: serverTimestamp()
			});
			toast.success("Evaluación guardada", { description: `Se guardó correctamente con un ${data.cumplimiento}% de cumplimiento.` });
			setShowChecklist(false);
		} catch (error) {
			console.error("Error al guardar evaluación:", error);
			toast.error("Error al guardar", { description: "Revisa tu conexión o configuración de Firebase." });
		}
	};
	return /* @__PURE__ */ jsx("aside", {
		"aria-live": "polite",
		className: "flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]",
		children: !area ? /* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center text-muted-foreground",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/40",
				children: /* @__PURE__ */ jsx(Map$1, { className: "h-7 w-7" })
			}), /* @__PURE__ */ jsx("p", {
				className: "max-w-[14rem] text-sm leading-relaxed",
				children: "Selecciona un área en el mapa para ver sus detalles y responsables."
			})]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("header", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] font-bold uppercase tracking-widest text-amber-400/80",
					children: "Área seleccionada"
				}), /* @__PURE__ */ jsx("h2", {
					className: "text-lg font-bold leading-snug text-foreground",
					children: area.nombre
				})]
			}),
			/* @__PURE__ */ jsx("div", { className: "h-px bg-gradient-to-r from-amber-500/40 via-border to-transparent" }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ jsx(InfoRow, {
					icon: /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-amber-400" }),
					label: "Responsable",
					value: area.responsable,
					avatar: /* @__PURE__ */ jsx(Avatar, {
						name: area.responsable,
						className: "h-10 w-10"
					})
				}), /* @__PURE__ */ jsx(InfoRow, {
					icon: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-cyan-400" }),
					label: "Equipo autónomo",
					value: area.equipo,
					avatar: /* @__PURE__ */ jsx(TeamLogo, {
						team: area.equipo,
						className: "h-10 w-10"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-xl border border-border bg-background/30 p-3 space-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [area.estado === "al-dia" ? /* @__PURE__ */ jsx(CalendarCheck, { className: "h-4 w-4 text-emerald-400" }) : /* @__PURE__ */ jsx(CalendarX, { className: `h-4 w-4 ${area.estado === "vencido" ? "text-red-400" : "text-amber-400"}` }), /* @__PURE__ */ jsx("span", {
								className: "text-xs font-semibold text-foreground",
								children: "Inspección"
							})]
						}), /* @__PURE__ */ jsx("span", {
							className: `rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${ESTADO_META[area.estado].border} ${ESTADO_META[area.estado].bg} ${ESTADO_META[area.estado].color}`,
							children: ESTADO_META[area.estado].label
						})]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-1.5 flex items-center justify-between text-[10px] text-muted-foreground",
						children: [/* @__PURE__ */ jsx("span", { children: "Cumplimiento" }), /* @__PURE__ */ jsxs("span", {
							className: "font-bold text-foreground",
							children: [area.cumplimiento, "%"]
						})]
					}), /* @__PURE__ */ jsx(ComplianceBar, { value: area.cumplimiento })] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-2 text-[10px]",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: "Última inspección"
						}), /* @__PURE__ */ jsx("p", {
							className: "font-semibold text-foreground",
							children: (/* @__PURE__ */ new Date(area.ultimaInspeccion + "T12:00:00")).toLocaleDateString("es-MX", {
								day: "2-digit",
								month: "short",
								year: "numeric"
							})
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: "Próxima inspección"
						}), /* @__PURE__ */ jsx("p", {
							className: `font-semibold ${area.estado === "vencido" ? "text-red-400" : "text-foreground"}`,
							children: (/* @__PURE__ */ new Date(area.proximaInspeccion + "T12:00:00")).toLocaleDateString("es-MX", {
								day: "2-digit",
								month: "short",
								year: "numeric"
							})
						})] })]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setShowChecklist(true),
						className: "mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-400 transition-colors hover:bg-amber-500/20",
						children: [/* @__PURE__ */ jsx(ClipboardCheck, { className: "h-4 w-4" }), "Nueva Evaluación"]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex bg-background/50 p-1 rounded-lg border border-border",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => setActiveTab("detalles"),
					className: `flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${activeTab === "detalles" ? "bg-amber-500/20 text-amber-400 shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
					children: "Riesgos"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => setActiveTab("historial"),
					className: `flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${activeTab === "historial" ? "bg-amber-500/20 text-amber-400 shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
					children: "Historial"
				})]
			}),
			activeTab === "detalles" ? /* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 flex-col gap-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(ShieldAlert, { className: "h-4 w-4 text-amber-400" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-sm font-semibold text-foreground",
								children: "Riesgos identificados"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "ml-auto rounded-full border border-border bg-background/40 px-2 py-0.5 text-xs text-muted-foreground",
								children: area.riesgos.length
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-[10px] text-muted-foreground",
						children: "Toca un riesgo para ver EPP y medidas de control"
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "flex flex-col gap-2",
						children: area.riesgos.map((riesgo) => /* @__PURE__ */ jsx(RiskItem, { riesgo }, riesgo))
					})
				]
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex flex-1 flex-col gap-3 min-h-[200px]",
				children: /* @__PURE__ */ jsx(EvaluationHistory, { areaId: area.id })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "rounded-lg border border-border/50 bg-surface-zone px-3 py-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground/60",
				children: "Sistema de Seguridad Industrial"
			}),
			showChecklist && area && /* @__PURE__ */ jsx(ChecklistForm, {
				area,
				onClose: () => setShowChecklist(false),
				onSave: handleSaveChecklist
			})
		] })
	});
}
function InfoRow({ icon, label, value, avatar }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3",
		children: [avatar && /* @__PURE__ */ jsx("div", { children: avatar }), /* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground",
				children: [icon, label]
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm font-semibold leading-snug text-foreground",
				children: value
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/security-map/FilterBar.tsx
var ALL_TEAMS = [...new Set(areas.map((a) => a.equipo))];
var ALL_ESTADOS = [
	"al-dia",
	"pendiente",
	"vencido"
];
function FilterBar({ query, onQueryChange, activeEquipos, onToggleEquipo, activeCategorias, onToggleCategoria, activeResponsable, onResponsableChange, activeEstados, onToggleEstado, totalVisible, onClearAll }) {
	const hasFilters = !!query.trim() || activeEquipos.size > 0 || activeCategorias.size > 0 || !!activeResponsable || activeEstados.size > 0;
	const responsables = useMemo(() => [...new Set(areas.map((a) => a.responsable))].sort(), []);
	return /* @__PURE__ */ jsxs("div", {
		className: "no-print flex flex-col gap-3 rounded-2xl border border-border bg-surface-plant p-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex-1",
					children: [
						/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
						/* @__PURE__ */ jsx("input", {
							id: "area-search",
							type: "text",
							value: query,
							onChange: (e) => onQueryChange(e.target.value),
							placeholder: "Buscar área, responsable, equipo o riesgo…",
							className: "w-full rounded-xl border border-border bg-surface-zone py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
						}),
						query && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onQueryChange(""),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
							children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
						})
					]
				}), /* @__PURE__ */ jsxs(Select, {
					value: activeResponsable || "__all__",
					onValueChange: (v) => onResponsableChange(v === "__all__" ? "" : v),
					children: [/* @__PURE__ */ jsx(SelectTrigger, {
						id: "responsable-select",
						className: "w-56 shrink-0 border-border bg-surface-zone text-sm",
						children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Todos los responsables" })
					}), /* @__PURE__ */ jsxs(SelectContent, {
						className: "max-h-64",
						children: [/* @__PURE__ */ jsx(SelectItem, {
							value: "__all__",
							children: "Todos los responsables"
						}), responsables.map((r) => /* @__PURE__ */ jsx(SelectItem, {
							value: r,
							className: "text-xs",
							children: r
						}, r))]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-3 w-3" }), "Equipo:"]
				}), ALL_TEAMS.map((equipo) => {
					const meta = TEAM_META[equipo] ?? DEFAULT_TEAM_META;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => onToggleEquipo(equipo),
						className: `flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${activeEquipos.has(equipo) ? meta.activeChip : meta.inactiveChip}`,
						children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${meta.dot}` }), equipo]
					}, equipo);
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-3 w-3" }), "Riesgo:"]
				}), RISK_CATEGORIES.map((cat) => {
					return /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onToggleCategoria(cat.id),
						className: `rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${activeCategorias.has(cat.id) ? `${cat.color} border-current bg-current/10` : "border-border text-muted-foreground hover:border-foreground/30"}`,
						children: cat.label
					}, cat.id);
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-3 w-3" }), "Estado:"]
				}), ALL_ESTADOS.map((estado) => {
					const meta = ESTADO_META[estado];
					const active = activeEstados.has(estado);
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						id: `filter-estado-${estado}`,
						onClick: () => onToggleEstado(estado),
						className: `flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${active ? meta.chipActive : meta.chipInactive}`,
						children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${meta.dot}` }), meta.label]
					}, estado);
				})]
			}),
			hasFilters && /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-t border-border pt-2.5",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-xs text-muted-foreground",
					children: [
						"Mostrando",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-amber-400",
							children: totalVisible
						}),
						" ",
						"de ",
						areas.length,
						" áreas"
					]
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: onClearAll,
					className: "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
					children: [/* @__PURE__ */ jsx(X, { className: "h-3 w-3" }), "Limpiar filtros"]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/security-map/TableView.tsx
var LEVEL_ORDER = {
	danger: 3,
	alert: 2,
	warning: 1
};
var LEVEL_LABELS = {
	danger: "Peligro",
	alert: "Alerta",
	warning: "Precaución"
};
var LEVEL_STYLES = {
	danger: "border-red-500/30 bg-red-500/10 text-red-300 shadow-[0_0_6px_-2px_rgba(239,68,68,0.4)]",
	alert: "border-orange-500/30 bg-orange-500/10 text-orange-300",
	warning: "border-amber-500/30 bg-amber-500/10 text-amber-300"
};
function MiniBar({ value, estado }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "h-1.5 w-16 overflow-hidden rounded-full bg-border/40",
			children: /* @__PURE__ */ jsx("div", {
				className: `h-full rounded-full ${estado === "vencido" ? "bg-red-400" : estado === "pendiente" ? "bg-amber-400" : "bg-emerald-400"}`,
				style: { width: `${value}%` }
			})
		}), /* @__PURE__ */ jsxs("span", {
			className: "text-[10px] text-muted-foreground",
			children: [value, "%"]
		})]
	});
}
function TableView({ areas, selectedId, onSelect }) {
	const [sortKey, setSortKey] = useState("nombre");
	const [sortDir, setSortDir] = useState("asc");
	function handleSort(key) {
		if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	}
	const sorted = [...areas].sort((a, b) => {
		let cmp = 0;
		if (sortKey === "nombre") cmp = a.nombre.localeCompare(b.nombre, "es");
		else if (sortKey === "equipo") cmp = a.equipo.localeCompare(b.equipo, "es");
		else if (sortKey === "responsable") cmp = a.responsable.localeCompare(b.responsable, "es");
		else if (sortKey === "riesgos") cmp = a.riesgos.length - b.riesgos.length;
		else if (sortKey === "nivel") cmp = LEVEL_ORDER[getMaxRiskLevel(a.riesgos)] - LEVEL_ORDER[getMaxRiskLevel(b.riesgos)];
		else if (sortKey === "cumplimiento") cmp = a.cumplimiento - b.cumplimiento;
		return sortDir === "asc" ? cmp : -cmp;
	});
	const columns = [
		{
			key: "nombre",
			label: "Área"
		},
		{
			key: "equipo",
			label: "Equipo"
		},
		{
			key: "responsable",
			label: "Responsable"
		},
		{
			key: "riesgos",
			label: "Riesgos"
		},
		{
			key: "nivel",
			label: "Nivel"
		},
		{
			key: "cumplimiento",
			label: "Cumplimiento"
		}
	];
	function SortIcon({ col }) {
		if (sortKey !== col) return /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3 w-3 opacity-30" });
		return sortDir === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-3 w-3 text-amber-400" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-3 w-3 text-amber-400" });
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-surface-plant",
		children: [/* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", {
					className: "border-b border-border bg-surface-zone",
					children: columns.map(({ key, label }) => /* @__PURE__ */ jsx("th", {
						className: "text-left",
						children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => handleSort(key),
							className: "flex w-full items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground",
							children: [label, /* @__PURE__ */ jsx(SortIcon, { col: key })]
						})
					}, key))
				}) }), /* @__PURE__ */ jsxs("tbody", { children: [sorted.map((area, i) => {
					const isSelected = selectedId === area.id;
					const level = getMaxRiskLevel(area.riesgos);
					const estadoMeta = ESTADO_META[area.estado];
					return /* @__PURE__ */ jsxs("tr", {
						id: `table-row-${area.id}`,
						onClick: () => onSelect(area.id),
						tabIndex: 0,
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") onSelect(area.id);
						},
						"aria-selected": isSelected,
						className: `cursor-pointer border-b border-border/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 ${isSelected ? "bg-amber-400/10" : i % 2 === 0 ? "hover:bg-surface-zone" : "bg-background/10 hover:bg-surface-zone"}`,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `px-4 py-3 font-semibold ${isSelected ? "text-amber-200" : "text-foreground"}`,
								children: area.nombre
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3 text-xs text-muted-foreground",
								children: area.equipo
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3 text-xs text-muted-foreground",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Avatar, {
										name: area.responsable,
										className: "h-6 w-6"
									}), /* @__PURE__ */ jsx("span", {
										className: "truncate max-w-[120px] lg:max-w-none",
										title: area.responsable,
										children: area.responsable
									})]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3 text-center",
								children: /* @__PURE__ */ jsx("span", {
									className: "rounded-full border border-border bg-background/40 px-2 py-0.5 text-xs font-bold text-muted-foreground",
									children: area.riesgos.length
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ jsx("span", {
									className: `rounded-full border px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[level]}`,
									children: LEVEL_LABELS[level]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsxs("span", {
										className: `inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${estadoMeta.border} ${estadoMeta.bg} ${estadoMeta.color}`,
										children: [/* @__PURE__ */ jsx("span", { className: `h-1 w-1 rounded-full ${estadoMeta.dot}` }), estadoMeta.label]
									}), /* @__PURE__ */ jsx(MiniBar, {
										value: area.cumplimiento,
										estado: area.estado
									})]
								})
							})
						]
					}, area.id);
				}), sorted.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: 6,
					className: "px-4 py-12 text-center text-sm text-muted-foreground",
					children: "No hay áreas con los filtros actuales."
				}) })] })]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "border-t border-border px-4 py-2 text-right text-xs text-muted-foreground",
			children: [
				sorted.length,
				" área",
				sorted.length !== 1 ? "s" : ""
			]
		})]
	});
}
//#endregion
//#region src/components/security-map/StatsPanel.tsx
var allRisks = areas.flatMap((a) => a.riesgos);
var totalAreas = areas.length;
var uniqueRisks = new Set(allRisks).size;
var totalTeams = new Set(areas.map((a) => a.equipo)).size;
var dangerCount = areas.filter((a) => getMaxRiskLevel(a.riesgos) === "danger").length;
var vencidoCount = areas.filter((a) => a.estado === "vencido").length;
var chartTooltipStyle = {
	background: "#1a1f35",
	border: "1px solid rgba(255,255,255,0.08)",
	borderRadius: "8px",
	color: "#e2e8f0",
	fontSize: "12px"
};
function StatsPanel() {
	const [open, setOpen] = useState(false);
	const [tab, setTab] = useState("general");
	const riskCategoryData = useMemo(() => RISK_CATEGORIES.map((cat) => ({
		name: cat.label,
		count: allRisks.filter((r) => getRiskCategory(r) === cat.id).length,
		fill: cat.hex
	})), []);
	const teamData = useMemo(() => [...new Set(areas.map((a) => a.equipo))].map((equipo) => ({
		name: equipo,
		value: areas.filter((a) => a.equipo === equipo).length,
		fill: (TEAM_META[equipo] ?? DEFAULT_TEAM_META).hex
	})), []);
	const latestKpi = KPI_MENSUAL[KPI_MENSUAL.length - 1];
	const prevKpi = KPI_MENSUAL[KPI_MENSUAL.length - 2];
	const kpiTrend = latestKpi.cumplimiento - prevKpi.cumplimiento;
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			id: "stats-panel-toggle",
			"aria-expanded": open,
			onClick: () => setOpen((o) => !o),
			className: "flex w-full items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-accent/10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-sm font-semibold text-foreground",
						children: [/* @__PURE__ */ jsx(BarChart2, { className: "h-4 w-4 text-amber-400" }), "Dashboard de Seguridad"]
					}),
					/* @__PURE__ */ jsx(MetricPill, {
						icon: /* @__PURE__ */ jsx(Shield, { className: "h-3 w-3" }),
						label: `${totalAreas} áreas`
					}),
					/* @__PURE__ */ jsx(MetricPill, {
						icon: /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }),
						label: `${uniqueRisks} riesgos únicos`
					}),
					/* @__PURE__ */ jsx(MetricPill, {
						icon: /* @__PURE__ */ jsx(Users2, { className: "h-3 w-3" }),
						label: `${totalTeams} equipos`
					}),
					/* @__PURE__ */ jsx(MetricPill, {
						icon: /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-red-400" }),
						label: `${dangerCount} en Peligro`,
						danger: true
					}),
					vencidoCount > 0 && /* @__PURE__ */ jsx(MetricPill, {
						icon: /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-orange-400" }),
						label: `${vencidoCount} vencidas`,
						warning: true
					}),
					/* @__PURE__ */ jsx(MetricPill, {
						icon: /* @__PURE__ */ jsx(ClipboardCheck, { className: "h-3 w-3 text-emerald-400" }),
						label: `KPI ${latestKpi.cumplimiento}% (${latestKpi.mesCorto})`,
						success: true
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "shrink-0 text-muted-foreground",
				children: open ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
			})]
		}), open && /* @__PURE__ */ jsxs("div", {
			className: "border-t border-border",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-1 border-b border-border px-5 pt-4",
					children: [/* @__PURE__ */ jsxs(TabBtn, {
						id: "tab-general",
						active: tab === "general",
						onClick: () => setTab("general"),
						children: [/* @__PURE__ */ jsx(BarChart2, { className: "h-3.5 w-3.5" }), "General"]
					}), /* @__PURE__ */ jsxs(TabBtn, {
						id: "tab-kpi",
						active: tab === "kpi",
						onClick: () => setTab("kpi"),
						children: [/* @__PURE__ */ jsx(ClipboardCheck, { className: "h-3.5 w-3.5" }), "KPIs Prerrequisitos"]
					})]
				}),
				tab === "general" && /* @__PURE__ */ jsx("div", {
					className: "px-5 pb-5",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-6 pt-5 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
							children: "Frecuencia por categoría de riesgo"
						}), /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: 190,
							children: /* @__PURE__ */ jsxs(BarChart, {
								data: riskCategoryData,
								layout: "vertical",
								margin: {
									left: 0,
									right: 16,
									top: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsx(XAxis, {
										type: "number",
										hide: true
									}),
									/* @__PURE__ */ jsx(YAxis, {
										type: "category",
										dataKey: "name",
										width: 110,
										tick: {
											fill: "#94a3b8",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										cursor: { fill: "rgba(255,255,255,0.04)" },
										contentStyle: chartTooltipStyle,
										formatter: (v) => [`${v} ocurrencias`, "Conteo"]
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "count",
										radius: [
											0,
											5,
											5,
											0
										],
										children: riskCategoryData.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: entry.fill }, entry.name))
									})
								]
							})
						})] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("p", {
								className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
								children: "Distribución de áreas por equipo"
							}),
							/* @__PURE__ */ jsx(ResponsiveContainer, {
								width: "100%",
								height: 190,
								children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
									data: teamData,
									dataKey: "value",
									nameKey: "name",
									cx: "40%",
									cy: "50%",
									outerRadius: 78,
									innerRadius: 40,
									paddingAngle: 2,
									children: teamData.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: entry.fill }, entry.name))
								}), /* @__PURE__ */ jsx(Tooltip, {
									contentStyle: chartTooltipStyle,
									formatter: (v, name) => [`${v} áreas`, name]
								})] })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-2 flex flex-wrap gap-x-3 gap-y-1.5",
								children: teamData.map((t) => /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1 text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ jsx("span", {
										className: "h-2 w-2 rounded-full",
										style: { background: t.fill }
									}), t.name]
								}, t.name))
							})
						] })]
					})
				}),
				tab === "kpi" && /* @__PURE__ */ jsxs("div", {
					className: "px-5 pb-5 pt-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ jsx(KpiCard, {
								icon: /* @__PURE__ */ jsx(Target, { className: "h-4 w-4 text-emerald-400" }),
								label: "Cumplimiento Jun",
								value: `${latestKpi.cumplimiento}%`,
								trend: kpiTrend > 0 ? `+${kpiTrend}pp vs. mayo` : `${kpiTrend}pp vs. mayo`,
								trendUp: kpiTrend >= 0
							}),
							/* @__PURE__ */ jsx(KpiCard, {
								icon: /* @__PURE__ */ jsx(ClipboardCheck, { className: "h-4 w-4 text-sky-400" }),
								label: "Auditorías Jun",
								value: `${latestKpi.auditoriasRealizadas}/${latestKpi.auditoriasPlaneadas}`,
								trend: `${Math.round(latestKpi.auditoriasRealizadas / latestKpi.auditoriasPlaneadas * 100)}% ejecución`,
								trendUp: latestKpi.auditoriasRealizadas >= latestKpi.auditoriasPlaneadas
							}),
							/* @__PURE__ */ jsx(KpiCard, {
								icon: /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-amber-400" }),
								label: "Obs. abiertas",
								value: `${latestKpi.observacionesAbiertas}`,
								trend: `${latestKpi.observacionesCerradas} cerradas en Jun`,
								trendUp: latestKpi.observacionesAbiertas < prevKpi.observacionesAbiertas
							}),
							/* @__PURE__ */ jsx(KpiCard, {
								icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-violet-400" }),
								label: "Acciones correct.",
								value: `${latestKpi.accionesCerradas}/${latestKpi.accionesCorrectivas}`,
								trend: "Cerradas en Jun",
								trendUp: latestKpi.accionesCerradas >= latestKpi.accionesCorrectivas
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
							children: "Tendencia cumplimiento (Ene – Jun 2026)"
						}), /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: 200,
							children: /* @__PURE__ */ jsxs(LineChart, {
								data: KPI_MENSUAL,
								margin: {
									left: -20,
									right: 10,
									top: 4,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "mesCorto",
										tick: {
											fill: "#94a3b8",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(YAxis, {
										domain: [60, 100],
										tick: {
											fill: "#94a3b8",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										tickFormatter: (v) => `${v}%`
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										contentStyle: chartTooltipStyle,
										formatter: (v) => [`${v}%`, "Cumplimiento"]
									}),
									/* @__PURE__ */ jsx(Line, {
										type: "monotone",
										dataKey: "cumplimiento",
										stroke: "#34d399",
										strokeWidth: 2.5,
										dot: {
											fill: "#34d399",
											r: 4,
											strokeWidth: 0
										},
										activeDot: {
											r: 6,
											fill: "#34d399"
										}
									})
								]
							})
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
							children: "Observaciones abiertas vs. cerradas"
						}), /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: 200,
							children: /* @__PURE__ */ jsxs(BarChart, {
								data: KPI_MENSUAL,
								margin: {
									left: -20,
									right: 10,
									top: 4,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "mesCorto",
										tick: {
											fill: "#94a3b8",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(YAxis, {
										tick: {
											fill: "#94a3b8",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(Tooltip, { contentStyle: chartTooltipStyle }),
									/* @__PURE__ */ jsx(Legend, {
										wrapperStyle: {
											fontSize: "10px",
											color: "#94a3b8",
											paddingTop: "8px"
										},
										formatter: (value) => value === "observacionesAbiertas" ? "Abiertas" : "Cerradas"
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "observacionesAbiertas",
										name: "observacionesAbiertas",
										fill: "#f87171",
										radius: [
											3,
											3,
											0,
											0
										],
										maxBarSize: 20
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "observacionesCerradas",
										name: "observacionesCerradas",
										fill: "#34d399",
										radius: [
											3,
											3,
											0,
											0
										],
										maxBarSize: 20
									})
								]
							})
						})] })]
					})]
				})
			]
		})]
	});
}
function MetricPill({ icon, label, danger, warning, success }) {
	return /* @__PURE__ */ jsxs("span", {
		className: `flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${danger ? "border-red-500/30 bg-red-500/10 text-red-300" : warning ? "border-orange-500/30 bg-orange-500/10 text-orange-300" : success ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-border bg-background/40 text-muted-foreground"}`,
		children: [icon, label]
	});
}
function TabBtn({ id, active, onClick, children }) {
	return /* @__PURE__ */ jsx("button", {
		id,
		type: "button",
		onClick,
		className: `flex items-center gap-1.5 rounded-t-lg border-b-2 px-4 pb-3 text-xs font-semibold transition-colors ${active ? "border-amber-400 text-amber-300" : "border-transparent text-muted-foreground hover:text-foreground"}`,
		children
	});
}
function KpiCard({ icon, label, value, trend, trendUp }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-border bg-background/40 p-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-center gap-1.5",
				children: [icon, /* @__PURE__ */ jsx("span", {
					className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
					children: label
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xl font-bold text-foreground",
				children: value
			}),
			/* @__PURE__ */ jsx("p", {
				className: `mt-1 text-[10px] ${trendUp ? "text-emerald-400" : "text-red-400"}`,
				children: trend
			})
		]
	});
}
//#endregion
//#region src/components/security-map/RankingView.tsx
var teamLeaders = {
	"LOS PANCHITOS": "JOSE FRANCISCO TORRES LÓPEZ",
	"MASH-RAINBOW": "RODRÍGUEZ RANGEL JOSÉ LUIS",
	"NAHUALES": "LUIS MANUEL GARCIA VICTORIO",
	"LOS CAZADORES DEL AMARGOR": "FATIMA NEDITH GOMEZ MIRELES",
	"CUCHILLAS": "JUAN SALAZAR BANDA",
	"MOSTO-BOYS": "OBED CALVILLO RAMIREZ"
};
function RankingView() {
	const [rankings, setRankings] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		const unsubscribe = onSnapshot(query(collection(db, "evaluaciones")), (snapshot) => {
			const records = snapshot.docs.map((doc) => ({
				areaId: doc.data().areaId,
				cumplimiento: doc.data().cumplimiento || 0
			}));
			const areaStats = /* @__PURE__ */ new Map();
			records.forEach((record) => {
				const current = areaStats.get(record.areaId) || {
					total: 0,
					count: 0
				};
				areaStats.set(record.areaId, {
					total: current.total + record.cumplimiento,
					count: current.count + 1
				});
			});
			const rankingData = [];
			areas.forEach((area) => {
				const stats = areaStats.get(area.id);
				if (stats && stats.count > 0) rankingData.push({
					id: area.id,
					nombre: area.nombre,
					equipo: area.equipo,
					responsable: area.responsable,
					promedio: Math.round(stats.total / stats.count),
					totalEvaluaciones: stats.count
				});
			});
			rankingData.sort((a, b) => b.promedio - a.promedio);
			setRankings(rankingData);
			setLoading(false);
		}, (error) => {
			console.error("Error fetching ranking: ", error);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);
	if (loading) return /* @__PURE__ */ jsxs("div", {
		className: "flex h-[60vh] flex-col items-center justify-center text-muted-foreground gap-4",
		children: [/* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-[#1e3a8a]" }), /* @__PURE__ */ jsx("p", { children: "Cargando tabla de posiciones..." })]
	});
	if (rankings.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "flex h-[60vh] flex-col items-center justify-center text-muted-foreground gap-4",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex h-20 w-20 items-center justify-center rounded-full bg-background/50 border-2 border-dashed border-border",
			children: /* @__PURE__ */ jsx(Target, { className: "h-8 w-8 opacity-50" })
		}), /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-lg font-bold text-foreground",
				children: "Aún no hay datos suficientes"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm mt-1",
				children: "Realiza evaluaciones en las diferentes áreas para generar la tabla."
			})]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto space-y-8 pb-12",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4 bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-center h-14 w-14 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] dark:text-blue-400",
				children: /* @__PURE__ */ jsx(Trophy, { className: "h-7 w-7" })
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-extrabold text-[#1e3a8a] dark:text-blue-400 uppercase tracking-tight",
				children: "Tabla de Posiciones de Seguridad"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground mt-0.5",
				children: "Ranking general basado en inspecciones y evaluaciones de las áreas"
			})] })]
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full overflow-x-auto rounded-t-lg shadow-md border border-[#1e3a8a]/20",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm text-left border-collapse bg-white dark:bg-card",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "bg-[#1e3a8a] text-white text-[11px] font-bold uppercase tracking-wider",
					children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "px-4 py-4 text-center border-r border-white/20 w-16",
							children: "#"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-4 border-r border-white/20 w-56",
							children: "Área / Zona"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-4 border-r border-white/20 w-64",
							children: "Responsable del área"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-4 py-4 text-center border-r border-white/20 w-40",
							children: "Equipo Autónomo"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-4 border-r border-white/20 w-64",
							children: "Líder de equipo autónomo"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-4 py-4 text-center border-r border-white/20 w-32",
							children: "Inspecciones"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-6 py-4 text-center w-32",
							children: "Cumplimiento"
						})
					] })
				}), /* @__PURE__ */ jsx("tbody", {
					className: "divide-y divide-border",
					children: rankings.map((area, index) => {
						const isRed = area.promedio < 85;
						const isTop = index < 3;
						const teamLeader = teamLeaders[area.equipo] || "LÍDER ASIGNADO";
						return /* @__PURE__ */ jsxs("tr", {
							className: `group transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${isTop ? "bg-amber-50/30 dark:bg-amber-900/10" : ""}`,
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-6 text-center border-r border-border align-middle",
									children: /* @__PURE__ */ jsx("span", {
										className: `text-base font-black ${isTop ? "text-amber-500" : "text-slate-400"}`,
										children: index + 1
									})
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-6 py-6 border-r border-border align-middle",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-bold text-base text-foreground",
										children: area.nombre
									}), isRed && /* @__PURE__ */ jsx("div", {
										className: "mt-1 inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 uppercase",
										children: "Zona Crítica"
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 border-r border-border align-middle",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx(Avatar, {
											name: area.responsable,
											className: "h-12 w-12 shrink-0 rounded-md shadow-sm border border-border"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold text-sm leading-tight text-foreground uppercase",
												children: area.responsable
											}), /* @__PURE__ */ jsx("div", {
												className: "inline-flex items-center px-1.5 py-0.5 rounded-sm bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-[10px] font-bold border border-teal-200 dark:border-teal-800 uppercase mt-1 w-fit",
												children: "LÍDER ASIGNADO"
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-4 border-r border-border text-center align-middle",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center justify-center gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "relative h-14 w-14 overflow-hidden rounded-lg border border-border shadow-sm bg-black",
											children: /* @__PURE__ */ jsx(TeamLogo, {
												team: area.equipo,
												className: "h-full w-full object-cover"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-bold text-[#1e3a8a] dark:text-blue-400 uppercase tracking-wider text-center px-2",
											children: area.equipo
										})]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 border-r border-border align-middle",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx(Avatar, {
											name: teamLeader,
											className: "h-12 w-12 shrink-0 rounded-full shadow-md border-2 border-slate-200 dark:border-slate-700"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold text-sm leading-tight text-foreground uppercase",
												children: teamLeader
											}), /* @__PURE__ */ jsx("div", {
												className: "inline-flex items-center px-1.5 py-0.5 rounded-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] font-bold border border-indigo-200 dark:border-indigo-800 uppercase mt-1 w-fit",
												children: "LÍDER DE EQUIPO"
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-6 border-r border-border text-center align-middle",
									children: /* @__PURE__ */ jsx("div", {
										className: "inline-flex items-center justify-center h-8 px-4 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-bold text-sm",
										children: area.totalEvaluaciones
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-6 text-center align-middle",
									children: /* @__PURE__ */ jsx("div", {
										className: "flex flex-col items-center justify-center",
										children: /* @__PURE__ */ jsxs("div", {
											className: "w-24 overflow-hidden rounded border border-border shadow-sm",
											children: [/* @__PURE__ */ jsx("div", {
												className: `py-1 text-[10px] font-bold text-white uppercase ${isRed ? "bg-red-600" : isTop ? "bg-amber-500" : "bg-[#1e3a8a]"}`,
												children: "PROMEDIO"
											}), /* @__PURE__ */ jsxs("div", {
												className: "bg-white dark:bg-card py-2 text-xl font-black text-[#1e3a8a] dark:text-foreground",
												children: [area.promedio, "%"]
											})]
										})
									})
								})
							]
						}, area.id);
					})
				})]
			})
		})]
	});
}
//#endregion
//#region src/lib/export.ts
/**
* Exports the given areas array as a UTF-8 CSV file with BOM
* (so Excel opens it correctly with Spanish characters).
*/
function exportCSV(areasToExport, filename = "seguridad-industrial.csv") {
	const csv = [[
		"ID",
		"Área",
		"Equipo",
		"Responsable",
		"Riesgos",
		"# Riesgos"
	].join(","), ...areasToExport.map((a) => [
		a.id,
		`"${a.nombre.replace(/"/g, "\"\"")}"`,
		`"${a.equipo.replace(/"/g, "\"\"")}"`,
		`"${a.responsable.replace(/"/g, "\"\"")}"`,
		`"${a.riesgos.join(" | ").replace(/"/g, "\"\"")}"`,
		a.riesgos.length
	].join(","))].join("\n");
	const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}
/**
* Triggers the browser print dialog, which can save to PDF.
* The @media print styles in styles.css hide non-essential UI elements.
*/
function exportPDF() {
	window.print();
}
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = DialogPrimitive.Root;
var SheetPortal = DialogPrimitive.Portal;
var SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
var SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Index() {
	const { area: initialArea, vista: initialVista } = Route.useSearch();
	const navigate = useNavigate({ from: "/" });
	const [selectedId, setSelectedId] = useState(initialArea ?? null);
	const [vista, setVista] = useState(initialVista ?? "mapa");
	const [theme, setTheme] = useState("dark");
	const [sheetOpen, setSheetOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeEquipos, setActiveEquipos] = useState(/* @__PURE__ */ new Set());
	const [activeCategorias, setActiveCategorias] = useState(/* @__PURE__ */ new Set());
	const [activeResponsable, setActiveResponsable] = useState("");
	const [activeEstados, setActiveEstados] = useState(/* @__PURE__ */ new Set());
	const filteredAreas = useMemo(() => {
		let result = areas;
		if (query.trim()) {
			const q = query.toLowerCase();
			result = result.filter((a) => a.nombre.toLowerCase().includes(q) || a.responsable.toLowerCase().includes(q) || a.equipo.toLowerCase().includes(q) || a.riesgos.some((r) => r.toLowerCase().includes(q)));
		}
		if (activeEquipos.size > 0) result = result.filter((a) => activeEquipos.has(a.equipo));
		if (activeCategorias.size > 0) result = result.filter((a) => a.riesgos.some((r) => activeCategorias.has(getRiskCategory(r))));
		if (activeResponsable) result = result.filter((a) => a.responsable === activeResponsable);
		if (activeEstados.size > 0) result = result.filter((a) => activeEstados.has(a.estado));
		return result;
	}, [
		query,
		activeEquipos,
		activeCategorias,
		activeResponsable,
		activeEstados
	]);
	const selectedArea = areas.find((a) => a.id === selectedId) ?? null;
	function handleSelect(id) {
		setSelectedId(id);
		navigate({
			search: (prev) => ({
				...prev,
				area: id
			}),
			resetScroll: false
		});
	}
	function handleVistaChange(v) {
		setVista(v);
		navigate({
			search: (prev) => ({
				...prev,
				vista: v
			}),
			resetScroll: false
		});
	}
	function handleToggleEquipo(equipo) {
		setActiveEquipos((prev) => {
			const next = new Set(prev);
			next.has(equipo) ? next.delete(equipo) : next.add(equipo);
			return next;
		});
	}
	function handleToggleCategoria(cat) {
		setActiveCategorias((prev) => {
			const next = new Set(prev);
			next.has(cat) ? next.delete(cat) : next.add(cat);
			return next;
		});
	}
	function handleToggleEstado(estado) {
		setActiveEstados((prev) => {
			const next = new Set(prev);
			next.has(estado) ? next.delete(estado) : next.add(estado);
			return next;
		});
	}
	function clearAll() {
		setQuery("");
		setActiveEquipos(/* @__PURE__ */ new Set());
		setActiveCategorias(/* @__PURE__ */ new Set());
		setActiveResponsable("");
		setActiveEstados(/* @__PURE__ */ new Set());
	}
	function handleExportCSV() {
		exportCSV(filteredAreas);
		toast.success("CSV exportado", {
			description: `${filteredAreas.length} áreas · seguridad-industrial.csv`,
			duration: 3e3
		});
	}
	function handleExportPDF() {
		exportPDF();
		toast.info("Abriendo diálogo de impresión…", { duration: 2e3 });
	}
	return /* @__PURE__ */ jsxs("div", {
		className: `${theme} min-h-screen bg-background text-foreground`,
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-20 border-b border-border bg-card/60 backdrop-blur-md",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400",
							children: [/* @__PURE__ */ jsx(ShieldAlert, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("span", { className: "absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-background" })]
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-base font-bold leading-tight tracking-tight",
							children: "Mapa de Seguridad Industrial"
						}), /* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx(Activity, { className: "h-3 w-3 text-green-400" }),
								areas.length,
								" áreas · Sistema activo"
							]
						})] })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center rounded-lg border border-border bg-surface-zone p-0.5",
								children: [
									/* @__PURE__ */ jsxs("button", {
										id: "vista-mapa-btn",
										type: "button",
										onClick: () => handleVistaChange("mapa"),
										className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${vista === "mapa" ? "bg-amber-500/20 text-amber-300" : "text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ jsx(MapIcon, { className: "h-3.5 w-3.5" }), "Mapa"]
									}),
									/* @__PURE__ */ jsxs("button", {
										id: "vista-tabla-btn",
										type: "button",
										onClick: () => handleVistaChange("tabla"),
										className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${vista === "tabla" ? "bg-amber-500/20 text-amber-300" : "text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ jsx(TableIcon, { className: "h-3.5 w-3.5" }), "Tabla"]
									}),
									/* @__PURE__ */ jsx("button", {
										id: "vista-ranking-btn",
										type: "button",
										onClick: () => handleVistaChange("ranking"),
										className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${vista === "ranking" ? "bg-amber-500/20 text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]" : "text-muted-foreground hover:text-foreground"}`,
										children: "🏆 Ranking"
									})
								]
							}),
							/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs("button", {
									id: "export-btn",
									type: "button",
									className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
									children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5" }), "Exportar"]
								})
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-44",
								children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
									id: "export-csv-item",
									onClick: handleExportCSV,
									className: "gap-2 text-xs",
									children: [
										/* @__PURE__ */ jsx(FileDown, { className: "h-3.5 w-3.5" }),
										"Exportar CSV",
										filteredAreas.length < areas.length && /* @__PURE__ */ jsxs("span", {
											className: "ml-auto text-[10px] text-muted-foreground",
											children: [filteredAreas.length, " filas"]
										})
									]
								}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
									id: "export-pdf-item",
									onClick: handleExportPDF,
									className: "gap-2 text-xs",
									children: [/* @__PURE__ */ jsx(FileDown, { className: "h-3.5 w-3.5" }), "Imprimir / PDF"]
								})]
							})] }),
							/* @__PURE__ */ jsx("button", {
								id: "theme-toggle-btn",
								type: "button",
								"aria-label": "Cambiar tema",
								onClick: () => setTheme((t) => t === "dark" ? "light" : "dark"),
								className: "flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ jsx("button", {
								id: "settings-btn",
								type: "button",
								"aria-label": "Configuración",
								className: "flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								children: /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("main", {
				className: "mx-auto max-w-7xl space-y-4 px-6 py-6",
				children: vista === "ranking" ? /* @__PURE__ */ jsx(RankingView, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(StatsPanel, {}),
					/* @__PURE__ */ jsx(FilterBar, {
						query,
						onQueryChange: setQuery,
						activeEquipos,
						onToggleEquipo: handleToggleEquipo,
						activeCategorias,
						onToggleCategoria: handleToggleCategoria,
						activeResponsable,
						onResponsableChange: setActiveResponsable,
						activeEstados,
						onToggleEstado: handleToggleEstado,
						totalVisible: filteredAreas.length,
						onClearAll: clearAll
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-6 lg:items-start",
						children: [/* @__PURE__ */ jsx("div", {
							className: "min-w-0 flex-1",
							children: vista === "mapa" ? /* @__PURE__ */ jsx(PlantMap, {
								areas: filteredAreas,
								selectedId,
								onSelect: handleSelect
							}) : /* @__PURE__ */ jsx(TableView, {
								areas: filteredAreas,
								selectedId,
								onSelect: handleSelect
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "no-print hidden w-80 shrink-0 lg:sticky lg:top-[65px] lg:block lg:self-start",
							children: /* @__PURE__ */ jsx(DetailsPanel, { area: selectedArea })
						})]
					})
				] })
			}),
			/* @__PURE__ */ jsx(Sheet, {
				open: sheetOpen,
				onOpenChange: setSheetOpen,
				children: /* @__PURE__ */ jsxs(SheetContent, {
					side: "bottom",
					className: "no-print h-[72vh] overflow-y-auto rounded-t-2xl lg:hidden",
					children: [/* @__PURE__ */ jsx(SheetHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ jsx(SheetTitle, {
							className: "text-left text-sm text-muted-foreground",
							children: "Detalle del área"
						})
					}), /* @__PURE__ */ jsx(DetailsPanel, { area: selectedArea })]
				})
			})
		]
	});
}
//#endregion
export { Index as component };

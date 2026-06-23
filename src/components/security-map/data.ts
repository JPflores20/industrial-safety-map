export interface Area {
  id: string;
  nombre: string;
  responsable: string;
  equipo: string;
  riesgos: string[];
}

export const areas: Area[] = [
  {
    id: "cto-bombas",
    nombre: "Cuarto de Bombas",
    responsable: "Jaime López Chávez",
    equipo: "MASH-RAINBOW",
    riesgos: [
      "Caídas a desnivel",
      "Riesgo Eléctrico",
      "Objetos a baja altura",
      "Corriente estática",
    ],
  },
  {
    id: "planta-baja",
    nombre: "Planta Baja C 1 y 2",
    responsable: "Edgar Zamarrón Acosta",
    equipo: "MASH-RAINBOW",
    riesgos: [
      "Tránsito de montacargas",
      "Superficies calientes",
      "Atrapamiento",
    ],
  },
  {
    id: "mezanine",
    nombre: "Mezanine - Sección Cocedor/Macerador",
    responsable: "Omar Alberto Robles Sosa",
    equipo: "LOS CAZADORES DEL AMARGOR",
    riesgos: [
      "Espacios confinados",
      "Riesgo por obstáculos",
      "Temperaturas Altas",
    ],
  },
  {
    id: "subestacion",
    nombre: "Subestación Eléctrica 1",
    responsable: "Juan Antonio Rivera Najar",
    equipo: "NAHUALES",
    riesgos: [
      "Riesgo Eléctrico Alta Tensión",
      "Incendio",
      "Arco Eléctrico",
    ],
  },
];

export type RiskLevel = "danger" | "alert" | "warning";

export function classifyRisk(risk: string): RiskLevel {
  const r = risk.toLowerCase();
  if (/eléctric|electric|incendio|arco|alta tensión/.test(r)) return "danger";
  if (/caída|caida|atrapamiento|montacargas|confinad|obstácul|obstacul/.test(r))
    return "alert";
  return "warning";
}
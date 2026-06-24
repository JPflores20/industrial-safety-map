// ─── Risk Controls Map — Mejora 3 ────────────────────────────────────────────
// Mapa de riesgo → EPP requerido + medidas de control + norma/permiso aplicable
// Basado en el documento "Riesgos por area.pptx"

export interface RiskControl {
  epp: { icono: string; label: string }[];
  medidas: string[];
  norma?: string;
  permiso?: string;
}

// Match key is a lowercase regex fragment used against the risk string
export const RISK_CONTROLS: { match: RegExp; control: RiskControl }[] = [
  {
    match: /alta tensión|alto voltaje/,
    control: {
      epp: [
        { icono: "🧤", label: "Guantes dieléctricos clase 2" },
        { icono: "👓", label: "Careta anti-arco" },
        { icono: "🦺", label: "Ropa ignífuga" },
        { icono: "🥾", label: "Botas dieléctricas" },
      ],
      medidas: [
        "Aplicar procedimiento LOTO (Lockout/Tagout)",
        "Solo personal certificado en alta tensión",
        "Verificar ausencia de voltaje con detector homologado",
        "Mantener distancias de seguridad reglamentarias",
        "Prohibido trabajar solo — acompañante obligatorio",
      ],
      norma: "NOM-029-STPS / NFPA 70E",
      permiso: "Permiso de trabajo eléctrico de alta tensión",
    },
  },
  {
    match: /eléctric|electric|arco eléctrico|corriente estática/,
    control: {
      epp: [
        { icono: "🧤", label: "Guantes dieléctricos" },
        { icono: "👓", label: "Lentes de seguridad" },
        { icono: "🦺", label: "Ropa de algodón (antiestática)" },
        { icono: "🥾", label: "Botas dieléctricas" },
      ],
      medidas: [
        "Aplicar procedimiento LOTO antes de intervenir",
        "Verificar ausencia de tensión con multímetro",
        "No trabajar con manos húmedas",
        "Uso de herramientas aisladas",
        "Conectar a tierra equipos antes de manipular",
      ],
      norma: "NOM-029-STPS",
      permiso: "Permiso de trabajo eléctrico",
    },
  },
  {
    match: /explosión|explosion|polvos/,
    control: {
      epp: [
        { icono: "😷", label: "Respirador para polvos P100" },
        { icono: "👓", label: "Lentes herméticos" },
        { icono: "🦺", label: "Ropa antiestática" },
        { icono: "🧤", label: "Guantes de nitrilo" },
      ],
      medidas: [
        "Mantener concentración de polvo < 50 mg/m³",
        "Ventilación mecánica continua del área",
        "Eliminar fuentes de ignición (no celulares, no llamas)",
        "Revisión periódica de acumulación de polvo en superficies",
        "Sistema de supresión de explosión activo y verificado",
        "Prohibido fumar en un radio de 25 m",
      ],
      norma: "NOM-005-STPS / NFPA 652",
      permiso: "Permiso de trabajo en zona ATEX",
    },
  },
  {
    match: /incendio/,
    control: {
      epp: [
        { icono: "🧯", label: "Extintor portátil a la mano" },
        { icono: "🦺", label: "Ropa ignífuga" },
        { icono: "🧤", label: "Guantes de cuero" },
        { icono: "👓", label: "Careta de soldador" },
      ],
      medidas: [
        "Verificar extintor cargado antes de iniciar trabajo",
        "Remover materiales combustibles en radio de 3 m",
        "Colocar manta ignífuga alrededor del punto de trabajo",
        "Vigilante de fuego durante la operación y 30 min después",
        "Conocer ubicación de salidas de emergencia",
      ],
      norma: "NOM-002-STPS",
      permiso: "Permiso de trabajo en caliente",
    },
  },
  {
    match: /caliente|temperatura alta|superficies calientes/,
    control: {
      epp: [
        { icono: "🧤", label: "Guantes térmicos resistentes al calor" },
        { icono: "🦺", label: "Mandil de cuero" },
        { icono: "👓", label: "Lentes de seguridad" },
      ],
      medidas: [
        "Verificar temperatura de superficie antes de contacto",
        "No tocar superficies sin señalización de temperatura",
        "Hidratación frecuente — cada 20 minutos en zonas >35°C",
        "Rotación de personal en exposición prolongada al calor",
        "Señalización visible: 'Superficie Caliente'",
      ],
      norma: "NOM-015-STPS (estrés térmico)",
    },
  },
  {
    match: /temperatura baja/,
    control: {
      epp: [
        { icono: "🧥", label: "Ropa térmica de 3 capas" },
        { icono: "🧤", label: "Guantes térmicos" },
        { icono: "🧢", label: "Pasamontañas / gorro térmico" },
        { icono: "🥾", label: "Botas térmicas impermeables" },
      ],
      medidas: [
        "Límite de exposición: 45 minutos continuos en zona fría",
        "Zona de calentamiento disponible fuera del área",
        "Nunca ingresar solo a cuartos de refrigeración",
        "Verificar señal de alarma y comunicación antes de entrar",
        "Revisión diaria de estado de puertas de emergencia",
      ],
      norma: "NOM-015-STPS (estrés térmico por frío)",
    },
  },
  {
    match: /caída|caida|desnivel/,
    control: {
      epp: [
        { icono: "⛑️", label: "Casco de seguridad" },
        { icono: "🥾", label: "Botas con suela antiderrapante" },
        { icono: "🦺", label: "Chaleco de alta visibilidad" },
      ],
      medidas: [
        "Mantener pasillos y áreas de tránsito libres de obstáculos",
        "Señalizar desniveles con cinta amarilla / negro",
        "Revisar estado de pisos, escalones y guardas",
        "Buena iluminación en todo momento",
        "Reporte inmediato de pisos mojados o resbaladizos",
      ],
      norma: "NOM-001-STPS",
    },
  },
  {
    match: /alturas|altura/,
    control: {
      epp: [
        { icono: "🪝", label: "Arnés de cuerpo completo tipo A" },
        { icono: "⛑️", label: "Casco con barbuquejo" },
        { icono: "🥾", label: "Botas antiderrapantes" },
        { icono: "🧤", label: "Guantes de agarre" },
      ],
      medidas: [
        "Inspección del arnés y línea de vida antes de cada uso",
        "Anclar en punto certificado ≥ 2x el peso del trabajador",
        "Prohibido trabajar en alturas con viento >50 km/h",
        "Zona delimitada debajo del área de trabajo",
        "Dos puntos de anclaje simultáneos al desplazarse",
        "Certificación vigente del personal en trabajo en alturas",
      ],
      norma: "NOM-009-STPS",
      permiso: "Permiso de trabajo en alturas",
    },
  },
  {
    match: /atrapamiento/,
    control: {
      epp: [
        { icono: "🧤", label: "Guantes sin manguitos (no de tela suelta)" },
        { icono: "🦺", label: "Ropa ajustada sin partes sueltas" },
        { icono: "👓", label: "Lentes de seguridad" },
      ],
      medidas: [
        "Bloquear y etiquetar (LOTO) antes de cualquier intervención",
        "Verificar que todas las guardas estén instaladas",
        "Prohibido operar maquinaria con guardas removidas",
        "No usar joyería, relojes ni ropa suelta cerca de partes móviles",
        "Revisión de estado de guardas en cada turno",
      ],
      norma: "NOM-004-STPS",
      permiso: "Permiso de intervención en equipo",
    },
  },
  {
    match: /confinado|espacios confinados/,
    control: {
      epp: [
        { icono: "😷", label: "Equipo de respiración autónoma (SCBA)" },
        { icono: "🦺", label: "Arnés de rescate con trípode" },
        { icono: "📡", label: "Radio de comunicación" },
        { icono: "🔦", label: "Lámpara antiexplosiva" },
      ],
      medidas: [
        "Medición de atmósfera (O₂, LEL, CO, H₂S) antes de entrar",
        "Ventilación forzada mínima 10 minutos antes del ingreso",
        "Vigilante externo presente en todo momento",
        "Plan de rescate documentado y probado",
        "Máximo 2 personas en el interior simultáneamente",
        "Comunicación cada 5 minutos con el vigilante",
      ],
      norma: "NOM-033-STPS",
      permiso: "Permiso de entrada a espacio confinado",
    },
  },
  {
    match: /montacargas/,
    control: {
      epp: [
        { icono: "⛑️", label: "Casco de seguridad" },
        { icono: "🦺", label: "Chaleco de alta visibilidad" },
        { icono: "🥾", label: "Botas de seguridad punta de acero" },
      ],
      medidas: [
        "Respetar rutas peatonales y cruces señalizados",
        "Contacto visual obligatorio con operador antes de cruzar",
        "Velocidad máxima del montacargas: 8 km/h en interiores",
        "Bocina activa en todos los cruces ciegos",
        "No permanecer detrás del montacargas en movimiento",
        "Operador con licencia interna vigente",
      ],
      norma: "NOM-006-STPS",
    },
  },
  {
    match: /camiones|transito de camion/,
    control: {
      epp: [
        { icono: "⛑️", label: "Casco de seguridad" },
        { icono: "🦺", label: "Chaleco de alta visibilidad clase III" },
        { icono: "🥾", label: "Botas de seguridad" },
      ],
      medidas: [
        "Permanecer en zonas peatonales delimitadas",
        "No cruzar área de maniobra sin indicación del guía",
        "Uso de guía de tráfico para maniobras de reversa",
        "Velocidad máxima de vehículos en planta: 15 km/h",
        "Señal acústica y luminosa al retroceder",
      ],
      norma: "NOM-001-STPS (vías de tránsito)",
    },
  },
  {
    match: /corrosiv|químic/,
    control: {
      epp: [
        { icono: "🥽", label: "Lentes herméticos anti-salpicadura" },
        { icono: "🧤", label: "Guantes de neopreno largo" },
        { icono: "🦺", label: "Delantal resistente a químicos" },
        { icono: "😷", label: "Respirador con filtro químico" },
        { icono: "🥾", label: "Botas de hule resistentes a ácidos" },
      ],
      medidas: [
        "Leer SDS (Hoja de Seguridad) antes de manipular",
        "Regadera de emergencia verificada y desbloqueada",
        "Lava ojos accesible dentro de 10 segundos",
        "Recipientes etiquetados y cerrados cuando no se usan",
        "No mezclar químicos sin instrucción específica",
        "Zona de derrames con kit de contención disponible",
      ],
      norma: "NOM-018-STPS / NOM-114-SEMARNAT",
      permiso: "Manejo de sustancias peligrosas",
    },
  },
  {
    match: /radiac/,
    control: {
      epp: [
        { icono: "🧤", label: "Guantes de cuero grueso" },
        { icono: "👓", label: "Careta de soldador / vidrio UV5" },
        { icono: "🦺", label: "Mandil y mangas de cuero" },
        { icono: "😷", label: "Respirador para humos metálicos" },
      ],
      medidas: [
        "Delimitar área de radiación con biombos opacos",
        "Personal no involucrado: mínimo 3 m de distancia",
        "Verificar niveles de ventilación para humos de soldadura",
        "Dosímetro personal para operaciones prolongadas",
        "Pausas programadas fuera de la zona de radiación",
      ],
      norma: "NOM-013-STPS (radiaciones no ionizantes)",
    },
  },
  {
    match: /ruido/,
    control: {
      epp: [
        { icono: "🎧", label: "Tapones auditivos (NRR ≥ 29 dB)" },
        { icono: "🎧", label: "Orejeras para zonas >100 dB" },
      ],
      medidas: [
        "Límite de exposición sin EPP: 85 dB por 8 horas",
        "Rotación de personal en áreas >90 dB",
        "Audiometría anual obligatoria para personal expuesto",
        "Señalización: 'Zona de ruido intenso — EPP obligatorio'",
        "Programa de mantenimiento preventivo para reducir ruido en fuente",
      ],
      norma: "NOM-011-STPS",
    },
  },
  {
    match: /baja altura|objetos.*baja/,
    control: {
      epp: [
        { icono: "⛑️", label: "Casco de seguridad" },
        { icono: "👓", label: "Lentes de seguridad" },
      ],
      medidas: [
        "Señalizar obstáculos a baja altura con franjas amarillo/negro",
        "Colocar protectores de espuma en esquinas peligrosas",
        "Mantener iluminación adecuada en el área",
        "Revisión mensual del estado de la señalización",
      ],
      norma: "NOM-001-STPS",
    },
  },
];

export function getRiskControl(riesgo: string): RiskControl | null {
  const r = riesgo.toLowerCase();
  const match = RISK_CONTROLS.find((rc) => rc.match.test(r));
  return match ? match.control : null;
}

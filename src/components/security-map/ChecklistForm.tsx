import { useState } from "react";
import {
  ClipboardCheck,
  Building,
  Sparkles,
  BugOff,
  UserCheck,
  FlaskConical,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Save,
  X,
} from "lucide-react";
import type { Area } from "./data";

export interface EvaluationData {
  evaluador: string;
  cumplimiento: number;
  respuestas: Record<string, "cumple" | "no-cumple" | "na">;
  observaciones: Record<string, string>;
}

interface Props {
  area: Area;
  onClose: () => void;
  onSave: (data: EvaluationData) => void;
}

const CATEGORIAS = [
  {
    id: "infra",
    title: "Infraestructura y Mantenimiento",
    icon: <Building className="h-4 w-4" />,
    items: [
      "Los pisos deben ser resistentes al desgaste satisfaciendo lo que el proceso mismo demanda y resisitir los métodos y materiales limpieza utilizados. Deben ser impermeables y mantenerse en buen estado. Deben estar libres de burbujas de pintura o baldosas sueltas que puedan albergar contaminación microbiológica. Deben estar visiblemente limpios y libres de malos olores o acumulación excesiva de biopelículas y escombros.",
      "Los desagües están visiblemente limpios y libres de malos olores o acumulación excesiva de biopelículas y escombros (use linterna o flash)",
      "Las paredes y los techos deben ser construidas, terminadas y mantenidas para evitar la acumulación de suciedad, minimizar la condensación y el crecimiento de moho, y facilitar la limpieza. Las paredes interiores deben estar libres de signos de fugas anteriores no reparados, ingreso de humedad o condensación excesiva. Las paredes interiores no deben tener agujeros excesivos, grietas, pintura descascarada o acumulación de moho.",
      "Hay iluminación sufiente y adecuada para el correcto funcionamiento de los procesos, la inspección del producto y la limpieza efectiva. Todas las luces son inastillables o bien cuentan con cubiertas protectoras, la iluminación es adecuada para proporcionar un entorno de trabajo seguro.",
      "Debe proporcionarse una adecuada ventilación y extracción en areas de almacenamiento y de procesamiento de productos para evitar la condensación o polvo excesivo. El equipo utilizado para el movimiento del aire debe estar libre de polvo, fugas de aceite, tener rejillas articuladas funcionales, ser correctamente monitoreado y completamente funcionales. Los filtros ambientales deben ser utilizados según sea necesario y se sustituye de acuerdo a un cronograma definido.",
      "Donde se hacen las reparaciones temporales, estas deben ser controladas para garantizar que la inocuidad o la legalidad de producto no se pone en peligro. Estas medidas temporales deben ser reparadas de forma permanente lo antes posible y dentro de plazos de dos semanas a menos que se documente y justifique otra cosa.",
      "Las puertas deben mantenerse en buenas condiciones. Las puertas exteriores deben cerrar adecuadamente, sin espacios. Las puertas exteriores que abren a áreas de producto expuesto no deben dejarse abiertas cuando no se utilizan de inmediato, excepto en caso de emergencia. Cuando haya puertas que abran a áreas de producto no expuesto, deben tomarse precauciones para prevenir el ingreso de plagas. Las puertas exteriores y / o cortinas de aire proporcionan una barrera adecuada contra roedores, aves y la entrada de insectos (funcional, sellado, en buen estado).",
      "Toda el agua utilizada en la planta que pueden ponerse en contacto con el producto o superficies de conttacto con el mismo debe ser potable."
    ],
  },
  {
    id: "equipos",
    title: "Equipos de Producción y Limpieza",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      "Equipo de producción (recipientes, válvulas, bombas, tuberías, etc.) exteriores están limpios y libres de acumulación visible de polvo, manchas, el moho y la suciedad en general.",
      "Equipo de producción (válvulas, intercambiadores de calor, bombas, tuberías, instrumentos en linea, mirillas, válvulas de muestreo, etc.) están en buen estado y en general libres de fugas y otros defectos estructurales o funcionales.",
      "Equipo de producción (recipientes, válvulas, bombas, tuberías, etc.) se limpian (CIP) a la frecuencia mínima requerida con el flujo adecuado (velocidad), el tiempo, la presión, la temperatura y la concentración química. Registros de limpieza / prueba de limpieza debe mantenerse durante un mínimo de 18 meses.",
      "Equipos de limpieza no aptos para contacto con alimentos (productos químicos, cepillos, escobas, palas, etc.) se almacenan correctamente en armarios, estantes o ganchos, etiquetados como no-aptos para el contacto con los alimentos y se mantienen alejados de las herramientas de contacto con alimentos.",
      "Herramientas de producción (cepillos, escobas, palas, etc.) utilizados para la limpieza de los recipientes de producción se guardan en armarios, estantes o ganchos, etiquetados como contacto con los alimentos y se mantienen alejados de las herramientas de contacto no alimentarios. Herramientas de producción están en buenas condiciones, y se reemplazan cuando estan defectuosas.",
      "Todos los accesorios de producción (codos, reductores, juntas, empaques etc.) y las tuberias curvas deben ser limpiados en un baño desinfectante (totalmente sumergido) antes de ser colocado . El baño debe estar limpio y químicamente activo. Accesorios adicionales de producción y / o dispositivos de toma de muestras se guardan en armarios, estantes o ganchos y debidamente etiquetados segun 5S. Accesorios de producción están en buenas condiciones y limpias.",
      "Mangueras de produccion (en contacto con alimentos) se almacenan fuera del piso, con ambos extremos tapados, en buenas condiciones y limpias.",
      "Equipo de medición se mantiene correctamente, limpio, calibrado según sea necesario y en buenas condiciones. Los registros de calibración se mantienen por 3 años mínimo.",
      "No hay piezas sueltas en la zona, por ejemplo: tornillos, o´rings, varillas de soldadura, etc.",
      "No se observa exceso de lubricacion en ningun equipo."
    ],
  },
  {
    id: "almacenamiento",
    title: "Almacenamiento y Materiales",
    icon: <ClipboardCheck className="h-4 w-4" />,
    items: [
      "Los contenedores secundarios son almacenados y etiquetados para cumplir adecuadamente con los requisitos de inocuidad de los alimentos. Envases secundarios se mantienen limpios y libres de residuos. Todos los recipientes utilizados para la medición y dispensación de los adjuntos y auxiliares tecnológicos deben estar debidamente etiquetados o codificados por colores, y se lavan a fondo después de su uso antes de ser almacenado en un lugar limpio y seco. Contenedores etiquetados sólo se deben utilizar (o contienen materiales) como se indica en su etiqueta.",
      "Materiales a granel y equipos se almacenan una distancia mínima de 45 cm (18 pulgadas) de las paredes. Materiales a granel se almacenan fuera del piso, en paletas/estibas limpias, bastidores, gabinetes o estantes para facilitar la limpieza. Los recipientes abiertos se cierran y sellan correctamente cuando no estan en uso.",
      "La madera no debe ser utilizada en áreas de productos abiertos, excepto cuando se trata de un requisito del proceso (por ejemplo, la maduración de los productos con madera). Cuando el uso de la madera no se puede evitar, la condición de la madera debe ser monitoreado continuamente para asegurarse de que está en buenas condiciones y libres de daños o astillas que puedan contaminar los productos",
      "Todos los materiales y equipos se almacenan fuera del piso en estibas limpias, bastidores o estantes.",
      "La planta cuenta con un área designada para la segregación / aislamiento de material/productos no conformessegún la política de bloqueo AB-InBev.",
      "Todos los lotes de materiales entrantes son inspeccionados para verificar su identidad, el certificado de análisis, y que este libre de daños por humedad, malos olores y / o infestación de plagas, y daños físicos. Se cumple FIFO para todos los materiales. Las fechas de caducidad, en su caso deben ser visibles en la etiqueta.",
      "Granos entrantes en camiones/contenedores/vagones son inspeccionados para verificar que estén bien cerrados / sellados y sin signos de manipulación durante el transporte. Se validan los sellos numerados contra la documentación del envío.",
      "El edificio / area de descarga de granos se mantiene cerrada en todo momento, excepto durante la entrada / salida de los camiones y las puertas y portones de acceso proporcionan una barrera adecuada contra roedores, aves o insectos, mientras que la entrada se encuentre cerrada.",
      "Los lotes de granos entrantes son inspeccionados (y se documenta) para verificar que estén libres de daños por humedad, malos olores y / o infestación de plagas antes de la descarga.",
      "Los equipos de limpieza / separacion de granos (tamiz, despedradores, imán, etc.) están en buenas condiciones y se limpian con regularidad.",
      "Existen instalaciones para asegurarse de que el lúpulo y otras materias primas sensibles a la temperatura se almacenan a la temperatura correcta. Temperatura de almacenamiento es controlada y monitoreada a diario. No se utilizan termómetros de mercurio.",
      "Las áreas de almacenamiento de lupulo se mantienen cerradas y aseguradas para evitar la entrada de plagas y el acceso no autorizado",
      "Los contenedores contenedores/frascos no se vuelven a utilizar para cualquier fin que no sea su propósito original. En caso de necesidad de negocio, se debe tener una evaluación de riesgos documentada y las medidas necesarias implementadas para justificar la reutilizacion con seguridad los contenedores (debera ser aprobado por Calidad)"
    ],
  },
  {
    id: "quimicos-plagas",
    title: "Plagas, Químicos y Vidrio",
    icon: <BugOff className="h-4 w-4" />,
    items: [
      "Trampas de control de plagas deben estar correctamente etiquetados y colocados dentro de la planta en ambos lados de todas las puertas exteriores. Las trampas de feromonas y matamoscas eléctrico (EFK) se deben utilizar cuando sea necesario. No hay evidencia visible de aves, roedores o plagas de insectos, tales como plumas, pelo, orina, excrementos, alas de insectos, telas de araña, etc (incluye la revision de tableros electricos para constatar que no hay evidencias alli tampoco)",
      "Vidrio u otros materiales quebradizos deben ser excluidos o protegidos contra la rotura en las zonas donde los productos abiertos se manipulen o existe el riesgo de contaminación del producto.",
      "Se requiere el control del uso de implementos afilados de metal, incluidos cuchillos, cuchillas de corte en equipos, agujas y hilos de corte. Cortadores/bisturis con hojas desprendibles no se deben utilizar.",
      "Los productos de limpieza, lubricantes o cualquier otro contaminante / químico potencial se almacenan lejos del producto y tanques abiertos. Todos los productos químicos / lubricantes de grado alimenticio deben separarse de los productos químicos / lubricantes que no sean de grado alimenticio. Los productos e ingredientes químicos y de grado alimenticio no se pueden almacenar en la misma área / habitación donde es posible la contaminación cruzada.",
      "Las estaciones de CIP y todos los puntos de dosificación deben estar claramente etiquetados con el nombre del producto químico que debe ser dosificado en ese lugar. Se conecta el producto químico correcto.",
      "Los contenedores con producos químicos deben estar claramente etiquetados por proveedor, incluyendo los íconos de SEGURIDAD. El lugar de almacenamiento del contenedor debe estar etiquetado también para asegurar que se segregan ácidos de álcalis y de sustancias oxidantes. Las sustancias oxidantes deben almacenarse sobre pallets de plástico, NO MADERA ¡¡¡ Todos los productos químicos deben almacernarse en contenedores secundarios para evitar contaminación o mezcla de productos químicos en el sistema de drenaje o daño al piso o a las coladeras. Las instrucciones de seguridad, hojas de seguridad y matrices de compatibilidad deben estar publicadas y deben ser respetadas en el área de almacenamiento."
    ],
  },
  {
    id: "personal",
    title: "Higiene, Personal y Seguridad",
    icon: <UserCheck className="h-4 w-4" />,
    items: [
      "Las salas de control, estaciones de trabajo, oficinas, áreas de mantenimiento y laboratorios satélite deben cumplir con las 5S, artículos personales almacenados adecuadamente, estar libre de alimentos / bebidas (a menos que se realice una evaluación de riesgos y el lavado de manos esté disponible ). Las reglas de distancia social y las rutinas de desinfección de las superficies están en en sitio.",
      "Baños y vestuarios de los empleados están limpios y completamente funcionales con carteles del procedimiento de lavado de manos en todos los baños.",
      "Los lockers y armarios son de tamaño suficiente para dar cabida a los objetos personales y deben ser provistos para todo el personal que trabaja en las áreas de manipulación de materias primas, preparación, procesamiento, empaque y almacenamiento.",
      "Las estaciones de lavado de manos, ubicadas por puntos de acceso de personal y en la proximidad de las áreas de procesamiento, se mantienen limpias y en pleno funcionamiento. Totalmente operativo se define como: (1) Suministro de agua potable, preferiblemente caliente en climas fríos donde el agua muy fría puede actuar como un elemento disuasorio para los empleados que se lavan las manos a fondo. (2) Sustancias efectivas para la limpieza y desinfección de las manos. (3) Servicio de toallas sanitarias o dispositivos de secado adecuados. (4) Señales fáciles de entender que indican a los empleados cómo se laven las manos. Las evaluaciones de riesgo deben considerarse cuando las estaciones de lavado de manos no se ubican inmediatamente en un punto de acceso a un área de producción.",
      "Los vestuarios de los empleados estan limpios y bien iluminados. La ropa de trabajo / uniformes / EPP deben ser almacenados por separado de la ropa personal.",
      "Los empleados comprendan y cumplen las políticas de plantas respecto de Equipo de Protección Personal (EPP). Los EPP usados por los operadores en general se encuentran limpios y en buenas condiciones. Las máscarillas están limpias, en buen estado y se usan correctamente. No se comparte EPP entre los empleados y existe un procedimiento para desinfectar el EPP.",
      "Todos los cortes y rasguños en la piel expuesta deben estar cubiertos por un aposito /banda de color apropiado que sea diferente del color del producto (preferiblemente azul). Estos deben ser emitidos y monitoreados por la compañía. Cuando sea apropiado, además del aposito/banda, se debe usar un guante. *** aposito: cubierta de gasa u otro material para las heridas.",
      "La ropa y la higiene personal de los empleados (salud personal, ropa limpia, lavado de manos, uñas recortadas, cobertura / sujeción del cabello, sin perfume excesivo o solucion excesiva para después del afeitado, etc.) reflejan su profesionalidad y comprensión de las BMP. Se sigue la política de joyas.",
      "Los alimentos o bebidas, incluyendo goma de mascar y los dulces, nunca se introducen o se consume en las áreas de producción, incluyendo las salas de control (comprobar los contenedores de basura para envolturas de dulces, bebidas, restos de comida, etc.). Sólo esta permitido el consumo de agua en recipientes de plástico están permitidos en las áreas de producción.",
      "Solo se fuma en las áreas designadas. No hay colillas de cigarrillos o cualquier otra evidencia de fumar en áreas no designadas. En estas areas habilitadas debe haber carteles indicando el lavado de manos despues de fumar. Se encuentran ceniceros u otras instalaciones adecuadas en el area de fumadores. No hay colillas de cigarrillos o cualquier otra evidencia de fumar en áreas no designadas.",
      "Áreas asignadas a los contratistas están claramente marcadas, son seguras y se encuentran en buenas condiciones (si NO OK, el jefe de proyecto de la planta esta involucrado). Esto incluye reglas de distanciamiento social y estaciones de lavado de manos."
    ],
  },
];

type Res = "cumple" | "no-cumple" | "na" | null;

export function ChecklistForm({ area, onClose, onSave }: Props) {
  const [evaluador, setEvaluador] = useState("");
  const [respuestas, setRespuestas] = useState<Record<string, Res>>({});
  const [observaciones, setObservaciones] = useState<Record<string, string>>({});

  const handleResp = (itemId: string, res: Res) => {
    setRespuestas((prev) => ({ ...prev, [itemId]: res }));
    if (res !== "no-cumple") {
      // Clear observation if changed from no-cumple
      setObservaciones((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
    }
  };

  const handleObs = (itemId: string, text: string) => {
    setObservaciones((prev) => ({ ...prev, [itemId]: text }));
  };

  // Calculate score
  let totalApplicable = 0;
  let totalComply = 0;
  
  Object.values(respuestas).forEach((r) => {
    if (r === "cumple") {
      totalComply++;
      totalApplicable++;
    } else if (r === "no-cumple") {
      totalApplicable++;
    }
    // "na" does not count towards totalApplicable
  });

  const percent = totalApplicable > 0 ? Math.round((totalComply / totalApplicable) * 100) : 0;
  const isComplete = 
    evaluador.trim() !== "" && 
    CATEGORIAS.flatMap(c => c.items).every(item => respuestas[item] !== undefined && respuestas[item] !== null);

  const getStatusColor = (val: number) => {
    if (val >= 85) return "text-emerald-400";
    if (val >= 65) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 sm:p-6 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-zone px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold text-foreground">Evaluación de Prerrequisitos</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Área: <span className="font-semibold text-foreground">{area.nombre}</span> • Resp: {area.responsable}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-background/50 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Evaluador Field */}
        <div className="bg-muted/30 border-b border-border px-6 py-4 shrink-0">
          <label className="text-sm font-bold text-foreground mb-2 block">
            Nombre del evaluador <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={evaluador}
            onChange={(e) => setEvaluador(e.target.value)}
            placeholder="Ej. Juan Pérez"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-8">
          {CATEGORIAS.map((cat) => (
            <section key={cat.id} className="space-y-4">
              <div className="space-y-3">
                {cat.items.map((item) => {
                  const r = respuestas[item];
                  return (
                    <div key={item} className="flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-3 transition-colors hover:border-border/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-sm text-foreground flex-1 leading-snug">{item}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleResp(item, "cumple")}
                            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
                              r === "cumple" 
                                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_-2px_rgba(52,211,153,0.3)]" 
                                : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"
                            }`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Cumple
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResp(item, "no-cumple")}
                            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
                              r === "no-cumple" 
                                ? "border-red-500/50 bg-red-500/20 text-red-400 shadow-[0_0_10px_-2px_rgba(248,113,113,0.3)]" 
                                : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"
                            }`}
                          >
                            <XCircle className="h-3.5 w-3.5" /> No Cumple
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResp(item, "na")}
                            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
                              r === "na" 
                                ? "border-slate-500/50 bg-slate-500/20 text-slate-300" 
                                : "border-border bg-background/50 text-muted-foreground hover:bg-surface-zone"
                            }`}
                          >
                            <MinusCircle className="h-3.5 w-3.5" /> N/A
                          </button>
                        </div>
                      </div>
                      
                      {/* Observation field when No Cumple */}
                      {r === "no-cumple" && (
                        <div className="mt-2 pl-2 border-l-2 border-red-500/30">
                          <input
                            type="text"
                            placeholder="Describa el hallazgo u observación..."
                            value={observaciones[item] || ""}
                            onChange={(e) => handleObs(item, e.target.value)}
                            className="w-full bg-background/50 border border-red-500/20 rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-surface-zone px-6 py-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Cumplimiento Calculado</span>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-black leading-none ${getStatusColor(percent)}`}>
                {percent}%
              </span>
              <span className="text-xs text-muted-foreground mb-1">
                ({totalComply}/{totalApplicable} aplicables)
              </span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => onSave({ evaluador: evaluador.trim(), cumplimiento: percent, respuestas: respuestas as any, observaciones })}
            disabled={!isComplete}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
              isComplete 
                ? "bg-amber-500 text-amber-950 hover:bg-amber-400 hover:shadow-[0_0_15px_-3px_rgba(251,191,36,0.5)]" 
                : "bg-surface-plant text-muted-foreground cursor-not-allowed border border-border/50"
            }`}
          >
            <Save className="h-4 w-4" />
            {isComplete ? "Guardar Evaluación" : "Completa todos los campos"}
          </button>
        </div>
      </div>
    </div>
  );
}

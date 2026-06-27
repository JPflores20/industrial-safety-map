import type { Area } from "@/components/security-map/data";

/**
 * Exporta el arreglo de áreas proporcionado como un archivo CSV en formato UTF-8 con BOM.
 * (El BOM asegura que Excel lo abra correctamente y mantenga los caracteres en español, como acentos y eñes).
 */
export function exportCSV(areasToExport: Area[], filename = "seguridad-industrial.csv") {
  const header = ["ID", "Área", "Equipo", "Responsable", "Riesgos", "# Riesgos"].join(",");

  const rows = areasToExport.map((a) =>
    [
      a.id,
      `"${a.nombre.replace(/"/g, '""')}"`,
      `"${a.equipo.replace(/"/g, '""')}"`,
      `"${a.responsable.replace(/"/g, '""')}"`,
      `"${a.riesgos.join(" | ").replace(/"/g, '""')}"`,
      a.riesgos.length,
    ].join(",")
  );

  const csv = [header, ...rows].join("\n");
  // El caracter BOM (Byte Order Mark) UTF-8 le indica a Excel cómo decodificar correctamente los caracteres

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Abre el diálogo de impresión del navegador, el cual permite guardar la vista como PDF.
 * Los estilos de impresión (@media print) en styles.css ocultan los elementos no esenciales (como botones y barras).
 */
export function exportPDF() {
  window.print();
}

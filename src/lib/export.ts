import type { Area } from "@/components/security-map/data";

/**
 * Exports the given areas array as a UTF-8 CSV file with BOM
 * (so Excel opens it correctly with Spanish characters).
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
  // UTF-8 BOM ensures Excel correctly decodes Spanish characters
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
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
export function exportPDF() {
  window.print();
}

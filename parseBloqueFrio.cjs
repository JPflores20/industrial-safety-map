const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "public", "Bloque frio.xlsx");
const workbook = XLSX.readFile(filePath);
const firstSheetName = workbook.SheetNames[0];
const firstSheet = workbook.Sheets[firstSheetName];
const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

const areas = [];
let currentIdPrefix = "";

for (let i = 5; i < data.length; i++) {
  const row = data[i];
  if (!row || row.length === 0) continue;
  
  // Row structure:
  // 1: No.
  // 2: ÁREA (Id like CFR-001)
  // 3: SUB ÁREA (Nombre)
  // 4: DUEÑOS LIDER
  // 5: SEGMENTACIÓN TERRITORIO
  // 6: DUEÑO(S) 1ERA LINEA
  // 7: NIVEL
  // 8: EQ AUTONOMO
  
  const no = row[1];
  const areaIdRaw = row[2];
  const areaNameRaw = row[3] || row[2]; // If no sub-area, use area name
  let lider = row[4];
  let territorio = row[5];
  let dueno1 = row[6];
  let eqAutonomo = row[8];
  
  // If no area name and no territory and no dueño, probably empty row
  if (!areaNameRaw && !territorio && !dueno1) continue;
  
  const nombre = (areaNameRaw || "Área sin nombre").toString().trim();
  const responsable = (dueno1 || lider || "Sin responsable").toString().trim();
  const equipo = (eqAutonomo || "Sin equipo").toString().trim();
  const terr = (territorio || "Sin territorio").toString().trim();
  
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const id = `bf-${slug}-${i}`;
  
  areas.push({
    id,
    nombre,
    responsable,
    equipo,
    riesgos: ["Riesgo a definir"],
    territorio: terr,
    ultimaInspeccion: "",
    proximaInspeccion: ""
  });
}

const fileContent = `import { Area } from "./data";\n\nexport const bloqueFrioAreas: Area[] = ${JSON.stringify(areas, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "src/components/security-map/bloqueFrioData.ts"), fileContent);
console.log("Created bloqueFrioData.ts with", areas.length, "areas");

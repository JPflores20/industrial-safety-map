const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "public/docs", "06 JUN APP1VPOQA3200 KPI Programa de Prerrequistos  Cerveza y SD 2026.xlsm");
const workbook = XLSX.readFile(filePath);
const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

const questions = [];
// Assuming column index 3 (0-indexed) is the Spanish text, based on previous output
for (let i = 0; i < data.length; i++) {
  const row = data[i];
  if (row && row[3] && typeof row[3] === 'string' && row[3].length > 20) {
    questions.push(row[3].trim().replace(/\r?\n|\r/g, " "));
  }
}

console.log(JSON.stringify(questions, null, 2));

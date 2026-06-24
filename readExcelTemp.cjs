const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "public/docs", "06 JUN APP1VPOQA3200 KPI Programa de Prerrequistos  Cerveza y SD 2026.xlsm");

if (!fs.existsSync(filePath)) {
  console.log("File not found:", filePath);
  process.exit(1);
}

const workbook = XLSX.readFile(filePath);
console.log("Sheets:", workbook.SheetNames);

const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

console.log("\nFirst 30 rows of the first sheet:");
for (let i = 0; i < 30 && i < data.length; i++) {
  console.log(data[i]);
}

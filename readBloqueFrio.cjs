const XLSX = require("xlsx");
const path = require("path");

const filePath = path.join(__dirname, "public", "Bloque frio.xlsx");
const workbook = XLSX.readFile(filePath);
const firstSheetName = workbook.SheetNames[0];
const firstSheet = workbook.Sheets[firstSheetName];
const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

console.log("Sheet Name:", firstSheetName);
console.log("Rows count:", data.length);
console.log("First 5 rows:");
console.log(JSON.stringify(data.slice(4, 15), null, 2));

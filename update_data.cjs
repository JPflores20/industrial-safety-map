const fs = require('fs');
let code = fs.readFileSync('src/components/security-map/data.ts', 'utf8');

// 1. Update type EstadoArea
code = code.replace(/export type EstadoArea = .+;/, 'export type EstadoArea = "al-dia" | "pendiente" | "retrasado";');

// 2. Update interface Area
code = code.replace(/  estado: EstadoArea;\n  cumplimiento: number; \/\/ 0–100\n/, '  territorio: string;\n');

// 3. Add getAreaStatus function right after interface
const func = `
export function getAreaStatus(ultimaInspeccion: string): EstadoArea {
  const hoy = new Date();
  const fechaInspeccion = new Date(ultimaInspeccion);
  
  // Si estamos en el mismo mes y año, está al día
  if (hoy.getFullYear() === fechaInspeccion.getFullYear() && hoy.getMonth() === fechaInspeccion.getMonth()) {
    return 'al-dia';
  }
  
  // Si no, revisamos qué día es hoy
  if (hoy.getDate() <= 10) {
    return 'pendiente';
  } else {
    return 'retrasado';
  }
}
`;
code = code.replace(/export const areas: Area\[\] = \[/, func + '\nexport const areas: Area[] = [');

// 4. Update the areas array
const territories = ['Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'];
let tIndex = 0;
// We look for: estado: "algo", cumplimiento: 123,
code = code.replace(/estado: "[^"]+", cumplimiento: \d+, /g, () => {
  const terr = territories[tIndex % 4];
  tIndex++;
  return `territorio: "${terr}", `;
});

// 5. Update ESTADO_META keys
code = code.replace(/"vencido": \{/, '"retrasado": {');
code = code.replace(/label: "Vencido",/, 'label: "Retrasado",');

fs.writeFileSync('src/components/security-map/data.ts', code);
console.log('Done');

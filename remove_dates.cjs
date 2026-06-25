const fs = require('fs');
const file = 'src/components/security-map/data.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/ultimaInspeccion: "[^"]*"/g, 'ultimaInspeccion: ""');
content = content.replace(/proximaInspeccion: "[^"]*"/g, 'proximaInspeccion: ""');
fs.writeFileSync(file, content);
console.log("Done");

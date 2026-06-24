const fs = require('fs');
const dataFile = fs.readFileSync('src/components/security-map/data.ts', 'utf8');

const responsables = [...new Set(Array.from(dataFile.matchAll(/responsable:\s*"([^"]+)"/g)).map(m => m[1]))];
const fotos = fs.readdirSync('public/fotos');

const map = {};
responsables.forEach(r => {
  // exact match
  let exact = fotos.find(f => f.replace('.jpeg', '').toLowerCase() === r.toLowerCase());
  if (exact) { map[r] = exact; return; }

  // parts match
  const parts = r.split(' ');
  const p1 = parts[0];
  const p2 = parts[1] || '';
  
  let partial = fotos.find(f => f.includes(p1) && f.includes(p2));
  if (partial) { map[r] = partial; return; }

  map[r] = null;
});

console.log(JSON.stringify(map, null, 2));

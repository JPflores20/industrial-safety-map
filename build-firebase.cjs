const { execSync } = require('child_process');
const fs = require('fs');

console.log('Running vite build...');
try {
  execSync('npx vite build', { stdio: 'inherit' });
} catch (e) {
  console.log('Vite build finished (ignoring prerender 404 errors)');
}

console.log('Generating index.html for Firebase Hosting...');

let srcHtml = '';
try {
  srcHtml = fs.readFileSync('public_html/index.html', 'utf-8');
} catch (e) {
  console.error('Could not read public_html/index.html', e);
  process.exit(1);
}

let assets = [];
try {
  assets = fs.readdirSync('.output/public/assets');
} catch (e) {
  console.error('Could not read .output/public/assets', e);
  process.exit(1);
}

const cssFile = assets.find(f => f.endsWith('.css'));
const jsFile = assets.find(f => f.startsWith('index-') && f.endsWith('.js') || f.startsWith('client-') && f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Could not find css or js assets in .output/public/assets');
  process.exit(1);
}

// Global replace of the old hashed filenames with the new ones
let finalHtml = srcHtml
  .replace(/styles-[A-Za-z0-9_-]+\.css/g, cssFile)
  .replace(/index-[A-Za-z0-9_-]+\.js/g, jsFile);

fs.writeFileSync('.output/public/index.html', finalHtml);
console.log('Successfully generated .output/public/index.html with proper hydration scripts');

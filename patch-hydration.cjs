const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public_html', 'assets');
const files = fs.readdirSync(assetsDir);

for (const file of files) {
  if (file.startsWith('index-') && file.endsWith('.js')) {
    const filePath = path.join(assetsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace .hydrateRoot(document, ...) with .createRoot(document.getElementById('root')).render(...)
    // The exact string in the minified bundle usually looks like:
    // (0,vF.hydrateRoot)(document, ... )
    // We can use a regex to find hydrateRoot(document, and replace it
    
    const hydrateRegex = /\(\d+,\s*[a-zA-Z0-9_$]+\.hydrateRoot\)\(document,/g;
    if (hydrateRegex.test(content)) {
      content = content.replace(hydrateRegex, 'window.myCreateRoot(document.getElementById("root")).render(');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully patched hydrateRoot in ${file}`);
    } else {
      console.log(`Could not find hydrateRoot in ${file}`);
    }
  }
}

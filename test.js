const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);

let code = `
  const document = { 
    getElementById: (id) => ({ id, innerHTML: "", querySelectorAll: () => [], querySelector: () => ({ textContent: "" }), addEventListener: () => {} }), 
    querySelectorAll: () => [], 
    querySelector: () => ({ classList: { toggle: () => {} } }) 
  }; 
  const window = { document, addEventListener: () => {}, scrollY: 0, scrollTo: () => {} };
`;

for (const script of scripts) {
  code += `\n// --- ${script} ---\n` + fs.readFileSync(script, 'utf8');
}

try {
  eval(code);
  console.log("No error!");
} catch(e) {
  console.error("Error evaluating:", e);
}
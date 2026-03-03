const fs = require("fs");
const path = require("path");

const esmDir = path.join(__dirname, "..", "dist", "esm");

function renameToMjs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) renameToMjs(full);
    else if (e.name.endsWith(".js") && !e.name.endsWith(".d.ts")) {
      const newPath = full.replace(/\.js$/, ".mjs");
      fs.renameSync(full, newPath);
    }
  }
}

function fixMjsImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) fixMjsImports(full);
    else if (e.name.endsWith(".mjs")) {
      let content = fs.readFileSync(full, "utf8");
      content = content.replace(/from\s+["'](\.\/[^"']+)(\.js)?["']/g, 'from "$1.mjs"');
      fs.writeFileSync(full, content);
    }
  }
}

renameToMjs(esmDir);
fixMjsImports(esmDir);

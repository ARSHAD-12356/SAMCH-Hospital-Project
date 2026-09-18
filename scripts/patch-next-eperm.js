/**
 * Permanent fix for Windows EPERM / EBUSY error on Next.js dev server.
 * Handles:
 * 1. readdirSync / scandir inside Next.js recursiveDelete
 * 2. mkdir on .next/dev/types inside route-types-utils.js
 */
const fs = require('fs');
const path = require('path');

const recursiveDeleteFiles = [
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'lib', 'recursive-delete.js'),
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'esm', 'lib', 'recursive-delete.js'),
];

for (const filePath of recursiveDeleteFiles) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes("e.code === 'ENOENT'") && !content.includes("e.code === 'EPERM'")) {
    content = content.replace(
      /if\s*\((.*?e\.code\s*===\s*'ENOENT'.*?)\)/g,
      "if ($1 || e.code === 'EPERM' || e.code === 'EBUSY' || e.code === 'EACCES')"
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[patch-next-eperm] Patched recursive-delete:', path.basename(filePath));
  }
}

const routeTypeFiles = [
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'server', 'lib', 'router-utils', 'route-types-utils.js'),
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'esm', 'server', 'lib', 'router-utils', 'route-types-utils.js'),
];

for (const filePath of routeTypeFiles) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Safe mkdir wrapper that catches EPERM / EEXIST
  if (!content.includes('safeMkdir')) {
    content = `
async function safeMkdir(dir) {
  try {
    await _fs.default.promises.mkdir(dir, { recursive: true });
  } catch(e) {
    if (e.code !== 'EEXIST' && e.code !== 'EPERM' && e.code !== 'EBUSY') throw e;
  }
}
` + content;
    content = content.replace(
      /await _fs\.default\.promises\.mkdir\((.*?),\s*\{\s*recursive:\s*true\s*\}\);/g,
      "await safeMkdir($1);"
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[patch-next-eperm] Patched route-types-utils:', path.basename(filePath));
  }
}

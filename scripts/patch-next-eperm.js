/**
 * Permanent fix for Windows EPERM / EBUSY error on Next.js dev server cleanup.
 * Catches EPERM/EBUSY on readdirSync/scandir inside Next.js recursiveDelete.
 */
const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'lib', 'recursive-delete.js'),
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'esm', 'lib', 'recursive-delete.js'),
];

for (const filePath of filesToPatch) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Patch readdirSync ENOENT-only check to also ignore EPERM/EBUSY/EACCES
  if (content.includes("e.code === 'ENOENT'") && !content.includes("e.code === 'EPERM'")) {
    content = content.replace(
      /if\s*\((.*?e\.code\s*===\s*'ENOENT'.*?)\)/g,
      "if ($1 || e.code === 'EPERM' || e.code === 'EBUSY' || e.code === 'EACCES')"
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[patch-next-eperm] Successfully patched:', path.basename(filePath));
  }
}

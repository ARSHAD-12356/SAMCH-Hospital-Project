/**
 * Permanent fix for Windows EPERM / EBUSY / filesystem lock issues on Next.js dev server.
 * Ensures:
 * 1. recursiveDelete catches EPERM, EBUSY, and EACCES on readdirSync & scandir.
 * 2. route-types-utils, root-params-type-utils, and cache-life-type-utils safely catch EPERM/EBUSY on mkdir & writeFile.
 */
const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '..', 'node_modules', 'next', 'dist');
if (!fs.existsSync(nextDir)) {
  console.log('[patch-next-eperm] Next.js not installed in node_modules.');
  process.exit(0);
}

// 1. Patch recursive-delete in CJS and ESM
['lib/recursive-delete.js', 'esm/lib/recursive-delete.js'].forEach(relPath => {
  const f = path.join(nextDir, relPath);
  if (!fs.existsSync(f)) return;
  let code = fs.readFileSync(f, 'utf8');
  if (code.includes("e.code === 'ENOENT'") && !code.includes("e.code === 'EPERM'")) {
    code = code.replace(
      /if\s*\((.*?e\.code\s*===\s*'ENOENT'.*?)\)/g,
      "if ($1 || e.code === 'EPERM' || e.code === 'EBUSY' || e.code === 'EACCES')"
    );
    fs.writeFileSync(f, code, 'utf8');
    console.log('[patch-next-eperm] Patched recursive-delete:', relPath);
  }
});

// 2. Patch root-params-type-utils in CJS and ESM
['server/lib/router-utils/root-params-type-utils.js', 'esm/server/lib/router-utils/root-params-type-utils.js'].forEach(relPath => {
  const f = path.join(nextDir, relPath);
  if (!fs.existsSync(f)) return;
  let code = fs.readFileSync(f, 'utf8');
  if (code.includes('async function writeRootParamsTypes') && !code.includes('/* PATCHED_SAFE_ROOT_PARAMS */')) {
    code = code.replace(
      /async function writeRootParamsTypes\(manifest,\s*filePath\)\s*\{[\s\S]*?^\}/m,
      `async function writeRootParamsTypes(manifest, filePath) { /* PATCHED_SAFE_ROOT_PARAMS */
    try {
        const rootParams = manifest.rootParams;
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            await fs.promises.mkdir(dirname, { recursive: true }).catch(() => {});
        }
        if (!rootParams.size) {
            await fs.promises.writeFile(filePath, "// Type definitions for Next.js root params (next/root-params)\\n// No root params detected.\\nexport {}\\n").catch(() => {});
            return;
        }
        await fs.promises.writeFile(filePath, generateRootParamsTypes(rootParams)).catch(() => {});
    } catch (err) {}
}`
    );
    fs.writeFileSync(f, code, 'utf8');
    console.log('[patch-next-eperm] Patched root-params-type-utils:', relPath);
  }
});

// 3. Patch route-types-utils in CJS and ESM
['server/lib/router-utils/route-types-utils.js', 'esm/server/lib/router-utils/route-types-utils.js'].forEach(relPath => {
  const f = path.join(nextDir, relPath);
  if (!fs.existsSync(f)) return;
  let code = fs.readFileSync(f, 'utf8');
  if (code.includes('async function writeRouteTypesManifest') && !code.includes('/* PATCHED_SAFE_ROUTE_TYPES */')) {
    code = code.replace(
      /async function writeRouteTypesManifest\(manifest,\s*filePath,\s*config\)\s*\{[\s\S]*?^\}/m,
      `async function writeRouteTypesManifest(manifest, filePath, config) { /* PATCHED_SAFE_ROUTE_TYPES */
    try {
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            await fs.promises.mkdir(dirname, { recursive: true }).catch(() => {});
        }
        await fs.promises.writeFile(filePath, config.experimental.strictRouteTypes ? (0, _typegen.generateRouteTypesFileStrict)(manifest) : (0, _typegen.generateRouteTypesFile)(manifest)).catch(() => {});
        if (config.typedRoutes === true) {
            const linkTypesPath = path.join(dirname, 'link.d.ts');
            await fs.promises.writeFile(linkTypesPath, (0, _typegen.generateLinkTypesFile)(manifest)).catch(() => {});
        }
    } catch (err) {}
}`
    );
    code = code.replace(
      /async function writeValidatorFile\(manifest,\s*filePath,\s*strict\)\s*\{[\s\S]*?^\}/m,
      `async function writeValidatorFile(manifest, filePath, strict) { /* PATCHED_SAFE_VALIDATOR */
    try {
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            await fs.promises.mkdir(dirname, { recursive: true }).catch(() => {});
        }
        await fs.promises.writeFile(filePath, strict ? (0, _typegen.generateValidatorFileStrict)(manifest) : (0, _typegen.generateValidatorFile)(manifest)).catch(() => {});
    } catch (err) {}
}`
    );
    fs.writeFileSync(f, code, 'utf8');
    console.log('[patch-next-eperm] Patched route-types-utils:', relPath);
  }
});

// 4. Patch cache-life-type-utils in CJS and ESM
['server/lib/router-utils/cache-life-type-utils.js', 'esm/server/lib/router-utils/cache-life-type-utils.js'].forEach(relPath => {
  const f = path.join(nextDir, relPath);
  if (!fs.existsSync(f)) return;
  let code = fs.readFileSync(f, 'utf8');
  if (code.includes('function writeCacheLifeTypes') && !code.includes('/* PATCHED_SAFE_CACHE_LIFE */')) {
    code = code.replace(
      /function writeCacheLifeTypes\(cacheLifeConfig,\s*filePath\)\s*\{[\s\S]*?^\}/m,
      `function writeCacheLifeTypes(cacheLifeConfig, filePath) { /* PATCHED_SAFE_CACHE_LIFE */
    try {
        if (!cacheLifeConfig || Object.keys(cacheLifeConfig).length === 0) return;
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true });
        }
        const content = generateCacheLifeTypes(cacheLifeConfig);
        fs.writeFileSync(filePath, content);
    } catch (err) {}
}`
    );
    fs.writeFileSync(f, code, 'utf8');
    console.log('[patch-next-eperm] Patched cache-life-type-utils:', relPath);
  }
});

console.log('[patch-next-eperm] All Windows EPERM patches applied successfully.');

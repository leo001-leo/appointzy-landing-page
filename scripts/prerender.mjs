// Bakes the rendered React output into dist/index.html so crawlers and social
// scrapers receive real content instead of an empty root div.
// Run after both the client build and the SSR build (see package.json).
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const SSR_DIR = ".ssr-build";
const INDEX = join(DIST, "index.html");
const ASSET_DIR = join(DIST, "assets");

// Vite emits the SSR entry as .ssr-build/entry-server.js normally, but when a
// deploy tool injects extra plugins it can end up hashed under an assets/
// subfolder instead. Find it wherever it landed rather than hardcoding a path.
function findEntry(dir) {
  if (!existsSync(dir)) return null;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      const hit = findEntry(full);
      if (hit) return hit;
    } else if (/^entry-server.*\.(js|mjs)$/.test(name)) {
      return full;
    }
  }
  return null;
}

const entryPath = findEntry(SSR_DIR);
if (!entryPath) {
  console.error(
    `prerender: could not find an entry-server bundle under ${SSR_DIR}/. ` +
      `Did the SSR build run?`
  );
  process.exit(1);
}

const { render } = await import(pathToFileURL(entryPath).href);
let markup = render();

// The SSR build hashes assets independently of the client build. Remap any
// reference that does not exist in dist to the real client-built file.
const assetFiles = existsSync(ASSET_DIR) ? readdirSync(ASSET_DIR) : [];
const unresolved = [];

markup = markup.replace(/\/assets\/([^"'\s)]+)/g, (full, file) => {
  if (assetFiles.includes(file)) return full;

  const match = file.match(/^(.*?)-[A-Za-z0-9_-]+(\.[A-Za-z0-9]+)$/);
  if (match) {
    const [, base, ext] = match;
    const hit = assetFiles.find((f) =>
      new RegExp(`^${base}-[A-Za-z0-9_-]+${ext.replace(".", "\\.")}$`).test(f)
    );
    if (hit) return `/assets/${hit}`;
  }

  unresolved.push(file);
  return full;
});

if (unresolved.length) {
  console.error(`prerender: unresolved asset references: ${unresolved.join(", ")}`);
  process.exit(1);
}

const html = readFileSync(INDEX, "utf8");
const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) {
  console.error("prerender: could not find the root placeholder in dist/index.html");
  process.exit(1);
}

writeFileSync(INDEX, html.replace(placeholder, `<div id="root">${markup}</div>`));
console.log(
  `prerender: injected ${markup.length} chars of HTML into ${INDEX} (entry: ${entryPath})`
);

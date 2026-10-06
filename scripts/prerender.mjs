// Bakes the rendered React output into one HTML page per language
// (dist/index.html for Macedonian, dist/en/index.html for English), so
// crawlers and social scrapers receive real content instead of an empty root.
// Run after both the client build and the SSR build (see package.json).
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, mkdirSync } from "node:fs";
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

function fail(message) {
  console.error(`prerender: ${message}`);
  process.exit(1);
}

const entryPath = findEntry(SSR_DIR);
if (!entryPath) fail(`could not find an entry-server bundle under ${SSR_DIR}/. Did the SSR build run?`);

const { render, head, langs, paths } = await import(pathToFileURL(entryPath).href);
if (typeof render !== "function" || typeof head !== "function" || !Array.isArray(langs)) {
  fail(`${entryPath} does not export render, head and langs`);
}

// The SSR build hashes assets independently of the client build. Remap any
// reference that does not exist in dist to the real client-built file.
const assetFiles = existsSync(ASSET_DIR) ? readdirSync(ASSET_DIR) : [];
function remapAssets(markup) {
  const unresolved = [];
  const out = markup.replace(/\/assets\/([^"'\s)]+)/g, (full, file) => {
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
  if (unresolved.length) fail(`unresolved asset references: ${unresolved.join(", ")}`);
  return out;
}

const template = readFileSync(INDEX, "utf8");
const ROOT = '<div id="root"></div>';
const HEAD = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;
const LANG_ATTR = /<html lang="[^"]*">/;
if (!template.includes(ROOT)) fail("could not find the root placeholder in dist/index.html");
if (!HEAD.test(template)) fail("could not find the <!--app-head--> block in dist/index.html");
if (!LANG_ATTR.test(template)) fail('could not find <html lang="..."> in dist/index.html');

for (const lang of langs) {
  const markup = remapAssets(render(lang));
  // Replacer functions, so a "$" in the content is never read as a pattern.
  const html = template
    .replace(LANG_ATTR, () => `<html lang="${lang}">`)
    .replace(HEAD, () => head(lang))
    .replace(ROOT, () => `<div id="root">${markup}</div>`);

  const dir = join(DIST, ...paths[lang].split("/").filter(Boolean));
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "index.html");
  writeFileSync(file, html);
  console.log(`prerender: ${lang} → ${file} (${markup.length} chars, entry: ${entryPath})`);
}

import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");

/**
 * Prefix public files (`/images`, favicon, icon) with STATIC_ORIGIN.
 *
 * Do NOT rewrite `/_next` — Next `assetPrefix` (`STATIC_CDN`) already emits
 * those URLs. Post-export rewrites of `/_next` break Turbopack hydration
 * (`getAssetPrefix` + chunk graph).
 */
const origin = (process.env.STATIC_ORIGIN || "").replace(/\/+$/, "");
if (!origin) {
  console.error("STATIC_ORIGIN is required (absolute URL that hosts public files).");
  process.exit(1);
}

const rewriteExt = new Set([".html", ".js", ".css", ".txt", ".json"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function stripFileSlash(urlPath) {
  const match = urlPath.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return urlPath;
  const pathname = match[1].replace(/\/+$/, "");
  const suffix = (match[2] ?? "").replace(/\/+$/, "");
  if (/\.[a-z0-9]+$/i.test(pathname)) return `${pathname}${suffix}`;
  return urlPath;
}

/** `"/images/foo.jpg"` → `"https://cdn…/images/foo.jpg"` — lookbehind keeps `\"`. */
const publicAsset =
  /(?<=["'])\/((?:images|favicon\.ico|icon\.svg)[^"'`\\)\s]*)/g;

const files = await walk(root);
let changed = 0;

for (const file of files) {
  if (!rewriteExt.has(extname(file))) continue;
  const source = await readFile(file, "utf8");
  let next = source.replace(
    publicAsset,
    (_, path) => `${origin}/${stripFileSlash(path)}`,
  );
  // Ordered boot on static CDNs. `async` lets the Turbopack runtime race
  // the chunk graph; factories register but never instantiate.
  if (extname(file) === ".html") {
    next = next.replace(
      /(<script\b[^>]*\bsrc="[^"]*_next\/[^"]*"[^>]*?)\sasync(?:="")?/g,
      "$1 defer",
    );
  }
  if (next !== source) {
    await writeFile(file, next);
    changed += 1;
  }
}

let missingPrefix = 0;
let leftoverPublic = 0;
let brokenScripts = 0;
for (const file of files) {
  if (extname(file) !== ".html") continue;
  const source = await readFile(file, "utf8");
  if (!source.includes(`${origin}/_next/`)) missingPrefix += 1;
  if (/(?:src|href)="\/(?:images|favicon\.ico|icon\.svg)/.test(source)) leftoverPublic += 1;

  const inlines = source.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g);
  for (const match of inlines) {
    const check = spawnSync("node", ["--check"], {
      input: match[1],
      encoding: "utf8",
    });
    if (check.status !== 0) {
      brokenScripts += 1;
      console.error(`Broken inline script in ${relative(root, file)}:\n${check.stderr}`);
    }
  }
}

console.log(`Prefixed public assets with ${origin}/ in ${changed} files.`);
if (missingPrefix) {
  console.error(
    `ERROR: ${missingPrefix} HTML file(s) missing assetPrefix ${origin}/_next/. Build with STATIC_CDN.`,
  );
  process.exit(1);
}
if (leftoverPublic) {
  console.error(`ERROR: ${leftoverPublic} HTML file(s) still have root-absolute public assets.`);
  process.exit(1);
}
if (brokenScripts) {
  console.error(`ERROR: ${brokenScripts} inline script(s) failed to parse after rewrite.`);
  process.exit(1);
}

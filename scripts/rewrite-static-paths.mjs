import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");
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

function toRelative(fromFile, absPath) {
  const target = join(root, absPath);
  let rel = relative(dirname(fromFile), target).split("\\").join("/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

/** `/_next/foo.js/` → `/_next/foo.js` so githack/static hosts do not 404 the file. */
function stripFileSlash(urlPath) {
  const match = urlPath.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return urlPath;
  const pathname = match[1].replace(/\/+$/, "");
  const suffix = (match[2] ?? "").replace(/\/+$/, "");
  if (/\.[a-z0-9]+$/i.test(pathname)) return `${pathname}${suffix}`;
  return urlPath;
}

const absAsset = /(["'`(=])(\/(?:_next|favicon\.ico|icon\.svg|images)[^"'`)\s]*)/g;

/** Catch leftover `chunk.js/` after relative rewrite (RSC flight + HTML). */
const leftoverFileSlash =
  /((?:\.\.\/|\.\/|\/)(?:_next|images)\/[^"'`\s)]+?\.[a-z0-9]+)\//gi;
const leftoverIconSlash = /((?:\.\.\/|\.\/)?(?:favicon\.ico|icon\.svg)(?:\?[^"'`\s)]*)?)\//gi;

const files = await walk(root);
let changed = 0;

for (const file of files) {
  if (!rewriteExt.has(extname(file))) continue;
  const source = await readFile(file, "utf8");
  let next = source.replace(absAsset, (match, prefix, abs) => {
    return `${prefix}${toRelative(file, stripFileSlash(abs))}`;
  });
  next = next.replace(leftoverFileSlash, "$1").replace(leftoverIconSlash, "$1");
  if (next !== source) {
    await writeFile(file, next);
    changed += 1;
  }
}

let leftover = 0;
for (const file of files) {
  if (extname(file) !== ".html") continue;
  const source = await readFile(file, "utf8");
  const hits = source.match(/_next\/static\/[^"' ]+\.(js|css)\//g);
  if (hits) leftover += hits.length;
}

console.log(`Rewrote relative asset paths in ${changed} files under out/.`);
if (leftover) {
  console.error(`ERROR: ${leftover} chunk URLs still end with a trailing slash.`);
  process.exit(1);
}

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

const pattern = /(["'`(=])(\/(?:_next|favicon\.ico|icon\.svg|images)[^"'`)\s]*)/g;

const files = await walk(root);
let changed = 0;

for (const file of files) {
  if (!rewriteExt.has(extname(file))) continue;
  const source = await readFile(file, "utf8");
  const next = source.replace(pattern, (match, prefix, abs) => {
    return `${prefix}${toRelative(file, abs)}`;
  });
  if (next !== source) {
    await writeFile(file, next);
    changed += 1;
  }
}

console.log(`Rewrote relative asset paths in ${changed} files under out/.`);

import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = process.argv[2]
  ? isAbsolute(process.argv[2])
    ? process.argv[2]
    : join(process.cwd(), process.argv[2])
  : join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");
const sha = process.argv[3] || process.env.LIVE_DEMO_SHA;
if (!sha) {
  console.error("Usage: node scripts/pin-live-demo-origin.mjs <dir> <sha>");
  process.exit(1);
}

const from = "https://raw.githack.com/AgmAtk03/amroz-gaming-zone/__LIVE_SHA__";
const to = `https://raw.githack.com/AgmAtk03/amroz-gaming-zone/${sha}`;
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

let changed = 0;
for (const file of await walk(root)) {
  if (!rewriteExt.has(extname(file))) continue;
  const source = await readFile(file, "utf8");
  if (!source.includes(from)) continue;
  await writeFile(file, source.split(from).join(to));
  changed += 1;
}
console.log(`Pinned ${changed} files to ${to}`);

import { build } from "esbuild";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const outDir = join(root, "out");

/**
 * Same-tree static demo for SHA-pinned githack.
 *
 * A commit cannot contain its own hash, so absolute CDN assetPrefix + a
 * follow-up "retarget" commit always splits HTML SHA from `_next` SHA.
 * Next App Router RSC also never attaches on rawcdn (`window.next` stays
 * undefined). This pass:
 *   1. Bundles a client-only React mount (no RSC / `__next_f`).
 *   2. Rewrites HTML to relative `./_next` + `./images` (or `../…`).
 *   3. Strips the Next boot scripts that do not run on githack.
 */

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "scripts/static-client-entry.tsx")],
  bundle: true,
  outfile: join(outDir, "amroz-client.js"),
  format: "iife",
  platform: "browser",
  jsx: "automatic",
  minify: true,
  target: ["es2018"],
  define: {
    "process.env.NEXT_PUBLIC_STATIC_PAGES": '"1"',
    "process.env.NODE_ENV": '"production"',
  },
  alias: {
    "@": root,
  },
  logLevel: "info",
});

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

function relToOut(file) {
  const dir = dirname(file);
  const rel = relative(outDir, dir).replaceAll("\\", "/");
  if (!rel) return ".";
  return rel
    .split("/")
    .filter(Boolean)
    .map(() => "..")
    .join("/");
}

function rewriteRootAbs(source, rel) {
  return source
    .replaceAll('"/_next/', `"${rel}/_next/`)
    .replaceAll("'/_next/", `'${rel}/_next/`)
    .replaceAll("(/_next/", `(${rel}/_next/`)
    .replaceAll('"/images/', `"${rel}/images/`)
    .replaceAll("'/images/", `'${rel}/images/`)
    .replaceAll('"/favicon.ico', `"${rel}/favicon.ico`)
    .replaceAll('"/icon.svg', `"${rel}/icon.svg`);
}

function rewriteHtml(source, rel) {
  let html = rewriteRootAbs(source, rel);

  // Drop Next / Turbopack boot. RSC never attaches on githack even when
  // those scripts return 200.
  html = html.replace(
    /<link\b[^>]*rel="preload"[^>]*as="script"[^>]*>/gi,
    "",
  );
  html = html.replace(
    /<script\b[^>]*\bsrc="[^"]*_next\/[^"]*"[^>]*><\/script>/gi,
    "",
  );
  html = html.replace(
    /<script\b[^>]*>\s*(?:self\.)?__next_f[\s\S]*?<\/script>/gi,
    "",
  );
  html = html.replace(
    /<script\b[^>]*>\s*\(self\.__next_f[\s\S]*?<\/script>/gi,
    "",
  );

  const boot = `<div id="amroz-root" class="flex min-h-full flex-1 flex-col"><div class="mx-auto max-w-xl px-4 py-16 text-muted">Loading Amroz…</div></div>\n<script src="${rel}/amroz-client.js" defer></script>`;

  if (/<div id="amroz-root"/.test(html)) {
    html = html.replace(
      /<script src="[^"]*amroz-client\.js"[^>]*><\/script>/,
      `<script src="${rel}/amroz-client.js" defer></script>`,
    );
  } else if (/<body\b[^>]*>[\s\S]*<\/body>/.test(html)) {
    html = html.replace(/<body\b([^>]*)>[\s\S]*<\/body>/, `<body$1>${boot}</body>`);
  } else {
    throw new Error("HTML is missing a <body> to mount the client.");
  }

  return html;
}

const files = await walk(outDir);
let htmlCount = 0;
const leftovers = [];

for (const file of files) {
  if (extname(file) !== ".html") continue;
  const rel = relToOut(file);
  const source = await readFile(file, "utf8");
  const next = rewriteHtml(source, rel);
  await writeFile(file, next);
  htmlCount += 1;

  if (/__LIVE_SHA__|rawcdn\.githack|raw\.githack|cdn\.jsdelivr/.test(next)) {
    leftovers.push(`${relative(outDir, file)}: still has a pinned CDN host`);
  }
  if (/(?:href|src)="\/_next\//.test(next)) {
    leftovers.push(`${relative(outDir, file)}: still has root-absolute /_next`);
  }
  if (/(?:href|src)="\/(?:images|favicon\.ico|icon\.svg)/.test(next)) {
    leftovers.push(`${relative(outDir, file)}: still has root-absolute public assets`);
  }
  if (!next.includes(`${rel}/amroz-client.js`)) {
    leftovers.push(`${relative(outDir, file)}: missing client boot script`);
  }
  if (next.includes("__next_f") || /_next\/static\/chunks\/[^"]+\.js/.test(next)) {
    leftovers.push(`${relative(outDir, file)}: leftover Next boot JS`);
  }
}

if (leftovers.length) {
  console.error(`ERROR: static rewrite failed:\n- ${leftovers.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Static demo: relative assets + client boot in ${htmlCount} HTML file(s).`,
);

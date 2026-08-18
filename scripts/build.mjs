#!/usr/bin/env node
/*
 * build.mjs — regenerate dist/artifact.css from the token + style sources.
 *
 * tokens/tokens.css + styles/base.css are the SINGLE SOURCE OF TRUTH (commented,
 * for humans). This script merges them, strips comments and blank lines, and writes
 * one compact dist/artifact.css that the skill inlines into generated artifacts —
 * fewer output tokens, no drift. dist/artifact.css is GENERATED; never hand-edit it.
 *
 * The same generated CSS is embedded in the site + showcase pages; this script
 * syncs those copies too, so a page can never drift from the tokens it advertises
 * (a stale embedded --accent once shipped below the AA gate this repo enforces).
 *
 * Usage:
 *   node scripts/build.mjs           # write dist/artifact.css + sync embedded copies
 *   node scripts/build.mjs --check   # exit 1 if dist or any embedded copy is stale
 *
 * Zero dependencies. Run this after editing tokens/ or styles/.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = "skills/artifact-ui";
const SOURCES = [`${SKILL}/tokens/tokens.css`, `${SKILL}/styles/base.css`];
const OUT = `${SKILL}/dist/artifact.css`;

const HEADER =
  "/* artifact.css — AUTO-GENERATED from tokens/tokens.css + styles/base.css.\n" +
  "   Do not edit by hand. Run: node scripts/build.mjs */\n";

/* Pages that inline the generated CSS between HEADER and END_MARKER. */
const END_MARKER = "/* end artifact.css */";
const SITES = [
  "index.html",
  "az.html",
  "showcase/dashboard-dark.html",
  "showcase/report.html",
  "showcase/landing.html",
  "showcase/article-editorial.html",
];

function compact(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")   // drop block comments
    .split("\n")
    .map((line) => line.replace(/\s+$/, "")) // trim trailing whitespace
    .filter((line) => line.trim() !== "")    // drop blank lines
    .join("\n");
}

const merged =
  HEADER +
  SOURCES.map((rel) => compact(readFileSync(join(ROOT, rel), "utf8"))).join("\n") +
  "\n";

const outPath = join(ROOT, OUT);

/* Splice the freshly generated CSS into a page's HEADER…END_MARKER region.
   Returns the updated HTML, or null when the page has no such region. */
function syncSite(html) {
  const start = html.indexOf(HEADER);
  const end = html.indexOf(END_MARKER);
  if (start === -1 || end === -1 || end < start) return null;
  return html.slice(0, start) + merged + html.slice(end);
}

/* Every site page that exists on disk, paired with its synced HTML. */
function siteWork() {
  const work = [];
  for (const rel of SITES) {
    const path = join(ROOT, rel);
    if (!existsSync(path)) continue; // showcase pages arrive later; not an error
    const html = readFileSync(path, "utf8");
    const next = syncSite(html);
    if (next === null) {
      console.error(`✗ ${rel} has no "${HEADER.split("\n")[0]}" … "${END_MARKER}" region`);
      process.exit(1);
    }
    work.push({ rel, path, html, next });
  }
  return work;
}

if (process.argv.includes("--check")) {
  let stale = 0;
  const current = existsSync(outPath) ? readFileSync(outPath, "utf8") : "";
  if (current !== merged) {
    console.error(`✗ ${OUT} is stale — run: node scripts/build.mjs`);
    stale++;
  } else {
    console.log(`✓ ${OUT} is up to date`);
  }
  for (const { rel, html, next } of siteWork()) {
    if (html !== next) {
      console.error(`✗ ${rel} embeds a stale copy of artifact.css — run: node scripts/build.mjs`);
      stale++;
    } else {
      console.log(`✓ ${rel} embeds the current artifact.css`);
    }
  }
  process.exit(stale ? 1 : 0);
} else {
  mkdirSync(join(ROOT, SKILL, "dist"), { recursive: true });
  writeFileSync(outPath, merged);

  const srcBytes = SOURCES.reduce(
    (n, rel) => n + Buffer.byteLength(readFileSync(join(ROOT, rel))),
    0
  );
  const outBytes = Buffer.byteLength(merged);
  const pct = Math.round((1 - outBytes / srcBytes) * 100);
  const tok = (b) => Math.round(b / 4);
  console.log(`✓ wrote ${OUT}`);
  console.log(`  sources: ${srcBytes} B (~${tok(srcBytes)} tok)`);
  console.log(`  dist:    ${outBytes} B (~${tok(outBytes)} tok)  −${pct}%`);

  for (const { rel, path, html, next } of siteWork()) {
    if (html === next) continue;
    writeFileSync(path, next);
    console.log(`  synced:  ${rel}`);
  }
}

#!/usr/bin/env node
/*
 * build.mjs — regenerate dist/artifact.css from the token + style sources.
 *
 * tokens/tokens.css + styles/base.css are the SINGLE SOURCE OF TRUTH (commented,
 * for humans). This script merges them, strips comments and blank lines, and writes
 * one compact dist/artifact.css that the skill inlines into generated artifacts —
 * fewer output tokens, no drift. dist/artifact.css is GENERATED; never hand-edit it.
 *
 * Usage:
 *   node scripts/build.mjs           # write dist/artifact.css
 *   node scripts/build.mjs --check   # exit 1 if dist is stale (CI / pre-commit)
 *
 * Zero dependencies. Run this after editing tokens/ or styles/.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = ["tokens/tokens.css", "styles/base.css"];
const OUT = "dist/artifact.css";

const HEADER =
  "/* artifact.css — AUTO-GENERATED from tokens/tokens.css + styles/base.css.\n" +
  "   Do not edit by hand. Run: node scripts/build.mjs */\n";

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

if (process.argv.includes("--check")) {
  const current = existsSync(outPath) ? readFileSync(outPath, "utf8") : "";
  if (current !== merged) {
    console.error(`✗ ${OUT} is stale — run: node scripts/build.mjs`);
    process.exit(1);
  }
  console.log(`✓ ${OUT} is up to date`);
} else {
  mkdirSync(join(ROOT, "dist"), { recursive: true });
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
}

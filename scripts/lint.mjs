#!/usr/bin/env node
/*
 * lint.mjs — deterministic slop gate for artifact pages.
 *
 * The "Avoid — the default-artifact tells" list in skills/artifact-ui/SKILL.md
 * is the model's in-sandbox rulebook; this script is its mechanical mirror for
 * everything a regex can catch. Each rule below cites the Avoid bullet it
 * enforces, so the list and the gate cannot drift apart. Zero dependencies.
 *
 * Usage:
 *   node scripts/lint.mjs                  # lint the repo's own pages
 *   node scripts/lint.mjs some.html …      # lint specific files (e.g. a generated artifact)
 *   node scripts/lint.mjs --sandbox a.html # for Claude-sandbox artifacts: web-font links are errors too
 *
 * Two tiers, like the contrast gate's error/warn split:
 *   error — deterministic violations; exit 1.
 *   warn  — heuristics worth a look; reported, exit 0.
 * The generated dist block (between "/* artifact.css" and "end artifact.css")
 * is skipped: it is gated at the source by build.mjs + contrast.mjs, and it
 * carries the sanctioned exceptions (paper-white print palette, shimmer).
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const sandbox = args.includes("--sandbox");
const fileArgs = args.filter((a) => !a.startsWith("--"));

const htmlIn = (dir) =>
  readdirSync(join(ROOT, dir))
    .filter((f) => f.endsWith(".html"))
    .map((f) => `${dir}/${f}`);
const DEFAULT_TARGETS = [
  "index.html",
  "az.html",
  ...htmlIn("showcase"),
  ...htmlIn("skills/artifact-ui/templates"),
];
const targets = fileArgs.length ? fileArgs : DEFAULT_TARGETS;

const WEBFONT_HOSTS = /https?:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)/;
const DIST_START = "/* artifact.css";
const DIST_END = "/* end artifact.css */";

const findings = []; // { file, line, tier, rule, msg }

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

/* Mask the generated dist block(s) so their content can't match any rule;
   newlines are kept so line numbers stay true. */
function maskDist(text) {
  let out = text;
  let start;
  while ((start = out.indexOf(DIST_START)) !== -1) {
    let end = out.indexOf(DIST_END, start);
    end = end === -1 ? out.length : end + DIST_END.length;
    const blanked = out.slice(start, end).replace(/[^\n]/g, " ");
    out = out.slice(0, start) + blanked + out.slice(end);
  }
  return out;
}

/* CSS rules must not fire on prose or code samples that merely MENTION a tell
   (the landing pages explain "#000/#fff" in words). Keep only <style> blocks
   and style="…" attribute values; blank the rest, preserving newlines. */
function cssOnly(text) {
  const inCss = new Uint8Array(text.length);
  const mark = (start, len) => {
    for (let i = start; i < start + len; i++) inCss[i] = 1;
  };
  for (const m of text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi))
    mark(m.index + m[0].indexOf(m[1] || "</style>"), (m[1] || "").length);
  for (const m of text.matchAll(/\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi))
    mark(m.index + m[0].indexOf(m[1]) + 1, m[1].length - 2);
  const arr = text.split("");
  for (let i = 0; i < arr.length; i++)
    if (!inCss[i] && arr[i] !== "\n") arr[i] = " ";
  return arr.join("");
}

/* Commented-out markup (e.g. the templates' opt-in web-font instructions) is
   not part of the page — blank it, preserving newlines. */
function maskHtmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " "));
}

function scan(file, report) {
  const raw = readFileSync(resolve(ROOT, file), "utf8");
  const text = maskHtmlComments(maskDist(raw));
  const css = cssOnly(text);
  const add = (tier, rule, index, msg) =>
    findings.push({ file, line: lineOf(text, index), tier, rule, msg });

  /* external-request — Avoid: "A dead external request". Resource loads only;
     an <a href> hyperlink is a link, not a request. Web-font hosts are the
     sanctioned outside-the-sandbox opt-in → warn (error under --sandbox). */
  const resourceRe =
    /<(?:script|img|iframe|source|video|audio|embed)\b[^>]*\ssrc(?:set)?\s*=\s*["']?(https?:\/\/[^"'\s>]+)|<link\b[^>]*\shref\s*=\s*["']?(https?:\/\/[^"'\s>]+)|@import\s+(?:url\()?\s*["']?(https?:\/\/[^"')\s;]+)|url\(\s*["']?(https?:\/\/[^"')\s]+)/gi;
  for (const m of text.matchAll(resourceRe)) {
    const url = m[1] || m[2] || m[3] || m[4];
    const isFont = WEBFONT_HOSTS.test(url);
    add(
      isFont && !sandbox ? "warn" : "error",
      "external-request",
      m.index,
      isFont
        ? `web-font request (${url}) — fine outside the sandbox only; silently dead inside Claude's CSP`
        : `external resource (${url}) — the sandbox CSP silently blocks it; inline it`
    );
  }

  /* transition-all — Avoid: "Careless motion — transition: all". */
  for (const m of css.matchAll(/transition(?:-property)?\s*:\s*all\b/gi))
    add("error", "transition-all", m.index, "`transition: all` — name the properties");

  /* ease-in — Avoid: "Careless motion — ease-in on UI" (ease-in-out is fine). */
  for (const m of css.matchAll(/(?:transition|animation)[^;{}]*[\s,:]ease-in(?![-\w])/gi))
    add("error", "ease-in", m.index, "`ease-in` on UI delays the moment the user is watching — use var(--ease)");

  /* pure-black-white / hardcoded-hex — Avoid: "Pure #000 / #fff" and
     "Hardcoded values". Everything colored comes from a token; the paper/print
     exception lives inside the (skipped) dist block. */
  for (const m of css.matchAll(/#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi)) {
    const hex = m[0].toLowerCase();
    const isPure = /^#(?:000|000000|fff|ffffff)$/.test(hex);
    add(
      "error",
      isPure ? "pure-black-white" : "hardcoded-hex",
      m.index,
      isPure
        ? `${m[0]} — never pure black/white; use the text/surface tokens`
        : `hardcoded color ${m[0]} — every color comes from a var() token`
    );
  }

  /* hardcoded-radius — Avoid: "Hardcoded values" / "Inconsistent radii". */
  for (const m of css.matchAll(/border-radius\s*:[^;{}]*?\d+px/gi))
    if (!/var\(/.test(m[0]))
      add("error", "hardcoded-radius", m.index, "px border-radius — use a --radius-* token");

  /* gradient-text — craft rule: emphasis comes from weight/size, never a
     gradient fill clipped to text. */
  for (const m of css.matchAll(/background-clip\s*:\s*text/gi))
    add("error", "gradient-text", m.index, "gradient text — emphasis comes from weight and size");

  /* uppercase — Avoid: "All-caps headings". Type the caps you mean (ƏRİZƏ);
     never transform-force them. */
  for (const m of css.matchAll(/text-transform\s*:\s*(?:uppercase|capitalize)\b/gi))
    add("error", "uppercase", m.index, "text-transform forcing case — hierarchy comes from weight, not caps");

  /* img-alt — checklist: every <img> carries alt (empty for decorative). */
  for (const m of text.matchAll(/<img\b[^>]*>/gi))
    if (!/\salt\s*=/.test(m[0]))
      add("error", "img-alt", m.index, "<img> without alt — describe it, or alt=\"\" for decorative");

  /* long-duration — Avoid: "UI animation over 300ms". Constant motion
     (infinite, e.g. a shimmer) is the sanctioned exception. */
  for (const m of css.matchAll(/(?:transition|animation)\s*:[^;{}]*/gi)) {
    if (/\binfinite\b/.test(m[0])) continue;
    for (const d of m[0].matchAll(/(\d*\.?\d+)(m?s)\b/g)) {
      const ms = d[2] === "s" ? parseFloat(d[1]) * 1000 : parseFloat(d[1]);
      if (ms > 300)
        add("error", "long-duration", m.index, `${d[0]} — UI motion stays under 300ms (tokens top out at --dur-slow)`);
    }
  }

  /* accent-bar — Avoid: "Color-coded notice panels" / "Bar-quoted blockquotes":
     a thick colored side border is the tell in both. Hairline (1px) borders are
     fine; width above 1px on one side is not. */
  for (const m of css.matchAll(/border-(?:left|right|inline-start|inline-end)\s*:\s*([^;{}]*)/gi)) {
    const value = m[1];
    if (/var\(--border(?:-strong)?\)/.test(value)) continue; // a neutral functional line (e.g. a timeline rail)
    const width = value.match(/(\d*\.?\d+)(px|rem|em)/);
    if (!width) continue;
    const w = parseFloat(width[1]) * (width[2] === "px" ? 1 : 16);
    if (w > 1)
      add("warn", "accent-bar", m.index, `${width[0]} colored side border — the edge-bar tell; borders go all the way round`);
  }

  /* kicker — Avoid: "Meta strips around a title". Heuristic: a short shouting
     line right before an <h1>. */
  for (const m of text.matchAll(/>\s*([A-Z0-9ƏÜÖĞİŞÇI][A-Z0-9ƏÜÖĞİŞÇI ·•&\-–—]{2,40})\s*<[^>]*>\s*<h1/g))
    add("warn", "kicker", m.index, `possible kicker above the title ("${m[1].trim()}") — a title stands alone`);

  /* accent-overuse — Avoid: "Accent overuse" + one accent button per view. */
  const accentFills = [...css.matchAll(/background(?:-color)?\s*:\s*var\(--accent\)/gi)];
  if (accentFills.length > 1)
    add(
      "warn",
      "accent-overuse",
      accentFills[1].index,
      `${accentFills.length} solid accent fills on one page — the accent marks ONE action`
    );

  return report;
}

let missing = 0;
for (const file of targets) {
  try {
    scan(file);
  } catch (e) {
    if (e.code === "ENOENT") {
      console.error(`✗ ${file}: not found`);
      missing++;
    } else throw e;
  }
}

findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
for (const f of findings) {
  const mark = f.tier === "error" ? "✗" : "⚠";
  console.log(`${mark} ${f.file}:${f.line}  ${f.rule}  ${f.msg}`);
}

const errors = findings.filter((f) => f.tier === "error").length;
const warns = findings.length - errors;
console.log(
  `${errors || missing ? "✗" : "✓"} lint: ${targets.length - missing} file(s), ${errors} error(s), ${warns} warning(s)`
);
process.exit(errors || missing ? 1 : 0);

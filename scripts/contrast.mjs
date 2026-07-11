#!/usr/bin/env node
/*
 * contrast.mjs — WCAG 2.1 contrast gate for the token palette.
 * Zero dependencies. Reads its expectations from the PAIRS table below;
 * update BOTH tokens/tokens.css and this table when a color token changes.
 * Usage: node scripts/contrast.mjs   → exit 0 if every pair meets its minimum.
 */
function oklchToSrgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const gam = (x) => {
    x = Math.min(1, Math.max(0, x));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  };
  return [
    gam(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    gam(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    gam(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}
function relLum([r, g, b]) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(c1, c2) {
  const [hi, lo] = [relLum(c1), relLum(c2)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
// [L, C, H] — keep in sync with tokens/tokens.css.
const HUE_N = 70, HUE_A = 35;
const T = {
  bg:        [0.972, 0.016, HUE_N],
  surface:   [0.99, 0.008, HUE_N],
  text:      [0.28, 0.014, HUE_N],
  text2:     [0.48, 0.013, HUE_N],
  muted:     [0.54, 0.012, HUE_N],   // ← target value set by this plan
  accent:    [0.55, 0.14, HUE_A],    // ← target value set by this plan
  onAccent:  [0.99, 0.015, HUE_A],
  dbg:       [0.17, 0.012, HUE_N],
  dtext:     [0.93, 0.008, HUE_N],
  dtext2:    [0.73, 0.01, HUE_N],
  dmuted:    [0.60, 0.01, HUE_N],    // ← target value set by this plan
  daccent:   [0.7, 0.16, HUE_A],
  donAccent: [0.16, 0.02, HUE_A],
  danger:    [0.53, 0.17, 25],
  ok:        [0.52, 0.12, 150],
  ddanger:   [0.72, 0.15, 25],
  dok:       [0.74, 0.12, 150],
  tint:      [0.93, 0.045, 145],  // representative --tint-* (sage)
  dtint:     [0.30, 0.045, 145],
};
// [label, fg, bg, minimum]. 4.5 = AA normal text.
const PAIRS = [
  ["text on bg (light)", "text", "bg", 4.5],
  ["text-2 on bg (light)", "text2", "bg", 4.5],
  ["text-muted on bg (light)", "muted", "bg", 4.5],
  ["on-accent on accent (light) — .btn--accent", "onAccent", "accent", 4.5],
  ["accent on bg (light) — links", "accent", "bg", 4.5],
  ["accent on surface (light) — links on cards", "accent", "surface", 4.5],
  ["text on bg (dark)", "dtext", "dbg", 4.5],
  ["text-2 on bg (dark)", "dtext2", "dbg", 4.5],
  ["text-muted on bg (dark)", "dmuted", "dbg", 4.5],
  ["on-accent on accent (dark)", "donAccent", "daccent", 4.5],
  ["accent on bg (dark) — links", "daccent", "dbg", 4.5],
  ["danger on bg (light) — error text", "danger", "bg", 4.5],
  ["ok on bg (light) — success text", "ok", "bg", 4.5],
  ["danger on bg (dark)", "ddanger", "dbg", 4.5],
  ["ok on bg (dark)", "dok", "dbg", 4.5],
  ["text-2 on tint (light) — tinted chips", "text2", "tint", 4.5],
  ["text-2 on tint (dark) — tinted chips", "dtext2", "dtint", 4.5],
];
let failed = 0;
for (const [label, f, b, min] of PAIRS) {
  const r = contrast(oklchToSrgb(...T[f]), oklchToSrgb(...T[b]));
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? "✓" : "✗"} ${r.toFixed(2)}:1 (min ${min}) ${label}`);
}
process.exit(failed ? 1 : 0);

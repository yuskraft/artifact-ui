#!/usr/bin/env node
/*
 * contrast.mjs — WCAG 2.1 contrast gate for the token palette.
 * Zero dependencies. Reads its expectations from the PAIRS table below;
 * update BOTH tokens/tokens.css and this table when a color token changes.
 * Usage: node scripts/contrast.mjs   → exit 0 if every pair meets its minimum.
 */
const gamutWarned = new Set();
function oklchToSrgb(L, C, H, label) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  // Gamut gate: chroma outside sRGB gets clamped by the browser, so the color
  // that renders isn't the one declared — and this contrast result would lie.
  // Fix by reducing C (keep L and H) until the value fits.
  if (label && !gamutWarned.has(label) && lin.some((x) => x < -0.005 || x > 1.005)) {
    gamutWarned.add(label);
    console.warn(`⚠ ${label} oklch(${L} ${C} ${H}) clips outside sRGB — reduce C`);
  }
  const gam = (x) => {
    x = Math.min(1, Math.max(0, x));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  };
  return lin.map(gam);
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
const HUE_N = 98;
// Every mood preset offered in tokens/tokens.css. Each carries its own chroma
// because sRGB holds far more of it at some hues than others (teal runs out near
// 0.09 where magenta reaches 0.26). A preset only ships if it clears this gate; a
// failing one is fixed by lowering its CHROMA here and in tokens.css — never by
// lowering a minimum.
const ACCENT_PRESETS = [
  { hue: 129, chroma: 0.13, name: "product" },
  { hue: 191, chroma: 0.08, name: "technical" },
  { hue: 250, chroma: 0.13, name: "serious" },
  { hue: 25,  chroma: 0.14, name: "editorial" },
  { hue: 59,  chroma: 0.11, name: "playful" },
  { hue: 318, chroma: 0.14, name: "creative" },
];
const T = {
  bg:        [0.965, 0.008, HUE_N],  // warm gray
  surface:   [0.99, 0.015, HUE_N],
  text:      [0.264, 0.0, HUE_N],    // #252525
  text2:     [0.48, 0.013, HUE_N],
  muted:     [0.54, 0.012, HUE_N],
  dbg:       [0.17, 0.012, HUE_N],
  dtext:     [0.93, 0.008, HUE_N],
  dtext2:    [0.73, 0.01, HUE_N],
  dmuted:    [0.60, 0.01, HUE_N],
  danger:    [0.53, 0.17, 25],
  ok:        [0.50, 0.085, 191],     // #78aba8 hue, darkened for AA; C capped for sRGB
  ddanger:   [0.72, 0.15, 25],
  dok:       [0.70, 0.054, 191],     // #78aba8 exact
  tint:      [0.933, 0.023, 141],    // representative --tint-* (sage, #e1eddf)
  tintSky:   [0.893, 0.016, 245],    // darkest light tint (--tint-sky, #d3dde6)
  tintButter:[0.915, 0.090, 95],     // strongest-chroma tint (--tint-butter, #f6e39e)
  dtint:     [0.30, 0.045, 141],
  sunk:      [0.952, 0.045, HUE_N],  // --surface-sunk, the bar track
  dsunk:     [0.15, 0.012, HUE_N],
  chart2:    [0.50, 0.085, 191],     // categorical chart colors — graphics, not text
  chart3:    [0.55, 0.09, 59],
  chart4:    [0.55, 0.09, 318],
  dchart2:   [0.70, 0.054, 191],
  dchart3:   [0.75, 0.09, 59],
  dchart4:   [0.72, 0.09, 318],
};
// Accent-derived tokens: lightness is shared, chroma and hue come from the preset.
const ACCENT_KEYS = new Set([
  "accent", "accentHover", "onAccent", "accentQuiet", "chartMuted",
  "daccent", "donAccent", "daccentQuiet", "dchartMuted",
]);
const accentTokens = ({ hue: H, chroma: C }) => ({
  accent:      [0.52, C, H],         // darkened for AA as text/links in light
  accentHover: [0.47, C, H],
  onAccent:    [0.98, 0.008, H],     // near-white; C tiny so every hue fits sRGB
  accentQuiet: [0.93, 0.03, H],      // pale wash behind accent text + ::selection
  chartMuted:  [0.78, 0.055, H],     // de-emphasized chart marks
  daccent:     [0.77, 0.108, H],     // lifted L — glows in dark
  donAccent:   [0.16, 0.02, H],
  daccentQuiet:[0.28, 0.06, H],
  dchartMuted: [0.38, 0.05, H],
});
// [label, fg, bg, minimum]. 4.5 = AA normal text.
const PAIRS = [
  ["text on bg (light)", "text", "bg", 4.5],
  ["text-2 on bg (light)", "text2", "bg", 4.5],
  ["text-muted on bg (light)", "muted", "bg", 4.5],
  ["text on bg (dark)", "dtext", "dbg", 4.5],
  ["text-2 on bg (dark)", "dtext2", "dbg", 4.5],
  ["text-muted on bg (dark)", "dmuted", "dbg", 4.5],
  ["danger on bg (light) — error text", "danger", "bg", 4.5],
  ["ok on bg (light) — success text", "ok", "bg", 4.5],
  ["danger on bg (dark)", "ddanger", "dbg", 4.5],
  ["ok on bg (dark)", "dok", "dbg", 4.5],
  ["text-2 on tint (light) — tinted chips", "text2", "tint", 4.5],
  ["text-2 on tint-sky (light) — darkest tint", "text2", "tintSky", 4.5],
  ["text-2 on tint-butter (light) — strongest tint", "text2", "tintButter", 4.5],
  ["text-2 on tint (dark) — tinted chips", "dtext2", "dtint", 4.5],
];
// Non-text minimums: 3 = WCAG AA for graphics/UI; 1.5 = a chart fill must simply
// be tellable from the track it sits in.
const PAIRS_GRAPHIC = [
  ["chart-2 on bg (light) — categorical mark", "chart2", "bg", 3],
  ["chart-3 on bg (light) — categorical mark", "chart3", "bg", 3],
  ["chart-4 on bg (light) — categorical mark", "chart4", "bg", 3],
  ["chart-2 on bg (dark)", "dchart2", "dbg", 3],
  ["chart-3 on bg (dark)", "dchart3", "dbg", 3],
  ["chart-4 on bg (dark)", "dchart4", "dbg", 3],
];
// Run once per mood preset.
const ACCENT_PAIRS = [
  ["on-accent on accent (light) — .btn--accent", "onAccent", "accent", 4.5],
  ["on-accent on accent-hover (light)", "onAccent", "accentHover", 4.5],
  ["accent on bg (light) — links", "accent", "bg", 4.5],
  ["accent on surface (light) — links on cards", "accent", "surface", 4.5],
  ["text on accent-quiet (light) — ::selection, active nav", "text", "accentQuiet", 4.5],
  ["chart-muted on surface-sunk (light) — bar fill vs track", "chartMuted", "sunk", 1.5],
  ["on-accent on accent (dark)", "donAccent", "daccent", 4.5],
  ["accent on bg (dark) — links", "daccent", "dbg", 4.5],
  ["text on accent-quiet (dark)", "dtext", "daccentQuiet", 4.5],
  ["chart-muted on surface-sunk (dark) — bar fill vs track", "dchartMuted", "dsunk", 1.5],
];
let failed = 0;
function check(pairs, preset) {
  const table = preset === null ? T : { ...T, ...accentTokens(preset) };
  const suffix = preset === null ? "" : ` [${preset.name} ${preset.hue}]`;
  const tag = (k) => (preset !== null && ACCENT_KEYS.has(k) ? `${k}@${preset.hue}` : k);
  for (const [label, f, b, min] of pairs) {
    const r = contrast(oklchToSrgb(...table[f], tag(f)), oklchToSrgb(...table[b], tag(b)));
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${ok ? "✓" : "✗"} ${r.toFixed(2)}:1 (min ${min}) ${label}${suffix}`);
  }
}
check(PAIRS, null);
check(PAIRS_GRAPHIC, null);
for (const preset of ACCENT_PRESETS) check(ACCENT_PAIRS, preset);
process.exit(failed || gamutWarned.size ? 1 : 0);

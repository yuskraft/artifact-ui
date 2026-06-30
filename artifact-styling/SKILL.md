---
name: artifact-styling
description: Make HTML artifacts and documents look intentionally designed instead of default-styled. Use when generating any self-contained HTML artifact, document, report, dashboard, landing page, chat/answer UI, or data view that a human will look at — anything where the output's appearance matters, not just its content.
---

# Artifact styling

Default-looking output is the tell that no one designed it. This skill exists to make every artifact read as **composed** — built on purpose, from a system, with **restraint**. The whole game is predictability: reach for the same scale, the same hierarchy, the same handling of type/space/color/corners every run, so artifacts come out coherent no matter the content.

Two leading words run through everything below:

- **Restraint** — the taste. Few type sizes, one accent, calm surfaces, generous space. When unsure, remove. Polish is what you _didn't_ add.
- **Tokens** — the mechanism. Commit to the token block first, then build _only_ from `var()`. Never hardcode a px, a hex, or a one-off radius. Coherence is a side effect of everyone drinking from the same well.

This is reference, not a workflow. There are no steps to march through — there is one system to apply in full. Before returning any artifact, every rule here that applies must have been considered. The [return checklist](#before-you-return) is the exhaustiveness bar.

---

## Build from tokens

Paste this block into `:root` first, before writing a single component. It _is_ the design system — the single source of truth for every value the artifact uses. Everything downstream references it; nothing redefines it.

Modern choices baked in, on purpose: **OKLCH** color (perceptually even, trivial to derive light/dark and tints by moving one number), **fluid type** via `clamp()` (scales with the viewport, no breakpoints), **logical properties** downstream (`padding-inline`, `margin-block`), and `color-scheme` for native form/scrollbar theming.

```css
:root {
  color-scheme: light dark;

  /* ── Color ── warm pastel: one accent hue, one warm neutral, derived by moving L ── */
  --hue-accent: 35;         /* the ONE knob: swap this to re-theme everything (35 = soft coral) */
  --hue-neutral: 70;        /* warm cream tint; reads inviting, never clinical gray */
  --chroma-neutral: 0.012;  /* enough warmth to feel intentional; still nearly-neutral */

  /* Light theme (the default). Dark theme overrides these below. */
  --bg:           oklch(0.972 0.016 var(--hue-neutral));  /* warm cream, not white */
  --surface:      oklch(0.99  0.008 var(--hue-neutral));  /* soft off-white, sits above bg */
  --surface-sunk: oklch(0.95  0.014 var(--hue-neutral));  /* wells, code, inputs */
  --border:       oklch(0.90  0.012 var(--hue-neutral));
  --border-strong:oklch(0.84  0.014 var(--hue-neutral));

  --text:         oklch(0.28 0.014 var(--hue-neutral));  /* warm near-black, never #000 */
  --text-2:       oklch(0.48 0.013 var(--hue-neutral));  /* secondary / labels */
  --text-muted:   oklch(0.63 0.012 var(--hue-neutral));  /* captions, meta, placeholder */

  --accent:       oklch(0.64 0.15 var(--hue-accent));    /* soft coral, still carries white text */
  --accent-hover: oklch(0.58 0.16 var(--hue-accent));
  --accent-quiet: oklch(0.93 0.05 var(--hue-accent));    /* peachy tint behind accent text */
  --on-accent:    oklch(0.99 0.015 var(--hue-accent));   /* near-white on a solid accent */

  /* Optional pastel tints — high-L, low-chroma washes for tags, soft section
     backgrounds, gentle category coding. Decorative only; the accent owns actions. */
  --tint-peach:    oklch(0.93 0.05 40);
  --tint-rose:     oklch(0.92 0.05 0);
  --tint-sage:     oklch(0.93 0.045 145);
  --tint-lavender: oklch(0.93 0.05 295);
  --tint-sky:      oklch(0.93 0.05 235);

  /* ── Type ── web fonts by default (see Type). Each token keeps a system
       fallback, so the artifact degrades cleanly offline. ── */
  --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;

  /* Fluid scale, ~1.2 ratio. min @360px → max @1240px. */
  --text-xs:  clamp(0.75rem,  0.72rem + 0.15vw, 0.8125rem);
  --text-sm:  clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem);
  --text-base:clamp(1rem,     0.96rem + 0.2vw,  1.0625rem);
  --text-lg:  clamp(1.125rem, 1.06rem + 0.3vw,  1.25rem);
  --text-xl:  clamp(1.375rem, 1.25rem + 0.6vw,  1.625rem);
  --text-2xl: clamp(1.75rem,  1.5rem + 1.2vw,   2.25rem);
  --text-3xl: clamp(2.25rem,  1.8rem + 2.2vw,   3.25rem);
  --text-4xl: clamp(2.75rem,  2rem + 3.6vw,     4.5rem);

  --leading-tight: 1.15;   /* headings */
  --leading-snug:  1.35;   /* short blocks, UI */
  --leading-body:  1.65;   /* running prose */
  --tracking-tight: -0.02em; /* large headings only */
  --measure: 68ch;         /* max line length for readable prose */

  /* ── Space ── 4px base; the only spacing values allowed downstream ── */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;  --space-10: 8rem;

  /* ── Radius ── corners are relative; nest by subtracting the gap (see Corners) ── */
  --radius-sm: 6px;    --radius-md: 10px;   --radius-lg: 16px;
  --radius-xl: 24px;   --radius-full: 999px;

  /* ── Elevation ── soft, layered, low-contrast. Never a single hard shadow ── */
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.04), 0 1px 1px oklch(0 0 0 / 0.03);
  --shadow-md: 0 2px 4px oklch(0 0 0 / 0.04), 0 4px 12px oklch(0 0 0 / 0.06);
  --shadow-lg: 0 4px 8px oklch(0 0 0 / 0.04), 0 16px 32px oklch(0 0 0 / 0.10);

  /* ── Motion ── short, eased, honor reduced-motion ── */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur: 180ms;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:            oklch(0.17  0.012 var(--hue-neutral));  /* never #000 */
    --surface:       oklch(0.205 0.014 var(--hue-neutral));  /* lighter than bg = raised */
    --surface-sunk:  oklch(0.15  0.012 var(--hue-neutral));
    --border:        oklch(0.27  0.014 var(--hue-neutral));
    --border-strong: oklch(0.34  0.016 var(--hue-neutral));

    --text:        oklch(0.93 0.008 var(--hue-neutral));     /* never #fff */
    --text-2:      oklch(0.73 0.01  var(--hue-neutral));
    --text-muted:  oklch(0.58 0.01  var(--hue-neutral));

    --accent:       oklch(0.7  0.16 var(--hue-accent));      /* lift L in dark so it glows */
    --accent-hover: oklch(0.76 0.16 var(--hue-accent));
    --accent-quiet: oklch(0.28 0.06 var(--hue-accent));
    --on-accent:    oklch(0.16 0.02 var(--hue-accent));

    /* In dark, shadows barely read — elevate with surface lightness + border instead. */
    --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.3);
    --shadow-md: 0 2px 8px oklch(0 0 0 / 0.35);
    --shadow-lg: 0 8px 30px oklch(0 0 0 / 0.45);
  }
}

* { box-sizing: border-box; }
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

To re-theme: change `--hue-accent`. That is the knob. Don't hand-pick a second accent — derive shades from the one hue by moving lightness/chroma, exactly as the block does.

---

## Type

A default-styled font is the loudest tell. Load a real typeface — by default a clean, slightly rounded sans — and treat it well; refinement comes from both the face _and_ how it's set.

- **Web font by default.** Headings/UI use `--font-display` (a soft rounded sans), body uses `--font-sans` (a humanist workhorse). Load them with a `<link>` (see the base shell in `RECIPES.md`). Each token keeps a system fallback, so the artifact still reads cleanly offline. To go fully self-contained, swap both tokens to their system fallbacks or inline the font as base64.
- **Sans everywhere.** Both default fonts are sans; the warm-pastel references are all sans. A serif is a rare, deliberate opt-in for a long-form essay — not the default.
- **Three sizes per artifact, not seven.** Pick a heading size, a body size, and a small/meta size from the scale. Reach for more only when the content genuinely has more levels. Hierarchy comes from **weight and color**, not from inventing new sizes.
- **Weight does the work.** Body `400`; emphasis and UI labels `500`; headings `600`–`700`. Two weights present at once is usually enough.
- **Line-height is inverse to size.** Body gets `--leading-body`; headings get `--leading-tight`; large headings also get `--tracking-tight` (large type looks loose until you pull it in).
- **Cap the measure.** Running prose lives in a `max-width: var(--measure)` column. Full-width paragraphs are a default tell.
- **Numbers in tables and stats:** `font-variant-numeric: tabular-nums` so figures align.

## Space & rhythm

Cramped is the loudest default tell; the reference designs breathe. Spend space generously and _proportionally_.

- **Every gap is a token.** Padding, margins, and `gap` come from `--space-*` only. No arbitrary `13px`.
- **Space scales with the container.** A page section gets `--space-8`/`--space-9` of vertical breathing room; a card interior gets `--space-5`/`--space-6`; a chip gets `--space-2`. Big things get big space.
- **Group with proximity.** Related items sit close; unrelated groups sit far apart. The size of a gap _is_ the relationship — make related/unrelated gaps obviously different (e.g. `--space-2` within a group, `--space-6` between groups).
- **Prefer `gap` over margins.** Lay out with fl/grid `gap` for even rhythm; reserve margins for prose flow.

## Color & restraint

Warm and soft, neutral-dominant, one accent. The palette is cream-based with a coral accent and optional pastel tints — inviting, never clinical. The reference palettes are ~90% warm neutral.

- **One accent, used sparingly.** The soft coral `--accent` marks the single most important action or the one thing to notice per view — not every heading, link, and icon. If everything is accented, nothing is.
- **Pastel tints are seasoning, not the meal.** The `--tint-*` set is for soft tag backgrounds, gentle section washes, or light category coding — low-chroma, high-lightness, behind muted text. Reach for them rarely; never let decorative pastels compete with the one action accent.
- **Backgrounds are layered, not flat.** `--bg` (warm cream) for the page, `--surface` for raised content, `--surface-sunk` for wells/code/inputs. Depth comes from this ladder plus `--border`, before any shadow.
- **Text hierarchy is three steps:** `--text` / `--text-2` / `--text-muted`. Demote meta and captions to muted instead of shrinking them to nothing.
- **Never pure black or white.** Tokens already avoid `#000`/`#fff`; keep it that way.
- **Gradients: soft warm washes only.** A quiet two-hue, low-chroma wash (the kind of soft aura in the references) is welcome — a faint radial behind a hero, a gentle tint. A garish, high-chroma, multi-stop gradient is a tell. Never a rainbow.

## Corners

A radius is relative, not a fixed number — the same value reads sharp on a small chip and soft on a wide card. So the system has a _scale_, and nested corners must stay **concentric**.

- **Match radius to element size.** Chips/inputs → `--radius-sm`; buttons → `--radius-sm`/`--radius-md`; cards → `--radius-lg`; modals/large panels → `--radius-xl`; pills/avatars → `--radius-full`.
- **Nest by subtracting the gap.** An inner corner inside a padded parent must be `outer − padding`, or the curves won't run parallel. Inside `--space-3` (12px) padding, an outer `--radius-lg` (16px) wants an inner radius of ~4px. Use `calc(var(--radius-lg) - var(--space-3))`.
- **Pick one family and hold it.** Mixing a sharp 4px card with a 24px button in the same view is the inconsistent-radius tell. Everything derives from the one scale.

## Elevation & surfaces

- **Cards are for grouped or media-rich content — not for simple data.** A bordered box earns its weight when it holds an image, a mixed cluster, or a distinct object. A handful of label→value metrics does **not** belong in a grid of boxes; use a minimal **list column** instead (label muted, value emphasized, rows separated by a hairline or just space — see the `.list` primitive in `RECIPES.md`). Boxing every datum is a tell.
- **Shadows are soft and layered** (the `--shadow-*` tokens stack a tight contact shadow with a wide ambient one). One hard `0 4px 8px black` is a tell.
- **Elevation has meaning.** Lift only things that are actually above the page (cards, popovers, sticky bars). A flat thing with a drop shadow is noise.
- **In dark mode, light the surface, don't shadow it.** Raise `--surface` lightness and add a `--border`; shadows barely register on dark.
- **Borders are quiet.** `--border` separates; `--border-strong` only when a divider must assert itself. Hairlines, not heavy rules.

## Layout & density

- **Always contained — never full-width.** Content lives in a centered `--container` (or the narrower `--measure` for prose); the page has generous gutters on both sides. Full-bleed text spanning the whole viewport is a tell. The only thing allowed to reach the edges is a deliberate soft background.
- **Left-aligned by default.** Centering everything is a tell — center only a hero, an empty state, or a single focal action. Body text, lists, and forms align left.
- **A floating frame is available, but off by default.** The calm default is a centered column on the warm `--bg`. For a more app-like artifact you may wrap content in a rounded `--surface` frame floating on a soft tinted backdrop (the Sense look) — reach for it deliberately, not reflexively.
- **Match density to purpose.** Reading artifacts are airy (wide margins, tall line-height); tool/dashboard artifacts are tighter and more information-dense — but still token-spaced. Don't make a dashboard breathe like an essay or vice-versa.
- **Responsive without breakpoints where possible.** Fluid type plus `grid-template-columns: repeat(auto-fit, minmax(...))` adapts most layouts; add a media query only when reflow genuinely needs one.

## Motion

Restraint applies to movement too. Transitions are short (`--dur`), eased (`--ease`), and limited to hover/focus/enter states on interactive elements. No autoplaying, attention-grabbing animation. Always honor `prefers-reduced-motion` (the token block already does globally).

---

## Avoid — the default-artifact tells

If the output shows any of these, it looks un-designed. Hunt them before returning:

- **Cramped spacing** — content packed edge to edge with no breathing room.
- **Default / unloaded font** — falling back to raw system text; no web font, no measure cap, full-width paragraphs. (A serif body where sans was wanted is the same tell.)
- **Boxy stat-card grids for simple metrics** — a row of bordered boxes around plain label→value data. Use a minimal **list column** instead.
- **Full-width content** — text and layout spanning the whole viewport instead of sitting in a centered container.
- **Garish gradients** — rainbow or high-chroma multi-stop fills. (Soft warm low-chroma washes are fine.)
- **Inconsistent radii** — a sharp card next to a round button; nested corners that don't stay concentric.
- **Everything centered** — center-aligned body text and forms.
- **Pure `#000` / `#fff`** and harsh single-layer shadows.
- **Accent overuse** — color on every element, so nothing stands out.
- **Hardcoded values** — any px/hex/radius not coming from a token, which guarantees drift.
- **One flat slab** — no surface ladder, no depth, no grouping.

---

## Recipes

Per-artifact-type layouts (document/article, dashboard, report, landing, chat/answer UI), full worked HTML, and interaction patterns live in [`RECIPES.md`](RECIPES.md). Read it when you're laying out a specific kind of artifact; the rules above apply to all of them.

## Before you return

The artifact is done only when every line holds:

- [ ] The token block is in `:root`, and **no value downstream is hardcoded** — all type/space/color/radius/shadow come from `var()`.
- [ ] The web font is loaded (`<link>`) and applied via `--font-display`/`--font-sans`, with a working system fallback — no raw default font, no serif where sans was wanted.
- [ ] At most three type sizes; hierarchy carried by weight + color, not size sprawl.
- [ ] All content sits in a centered container (prose in a `--measure` column); **nothing runs full-width**; left-aligned.
- [ ] Simple data uses a **minimal list column**, not a grid of boxed stat-cards; cards are reserved for grouped/media-rich content.
- [ ] Spacing is generous and proportional; related/unrelated grouping is legible from the gaps alone.
- [ ] Palette is warm: one soft coral accent used sparingly; pastel tints (if any) stay decorative and quiet.
- [ ] Surfaces use the `--bg`/`--surface`/`--surface-sunk` ladder; elevation only where things are truly raised.
- [ ] Radii match element size and nest concentrically (`outer − gap`).
- [ ] Light **and** dark both look intentional (checked the dark block, not just inverted).
- [ ] None of the [tells](#avoid--the-default-artifact-tells) are present.
- [ ] Self-contained apart from the font `<link>`: inline/`<style>` CSS, no JS libs, no build step.

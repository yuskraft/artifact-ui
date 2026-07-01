---
name: artifact-styling
description: Make HTML artifacts and documents look intentionally designed instead of default-styled. Use when generating any self-contained HTML artifact — reports, dashboards, landing pages, chat/answer UIs, data views — or a structured document like a resume/CV, an ərizə or formal letter, or a one-pager; anything where appearance matters, not just the content.
---

# Artifact styling

Default-looking output is the tell that no one designed it. This skill makes every artifact read as **composed** — built on purpose, from a system, with **restraint**. The whole game is predictability: reach for the same scale, hierarchy, and handling of type/space/color/corners every run, so artifacts come out coherent no matter the content.

Three leading words run through everything:

- **Restraint** — the taste. Few type sizes, one accent, calm surfaces, generous space. When unsure, remove. Polish is what you _didn't_ add.
- **Tokens** — the mechanism. Build _only_ from `var()`. Never hardcode a px, a hex, or a one-off radius. Coherence is a side effect of everyone drinking from the same well.
- **The ladder** — the structure: **primitives → blocks → templates**. Small pieces compose into sections; sections compose into documents. Reach for the highest rung that fits.

This is reference, not a workflow — one system to apply in full. Before returning any artifact, every rule that applies must have been considered; the [return checklist](#before-you-return) is the exhaustiveness bar.

## How to build (every artifact)

1. **Lay the foundation.** Read [`tokens/tokens.md`](tokens/tokens.md) for the rules, then inline [`dist/artifact.css`](dist/artifact.css) into the artifact's `<style>` — one paste that carries the palette, type, spacing, primitives, and print output. (`dist/artifact.css` is generated from [`tokens/tokens.css`](tokens/tokens.css) + [`styles/base.css`](styles/base.css); read those human-readable sources to understand or change a value, but paste the compact `dist` build — it's smaller and copies cleanly.)
2. **Compose up the ladder.** Build from [components](components/_index.md) → [blocks](blocks/_index.md). For a document type (resume, ərizə, one-pager) start from [templates](templates/_index.md). For a general artifact kind (article, dashboard, landing, answer) crib from [examples](examples/_index.md).
3. **Ship one file.** The folder structure is _source_; the output is always ONE self-contained HTML file — inline the CSS you used, no build step, no JS libs (the font `<link>` is the only external asset).

## Router — what to read for the request

| The request… | Read |
|---|---|
| any styled artifact (always) | read `tokens/tokens.md` (rules) + inline `dist/artifact.css` |
| resume / CV | [`templates/resume.html`](templates/resume.html) |
| ərizə / formal letter / application / petition | [`templates/erize.html`](templates/erize.html) |
| one-pager / report / exec summary / brief | [`templates/one-pager.md`](templates/one-pager.md) |
| long article / essay / docs page | [`examples/article.md`](examples/article.md) |
| dashboard / app UI | [`examples/dashboard.md`](examples/dashboard.md) |
| landing / marketing page | [`examples/landing.md`](examples/landing.md) |
| chat / answer UI | [`examples/answer.md`](examples/answer.md) |
| "what components/blocks exist?" | [`components/_index.md`](components/_index.md), [`blocks/_index.md`](blocks/_index.md) |
| a personal/formal document's identity | check the [brand profile](templates/_index.md#brand-profile) first |

The full per-dimension rules (type, spacing, color, corners, elevation, motion) live in `tokens/tokens.md`. The cross-cutting laws below apply to _every_ artifact.

## Layout & density

- **Always contained — never full-width.** Content lives in a centered `.container` (or the narrower `--measure` for prose); the page keeps generous gutters. Full-bleed text spanning the viewport is a tell. Only a deliberate soft background may reach the edges.
- **Left-aligned by default.** Centering everything is a tell — center only a hero, an empty state, or a single focal action. Body text, lists, and forms align left.
- **A floating frame is available, but off by default.** The calm default is a centered column on the warm `--bg`. For a more app-like artifact you may wrap content in a rounded `--surface` frame on a soft tinted backdrop — deliberately, not reflexively.
- **Match density to purpose.** Reading artifacts are airy; tool/dashboard artifacts are tighter and more information-dense — but still token-spaced. Don't make a dashboard breathe like an essay or vice-versa.
- **Responsive without breakpoints where possible.** Fluid type + `grid-template-columns: repeat(auto-fit, minmax(...))` adapts most layouts; add a media query only when reflow genuinely needs one.

## Interaction patterns

- **Focus is always visible.** Every interactive element keeps a `:focus-visible` ring; never `outline: none` without a replacement.
- **Hover is a hint, not a jump.** Background/border shifts over `--dur`; avoid layout-shifting hovers.
- **States use tokens too.** Disabled → `opacity: 0.5; cursor: not-allowed`. Active nav → `--accent-quiet` fill. Loading → a token-colored shimmer, not a default-blue spinner.
- **Tap targets ≥ 44px** for anything touchable (padding, not font-size).

## Avoid — the default-artifact tells

Hunt these before returning:

- **Cramped spacing** — content packed edge to edge with no breathing room.
- **Default / unloaded font** — raw system text, no measure cap, full-width paragraphs. (A serif where sans was wanted is the same tell.)
- **Boxy stat-card grids for simple metrics** — bordered boxes around plain label→value data. Use a [list](components/list.md) instead.
- **Full-width content** — layout spanning the whole viewport instead of a centered container.
- **Garish gradients** — rainbow or high-chroma multi-stop fills. (Soft warm low-chroma washes are fine.)
- **Inconsistent radii** — a sharp card next to a round button; nested corners that aren't concentric.
- **Everything centered** — center-aligned body text and forms.
- **Pure `#000` / `#fff`** and harsh single-layer shadows.
- **Accent overuse** — color on every element, so nothing stands out.
- **Hardcoded values** — any px/hex/radius not from a token, which guarantees drift.
- **One flat slab** — no surface ladder, no depth, no grouping.

## Scalability — how the system grows

The library is meant to grow. Keep growth clean:

- **One-line to extend.** To add a component/block/template/example, drop one file in the right folder and add one row to that folder's `_index.md`. The core (this file, `tokens/`, `styles/`) stays untouched.
- **Two-level disclosure.** This router points to a folder's `_index.md`; the index points to the specific file. That keeps context load flat as the library grows — never inline a whole library here.
- **Don't over-fragment.** One file per component/block is the default, but group a trivially small piece into a related file rather than making dozens of near-empty ones. Each file must earn its own pointer; split when a file gets big, not preemptively.
- **Single source of truth.** Values live only in `tokens/tokens.css`; each rule lives in exactly one `.md`. Templates and examples paste `tokens.css` + `base.css` — they never copy values.

## Before you return

The artifact is done only when every line holds:

- [ ] `dist/artifact.css` is inlined, and **no value downstream is hardcoded** — all type/space/color/radius/shadow come from `var()`.
- [ ] The web font is loaded (`<link>`) and applied via `--font-display`/`--font-sans`, with a working system fallback.
- [ ] At most three type sizes; hierarchy carried by weight + color, not size sprawl.
- [ ] All content sits in a centered container (prose in a `--measure` column); **nothing runs full-width**; left-aligned.
- [ ] Simple data uses a **list column**, not boxed stat-cards; cards are reserved for grouped/media-rich content.
- [ ] Spacing is generous and proportional; grouping is legible from the gaps alone.
- [ ] Palette is warm: one soft coral accent used sparingly; pastel tints (if any) stay quiet.
- [ ] Radii match element size and nest concentrically (`outer − gap`).
- [ ] Light **and** dark both look intentional (checked the dark block, not just inverted).
- [ ] For a document type: routed to the right template, filled its contract, **no `{{TOKEN}}` or placeholder left**, gaps marked `[DATA NEEDED]`; identity pulled from the brand profile if present.
- [ ] Print-ready docs (resume, ərizə, report) checked in print/PDF: A4, white-paper neutralization, no bad page breaks.
- [ ] None of the [tells](#avoid--the-default-artifact-tells) are present.

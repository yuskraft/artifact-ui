---
name: artifact-styling
description: Make HTML artifacts and documents look intentionally designed instead of default-styled. Use when generating any self-contained HTML artifact — reports, dashboards, landing pages, chat/answer UIs, data views — or a structured document like a resume/CV, an ərizə or formal letter, or a one-pager; anything where appearance matters, not just the content. Works with GPT, Codex, Claude Code, Gemini, and more LLMs.
---

# Artifact styling

Default-looking output is the tell that no one designed it. This skill makes every artifact read as **composed** — built on purpose, from a system, with **restraint**. The whole game is predictability: reach for the same scale, hierarchy, and handling of type/space/color/corners every run, so artifacts come out coherent no matter the content.

Three leading words run through everything:

- **Restraint** — the taste. Few type sizes, one accent, calm surfaces, generous space. When unsure, remove. Polish is what you _didn't_ add.
- **Tokens** — the mechanism. Build _only_ from `var()`. Never hardcode a px, a hex, or a one-off radius. Coherence is a side effect of everyone drinking from the same well.
- **The ladder** — the structure: **primitives → blocks → templates**. Small pieces compose into sections; sections compose into documents. Reach for the highest rung that fits.

This is reference, not a workflow — one system to apply in full. Before returning any artifact, every rule that applies must have been considered; the [return checklist](#before-you-return) is the exhaustiveness bar.

## How to build (every artifact)

1. **Lay the foundation.** Read [`tokens/tokens.css`](tokens/tokens.css) — the values *and* the usage rules (each group's rules live in the comments beside it) — then inline [`dist/artifact.css`](dist/artifact.css) into the artifact's `<style>` — one paste that carries the palette, type, spacing, primitives, and print output. (`dist` is generated from `tokens/tokens.css` + [`styles/base.css`](styles/base.css); paste the compact `dist` build — it's smaller and copies cleanly.)
2. **Compose up the ladder.** Build from [components](components/_index.md) → [blocks](blocks/_index.md). For a document type (resume, ərizə, one-pager, report, timeline) start from [templates](templates/_index.md). For a general artifact kind (article, dashboard, landing, answer) crib from [examples](examples/_index.md).
3. **Ship one file, zero external requests.** The folder structure is _source_; the output is always ONE self-contained HTML file that renders with the network unplugged — Claude's artifact hosting enforces a strict CSP, so anything external silently breaks. No font/CSS/JS CDNs, no remote images (use inline SVG or data URIs), no fetch calls, no build step. Type comes from the system-first font tokens; a web-font `<link>` is an opt-in *only* for a page that will live outside the sandbox. Stay far under the 16 MiB artifact cap — a text-and-SVG artifact always is.

## Router — what to read for the request

| The request… | Read |
|---|---|
| any styled artifact (always) | read `tokens/tokens.css` (values + rules in its comments) + inline `dist/artifact.css` |
| resume / CV | [`templates/resume.html`](templates/resume.html) |
| ərizə (Azerbaijani petition/application) | [`templates/erize.html`](templates/erize.html) |
| formal letter / application / petition (other languages) | [`templates/letter.html`](templates/letter.html) |
| one-pager / exec summary / brief | [`templates/one-pager.md`](templates/one-pager.md) |
| PR walkthrough / code review / audit / findings report | [`templates/report.html`](templates/report.html) |
| incident timeline / status page / changelog | [`templates/timeline.html`](templates/timeline.html) |
| long article / essay / docs page | [`examples/article.md`](examples/article.md) |
| dashboard / app UI | [`examples/dashboard.md`](examples/dashboard.md) |
| landing / marketing page | [`examples/landing.md`](examples/landing.md) |
| chat / answer UI | [`examples/answer.md`](examples/answer.md) |
| "what components/blocks exist?" | [`components/_index.md`](components/_index.md), [`blocks/_index.md`](blocks/_index.md) |
| a personal/formal document's identity | check the [brand profile](templates/brand.md) first |

The full per-dimension rules (type, spacing, color, corners, elevation, motion) live in `tokens/tokens.css` beside the values they govern. The cross-cutting laws below apply to _every_ artifact.

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
- **Untreated type** — browser-default sizing, no measure cap, full-width paragraphs, no weight hierarchy. (A serif where sans was wanted is the same tell.) The system stack is fine; leaving it *unset* is the tell.
- **A dead external request** — a font/CSS/JS CDN link or remote image that the sandbox CSP silently blocks. Everything inlines.
- **Boxy stat-card grids for simple metrics** — bordered boxes around plain label→value data. Use a [list](components/_index.md#list) instead.
- **Cards as the default wrapper** — every paragraph, list item, or section reflexively boxed in a bordered card. A card is the *last* resort, not the first: running text stays plain prose, parallel items are a bullet list, label→value pairs a [list](components/_index.md#list), collapsible detail a native `<details>` accordion, collections a [record list](components/_index.md#record-list). A card is earned only by genuinely grouped or media-rich content — a page of nothing but cards is as much a tell as no structure at all.
- **Full-width content** — layout spanning the whole viewport instead of a centered container.
- **Garish gradients** — rainbow or high-chroma multi-stop fills. (Soft warm low-chroma washes are fine.)
- **Inconsistent radii** — a sharp card next to a round button; nested corners that aren't concentric.
- **All-caps headings** — uppercase section labels/kickers. Headings are sentence-case; hierarchy comes from weight (650–700) and size, never capitalization.
- **Rule-drawn separation** — hairline borders between rows, sections, or headings. Separate with spacing (padding/margins/gaps); borders belong only to true containers (cards, inputs, chips, records), functional lines (a signature line), and a [traditional table](components/_index.md#table) where dense comparison earns its rules.
- **A table for record-shaped data** — rows of users/issues/deployments crammed into `<table>`. Collections of records default to the [record list](components/_index.md#record-list) (distinct items, chips for status, visible actions); a table is only for dense many-column comparison.
- **Everything centered** — center-aligned body text and forms.
- **Pure `#000` / `#fff`** and harsh single-layer shadows. (Exception: paper documents — resume, ərizə, letter — sit on a white sheet via `data-paper` on the root.)
- **Edge-border callouts** — a thick colored left/edge border on a note or warning box. Use the [callout component](components/_index.md#callout) (`.callout`, `.callout--warn`, `.callout--ok`): a translucent tinted wash, no border.
- **Accent overuse** — color on every element, so nothing stands out.
- **Hardcoded values** — any px/hex/radius not from a token, which guarantees drift.
- **One flat slab** — no surface ladder, no depth, no grouping.

## Scalability — how the system grows

The library is meant to grow. Keep growth clean:

- **One-line to extend.** To add a block/template/example, drop one file in the right folder and add one row to that folder's `_index.md`; a new component is CSS in `base.css` + a section in `components/_index.md`. The core (this file, `tokens/`, `styles/`) stays untouched.
- **Two-level disclosure.** This router points to a folder's `_index.md`; the index points to the specific file. That keeps context load flat as the library grows — never inline a whole library here.
- **Don't over-fragment.** Small pieces live grouped in one file (all components share `components/_index.md`); a piece earns its own file only when its docs outgrow a screenful. Each file must earn its own pointer.
- **Single source of truth.** Values live only in `tokens/tokens.css`, with each group's usage rules in the comments beside it; every other rule lives in exactly one `.md`. Templates and examples paste `dist/artifact.css` — they never copy values.

## Before you return

The artifact is done only when every line holds:

- [ ] `dist/artifact.css` is inlined, and **no value downstream is hardcoded** — all type/space/color/radius/shadow come from `var()`.
- [ ] **Zero external requests** — no CDN links, no remote images (inline SVG / data URIs only), no fetch. Type is applied via `--font-display`/`--font-sans`; the optional web-font `<link>` appears only when the page is explicitly for use outside Claude's sandbox.
- [ ] At most three type sizes; hierarchy carried by weight + color, not size sprawl.
- [ ] All content sits in a centered container (prose in a `--measure` column); **nothing runs full-width**; left-aligned.
- [ ] Simple data uses a **list column**, not boxed stat-cards; cards are reserved for grouped/media-rich content — prose, bullet lists, and `<details>` were tried before any card.
- [ ] Spacing is generous and proportional; grouping is legible from the gaps alone.
- [ ] Palette is warm: one soft coral accent used sparingly; pastel tints (if any) stay quiet.
- [ ] Radii match element size and nest concentrically (`outer − gap`).
- [ ] Artifacts default to **light** (dark never activates on its own); if dark was opted in via `data-theme="dark"`, its rendering looks intentional (checked the dark block, not just inverted).
- [ ] For a document type: routed to the right template, filled its contract, **no `{{TOKEN}}` or placeholder left**, gaps marked `[DATA NEEDED]`; identity pulled from the brand profile if present.
- [ ] Print-ready docs (resume, ərizə, report) checked in print/PDF: A4, white-paper neutralization, no bad page breaks.
- [ ] None of the [tells](#avoid--the-default-artifact-tells) are present.

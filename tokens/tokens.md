# Tokens — the rules

The values live in [`tokens.css`](tokens.css) (the single source of truth). This file is how to
_use_ them. Build every artifact by pasting `tokens.css` first, then referencing it with `var()` —
never a hardcoded px, hex, or one-off radius. Coherence is a side effect of everyone drinking from
the same well.

## Type

A default-styled font is the loudest tell. Load a real typeface — by default a clean, slightly rounded sans — and treat it well; refinement comes from both the face _and_ how it's set.

- **Web font by default.** Headings/UI use `--font-display` (a soft rounded sans), body uses `--font-sans` (a humanist workhorse). Load them with a `<link>` (see [`../styles/base.css`](../styles/base.css) and the shell in any template). Each token keeps a system fallback, so the artifact still reads cleanly offline. To go fully self-contained, swap both tokens to their system fallbacks or inline the font as base64.
- **Sans everywhere.** Both default fonts are sans; the warm-pastel references are all sans. A serif is a rare, deliberate opt-in for a long-form essay or a traditional formal document — not the default.
- **Three sizes per artifact, not seven.** Pick a heading size, a body size, and a small/meta size from the scale. Reach for more only when the content genuinely has more levels. Hierarchy comes from **weight and color**, not from inventing new sizes.
- **Weight does the work.** Body `400`; emphasis and UI labels `500`–`550`; headings `600`–`700` (the base styles use `650`). The templates load the fonts as variable ranges so intermediate weights render truly. Two weights present at once is usually enough.
- **Line-height is inverse to size.** Body gets `--leading-body`; headings get `--leading-tight`; large headings also get `--tracking-tight` (large type looks loose until you pull it in).
- **Cap the measure.** Running prose lives in a `max-width: var(--measure)` column. Full-width paragraphs are a default tell.
- **Numbers in tables and stats:** `font-variant-numeric: tabular-nums` so figures align.

## Space & rhythm

Cramped is the loudest default tell; the reference designs breathe. Spend space generously and _proportionally_.

- **Every gap is a token.** Padding, margins, and `gap` come from `--space-*` only. No arbitrary `13px`.
- **Space scales with the container.** A page section gets `--space-8`/`--space-9` of vertical breathing room; a card interior gets `--space-5`/`--space-6`; a chip gets `--space-2`. Big things get big space.
- **Group with proximity.** Related items sit close; unrelated groups sit far apart. The size of a gap _is_ the relationship — make related/unrelated gaps obviously different (e.g. `--space-2` within a group, `--space-6` between groups).
- **Prefer `gap` over margins.** Lay out with flex/grid `gap` for even rhythm; reserve margins for prose flow.

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

- **Cards are for grouped or media-rich content — not for simple data.** A bordered box earns its weight when it holds an image, a mixed cluster, or a distinct object. A handful of label→value metrics does **not** belong in a grid of boxes; use a minimal **list column** instead (label muted, value emphasized, rows separated by a hairline or just space — see [`../components/list.md`](../components/list.md)). Boxing every datum is a tell.
- **Shadows are soft and layered** (the `--shadow-*` tokens stack a tight contact shadow with a wide ambient one). One hard `0 4px 8px black` is a tell.
- **Elevation has meaning.** Lift only things that are actually above the page (cards, popovers, sticky bars). A flat thing with a drop shadow is noise.
- **In dark mode, light the surface, don't shadow it.** Raise `--surface` lightness and add a `--border`; shadows barely register on dark.
- **Borders are quiet.** `--border` separates; `--border-strong` only when a divider must assert itself. Hairlines, not heavy rules.

## Motion

Restraint applies to movement too. Transitions are short (`--dur`), eased (`--ease`), and limited to hover/focus/enter states on interactive elements. No autoplaying, attention-grabbing animation. `prefers-reduced-motion` is honored globally by `tokens.css`.

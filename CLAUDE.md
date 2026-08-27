# CLAUDE.md

This repo ships a Claude skill (entry point: `skills/artifact-ui/SKILL.md`) — a
design system the model reads to style HTML artifacts. There is no app to run
and no package.json; the only executables are the zero-dependency scripts.

## Commands

- `node scripts/build.mjs` — regenerate `skills/artifact-ui/dist/artifact.css`
  from `skills/artifact-ui/tokens/tokens.css` + `skills/artifact-ui/styles/base.css`,
  then sync that CSS into every page that embeds it (`index.html`, `az.html`,
  `showcase/*.html`). Run after ANY edit to `tokens/` or `styles/`.
- `node scripts/build.mjs --check` — fails if `dist/artifact.css` **or any embedded
  copy** is stale. CI runs this.
- `node scripts/serve.mjs` — static dev server on :8643 for viewing the landing
  pages and `showcase/`.
- `node scripts/lint.mjs [files…]` — deterministic slop gate: checks the landing
  pages, `showcase/`, and templates (or the given files) against SKILL.md's
  "Avoid" list (hardcoded values, external resources, `transition: all`, missing
  `alt`, …). CI runs it; keep its rules in sync when editing the Avoid list.

## Hard rules

- **Never hand-edit `skills/artifact-ui/dist/artifact.css`** — it is generated.
  Edit `tokens/tokens.css` or `styles/base.css` (both under `skills/artifact-ui/`),
  then rebuild.
- Values live only in `tokens/tokens.css` (their usage rules ride along as
  comments there); other docs (component, block, template files) must not
  restate values.
- Artifacts make **zero external requests** — system-first font stacks; the
  web-font `<link>` is opt-in for pages outside Claude's sandbox only.
- Do not add dependencies or a `package.json` — the repo is zero-dependency by design.
- After changing a color token, update the tables in `scripts/contrast.mjs` and
  run `node scripts/contrast.mjs` (WCAG AA gate). Accent colors are gated across
  every mood preset in `ACCENT_PRESETS`, which must mirror the preset table in
  `tokens.css`. The gate also fails on sRGB gamut clipping — if a preset's
  chroma clips, lower **that preset's chroma**, never a minimum.
- Pages that embed the CSS need the `/* end artifact.css */` marker after the
  generated block, or the build's sync step will error.

## Structure

The installable skill payload is `skills/artifact-ui/` — everything an agent
needs, nothing else. Inside it:
`SKILL.md` (router + laws) → `tokens/tokens.css` (values + rules) →
`styles/base.css` (primitives) → `components/_index.md` (all component docs in
one file) → `blocks/` → `templates/` + `examples/`.
To add a block/template/example: one new file in the folder + one row in that
folder's `_index.md`. To add a component: CSS in `base.css` + one section in
`components/_index.md` (see SKILL.md "Scalability").

**What goes where:** a value + its usage rule → `tokens/tokens.css`; a CSS
primitive → `styles/base.css` (then rebuild dist); its usage doc →
`components/_index.md` (own file only past a screenful); a markup recipe with no
new CSS → `blocks/`; a whole-document skeleton → `templates/`; a full-page study
→ `examples/`; a rendered proof kept on purpose → `showcase/` (outside the
payload); an ephemeral render-proof → the session scratchpad, never the repo
(`_*.html` is gitignored as a backstop).

Repo root holds distribution + site only: `scripts/` (build/contrast/serve),
`index.html`/`az.html` (landing pages), `showcase/` (complete rendered proof
pages — outside the payload on purpose, so they cost the agent nothing),
`.claude-plugin/marketplace.json` (Claude Code plugin marketplace), CI. When
cutting a release, bump `version` in `.claude-plugin/marketplace.json`.

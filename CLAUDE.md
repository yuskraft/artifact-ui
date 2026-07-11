# CLAUDE.md

This repo IS a Claude skill (entry point: `SKILL.md`) — a design system the
model reads to style HTML artifacts. There is no app to run and no package.json;
the only executable is the zero-dependency build script.

## Commands

- `node scripts/build.mjs` — regenerate `dist/artifact.css` from
  `tokens/tokens.css` + `styles/base.css`. Run after ANY edit to `tokens/` or `styles/`.
- `node scripts/build.mjs --check` — fails if `dist/artifact.css` is stale. CI runs this.

## Hard rules

- **Never hand-edit `dist/artifact.css`** — it is generated. Edit
  `tokens/tokens.css` or `styles/base.css`, then rebuild.
- Values live only in `tokens/tokens.css` (their usage rules ride along as
  comments there); other docs (component, block, template files) must not
  restate values.
- Artifacts make **zero external requests** — system-first font stacks; the
  web-font `<link>` is opt-in for pages outside Claude's sandbox only.
- Do not add dependencies or a `package.json` — the repo is zero-dependency by design.
- After changing a color token, update the pairs table in `scripts/contrast.mjs`
  and run `node scripts/contrast.mjs` (WCAG AA gate).

## Structure

`SKILL.md` (router + laws) → `tokens/tokens.css` (values + rules) →
`styles/base.css` (primitives) → `components/_index.md` (all component docs in
one file) → `blocks/` → `templates/` + `examples/`.
To add a block/template/example: one new file in the folder + one row in that
folder's `_index.md`. To add a component: CSS in `base.css` + one section in
`components/_index.md` (see SKILL.md "Scalability").

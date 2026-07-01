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
- Values live only in `tokens/tokens.css`; docs (`tokens/tokens.md`, component
  and block files) must not restate values.
- Do not add dependencies or a `package.json` — the repo is zero-dependency by design.

## Structure

`SKILL.md` (router + laws) → `tokens/` (values + rules) → `styles/base.css`
(primitives) → `components/` → `blocks/` → `templates/` + `examples/`.
To add a component/block/template: one new file in the folder + one row in that
folder's `_index.md` (see SKILL.md "Scalability").

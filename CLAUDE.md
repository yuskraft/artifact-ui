# CLAUDE.md

This repo ships a Claude skill (entry point: `skills/artifact-ui/SKILL.md`) — a
design system the model reads to style HTML artifacts. There is no app to run
and no package.json; the only executables are the zero-dependency scripts.

## Commands

- `node scripts/build.mjs` — regenerate `skills/artifact-ui/dist/artifact.css`
  from `skills/artifact-ui/tokens/tokens.css` + `skills/artifact-ui/styles/base.css`.
  Run after ANY edit to `tokens/` or `styles/`.
- `node scripts/build.mjs --check` — fails if `dist/artifact.css` is stale. CI runs this.

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
- After changing a color token, update the pairs table in `scripts/contrast.mjs`
  and run `node scripts/contrast.mjs` (WCAG AA gate).

## Structure

The installable skill payload is `skills/artifact-ui/` — everything an agent
needs, nothing else. Inside it:
`SKILL.md` (router + laws) → `tokens/tokens.css` (values + rules) →
`styles/base.css` (primitives) → `components/_index.md` (all component docs in
one file) → `blocks/` → `templates/` + `examples/`.
To add a block/template/example: one new file in the folder + one row in that
folder's `_index.md`. To add a component: CSS in `base.css` + one section in
`components/_index.md` (see SKILL.md "Scalability").

Repo root holds distribution + site only: `scripts/` (build/contrast/serve),
`index.html`/`az.html` (landing pages), `.claude-plugin/marketplace.json`
(Claude Code plugin marketplace), CI. When cutting a release, bump `version` in
`.claude-plugin/marketplace.json`.

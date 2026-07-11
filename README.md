# artifact-styling

A design-system **skill** that makes the HTML artifacts and documents an LLM returns look
intentionally designed instead of default-styled — general-purpose, self-contained, print-ready.
Warm-pastel palette, restrained typography, one accent, always contained.

It sits in the deterministic middle of the artifact-skill landscape: not a philosophy prompt
(Anthropic's `frontend-design`), not a React/Tailwind build pipeline (`web-artifacts-builder`) — a
**real token system + copyable templates**, WCAG-gated, zero dependencies, ~2k tokens of CSS per
artifact, valid under Claude's artifact-sandbox CSP by construction.

The repo root **is** the skill: [`SKILL.md`](SKILL.md) is the entry point; everything else is its
library.

## What it does

Given a plain content brief ("make a resume", "style this as a page", "write an ərizə"), the skill
produces one self-contained HTML file that follows a coherent design system every run. It covers
general artifacts (articles, dashboards, landing pages, answer UIs) and structured document types
(resume/CV, ərizə/formal letter, one-pager, review/audit report, incident timeline).

## Structure — the atomic ladder

```
SKILL.md            # foundations (design laws) + router + return checklist — the one always-read file
tokens/
  tokens.css        # canonical design tokens + their usage rules (in comments) — single source of truth
styles/
  base.css          # reset + primitive classes + @media print (A4, white-paper)
dist/
  artifact.css      # GENERATED: tokens.css + base.css merged & minified — what artifacts inline
components/         # one file: button, chip, list, card, table, field, form patterns
blocks/             # composed sections: section, doc-header, contact-row, experience-entry, signature
templates/          # document types: resume, erize, letter, one-pager, report, timeline (+ brand profile)
examples/           # worked artifacts: article, dashboard, landing, answer
scripts/            # build.mjs (regenerate dist) + contrast.mjs (WCAG AA gate)
```

**Primitives → blocks → templates.** Small pieces compose into sections; sections compose into
documents. Adding a component/block/template is one new file + one line in that folder's `_index.md`.

**Source vs output.** The folder split is a *source* organization. Every generated artifact is still
ONE self-contained HTML file — the skill inlines `dist/artifact.css` and the markup it used. No build
step, no JS libraries, **no external requests at all**: artifacts render identically with the network
unplugged, so they're valid inside Claude's CSP-locked artifact sandbox (claude.ai and Claude Code
artifact hosting) by construction. See [Fonts](#fonts).

## Install

It's a **model-invoked** skill — copy the repo into your skills directory:

```bash
# personal (all projects)
cp -R . ~/.claude/skills/artifact-styling
# or project-local
cp -R . <your-project>/.claude/skills/artifact-styling
```

Then just ask in natural language — **there is no slash command**. The model reads the skill's
description and fires it when your request matches:

> "Make me a resume as an HTML artifact."
> "Write an ərizə requesting leave."
> "Style this report so it looks designed."

To force it, name it: *"use artifact-styling to …"*. (You can also package it as a plugin and add a
`/…` command wrapper if you want an explicit trigger.)

### Optional: brand profile

Personal/formal docs (resume, ərizə) auto-fill identity from an optional
`~/.config/artifact-ui/brand.md` (or project `./.artifact-brand.md`) — name, role, contact,
`accent_hue`, language. Absent → the skill fills from your prompt or asks once. Schema is documented
in [`templates/brand.md`](templates/brand.md).

## Token usage & cost

Measured; ≈4 chars/token.

| State | What loads | ~Tokens |
|---|---|---|
| **Idle** (skill not used) | just the `description` frontmatter | **~90** |
| **First use** (general artifact) | SKILL.md + tokens.css + `dist/artifact.css` (+1 example) | **~6k in** |
| **First use** (document type) | SKILL.md + templates/_index + template + tokens.css + dist | **~7k in** |
| **Output** (per artifact) | inlined `dist/artifact.css` + markup | **~2.7–3.5k out** |
| **Repeat use, same session** | same files, prompt-cached | **~10% of first** |

**Verdict: light-to-moderate.** Idle cost is negligible (the library is invisible until
triggered). The dominant recurring cost is the CSS the model inlines into each artifact — which is
why the skill pastes the **minified `dist/artifact.css` (−35% vs the raw sources)**
rather than the commented sources. Values and their usage rules share one file (`tokens/tokens.css`),
so the rules ride along in comments the build strips from `dist`.

### Making it cheaper

- **Use Haiku for generation.** Assembling an artifact (paste the CSS bundle + fill a template) is
  mechanical, not judgment — run it on **Claude Haiku** and reserve Opus/Sonnet for design decisions.
  This is the single biggest cost lever for high-volume use.
- **Lean on prompt caching.** The skill's files are stable, so within a session the second and later
  artifacts re-read them at cache rates (~10%). Don't churn `tokens/`/`styles/` mid-session.
- **The `dist/` bundle** already trims per-artifact output by ~35% and reduces CSS drift (the model
  copies one compact block instead of regenerating two commented files).

## Development

`tokens/` + `styles/` are the **single source of truth** (commented, human-edited).
`dist/artifact.css` is **generated** — never hand-edit it. After changing a token or style, rebuild:

```bash
node scripts/build.mjs          # regenerate dist/artifact.css (zero dependencies)
node scripts/build.mjs --check  # CI/pre-commit: fails if dist is stale
```

The build only regenerates the skill's own stylesheet — **output artifacts stay buildless.**

To re-theme everything, change one number: `--hue-accent` in `tokens/tokens.css`, then rebuild.

## Fonts

Type is **system-first by default**: the font tokens resolve to a tuned system stack
(`ui-rounded`/SF Pro Rounded for display on Apple platforms, the platform sans for body), so
artifacts are fully self-contained and render identically inside Claude's CSP-locked artifact
sandbox — no silent fallback, because nothing external is requested.

The named web fonts (Plus Jakarta Sans / Inter / JetBrains Mono) still *lead* each stack as an
**opt-in upgrade**: for a page that will live outside the sandbox, add the Google-Fonts `<link>`
(each template carries it in a comment) and the same tokens pick the web fonts up automatically.
To get the exact web-font look inside the sandbox, inline the fonts as base64 `@font-face`.

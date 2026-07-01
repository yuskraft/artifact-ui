# artifact-styling

A design-system **skill** that makes the HTML artifacts and documents an LLM returns look
intentionally designed instead of default-styled — general-purpose, self-contained, print-ready.
Warm-pastel palette, restrained typography, one accent, always contained.

The repo root **is** the skill: [`SKILL.md`](SKILL.md) is the entry point; everything else is its
library.

## What it does

Given a plain content brief ("make a resume", "style this as a page", "write an ərizə"), the skill
produces one self-contained HTML file that follows a coherent design system every run. It covers
general artifacts (articles, dashboards, landing pages, answer UIs) and structured document types
(resume/CV, ərizə/formal letter, one-pager).

## Structure — the atomic ladder

```
SKILL.md            # foundations (design laws) + router + return checklist — the one always-read file
tokens/
  tokens.css        # canonical design tokens (OKLCH color, fluid type, spacing…) — single source of truth
  tokens.md         # the rules: type, spacing, color, corners, elevation
styles/
  base.css          # reset + primitive classes + @media print (A4, white-paper)
dist/
  artifact.css      # GENERATED: tokens.css + base.css merged & minified — what artifacts inline
components/         # primitives: button, chip, list, card, field
blocks/             # composed sections: section, doc-header, contact-row, experience-entry, signature
templates/          # document types: resume.html, erize.html, one-pager.md (+ decision tree, brand profile)
examples/           # worked artifacts: article, dashboard, landing, answer
scripts/build.mjs   # regenerates dist/artifact.css from the sources
```

**Primitives → blocks → templates.** Small pieces compose into sections; sections compose into
documents. Adding a component/block/template is one new file + one line in that folder's `_index.md`.

**Source vs output.** The folder split is a *source* organization. Every generated artifact is still
ONE self-contained HTML file — the skill inlines `dist/artifact.css` and the markup it used. No build
step and no JS libraries are needed to *run* an artifact (only a web-font `<link>`; see
[Fonts](#fonts--a-known-limitation)).

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
in [`templates/_index.md`](templates/_index.md#brand-profile).

## Token usage & cost

Measured; ≈4 chars/token.

| State | What loads | ~Tokens |
|---|---|---|
| **Idle** (skill not used) | just the `description` frontmatter | **~90** |
| **First use** (general artifact) | SKILL.md + tokens.md + `dist/artifact.css` (+1 example) | **~6k in** |
| **First use** (document type) | SKILL.md + templates/_index + template + tokens.md + dist | **~7k in** |
| **Output** (per artifact) | inlined `dist/artifact.css` + markup | **~2.7–3.5k out** |
| **Repeat use, same session** | same files, prompt-cached | **~10% of first** |

**Verdict: light-to-moderate.** Idle cost is negligible (the 25-file library is invisible until
triggered). The dominant recurring cost is the CSS the model inlines into each artifact — which is
why the skill pastes the **minified `dist/artifact.css` (~1.76k tokens, −35% vs the raw sources)**
rather than the commented files.

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

## Fonts — a known limitation

Artifacts load Plus Jakarta Sans / Inter via a Google-Fonts `<link>`. In a **standalone browser** the
fonts load and the intended look renders fully. Inside the **Claude artifact sandbox** a strict CSP
blocks external requests, so the fonts silently fall back to the system sans stack (still clean, less
distinctive). If you need the exact type in both environments, inline the fonts as base64 or switch
the font tokens to a tuned system stack — see the design notes.

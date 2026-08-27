# Showcase

Complete, renderable pages built only from shipped tokens and classes — the system at full strength,
one page per archetype. These are proofs, not part of the installable skill (`skills/artifact-ui/`).

| Page | Shows |
|---|---|
| [dashboard-dark.html](dashboard-dark.html) | Dark theme, technical preset, stats + bars + sparkline, one `--glow-accent` |
| [report.html](report.html) | Serious preset, one `.display` verdict number, findings table + bars + callouts, print-ready |
| [landing.html](landing.html) | Brand preset, `--wash-hero` hero, inline-SVG icons, steps, FAQ, one closing `.band` |
| [article-editorial.html](article-editorial.html) | Editorial preset, serif pull quote, heading-rhythm long-form |
| [resume.html](resume.html) | `data-paper` resume — white sheet, entry layout, chip skills, print-ready |
| [erize.html](erize.html) | Azerbaijani ərizə — traditional top-right addressee, centered title, signature row |
| [letter.html](letter.html) | Language-neutral formal letter — sender block, subject, sign-off |

Each spends exactly one signature moment. View them with:

```bash
node scripts/serve.mjs
```

Their embedded CSS is kept in sync by `node scripts/build.mjs`; `--check` fails if any page drifts.

Every page here (plus the landing pages and templates) is also gated by `node scripts/lint.mjs` —
the deterministic mirror of SKILL.md's "Avoid" list. It catches the mechanically checkable tells
(hardcoded hex/px, `transition: all`, external resources, forced uppercase, missing `alt`, …) as
errors, and heuristic ones (edge bars, kickers, accent overuse) as warnings. It works on any
generated artifact too: `node scripts/lint.mjs path/to/artifact.html`, with `--sandbox` to also
fail on web-font links when the page is destined for Claude's CSP sandbox.

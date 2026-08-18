# Showcase

Complete, renderable pages built only from shipped tokens and classes — the system at full strength,
one page per archetype. These are proofs, not part of the installable skill (`skills/artifact-ui/`).

| Page | Shows |
|---|---|
| [dashboard-dark.html](dashboard-dark.html) | Dark theme, technical preset, stats + bars + sparkline, one `--glow-accent` |
| [report.html](report.html) | Document hero opener, bars, findings, print-ready |
| [landing.html](landing.html) | `--wash-hero`, serious preset, inline-SVG icons, one `.band` |
| [article-editorial.html](article-editorial.html) | Editorial preset, TOC rail, long-form reading |

Each spends exactly one signature moment. View them with:

```bash
node scripts/serve.mjs
```

Their embedded CSS is kept in sync by `node scripts/build.mjs`; `--check` fails if any page drifts.

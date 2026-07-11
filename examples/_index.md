# Examples (worked artifacts)

Full compositions for common artifact types — read the one that matches what you're building. Each
assumes `dist/artifact.css` is already in the document's `<style>` and adds only
layout-specific CSS. The design rules apply to all of them.

| Example | For |
|---|---|
| [Article / document](article.md) | Reading-first long text, optional TOC rail |
| [Dashboard / app](dashboard.md) | Sidebar nav + contained content, metrics as a list column |
| [Landing / hero](landing.md) | Screen-first showcase, one focal hero + CTA |
| [Chat / answer UI](answer.md) | Assistant answer: trace, body, actions, sources |

For structured **documents** (resume, ərizə, one-pager, report, timeline) use
[templates](../templates/_index.md) instead — those are copyable and print-ready.

Every example must look intentional in **both modes** — the tokens flip automatically with
`prefers-color-scheme`, but check the dark rendering deliberately (surfaces lighter than bg,
accent glowing, no shadow soup), don't assume the inversion worked.

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

## Going dark

Examples render **light by default** — dark is an explicit opt-in (`data-theme="dark"` on the
root), never automatic. But opt-in is not the same as discouraged: dark is the right answer for
developer and technical dashboards, log and terminal views, chart- or media-heavy showcases where a
dark ground makes the content glow, and night/space/audio subject matter. Reading documents —
reports, letters, resumes, essays — stay light.

When you do go dark, check the rendering deliberately rather than assuming an inversion worked:
surfaces sit *lighter* than the background, elevation comes from surface lightness and border
instead of shadow, and the accent lifts to glow. Dark is also where `--glow-accent` becomes
available — one glowing element per page, and it should be the same element that carries the
signature moment.

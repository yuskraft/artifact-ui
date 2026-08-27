# Templates (document types)

Full document types. **Hybrid depth:** fixed-format docs ship a complete copyable HTML file (copy
it, fill the slots, don't author layout); semi-structured docs ship a recipe you compose from
[blocks](../blocks/_index.md).

| Type | Path | Kind | Structure |
|---|---|---|---|
| Resume / CV | [`resume.html`](resume.html) | copyable HTML | header/contact → summary → experience → skills → education |
| ərizə / formal letter | [`erize.html`](erize.html) | copyable HTML | recipient → applicant → **ƏRİZƏ** → body → sign-off + signature + date |
| Formal letter (any language) | [`letter.html`](letter.html) | copyable HTML | sender → date → recipient → subject → salutation → body → sign-off + signature |
| One-pager / report | [`one-pager.md`](one-pager.md) | blocks recipe | header → sections → a metrics list → optional figure |
| Review / audit report | [`report.html`](report.html) | copyable HTML | header + verdict → summary → findings table → sections + callouts |
| Timeline / status | [`timeline.html`](timeline.html) | copyable HTML | header + status → dated entries on a rail → current state |

**To add a type:** drop a file here and add one row above. Ship a full HTML template only when the
format is near-fixed; otherwise a blocks recipe.

## Decision tree (route before asking)

- Formal request/petition to an authority, **in Azerbaijani**, ≤1 page → **ərizə** (`erize.html`)
- Formal letter / application / petition in any other language → **letter** (`letter.html`)
- Career document, 1–2 pages → **resume** (`resume.html`)
- Exec summary / short report / brief, ~1 page → **one-pager** (`one-pager.md`)
- PR walkthrough / code review / audit / findings report → **report** (`report.html`)
- Incident timeline / status page / changelog / project log → **timeline** (`timeline.html`)
- Long reading-first text → not a document type; use [examples/article](../examples/article.md)
- Screen-first app/marketing → [examples/dashboard](../examples/dashboard.md) or [landing](../examples/landing.md)

Every template: paste `dist/artifact.css` into the `<style>`, then fill.

Paper documents (resume, ərizə, letter) carry `data-paper` on `<html>` — they render as a white
sheet on screen, not the cream app background. Keep the attribute when adapting them.
Print-ready docs pick up A4 + white-paper output from `base.css`'s `@media print` automatically —
the user exports with the browser's "Save as PDF".

## Content contract (all document types)

- **No placeholder or filler.** No "Lorem ipsum", "[insert here]", padded prose, or paragraphs that
  restate their heading. If a fact is missing, write `[DATA NEEDED: description]` — never invent
  metrics, dates, or credentials.
- **Fill from the [brand profile](brand.md) first** (personal/formal docs only), then the prompt,
  then ask once for what's still missing.
- **Match the document's language** for headings, sign-offs, and dates.
- **Say each idea once.** A document doesn't vary its words for literary effect — the same thing is
  called the same name everywhere, and no sentence restates the one before it.
- **Smart punctuation.** Curly quotes in prose (straight only in code); en dash for ranges
  (`2010–2020`); em dash for asides; a real ellipsis (`…`); `&nbsp;` between a value and its unit
  (`16&nbsp;px`).

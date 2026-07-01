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

**To add a type:** drop a file here and add one row above. Ship a full HTML template only when the
format is near-fixed; otherwise a blocks recipe.

## Decision tree (route before asking)

- Formal request/petition to an authority, **in Azerbaijani**, ≤1 page → **ərizə** (`erize.html`)
- Formal letter / application / petition in any other language → **letter** (`letter.html`)
- Career document, 1–2 pages → **resume** (`resume.html`)
- Exec summary / short report / brief, ~1 page → **one-pager** (`one-pager.md`)
- Long reading-first text → not a document type; use [examples/article](../examples/article.md)
- Screen-first app/marketing → [examples/dashboard](../examples/dashboard.md) or [landing](../examples/landing.md)

Every template: paste `dist/artifact.css` into the `<style>`, then fill.
Print-ready docs pick up A4 + white-paper output from `base.css`'s `@media print` automatically —
the user exports with the browser's "Save as PDF".

## Content contract (all document types)

- **No placeholder or filler.** No "Lorem ipsum", "[insert here]", padded prose, or paragraphs that
  restate their heading. If a fact is missing, write `[DATA NEEDED: description]` — never invent
  metrics, dates, or credentials.
- **Fill from the brand profile first** (below), then the prompt, then ask once for what's still
  missing.
- **Match the document's language** for headings, sign-offs, and dates.

## Brand profile

Personal/formal docs need identity. The skill reads an optional profile so it doesn't re-ask every
time; if absent, it fills from the prompt or asks once.

- **Location:** `~/.config/artifact-ui/brand.md`, or a project-local `./.artifact-brand.md`
  (project overrides global).
- **Format:** YAML frontmatter + optional freeform notes below.

```markdown
---
name: Nurlan Yusifli
role: Product Designer
email: you@example.com
phone: "+994 ..."
location: Baku, Azerbaijan
accent_hue: 35      # maps to --hue-accent
language: az         # default document language (az / en / …)
tone: warm           # freeform hint for copy
---
Freeform notes: preferred phrasings, things to avoid, etc.
```

- **Precedence:** explicit prompt > brand file > ask once > built-in defaults.
- **Apply:** map `accent_hue` → `--hue-accent`; fill `{{NAME}}`, `{{ROLE}}`, `{{EMAIL}}`,
  `{{PHONE}}`, `{{LOCATION}}`, `{{DATE}}` in the templates. Leave nothing as a literal `{{TOKEN}}`
  in the final artifact.

# One-pager / report

Semi-structured, so it's a **blocks recipe**, not a copyable template — compose it from
[blocks](../blocks/_index.md). An exec summary or short report: one page, scannable, one figure at
most. Paste `dist/artifact.css` first.

## Structure (contract)
1. **Title** — a bare `<h1>`. No date/author strip above or below it.
2. **Lead** — 1–2 sentences stating the takeaway up front. No throat-clearing.
3. **Sections** ([section block](../blocks/section.md)) — 2–4 short titled sections carrying the
   argument. Each is a tight paragraph or a short list, not a wall of text.
4. **Metrics** — as a [list column](../components/_index.md#list), never boxed stat-cards.
5. **Optional figure** — one table or one simple chart if it earns its place.

## Tone & rules
- One page. If it overflows, cut — don't shrink type or spacing.
- Lead with the conclusion; support below. `[DATA NEEDED: …]` for any missing figure.
- Print-ready via `base.css` (`@media print` → A4). Add `.avoid-break` to the metrics list and any
  figure so they don't split.

## Skeleton
```html
<main class="container stack" style="gap: var(--space-6); max-width: 48rem; padding-block: var(--space-8)">
  <!-- 1. doc header -->
  <h1>{{TITLE}}</h1>

  <!-- 2. lead -->
  <p style="font-size: var(--text-lg)">{{One-sentence takeaway, stated plainly.}}</p>

  <!-- 3. sections -->
  <section class="stack" style="gap: var(--space-3)">
    <h2>{{Section title}}</h2>
    <p>{{Tight supporting paragraph.}}</p>
  </section>

  <!-- 4. metrics as a list column -->
  <section class="stack" style="gap: var(--space-3)">
    <h2>Key numbers</h2>
    <div class="list avoid-break">
      <div class="list__row"><span class="list__label">{{Metric}}</span><span class="list__value">{{Value}}</span></div>
      <div class="list__row"><span class="list__label">{{Metric}}</span><span class="list__value">{{Value}}</span></div>
    </div>
  </section>
</main>
```

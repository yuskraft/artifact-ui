# Signature

Closing for a formal letter or ərizə: sign-off, a signature line, and a dateline.

```html
<div class="cluster" style="justify-content: space-between; align-items: flex-end; margin-block-start: var(--space-7)">
  <span class="muted">{{DATE}}</span>
  <div class="stack" style="gap: var(--space-5); text-align: end">
    <span>Hörmətlə,</span>
    <span style="border-block-start: 1px solid var(--border-strong); padding-block-start: var(--space-1); min-width: 14rem">{{NAME}}</span>
  </div>
</div>
```

- Sign-off matches the document language ("Hörmətlə," / "Sincerely," / "敬具").
- The signature line is a hairline rule the person signs above; keep it a fixed min-width.
- Dateline on the opposite side; tabular date. Keep the whole block on one page (`.avoid-break`).

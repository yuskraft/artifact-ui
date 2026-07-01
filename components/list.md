# List

A minimal list column — **the default for simple label→value data.** No boxes. CSS: `.list`,
`.list__row`, `.list__label`, `.list__value`.

```html
<div class="list">
  <div class="list__row"><span class="list__label">Active users</span><span class="list__value">12,840</span></div>
  <div class="list__row"><span class="list__label">Avg. session</span><span class="list__value">14:20</span></div>
  <div class="list__row"><span class="list__label">Completion</span><span class="list__value">92%</span></div>
</div>
```

- **Prefer this over a grid of stat-cards.** A handful of metrics belongs in a list column, not a row of bordered boxes — boxing every datum is a tell.
- Label demoted to `--text-2`; value emphasized (`600`, tabular-nums so figures align).
- Rows separated by a hairline `--border`; the last row drops its rule automatically.
- For a plain list without the label/value split, use `.stack` with `gap: var(--space-2)`.

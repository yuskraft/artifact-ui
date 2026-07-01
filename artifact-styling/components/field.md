# Field

Form inputs. CSS targets `input`, `textarea`, `select` directly (via `:where(...)`, so it's easy to
override).

```html
<label class="stack" style="gap: var(--space-1)">
  <span class="muted">Email</span>
  <input type="email" placeholder="you@example.com">
</label>
```

- Inputs sit on `--surface-sunk` (a well), with a hairline border and `--radius-md`.
- **Focus is visible** — a 2px `--accent` ring; never `outline: none` alone.
- Pair every field with a label; use `--text-2`/`--muted` for the label, not shrunk-to-nothing text.
- Keep forms left-aligned in a contained column; don't center form fields.

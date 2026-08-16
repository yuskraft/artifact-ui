# Doc header

Title + meta atop a document, article, or report. Optionally a small tag chip above the title.

```html
<header class="stack" style="gap: var(--space-2)">
  <span class="chip" style="align-self: flex-start; background: var(--accent-quiet); color: var(--accent); border-color: transparent">Design notes</span>
  <h1>Corners are relative</h1>
  <p class="muted">Published 1 July 2026 · 6 min read</p>
</header>
```

- Title is the one big type size; meta demoted to `--muted`, not shrunk illegibly.
- The optional chip is the only spot of accent up here — one, not a rainbow.
- Left-aligned. Keep the header inside the contained column, not full-width.

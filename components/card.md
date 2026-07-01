# Card

A raised surface — **only for grouped or media-rich content, never for plain metrics.** CSS: `.card`.

```html
<!-- media + text cluster: a legitimate card -->
<div class="card cluster" style="gap: var(--space-4)">
  <div style="width: 8rem; aspect-ratio: 16/10; border-radius: var(--radius-md); background: linear-gradient(135deg, var(--tint-peach), var(--tint-lavender)); flex: none"></div>
  <div class="stack" style="gap: var(--space-1)">
    <strong style="font-family: var(--font-display)">Calm Flow Journey</strong>
    <span class="muted">Daniel Cru · 5 min</span>
  </div>
</div>
```

- A card earns its border when it holds an image, a mixed cluster, or a distinct object. For simple label→value data use [list](list.md) instead.
- **Nest corners concentrically:** an inner element inside the card's `--space-6` padding needs `border-radius: calc(var(--radius-lg) - var(--space-6))` (or a smaller token) so curves stay parallel.
- Elevation has meaning — a card sits above the page. Don't shadow flat content.

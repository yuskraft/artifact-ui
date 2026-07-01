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
- **Nest corners concentrically:** inner radius = outer − padding, but only while the padding is *smaller* than the outer radius (e.g. inside `--space-3` padding, `calc(var(--radius-lg) - var(--space-3))` ≈ 4px). The card's own `--space-6` padding (32px) exceeds `--radius-lg` (16px), so a concentric inner corner is ≤ 0 — give nested elements a small fixed radius (`--radius-sm`) or none; never a negative `calc()`, which is invalid CSS.
- Elevation has meaning — a card sits above the page. Don't shadow flat content.

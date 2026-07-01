# Chip

Small pills for tags, filters, sources, or metadata. CSS: `.chip`.

```html
<span class="chip">Mindfulness</span>

<!-- soft pastel tag: tint background + accent text -->
<span class="chip" style="background: var(--accent-quiet); color: var(--accent); border-color: transparent">Design notes</span>

<!-- category coding with a decorative tint -->
<span class="chip" style="background: var(--tint-sage); border-color: transparent">Health</span>
```

- Default chip is quiet (muted text, hairline border). Reach for a `--tint-*` fill only for gentle category coding, and keep it behind muted/accent text.
- Don't let a row of colorful chips compete with the one action accent — chips are metadata, not calls to action.
- Group chips with `.cluster` for even spacing.

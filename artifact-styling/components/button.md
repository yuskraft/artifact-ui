# Button

Actions. CSS: `.btn` (neutral) and `.btn--accent` (the one primary action).

```html
<button class="btn">Secondary</button>
<button class="btn btn--accent">Primary action</button>
```

- **One accent button per view.** The `--accent` fill marks the single most important action; everything else is a neutral `.btn`. Two accent buttons side by side is accent overuse.
- **Focus stays visible** — never remove the focus ring without replacing it.
- **Tap target ≥ 44px** for touch (add padding, not font-size).
- Use the display font for label weight; keep labels short and verb-first ("Start", "Send", "Download").

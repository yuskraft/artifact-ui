# Chat / answer UI

The assistant-answer pattern (the Donna/Sense references): a reasoning trace, a clean answer body, an
action row, and source chips. Calm, left-aligned, accent reserved for the brand mark and the one
primary affordance. Assumes `dist/artifact.css` is in the document.

```html
<style>
  .answer { max-width: 46rem; margin-inline: auto; padding-block: var(--space-8); }
  .answer__trace { color: var(--text-muted); font-size: var(--text-sm); border-inline-start: 1px solid var(--border); padding-inline-start: var(--space-4); }
  .answer__body { font-size: var(--text-lg); margin-block: var(--space-6); }
  .answer__actions { display: flex; align-items: center; gap: var(--space-4); color: var(--text-muted); border-block-start: 1px solid var(--border); padding-block-start: var(--space-4); }
  .sources { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-block-start: var(--space-4); }
</style>

<div class="container answer">
  <div class="answer__trace stack" style="gap: var(--space-3)">
    <span>Thought · 1s</span>
    <div class="sources">
      <span class="chip">Professor's Notes.pdf</span>
      <span class="chip">Brief the Case XYZ</span>
      <span class="chip">+5 more</span>
    </div>
  </div>
  <div class="answer__body prose">
    <p>This course focuses on how legal principles apply in real-world business situations…</p>
  </div>
  <div class="answer__actions">
    <button class="btn">Copy</button>
    <button class="btn">Retry</button>
    <span class="muted" style="margin-inline-start:auto">Sources from 56 Library · 12 Notes</span>
  </div>
</div>
```

Sources use the [chip](../components/_index.md#chip) component; actions use neutral [buttons](../components/_index.md#button).

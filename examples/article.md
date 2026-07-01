# Article / document

Reading-first. Clean sans body, display headings, capped measure, airy. Optionally a sticky
table-of-contents rail (the editorial reference). Highest-density-of-text artifact — should breathe
the most. Assumes `dist/artifact.css` is in the document.

```html
<style>
  .doc { display: grid; grid-template-columns: 1fr; gap: var(--space-7); padding-block: var(--space-9); }
  @media (min-width: 60rem) {
    .doc { grid-template-columns: 14rem minmax(0, var(--measure)); justify-content: center; gap: var(--space-9); }
  }
  .doc__toc { position: sticky; top: var(--space-6); align-self: start; display: none; }
  @media (min-width: 60rem) { .doc__toc { display: block; } }
  .doc__toc a { display: block; color: var(--text-muted); text-decoration: none; padding-block: var(--space-1); font-size: var(--text-sm); }
  .doc__toc a[aria-current="true"] { color: var(--text); }
  .doc__body { font-size: var(--text-lg); }
  .doc__body h2 { margin-block-start: var(--space-7); }
  .doc__meta { color: var(--text-muted); font-size: var(--text-sm); }
  .doc__body pre {
    font-family: var(--font-mono); font-size: var(--text-sm); line-height: var(--leading-snug);
    background: var(--surface-sunk); border: 1px solid var(--border);
    border-radius: var(--radius-md); padding: var(--space-4); overflow-x: auto;
  }
  blockquote {
    margin: 0; padding-inline-start: var(--space-4);
    border-inline-start: 2px solid var(--accent); color: var(--text-2);
  }
</style>

<div class="container doc">
  <nav class="doc__toc stack" style="gap: var(--space-1)">
    <span class="muted" style="margin-block-end: var(--space-2)">003</span>
    <a href="#s1" aria-current="true">The number</a>
    <a href="#s2">Nested corners</a>
    <a href="#s3">Make it explicit</a>
  </nav>
  <article class="doc__body prose">
    <header class="stack" style="gap: var(--space-2)">
      <h1>Corners are relative</h1>
      <p class="doc__meta">Published 29 June 2026 · 6 min read</p>
    </header>
    <h2 id="s1">The number is not enough</h2>
    <p>A border-radius is just a number. A number can't describe how a corner should feel…</p>
    <pre><code>.card { border-radius: 12px; }</code></pre>
  </article>
</div>
```

Uses the [doc-header](../blocks/doc-header.md) block. The TOC rail is optional — drop it for short
pieces and the body centers on its own.

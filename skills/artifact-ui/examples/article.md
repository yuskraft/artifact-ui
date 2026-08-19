# Article / document

Reading-first. Clean sans body, display headings, capped measure, airy. Highest-density-of-text
artifact — should breathe the most. Assumes `dist/artifact.css` is in the document.

```html
<style>
  .doc { padding-block: var(--space-9); }
  .doc__body { font-size: var(--text-lg); margin-inline: auto; }
  .doc__body h2 { margin-block-start: var(--space-7); }
</style>

<div class="container doc">
  <article class="doc__body prose">
    <h1 class="display">Corners are relative</h1>

    <h2>The number is not enough</h2>
    <p>A border-radius is just a number. A number can't describe how a corner should feel…</p>

    <blockquote>
      <p>&ldquo;Pick one radius family and hold it.<br>
      A sharp card beside a round button is the <em>tell</em>.&rdquo;</p>
      <cite><b>Rasmus Andersson</b>, Notes on corner geometry</cite>
    </blockquote>

    <pre class="code"><code><span class="tok-attr">.card</span> {
  <span class="tok-attr">border-radius</span>: <span class="tok-name">var</span>(<span class="tok-name">--radius-lg</span>);
}</code></pre>
  </article>
</div>
```

One centered column, and the `.display` title is the whole opener — **no kicker above it and no
"published / N min read" line under it**. Where the piece appeared and when, if it matters at all,
belongs in the first sentence at body size. That title is where this artifact spends its signature
moment; everything below it stays plain.

The [pull quote](../components/_index.md#blockquote) is the one other moment worth spending here,
once or twice in a long piece. Code goes in [`.code`](../components/_index.md#code) with hand-written
`.tok-*` spans.

Long-form reading is the natural home of the **editorial** mood preset (`--hue-accent: 25`,
`--chroma-accent: 0.14`) — a warm red that reads like ink rather than product green. Set it on the
root and every accent and link re-themes.

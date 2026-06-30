# Recipes

Worked layouts for specific artifact types. Every snippet below assumes the `:root` token block from [`SKILL.md`](SKILL.md) is already in the document and builds **only** from those tokens — nothing here redefines a value. Copy a layout, fill it with content, and the design rules come along for free.

The base shell goes in every artifact. Then jump to the one recipe that matches what you're building.

---

## Base shell

The document scaffold: token block, resets, typographic defaults. Put the `:root` block from SKILL.md where marked, then this.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>…</title>
<!-- Web fonts by default. Swap families here + in the tokens to re-theme type;
     delete this block and the tokens fall back to system sans (fully offline). -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* … paste the :root token block from SKILL.md here … */

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: var(--leading-body);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3 { font-family: var(--font-display); line-height: var(--leading-tight); font-weight: 650; margin: 0; }
  h1 { font-size: var(--text-3xl); letter-spacing: var(--tracking-tight); }
  h2 { font-size: var(--text-xl); }
  h3 { font-size: var(--text-lg); }
  p { margin: 0; }
  a { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: 2px; }
  ::selection { background: var(--accent-quiet); }

  /* Reusable primitives — reach for these before inventing new ones. */
  .container { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--space-5); }
  .prose { max-width: var(--measure); }
  .prose > * + * { margin-block-start: var(--space-4); }   /* flow rhythm */
  .stack    { display: flex; flex-direction: column; gap: var(--space-4); }
  .cluster  { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); }

  /* Minimal list column — the default for simple label→value data. No boxes. */
  .list { display: flex; flex-direction: column; }
  .list__row {
    display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-5);
    padding-block: var(--space-3);
    border-block-end: 1px solid var(--border);
  }
  .list__row:last-child { border-block-end: none; }
  .list__label { color: var(--text-2); }
  .list__value { font-weight: 600; font-variant-numeric: tabular-nums; }

  /* Card — only for grouped / media-rich content, not for plain metrics. */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    box-shadow: var(--shadow-sm);
  }
  .btn {
    font: inherit; font-weight: 550; cursor: pointer;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-strong);
    background: var(--surface); color: var(--text);
    transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease);
  }
  .btn:hover { background: var(--surface-sunk); }
  .btn--accent { background: var(--accent); border-color: transparent; color: var(--on-accent); }
  .btn--accent:hover { background: var(--accent-hover); }
  .chip {
    font-size: var(--text-sm); color: var(--text-2);
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--border); border-radius: var(--radius-full);
  }
  .muted { color: var(--text-muted); font-size: var(--text-sm); }
  :where(input, textarea, select) {
    font: inherit; color: var(--text);
    background: var(--surface-sunk);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
  }
  :where(input, textarea, select):focus-visible {
    outline: 2px solid var(--accent); outline-offset: 1px; border-color: transparent;
  }
</style>
</head>
<body>
  <!-- recipe goes here -->
</body>
</html>
```

---

## Document / article

Reading-first. Clean sans body, display headings, capped measure, airy. Optionally a sticky table-of-contents rail (the editorial reference). This is the highest-density-of-text artifact and should breathe the most.

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

## Chat / answer UI

The assistant-answer pattern (the Donna/Sense references): a reasoning trace, a clean answer body, an action row, and source cards. Calm, left-aligned, accent reserved for the brand mark and the one primary affordance.

```html
<style>
  .answer { max-width: 46rem; margin-inline: auto; padding-block: var(--space-8); }
  .answer__trace { color: var(--text-muted); font-size: var(--text-sm); border-inline-start: 1px solid var(--border); padding-inline-start: var(--space-4); }
  .answer__body { font-size: var(--text-lg); margin-block: var(--space-6); }
  .answer__actions { display: flex; align-items: center; gap: var(--space-4); color: var(--text-muted); border-block-start: 1px solid var(--border); padding-block-start: var(--space-4); }
  .sources { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-block-start: var(--space-4); }
  .source { display: inline-flex; align-items: center; gap: var(--space-2); }  /* chip-styled */
</style>

<div class="container answer">
  <div class="answer__trace stack" style="gap: var(--space-3)">
    <span>Thought · 1s</span>
    <div class="sources">
      <span class="chip source">Professor's Notes.pdf</span>
      <span class="chip source">Brief the Case XYZ</span>
      <span class="chip source">+5 more</span>
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

## Dashboard / app

Information-dense, tighter than prose. Sidebar nav + a contained content column. Metrics go in a **list column**, not a grid of boxes. Still token-spaced — density means smaller `--space-*`, not zero space. Accent marks the active nav item only.

```html
<style>
  .app { display: grid; grid-template-columns: 1fr; min-height: 100vh; }
  @media (min-width: 56rem) { .app { grid-template-columns: 16rem 1fr; } }
  .nav { padding: var(--space-5); border-inline-end: 1px solid var(--border); display: none; }
  @media (min-width: 56rem) { .nav { display: block; } }
  .nav a { display: flex; gap: var(--space-3); align-items: center; padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); color: var(--text-2); text-decoration: none; }
  .nav a[aria-current="true"] { background: var(--accent-quiet); color: var(--accent); font-weight: 550; }
  .main { padding: var(--space-7); }
  .main__inner { max-width: 48rem; }   /* contained, not full-width */
</style>

<div class="app">
  <aside class="nav stack" style="gap: var(--space-1)">
    <a href="#" aria-current="true">Dashboard</a>
    <a href="#">Sessions</a>
    <a href="#">Community</a>
  </aside>
  <main class="main">
    <div class="main__inner stack" style="gap: var(--space-6)">
      <h1>Dashboard</h1>
      <section class="stack" style="gap: var(--space-3)">
        <h2>This week</h2>
        <div class="list">
          <div class="list__row"><span class="list__label">Active users</span><span class="list__value">12,840</span></div>
          <div class="list__row"><span class="list__label">Avg. session</span><span class="list__value">14:20</span></div>
          <div class="list__row"><span class="list__label">Completion</span><span class="list__value">92%</span></div>
        </div>
      </section>
    </div>
  </main>
</div>
```

## Report / data

Tables and figures read first. Tabular numerals, hairline row separators (not heavy grids), zebra only if rows are dense, generous cell padding. Section headers anchor scanning.

```html
<style>
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { text-align: left; padding: var(--space-3) var(--space-4); border-block-end: 1px solid var(--border); }
  th { color: var(--text-2); font-weight: 550; font-size: var(--text-sm); }
  td.num, th.num { text-align: right; }
  tbody tr:hover { background: var(--surface-sunk); }
  .report { padding-block: var(--space-8); }
  figcaption { color: var(--text-muted); font-size: var(--text-sm); margin-block-start: var(--space-2); }
</style>

<div class="container report stack" style="gap: var(--space-6); max-width: 60rem">
  <header class="stack" style="gap: var(--space-2)">
    <h1>Q3 performance</h1>
    <p class="muted">Generated 1 July 2026</p>
  </header>
  <div class="card" style="padding: var(--space-2)">
    <table>
      <thead><tr><th>Metric</th><th class="num">This quarter</th><th class="num">Δ</th></tr></thead>
      <tbody>
        <tr><td>Revenue</td><td class="num">$1.24M</td><td class="num" style="color:var(--accent)">+18%</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

## Landing / hero

The one place restraint loosens slightly: a centered hero is allowed (it's a single focal moment). One headline, one sub, one accent CTA. A quiet two-hue wash behind the hero is the only sanctioned gradient — low chroma, near-neighbor hues.

```html
<style>
  .hero { text-align: center; padding-block: var(--space-10); position: relative; overflow: clip; }
  .hero::before {
    content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.5;
    background: radial-gradient(60% 60% at 50% 0%,
      oklch(0.9 0.05 var(--hue-accent)), transparent 70%);
  }
  .hero h1 { font-size: var(--text-4xl); max-width: 18ch; margin-inline: auto; }
  .hero p { font-size: var(--text-lg); color: var(--text-2); max-width: 46ch; margin: var(--space-5) auto 0; }
  .hero .cluster { justify-content: center; margin-block-start: var(--space-6); }
</style>

<section class="container hero">
  <h1>Make every artifact look designed</h1>
  <p>A system, not a coat of paint — restraint, tokens, and one accent.</p>
  <div class="cluster">
    <button class="btn btn--accent">Get started</button>
    <button class="btn">Learn more</button>
  </div>
</section>
```

---

## Interaction patterns

Apply across all recipes:

- **Focus is always visible.** Every interactive element keeps a `:focus-visible` ring (`outline: 2px solid var(--accent)`); never `outline: none` without a replacement.
- **Hover is a hint, not a jump.** Background/border shifts over `--dur`; avoid layout-shifting hovers (scale/translate are fine, size changes that reflow are not).
- **States use tokens too.** Disabled → `opacity: 0.5; cursor: not-allowed`. Active nav → `--accent-quiet` fill. Loading → a token-colored shimmer, not a spinner-of-default-blue.
- **Tap targets ≥ 44px** for anything touchable (padding, not font-size).

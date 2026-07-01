# Dashboard / app

Information-dense, tighter than prose. Sidebar nav + a contained content column. Metrics go in a
**list column**, not a grid of boxes. Density means smaller `--space-*`, not zero space. Accent marks
the active nav item only. Assumes `dist/artifact.css` is in the document.

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

Metrics use the [list](../components/list.md) component — not boxed stat-cards. Reserve
[cards](../components/card.md) for media-rich items.

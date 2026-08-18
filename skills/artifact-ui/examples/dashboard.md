# Dashboard / app

Information-dense, tighter than prose. Sidebar nav + a contained content column. Density means
smaller `--space-*`, not zero space. Accent marks the active nav item only. Assumes
`dist/artifact.css` is in the document.

Metrics never go in a grid of boxes. The floor is a **list column**; when the headline numbers carry
the page, promote them to an unboxed [stat row](../components/charts.md#stat-row) and give the
comparison a [bar chart](../components/charts.md#bars). One stat is promoted — that is the
dashboard's signature moment.

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
    <div class="main__inner stack stagger" style="gap: var(--space-7)">

      <!-- opener: left-aligned document hero, no CTA -->
      <header class="stack reveal" style="gap: var(--space-4)">
        <div class="stack" style="gap: var(--space-2)">
          <span class="muted">Workspace · week 12</span>
          <h1 class="display">This week</h1>
        </div>
        <div class="stats">
          <div class="stat stat--strong">
            <span class="stat__value">12,840</span>
            <span class="stat__label">Active users</span>
            <span class="stat__delta stat__delta--up">+8.2%</span>
          </div>
          <div class="stat">
            <span class="stat__value">14:20</span>
            <span class="stat__label">Avg. session</span>
          </div>
          <div class="stat">
            <span class="stat__value">92%</span>
            <span class="stat__label">Completion</span>
          </div>
        </div>
      </header>

      <!-- the comparison earns a chart; one bar is promoted -->
      <section class="stack reveal" style="gap: var(--space-4)">
        <h2>Where sessions start</h2>
        <div class="bars">
          <div class="bar bar--strong">
            <span class="bar__label">Direct</span>
            <span class="bar__track"><span class="bar__fill" style="--size: 100%"></span></span>
            <span class="bar__value">6,120</span>
          </div>
          <div class="bar">
            <span class="bar__label">Search</span>
            <span class="bar__track"><span class="bar__fill" style="--size: 58%"></span></span>
            <span class="bar__value">3,540</span>
          </div>
          <div class="bar">
            <span class="bar__label">Referral</span>
            <span class="bar__track"><span class="bar__fill" style="--size: 51%"></span></span>
            <span class="bar__value">3,180</span>
          </div>
        </div>
      </section>

      <!-- secondary detail stays a plain list column -->
      <section class="stack reveal" style="gap: var(--space-3)">
        <h2>Reliability</h2>
        <div class="list">
          <div class="list__row"><span class="list__label">Uptime</span><span class="list__value">99.98%</span></div>
          <div class="list__row"><span class="list__label">p95 latency</span><span class="list__value">42 ms</span></div>
          <div class="list__row"><span class="list__label">Open incidents</span><span class="list__value">0</span></div>
        </div>
      </section>

    </div>
  </main>
</div>
```

Note the ladder at work: the headline numbers take a [stat row](../components/charts.md#stat-row),
the comparison takes [bars](../components/charts.md#bars), and everything secondary drops back to a
plain [list](../components/_index.md#list). Reserve [cards](../components/_index.md#card) for
media-rich items; multi-column data takes the [table](../components/_index.md#table) styles.

## Dark variant

A dashboard is one of the few artifact types where dark is a genuinely good default — set
`data-theme="dark"` on the root. In dark, add `--glow-accent` to the *one* promoted stat and nothing
else:

```html
<div class="stat stat--strong" style="box-shadow: var(--glow-accent); border-radius: var(--radius-lg)">
```

The token resolves to `none` in light mode, so the same markup serves both themes. Check that
surfaces read lighter than the background, the sidebar border still separates, and the bar fills
stay distinguishable from their tracks.

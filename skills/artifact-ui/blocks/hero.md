# Hero — the opening moment

The first screen sets the register for everything under it. This is the default home of the
artifact's **one signature moment**: the wash, the oversized title, the single accent action. Spend
it here and the rest of the page can stay calm.

Two variants. Both are contained (only a wash may reach the edges) and both keep the accent to a
single element.

## Centered — landing / marketing / cover

Centering is earned here and almost nowhere else. One accent button; a second action stays neutral.

```html
<header class="hero stagger" style="background: var(--wash-hero)">
  <div class="container stack" style="align-items: center; text-align: center; gap: var(--space-5)">
    <span class="chip reveal">Version 2.0</span>
    <h1 class="display reveal">Design that ships with the answer</h1>
    <p class="reveal" style="max-width: 46ch; color: var(--text-2); font-size: var(--text-lg)">
      One paste of tokens turns a default-styled artifact into something composed.
    </p>
    <div class="cluster reveal" style="justify-content: center">
      <a class="btn btn--accent" href="#start">Get started</a>
      <a class="btn" href="#how">How it works</a>
    </div>
  </div>
</header>
```

```css
.hero { padding-block: var(--space-9) var(--space-10); }
```

## Left-aligned — report / article / dashboard opener

A document does not need a sales hero, but it does deserve a real opening instead of a bare `<h1>`.
No CTA, and no meta strip above or below the title — the lead sentence and an optional `.stats`
row carry the substance.

```html
<header class="stack stagger" style="gap: var(--space-5); padding-block: var(--space-8) var(--space-7)">
  <h1 class="display reveal">Platform reliability</h1>
  <p class="reveal" style="max-width: var(--measure); color: var(--text-2); font-size: var(--text-lg)">
    Three incidents, all resolved inside the error budget. The migration held.
  </p>
  <div class="stats reveal">
    <div class="stat stat--strong">
      <span class="stat__value">99.98%</span>
      <span class="stat__label">Availability</span>
    </div>
    <div class="stat">
      <span class="stat__value">3</span>
      <span class="stat__label">Incidents</span>
    </div>
  </div>
</header>
```

Drop `.display` back to a plain `<h1>` when the title runs long — an oversized title that wraps to
three lines is worse than a normal one. `.display` is for titles of roughly six words or fewer.

## Rules

- **One hero per artifact**, at the top. A second "hero" mid-page is just a section.
- **The signature moment lives here by default** — a wash *or* `.display` *or* the one accent
  button. Using all three at once is the thing this system exists to prevent.
- **Below the hero, return to normal.** Left-aligned, contained, body-sized type. The contrast
  between the opener and the calm beneath it is what makes the opener read as deliberate.
- **`--wash-hero` is the only background here.** It re-themes with the mood preset automatically.
- **Motion is optional garnish.** `.stagger` on the header, `.reveal` on its direct children, and
  nothing else on the page — entrances are a page-load event, not a per-section effect. The content
  must read identically if the animation never runs.
- **No kicker, no dateline.** The title carries itself. Scope and date, when they matter, go in the
  lead sentence at body size — never in a muted strip above or below the heading.
- **Never center body text.** Centering applies to the hero's own short lines only.

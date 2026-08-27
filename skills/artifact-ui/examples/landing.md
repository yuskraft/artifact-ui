# Landing / hero

The one page type built around its opening. A centered hero is allowed here — one headline, one sub,
one accent CTA. Full hero guidance is in [blocks/hero.md](../blocks/hero.md);
this shows a landing composed end to end. Assumes `dist/artifact.css` is in the document.

```html
<style>
  .hero { text-align: center; padding-block: var(--space-9) var(--space-10); }
  .hero .display { max-width: 18ch; margin-inline: auto; }
  .hero p { font-size: var(--text-lg); color: var(--text-2); max-width: 46ch; margin: var(--space-5) auto 0; }
  .hero .cluster { justify-content: center; margin-block-start: var(--space-6); }
</style>

<header class="hero stagger">
  <div class="container">
    <h1 class="display reveal">Make every artifact look designed</h1>
    <p class="reveal">A system, not a coat of paint — restraint, tokens, and one accent.</p>
    <div class="cluster reveal">
      <button class="btn btn--accent">Get started</button>
      <button class="btn">Learn more</button>
    </div>
  </div>
</header>

<!-- back to left-aligned, contained columns -->
<main class="container stack" style="gap: var(--space-9); padding-block: var(--space-9)">
  <section class="stack" style="gap: var(--space-4)">
    <h2>What you get</h2>
    <ul class="prose" style="margin: 0; padding-inline-start: 1.2em">
      <li>One paste of tokens — type, space, color, corners, print.</li>
      <li>Primitives that compose into blocks and templates.</li>
      <li>Zero external requests; renders with the network unplugged.</li>
    </ul>
  </section>
</main>

<!-- the one band: a change of register before the close -->
<div class="band" style="background: var(--tint-sage)">
  <div class="container stack" style="gap: var(--space-4)">
    <h2>Built for the sandbox</h2>
    <p style="max-width: var(--measure); color: var(--text-2)">
      Strict CSP, one self-contained file, under the size cap by orders of magnitude.
    </p>
  </div>
</div>
```

The hero spends the signature moment on `.display` + the one accent CTA; the `.band` near the close is a
register change, not a second hero. Centering applies to the hero's own short lines and nowhere
else — body sections stay left-aligned and contained.

# Landing / hero

The one place restraint loosens slightly: a centered hero is allowed (a single focal moment). One
headline, one sub, one accent CTA. A quiet two-hue wash behind the hero is the only sanctioned
gradient — low chroma, near-neighbor hues. Assumes `dist/artifact.css` is in the document.

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

Centering is allowed here and _only_ here — body sections below the hero go back to left-aligned,
contained columns.

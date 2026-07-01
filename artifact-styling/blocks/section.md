# Section

A titled content region. The workhorse block — a heading plus its content, spaced with rhythm.

```html
<section class="stack" style="gap: var(--space-3)">
  <h2>This week</h2>
  <!-- content: a list, prose, a cluster of cards… -->
</section>
```

- Separate sections from each other with a large gap (`--space-7`/`--space-8`); keep a section's
  own heading close to its content (`--space-3`). The gap difference _is_ the grouping.
- Heading in the display font; body follows the type rules.
- Don't wrap a section in a card by default — sections are structure, not objects.

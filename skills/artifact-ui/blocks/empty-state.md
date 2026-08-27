# Empty state

What a region shows when it has nothing to show. Pure composition — `.stack`, `.muted`, `.btn` —
no new CSS. An empty state is the one place centering a short block is right (like a hero): it is
a single focal message, not running text.

```html
<div class="stack" style="align-items: center; text-align: center; gap: var(--space-3); padding-block: var(--space-8)">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
       style="color: var(--text-muted)" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h10"/>
  </svg>
  <h3>No reports yet</h3>
  <p class="muted" style="max-width: 32ch">Reports collect your weekly metrics in one place, ready
  to share.</p>
  <button class="btn btn--accent">Create your first report</button>
</div>
```

Three beats, in order: **what will be here → why it matters → how to start.** The icon is optional
quiet geometry (muted, one of the [icon grammar](../components/_index.md#inline-svg--icons)); the
action is the block's one accent button.

## Say which empty this is

"Nothing here" is a shrug, not a state. Four different situations look identically empty and each
names its own recovery — copy is what distinguishes them:

| Situation | Message leads with | Action |
|---|---|---|
| First use | what this area will hold, why it's worth filling | "Create your first…" |
| No search results | what was searched for | "Clear search" / suggest a broader term |
| Filtered to nothing | which filters are hiding everything | "Clear filters" |
| Failed to load | what failed, plainly — never an error code | "Retry" |

- **An empty state teaches the interface** — first use is the one moment the reader looks at a
  region with no content competing for attention. Spend it on the one next step, not on apology.
- The failure case is a state of the *region*, not a [callout](../components/_index.md#callout)
  floating over it — keep it in place, where the content would have been.
- No illustration theater: a muted 24px icon at most. A large decorated drawing above "no results"
  outweighs the content the page actually has.

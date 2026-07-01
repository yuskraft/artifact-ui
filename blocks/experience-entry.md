# Experience entry

One role in a resume: title · organization · dates, then achievement bullets. Repeat per role.

```html
<div class="stack avoid-break" style="gap: var(--space-2)">
  <div class="cluster" style="justify-content: space-between; align-items: baseline; gap: var(--space-4)">
    <div>
      <strong style="font-family: var(--font-display)">Senior Product Designer</strong>
      <span class="muted"> · Acme Inc.</span>
    </div>
    <span class="muted" style="font-variant-numeric: tabular-nums; white-space: nowrap">2022 — Present</span>
  </div>
  <ul class="stack" style="gap: var(--space-1); margin: 0; padding-inline-start: var(--space-4)">
    <li>Led the redesign that lifted activation 24% quarter over quarter.</li>
    <li>Built the team's first design-token system, cutting UI drift across 6 surfaces.</li>
  </ul>
</div>
```

- Title in display weight; org and dates demoted to `--muted`; dates tabular + right-aligned.
- Bullets are **outcomes, not duties** — start with a verb, quantify where honest. No filler; mark
  gaps `[DATA NEEDED: …]` rather than inventing metrics.
- `.avoid-break` keeps an entry from splitting across printed pages.

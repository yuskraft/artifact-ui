# Contact row

The name/role/contact identity line for personal documents (resume, ərizə). Fills from the
[brand profile](../templates/brand.md) when present.

```html
<header class="stack" style="gap: var(--space-1)">
  <h1>{{NAME}}</h1>
  <p class="muted" style="font-size: var(--text-base)">{{ROLE}}</p>
  <div class="cluster" style="gap: var(--space-4); color: var(--text-2); font-size: var(--text-sm)">
    <span>{{EMAIL}}</span>
    <span>{{PHONE}}</span>
    <span>{{LOCATION}}</span>
  </div>
</header>
```

- Name is the largest element; role sits just under it; contact details are a quiet cluster.
- Separate contact items with a middot or just `--space-4` gap — no boxes, no icons required.
- Left-aligned for resume; ərizə places applicant identity per its own layout (see the template).

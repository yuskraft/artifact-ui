# Components (primitives)

The atoms of the system — the smallest reusable pieces, all documented here in one file. Their CSS
lives in [`../styles/base.css`](../styles/base.css). Compose them into
[blocks](../blocks/_index.md); build [templates](../templates/_index.md) from blocks.

| Component | Class | Use for |
|---|---|---|
| [Button](#button) | `.btn`, `.btn--accent` | Actions. One accent button per view. |
| [Chip](#chip) | `.chip` | Tags, filters, small metadata pills. |
| [List](#list) | `.list`, `.list__row` | Simple label→value data. The default over boxed cards. |
| [Card](#card) | `.card` | Grouped or media-rich content only — never plain metrics. |
| [Record list](#record-list) | `.records`, `.record`, `.records--grid` | A collection of records/entities — the default over a table. |
| [Table](#table) | `table`, `.num`, `.table--striped` | Dense many-column comparison. Traditional hairline rules. |
| [Field](#field) | `.field`, `input`/`textarea`/`select` | Form inputs with label + message. |
| [Form patterns](#form-patterns) | `.form-row`, `.field--error`, `.field--ok` | Multi-field layout and validation states. |
| [Callout](#callout) | `.callout`, `.callout--warn`, `.callout--ok` | A note, warning, or success aside inside a document. |

**To add a component:** add its CSS to `base.css`, rebuild `dist`, and add a section + one table row
here. Split a component into its own file only when its docs outgrow a screenful.

## Button

Actions. CSS: `.btn` (neutral) and `.btn--accent` (the one primary action).

```html
<button class="btn">Secondary</button>
<button class="btn btn--accent">Primary action</button>
```

- **One accent button per view.** The `--accent` fill marks the single most important action; everything else is a neutral `.btn`. Two accent buttons side by side is accent overuse.
- **Focus stays visible** — never remove the focus ring without replacing it.
- **Tap target ≥ 44px** for touch (add padding, not font-size).
- Keep labels short and verb-first ("Start", "Send", "Download").

## Chip

Small pills for tags, filters, sources, or metadata. CSS: `.chip`.

```html
<span class="chip">Mindfulness</span>

<!-- soft pastel tag: tint background + accent text -->
<span class="chip" style="background: var(--accent-quiet); color: var(--accent); border-color: transparent">Design notes</span>

<!-- category coding with a decorative tint -->
<span class="chip" style="background: var(--tint-sage); border-color: transparent">Health</span>
```

- Default chip is quiet (muted text, hairline border). Reach for a `--tint-*` fill only for gentle category coding, and keep it behind muted/accent text.
- Don't let a row of colorful chips compete with the one action accent — chips are metadata, not calls to action.
- Group chips with `.cluster` for even spacing.

## List

A minimal list column — **the default for simple label→value data.** No boxes. CSS: `.list`,
`.list__row`, `.list__label`, `.list__value`.

```html
<div class="list">
  <div class="list__row"><span class="list__label">Active users</span><span class="list__value">12,840</span></div>
  <div class="list__row"><span class="list__label">Avg. session</span><span class="list__value">14:20</span></div>
  <div class="list__row"><span class="list__label">Completion</span><span class="list__value">92%</span></div>
</div>
```

- **Prefer this over a grid of stat-cards.** A handful of metrics belongs in a list column, not a row of bordered boxes — boxing every datum is a tell.
- Label demoted to `--text-2`; value emphasized (`600`, tabular-nums so figures align).
- Rows separate by **spacing alone** (their `padding-block`) — no rules between rows.
- For a plain list without the label/value split, use `.stack` with `gap: var(--space-2)`.

## Card

A raised surface — **only for grouped or media-rich content, never for plain metrics.** CSS: `.card`.

```html
<!-- media + text cluster: a legitimate card -->
<div class="card cluster" style="gap: var(--space-4)">
  <div style="width: 8rem; aspect-ratio: 16/10; border-radius: var(--radius-md); background: linear-gradient(135deg, var(--tint-peach), var(--tint-lavender)); flex: none"></div>
  <div class="stack" style="gap: var(--space-1)">
    <strong style="font-family: var(--font-display)">Calm Flow Journey</strong>
    <span class="muted">Daniel Cru · 5 min</span>
  </div>
</div>
```

- A card earns its border when it holds an image, a mixed cluster, or a distinct object. For simple label→value data use [list](#list) instead.
- **Nest corners concentrically:** inner radius = outer − padding, but only while the padding is *smaller* than the outer radius (e.g. inside `--space-3` padding, `calc(var(--radius-lg) - var(--space-3))` ≈ 4px). The card's own `--space-6` padding (32px) exceeds `--radius-lg` (16px), so a concentric inner corner is ≤ 0 — give nested elements a small fixed radius (`--radius-sm`) or none; never a negative `calc()`, which is invalid CSS.
- Elevation has meaning — a card sits above the page. Don't shadow flat content.

## Record list

**The default for a collection of records** — users, issues, deployments, invoices, projects.
Each record is a visually distinct item (a quiet horizontal card) in the clean admin aesthetic of
Linear / GitHub / Vercel / Stripe. CSS: `.records` (stack), `.records--grid` (tile/bento variant),
`.record`, `.record__main`, `.record__title`, `.record__meta`, `.record__actions`.

```html
<ul class="records">
  <li class="record">
    <div class="record__main">
      <span class="record__title"><a href="#">api-gateway</a></span>
      <div class="record__meta">
        <span>deployed 2h ago</span>
        <span>eu-west-1</span>
        <span>v2.14.0</span>
      </div>
    </div>
    <span class="chip" style="background: var(--tint-sage); border-color: transparent">Healthy</span>
    <div class="record__actions">
      <button class="btn">View</button>
      <button class="btn">Edit</button>
    </div>
  </li>
</ul>
```

- **Primary vs secondary is structural:** the title carries weight (600); everything else demotes
  into `.record__meta` (muted, small). If a reader can't find a record by title alone while
  scrolling fast, the hierarchy failed.
- **Status is a [chip](#chip)**, tinted only when the status genuinely differs per record.
- **Responsive without breakpoints:** records flex-wrap — meta and actions fall to their own line
  on narrow screens; `.records--grid` tiles reflow via `auto-fill`. Nothing horizontal-scrolls.
- **Semantics carry the a11y:** `.records` is a `<ul>`, each record an `<li>`; the title is a real
  `<a>` when the record opens something; actions are real `<button>`/`<a>` (keyboard-reachable,
  visible focus for free). Icon-only actions need `aria-label`.
- **Pick the shape by the data:** stack (default) for scannable admin lists; `--grid` for
  media-rich or peer tiles; a [list](#list) *inside* `.record__main` for property/definition
  pairs; native `<details>` as the record element for accordion disclosure.
- **Many items:** keep each record one line tall if possible; beyond ~20–30, paginate ("Load
  more" button) rather than rendering hundreds of nodes.

## Table

**Reach for a table only when the reader compares many records across many columns at once** —
dense, grid-shaped data where row/column scanning is the point. For anything record-shaped, use
the [record list](#record-list) instead. Bare `table`/`th`/`td` are styled by `base.css` —
traditional hairline row rules, a bold sentence-case header (never uppercase), no vertical rules,
no boxes. Use a [list](#list) when the data is just label→value pairs.

```html
<table>
  <thead>
    <tr><th>Finding</th><th>File</th><th class="num">Line</th><th>Severity</th></tr>
  </thead>
  <tbody>
    <tr><td>Stale cache key</td><td>build.mjs</td><td class="num">42</td><td><span class="chip">medium</span></td></tr>
    <tr><td>Missing null check</td><td>router.ts</td><td class="num">108</td><td><span class="chip" style="background: var(--tint-rose); border-color: transparent">high</span></td></tr>
  </tbody>
</table>
```

- **Numbers get `.num`** (right-aligned, tabular) on both `th` and `td`; text stays start-aligned. Dates: `white-space: nowrap`.
- **Stripe only when rows are hard to track** across many columns: add `.table--striped` to the table. Default is rule-only — quieter.
- Status/category cells take a [chip](#chip), not a colored cell background.
- Print splits are already handled (`tr { break-inside: avoid }` in the print block).

## Field

A single form input with its label and optional message. CSS: `.field`, `.field__label`,
`.field__msg`; bare `input`/`textarea`/`select` are styled directly (via `:where(...)`, easy to
override).

```html
<label class="field">
  <span class="field__label">Email</span>
  <input type="email" placeholder="you@example.com">
  <span class="field__msg">We only use this for the receipt.</span>
</label>
```

- Inputs sit on `--surface-sunk` (a well), with a hairline border and `--radius-md`.
- **Focus is visible** — a 2px `--accent` ring; never `outline: none` alone.
- Every input gets a `.field__label`; never a bare placeholder as the only label.
- Keep forms left-aligned in a contained column; don't center form fields.

## Form patterns

Multi-field layout and validation states. CSS: `.form-row`, `.field--error`, `.field--ok`.

```html
<form class="stack" style="gap: var(--space-4); max-width: 32rem">
  <div class="form-row">
    <label class="field"><span class="field__label">First name</span><input></label>
    <label class="field"><span class="field__label">Last name</span><input></label>
  </div>

  <label class="field field--error">
    <span class="field__label">Email</span>
    <input type="email" value="not-an-email" aria-invalid="true">
    <span class="field__msg">Enter a valid email address.</span>
  </label>

  <button class="btn btn--accent">Send</button>
</form>
```

- **`.form-row` reflows without breakpoints** — fields sit side by side when there's ≥14rem each, and stack on narrow screens.
- **Validation is a state, not a decoration:** `.field--error` / `.field--ok` recolor the border and message with `--danger` / `--ok` (both AA-checked). Always pair the color with a `.field__msg` that says what to fix — color alone isn't accessible.
- Add `aria-invalid="true"` on an errored input.
- One `.btn--accent` submits; secondary actions are neutral buttons or links.

## Callout

A note, warning, or success aside inside a document — a risk in a report, a caveat under a section,
a "what to do next". CSS: `.callout` (neutral), `.callout--warn`, `.callout--ok`.

```html
<div class="callout avoid-break">
  <p><strong>Note:</strong> exports include archived members by default.</p>
</div>

<div class="callout callout--warn avoid-break">
  <p><strong>Risk:</strong> concurrent check-ins double-spend a streak freeze.</p>
  <p><strong>Fix:</strong> make the decrement conditional and branch on the affected-row count.</p>
</div>
```

- **No edge border — ever.** A thick colored left border is a [tell](../SKILL.md#avoid--the-default-artifact-tells). The translucent wash alone carries the meaning and layers safely on any surface (cream, paper white, opt-in dark).
- **Color is not the message.** Lead with a bolded word ("Risk:", "Fix:", "Note:") so the meaning survives grayscale print and screen readers.
- Body text stays `--text` — the wash is background seasoning, never a text color.
- Sparingly: a callout interrupts reading. More than one or two per section means the prose needs restructuring, not more boxes.
- Add `.avoid-break` so a callout never splits across printed pages.

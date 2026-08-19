# Components (primitives)

The atoms of the system — the smallest reusable pieces, all documented here in one file. Their CSS
lives in [`../styles/base.css`](../styles/base.css). Compose them into
[blocks](../blocks/_index.md); build [templates](../templates/_index.md) from blocks.

| Component | Class | Use for |
|---|---|---|
| [Button](#button) | `.btn`, `.btn--accent`, `.btn--danger` | Actions. One accent button per view; `--danger` for irreversible ones. |
| [Chip](#chip) | `.chip` | Tags, filters, small metadata pills. |
| [List](#list) | `.list`, `.list__row` | Simple label→value data. The default over boxed cards. |
| [Card](#card) | `.card` | Grouped or media-rich content only — never plain metrics. |
| [Record list](#record-list) | `.records`, `.record`, `.records--grid` | A collection of records/entities — the default over a table. |
| [Table](#table) | `table`, `.num`, `.table--striped` | Dense many-column comparison. Traditional hairline rules. |
| [Field](#field) | `.field`, `input`/`textarea`/`select` | Form inputs with label + message. |
| [Selectbox](#selectbox) | `.select` | A dropdown that looks identical on every browser and OS. |
| [Form patterns](#form-patterns) | `.form-row`, `.field--error`, `.field--ok` | Multi-field layout and validation states. |
| [Callout](#callout) | `.callout`, `.callout__icon`, `.callout--row` | The notice card — a result, confirmation, announcement, or destructive confirm. |
| [Blockquote](#blockquote) | `blockquote`, `cite` | The serif pull quote — a signature moment, not every quotation. |
| [Code](#code) | `.code`, `.tok-*` | Fenced blocks and inline code, highlighted by hand. |
| [Image](#image) | `img` | Contained by default, subtle depth outline. |
| [Inline SVG & icons](#inline-svg--icons) | `svg` | Icons and decorative geometry, drawn not fetched. |
| [Display](#display) | `.display` | The one oversized type step — an opener's title or a hero number. |
| [Band](#band) | `.band` | The sanctioned full-bleed moment; background reaches the edges, content does not. |
| [Stat](charts.md#stat-row) | `.stats`, `.stat` | Headline metrics carried by type, not boxes. |
| [Charts](charts.md) | `.bars`, `.bar`, `.spark` | Bars, meters, sparklines, donuts — CSS and inline SVG only. |
| [Motion](#motion) | `.reveal`, `.stagger` | Opt-in one-shot entrance; press feedback ships on `.btn`. |

**To add a component:** add its CSS to `base.css`, rebuild `dist`, and add a section + one table row
here. Split a component into its own file only when its docs outgrow a screenful.

## Button

Actions. CSS: `.btn` (neutral), `.btn--accent` (the one primary action), `.btn--danger` (the
destructive confirm).

```html
<button class="btn">Secondary</button>
<button class="btn btn--accent">Primary action</button>
<button class="btn btn--danger">Delete</button>
```

- **One accent button per view.** The `--accent` fill marks the single most important action; everything else is a neutral `.btn`. Two accent buttons side by side is accent overuse.
- **Focus stays visible** — never remove the focus ring without replacing it.
- **`--danger` is for irreversible actions only** — deleting, revoking, wiping. It belongs in a [callout](#callout)'s `__actions` next to a plain `.btn` escape hatch, never as a page's general primary button. Red on a reversible action trains people to ignore red.
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
- **Try everything else first.** The default answer to "how do I present this?" is not a card: running text → plain prose in a `--measure` column; parallel points → a bullet list; label→value pairs → a [list](#list); show/hide detail → a native `<details>` accordion; a collection of entities → a [record list](#record-list). Reach for a card only when none of those fit. A page that is wall-to-wall cards has no hierarchy — nothing raised means anything when everything is raised.
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

## Selectbox

A `<select>` wrapped so it renders identically everywhere — no macOS/Windows/browser-native
chrome. CSS: `.select` (wrapper); the well, border, radius, and focus ring come from the shared
input styles.

```html
<label class="field">
  <span class="field__label">Language</span>
  <span class="select">
    <select>
      <option>English</option>
      <option>Azərbaycanca</option>
    </select>
  </span>
</label>
```

- **Always wrap in `.select`.** `appearance: none` strips the native chrome and the chevron is
  drawn in CSS with `--text-2` — no OS arrow, no embedded image. A bare `<select>` still gets the
  base input styles but keeps the platform arrow.
- Pairs with [field](#field) for label + message like any input; validation states
  (`.field--error`, `.field--ok`) apply unchanged.
- The wrapper stretches inside a `.form-row` (the inner select is `width: 100%`).
- Only the closed control is stylable — the open dropdown list stays native, which is fine: it's
  the browser's own overlay, not part of the page.

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

The **notice card**: one message the reader should act on or acknowledge. A raised `--surface`
container with a quiet all-round border and `--shadow-sm`; the **icon carries the type**, never a
tinted fill and never a colored edge bar. CSS: `.callout` plus `__icon`, `__title`, `__close`,
`__actions`, `__action`, and the `--ok` / `--warn` / `--row` modifiers.

The minimum is a plain note — children flow normally, so no wrapper element is needed:

```html
<div class="callout">
  <p><strong>Note:</strong> exports include archived members by default.</p>
</div>
```

The full form adds an icon, a title, and a dismiss. The gutter for each is reserved only when that
part is present, so every combination below is valid markup:

```html
<div class="callout callout--ok">
  <svg class="callout__icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="var(--surface)" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <p class="callout__title">Credits purchased successfully</p>
  <p>You've added credits to your account. Start generating with more customization.</p>
  <p><a href="#balance">View credit balance &rarr;</a></p>
  <button class="callout__close" type="button" aria-label="Dismiss">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
  </button>
</div>
```

A notice that **asks** something gets `__actions`. This is the only place `.btn--danger` belongs:

```html
<div class="callout callout--warn">
  <svg class="callout__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
  </svg>
  <p class="callout__title">Delete conversation?</p>
  <p>Deleting <strong>Intergalactic Concepts</strong> permanently removes the chat memory and its
     associated data <strong>(32 images &amp; 2 files)</strong> from the server.</p>
  <p class="muted">This action cannot be undone.</p>
  <div class="callout__actions">
    <button class="btn btn--danger" type="button">Delete</button>
    <button class="btn" type="button">Cancel</button>
  </div>
</div>
```

`--row` is the one-line notice — a fact plus an escape hatch. The icon and dismiss rejoin the flow
so everything centers on one baseline; `__action` pins the inline action to the end:

```html
<div class="callout callout--row">
  <svg class="callout__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M10 12h4"/>
  </svg>
  <span>32 images archived</span>
  <a class="callout__action" href="#undo">Undo</a>
  <button class="callout__close" type="button" aria-label="Dismiss">…</button>
</div>
```

- **The card never changes color.** `--ok` and `--warn` tint the *icon* only. A green-washed or
  red-washed panel is the [tell](../SKILL.md#avoid--the-default-artifact-tells) — meaning belongs to
  the icon and the words, so it survives grayscale print and a screen reader.
- **Colored edge bars stay banned.** A thick red or blue border down one side is the same tell
  wearing a different coat; the border here is quiet, neutral, and all the way round.
- **Lead with a bolded word or a `__title`** ("Risk:", "Fix:", "Delete conversation?"). A reader
  scanning the page should get the point from the first three words.
- **Only a notice that asks something gets buttons.** A confirmation that merely reports ("Image
  generated in 4 secs") takes a link at most. Two buttons on a passive notice is noise.
- **The dismiss is real UI.** `<button type="button">` with an `aria-label`, never a bare `×`
  glyph in a `<span>`. It is hidden automatically in print.
- Icons are inline SVG at 24px, `currentColor`, `aria-hidden="true"` — the text already says it.
- Sparingly: a callout interrupts reading. More than one or two per section means the prose needs
  restructuring, not more boxes.
- Add `.avoid-break` on long notices; the component already sets `break-inside: avoid` for print.

## Blockquote

The **pull quote**: one line the artifact wants you to carry away, set in `--font-serif` at
`--text-2xl` against the sans body. That face-and-size contrast is the entire effect. CSS:
`blockquote`, with attribution in a `<cite>`.

```html
<blockquote>
  <p>&ldquo;In a world of scarcity, we treasure <em>tools</em>.<br>
  In a world of abundance, we treasure <em>taste</em>.&rdquo;</p>
  <cite><b>Anu Atluru</b>, Taste is Eating Silicon Valley</cite>
</blockquote>
```

- **A signature moment — once or twice per artifact.** An ordinary supporting quotation stays in the prose flow as a normal paragraph. Reaching for the serif every time you quote someone spends the effect and the page goes limp.
- **No edge bar.** The change of face already separates it; a colored left border on top of that is a rule doing a job whitespace already did, and it is a [tell](../SKILL.md#avoid--the-default-artifact-tells).
- **Type the curly quotes** (`&ldquo;` / `&rdquo;`) into the content — they are punctuation, not decoration, and `hanging-punctuation: first` lets the opening one hang into the margin where the browser supports it.
- **Italicise the pivot, not the line.** One or two `<em>` words — the ones the quote turns on. A fully italic pull quote reads as emphasis with nothing to emphasise.
- `<cite>` is optional but nearly always right: quote a person, name them. Bold the name (`<b>`), leave the source plain. The short rule before it is a citation mark — the one hairline in this system that is not a divider.
- Use `<br>` only for a deliberate line break the author wrote, as above; otherwise let it wrap.

## Code

A fenced block is a **true container**, so it keeps a border and sits on `--surface` — raised above
the page ground like a card, not sunk into a well. Inline code is a chip inside a sentence. CSS:
`.code` on the `<pre>`, plus the five `.tok-*` roles.

```html
<p>This can now also be solved with the <code>@starting-style</code> CSS at-rule.</p>

<pre class="code"><code><span class="tok-com">// Calculate offset up until current toast</span>
<span class="tok-key">const</span> offset = React.<span class="tok-name">useMemo</span>(
  () <span class="tok-key">=&gt;</span> heightIndex * GAP + toastsHeightBefore,
  [heightIndex, toastsHeightBefore],
);</code></pre>
```

- **There is no highlighter.** The sandbox CSP blocks one, so every color is a `<span>` you typed on purpose. That is a feature: you highlight what a reader scans for and nothing else.
- **Most of a block should stay un-spanned.** Un-spanned code inherits `--text`, which is the correct default. A line where every token is colored is a rainbow, not a highlight.
- The five roles, from the `--code-*` tokens:

| Class | Role |
|---|---|
| `.tok-key` | Keywords, booleans, operators, parameters |
| `.tok-name` | Function and method names, strings, numbers, CSS values |
| `.tok-attr` | CSS selectors and properties, at-rules, attribute names |
| `.tok-tag` | Markup tag names |
| `.tok-com` | Comments |

- **Escape the markup**: `&lt;`, `&gt;`, `&amp;` inside a code sample, or the browser renders your example instead of showing it.
- Whitespace inside `<pre>` is literal — do not indent the opening `<code>` to match the surrounding HTML, or the first line arrives pre-indented.
- The block scrolls horizontally on its own (`overflow-x: auto`); never let a long line widen the page.
- Code colors are **hue-fixed, not accent-derived** — a snippet reads identically in every mood preset.

## Image

Bare `img` is styled by `base.css`: contained (`max-width: 100%; height: auto`) and given a subtle
1px depth outline so photos and screenshots sit cleanly on any surface.

- The outline is a **pure black/white alpha wash** (flips for dark mode) — never a tinted neutral,
  which picks up the surface color and reads as dirt on the image edge.
- Opt out per-image for transparent logos/icons: `style="outline: none"`. (Inline SVG is
  unaffected — the outline applies to `img` only.)
- Remember the CSP: remote images silently break in the sandbox — inline SVG or data URIs only.

## Inline SVG & icons

Every graphic is drawn in the document. An icon font or a remote sprite sheet is a dead external
request; inline SVG costs nothing and themes itself.

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20 6 9 17l-5-5"></path>
</svg>
```

- **One icon grammar:** a 24×24 `viewBox`, `fill="none"`, `stroke="currentColor"`,
  `stroke-width="1.75"`, round caps and joins. `currentColor` means an icon inherits the text color
  it sits beside and flips with dark mode for free — never hardcode a stroke color.
- **Size with the text**, not with magic numbers: `width="1em" height="1em"` for an icon inside a
  line of text; 24px standalone. Mixing stroke widths across a page is the icon equivalent of
  inconsistent radii.
- **Decorative geometry** (a ring behind a number, a dot on a timeline, a soft blob) uses
  `--accent-quiet` or a `--tint-*` fill only. It sits *behind* content and never competes with the
  accent.
- **Accessibility:** an icon that carries meaning gets `role="img"` plus a `<title>` or
  `aria-label`; an icon beside text that already says the same thing gets `aria-hidden="true"`. An
  icon-only button always needs an `aria-label`.
- Don't draw illustrations by hand-writing hundreds of path points — if a graphic needs that much
  detail, it wants a real image, and this system's answer is to leave it out.

## Display

`.display` is the one oversized type step — `--text-4xl` at weight 700. It is a signature move: once
per artifact, on an opener's title or a single hero number, never on a section heading.

```html
<h1 class="display">Platform reliability</h1>
```

- It does not count against the three-sizes rule — it *replaces* the heading it sits on rather than
  adding a fourth size beside it.
- Best under roughly six words. A `.display` title that wraps to three lines reads worse than a
  plain `<h1>`; drop back when the title is long.
- Full usage in [blocks/hero.md](../blocks/hero.md).

## Band

The sanctioned full-bleed moment. Only the **background** reaches the viewport edges; the content
stays in its `.container`, so the "never full-width" law holds.

```html
<div class="band" style="background: var(--tint-sage)">
  <div class="container stack">
    <h2>What changed this quarter</h2>
    <p style="max-width: var(--measure)">…</p>
  </div>
</div>
```

- Background comes from a token — a `--tint-*` or a `--wash-*` — never a one-off color.
- **One band per artifact.** It marks a change of register (a summary, a call to action, a pull
  quote); a page of alternating bands is stripes, not rhythm.
- Text inside a band keeps normal alignment. A band is a background change, not a license to center.

## Motion

Motion is opt-in and restrained; **all rules and values live beside the motion tokens in
[`tokens.css`](../tokens/tokens.css)** (easing choice, duration tiers, what may animate). What
`base.css` ships:

- **Press feedback is built into `.btn`** — a `scale(0.97)` compression on `:active`. Nothing to add.
- **`.reveal`** — a one-shot entrance (fade + rise + unblur) that runs once on load via
  `@starting-style`. Older browsers and reduced-motion users simply see the content in place.
- **`.stagger`** — add to the *parent* to cascade its `.reveal` children 60ms apart.

```html
<main class="container stack stagger">
  <h1 class="reveal">Quarterly review</h1>
  <section class="reveal">…</section>
</main>
```

- **Decorative only.** Content must read fine if the animation never runs; never gate meaning on motion.
- A page load is the *only* entrance that earns animation in a document artifact — don't animate
  list items on hover, and never animate anything keyboard-triggered.
- Reserve `.reveal` for the few top-level chunks (hero, first sections), not every element.

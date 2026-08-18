# Charts & metrics

Numbers earn a picture only when the shape of the data *is* the point. A single number is a
sentence, not a chart. Pick the lightest form that carries the meaning:

| The data | Use | Class |
|---|---|---|
| one headline number | a stat | `.stat` |
| a few label→value pairs, no comparison | a list column | `.list` |
| comparing magnitudes across categories | bars | `.bars` |
| one value against its maximum | a single bar | `.bar` |
| part of a whole (2–4 slices) | a donut | recipe below |
| a trend over time | a sparkline / line | recipe below, `.spark` |
| dense many-column comparison | a table | `table` |

**Draw with CSS and inline SVG — never JavaScript.** A chart library is an external request the
sandbox CSP blocks, and a `<canvas>` prints blank and is invisible to screen readers. Everything
here is markup that renders with the network unplugged. JS stays available for *interaction*
(filtering, tabs), never for drawing.

## Color

The rules live beside the chart tokens in [`../tokens/tokens.css`](../tokens/tokens.css). The short
version: draw every mark in `--chart-muted` and promote the **one** mark that carries the point to
`--chart-strong`. Reach for `--chart-2/-3/-4` only when the series are genuinely unrelated
categories, cap them at four, and label them directly — color alone never carries meaning, because
it is gone in grayscale print and unreliable for colorblind readers.

## No chart junk

The system's laws apply inside a chart too:

- **Spacing, not lines.** No gridlines, no axis rules, no tick marks. `--chart-grid` exists for the
  rare unavoidable baseline; reaching for it is usually a sign the chart wants to be a table.
- **Label the marks, not the margins.** Put the value beside the bar it belongs to instead of making
  the reader trace it back to an axis.
- **No legend when the labels are already on the marks.** A legend is a lookup table; it earns its
  place only when categorical colors appear.
- No 3D, no drop shadows on marks, no gradient fills, no rounded-off starts that misstate zero.

## Stat row

Headline metrics carried by type, not boxes — the answer to the boxy-stat-card tell when a metric
deserves more presence than a `.list` row. At most one `.stat--strong` per row; that one is the
artifact's signature moment.

```html
<div class="stats">
  <div class="stat stat--strong">
    <span class="stat__value">98.4%</span>
    <span class="stat__label">Uptime</span>
    <span class="stat__delta stat__delta--up">+0.6 vs last month</span>
  </div>
  <div class="stat">
    <span class="stat__value">1,284</span>
    <span class="stat__label">Deploys</span>
  </div>
  <div class="stat">
    <span class="stat__value">42 ms</span>
    <span class="stat__label">p95 latency</span>
    <span class="stat__delta stat__delta--down">+8 ms</span>
  </div>
</div>
```

`--up`/`--down` describe the *direction of the number*, not whether it is good news — a rising
latency still moves up. Choose the modifier that matches the reader's reading of better/worse:
`--up` is `--ok` green, `--down` is `--danger`.

## Bars

The default chart. Set each fill's length inline with `--size` as a percentage of the largest value.

```html
<div class="bars">
  <div class="bar bar--strong">
    <span class="bar__label">Direct</span>
    <span class="bar__track"><span class="bar__fill" style="--size: 100%"></span></span>
    <span class="bar__value">4,210</span>
  </div>
  <div class="bar">
    <span class="bar__label">Search</span>
    <span class="bar__track"><span class="bar__fill" style="--size: 62%"></span></span>
    <span class="bar__value">2,614</span>
  </div>
  <div class="bar">
    <span class="bar__label">Referral</span>
    <span class="bar__track"><span class="bar__fill" style="--size: 24%"></span></span>
    <span class="bar__value">1,009</span>
  </div>
</div>
```

Sort by magnitude unless the categories have their own order (months, stages). Bars always start at
zero — a truncated baseline lies about the comparison.

### Meter / progress

One `.bar` on its own is the meter pattern. No extra class:

```html
<div class="bar bar--strong">
  <span class="bar__label">Storage</span>
  <span class="bar__track"><span class="bar__fill" style="--size: 73%"></span></span>
  <span class="bar__value">73%</span>
</div>
```

## Sparkline / trend line

Hand-written inline SVG. Plot the points in a `viewBox` whose coordinates are just the data, and let
`preserveAspectRatio="none"` stretch it to the container — `vector-effect: non-scaling-stroke` (in
`.spark`) keeps the line an even weight despite the stretch.

```html
<svg class="spark" viewBox="0 0 100 30" preserveAspectRatio="none" role="img"
     aria-label="Weekly signups, trending up">
  <title>Weekly signups, trending up</title>
  <polyline points="0,26 14,22 28,24 42,16 56,13 70,15 84,7 100,4"></polyline>
</svg>
```

The y-axis is inverted in SVG coordinates: a *smaller* y is higher on screen. To add a soft area
under the line, put a `<polygon>` before the `<polyline>` closing down to the baseline:

```html
<polygon points="0,26 14,22 28,24 42,16 56,13 70,15 84,7 100,4 100,30 0,30"
         fill="var(--accent-quiet)" stroke="none"></polygon>
```

For a multi-series line chart, give each series its own `<polyline>` with
`stroke="var(--chart-2)"` and label the lines at their right-hand end rather than in a legend.

## Donut

Part-of-a-whole for 2–4 slices, drawn with a `conic-gradient` and masked into a ring. Percentages
must total 100.

```html
<div style="
  inline-size: 8rem; aspect-ratio: 1; border-radius: var(--radius-full);
  background: conic-gradient(var(--chart-strong) 0 62%, var(--chart-2) 62% 83%, var(--chart-muted) 83% 100%);
  mask: radial-gradient(circle, transparent 58%, #000 58%);
  -webkit-mask: radial-gradient(circle, transparent 58%, #000 58%);
"></div>
```

Beyond four slices the differences stop being readable — use `.bars` instead. Always pair a donut
with labelled values; a ring alone makes the reader estimate.

## Print

The print block in `base.css` sets `print-color-adjust: exact`, so bar fills, donut rings, and
sparkline strokes survive to paper. Check any chart in print preview: `.bars` and `.stats` reflow
into narrow columns cleanly, but a wide multi-series SVG may need a smaller `inline-size`.

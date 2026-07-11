# Testbed — sample outputs of the artifact-styling skill

A fictional small project ("Pulse", a habit tracker) rendered as the finished,
self-contained HTML artifacts the skill is supposed to produce. **Not part of the
skill** — untracked scratch output for eyeballing results. Delete freely.

| File | Exercises |
|---|---|
| `index.html` | launcher page + "what to check" list |
| `dashboard.html` | `examples/dashboard.md` path — app shell, list metrics, table, chips, card |
| `report.html` | `templates/report.html` — verdict chip, findings table, callouts |
| `resume.html` | `templates/resume.html` — document type, entries, print/A4 |

Open directly in a browser (double-click) or serve the folder:

```sh
python3 -m http.server 8642   # then http://localhost:8642
```

What to check: OS light/dark toggle (both designed, not inverted), ⌘P on
report/resume (white paper, no bad breaks), devtools network tab (zero external
requests), narrow viewport (fluid reflow, sidebar collapses).

To regenerate after a token/base change: rebuild `dist`, then re-inject by
replacing everything between `<style>` and the first `/* ──` comment in each
file with the new `dist/artifact.css` — or just ask Claude to redo the testbed.

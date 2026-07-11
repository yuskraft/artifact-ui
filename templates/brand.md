# Brand profile

Personal/formal docs (resume, ərizə, letter) need identity. The skill reads an optional profile so
it doesn't re-ask every time; if absent, it fills from the prompt or asks once.

- **Location:** `~/.config/artifact-ui/brand.md`, or a project-local `./.artifact-brand.md`
  (project overrides global).
- **Format:** YAML frontmatter + optional freeform notes below.

```markdown
---
name: Nurlan Yusifli
role: Product Designer
email: nurlanyusifli10@gmail.com
phone: "+994 ..."
location: Baku, Azerbaijan
accent_hue: 32      # maps to --hue-accent
language: az         # default document language (az / en / …)
tone: warm           # freeform hint for copy
---
Freeform notes: preferred phrasings, things to avoid, etc.
```

- **Precedence:** explicit prompt > brand file > ask once > built-in defaults.
- **Apply:** map `accent_hue` → `--hue-accent`; fill `{{NAME}}`, `{{ROLE}}`, `{{EMAIL}}`,
  `{{PHONE}}`, `{{LOCATION}}`, `{{DATE}}` in the templates. Leave nothing as a literal `{{TOKEN}}`
  in the final artifact.

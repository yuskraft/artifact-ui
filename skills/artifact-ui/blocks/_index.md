# Blocks (composed sections)

Sections built from [components](../components/_index.md) — the molecules/organisms that
[templates](../templates/_index.md) and [examples](../examples/_index.md) arrange. Each block is
markup you drop in and fill; it reuses `base.css` classes and adds only small block-specific CSS.

| Block | Use for | Used by |
|---|---|---|
| [Hero](hero.md) | The opening moment — centered (landing) or left-aligned (document) | landing, article, dashboard, report |
| [Section](section.md) | A titled content region with rhythm | everything |
| [Contact row](contact-row.md) | Name/role/contact line for personal docs | resume, ərizə |
| [Experience entry](experience-entry.md) | Role · org · dates · bullets | resume |
| [Signature](signature.md) | Sign-off + signature line + dateline | ərizə, letters |
| [Empty state](empty-state.md) | A region with nothing to show — first use, no results, filtered, failed | dashboard, answer |

**To add a block:** create `name.md` here, add one row above. Keep block-specific CSS minimal and
token-built; push anything reusable down into a component + `base.css` instead.

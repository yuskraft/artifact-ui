# Components (primitives)

The atoms of the system — the smallest reusable pieces. Their CSS lives in
[`../styles/base.css`](../styles/base.css); each file here documents markup, variants, and
do/don't. Compose them into [blocks](../blocks/_index.md); build [templates](../templates/_index.md)
from blocks.

| Component | Class | Use for |
|---|---|---|
| [Button](button.md) | `.btn`, `.btn--accent` | Actions. One accent button per view. |
| [Chip](chip.md) | `.chip` | Tags, filters, small metadata pills. |
| [List](list.md) | `.list`, `.list__row` | Simple label→value data. The default over boxed cards. |
| [Card](card.md) | `.card` | Grouped or media-rich content only — never plain metrics. |
| [Field](field.md) | `input`/`textarea`/`select` | Form inputs. |

**To add a component:** create `name.md` here, add its CSS to `base.css`, add one row above.
Group a trivially small piece into a related file rather than making a near-empty one.

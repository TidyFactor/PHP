# Command: `<name>` — <Short Title>

## Purpose
One or two sentences: what this command builds/audits/extends, and why
it's its own command rather than folded into another one.

## When to run it
- Signal from the audit that suggests this command applies.
- User phrasing that should trigger it (besides the bare command word).

## What it does
Numbered steps — concrete actions, not vague principles. Branch by the
HTMX fork only where it genuinely differs; say so explicitly where it
doesn't. Always name which MVC layer (Controller/Service/Repository/View)
each piece of generated code belongs to.

## Output convention
```
Example file tree fragment showing where output lands, following the
app/, resources/views/, themes/, plugins/, routes/ conventions.
```

## Checklist
- [ ] Concrete, checkable outcomes for this command specifically.

---
To register a new command:
1. Copy this file to `references/commands/<name>.md` and fill it in.
2. Add a row to the Command Index table in `SKILL.md`.
3. If it interacts with an existing command (consumes/produces the same
   files), cross-reference it in both files' "What it does" sections.

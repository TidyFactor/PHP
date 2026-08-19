# Command: `compo` — Reusable Plates Components

## Purpose
Extract repeated markup into reusable Plates components/layouts/partials
so the default theme, custom themes, and the admin panel all draw from
the same small set of building blocks instead of duplicating markup.

## When to run it
- The audit finds the same UI block (button, card, table, modal, form
  field) hand-written repeatedly across views or across the frontend/
  admin split.
- The user says "componentize this markup", "clean up my views", or runs
  `compo`.
- Runs after `store` — components that render data should be built
  against real Repository-backed data, not assumptions about its shape.

## What it does
1. **Layouts** (`resources/views/layouts/`) — `frontend.php` (public
   site chrome) and `admin.php` (dashboard chrome: sidebar + topbar),
   each a Plates layout template other views extend.
2. **Components** (`resources/views/components/`) — `button.php`,
   `card.php`, `table.php`, `modal.php` at minimum, each taking explicit
   parameters (Plates' `$this->insert()`/template data), never reading
   global state implicitly.
3. **Partials** (`resources/views/partials/`) — `header.php`,
   `footer.php`, `sidebar.php` — smaller, layout-specific fragments
   distinct from general-purpose components.
4. Themes (see `themes.md`) may override components/partials/layouts by
   providing their own file at the same relative path — `compo` builds
   the default set themes fall back to, not a hardcoded-forever set.
5. **HTMX fork**: if enabled, components that support partial-page
   updates expose an HTMX-attributed variant (`hx-get`/`hx-target`) as
   an explicit, opt-in rendering mode — not the only way the component
   renders, so it still works with a full page load.
6. Replace hand-written duplicated markup with the component/partial in
   every place it's used, confirming zero visual change.

## Output convention
```
resources/views/
  layouts/{frontend,admin}.php
  components/{button,card,table,modal}.php
  partials/{header,footer,sidebar}.php
```

## Checklist
- [ ] No duplicated markup remains for a block that now has a component
- [ ] Every component takes explicit parameters — no implicit global
      state read
- [ ] Layouts/components live at paths themes can override
- [ ] HTMX-attributed variants (if enabled) are additive, not the only
      rendering path
- [ ] Same visual output as before extraction

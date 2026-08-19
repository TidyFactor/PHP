# Command: `themes` — Theme System

## Purpose
Make the frontend presentation layer swappable without touching
application code — a theme is a self-contained set of layouts, pages,
partials, components, and assets, activated by configuration.

## When to run it
- The audit finds frontend markup hardcoded into `app/` or
  `resources/views/` in a way that can't be swapped without editing
  Controller/Service code, or a new theme is being added/audited.
- The user says "add a theme system", "create a new theme", "why can't I
  switch themes", or runs `themes`.
- Runs after `compo` (the default component/layout set themes fall back
  to must exist first) and roughly alongside `plugins`/`events`.

## What it does
1. Each theme is a self-contained directory:
   `themes/{name}/{layouts,pages,partials,components,assets}/` plus a
   `theme.json` manifest (name, version, author, supported features).
2. The active theme is a single config value
   (`config('app.active_theme')`, set via `.env`/admin `Settings`
   module) — the theme loader resolves it once at bootstrap and injects
   the theme's view-search path into Plates ahead of the default
   fallback path.
3. **Fallback discipline**: if a theme doesn't override a given
   layout/component/partial, Plates resolves to `resources/views/`'s
   default — a theme only needs to provide what it actually changes, not
   a full copy of every file.
4. Themes never contain PHP business logic, database queries, or route
   registrations — a theme is presentation only. If a theme needs new
   behavior, that's a plugin's job (see `plugins.md`), not a theme's.
5. Theme assets (`themes/{name}/assets/`) are served statically, same
   cache-busting discipline as any other static asset (a version param
   or a build timestamp from `theme.json`).
6. Theme switching is tested by confirming the same content (Pages/Posts
   from `store`) renders correctly under a second theme with only
   presentational differences — if switching themes changes behavior,
   something PHP-logic-shaped leaked into the theme layer.

## Output convention
```
themes/
  default/{layouts,pages,partials,components,assets}/  theme.json
  {custom-theme}/{layouts,pages,partials,components,assets}/  theme.json
```

## Checklist
- [ ] Every theme has a valid `theme.json` manifest
- [ ] Active theme is resolved from config, not hardcoded
- [ ] Themes only override what they change — no unnecessary full-file
      duplication
- [ ] No PHP business logic, database query, or route registration
      exists inside any `themes/` directory
- [ ] Switching the active theme changes presentation only, not behavior

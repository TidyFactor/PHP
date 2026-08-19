# Command: `plugins` — Plugin System (WordPress-style, auto-discovered)

## Purpose
Let functionality be added or removed without touching core application
code — a plugin is a self-contained directory, auto-discovered at
bootstrap, that can register routes, menu items, event listeners,
services, and permissions.

## When to run it
- The audit finds a feature bolted directly into `app/` that's genuinely
  optional/removable (an SEO helper, a contact-form-to-Slack integration)
  and would be better isolated as a plugin, or a plugin already exists
  but doesn't follow the auto-discovery contract.
- The user says "add a plugin system", "turn this into a plugin", "write
  a plugin that does X", or runs `plugins`.
- Runs after `events` conceptually (plugins subscribe to the dispatcher)
  though both are typically built together — see the cross-reference
  note in `SKILL.md`'s Phase 2.

## What it does
1. Each plugin is a self-contained directory:
   `plugins/{slug}/{plugin.php, routes.php, services/, views/, assets/,
   config.php}`.
2. `plugin.php` is the entry point — returns metadata (name, version,
   author, requires) and a `register(Container $container, EventDispatcher
   $events)` function/class where the plugin wires itself up: adds routes
   (via `routes.php`), subscribes to events, registers services into the
   container, declares admin menu items, declares any permissions it
   introduces (for `rbac.md`).
3. **Auto-discovery**: the bootstrap plugin loader scans `plugins/*/plugin.php`,
   requires each one, and calls `register()` — no central
   hand-maintained list of "installed plugins" for the user to edit; a
   plugin becomes active by existing in `plugins/` (gated by an
   admin-toggleable enabled/disabled state stored via `store`, not by
   file presence alone, so a plugin can be disabled without deletion).
4. A plugin's `routes.php` follows the same clean-URL/middleware
   discipline as `route.md` — typically namespaced under its own prefix
   to avoid collisions with core routes.
5. A plugin's `services/` follow the same MVC-layer discipline as core
   code (`pages.md`) — a plugin isn't exempt from "Controllers never
   contain business logic" just because it lives in `plugins/`.
6. A plugin declares any new permission it introduces (e.g. `seo.manage`)
   so `rbac.md`'s system can assign it to roles — plugins extend the
   permission set, they don't bypass it.
7. Plugin activation/deactivation dispatches `plugin.loaded` (or a
   deactivation counterpart) so other plugins/core code can react.
8. A broken plugin (fatal error during `register()`) is caught and
   reported without taking the whole site down — the loader isolates
   plugin bootstrap failures per plugin.

## Output convention
```
plugins/
  {slug}/
    plugin.php        (metadata + register())
    routes.php
    services/
    views/
    assets/
    config.php
```

## Checklist
- [ ] Every plugin is discoverable purely by directory presence under
      `plugins/`, no hand-maintained registry
- [ ] Every plugin's `register()` is isolated — a fatal error in one
      plugin doesn't take down the site
- [ ] Plugin routes follow the same clean-URL/middleware discipline as
      core routes
- [ ] Plugin services follow the same MVC-layer discipline as core code
- [ ] New permissions a plugin introduces are declared for `rbac.md`, not
      bypassed
- [ ] Plugins can be disabled without deletion (state stored, not
      inferred from file presence alone)

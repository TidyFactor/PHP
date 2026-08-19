# Command: `init` — Full Monolith Scaffold (Primary Deliverable)

## Purpose
Produce the complete, working skeleton in one pass — everything a
project needs to run before any content or plugin is added. This is the
reason the skill exists, the same way `tidyfactor-php-micro`'s `init` is
its primary deliverable, just scaled to platform size.

## When to run it
- Mode is Init (Step 0).
- User says "scaffold this monolith", "build a WordPress alternative in
  PHP", "give me the Flight+Medoo+Plates skeleton", or runs `init`.

## What it does
Confirm the HTMX fork, project name, database credentials (or generate
`.env.example` for the user to fill in), default theme name, and an
admin seed credential — then generate, in order:

1. **Directory structure** — the full locked layout (see Output
   convention).
2. **`composer.json`** — Flight PHP, Medoo, Plates, Monolog, PSR-12
   tooling (phpcs or equivalent), minimal beyond that — "avoid
   unnecessary dependencies" is a hard constraint, not a suggestion.
3. **Bootstrap process** (`bootstrap/app.php`) — loads `.env`, builds the
   DI container, registers the error handler, loads config, initializes
   Flight, then hands off to the plugin loader and theme loader before
   dispatching.
4. **Flight initialization** — `public/index.php` as the single entry
   point, requiring `bootstrap/app.php`, calling `Flight::start()`.
5. **DI container** (`app/Support/Container.php` or a small PSR-11
   implementation) — Controllers/Services/Repositories are resolved
   through it, not `new`'d ad hoc with hidden dependencies.
6. **Configuration loader** (`config/*.php` files + `.env` reader) — see
   `logic.md` for the full discipline; `init` wires the mechanism.
7. **Router registration** (`routes/web.php`, `routes/admin.php`,
   `routes/auth.php`, loaded by feature) — see `route.md`.
8. **Database connection** — Medoo instance built from `config/database.php`,
   resolved through the container, injected into Repositories only.
9. **Base Controller** (`app/Controllers/Controller.php`) — shared
   helpers (redirect, view render via Plates, request/input access), no
   business logic.
10. **Base Service** and **Base Repository** — thin base classes
    establishing the pattern (`app/Services/Service.php`,
    `app/Repositories/Repository.php`) that concrete classes extend.
11. **Event dispatcher** — see `events.md`; `init` wires the skeleton and
    a handful of core events (`page.created`, `user.login`, `user.logout`,
    `plugin.loaded`).
12. **Plugin loader** — see `plugins.md`; `init` wires auto-discovery
    over `plugins/*/plugin.php`, running with zero plugins installed.
13. **Theme loader** — see `themes.md`; `init` wires active-theme
    resolution and ships one working `themes/default/` theme.
14. **Middleware pipeline** — see `route.md`; `init` wires Auth, Guest,
    CSRF, and Maintenance Mode middleware, registered per route file.
15. **Authentication module** — see `secure.md`; session-based login/
    logout/register flows, password hashing, CSRF protection, Remember
    Me, working end to end against a `users` table/migration.
16. **Example CRUD for Pages** — a full vertical slice (migration,
    `Page` model, `PageRepository`, `PageService`, `PageController`,
    Plates views for list/create/edit/delete, registered routes) —
    concrete proof the MVC pattern works, not a stub.
17. **Reusable Plates layouts and components** — `layouts/frontend.php`,
    `layouts/admin.php`, and the base `components/` (button, card, table,
    modal) — see `compo.md`.
18. **Default theme** — `themes/default/` with Home, Page, Blog, Single
    Post, 404, Search, Contact templates, navigation, and footer partial —
    working, not placeholder Lorem Ipsum, consuming the Pages CRUD's
    real data.
19. **The 13-module admin panel** — `init` scaffolds Dashboard, Pages
    (from step 16), Users, and Settings as fully working; the remaining
    modules (Posts, Media Library, Menus, Roles, Permissions, Themes,
    Plugins, Logs, Profile) get real navigation entries and a working
    "coming from `admin`/`rbac`/`media`/`themes`/`plugins` commands"
    landing state rather than a 404 — `init` doesn't fully build all 13
    in one pass (that's what the rest of the command library is for), but
    nothing in the nav is a dead link.
20. **README.md** — architecture explanation, conventions, extension
    points (how to write a plugin, how to add a theme, how to subscribe
    to an event), and the local development workflow (composer install,
    `.env` setup, migrations, running the app on shared-hosting-like
    PHP built-in server for local dev).
21. Stop here — deeper build-out of the remaining admin modules, RBAC
    enforcement, Media Library, and caching are the next commands, run
    deliberately, not force-completed inside `init`.

## Output convention
```
project/
├── app/
│   ├── Controllers/         (Page, Auth, Admin\...)
│   ├── Services/
│   ├── Repositories/
│   ├── Models/
│   ├── Middleware/
│   ├── Policies/
│   ├── Validators/
│   ├── Events/
│   ├── Listeners/
│   ├── Helpers/
│   └── Support/              (Container, etc.)
├── bootstrap/app.php
├── config/                    (app.php, database.php, ...)
├── database/{migrations,seeds}/
├── public/
│   ├── index.php
│   └── assets/{css,js,images}/
├── resources/
│   ├── views/{layouts,partials,components,pages,errors}/
│   └── lang/
├── routes/{web.php,admin.php,auth.php}
├── storage/{cache,logs,uploads,sessions}/
├── themes/default/{layouts,pages,partials,components,assets,theme.json}
├── plugins/                    (empty — ready for auto-discovery)
├── .env.example
├── composer.json
└── README.md
```

## Checklist
- [ ] HTMX fork confirmed and documented in README, not guessed
- [ ] `composer install` succeeds with only the stated minimal
      dependencies
- [ ] Login/logout/register work end to end against a real migration
- [ ] The Pages CRUD is a complete, working vertical slice — not a stub
- [ ] Default theme renders real Pages CRUD data, not placeholder content
- [ ] Every admin-nav entry resolves to a real page — no 404s, even for
      modules not yet fully built
- [ ] Plugin loader runs cleanly with zero plugins present
- [ ] No business logic in any Controller; no SQL/business logic in any
      View
- [ ] No secret/credential hardcoded outside `.env`
- [ ] README documents architecture, extension points, and local dev
      workflow

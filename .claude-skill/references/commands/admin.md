# Command: `admin` — The 13 Fixed Admin Modules

## Purpose
Build and extend the dashboard's locked shape: **Dashboard, Pages,
Posts, Media Library, Menus, Users, Roles, Permissions, Settings,
Themes, Plugins, Logs, Profile**. This command owns each module's
Controller/Service/View; `rbac.md` owns the permission gating,
`media.md` owns Media Library's storage internals, `themes.md`/
`plugins.md` own what the Themes/Plugins modules manage underneath.

## The locked shape — read this before touching anything
Exactly 13 modules. A 14th, or replacing one of these, is **always a
confirmed decision with the user** — propose it, explain the tradeoff,
wait for explicit agreement. This is not a normal `admin` run; treat it
as a scope change, the same discipline `tidyfactor-js-micro`'s `admin.md`
applies to its (smaller) locked set.

| Module | What it manages |
|---|---|
| Dashboard | At-a-glance summary — counts, recent activity, nothing that isn't already computed elsewhere |
| Pages | The `pages.md`/`store.md`-backed CRUD scaffolded in `init.md` |
| Posts | Same CRUD shape as Pages, typically with categories/tags |
| Media Library | See `media.md` — uploads, thumbnails, browsing/attaching to content |
| Menus | Manage the frontend navigation structure (`partials/header.php` reads from this rather than hardcoding links) |
| Users | Manage user accounts (list/create/edit/deactivate) |
| Roles | Named roles (see `rbac.md`) |
| Permissions | The permission catalog, including ones plugins declare |
| Settings | Site-wide key-value settings form (site name, active theme, contact email, feature toggles) |
| Themes | Activate/preview installed themes (see `themes.md`) |
| Plugins | Enable/disable installed plugins (see `plugins.md`) |
| Logs | Read-only viewer over the Monolog output (application/error/security logs from `init.md`'s bootstrap) |
| Profile | The logged-in user's own account settings (password change, etc.) |

## When to run it
- `init` already scaffolded Dashboard, Pages, Users, and Settings fully
  working, with real nav entries (not 404s) for the rest — run `admin`
  to build out one of the remaining modules, or to extend/audit an
  existing one.
- The user asks for functionality in a specific module, or to add a
  module (triggers the confirmation above first).
- Runs after `themes`, `plugins`, and `events` exist (the Themes/Plugins
  modules manage them; other modules may dispatch/react to events) and
  before `rbac` fully gates every module's routes, `media` (Media
  Library's storage internals), and `cache`.

## What it does
1. Confirm which module(s) are in scope — don't touch the others.
2. Each module follows the same MVC discipline as any other feature
   (`pages.md`): thin Controller, Service for business logic, Repository
   for data (`store.md`), Plates views built from `compo`'s shared
   components (especially `table.php`/`modal.php` for list/confirm-
   delete patterns — reused across all 13, not reimplemented per module).
3. Every mutating action shows a loading/pending state and explicit
   success/error feedback — an admin surface people rely on to confirm a
   change took effect never fails silently.
4. Destructive actions (delete a Page/Post/User, deactivate a Plugin)
   require a confirmation step.
5. Every module's routes live in `routes/admin.php` under the `/admin`
   prefix, gated by `AuthMiddleware` and the RBAC permission check from
   `rbac.md` — a module a user can't see in the nav should also 403 if
   reached directly by URL, not merely be hidden.
6. Relevant domain events dispatch on mutating actions
   (`page.created`, etc.) per `events.md`.

## Output convention
```
app/Controllers/Admin/{Dashboard,Page,Post,Media,Menu,User,Role,
                        Permission,Setting,Theme,Plugin,Log,Profile}Controller.php
app/Services/Admin/...
resources/views/pages/admin/{dashboard,pages,posts,media,menus,users,
                              roles,permissions,settings,themes,plugins,
                              logs,profile}/
```

## Checklist
- [ ] Exactly 13 modules exist, matching the locked shape — any
      deviation was explicitly confirmed first
- [ ] Every module performs real CRUD/actions against `store`'s
      Repositories, not static placeholder content
- [ ] Loading and success/error feedback present on every mutating action
- [ ] Destructive actions require confirmation
- [ ] Every module reuses `compo`'s shared table/modal/form components
- [ ] Every module's routes are both auth-guarded and RBAC-permission-
      guarded — verified by attempting direct URL access without the
      permission, not just checking the nav is hidden

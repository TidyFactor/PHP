# Command: `rbac` — Roles & Permissions Enforcement

## Purpose
The enforcement layer behind `admin`'s Roles/Permissions/Users modules:
named roles, a permission catalog (core + plugin-declared), and the
actual gating logic that decides whether a given user can reach a given
admin action — distinct from `admin.md` because this is policy/
enforcement, not screens.

## When to run it
- The audit finds an admin route gated only by "is logged in" with no
  finer-grained permission check, a permission check duplicated ad hoc
  across Controllers instead of centralized, or a role with no clear
  permission set.
- The user says "add roles and permissions", "restrict this to admins
  only", "why can any logged-in user reach X", or runs `rbac`.
- Runs after `admin`'s modules exist (Roles/Permissions/Users need
  something to manage) and gates every other admin route as it's built.

## What it does
1. **Roles** (`roles` table via `store.md`) — named roles (e.g. Admin,
   Editor, Author) each with an assigned set of permissions. Seed at
   least one full-access role during `init`/first run.
2. **Permissions** (`permissions` table) — a flat catalog of permission
   strings (`pages.manage`, `users.manage`, `settings.manage`, ...) —
   core modules declare their own at build time; plugins declare theirs
   via `plugins.md`'s `register()` step.
3. **Policies** (`app/Policies/`) — one policy class per resource
   (`PagePolicy`, `UserPolicy`) with methods like `canEdit(User $user,
   Page $page)` — encapsulates "what does it take to do this," reusable
   from both `AdminMiddleware` (route-level gating) and inside a View
   (hiding a button the user can't use) so the two never drift apart.
4. `AdminMiddleware` (from `route.md`) resolves the required permission
   for the matched route and checks it via the relevant Policy before
   the Controller runs — a 403 page (per `secure.md`'s error handling) on
   failure, not a silent redirect that leaves the user guessing why.
5. Permission checks are never duplicated as ad hoc `if ($user->role ===
   'admin')` string comparisons scattered through Controllers/Views —
   always through a Policy method.
6. Every admin module built in `admin.md` gets a corresponding permission
   at the time it's built, not retrofitted later as an afterthought.

## Output convention
```
app/Policies/{Page,User,...}Policy.php
database/migrations/  (roles, permissions, role_permissions, user_roles)
database/seeds/       (at least one full-access role seeded)
```

## Checklist
- [ ] Every admin module has a corresponding permission, checked via a
      Policy, not a role-name string comparison
- [ ] `AdminMiddleware` enforces the permission at the route level for
      every admin route, not just hiding nav items
- [ ] A user lacking permission for a direct-URL admin request gets a 403
      page, not a silent redirect
- [ ] Policies are the single source of truth reused by both middleware
      and view-level "can they see this button" checks
- [ ] Plugin-declared permissions are assignable to roles through the
      same Roles/Permissions modules as core ones

# Command: `route` — Feature-organized Routing & Middleware Pipeline

## Purpose
Keep Flight's routes organized by feature, using clean URLs, with a
predictable middleware pipeline attached per route group — so adding a
route never means guessing which of a thousand-line `routes.php` lines
to edit, and every route's auth/CSRF/rate-limit posture is explicit.

## When to run it
- The audit finds routes registered ad hoc outside `routes/`, unclean
  URLs (`?page=about` instead of `/about`), or a route missing the
  middleware its content warrants (an admin route with no auth check, a
  login route with no rate limit).
- The user says "organize my routes", "clean up my URLs", "why can I
  reach admin logged out", or runs `route`.
- Runs after `compo` and `store` (routes dispatch to Controllers that
  render components against real data) and before `pages`/`admin`.

## What it does
1. **Feature-organized files**: `routes/web.php` (public site),
   `routes/admin.php` (dashboard, all under an `/admin` prefix),
   `routes/auth.php` (login/register/logout/password-reset) — each
   `require`'d from `bootstrap/app.php`, never one monolithic file.
2. **Clean URLs**: `/`, `/about`, `/contact`, `/blog`, `/blog/{slug}`,
   `/admin`, `/admin/posts`, `/admin/posts/create`,
   `/admin/posts/edit/{id}` — Flight's route parameters, not query-string
   pagination-of-concerns.
3. **Middleware pipeline**, attached per route or per group:
   - `AuthMiddleware` — every `/admin/*` route (except `/admin/login`
     itself) requires an authenticated session.
   - `GuestMiddleware` — auth routes (`/login`, `/register`) redirect
     away if already authenticated.
   - `CsrfMiddleware` — every POST/PUT/DELETE route, per `secure.md`.
   - `AdminMiddleware` — beyond plain authentication, checks the RBAC
     permission for the specific admin section (see `rbac.md`) — being
     logged in isn't being authorized for every module.
   - `MaintenanceMiddleware` — short-circuits all non-admin routes with
     a maintenance page when maintenance mode is on, with an explicit
     admin bypass.
   - `RateLimitMiddleware` — applied to login/register/password-reset at
     minimum, to blunt credential-stuffing/brute-force attempts.
4. Middleware order matters and is documented where attached: Maintenance
   → Auth/Guest → CSRF → Admin/RBAC → Controller. A route missing an
   expected middleware for its content type is a defect, flagged in the
   audit, not an edge case.
5. Route names/URLs stay stable when possible — a Controller action
   rename shouldn't silently change the public URL without the user
   confirming that's intended (URLs are content, effectively).
6. **Error pages**: Flight's `notFound()`/error handlers render real
   themed pages —
   `resources/views/errors/{404,403,500,maintenance}.php` — never
   framework defaults or a bare string response. Maintenance mode is the
   single config flag `MaintenanceMiddleware` checks; when it's on,
   every non-admin request short-circuits to `maintenance.php` with the
   documented admin bypass intact.

## Output convention
```
routes/{web,admin,auth}.php
app/Middleware/{Auth,Guest,Csrf,Admin,Maintenance,RateLimit}.php
resources/views/errors/{404,403,500,maintenance}.php
```

## Checklist
- [ ] Routes organized into `web.php`/`admin.php`/`auth.php` by feature,
      not one flat file
- [ ] All URLs are clean (no unnecessary query-string routing)
- [ ] Every `/admin/*` route (except login) requires `AuthMiddleware`
- [ ] Every `/admin/*` route requiring a specific permission has
      `AdminMiddleware`'s RBAC check attached
- [ ] Every state-changing route has `CsrfMiddleware`
- [ ] Login/register/password-reset carry `RateLimitMiddleware`
- [ ] Maintenance mode short-circuits non-admin routes with an admin
      bypass
- [ ] 404/403/500/maintenance all render real themed pages, never a
      framework default

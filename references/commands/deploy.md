# Command: `deploy` — Shared-Hosting Launch Checklist

## Purpose
Get the monolith running on typical shared PHP hosting (cPanel-style, no
root/SSH beyond basics assumed, no Node/JS build tooling required per the
project's own goals) — the deploy target this whole track was designed
around, per the source brief's "shared hosting friendly" goal.

## When to run it
- `seo` has run (or the user explicitly skips it) and the app is ready to
  ship.
- User says "deploy this", "prep for shared hosting", "why isn't storage/
  writable in production", or runs `deploy`.
- Always last.

## What it does
1. **Document root**: the hosting account's document root must point at
   `public/`, not the project root — `index.php`, `.env`, `app/`, etc.
   must sit outside the web-servable directory. If the host only allows a
   fixed document root (common on cheap shared hosting), use a
   `public/`-forwarding `index.php` at the account root as the documented
   fallback, and flag the security tradeoff (everything technically
   reachable by direct URL unless `.htaccess`/web server config blocks
   it).
2. **Composer**: run `composer install --no-dev --optimize-autoloader`
   for production — never ship `vendor/` from a dev install with dev
   dependencies (PHPUnit, etc.) included.
3. **`.env`**: production values set directly on the host (never commit
   the real `.env`), `APP_ENV=production`, `APP_DEBUG=false` — a debug
   page leaking stack traces/config in production is a hard blocker, not
   a warning.
4. **Migrations**: run the migration runner against the production
   database before first request; confirm the seed step (if any) only
   ran once (idempotent or explicitly gated) rather than re-seeding on
   every deploy.
5. **Writable directories**: `storage/{cache,logs,uploads,sessions}`
   need write permission for the PHP process — confirm this explicitly
   on shared hosts where permission models vary; a silently-failing
   write (uploads that "succeed" but don't persist) is a common shared-
   hosting failure mode worth checking for directly, not assuming away.
6. **Clean URLs**: `.htaccess` (Apache, the common shared-hosting case)
   rewriting all requests to `public/index.php` — confirm `mod_rewrite`
   is enabled on the host; provide the equivalent Nginx `try_files`
   block as a documented alternative for hosts that use it.
7. **HTTPS**: confirm the host's HTTPS is active and session cookies'
   `Secure` flag (from `secure.md`) doesn't silently break login if
   HTTPS isn't actually enforced yet — check for that mismatch
   explicitly.
8. **OPcache**: confirm PHP's OPcache is enabled on the host where
   available — meaningful performance difference for a project this
   size, and usually just a hosting-panel toggle rather than anything
   this skill needs to configure in code.
9. **Cron** (if the host offers it): not required for anything this
   track builds now (scheduler is future-extensibility scope per
   `SKILL.md`), but note where a future cron entry would go if that
   changes later — don't set one up prematurely.
10. Final checklist pass, then report the exact steps for the confirmed
    host.

## Output convention
```
.htaccess  (Apache rewrite to public/, or documented Nginx equivalent)
Deploy report: composer/env/migrations/permissions/HTTPS checklist
               results, specific to the confirmed host.
```

## Checklist
- [ ] Document root points at `public/`, or the fallback forwarding
      approach is documented with its tradeoff flagged
- [ ] Production Composer install excludes dev dependencies
- [ ] `.env` has production values, `APP_DEBUG=false`, and was never
      committed
- [ ] Migrations run against production; seeding is idempotent, not
      re-run on every deploy
- [ ] `storage/*` write permission confirmed, not assumed — verified with
      an actual write test if possible
- [ ] Clean-URL rewrite confirmed working (Apache `mod_rewrite` or Nginx
      equivalent)
- [ ] HTTPS active and consistent with `secure.md`'s `Secure` cookie flag
- [ ] OPcache enabled where the host supports it

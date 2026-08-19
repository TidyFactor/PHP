# Command: `logging` — Application, Error & Security Logs

## Purpose
Give the project structured, separated logging via Monolog — application
events, uncaught errors, and security-relevant events each in their own
channel — so `admin.md`'s Logs module has something meaningful to show
and incidents are traceable.

## When to run it
- The audit finds `error_log()`/`var_dump()` debugging left in place, no
  logger configured, or every log line mixed into one undifferentiated
  file.
- The user says "add logging", "I need an audit trail", or runs
  `logging`.

## What it does
1. Three Monolog channels, each its own rotating file under
   `storage/logs/`: `app.log` (general application events — cache
   misses, background task results, non-fatal warnings), `error.log`
   (uncaught exceptions, 500-level failures — wired into the global
   error handler `route.md` sets up), `security.log` (failed logins,
   permission-denied/RBAC-denied attempts, CSRF failures, rate-limit
   triggers — fed from `route.md`'s middleware pipeline, `rbac.md`, and
   the `Auth` flow).
2. A thin `app/Support/Logger.php` (or DI-registered service) exposes
   the three channels by name — Services/Controllers request the
   channel they need, never instantiate Monolog directly per call site.
3. Log entries include enough context to investigate (user id if
   authenticated, IP, route) but never log full request bodies,
   passwords, tokens, or other secrets — a login failure logs *that* it
   failed and the attempted username, never the attempted password.
4. Rotation/retention configured (daily rotation, a sane retention
   window) so `storage/logs/` doesn't grow unbounded on shared hosting
   with limited disk quota.
5. `events.md`'s listener-failure logging and `secure.md`'s
   security-relevant findings both route through this same mechanism —
   no separate ad hoc logging path introduced elsewhere. `admin.md`'s
   Logs module reads `security.log` (and, at minimum, recent `error.log`
   entries) rather than re-querying the raw files ad hoc.

## Output convention
```
app/Support/Logger.php
storage/logs/{app,error,security}.log
```

## Checklist
- [ ] No `error_log()`/`var_dump()` debugging left in production code
- [ ] Three channels used consistently, nothing logged to the wrong one
- [ ] No secret/password/token ever written to any log
- [ ] Rotation/retention configured, not left to grow unbounded
- [ ] Every log call goes through the shared Logger service, not a
      direct Monolog instantiation per call site

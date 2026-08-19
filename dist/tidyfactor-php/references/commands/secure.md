# Command: `secure` — Security Audit & Hardening

## Purpose
Close the classic vulnerability classes and enforce the session-based
auth module — CSRF, SQL injection, XSS, insecure sessions/cookies,
unvalidated uploads — before anything else gets restructured on top of
the code. Always runs first (Phase 1), same discipline as
`tidyfactor-php`'s `secure.md`, scaled to this track's fuller auth
surface (login, register, Remember Me).

## When to run it
- The audit finds SQL built outside a Repository, a form without CSRF
  protection, unescaped output in a Plates view, session cookies without
  `Secure`/`HttpOnly`/`SameSite`, or file uploads accepted without
  validation.
- The user says "audit this for security", "add CSRF protection", "fix
  XSS/SQL injection", or runs `secure`.
- **Always runs first**, before any other command.

## What it does
1. **CSRF** — every state-changing form (POST/PUT/DELETE) carries a CSRF
   token, validated by `CsrfMiddleware` before the Controller runs. No
   form is exempted without an explicit, documented reason.
2. **SQL injection** — every database query goes through Medoo inside a
   Repository, using Medoo's parameter binding, never raw string
   concatenation. If a query is found outside a Repository, that's also
   a `store.md` violation — fix the placement and the binding together.
3. **XSS / output escaping** — every Plates view escapes user-controlled
   output by default (Plates' `escape()`/`e()` helper); raw output
   (`raw()`) is only used where explicitly justified (trusted HTML from
   an admin-authored field) and flagged in the audit report.
4. **Session security** — session cookies set `Secure`, `HttpOnly`,
   `SameSite=Lax` (or `Strict` where it doesn't break legitimate cross-
   site navigation flows); session ID regenerated on login/privilege
   change to prevent fixation.
5. **Password hashing** — `password_hash()`/`password_verify()`
   (bcrypt/argon2), never a custom or reversible scheme.
6. **Remember Me** — implemented via a separate, hashed, single-use
   token stored server-side (not the raw session ID persisted in a
   cookie) — a stolen Remember-Me cookie shouldn't be replayable
   indefinitely without server-side revocation capability.
7. **File upload validation** — MIME-type and extension allow-listing
   (not deny-listing), size limits, re-encoding images where feasible,
   uploaded files stored outside `public/` where possible or served
   through a controller that validates access — see `media.md` for the
   full Media Library discipline this feeds into.
8. **Security headers** — `X-Content-Type-Options: nosniff`,
   `X-Frame-Options` or a CSP frame-ancestors directive,
   `Referrer-Policy`, a baseline Content-Security-Policy appropriate to
   the theme/plugin surface (flagged as needing revisiting whenever a
   plugin adds inline scripts).
9. **Input validation** — every Controller action validates input via
   `app/Validators/` before handing off to a Service — a Service should
   never have to re-validate what a Controller already should have.
10. **Maintenance Mode / Rate Limiting middleware** — audited here for
    correct behavior (a maintenance-mode bypass for admins, sane rate
    limits on login/register) even though they're wired in `route.md`.

## Output convention
```
No new top-level directories in the common case — hardening lands inside
app/Middleware/{Csrf,Auth,Guest,Admin,RateLimit,Maintenance}.php,
app/Validators/, and existing Repository/View files.
```

## Checklist
- [ ] Every state-changing form has CSRF protection
- [ ] No raw SQL/string-concatenated query exists outside a Repository
- [ ] Every Plates view escapes user-controlled output by default; `raw()`
      uses are explicitly justified and reported
- [ ] Session cookies carry `Secure`/`HttpOnly`/`SameSite`; session ID
      regenerates on login
- [ ] Passwords hashed with `password_hash()`; Remember Me uses a
      revocable, hashed token, not the raw session
- [ ] File uploads validated by allow-list MIME/extension and size limit
- [ ] Baseline security headers present
- [ ] Every Controller action validates input before calling a Service

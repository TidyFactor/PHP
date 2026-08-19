# Command: `logic` — Central Configuration & DI Bindings

## Purpose
One source of truth for environment-dependent values (`config/` +
`.env`) and for how the DI container resolves Controllers/Services/
Repositories — so nothing reaches into `$_ENV` directly or `new`'s a
dependency ad hoc, hiding what it actually depends on.

## When to run it
- The audit finds a config value (DB credentials, mail settings, active
  theme name) hardcoded or read from `$_ENV`/`getenv()` outside
  `config/`, or a class constructing its own dependencies instead of
  receiving them.
- The user says "centralize config", "clean up the DI setup", or runs
  `logic`.
- Runs early in Phase 2 — `store`, `route`, `themes`, `plugins` all read
  from this.

## What it does
1. `.env` holds environment-specific secrets/values only (DB credentials,
   mail credentials, `APP_ENV`, `APP_DEBUG`); `config/*.php` files
   (`app.php`, `database.php`, `mail.php`, `session.php`) read from
   `.env` via a small typed helper (`env('DB_HOST', 'localhost')`) and
   expose everything else (defaults, feature toggles, the active theme
   name) as plain PHP arrays — committed, not secret.
2. Every config read goes through `config('database.host')`-style
   access, never `$_ENV['DB_HOST']` scattered across the codebase.
3. DI container bindings (`app/Support/Container.php` or equivalent)
   register how each Service/Repository is constructed — a Controller
   type-hints its dependencies in the constructor and the container
   resolves them; no Controller/Service `new`'s a Repository directly.
4. `.env.example` stays in sync with every key `.env` actually uses —
   a new required key added anywhere gets added there too, in the same
   command run.
5. Never commit `.env` itself (confirm `.gitignore` covers it); never put
   a real secret into a `config/*.php` file, even as a "temporary"
   default.

## Output convention
```
config/{app,database,mail,session}.php
.env, .env.example
app/Support/Container.php
```

## Checklist
- [ ] No config value read from `$_ENV`/`getenv()` outside `config/`'s
      loader helper
- [ ] Every Controller/Service/Repository receives its dependencies via
      constructor injection through the container, never self-constructed
- [ ] `.env.example` lists every key `.env` requires, with safe
      placeholder values
- [ ] `.env` is gitignored; no real secret lives in a committed
      `config/*.php` file

# TidyFactor PHP Mono — Workflow Discipline

Applies underneath every command in `commands/`.

## 1. Audit
- Map the file tree against the expected `app/`, `themes/`, `plugins/`,
  `resources/views/`, `routes/`, `storage/` shape.
- Count: business logic living inside Controllers (MVC violation), raw
  SQL/string-built queries outside Repositories, views containing SQL or
  business logic, routes not organized by feature file, admin modules
  beyond the locked 13, plugins/themes not following the auto-discovery
  contract, any "future extensibility" item (REST API, CLI, scheduler,
  multi-tenant...) partially built without a prior confirmed decision.
- Note whether HTMX progressive enhancement is enabled in the existing
  repo — confirm rather than re-ask.
- Note any CDN-loaded frontend asset (Tailwind/Alpine/htmx `<script
  src="https://...">`) or debugging left in production code
  (`error_log()`/`var_dump()`, no structured logger) — these feed
  `assets`/`logging` findings even when neither was the command asked
  for.
- Report findings and the proposed target structure.
- **Stop for confirmation** before editing, unless told to proceed
  automatically.

## 2. Execute in batches
- One module/repository/view/plugin at a time — MVC violations and
  security gaps first (highest risk), then structural duplication.
- Never one giant diff across the whole app in a single pass.
- After any schema change, confirm the matching migration exists and
  runs cleanly before moving to the next batch.

## 3. Verify
- Confirm no functional/visual regression.
- Confirm the MVC split held: no business logic snuck into a Controller,
  no SQL snuck into a View, no direct DB call snuck into a Service.
- Trace at least one affected request end-to-end (Controller → Service →
  Repository → Medoo → Plates) to confirm the layering is actually
  intact, not just visually inspected file-by-file.
- Confirm every admin-namespaced route is still gated by `rbac`'s
  permission check after any routing change.
- Report: files changed, remaining MVC-violation count, remaining
  un-repositoried raw-SQL count, remaining admin modules beyond 13
  (should be zero unless explicitly confirmed).
- Confirm `composer install` and, if schema changed, the migration
  runner both succeed.

## Mode-specific notes

**Init** — audit step is replaced by the Step 0 question (HTMX toggle) in
`SKILL.md`; everything else still applies once files start being
generated. Login, the example Pages CRUD, and all reachable admin
modules must actually work end to end before `init` is considered done.

**Convert** — audit the *source* CMS/site first. Map its existing content
model onto the target `store`/`admin` shape before assuming a clean fit —
a content type that doesn't map cleanly onto Pages/Posts is a flag for
the user, not a silent extra admin module.

**Improve** — audit is the primary deliverable if the user just wants a
report; only move to execute once they confirm which findings to act on.
Even for an audit-only request, always check for MVC violations and
unguarded admin routes — those findings don't wait for the user to ask.

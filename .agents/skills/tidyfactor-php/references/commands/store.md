# Command: `store` — Repository & Migration Discipline

## Purpose
Enforce the "Repository = database access only" MVC rule: every table
has a migration, every piece of data access goes through a Repository
using Medoo, and nothing above the Repository layer (Controller, Service,
View) ever touches the database directly.

## When to run it
- The audit finds a Medoo call inside a Controller/Service/View, a table
  with no corresponding migration, or data-access logic duplicated
  across multiple Repositories instead of shared.
- The user says "clean up my database layer", "add a migration for X",
  or runs `store`.
- Runs after `logic` (needs the DB connection resolved via config/DI) and
  before `compo`/`route`/`pages`/`themes`/`plugins`/`admin` — they all
  consume Repositories.

## What it does
1. **Migrations** (`database/migrations/`) — one file per schema change,
   timestamped, with an `up()`/`down()` pair; never a hand-edited schema
   with no migration record.
2. **Seeds** (`database/seeds/`) — reproducible sample/reference data
   (an admin user, default settings rows) — never required for the app
   to run, always optional/idempotent.
3. **Repositories** (`app/Repositories/`) — one per aggregate/table
   (`PageRepository`, `UserRepository`), each wrapping Medoo calls behind
   named methods (`findBySlug()`, `paginate()`, `create()`) — callers
   never see a raw Medoo query object.
4. Every Repository method uses Medoo's parameter binding — no string-
   concatenated SQL, matching `secure.md`'s SQL-injection rule; if this
   command finds a violation, fix it here rather than treating it as
   `secure`'s job to circle back to.
5. Shared query patterns (soft deletes, pagination, timestamps) live in
   the base `Repository` class from `init.md`, not copy-pasted per
   concrete Repository.
6. Services depend on Repository interfaces/classes via constructor
   injection (per `logic.md`'s DI discipline) — a Service orchestrates
   business logic across one or more Repositories, never bypasses them.

## Output convention
```
database/{migrations,seeds}/
app/Repositories/{Page,User,...}Repository.php
app/Repositories/Repository.php    (shared base)
```

## Checklist
- [ ] Every table has a corresponding migration
- [ ] No Medoo call exists outside `app/Repositories/`
- [ ] Every query uses parameter binding, never string concatenation
- [ ] Shared query patterns live in the base Repository, not duplicated
- [ ] Every Service reaches the database only through an injected
      Repository

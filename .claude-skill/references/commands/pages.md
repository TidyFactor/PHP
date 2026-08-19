# Command: `pages` — MVC View Assembly & Layering Discipline

## Purpose
Keep the request lifecycle thin and correctly layered: Controller
receives the request and returns a view/redirect, Service holds the
business logic, Repository holds the data access, View renders — nothing
blurs across those lines. This is the one architectural rule the whole
project depends on to stay "modular" as it grows past `init.md`'s
single Pages example, enforced across every concrete feature (Pages,
Blog, Contact, etc.) as it's built or touched.

## When to run it
- The audit finds a Controller with business logic inline (calculating,
  branching on domain rules, formatting beyond simple view data prep), a
  View with a database call or a business-rule `if`, or a Service
  reaching into `$_POST`/`$_GET` directly instead of receiving validated
  input from the Controller.
- The user says "clean up this controller", "this view has too much
  logic", or runs `pages`.
- Runs after `compo`, `route`, and `store` — a page assembles components,
  is reached via a registered route, and reads/writes through a
  Repository.

## What it does
1. **Controller** (`app/Controllers/`) — receives the Flight request,
   validates input via `app/Validators/` (or delegates validation to the
   Service and just surfaces its errors — pick one convention per project
   and stay consistent), calls exactly one Service method for the
   action, then returns a Plates view render or a redirect. No loops over
   domain data, no direct Repository calls, no raw SQL.
2. **Service** (`app/Services/`) — the business logic: what "publishing a
   post" actually entails (slug generation, event dispatch, whatever
   domain rules apply), orchestrating one or more Repositories. A Service
   never touches Medoo directly and never reads `$_POST`/`$_GET` — it
   receives already-validated data as method arguments.
3. **Repository** (`app/Repositories/`, per `store.md`) — wraps exactly
   one Medoo table and exposes intention-revealing methods
   (`findPublished()`, not a raw `select` call leaked into a Service).
   No business logic lives here — a Repository doesn't decide *whether*
   to publish something, only *how* to fetch/persist it. Any Repository
   method found making that kind of decision moves the decision up into
   the Service that called it.
4. **View** (`resources/views/pages/`) — receives prepared data from the
   Controller, renders it via Plates using `compo`'s components/layouts.
   No SQL, no business-rule branching beyond simple presentational
   conditionals (show/hide based on a flag the Controller already
   computed).
5. Extract a feature's Controller/Service/Repository/View as one
   complete vertical slice at a time — don't half-migrate a feature and
   leave it split across old and new patterns. When splitting a
   violation apart, mirror `init.md`'s Pages example's naming and
   constructor-injection style exactly, so every module in the codebase
   reads as though it were written by the same discipline, not grown
   organically.
6. Dispatch relevant events from the Service layer at the point the
   domain action completes (`page.created`, `page.updated`,
   `page.deleted`) — see `events.md`.

## Output convention
```
app/Controllers/{Page,Blog,Contact,...}Controller.php
app/Services/{Page,Blog,...}Service.php
resources/views/pages/{home,about,blog,blog-single,404,search,contact}.php
```

## Checklist
- [ ] No business logic inside any Controller
- [ ] No direct database access inside any Controller, Service, or View
- [ ] No Repository method decides a business rule — it only
      fetches/persists, through intention-revealing method names
- [ ] No SQL or business-rule branching inside any View beyond simple
      presentational conditionals
- [ ] Each Controller action calls exactly one Service method for its
      core action
- [ ] Relevant domain events are dispatched from the Service layer at
      completion
- [ ] Feature migrations are complete vertical slices, not half-migrated

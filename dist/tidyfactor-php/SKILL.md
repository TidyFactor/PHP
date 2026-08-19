---
name: tidyfactor-php-mono
description: TidyFactor PHP Mono track — a WordPress-scale Modern Modular Monolith, classic server-side rendered PHP (Flight + Medoo + Plates), with a theme system, a WordPress-style auto-discovered plugin system, an event dispatcher, RBAC, and a locked 13-module admin panel (Dashboard, Pages, Posts, Media Library, Menus, Users, Roles, Permissions, Settings, Themes, Plugins, Logs, Profile). Explicitly not a REST API, not headless, not an SPA — the browser talks directly to PHP. Zero required JS build tooling at runtime, shared/cPanel-hosting friendly, Composer-based. Trigger on commands "init", "secure", "logic", "assets", "store", "compo", "route", "pages", "themes", "plugins", "events", "admin", "rbac", "media", "cache", "i18n", "logging", "seo", "deploy". Also trigger on "build a WordPress alternative", "scaffold a modular monolith in PHP", "give me a Flight+Medoo+Plates CMS", "add a plugin system", "add a theme system", "add roles and permissions", "audit this monolith for security", "clean up my controllers/repositories". Covers three modes — Init, Convert, Improve.
---

# TidyFactor PHP Mono (Modern Modular Monolith — Flight + Medoo + Plates)

Part of the TidyFactor skill library (see `references/tidyfactor-vision.md`
for the shared philosophy). This is the largest and most opinionated PHP
track in the family — the front-and-back-end sibling of
`tidyfactor-php-micro`, scaled from "small starter with an admin panel"
up to "WordPress-scale platform": a theme system, a WordPress-style
plugin system, an event dispatcher, RBAC, and a locked 13-module admin
panel. Still one project, still classic SSR, still no JavaScript
framework and no build step required to run it — the ambition here is
architectural (extensibility, modularity, growth without mess), not a
different rendering model.

## Core philosophy — read before touching anything

- **Not a Laravel clone. Not a headless CMS. Not API-first.** The browser
  talks directly to PHP: `Browser → Flight Router → Controller → Service
  → Repository → Medoo → MySQL → Plates View → HTML Response`. No REST
  API, no GraphQL, no SPA, no React/Vue/Inertia/Livewire — ever, on this
  track, without a scope-change conversation with the user first (see
  Hard Constraints).
- **Controllers never contain business logic.** Service = business logic
  only. Repository = database access only, exposed through
  intention-revealing methods, never business rules. Views = Plates
  only, no SQL, no business logic. This MVC discipline is enforced by
  every command that touches application code, not just `secure`/
  `store`/`pages` — see `pages.md` for the full audit.
- **Locked stack, not a menu.** PHP 8.4+, Flight PHP, Medoo, Plates,
  Tailwind CSS (precompiled static file, no server-side build step),
  Alpine.js, MySQL/MariaDB, session-based auth. This isn't re-litigated
  per project — it's what "PHP Mono" means, the same way
  `tidyfactor-php-micro` locked Flight+Medoo+Plates for its smaller
  scope.
- **Locked admin shape, extend only with confirmation.** Exactly 13
  modules: Dashboard, Pages, Posts, Media Library, Menus, Users, Roles,
  Permissions, Settings, Themes, Plugins, Logs, Profile. A 14th module,
  or removing one of these, is always a confirmed scope decision (see
  `admin.md`), never a silent default.
- **Architecture-ready, not pre-built.** Multi-language content,
  multi-site, multi-tenant, AI integrations, search indexing, background
  jobs, webhooks, an optional REST API, CLI commands, a scheduler, object
  storage, and CDN integration are explicitly **future extension
  points** — the event dispatcher and plugin system exist so these can
  be added later without breaking existing code, but none of them get
  built now. Building any of these prematurely is scope creep, not
  thoroughness — flag it and stop instead.

## Step 0 — Identify the mode and the one fork (always ask)

If not obvious from the request or the existing repo, ask once, briefly:

> "What are we doing?
> 1. **Init** — scaffold the full monolith from scratch: bootstrap, DI
>    container, event dispatcher, plugin loader, theme loader, auth,
>    an example CRUD (Pages), and the default theme — working end to end
> 2. **Convert** — bring an existing PHP site/CMS onto this architecture
> 3. **Improve** — audit and harden a project already on this stack"

Then — **always ask this explicitly, never assume a default** (an
existing repo may already show the answer):

- **HTMX progressive enhancement** — enabled or not. The stack allows it
  as an *optional* layer on top of server-rendered Plates views (partial-
  page swaps without a full SPA); Alpine.js is always present regardless
  for local UI reactivity (dropdowns, modals). This is a genuine
  architectural toggle — it changes how `compo`/`pages` structure
  partials, and what `assets.md` vendors — not a menu of unrelated
  frameworks, so it's asked, never silently assumed either way.

No stack question belongs here — the stack itself is locked; `init.md`
only needs project/DB name and admin credentials to proceed.

## Command Index

| Command | Purpose | Reference | Phase |
|---|---|---|---|
| `init` | **Primary deliverable** — full monolith skeleton, working end to end | `references/commands/init.md` | — |
| `secure` | Security Audit & Hardening — CSRF, sessions, prepared statements, headers | `references/commands/secure.md` | 1 |
| `assets` | Frontend Asset Hygiene — Tailwind/Alpine/htmx vendored, no CDN, no build step | `references/commands/assets.md` | 1 |
| `logic` | Central Configuration — `config/` + `.env`, DI container bindings | `references/commands/logic.md` | 2 |
| `store` | Repository & Migration Discipline — data access layer | `references/commands/store.md` | 2 |
| `compo` | Reusable Plates Components — buttons, cards, tables, modals | `references/commands/compo.md` | 2 |
| `route` | Feature-organized Routing & Middleware Pipeline — clean URLs, error pages | `references/commands/route.md` | 2 |
| `pages` | MVC View Assembly & Layering Discipline — thin controllers, Service/Repository composition | `references/commands/pages.md` | 2 |
| `themes` | Theme System — installable, swappable themes | `references/commands/themes.md` | 2 |
| `plugins` | Plugin System — WordPress-style auto-discovered plugins | `references/commands/plugins.md` | 2 |
| `events` | Event Dispatcher — core events, plugin subscriptions | `references/commands/events.md` | 2 |
| `admin` | The 13 fixed admin modules — extend, don't re-derive | `references/commands/admin.md` | 2 |
| `rbac` | Roles & Permissions enforcement | `references/commands/rbac.md` | 2 |
| `media` | Media Library — uploads, thumbnails, validation | `references/commands/media.md` | 2 |
| `cache` | File-based cache layer, extensible to Redis/Memcached | `references/commands/cache.md` | 2 |
| `i18n` | UI String Translation & RTL/LTR — admin + frontend chrome | `references/commands/i18n.md` | 3 |
| `logging` | Monolog — app/error/security channels feeding `admin`'s Logs module | `references/commands/logging.md` | 3 |
| `seo` | Frontend SEO — real SSR HTML, so this is the easy case | `references/commands/seo.md` | 4 |
| `deploy` | Shared-Hosting Launch Checklist | `references/commands/deploy.md` | 4 |

New commands follow `references/commands/_template.md`.

## Command Sequencing & Phases

`init` runs standalone and produces the whole working skeleton in one
pass — see Running a full mode below. For Convert/Improve:

1. **Phase 1 — Foundation & Security.** `secure` first, always — close
   CSRF/SQL-injection/XSS holes in whatever exists before restructuring
   on top of it. `assets` next — a clean, vendored, no-CDN asset base
   before any other command builds views on top of it.
2. **Phase 2 — Structure & Platform.** `logic` (config/DI) → `store`
   (repositories/migrations) → `compo` (reusable Plates components) →
   `route` (feature-organized routing + middleware + error pages) →
   `pages` (MVC composition and layering discipline) → `themes` →
   `plugins` → `events` (plugins need the dispatcher to subscribe to) →
   `admin` (the 13 modules, built on all of the above) → `rbac` (gates
   `admin` and any protected route) → `media` (Media Library module's
   storage) → `cache`. This order isn't arbitrary: `plugins` needs
   `events` conceptually ready even though `events` is listed after for
   build-order reasons — cross-reference both files rather than treating
   this as a strict linear dependency where it's genuinely circular
   (dispatcher and plugin loader are co-designed, see `events.md`).
3. **Phase 3 — Scale & Observability.** `i18n` and `logging` — both can
   run in either order relative to each other, but only after the
   admin/frontend surface from Phase 2 is stable.
4. **Phase 4 — Launch.** `seo` then `deploy`.

Never run two commands "at the same time" — each finishes, gets verified,
and gets reported before the next starts. If the repo isn't ready for a
requested command, say so and suggest the prerequisite instead of
forcing it through.

## Running a single command

1. Confirm mode and the HTMX fork — several commands' output shape
   depends on it.
2. Read the matching reference file in full before acting.
3. Do a scoped audit for just that command's concern.
4. Execute in small batches.
5. Report using that command's checklist.

## Running a full mode end-to-end

- **Init**: run `init` alone — it produces the full working skeleton
  (bootstrap through default theme) in one pass, per the Deliverables
  list in `init.md`.
- **Convert / Improve**: follow the Phase 1→4 order above in full.

Within each command, still follow the underlying audit → execute → verify
discipline in `references/workflow.md`.

## Hard constraints (apply to every command)

- Never introduce a REST API, GraphQL layer, SPA, or a JS framework
  (React, Vue, Inertia, Livewire) — the browser talks directly to PHP.
  If the user asks for one, say plainly that it's outside this track's
  architecture and confirm before doing anything that direction.
- Controllers never contain business logic; Services never touch the
  database directly; Repositories never decide business rules, only
  fetch/persist; Views never contain SQL or business logic — every
  command that generates or edits application code follows this MVC
  split without exception.
- All database access goes through Medoo inside a Repository — no raw
  SQL string-built queries anywhere, no query logic inside a Controller
  or View.
- No CDN `<script src>`/`<link>` for Tailwind, Alpine, or htmx — every
  frontend library is vendored and pinned, and Tailwind ships as one
  precompiled static file, never a runtime build step (shared/cPanel
  hosting can't run one).
- Never build a "future extensibility" item (multi-tenant, AI
  integration, search indexing, background jobs, webhooks, REST API,
  CLI, scheduler, object storage, CDN) proactively — these are
  architecture-ready via events/plugins, not pre-implemented. Flag and
  stop if a request drifts toward building one of these now.
- Never add a 14th admin module, or remove/replace one of the locked 13,
  without explicit user confirmation.
- All user input is validated and output is escaped by default in every
  Plates view — no raw `echo $userInput` without an explicit, justified
  exception (rare, and flagged when it happens).
- Plugins and themes are auto-discovered, never hardcoded into a
  registry the user has to maintain by hand — they extend through
  defined extension points only, never by modifying core files.
- No secret (DB credentials, API keys) committed — always via `.env`,
  never hardcoded into `config/`, a migration, a seed, or a plugin's
  `config.php`. The same rule applies to logs: never write a password,
  token, or full request body to `storage/logs/`, even at debug level.
- `secure` and `assets` always run first on Convert/Improve; `i18n` and
  `logging` run last, before `seo`/`deploy`.

## Two operating modes (execution style)

- **Mode A — do it directly.** Files are uploaded or accessible via
  `view`/`bash_tool`/`str_replace`/`create_file`. Run Step 0, then
  execute directly, running `composer install`/migrations after any
  dependency or schema change. For a full-mode workflow on a git repo,
  offer one commit per finished, reported command.
- **Mode B — generate a handoff prompt.** The user wants a copy-paste
  prompt for an external agent instead. Still run Step 0 first. Build it
  from the matching `references/commands/<name>.md` file(s).

## Related skills

- Small starter, single-admin, three fixed screens, no plugin/theme
  system, instead of this full platform → `tidyfactor-php-micro`.
- Bring-your-own PHP architecture, no locked stack, full manual control
  → `tidyfactor-php` (vanilla).
- The full htmx interaction-layer command set (fragments, hx-swap/
  trigger strategy, history) beyond this skill's "optional progressive
  enhancement" fork → `tidyfactor-htmx`, layered on top once htmx is
  actually adopted.
- Reactive client-side dashboard consuming a JSON API instead of SSR →
  `tidyfactor-js-micro` — but note that pairing changes this track's
  core philosophy (SSR, no API) and needs an explicit scope conversation,
  not a default assumption.
- Static content site, no backend at all → `tidyfactor-html`.

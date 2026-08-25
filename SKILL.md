---
name: tidyfactor-php
description: "TidyFactor PHP Mono track — Modern Server-Rendered PHP Modular Monolith (Flight + Medoo + Plates) with Contextual Decision Layer (CDL). Features WordPress-scale architecture, auto-discovered plugin hooks, dynamic theme system, RBAC, and 13 locked admin panel modules. Trigger on commands 'brief', 'init', 'admin', 'plugins', 'themes', 'events', 'rbac', 'secure', 'route', 'pages', 'media', 'cache', 'i18n', 'logging', 'seo', 'deploy', or requests like 'build a WordPress alternative in PHP', 'scaffold a modular monolith', 'Flight Medoo Plates CMS'. Anti-triggers: Do NOT use for SPA REST APIs or Next.js/React frontends."
---

# TidyFactor PHP (Modern Server-Rendered Modular Monolith)

A command dispatcher for full-stack server-rendered PHP monoliths. This router declares commands and workflows without performing execution directly.

## Commands

| User intent | Command | What it loads |
|---|---|---|
| Strategic Monolith Discovery & Brief Resolution | `references/commands/brief.md` | `references/workflows/brief.md` + `references/memory/decision-points.md` + `references/memory/quality-bar.md` |
| Primary deliverable — scaffold a new PHP monolith | `references/commands/init.md` | `references/workflows/init.md` + `references/memory/architecture.md` |
| Construct & protect the 13 locked admin panel modules | `references/commands/admin.md` | `references/workflows/admin.md` + `references/memory/architecture.md` |
| Auto-discovered plugin system & hook listeners | `references/commands/plugins.md` | `references/workflows/plugins.md` + `references/memory/quality-bar.md` |
| Dynamic theme system & template layout overrides | `references/commands/themes.md` | `references/workflows/themes.md` + `references/memory/architecture.md` |
| Global event dispatcher & lifecycle listeners | `references/commands/events.md` | `references/commands/events.md` + `references/memory/quality-bar.md` |
| Role-Based Access Control (RBAC) & permission guards | `references/commands/rbac.md` | `references/commands/rbac.md` + `references/memory/quality-bar.md` |
| Security hardening, CSRF tokens, XSS & SQLi shields | `references/commands/secure.md` | `references/commands/secure.md` + `references/memory/quality-bar.md` |
| Front controller routing (FlightPHP route patterns) | `references/commands/route.md` | `references/commands/route.md` + `references/memory/architecture.md` |
| Content page controllers & Plates template views | `references/commands/pages.md` | `references/commands/pages.md` + `references/memory/architecture.md` |
| Media upload manager & image variant processing | `references/commands/media.md` | `references/commands/media.md` + `references/memory/quality-bar.md` |
| Multi-driver caching (file, Redis, APCu) | `references/commands/cache.md` | `references/commands/cache.md` + `references/memory/quality-bar.md` |
| Multilingual translation dictionary & RTL views | `references/commands/i18n.md` | `references/commands/i18n.md` + `references/memory/quality-bar.md` |
| Structured JSON/text logging & audit trails | `references/commands/logging.md` | `references/commands/logging.md` + `references/memory/quality-bar.md` |
| SEO metadata, OpenGraph tags, sitemap generation | `references/commands/seo.md` | `references/commands/seo.md` + `references/memory/quality-bar.md` |
| Medoo database repository queries & migrations | `references/commands/store.md` | `references/commands/store.md` + `references/memory/decision-points.md` |
| Business domain services & dependency injection | `references/commands/logic.md` | `references/commands/logic.md` + `references/memory/architecture.md` |
| Reusable view components & UI macros | `references/commands/compo.md` | `references/commands/compo.md` + `references/memory/architecture.md` |
| Asset pipeline, cache busting, and minification | `references/commands/assets.md` | `references/commands/assets.md` + `references/memory/quality-bar.md` |
| Prepare shared/cPanel hosting deployment & .htaccess | `references/commands/deploy.md` | `references/commands/deploy.md` + `references/memory/quality-bar.md` |

Read only the command file that matches the request. Do not load all commands simultaneously.

## Non-Negotiable Invariants

1. **Contextual Decision Layer (CDL)**: Resolve monolith baselines via `/brief` or `.tidyfactor/php-brief.md` before emitting code.
2. **Server-Side Rendered PHP**: Browser communicates directly with PHP. No SPA or headless React layers.
3. **Medoo Prepared Statements**: Never concatenate SQL queries directly. Use Medoo parameterized bindings.
4. **Strict Types & PSR-12**: Every PHP file must declare `declare(strict_types=1);` with explicit typing.
5. **7-Axis Pre-Emit Critique**: All generated code must be evaluated with `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`.

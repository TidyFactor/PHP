# TidyFactor — Shared Philosophy (all tracks)

Condensed from the ecosystem VISION.md. Every TidyFactor skill — this one
included — should be judged against this before adding any feature.

## Design tenets
- Simple before clever.
- Explicit before implicit.
- Structured before generated.
- Portable before proprietary.
- Content before presentation.
- Standards before conventions.
- Small before bloated.
- AI-native before AI-powered.

## The TidyFactor Test
Before adding anything to a project or to this skill, ask:
- Is it simpler?
- Is it more maintainable?
- Does it improve interoperability?
- Does it reduce lock-in?
- Is it AI-native (structured, machine-readable, portable)?
- Can it survive future technology changes?
- Would we still choose this approach five years from now?

## What this means concretely for the PHP Mono track
- **Structure over complexity**: WordPress-scale ambition doesn't mean
  WordPress-scale mess. The plugin/theme/event system exists specifically
  so complexity is *organized* (a plugin's code lives in one predictable
  place, discoverable without reading the whole codebase), not so more
  features can be piled in.
- **Evolution over replacement**: the entire "architecture-ready, not
  pre-built" rule for future extensions (multi-tenant, AI, search, jobs,
  webhooks, a REST API, CLI, scheduler, object storage, CDN) is this
  tenet in practice — the event dispatcher and plugin hooks are how the
  platform survives requirements nobody's asked for yet, without
  speculative code sitting unused today.
- **Open by design**: MySQL/MariaDB via Medoo, Composer, `.env`
  configuration — every piece is a portable, well-understood standard.
  Nothing here traps a project's data or code inside a proprietary format.
- **Standards before conventions**: PSR-12, strict typing, SOLID where it
  earns its keep — but "avoid unnecessary abstractions" is in the source
  brief for a reason; a three-layer interface for a class with one
  implementation is complexity, not architecture.
- **Content before presentation**: Pages/Posts/Media are modeled as
  structured data behind Repositories first — the default theme is one
  consumer of that data, not the data's home. A theme swap should never
  require touching the content layer.
- **Human first**: session-based auth, server-rendered HTML, and Alpine
  for local interactivity are chosen because they stay legible without a
  build pipeline or a client-side framework's mental model — anyone who
  knows PHP can read this codebase.
- **AI-native**: the locked layered shape means an AI agent opening any
  module — core, theme, or plugin — already knows where the Controller,
  Service, Repository, and View live, without re-deriving the
  architecture from scratch each time. Growth in scope (more admin
  modules, more plugins, more themes) is not growth in complexity,
  because every new piece follows the same shape `pages.md` enforces.

## Relationship to Alwkala
TidyFactor is stewarded by Alwkala (alwkala.com) — expertise,
implementation, consulting, education, and long-term support around the
open TidyFactor ecosystem.

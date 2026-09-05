<div align="center">

# 🐘 TidyFactor PHP `v1.2.0`
### Modern Modular Monolith, Component UI & Locked 13-Module Platform Engine

**The official modern PHP 8.x architecture track within the TidyFactor Ecosystem.**

[![npm version](https://img.shields.io/npm/v/@tidyfactor/php.svg?style=for-the-badge&color=777BB4)](https://www.npmjs.com/package/@tidyfactor/php)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)](LICENSE)
[![RTL Ready](https://img.shields.io/badge/RTL-Native%20Arabic-emerald.svg?style=for-the-badge)](README.ar.md)
[![PHP 8.4+](https://img.shields.io/badge/PHP-8.4%2B%20SSR-8892BF.svg?style=for-the-badge)](https://php.net)

[🚀 Quick Start](#-quick-start) • [⚡ 15 Commands](#-command-set) • [🏛️ Ecosystem](#%EF%B8%8F-tidyfactor-ecosystem-architecture) • [📖 بالعربية](README.ar.md)

<br/><br/>

<p align="center">
  <img src="assets/hero-banner.png" alt="TidyFactor PHP Hero Banner" width="100%" />
</p>

</div>

---

Part of the TidyFactor ecosystem. The larger sibling of
`tidyfactor-php-micro` — same locked-stack philosophy, scaled from "small
starter with an admin panel" up to "extensible platform" — and this is
the largest, most opinionated PHP track in the family.

## Not a Laravel clone. Not headless. Not API-first.
The browser talks directly to PHP:
`Browser → Flight Router → Controller → Service → Repository → Medoo →
MySQL → Plates View → HTML Response`. No REST API, no GraphQL, no SPA, no
React/Vue/Inertia/Livewire.

## What's locked vs. what's extensible
- **Locked stack**: PHP 8.4+, Flight, Medoo, Plates, Tailwind CSS
  (precompiled static file, zero server-side build step), Alpine.js,
  MySQL/MariaDB, session-based auth — every frontend library vendored
  and pinned, never CDN-loaded.
- **Locked admin shape**: exactly 13 modules — Dashboard, Pages, Posts,
  Media Library, Menus, Users, Roles, Permissions, Settings, Themes,
  Plugins, Logs, Profile. Extending past 13 is always a confirmed
  decision, never a silent default.
- **A real, always-asked fork**: HTMX progressive enhancement, on or off.
- **Architecture-ready, not pre-built**: multi-language content,
  multi-site, multi-tenant, AI integrations, search indexing, background
  jobs, webhooks, an optional REST API, CLI commands, a scheduler, object
  storage, and CDN integration are future extension points via the
  event/plugin system — not implemented now.

## Three lifecycle modes
- **Init** — scaffold the full monolith: bootstrap, DI container, event
  dispatcher, plugin loader, theme loader, auth, an example CRUD (Pages),
  and the default theme, working end to end.
- **Convert** — bring an existing PHP site/CMS onto this architecture.
- **Improve** — audit and harden a project already on this stack.

## Command set
`init` · `secure` · `assets` · `logic` · `store` · `compo` · `route` ·
`pages` · `themes` · `plugins` · `events` · `admin` · `rbac` · `media` ·
`cache` · `i18n` · `logging` · `seo` · `deploy` — see `SKILL.md` for the
full sequencing and each command's reference file under
`references/commands/`.

## Related skills
Part of the TidyFactor skill library — see `tidyfactor-php-micro` (a
much smaller, fixed-scope starter), `tidyfactor-php` (vanilla,
bring-your-own architecture), `tidyfactor-html` (no backend), and
`tidyfactor-htmx` (the full hypermedia-interaction layer, layered on top
once htmx is actually adopted beyond this skill's optional fork).

## Developer
Built and maintained by **alwkala** — github.com/alwkala

## License
Licensed under the Apache License 2.0.


---

## 🚀 Installation & Quick Start

Choose your preferred installation method:

### Option A: Via TidyFactor CLI (Recommended)
Install directly using the official ecosystem package runner into your active workspace:
```bash
npx @tidyfactor/cli add php
```
*Or if you have the CLI installed globally (`npm i -g @tidyfactor/cli`):*
```bash
tidyfactor add php
```

### Option B: Via Open Agent Skills Ecosystem (skills.sh / Vercel Labs)
Install using the universal multi-agent standard across all supported IDEs (Cursor, Antigravity, Claude Code, Windsurf, Trae, Codex):
```bash
npx skills add tidyfactor/php
```

### Option C: Standalone Zero-Dependency Runner (NPM Direct)
Run the dedicated skill installer directly with automatic cache invalidation:
```bash
npx @tidyfactor/php@latest
```

---

## 🏛️ TidyFactor Ecosystem Architecture

**TidyFactor** is a modular web architecture and AI coding agent skill ecosystem built on clear separation of concerns across the product lifecycle:

```
TidyFactor Organization (github.com/TidyFactor)
│
├── Design Skills
│   ├── Cinematic    → Experience / "Wow"     (Apple × Cartier Scroll-Driven Landing Pages)
│   ├── Design       → Prototype / "Build"    (Code-Native UI Design Engine & Figma Alternative)
│   └── Styler       → Production / "Ship"    (Framework Styler & RTL Polish Engine)
│
├── Development Skills
│   ├── HTML         → Content & Static       (Semantic SEO & Static Platform Starter)
│   ├── HTMX         → Hypermedia             (Server-Driven Micro-Interactions)
│   ├── JS           → Vanilla SPA            (Framework-Free Reactive ES Modules)
│   ├── PHP          → Server-Rendered        (Modern PHP 8.x Component UI & Architecture)
│   └── Next         → Multi-Tenant SaaS      (Next.js 16, React 19, Supabase RLS & Dev-Perf)
│
└── Growth Skills
    └── Marketing    → Growth / Revenue       (Direct Response, Pillar SEO & Content Lifecycles)
```

### 💎 Frontend Triad

```
                TidyFactor
                    │
          ┌─────────┼─────────┐
          │         │         │
      Cinematic   Design    Styler
          │         │         │
      Experience Prototype Production
          │         │         │
       "Wow"      "Build"   "Ship"
```

### 📦 Community Package & Skill Parity

| Track | Category | GitHub Repository | Agent Skill | NPM Package |
| :--- | :--- | :--- | :--- | :--- |
| **Cinematic** | Design | [`TidyFactor/Cinematic`](https://github.com/TidyFactor/Cinematic) | `tidyfactor-cinematic` | [`@tidyfactor/cinematic`](https://www.npmjs.com/package/@tidyfactor/cinematic) |
| **Design** | Design | [`TidyFactor/Design`](https://github.com/TidyFactor/Design) | `tidyfactor-design` | [`@tidyfactor/design`](https://www.npmjs.com/package/@tidyfactor/design) |
| **Styler** | Design | [`TidyFactor/Styler`](https://github.com/TidyFactor/Styler) | `tidyfactor-styler` | [`@tidyfactor/styler`](https://www.npmjs.com/package/@tidyfactor/styler) |
| **Next** | Development | [`TidyFactor/Next`](https://github.com/TidyFactor/Next) | `tidyfactor-next` | [`@tidyfactor/next`](https://www.npmjs.com/package/@tidyfactor/next) |
| **HTML** | Development | [`TidyFactor/HTML`](https://github.com/TidyFactor/HTML) | `tidyfactor-html` | [`@tidyfactor/html`](https://www.npmjs.com/package/@tidyfactor/html) |
| **HTMX** | Development | [`TidyFactor/HTMX`](https://github.com/TidyFactor/HTMX) | `tidyfactor-htmx` | [`@tidyfactor/htmx`](https://www.npmjs.com/package/@tidyfactor/htmx) |
| **JS** | Development | [`TidyFactor/JS`](https://github.com/TidyFactor/JS) | `tidyfactor-js` | [`@tidyfactor/js`](https://www.npmjs.com/package/@tidyfactor/js) |
| **PHP** | Development | [`TidyFactor/PHP`](https://github.com/TidyFactor/PHP) | `tidyfactor-php` | [`@tidyfactor/php`](https://www.npmjs.com/package/@tidyfactor/php) |
| **Marketing** | Growth | [`TidyFactor/Marketing`](https://github.com/TidyFactor/Marketing) | `tidyfactor-marketing` | [`@tidyfactor/marketing`](https://www.npmjs.com/package/@tidyfactor/marketing) |

---

## 👨‍💻 Organization & Support

- 🌐 **Official Website:** [https://tidyfactor.com/](https://tidyfactor.com/)
- 📚 **Official Documentation:** [https://tidyfactor.com/documentation](https://tidyfactor.com/documentation)
- 🤝 **Official Partner Website:** [Alwkala Digital Agency](https://alwkala.com/)
- 🐙 **GitHub Organization:** [github.com/TidyFactor](https://github.com/TidyFactor)
- 📧 **Business Inquiries:** [hello@tidyfactor.com](mailto:hello@tidyfactor.com)
- 📱 **WhatsApp:** [+20 101 665 6899](https://wa.me/201016656899)
- 📞 **Phone:** +20 101 665 6899
- 📍 **Location:** Cairo, Egypt

---

## 📜 License

Licensed under the **Apache License 2.0**. Copyright (c) 2026 [TidyFactor](https://tidyfactor.com) & [Alwkala](https://alwkala.com).

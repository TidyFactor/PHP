# Memory: decision-points (Contextual Decision Layer — CDL v1.0)

A thin arbitration protocol for resolving PHP Modular Monolith architecture, storage engines, and authentication before code emission.

---

## 🏛️ Decision Matrix (P1–P5)

| Code | Decision Dimension | Options (Reference SSOT) | Default Fallback | Trigger / Ambiguity Condition |
|:---:|---|---|---|---|
| **P1** | **Framework Architecture** | • `flight-medoo-plates` (Standard TidyFactor PHP Monolith)<br>• `flight-medoo-latte` (Latte template engine variant)<br>• `vanilla-monolith` (Zero-dependency pure PHP 8.x monolith) | `flight-medoo-plates` | When scaffolding or architecting PHP server applications. |
| **P2** | **Database Storage Engine** | • `sqlite` (`storage/database.sqlite` — zero setup, portable)<br>• `mysql-mariadb` (MariaDB 10.11+ / MySQL 8.x connection) | `sqlite` | When initializing storage layer without credentials. |
| **P3** | **Admin Panel Scope** | • `full-13-modules` (Dashboard, Pages, Posts, Media, Menus, Users, Roles, Permissions, Settings, Themes, Plugins, Logs, Profile)<br>• `custom-admin-subset` (Selected administrative panels) | `full-13-modules` | When building CMS or back-office administration interfaces. |
| **P4** | **Extensibility Engine** | • `themes-and-plugins` (WordPress-style auto-discovery hook system)<br>• `static-mvc` (Simple Controller-Model architecture without dynamic hooks) | `themes-and-plugins` | When prompt asks for extensible modular architecture. |
| **P5** | **Output Scope & Depth** | • `single-controller-feature` (One controller, repository, and view)<br>• `complete-modular-cms` (Complete runnable CMS application) | `single-controller-feature` | When user request does not specify complete monolith scaffold. |

---

## ⚡ Boolean Skip Conditions (Deterministic Bypass)

Skip interactive elicitation and proceed silently when ANY of the following are true:
1. **Cached Brief Exists**: `.tidyfactor/php-brief.md` exists.
2. **Explicit User Declaration**: Prompt explicitly declares stack and database (e.g. `"Build a Flight+Medoo+Plates monolith with SQLite and 13 admin modules"`).
3. **Direct Command Invocation**: User invokes explicit commands (`/admin`, `/plugins`, `/themes`, `/rbac`, `/secure`).

---

## 💾 Brief Persistence Protocol

When `/brief` runs, save confirmed decisions to `.tidyfactor/php-brief.md`:
```markdown
# PHP Modular Monolith Brief
- Architecture: [flight-medoo-plates | flight-medoo-latte | vanilla-monolith]
- Database Engine: [sqlite | mysql-mariadb]
- Admin Panel Scope: [full-13-modules | custom-admin-subset]
- Extensibility: [themes-and-plugins | static-mvc]
- Scope Depth: [single-controller-feature | complete-modular-cms]
- Confirmed At: YYYY-MM-DD
```

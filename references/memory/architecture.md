# Memory: architecture (PHP Monolith Directory Structure & Locked Modules)

Defines directory layout and architecture of the TidyFactor PHP Modular Monolith.

---

## 📁 Standard Monolith Layout

```
monolith-root/
├── app/
│   ├── Controllers/             # Route Controllers
│   ├── Repositories/           # Medoo Data Repositories
│   ├── Middleware/             # Auth, CSRF, RBAC Middleware
│   ├── Services/               # Domain Business Logic
│   └── Helpers/                # Formatting & Utilities
├── config/
│   ├── app.php                 # App settings
│   └── database.php            # Database connections (SQLite / MySQL)
├── database/
│   ├── migrations/             # Schema migrations
│   └── seeds/                  # Default roles & admin user seed
├── plugins/                    # Auto-discovered WordPress-style plugins
├── public/                     # Document root
│   ├── index.php               # Front controller
│   └── assets/                 # CSS/JS/Images
├── storage/                    # Logs, cache, and SQLite database
├── themes/                     # Front-end active themes
└── views/
    ├── admin/                  # 13 Locked Admin Panel Views
    └── layouts/                # Base layouts
```

---

## 🏛️ The 13 Locked Admin Modules

1. **Dashboard** (`/admin/dashboard`)
2. **Pages** (`/admin/pages`)
3. **Posts** (`/admin/posts`)
4. **Media Library** (`/admin/media`)
5. **Menus** (`/admin/menus`)
6. **Users** (`/admin/users`)
7. **Roles** (`/admin/roles`)
8. **Permissions** (`/admin/permissions`)
9. **Settings** (`/admin/settings`)
10. **Themes** (`/admin/themes`)
11. **Plugins** (`/admin/plugins`)
12. **Logs** (`/admin/logs`)
13. **Profile** (`/admin/profile`)

# Memory: quality-bar (PHP Modular Monolith Anti-Slop & Quality Gate)

Enforces modern PHP 8.2+ strict typing, PSR-12 formatting, Medoo prepared statement security, and zero hardcoded credentials.

---

## 🛡️ 7-Axis Pre-Emit Self-Critique Stamp

Every generated PHP controller, repository, view, or migration must be stamped:
`/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`

| Axis | Dimension | Score 1 (Slop / Reject) | Score 5 (Production Pass) |
|:---:|---|---|---|
| **P** | **Philosophy & Architecture Purity** | Messy spaghetti code mixing SQL directly in HTML views. | Clean MVC separation (Flight route -> Controller -> Medoo Repository -> Plates View). |
| **H** | **Hardening & Security Invariants** | Unsanitized `$_POST`/`$_GET` injection; raw SQL concatenation. | Prepared statements via Medoo; CSRF tokens; `htmlspecialchars()` on output. |
| **E** | **Extensibility & Hooks** | Direct modification of core files to add features. | Extension via EventDispatcher (`App::on('event', ...)`) and Plugin hooks. |
| **S** | **Strict Typing & PSR-12** | Missing `declare(strict_types=1);` and loose PHP 5.x types. | Strict types declared on every file with explicit parameter and return types. |
| **R** | **RBAC & Authorization Guard** | Unprotected admin routes allowing unauthorized access. | Role-Based Access Control middleware (`AuthMiddleware::check('manage_users')`). |
| **V** | **Velocity & Performance** | Uncached database queries in loops (N+1 query problem). | Eager query fetching, file-based OPcache friendliness, asset minification. |
| **D** | **Decision Alignment** | Inconsistent storage or auth ignoring `.tidyfactor/php-brief.md`. | 100% compliant with confirmed Database Engine and Admin module scope. |

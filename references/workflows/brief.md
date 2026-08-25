# Workflow: brief

Discovers and records core PHP Monolith baselines (Architecture, Database Engine, Admin Modules, Plugin System) using CDL.

---

## Steps

1. **Check Existing State**:
   - Inspect `.tidyfactor/php-brief.md` and `composer.json` for existing configurations.

2. **Conduct Structured Discovery (Max 3 Questions)**:
   - If not specified, ask:
     1. **Architecture (P1)**: Flight+Medoo+Plates or Vanilla PHP monolith?
     2. **Database Engine (P2)**: SQLite (zero-config file) or MySQL/MariaDB?
     3. **Admin Scope (P3)**: Full 13 modules or customized subset?

3. **Record Decisions**:
   - Save `.tidyfactor/php-brief.md` with confirmed parameters.

4. **Report Summary**:
   - Confirm baseline parameters and prompt user to invoke `/init` or `/admin`.

---

## Validation checklist

- [ ] `.tidyfactor/php-brief.md` exists and contains confirmed values for P1–P5.
- [ ] No more than 3 questions were asked in a single round.
- [ ] Monolith baseline conforms to `references/memory/quality-bar.md`.

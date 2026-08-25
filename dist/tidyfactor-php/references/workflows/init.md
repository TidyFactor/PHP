# Workflow: init

Scaffolds a Flight+Medoo+Plates PHP Modular Monolith with clean directory layout and SQLite storage.

---

## Steps

0. **Step 0: CDL Resolution & Brief Check**:
   - Check `.tidyfactor/php-brief.md`. If missing, apply default `flight-medoo-plates` and `sqlite`.

1. **Scaffold Directory Tree & Composer**:
   - Create `app/`, `config/`, `database/`, `plugins/`, `public/index.php`, `storage/`, `themes/`, `views/`.
   - Setup `composer.json` with `flightphp/core`, `catfan/medoo`, `league/plates`.

2. **Initialize Database & Seed Roles**:
   - Run migrations and seed administrator account.

3. **Pre-Emit Self-Critique**:
   - `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`

---

## Validation checklist

- [ ] Directory structure conforms to standard layout.
- [ ] Database connection initialized with prepared statement bindings.
- [ ] Strict types declared on all PHP files.
- [ ] Pre-emit critique stamp included.

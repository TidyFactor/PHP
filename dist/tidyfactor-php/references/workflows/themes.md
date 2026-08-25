# Workflow: themes

Builds front-end themes with independent Plates template overrides and asset bundles.

---

## Steps

1. **Theme Directory**:
   - Create theme in `themes/<theme-name>/` with `theme.json` and `views/` directory.

2. **Activate Theme**:
   - Set active theme in `config/app.php` or through the admin `/admin/themes` module.

3. **Pre-Emit Self-Critique**:
   - `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`

---

## Validation checklist

- [ ] Theme views override default layouts properly.
- [ ] Theme assets resolved with cache busting.
- [ ] Pre-emit critique stamp included.

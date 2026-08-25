# Workflow: admin

Constructs and registers the 13 locked administrative modules with RBAC protection.

---

## Steps

1. **Admin Controllers & Routes**:
   - Create Admin controllers in `app/Controllers/Admin/` extending `BaseAdminController`.

2. **Plates Admin Views**:
   - Create view templates in `views/admin/` with sidebar navigation matching the 13 modules.

3. **Pre-Emit Self-Critique**:
   - `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`

---

## Validation checklist

- [ ] All admin routes protected by `AuthMiddleware` and RBAC permission checks.
- [ ] Sidebar renders active state for current admin module.
- [ ] Pre-emit critique stamp included.

# Workflow: plugins

Scaffolds auto-discovered WordPress-style plugins hooked into the EventDispatcher.

---

## Steps

1. **Plugin Definition**:
   - Create folder in `plugins/<plugin-name>/` with `plugin.json` declaring name, version, and entry point `Plugin.php`.

2. **Hook Registration**:
   - Register event listeners in `Plugin::boot()` using `App::on('event_name', $callback)`.

3. **Pre-Emit Self-Critique**:
   - `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`

---

## Validation checklist

- [ ] Plugin discovered automatically by `PluginManager`.
- [ ] `plugin.json` metadata valid.
- [ ] Pre-emit critique stamp included.

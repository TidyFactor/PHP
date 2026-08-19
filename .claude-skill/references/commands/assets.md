# Command: `assets` — Frontend Asset Hygiene

## Purpose
Keep CSS/JS organized and locally vendored with zero required
JavaScript build tooling at runtime — Tailwind ships precompiled, Alpine
and htmx (optional) are vendored like every other TidyFactor skill.

## When to run it
- The audit finds a `<script src="https://...">` CDN reference for
  Alpine/htmx, an uncompiled Tailwind config expected to build on the
  server, or CSS/JS scattered outside `public/assets/`.
- The user says "clean up my assets", "remove the CDN dependency", or
  runs `assets`.
- Runs early — right after `secure`, before `logic`/`store`/`compo`/`pages` build
  on top of it.

## What it does
1. **Tailwind**: precompiled once (locally, at development/deploy time)
   into a static `public/assets/css/app.css` — the shared/cPanel host
   never runs a build step. If Tailwind's config/build isn't already set
   up, scaffold it as a dev-only tool (documented in `README.md`) that
   produces this one static file; it is never a project runtime
   dependency.
2. **Alpine.js**: vendored into `public/assets/js/vendor/alpine.min.js`,
   pinned version, loaded once from the base layout — same no-CDN rule
   as `tidyfactor-htmx`'s `assets.md`.
3. **htmx** (optional progressive enhancement — the fork asked in
   `SKILL.md` Step 0): only vendored if the project's answer to that
   fork was "on". Defer to `tidyfactor-htmx` for the full
   interaction-layer command set once it's actually adopted; this
   command only ensures it's vendored, not CDN-loaded, consistent with
   every other asset here.
4. Theme-specific assets (`themes/<name>/assets/`) get published under
   `public/assets/themes/<name>/` per `themes.md` — never left reachable
   from outside `public/`.
5. Plugin assets (`plugins/<name>/assets/`) get published under
   `public/assets/plugins/<name>/` on activation, same rule.
6. Cache-busting via a single version value from `config/app.php`
   (`?v=<version>`) — one source of truth, consistent with the rest of
   the TidyFactor family.

## Output convention
```
public/assets/
  css/app.css                    (precompiled Tailwind)
  js/vendor/alpine.min.js
  js/vendor/htmx.min.js          (only if in use)
  themes/<name>/                  (published from themes.md)
  plugins/<name>/                 (published from plugins.md)
```

## Checklist
- [ ] Tailwind ships as one precompiled static file, no server-side
      build step required at runtime
- [ ] No CDN `<script src>` for Alpine or htmx remains
- [ ] Every vendored library is pinned and recorded (matches
      `tidyfactor-htmx`'s manifest convention if htmx is in use)
- [ ] Theme/plugin assets published only under `public/assets/`
- [ ] Cache-busting version driven from `config/app.php`, applied
      consistently

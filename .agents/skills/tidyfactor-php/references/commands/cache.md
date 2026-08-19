# Command: `cache` — File-based Cache Layer

## Purpose
A small, swappable caching abstraction — file-based by default (works
on any shared host with no extra service to install), with an interface
that lets Redis/Memcached be substituted later without touching call
sites.

## When to run it
- The audit finds an expensive, repeated computation or query with no
  caching (a Settings lookup hit on every request, a Menu structure
  rebuilt from the database on every page load).
- The user says "add caching", "this page is slow", or runs `cache`.
- Runs late in Phase 2, after the data it would cache (`store`, `themes`
  Settings, `admin` Menus) already exists — caching something that
  doesn't exist yet isn't meaningful.

## What it does
1. **Interface** (`app/Support/Cache/CacheInterface.php`) —
   `get(string $key)`, `set(string $key, mixed $value, int $ttl = null)`,
   `forget(string $key)`, `remember(string $key, int $ttl, callable
   $resolver)`. Every call site codes against this interface, never
   against the file-driver's specifics directly.
2. **File driver** (`app/Support/Cache/FileCache.php`) — serializes to
   `storage/cache/`, keyed by a hashed filename, respecting TTL on read
   (expired entries are treated as a miss, not returned stale).
3. Bound in the DI container (`logic.md`) as the `CacheInterface`
   implementation — swapping to a Redis driver later is a container
   binding change, not a call-site rewrite across the codebase.
4. Apply `remember()` around the clearest wins first: Settings lookups,
   Menu structure, rendered-but-rarely-changing partials (footer,
   navigation) — not blanket full-page caching, which would fight the
   admin's need to see changes reflected immediately.
5. **Cache invalidation**: relevant events (`page.updated`,
   `setting.updated` — dispatch this one if it doesn't exist yet) clear
   the specific cached key on the write path, via a listener
   (`app/Listeners/`) rather than the write code needing to know about
   caching directly — keeps the "who clears this cache" question
   answerable in one place (`events.md`'s listener list) instead of
   scattered `forget()` calls hand-added at every write site.
6. Never cache anything containing per-user or per-session data under a
   shared key — a caching bug that leaks one user's data to another is a
   security incident, not a performance bug; flag and stop rather than
   caching something ambiguous.

## Output convention
```
app/Support/Cache/{CacheInterface,FileCache}.php
app/Listeners/ClearCacheOn{Page,Setting}Updated.php
storage/cache/
```

## Checklist
- [ ] Every cache call site uses `CacheInterface`, never a driver-
      specific method directly
- [ ] TTL is respected on read — expired entries are misses, not stale
      hits
- [ ] Cache invalidation happens via an event listener on the relevant
      write path, not scattered ad hoc `forget()` calls
- [ ] Nothing per-user/per-session is cached under a shared key
- [ ] `storage/cache/` is writable and gitignored

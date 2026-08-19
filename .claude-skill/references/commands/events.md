# Command: `events` — Event Dispatcher

## Purpose
A simple pub/sub mechanism so core code and plugins can react to domain
occurrences without being directly coupled to each other — the
extension point that lets the "future extensibility" list (webhooks,
search indexing, background jobs) plug in later without editing the
Service that dispatches the event.

## When to run it
- The audit finds core code that would need direct modification to
  support a plugin reacting to something (a Service that would have to
  `if`-branch on "is the SEO plugin installed" instead of dispatching an
  event the SEO plugin can subscribe to).
- The user says "add an event system", "let plugins hook into X", or
  runs `events`.
- Co-designed with `plugins` (a plugin's main value is subscribing to
  events) — build both together where practical, even though `SKILL.md`
  lists them sequentially for reporting purposes.

## What it does
1. **Dispatcher** (`app/Support/EventDispatcher.php` or similar) — a
   minimal `listen(string $event, callable $listener)` /
   `dispatch(string $event, mixed $payload = null)` pair. Not a message
   queue, not async by default — synchronous in-process pub/sub is the
   ceiling here; if the project genuinely needs background/async
   processing, that's the (currently out-of-scope, future) job-queue
   extension point, not something `events` grows into silently.
2. **Core events**, dispatched from the Service layer at the point a
   domain action completes: `page.created`, `page.updated`,
   `page.deleted`, `user.login`, `user.logout`, `plugin.loaded` at
   minimum — extend this list only as real features (`admin.md`'s
   Posts/Media modules, etc.) are built, not speculatively.
3. **Listeners** (`app/Listeners/`) for core reactions (e.g. logging a
   security-relevant event) — one listener class per reaction, registered
   in bootstrap alongside plugin registration.
4. Plugins subscribe via their own `register()` call (see `plugins.md`)
   — the dispatcher doesn't know or care whether a listener came from
   core or a plugin.
5. Event payloads are simple, typed data (an array or a small DTO/value
   object) — never the full Eloquent-style model instance with lazy-
   loading behavior a listener might accidentally trigger side effects
   through.
6. Listener exceptions are caught and logged (via `cache`/logging setup
   from `init.md`) without aborting the triggering request — a broken
   listener shouldn't break page creation.

## Output convention
```
app/Support/EventDispatcher.php
app/Events/         (event name constants / payload shape docs)
app/Listeners/       (core listeners)
```

## Checklist
- [ ] Dispatcher stays synchronous, in-process — no async/queue behavior
      added without an explicit, confirmed scope change
- [ ] Every domain action that should be extensible dispatches its event
      from the Service layer, not the Controller
- [ ] Event payloads are simple typed data, not full lazy-loading models
- [ ] Listener exceptions are caught/logged, never allowed to abort the
      triggering request
- [ ] Plugins subscribe through the same dispatcher core code uses — no
      parallel mechanism

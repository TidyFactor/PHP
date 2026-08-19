# Command: `seo` — Frontend SEO (the easy case, because this is real SSR)

## Purpose
Unlike the client-rendered TidyFactor tracks (`tidyfactor-js`/`-js-
micro`), this track has no crawler-visibility problem to work around —
Plates renders real HTML on the server, so every crawler sees exactly
what a browser does. `seo` here is about doing the ordinary things well:
per-page metadata, a sitemap, and keeping the admin surface out of it.

## When to run it
- `pages`/`themes`/`admin` have finalized the route/content structure
  (Phase 4).
- User says "improve SEO", "add meta tags", "generate a sitemap", or
  runs `seo`.

## What it does
1. Every frontend page (`resources/views/pages/` and theme overrides)
   sets `<title>` and `<meta name="description">` from real content data
   (a Page/Post's own title/excerpt where data-driven, authored directly
   for static pages like Home/Contact) — passed from Controller to View,
   never guessed inside the View.
2. Open Graph/Twitter card tags per page, `og:image` pointing to a real
   Media Library asset (per `media.md`) where one exists.
3. `sitemap.xml`, generated from the actual Pages/Posts Repositories
   (real content, not a route-table guess like the SPA tracks need to
   do) — regenerated on a schedule or on `page.created`/`post.created`
   events (per `events.md`) rather than only manually.
4. `robots.txt` generated with the admin path prefix disallowed
   (`Disallow: /admin`), pointing to the sitemap.
5. Semantic HTML from `compo`'s components/layouts (proper heading
   hierarchy, `<nav>`/`<main>`/`<article>` landmarks) — SEO quality here
   is largely a byproduct of clean markup, not a separate metadata
   afterthought.
6. Bilingual mode: `hreflang` alternates only apply if genuine multi-
   language *content* exists — since that's explicitly future scope (see
   `i18n.md`), don't add `hreflang` for a UI-only translation that
   doesn't change the actual page content language.
7. Canonical URLs set explicitly, especially for any page reachable by
   more than one URL pattern (pagination, filtered listings).

## Output convention
```
sitemap.xml, robots.txt   (admin path disallowed)
Per page: <title>, meta description, og:*, twitter:*, canonical
```

## Checklist
- [ ] No two frontend pages share an identical `<title>`
- [ ] Every content-driven page's metadata comes from real Repository
      data, not hardcoded per template
- [ ] `sitemap.xml` reflects actual Pages/Posts, kept current via events
      or a scheduled regeneration, not only a one-time manual run
- [ ] `robots.txt` disallows the admin path and points to the sitemap
- [ ] Canonical URLs set on any page reachable via more than one URL
      pattern
- [ ] `hreflang` only added if genuine multi-language content exists, not
      for UI-only translation

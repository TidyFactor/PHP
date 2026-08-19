# Command: `media` — Media Library

## Purpose
Storage internals behind `admin`'s Media Library module: validated
uploads, organized directories, thumbnail generation — reusable from
anywhere content needs an attached image/document (Pages, Posts, Users'
avatars, plugin-uploaded assets), not reimplemented per feature.

## When to run it
- The audit finds file-upload handling duplicated per feature (a Pages
  image upload that doesn't go through the same validation/storage path
  as a Posts image upload), or uploads landing directly in `public/`
  without validation.
- The user says "add file uploads", "build the media library", or runs
  `media`.
- Runs after `store` (media records live in a Repository like anything
  else) and after `secure`'s upload-validation rules exist to build on.

## What it does
1. **Storage** (`storage/uploads/{year}/{month}/`) — organized by date to
   avoid one directory accumulating thousands of files; served through a
   Controller route that checks access rather than direct static serving
   from `public/`, unless the project explicitly wants public-by-default
   media (confirm which).
2. **Validation**, building on `secure.md`'s upload rules: allow-listed
   MIME types/extensions per accepted category (images: jpg/png/webp;
   documents: pdf at minimum), size limits, and — for images —
   re-encoding through PHP's GD/Imagick rather than trusting the
   uploaded bytes verbatim (strips embedded scripts/malformed metadata).
3. **Thumbnail generation** — on upload, generate standard sizes (e.g.
   thumbnail/medium/large) stored alongside the original, referenced by
   the media record so views pick the right size instead of shipping
   full-resolution images everywhere.
4. **Media record** (`media` table via `store.md`) — filename, path,
   MIME type, size, dimensions (for images), uploader, timestamps —
   a `MediaRepository` any feature queries/attaches through, never a
   direct filesystem scan.
5. **Attachment**: content (Pages/Posts/etc.) references media by ID
   through a join/foreign key, not a raw stored path string — swapping a
   featured image means changing one reference, not hunting down a
   hardcoded path.
6. `media.uploaded`/`media.deleted` events dispatched per `events.md`,
   so plugins (e.g. an eventual object-storage/CDN plugin — see Hard
   Constraints in `SKILL.md` on not building that now) can hook in later
   without changing this command's code.

## Output convention
```
storage/uploads/{year}/{month}/{original,thumbnail,medium,large}/
app/Repositories/MediaRepository.php
app/Services/MediaService.php   (validation + thumbnail orchestration)
database/migrations/  (media table)
```

## Checklist
- [ ] Every upload is validated by allow-listed MIME/extension and size
      limit, matching `secure.md`
- [ ] Images are re-encoded on upload, not stored as raw uploaded bytes
- [ ] Thumbnails are generated at upload time, not on every request
- [ ] Uploads are organized by date, not dumped into one flat directory
- [ ] Content attaches to media by ID/foreign key, never a raw hardcoded
      path string
- [ ] `media.uploaded`/`media.deleted` events dispatch on the relevant
      actions

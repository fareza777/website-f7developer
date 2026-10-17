# Operating F7 Discover

F7 Discover is static: JSON editions and licensed official images live in Git, Next.js exports pages, and the existing Git-connected Vercel project deploys them. No runtime scraper, database, Google Play API or paid backend is required. Cursor research uses the owner's existing plan/allowance; unlimited free agent usage is not promised.

## Files

- `content/discover/editions/YYYY-MM-DD.json`: immutable verified edition, Jakarta date.
- `content/discover/review.json`: append-only research queue, never imported by the frontend. This repository is public; include only public research.
- `public/images/discover/`: original official images. Use `asset.presentation: "contain"` for logos/small banners; `asset.noticePath` links a full local notice under `licenses/`.
- Complete schema: `docs/superpowers/specs/2026-10-10-f7-discover-design.md`; validation: `src/lib/discover-core.mjs`.
- Prompt: `CURSOR_AUTOMATION.md`; permitted research: `SOURCES.md`.

## Daily workflow

1. Start from current `main`, determine today in `Asia/Jakarta`, and stop as a no-op if its edition already exists. Do not fabricate history or open duplicate PRs.
2. Read identities across all prior editions and the review queue. Revisit incomplete candidates only when new evidence can settle their issue. Re-check every required field on the new discovery date.
3. Follow `SOURCES.md` limits. Aim for 7 indie games and 7 Android apps; publish fewer if necessary. Prefer developer-linked Google Play and clearly label alternatives. Existing products are `newly-discovered`; a first launch within 30 days requires primary `original-release` evidence.
4. Write up to 40 candidates to ignored `artifacts/discover/candidates.json`. Download only licensed original images, never APKs. Record actual image permission, source, visible credit and required full notices. Use `unknown` / `Check official site` when price is unestablished.
5. Publish through the command below, which checks evidence structure, image decoding, deduplication, history and quota; queues failures; refuses overwrites and empty editions.

```sh
npm ci
npm run discover:publish -- --date YYYY-MM-DD --input artifacts/discover/candidates.json
npm run discover:validate
npm test
npm run lint
NEXT_PUBLIC_SITE_URL=https://f7developer.com npm run build
npm run typecheck
npm run verify:export
```

Use your shell's environment syntax on Windows. Images are checked before applying the quota. The publisher retries concurrent writes briefly and re-reads history while locked. Different revisions of incomplete research are preserved.

6. Inspect the diff. Daily publication may only add today's edition, its official images/license notices, and preserve/append review records. Exclude unused downloads. Do not edit code, prior editions/images, studio products, workflows, domains or secrets during curation.
7. Open a same-repository PR to `main` titled `F7 Discover: YYYY-MM-DD — N games + N apps`, with actual counts, review count and validation. Use the existing owner/Cursor GitHub connection; no additional secret is required.
8. `discover-quality.yml` fetches the exact PR head as data and runs trusted code from `main`. It rejects broader changes and merges only the verified head. Fork PRs, other authors, old-edition changes, queue deletions, oversized updates or code changes cannot auto-publish.
9. Vercel deploys `main`. Check public `/discover/` and its dated edition before claiming live publication. A merge alone is not proof that deployment finished. Failures keep the previous live edition; report the concrete reason without bypassing checks or protection.

## Review and corrections

Review records are `{ candidate, queuedAt, reasons }`. Candidates may be incomplete and are never shown as verified entries. Preserve prior records in daily automation. A separately reviewed maintenance change can resolve/archive them; the daily path cannot delete them. Never publish uncertainty to empty the queue.

Historical corrections or artwork requests are separate reviewed changes with a reason and fresh evidence. Contact: `fajar.mreza@f7developer.com`.

## Recovery and performance

`.publish.lock` serializes writers. A crash may leave a lock; confirm no publisher is running before removing that single file. `.publish-journal.json` retains research across interrupted writes. Builds stop until another publisher run preserves unfinished candidates in review and clears the journal. No edition is overwritten. Do not commit locks, journals or temporary candidates.

Only the selected edition enters the client; archives/details are built on the server, and review data never enters the frontend. Search operates within that edition. Cards lazy-load media; original images are limited to 4 MB each and daily content PRs to 15 MB total.

# F7 Developer

The official F7 Developer studio website. Built around original games, Android apps, and web projects with a cinematic dark theme and English content.

Live website: [f7developer.com](https://f7developer.com/). The `www` address redirects to the main domain.

## Run locally

Use Node.js 22.13 or later.

```sh
npm ci
npm run dev
```

Development uses the Next.js port printed in the terminal (normally 3000).

To preview the static production build:

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4177. Set `PORT` to change the preview port.

## Pages and content

- Home, Games, Products, Studio, Updates, and Contact
- Five individual game pages and eight individual app pages
- Four release-note articles, website privacy, and a custom 404
- Search and category filters, direct category links, keyboard-friendly mobile navigation, and screenshot lightboxes
- F7 Discover with daily third-party games/apps, compound filters, dated archives, F7 Insights, source evidence and artwork acknowledgments

Product data and release notes are in `src/lib/data.ts`. Official product artwork and screenshots are stored locally in `public/images/products`. Asset source keys are documented in `scripts/asset-sources.json`; run `node scripts/import-assets.mjs` to refresh the official images.

The home and studio background is original AI-generated promotional concept art. It is not presented as a screenshot from any game. All product cards and screenshot galleries use official Google Play assets.

The catalogue was checked against [F7 Developer on Google Play](https://play.google.com/store/apps/dev?id=7590575640597683388) on October 10, 2026. The web projects are [Game Asset Radar](https://gameassetradar.top/) and [AI Radar](https://ai-radar-lilac.vercel.app/).

## F7 Discover

Verified editions live in `content/discover/editions`; incomplete research stays in `content/discover/review.json`, outside the frontend. No Google Play API, database or paid backend is used. The daily target is seven games and seven Android apps, with honest partial editions when verification is incomplete.

See [operations](docs/discover/OPERATIONS.md), [source access policy](docs/discover/SOURCES.md) and [Cursor automation instructions](docs/discover/CURSOR_AUTOMATION.md). Builds validate all content before exporting. Daily owner/Cursor content PRs are checked with trusted code before automatic publication; broader changes cannot use that route.

## Contact

The form prepares a `mailto:` draft. It does not submit, store, or send visitor messages. Visitors review and send the draft in their own email app. Support drafts use `fajar.mreza@gmail.com`; press and collaboration drafts use `founder@wawasanai.com`. Both addresses were verified on the public Google Play listing. Direct email links remain available if no email app is configured.

## Deployment

The build exports static HTML into `out/`. Deploy that folder to any static host, or import the repository into Vercel with the Next.js preset. No database or API secrets are required.

Set `NEXT_PUBLIC_SITE_URL=https://f7developer.com` before building. This is configured in Vercel's production and preview environments and documented in `.env.example`. It keeps canonical URLs, social previews, robots, and the sitemap on the official domain. If deploying to another host, set the same variable there. Redeploy after changing it because the metadata is generated at build time.

## Checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover desktop and mobile, all main routes, catalogue search and filters, navigation between filtered and complete catalogues, official store URLs, the screenshot viewer, keyboard navigation, email drafts, missing images, overflow, and WCAG A/AA accessibility through axe. Product catalogues are also checked with JavaScript disabled. Screenshots are saved in the ignored `artifacts/` directory.

Set `PLAYWRIGHT_BASE_URL` to a deployment's public URL to run the same browser checks against the deployed website without starting a local preview server.

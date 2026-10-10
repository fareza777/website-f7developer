# F7 Developer

The official F7 Developer studio website. Built around original games, Android apps, and web projects with a cinematic dark theme and English content.

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

Product data and release notes are in `src/lib/data.ts`. Official product artwork and screenshots are stored locally in `public/images/products`. Asset source keys are documented in `scripts/asset-sources.json`; run `node scripts/import-assets.mjs` to refresh the official images.

The home and studio background is original AI-generated promotional concept art. It is not presented as a screenshot from any game. All product cards and screenshot galleries use official Google Play assets.

The catalogue was checked against [F7 Developer on Google Play](https://play.google.com/store/apps/dev?id=7590575640597683388) on October 10, 2026. The web projects are [Game Asset Radar](https://gameassetradar.top/) and [AI Radar](https://ai-radar-lilac.vercel.app/).

## Contact

The form prepares a `mailto:` draft. It does not submit, store, or send visitor messages. Visitors review and send the draft in their own email app. Support drafts use `fajar.mreza@gmail.com`; press and collaboration drafts use `founder@wawasanai.com`. Both addresses were verified on the public Google Play listing. Direct email links remain available if no email app is configured.

## Deployment

The build exports static HTML into `out/`. Deploy that folder to any static host, or import the repository into Vercel with the Next.js preset. No database or API secrets are required.

Set `NEXT_PUBLIC_SITE_URL` to the real public origin before building on a host other than Vercel. Vercel's production origin is detected automatically. This configures canonical URLs, social previews, robots, and the sitemap. The production domain is intentionally not invented in source code.

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

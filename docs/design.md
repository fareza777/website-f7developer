# F7 Developer

Official English-language website for an independent game and software studio.
Games lead the homepage, followed by Android apps, web projects, the studio,
verified release notes, and contact. Real product names and facts come from
the public Google Play developer profile and individual listings.

## Direction

Charcoal and off-white with a single acid-lime accent. Archivo display type
and Geist body text. Cinematic original studio art; official Google Play
artwork for product cards and screenshot galleries. Restrained transitions,
visible keyboard focus, and reduced motion support. Angular buttons and
soft 8px media corners. Design variance 7, motion intensity 4, density 4.

## Implementation

Next.js App Router with static export. Home, Games, Products, Studio, Updates,
Contact, individual product pages, individual update pages, Privacy, and a
custom 404. Search and category controls run in small client components.
Contact composes an email in the visitor's email app and clearly describes
this behavior. No invented delivery confirmation or unconfigured backend.

## Verification

Production build, TypeScript, ESLint, catalogue and email encoding tests,
browser checks at desktop and mobile sizes, internal navigation, official
store destinations, image loading, keyboard interactions, and accessibility.

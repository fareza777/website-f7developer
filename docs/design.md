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

The home hero is the one deliberate exception: a living painting. A WebGL
layer over the static artwork adds depth parallax (pointer or device tilt),
drifting cloud light, falling water, a pulsing eclipse, valley mist, embers,
and a scroll-driven push toward the citadel. Motion stays slow and calm: one
sample of the painting per pixel (no blended copies) and no camera sway.
Reduced motion, missing WebGL, or a failed load leave the static artwork.
The depth map (`public/images/studio-world-depth.webp`) was generated from
`studio-world.webp` with Depth Anything V2 (Base), dilated 7px, and blurred;
regenerate it whenever the artwork changes.

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

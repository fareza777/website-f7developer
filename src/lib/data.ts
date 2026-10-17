export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: "Games" | "Apps";
  genre: string;
  packageId: string;
  description: string;
  story: string;
  features: string[];
  updated: string;
  screenshots: number;
};

export const developerUrl =
  "https://play.google.com/store/apps/dev?id=7590575640597683388";
export const supportEmail = "fajar.mreza@f7developer.com";
export const businessEmail = "founder@wawasanai.com";

export const founderSocialLinks = [
  { name: "X", href: "https://x.com/FReza1984" },
  { name: "Threads", href: "https://www.threads.com/@fajar_mreza" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/fajar-m-reza-b4b741321/",
  },
] as const;

export const products: Product[] = [
  {
    slug: "shardfall",
    name: "Shardfall",
    subtitle: "The Sundering TCG",
    category: "Games",
    genre: "Card strategy",
    packageId: "com.shardfall.shardfall",
    description:
      "Five Dominions. One fractured world. Build your deck and turn the tide of battle.",
    story:
      "Enter Aethyr, a dark fantasy world where every card changes the battlefield. Build a 40-card deck, discover the strengths of five rival Dominions, and take on a story campaign built for solo players. When you are ready, bring your strategy into online 1v1 battles.",
    features: [
      "A 100-battle campaign across five story chapters",
      "192 collectible cards and five distinct Dominions",
      "Arena drafts, daily Gauntlets, and tactical AI battles",
      "Optional online PvP and account-linked cloud saves",
    ],
    updated: "2026-10-07",
    screenshots: 3,
  },
  {
    slug: "aeonfall",
    name: "Aeonfall",
    subtitle: "Roguelike RPG",
    category: "Games",
    genre: "Roguelike RPG",
    packageId: "com.aeonfall.game",
    description:
      "The world is a story. Build your deck, defy the Author, and write your own ending.",
    story:
      "A dark fantasy roguelike where tactical card battles meet illustrated storytelling. Choose a Vessel, discover relics, and navigate three Acts of branching encounters. Your decisions shape the ending, while the Aeon Shards you earn help prepare your next attempt.",
    features: [
      "Six Vessels with distinct decks and signature moves",
      "Elemental reactions and turn-based card combat",
      "Branching paths, companions, and multiple endings",
      "Offline core gameplay and permanent progression",
    ],
    updated: "2026-10-07",
    screenshots: 3,
  },
  {
    slug: "shadow-depths",
    name: "Shadow Depths",
    subtitle: "Roguelike RPG",
    category: "Games",
    genre: "Roguelike RPG",
    packageId: "com.shadowdepths.game",
    description:
      "Venture deeper. Fight smarter. Discover what waits beneath the hundredth floor.",
    story:
      "Descend into a tactical, turn-based roguelike with 100 floors to explore. Build your character through loot and crafting, adapt to each encounter, and face the bosses standing between you and the depths.",
    features: [
      "100 floors of dungeon exploration",
      "Tactical turn-based encounters",
      "Loot, crafting, and character progression",
      "Boss battles that challenge your build",
    ],
    updated: "2026-10-06",
    screenshots: 3,
  },
  {
    slug: "potion-rogue",
    name: "Potion Rogue",
    subtitle: "Sort Puzzle RPG",
    category: "Games",
    genre: "Puzzle RPG",
    packageId: "com.farezagames.potionrogue",
    description:
      "A little alchemy. A lot of strategy. Sort your way through a roguelite adventure.",
    story:
      "Turn potion sorting into your next tactical move. Combine colorful potions, trigger alchemy reactions, and cast spells before the enemy acts. A puzzle-driven roguelite RPG where the right combination can change a fight.",
    features: [
      "Potion sorting meets RPG combat",
      "Alchemy reactions and spell combinations",
      "Skills with Mana costs and cooldowns",
      "Roguelite runs and monster encounters",
    ],
    updated: "2026-10-06",
    screenshots: 3,
  },
  {
    slug: "oathfire",
    name: "Oathfire",
    subtitle: "RPG: Chapter 1",
    category: "Games",
    genre: "Action RPG",
    packageId: "com.fajar.oathfire",
    description:
      "Keep the last hearth burning in a dark world of choices, crafting, and combat.",
    story:
      "Defend your last hearth in a dark isometric RPG. Make choices, craft what you need, and fight to keep the fire alive in the opening chapter of Oathfire.",
    features: [
      "Dark isometric exploration",
      "Choices that shape your journey",
      "Crafting and combat",
      "The opening chapter of the Oathfire story",
    ],
    updated: "2026-10-05",
    screenshots: 3,
  },
  {
    slug: "ai-work-studio",
    name: "AI Work Studio",
    subtitle: "Get Work Done",
    category: "Apps",
    genre: "Productivity",
    packageId: "app.promptlab.twa",
    description:
      "Turn photos, notes, PDFs, and files into work that is ready to use.",
    story:
      "Bring your everyday inputs into one workspace. AI Work Studio helps turn photos, notes, documents, spreadsheets, and URLs into practical outputs, from reports and meeting minutes to slide decks and diagrams.",
    features: [
      "Photos, notes, PDFs, spreadsheets, and URL inputs",
      "Reports, meeting minutes, slides, and diagrams",
      "OCR, reusable templates, and work history",
      "Export-ready results in one workspace",
    ],
    updated: "2026-09-23",
    screenshots: 2,
  },
  {
    slug: "carta",
    name: "CARTA",
    subtitle: "Map Art Studio",
    category: "Apps",
    genre: "Creative tools",
    packageId: "studio.carta.mapart",
    description:
      "Turn the places you love into city map posters, wallpapers, and route art.",
    story:
      "Make the places that matter part of your everyday surroundings. CARTA lets you design map posters, custom wallpapers, and route art inspired by your favorite cities and journeys.",
    features: [
      "City map poster design",
      "Custom map wallpapers",
      "Personal route art",
      "Creative projects inspired by real places",
    ],
    updated: "2026-09-30",
    screenshots: 2,
  },
  {
    slug: "wifi-heatmap",
    name: "WiFi Heatmap 3D",
    subtitle: "Signal Map",
    category: "Apps",
    genre: "Utilities",
    packageId: "com.f7developer.wifiheatmap3d",
    description:
      "See your Wi-Fi coverage in 3D and find the signal weak spots around you.",
    story:
      "Understand your network with a visual map of Wi-Fi coverage. Find weak spots, inspect channels, and test your connection with practical tools for your Android device.",
    features: [
      "3D Wi-Fi signal mapping",
      "Coverage and weak-spot discovery",
      "Channel analysis",
      "Network testing tools",
    ],
    updated: "2026-09-30",
    screenshots: 2,
  },
  {
    slug: "vocatim",
    name: "Vocatim",
    subtitle: "Private Voice To Text",
    category: "Apps",
    genre: "Productivity",
    packageId: "com.vocatim.app",
    description:
      "Capture the conversation. Turn audio into text, summaries, and useful exports.",
    story:
      "Move from spoken ideas to usable text. Vocatim supports online and offline transcription, with AI summaries and flexible export options for the way you work.",
    features: [
      "Audio-to-text transcription",
      "Online and offline options",
      "AI summaries",
      "Flexible text exports",
    ],
    updated: "2026-10-06",
    screenshots: 2,
  },
  {
    slug: "cleanly",
    name: "Cleanly",
    subtitle: "Cleaning Checklist",
    category: "Apps",
    genre: "Lifestyle",
    packageId: "id.arunika.arunika_growth",
    description:
      "A cleaner space, one small task at a time. Checklists that fit your day.",
    story:
      "Make home cleaning manageable with simple checklists and timers. Cleanly helps you choose tasks that fit the time you actually have.",
    features: [
      "Simple cleaning checklists",
      "Timers for focused sessions",
      "Tasks that fit your available time",
      "A practical everyday cleaning routine",
    ],
    updated: "2026-10-07",
    screenshots: 2,
  },
  {
    slug: "cutaway",
    name: "Cutaway",
    subtitle: "How Things Work 3D",
    category: "Apps",
    genre: "Education",
    packageId: "com.cutaway.explorer",
    description:
      "Look a little closer. Explore the inside of everyday objects in interactive 3D.",
    story:
      "Explore 3D models, look inside objects, and discover how their parts work together. Cutaway makes learning visual and lets you check your understanding with quizzes.",
    features: [
      "Interactive 3D models",
      "Inside views of everyday objects",
      "Visual explanations of how things work",
      "Quizzes to test your understanding",
    ],
    updated: "2026-10-06",
    screenshots: 2,
  },
  {
    slug: "english-fun",
    name: "English Fun",
    subtitle: "Learn English",
    category: "Apps",
    genre: "Education",
    packageId: "com.englishfun.english_fun",
    description:
      "Make learning English an adventure with games, phonics, and speaking practice.",
    story:
      "Help children discover English through playful activities. English Fun brings games, phonics, vocabulary, and speaking practice together in a learning experience designed for kids.",
    features: [
      "English learning games for children",
      "Phonics and vocabulary activities",
      "Speaking practice",
      "A playful approach to everyday learning",
    ],
    updated: "2026-09-07",
    screenshots: 2,
  },
  {
    slug: "prima-rawajati",
    name: "PRIMA Rawajati",
    subtitle: "Community Services",
    category: "Apps",
    genre: "Community",
    packageId: "id.rawajati.prima",
    description:
      "A practical connection to service information for the Rawajati community.",
    story:
      "Access resident service information for Rawajati from your Android device. PRIMA Rawajati brings useful community information into a dedicated mobile app.",
    features: [
      "Resident service information",
      "Built for the Rawajati community",
      "A dedicated Android experience",
      "Useful local information in one place",
    ],
    updated: "2026-08-07",
    screenshots: 2,
  },
];

export const games = products.filter((p) => p.category === "Games");
export const apps = products.filter((p) => p.category === "Apps");
export const productPath = (p: Product) =>
  `/${p.category === "Games" ? "games" : "products"}/${p.slug}/`;
export const playUrl = (p: Product) =>
  `https://play.google.com/store/apps/details?id=${p.packageId}`;
export const iconPath = (p: Product) => `/images/products/${p.slug}.webp`;

export const webProjects = [
  {
    slug: "game-asset-radar",
    name: "Game Asset Radar",
    genre: "For game makers",
    url: "https://gameassetradar.top/",
    description:
      "Discover free game assets, limited-time finds, and worthwhile deals with clear license information.",
    label: "Your next world starts here.",
    icon: "cube",
  },
  {
    slug: "ai-radar",
    name: "AI Radar",
    genre: "For curious minds",
    url: "https://ai-radar-lilac.vercel.app/",
    description:
      "Follow AI lab updates, model releases, developer tools, and pricing from official sources in one place.",
    label: "Stay ahead of the signal.",
    icon: "radar",
  },
];

export type Update = {
  slug: string;
  title: string;
  category: "Game updates" | "App updates";
  date: string;
  productSlug: string;
  summary: string;
  paragraphs: string[];
  changes: string[];
};
export const updates: Update[] = [
  {
    slug: "shardfall-arena-story-update",
    title: "A stronger Arena. A sharper campaign.",
    category: "Game updates",
    date: "2026-10-07",
    productSlug: "shardfall",
    summary:
      "The latest Shardfall update brings improvements to Arena and story battles.",
    paragraphs: [
      "Shardfall's October 7 update focuses on two parts of the adventure: Arena and the story campaign.",
      "Whether you are drafting a temporary deck or progressing through Aethyr, the latest release brings improvements to those encounters. Update through Google Play to play the current version.",
    ],
    changes: ["Arena improvements", "Story battle improvements"],
  },
  {
    slug: "aeonfall-combat-rewards-update",
    title: "Your next run, with clearer combat.",
    category: "Game updates",
    date: "2026-10-07",
    productSlug: "aeonfall",
    summary:
      "More accurate damage previews and better reward recovery arrive in Aeonfall.",
    paragraphs: [
      "The latest Aeonfall update helps make tactical decisions clearer and resumed runs more reliable.",
      "Damage previews now better account for Ward, enemy scaling, special attacks, and Footnote. Reward offers and collected rewards persist when you resume a run, and Archive now grants its additional card choice correctly.",
    ],
    changes: [
      "Improved combat damage previews",
      "Reward state preserved when resuming runs",
      "Corrected Archive's extra card choice",
    ],
  },
  {
    slug: "shadow-depths-progression-update",
    title: "Deeper runs. More reliable progress.",
    category: "Game updates",
    date: "2026-10-06",
    productSlug: "shadow-depths",
    summary:
      "Progress saving, combat feedback, and performance improvements for Shadow Depths.",
    paragraphs: [
      "The October 6 release of Shadow Depths improves how a run saves progress and responds during play.",
      "Level-up saving now preserves consumed XP items, kill rewards, and vault keys together. This release also includes improvements to frame pacing, camera motion, the HUD, loot, revives, status effects, Continue recovery, and ad flow.",
    ],
    changes: [
      "More reliable level-up and reward saving",
      "Android Back correctly closes character selection",
      "Frame pacing, camera, HUD, and combat improvements",
    ],
  },
  {
    slug: "ai-work-studio-workflow-update",
    title: "From messy inputs to finished work.",
    category: "App updates",
    date: "2026-09-23",
    productSlug: "ai-work-studio",
    summary:
      "A unified AI Work Studio workflow for documents, photos, notes, and everyday outputs.",
    paragraphs: [
      "AI Work Studio's September 23 release brings a workflow for turning photos, notes, PDFs, spreadsheets, and URLs into practical work.",
      "Create reports, meeting minutes, PDF packs, slides, diagrams, and exports in one workspace. OCR, templates, history, and faster file analysis support everyday tasks.",
    ],
    changes: [
      "Unified inputs for files, photos, notes, and URLs",
      "Reports, slides, diagrams, and export workflows",
      "OCR, templates, history, and faster file analysis",
    ],
  },
];

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

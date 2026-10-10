import test from "node:test";
import assert from "node:assert/strict";
import {
  canonicalUrl,
  identityKeys,
  validateEntry,
  validateEditions,
  filterDiscover,
  prepareEdition,
} from "../src/lib/discover-core.mjs";

const date = "2026-10-10";
function entry(slug = "sample-game", kind = "game") {
  const officialUrl = `https://studio.test/${slug}`;
  return {
    slug,
    kind,
    name: slug,
    developer: "Independent Studio",
    category: kind === "game" ? "Strategy" : "Utilities",
    platforms: [kind === "game" ? "Windows" : "Android"],
    price: {
      model: "free",
      label: "Free",
      sourceUrl: officialUrl,
      checkedAt: date,
    },
    summary:
      "An original editorial description of a thoughtfully made independent product.",
    features: [
      "Explore a flexible set of tools",
      "Use a carefully designed interface",
      "Keep control of your experience",
    ],
    insight:
      "Its focused approach gives curious users a useful alternative to more complicated products.",
    officialUrl,
    discoverySource: { name: "Developer website", url: officialUrl },
    distribution: [{ label: "Official developer", url: officialUrl }],
    release: { kind: "newly-discovered", date: null, evidenceUrl: null },
    identity: {
      canonicalUrl: officialUrl,
      ...(kind === "app"
        ? { androidPackageId: `org.studio.${slug.replaceAll("-", "")}` }
        : {}),
    },
    asset: {
      path: `/images/discover/${slug}.png`,
      sourceUrl: `${officialUrl}/icon.png`,
      license: "CC BY 4.0",
      licenseUrl: `${officialUrl}/art-license`,
      attribution: "Official art by Independent Studio. CC BY 4.0.",
      alt: `${slug} official artwork`,
    },
    verification: {
      status: "verified",
      verifiedAt: date,
      sources: [
        {
          url: officialUrl,
          label: "Official developer information",
          checks: [
            "identity",
            "platforms",
            "features",
            "distribution",
            "price",
          ],
          accessedAt: date,
        },
        {
          url: `${officialUrl}/art-license`,
          label: "Explicit artwork license",
          checks: ["asset-license"],
          accessedAt: date,
        },
      ],
    },
  };
}
const edition = (entries, editionDate = date) => ({
  date: editionDate,
  title: "Daily discoveries",
  intro: "Independent ideas worth your time, selected with care.",
  publishedAt: `${editionDate}T01:00:00.000Z`,
  entries,
});

test("canonical URLs discard trackers but preserve app identity", () => {
  assert.equal(
    canonicalUrl("https://studio.test/game/?utm_source=feed#about"),
    "https://studio.test/game",
  );
  assert.equal(
    canonicalUrl(
      "https://play.google.com/store/apps/details?utm_source=f7&id=org.studio.app",
    ),
    "https://play.google.com/store/apps/details?id=org.studio.app",
  );
  assert.ok(
    identityKeys(entry("sample-app", "app")).includes(
      "android:org.studio.sampleapp",
    ),
  );
});
test("a complete verified entry passes and missing rights or evidence fails", () => {
  assert.deepEqual(validateEntry(entry(), date), []);
  const missing = entry();
  missing.asset.licenseUrl = "";
  assert.match(validateEntry(missing, date).join(" "), /licenseUrl/);
  const evidence = entry();
  evidence.verification.sources[0].checks = ["identity"];
  assert.match(
    validateEntry(evidence, date).join(" "),
    /platforms.*features.*distribution.*price/,
  );
});
test("malformed research structures enter review without aborting the batch", () => {
  const invalidPlatform = entry("bad-platform", "app");
  invalidPlatform.platforms = {};
  const invalidSources = entry("bad-source");
  invalidSources.verification.sources = [null];
  const invalidDistribution = entry("bad-distribution");
  invalidDistribution.distribution = {};
  const prepared = prepareEdition(
    [null, invalidPlatform, invalidSources, invalidDistribution, entry()],
    [],
    date,
  );
  assert.equal(prepared.review.length, 4);
  assert.equal(prepared.edition.entries.length, 1);
});
test("unsafe distribution, placeholder URLs and APK mirrors are blocked", () => {
  for (const url of [
    "javascript:alert(1)",
    "https://localhost/app",
    "https://apkpure.com/app",
    "https://apkpure.com./app",
    "https://www.example.com/app",
    "https://creator.example/app",
    "https://user:password@studio.test/app",
    "https://127.0.0.1/app",
    "https://studio.test/app.apk",
  ]) {
    const candidate = entry();
    candidate.distribution[0].url = url;
    assert.ok(validateEntry(candidate, date).length, url);
  }
});
test("Android apps require Android and Google Play URLs must agree with package ID", () => {
  const candidate = entry("sample-app", "app");
  candidate.platforms = ["iOS"];
  assert.match(validateEntry(candidate, date).join(" "), /Android/);
  candidate.platforms = ["Android"];
  candidate.distribution = [
    {
      label: "Google Play",
      url: "https://play.google.com/store/apps/details?id=org.some.other",
    },
  ];
  assert.match(validateEntry(candidate, date).join(" "), /package/);
});
test("dates and original launch evidence prevent false new-release labels", () => {
  assert.match(validateEntry(entry(), "2026-02-30").join(" "), /date/);
  assert.match(validateEntry(entry(), "9999-01-01").join(" "), /future/);
  const candidate = entry();
  candidate.release = {
    kind: "new-release",
    date: "2020-01-01",
    evidenceUrl: candidate.officialUrl,
  };
  assert.match(validateEntry(candidate, date).join(" "), /30 days/);
  candidate.release.date = "2026-10-05";
  assert.match(validateEntry(candidate, date).join(" "), /original-release/);
  candidate.verification.sources[0].checks.push("original-release");
  assert.deepEqual(validateEntry(candidate, date), []);
  candidate.release.date = "2026-10-11";
  assert.ok(validateEntry(candidate, date).length);
});
test("unknown prices remain unknown, and unverified candidates never publish", () => {
  const candidate = entry();
  candidate.price = {
    ...candidate.price,
    model: "unknown",
    label: "Check official site",
  };
  assert.deepEqual(validateEntry(candidate, date), []);
  candidate.price.label = "$4.99";
  assert.match(validateEntry(candidate, date).join(" "), /unknown/);
  candidate.verification.status = "pending";
  assert.match(validateEntry(candidate, date).join(" "), /verified/);
});
test("deduplication spans editions, package IDs and tracked canonical URLs", () => {
  const original = entry("sample-app", "app");
  const renamed = entry("new-name", "app");
  renamed.identity.androidPackageId = original.identity.androidPackageId;
  assert.match(
    validateEditions([
      edition([original]),
      edition([renamed], "2026-10-09"),
    ]).join(" "),
    /duplicate identity/,
  );
  const tracked = entry("alternate-name");
  tracked.identity.canonicalUrl = `${entry().officialUrl}/?utm_campaign=launch`;
  assert.match(
    validateEditions([edition([entry(), tracked])]).join(" "),
    /duplicate identity/,
  );
  const before = entry("original-game");
  before.distribution = [
    {
      label: "Official GitHub",
      url: "https://github.com/studio/game/releases",
    },
  ];
  const after = entry("renamed-game");
  after.identity.githubRepo = "studio/game";
  assert.match(
    validateEditions([edition([before, after])]).join(" "),
    /duplicate identity/,
  );
});
test("publishing allows honest partial editions, queues failures and caps each kind at seven", () => {
  const broken = entry("broken-game");
  broken.asset.license = "";
  const prepared = prepareEdition([entry(), broken], [], date);
  assert.equal(prepared.edition.entries.length, 1);
  assert.equal(prepared.review.length, 1);
  const full = prepareEdition(
    Array.from({ length: 9 }, (_, i) => entry(`game-${i}`)),
    [],
    date,
  );
  assert.equal(full.edition.entries.length, 7);
  assert.equal(full.review.length, 2);
  assert.equal(prepareEdition([broken], [], date).edition, null);
});
test("same-day reruns cannot overwrite editions and historical duplicates enter review", () => {
  const original = edition([entry()]);
  const rerun = prepareEdition([entry("another-game")], [original], date);
  assert.equal(rerun.edition, null);
  assert.match(rerun.review[0].reasons.join(" "), /already exists/);
  const previous = edition([entry()], "2026-10-09");
  const duplicate = prepareEdition([entry()], [previous], date);
  assert.equal(duplicate.edition, null);
  assert.match(duplicate.review[0].reasons.join(" "), /duplicate/);
});
test("compound filters search original copy, developers, categories and platforms", () => {
  const games = [entry("world-builder"), entry("pocket-tool", "app")];
  assert.equal(
    filterDiscover(games, {
      kind: "game",
      category: "Strategy",
      query: " INDEPENDENT ",
    }).length,
    1,
  );
  assert.equal(
    filterDiscover(games, { kind: "app", query: "android" })[0].slug,
    "pocket-tool",
  );
  assert.equal(
    filterDiscover(games, { kind: "game", query: "no-such-product" }).length,
    0,
  );
  assert.equal(filterDiscover(games, {}).length, 2);
});

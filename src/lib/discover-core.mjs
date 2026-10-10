const requiredChecks = [
  "identity",
  "platforms",
  "features",
  "distribution",
  "price",
  "asset-license",
];
const mirrorHosts = [
  "apkpure.com",
  "apkmirror.com",
  "apkcombo.com",
  "apk-dl.com",
  "apkdone.com",
  "happymod.com",
  "uptodown.com",
  "androidapksfree.com",
];
const isText = (value, min = 1, max = 2000) =>
  typeof value === "string" &&
  value.trim().length >= min &&
  value.length <= max;
const isDate = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
export const todayInJakarta = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

function safeUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      host.includes(".") &&
      !/(^|\.)(localhost|local|internal|example|invalid)$/.test(host) &&
      !/^\[|^\d+\.\d+\.\d+\.\d+$/.test(host) &&
      !/(^|\.)example\.(com|org|net)$/.test(host) &&
      !mirrorHosts.some(
        (mirror) => host === mirror || host.endsWith(`.${mirror}`),
      ) &&
      !/\.apk$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export function canonicalUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    url.hostname = url.hostname
      .toLowerCase()
      .replace(/\.$/, "")
      .replace(/^www\./, "");
    for (const key of [...url.searchParams.keys()]) {
      if (
        /^(utm_.+|ref|referrer|fbclid|gclid|mc_cid|mc_eid|source)$/i.test(key)
      )
        url.searchParams.delete(key);
    }
    url.searchParams.sort();
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    if (url.hostname === "github.com")
      url.pathname = url.pathname.toLowerCase().replace(/\.git$/, "");
    return url.href.replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function identityKeys(entry) {
  const keys = [entry?.identity?.canonicalUrl, entry?.officialUrl]
    .map(canonicalUrl)
    .filter(Boolean)
    .map((value) => `url:${value}`);
  if (isText(entry?.identity?.androidPackageId))
    keys.push(`android:${entry.identity.androidPackageId.toLowerCase()}`);
  if (isText(entry?.identity?.githubRepo))
    keys.push(
      `github:${entry.identity.githubRepo.toLowerCase().replace(/\.git$/, "")}`,
    );
  const links = [
    entry?.officialUrl,
    entry?.identity?.canonicalUrl,
    ...(Array.isArray(entry?.distribution)
      ? entry.distribution.map((link) => link?.url)
      : []),
  ];
  for (const link of links) {
    try {
      const url = new URL(canonicalUrl(link));
      if (url.hostname === "play.google.com" && url.searchParams.get("id"))
        keys.push(`android:${url.searchParams.get("id").toLowerCase()}`);
      if (
        url.hostname === "f-droid.org" &&
        /\/(?:packages)\/[\w.]+/.test(url.pathname)
      )
        keys.push(
          `android:${url.pathname.match(/\/packages\/([\w.]+)/)[1].toLowerCase()}`,
        );
      if (url.hostname === "github.com" && /^\/[^/]+\/[^/]+/.test(url.pathname))
        keys.push(
          `github:${url.pathname
            .split("/")
            .slice(1, 3)
            .join("/")
            .toLowerCase()
            .replace(/\.git$/, "")}`,
        );
    } catch {
      /* Invalid links are reported by validation. */
    }
  }
  if (isText(entry?.name) && isText(entry?.developer))
    keys.push(
      `name:${entry.kind}:${entry.name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")}:${entry.developer.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")}`,
    );
  return [...new Set(keys)];
}

export function validateEntry(entry, date) {
  const errors = [];
  if (!isDate(date)) errors.push("Invalid discovery date");
  else if (date > todayInJakarta())
    errors.push("Discovery date is in the future");
  if (!entry || typeof entry !== "object" || Array.isArray(entry))
    return [...errors, "Entry must be an object"];
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug || "") ||
    !isText(entry.slug, 2, 80)
  )
    errors.push("Invalid slug");
  if (!["game", "app"].includes(entry.kind))
    errors.push("kind must be game or app");
  for (const key of ["name", "developer", "category"])
    if (!isText(entry[key], 1, 120)) errors.push(`Missing or invalid ${key}`);
  if (!isText(entry.summary, 40, 650))
    errors.push("summary must contain 40–650 characters of original copy");
  if (!isText(entry.insight, 30, 650))
    errors.push("insight must contain 30–650 characters");
  if (
    !Array.isArray(entry.features) ||
    entry.features.length < 3 ||
    entry.features.length > 6 ||
    entry.features.some((feature) => !isText(feature, 8, 250))
  )
    errors.push("features must contain 3–6 substantiated highlights");
  if (
    !Array.isArray(entry.platforms) ||
    !entry.platforms.length ||
    entry.platforms.length > 8 ||
    entry.platforms.some((platform) => !isText(platform, 1, 60))
  )
    errors.push("Missing platforms");
  if (
    entry.kind === "app" &&
    (!Array.isArray(entry.platforms) || !entry.platforms.includes("Android"))
  )
    errors.push("Apps must support Android");
  const checkUrl = (value, field) => {
    if (!safeUrl(value)) errors.push(`Unsafe or missing ${field} URL`);
  };
  checkUrl(entry.officialUrl, "official");
  checkUrl(entry.discoverySource?.url, "discovery source");
  if (!isText(entry.discoverySource?.name, 1, 100))
    errors.push("Missing discovery source name");
  checkUrl(entry.identity?.canonicalUrl, "canonical identity");
  if (
    entry.identity?.androidPackageId &&
    !/^[a-zA-Z][\w]*(?:\.[\w]+)+$/.test(entry.identity.androidPackageId)
  )
    errors.push("Invalid Android package ID");
  if (
    entry.identity?.githubRepo &&
    !/^[\w.-]+\/[\w.-]+$/.test(entry.identity.githubRepo)
  )
    errors.push("Invalid GitHub repository identity");
  if (
    !Array.isArray(entry.distribution) ||
    !entry.distribution.length ||
    entry.distribution.length > 8
  )
    errors.push("Missing official distribution");
  else
    for (const link of entry.distribution) {
      if (!isText(link?.label, 1, 80))
        errors.push("Missing distribution label");
      checkUrl(link?.url, "distribution");
      try {
        const url = new URL(link.url);
        if (
          link.label === "Google Play" &&
          (url.hostname !== "play.google.com" ||
            url.pathname !== "/store/apps/details" ||
            !url.searchParams.get("id"))
        )
          errors.push("Google Play requires its official app listing");
        if (
          url.hostname === "play.google.com" &&
          url.searchParams.get("id") !== entry.identity?.androidPackageId
        )
          errors.push(
            "Google Play package must agree with Android package identity",
          );
      } catch {
        /* Already reported above. */
      }
    }
  if (
    !["free", "paid", "freemium", "unknown"].includes(entry.price?.model) ||
    !isText(entry.price?.label, 1, 120)
  )
    errors.push("Missing or invalid price");
  if (
    entry.price?.model === "unknown" &&
    entry.price.label !== "Check official site"
  )
    errors.push("An unknown price must say Check official site");
  checkUrl(entry.price?.sourceUrl, "price source");
  if (entry.price?.checkedAt !== date)
    errors.push("Price must be checked on the discovery date");
  const asset = entry.asset;
  if (
    !/^\/images\/discover\/[a-z0-9][a-z0-9-]*\.(png|jpe?g|webp|avif)$/.test(
      asset?.path || "",
    )
  )
    errors.push("Artwork path must be a local image inside /images/discover/");
  if (asset?.presentation && !["contain", "cover"].includes(asset.presentation))
    errors.push("Invalid artwork presentation");
  if (
    asset?.noticePath &&
    !/^\/images\/discover\/licenses\/[a-zA-Z0-9][a-zA-Z0-9.-]*\.txt$/.test(
      asset.noticePath,
    )
  )
    errors.push("License notice must be local plain text");
  for (const field of ["license", "attribution", "alt"])
    if (!isText(asset?.[field], 3, 600))
      errors.push(`Missing artwork ${field}`);
  checkUrl(asset?.sourceUrl, "artwork source");
  checkUrl(asset?.licenseUrl, "asset.licenseUrl");
  if (
    /unknown|pending|unverified|all rights reserved|not specified/i.test(
      asset?.license || "",
    )
  )
    errors.push("Artwork requires evidenced reuse permission");
  const verification = entry.verification;
  if (verification?.status !== "verified")
    errors.push("Only verified entries may publish");
  if (verification?.verifiedAt !== date)
    errors.push("Verification date must equal discovery date");
  const sources = verification?.sources;
  const checks = new Set();
  if (!Array.isArray(sources) || !sources.length || sources.length > 15)
    errors.push("Missing verification sources");
  else
    for (const source of sources) {
      checkUrl(source?.url, "verification source");
      if (!isText(source?.label, 3, 150)) errors.push("Missing source label");
      if (source?.accessedAt !== date)
        errors.push("Evidence must be accessed on the discovery date");
      if (!Array.isArray(source?.checks) || !source.checks.length)
        errors.push("Source must identify the facts it verifies");
      else source.checks.forEach((check) => checks.add(check));
    }
  for (const check of requiredChecks)
    if (!checks.has(check)) errors.push(`Missing ${check} evidence`);
  const substantiated = (url, check) =>
    Array.isArray(sources) &&
    sources.some(
      (source) =>
        canonicalUrl(source?.url) === canonicalUrl(url) &&
        Array.isArray(source?.checks) &&
        source.checks.includes(check),
    );
  if (
    safeUrl(asset?.licenseUrl) &&
    !substantiated(asset.licenseUrl, "asset-license")
  )
    errors.push("Artwork license URL must have asset-license evidence");
  if (
    safeUrl(entry.price?.sourceUrl) &&
    !substantiated(entry.price.sourceUrl, "price")
  )
    errors.push("Price source URL must have price evidence");
  if (entry.release?.kind === "new-release") {
    const launch = entry.release.date;
    if (
      !isDate(launch) ||
      launch > date ||
      (Date.parse(date) - Date.parse(launch)) / 86400000 > 30
    )
      errors.push(
        "New release must be an original launch within 30 days of discovery",
      );
    checkUrl(entry.release.evidenceUrl, "original release evidence");
    if (!substantiated(entry.release.evidenceUrl, "original-release"))
      errors.push(
        "New release requires original-release evidence; an update is insufficient",
      );
  } else if (
    entry.release?.kind !== "newly-discovered" ||
    entry.release.date !== null ||
    entry.release.evidenceUrl !== null
  )
    errors.push(
      "Existing products must be newly-discovered with no claimed launch date",
    );
  return errors;
}

export function validateEditions(editions) {
  const errors = [],
    dates = new Set(),
    slugs = new Set(),
    identities = new Map();
  for (const edition of editions) {
    if (!edition || !isDate(edition.date)) {
      errors.push("Invalid edition date");
      continue;
    }
    if (dates.has(edition.date))
      errors.push(`${edition.date}: duplicate edition date`);
    dates.add(edition.date);
    if (!isText(edition.title, 3, 160) || !isText(edition.intro, 20, 650))
      errors.push(`${edition.date}: missing editorial title or intro`);
    if (
      !isText(edition.publishedAt) ||
      !Number.isFinite(Date.parse(edition.publishedAt)) ||
      todayInJakarta(new Date(edition.publishedAt)) !== edition.date
    )
      errors.push(
        `${edition.date}: publishedAt must belong to the discovery date in Asia/Jakarta`,
      );
    if (!Array.isArray(edition.entries) || !edition.entries.length) {
      errors.push(`${edition.date}: empty or invalid edition`);
      continue;
    }
    for (const kind of ["game", "app"])
      if (edition.entries.filter((entry) => entry?.kind === kind).length > 7)
        errors.push(
          `${edition.date}: at most seven ${kind} entries may publish`,
        );
    for (const entry of edition.entries) {
      errors.push(
        ...validateEntry(entry, edition.date).map(
          (error) => `${edition.date}/${entry?.slug || "candidate"}: ${error}`,
        ),
      );
      if (!entry || typeof entry !== "object") continue;
      if (slugs.has(entry.slug))
        errors.push(`${edition.date}: duplicate slug ${entry.slug}`);
      slugs.add(entry.slug);
      for (const key of identityKeys(entry)) {
        if (identities.has(key))
          errors.push(
            `${edition.date}/${entry.slug}: duplicate identity already used by ${identities.get(key)}`,
          );
        identities.set(key, entry.slug);
      }
    }
  }
  return errors;
}

export function filterDiscover(
  entries,
  { kind = "all", category = "all", query = "" } = {},
) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return entries.filter(
    (entry) =>
      (kind === "all" || entry.kind === kind) &&
      (category === "all" || entry.category === category) &&
      words.every((word) =>
        `${entry.name} ${entry.developer} ${entry.category} ${entry.platforms.join(" ")} ${entry.summary} ${entry.features.join(" ")} ${entry.insight}`
          .toLocaleLowerCase()
          .includes(word),
      ),
  );
}

export function prepareEdition(candidates, editions, date) {
  const review = [],
    accepted = [],
    counts = { game: 0, app: 0 };
  const seen = new Set(
    editions.flatMap((edition) => edition.entries.flatMap(identityKeys)),
  );
  const slugs = new Set(
    editions.flatMap((edition) => edition.entries.map((entry) => entry.slug)),
  );
  const existing = editions.some((edition) => edition.date === date);
  for (const candidate of candidates) {
    const reasons = validateEntry(candidate, date);
    if (existing)
      reasons.push(
        "An edition already exists for this date; it cannot be overwritten",
      );
    if (
      slugs.has(candidate?.slug) ||
      identityKeys(candidate).some((key) => seen.has(key))
    )
      reasons.push(
        "Product is a duplicate of an already published or selected discovery",
      );
    if (counts[candidate?.kind] >= 7)
      reasons.push(
        "Daily target already filled; retain candidate for fresh verification on a later date",
      );
    if (reasons.length) review.push({ candidate, queuedAt: date, reasons });
    else {
      accepted.push(candidate);
      counts[candidate.kind] += 1;
      slugs.add(candidate.slug);
      identityKeys(candidate).forEach((key) => seen.add(key));
    }
  }
  return {
    edition: accepted.length
      ? {
          date,
          title: "Independent ideas. Extraordinary finds.",
          intro:
            "A daily selection of independent games and useful Android apps, with original F7 insights and links to their creators.",
          publishedAt: new Date().toISOString(),
          entries: accepted,
        }
      : null,
    review,
  };
}

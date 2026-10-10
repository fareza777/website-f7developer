import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { todayInJakarta } from "../src/lib/discover-core.mjs";

const repo = process.env.GITHUB_REPOSITORY;
const number = process.env.DISCOVER_PR_NUMBER;
if (repo !== "fareza777/website-f7developer" || !/^\d+$/.test(number || ""))
  throw new Error("Unexpected repository or PR number");
const api = (endpoint) =>
  JSON.parse(
    execFileSync("gh", ["api", endpoint], {
      encoding: "utf8",
      maxBuffer: 2_000_000,
    }),
  );
const pr = api(`repos/${repo}/pulls/${number}`);
if (
  pr.base.ref !== "main" ||
  pr.head.repo?.full_name !== repo ||
  pr.draft ||
  !["fareza777", "cursor[bot]"].includes(pr.user.login) ||
  !/^F7 Discover: \d{4}-\d{2}-\d{2}/.test(pr.title)
)
  throw new Error(
    "Only same-repository owner/Cursor content PRs with the F7 Discover daily title may auto-publish",
  );
// Derive every changed path from the same immutable commit that will be merged.
// Never check out or execute PR code, or rely on a mutable API file list.
if (!/^[a-f0-9]{40}$/.test(pr.head.sha)) throw new Error("Invalid PR head SHA");
execFileSync("git", ["fetch", "--no-tags", "origin", pr.head.sha], {
  stdio: "pipe",
});
const files = execFileSync(
  "git",
  ["diff", "--name-status", "--no-renames", "HEAD", pr.head.sha],
  { encoding: "utf8", maxBuffer: 100_000 },
)
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [status, filename, extra] = line.split("\t");
    if (extra || !["A", "M"].includes(status))
      throw new Error("Only additions and queue updates are allowed");
    return { filename, status: status === "A" ? "added" : "modified" };
  });
if (files.length > 50)
  throw new Error("Daily content change exceeds its file budget");
const today = todayInJakarta();
let editions = 0,
  assets = 0,
  bytes = 0;
for (const file of files) {
  const isEdition = file.filename === `content/discover/editions/${today}.json`;
  const isAsset =
    /^public\/images\/discover\/[a-z0-9][a-z0-9-]*\.(png|jpe?g|webp|avif)$/.test(
      file.filename,
    );
  const isLicense =
    /^public\/images\/discover\/licenses\/[a-z0-9][a-zA-Z0-9.-]*\.txt$/.test(
      file.filename,
    );
  const isQueue = file.filename === "content/discover/review.json";
  if (
    !(isEdition || isAsset || isLicense || isQueue) ||
    !["added", "modified"].includes(file.status) ||
    (!isQueue && file.status !== "added")
  )
    throw new Error(
      `Daily publishing cannot change ${file.filename} (${file.status})`,
    );
  if (isEdition) editions++;
  if (isAsset) assets++;
}
if (editions > 1 || assets > 14 || !files.length)
  throw new Error(
    "Expected at most one new edition and fourteen original images",
  );
const oldQueue = JSON.parse(
  await readFile("content/discover/review.json", "utf8"),
);
const payloads = new Map();
for (const file of files) {
  const mode = execFileSync(
    "git",
    ["ls-tree", pr.head.sha, "--", file.filename],
    { encoding: "utf8" },
  );
  if (!/^100644 blob [a-f0-9]{40}\t/.test(mode))
    throw new Error(
      `Expected a regular, non-executable file: ${file.filename}`,
    );
  const data = execFileSync(
    "git",
    ["show", `${pr.head.sha}:${file.filename}`],
    { maxBuffer: 4_000_000 },
  );
  bytes += data.length;
  if (bytes > 15_000_000 || data.length > 4_000_000)
    throw new Error("Daily image/content payload is too large");
  if (file.filename === "content/discover/review.json") {
    const next = JSON.parse(data.toString("utf8"));
    if (
      !Array.isArray(next) ||
      next.length > oldQueue.length + 50 ||
      next.some(
        (item) =>
          !item ||
          !Array.isArray(item.reasons) ||
          !item.reasons.length ||
          typeof item.queuedAt !== "string" ||
          !item.candidate,
      )
    )
      throw new Error(
        "Review queue has invalid records or exceeds its daily budget",
      );
    const retained = new Set(next.map((item) => JSON.stringify(item)));
    if (oldQueue.some((item) => !retained.has(JSON.stringify(item))))
      throw new Error(
        "Daily publication must preserve every existing review record",
      );
  }
  payloads.set(file.filename, data);
}
const editionPath = `content/discover/editions/${today}.json`;
const edition = payloads.has(editionPath)
  ? JSON.parse(payloads.get(editionPath).toString("utf8"))
  : null;
if (edition && !Array.isArray(edition.entries))
  throw new Error("Invalid edition entries");
const referenced = new Set(
  (edition?.entries || []).flatMap((entry) =>
    [entry?.asset?.path, entry?.asset?.noticePath]
      .filter(Boolean)
      .map((value) => `public${value}`),
  ),
);
for (const [filename, data] of payloads) {
  if (filename.startsWith("public/") && !referenced.has(filename))
    throw new Error(
      `Artwork and license additions must belong to the new edition: ${filename}`,
    );
  const target = path.resolve(filename);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, data);
}
if (process.env.GITHUB_OUTPUT)
  await writeFile(process.env.GITHUB_OUTPUT, `head=${pr.head.sha}\n`, {
    flag: "a",
  });
console.log(
  `Prepared trusted-base validation for PR #${number}: ${editions} edition, ${assets} assets. No PR code executed.`,
);

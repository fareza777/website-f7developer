import {
  readFile,
  readdir,
  mkdir,
  writeFile,
  rename,
  unlink,
  stat,
  realpath,
  link,
  access,
} from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import {
  validateEditions,
  validateEntry,
  prepareEdition,
  todayInJakarta,
} from "../src/lib/discover-core.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = path.join(root, "content/discover");
const editionsDirectory = path.join(content, "editions");
const queuePath = path.join(content, "review.json");
const journalPath = path.join(content, ".publish-journal.json");
const json = async (file) => JSON.parse(await readFile(file, "utf8"));
async function readEditions() {
  await mkdir(editionsDirectory, { recursive: true });
  const files = (await readdir(editionsDirectory))
    .filter((file) => file.endsWith(".json"))
    .sort();
  const editions = [];
  for (const file of files) {
    const edition = await json(path.join(editionsDirectory, file));
    if (file !== `${edition.date}.json`)
      throw new Error(`Edition filename disagrees with date: ${file}`);
    editions.push(edition);
  }
  return editions;
}
async function assetErrors(entry) {
  if (
    validateEntry(entry, entry?.verification?.verifiedAt).some((error) =>
      error.startsWith("Artwork path"),
    )
  )
    return ["Invalid local artwork path"];
  try {
    const base = await realpath(path.join(root, "public/images/discover"));
    const resolved = await realpath(
      path.join(root, "public", entry.asset.path),
    );
    if (!resolved.startsWith(`${base}${path.sep}`))
      return ["Artwork must stay inside public/images/discover"];
    const info = await stat(resolved);
    if (!info.isFile() || info.size < 100 || info.size > 4_000_000)
      return ["Artwork must be a nonempty image smaller than 4 MB"];
    const bytes = await readFile(resolved);
    const extension = path.extname(resolved).toLowerCase();
    const signature =
      extension === ".png"
        ? bytes
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        : [".jpg", ".jpeg"].includes(extension)
          ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
          : extension === ".webp"
            ? bytes.toString("ascii", 0, 4) === "RIFF" &&
              bytes.toString("ascii", 8, 12) === "WEBP"
            : extension === ".avif"
              ? bytes.toString("ascii", 4, 8) === "ftyp" &&
                /avif|avis/.test(bytes.toString("ascii", 8, 32))
              : false;
    if (!signature)
      return ["Artwork content does not match its image extension"];
    const metadata = await sharp(bytes, {
      limitInputPixels: 40_000_000,
    }).metadata();
    if (
      !metadata.width ||
      !metadata.height ||
      metadata.width * metadata.height > 40_000_000 ||
      metadata.width > 12000 ||
      metadata.height > 12000
    )
      return ["Artwork dimensions are invalid or too large"];
    if (entry.asset.noticePath) {
      const notice = await realpath(
        path.join(root, "public", entry.asset.noticePath),
      );
      if (
        !notice.startsWith(`${base}${path.sep}licenses${path.sep}`) ||
        (await stat(notice)).size > 100000
      )
        return ["Invalid local artwork license notice"];
    }
    return [];
  } catch {
    return ["Local official artwork file is missing or cannot be decoded"];
  }
}
async function atomicJson(file, value, exclusive = false) {
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, {
    flag: "wx",
  });
  try {
    if (exclusive) await link(temporary, file);
    else await rename(temporary, file);
  } finally {
    await unlink(temporary).catch(() => {});
  }
}
const exists = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};
function appendReview(existing, incoming) {
  const keys = new Set(existing.map((item) => JSON.stringify(item)));
  const result = [...existing];
  for (const item of incoming)
    if (!keys.has(JSON.stringify(item))) {
      result.push(item);
      keys.add(JSON.stringify(item));
    }
  return result;
}
async function acquireLock(file) {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      await writeFile(file, `${process.pid}\n`, { flag: "wx" });
      return;
    } catch (error) {
      if (error.code !== "EEXIST" || attempt === 39)
        throw new Error(
          "Another publisher holds the lock. Retry shortly; inspect a stale lock before removing it.",
          { cause: error },
        );
    }
    await delay(250);
  }
}
async function recoverJournal() {
  if (!(await exists(journalPath))) return;
  const journal = await json(journalPath);
  const editions = await readEditions();
  const recovered = [...journal.review];
  if (
    journal.edition &&
    !editions.some((edition) => edition.date === journal.edition.date)
  ) {
    for (const candidate of journal.edition.entries)
      recovered.push({
        candidate,
        queuedAt: todayInJakarta(),
        reasons: [
          "Recovered after interrupted publication; re-verify this candidate before publishing",
        ],
      });
  }
  await atomicJson(queuePath, appendReview(await json(queuePath), recovered));
  await unlink(journalPath);
}
async function main() {
  const [command, ...args] = process.argv.slice(2);
  const editions = await readEditions();
  const errors = validateEditions(editions);
  for (const edition of editions)
    for (const entry of edition.entries)
      errors.push(
        ...(await assetErrors(entry)).map((error) => `${entry.slug}: ${error}`),
      );
  const queue = await json(queuePath);
  if (!Array.isArray(queue)) errors.push("Review queue must be an array");
  if (errors.length) throw new Error(errors.join("\n"));
  if (command === "validate") {
    if (await exists(journalPath))
      throw new Error(
        "An interrupted publication has a recovery journal. Run the publisher to preserve its research before building.",
      );
    console.log(
      `Discover: ${editions.length} editions, ${editions.reduce((sum, edition) => sum + edition.entries.length, 0)} verified products, ${queue.length} candidates in review. Validation passed.`,
    );
    return;
  }
  if (command !== "publish")
    throw new Error(
      "Usage: node scripts/discover.mjs validate | publish --date YYYY-MM-DD --input FILE",
    );
  const date = args[args.indexOf("--date") + 1];
  const input = args[args.indexOf("--input") + 1];
  if (!args.includes("--date") || !args.includes("--input") || !date || !input)
    throw new Error("publish requires --date and --input");
  if (date !== todayInJakarta())
    throw new Error(
      "Publishing requires today's date in Asia/Jakarta; historical editions are immutable",
    );
  const candidates = await json(path.resolve(root, input));
  if (!Array.isArray(candidates) || candidates.length > 50)
    throw new Error("Input must be an array of at most 50 candidates");
  // Serialize writers so concurrent daily runs cannot replace an edition or queue.
  const lock = path.join(content, ".publish.lock");
  await acquireLock(lock);
  let prepared, appended;
  try {
    await recoverJournal();
    const fresh = await readEditions();
    const usable = [],
      rejectedAssets = [];
    for (const candidate of candidates) {
      if (!validateEntry(candidate, date).length) {
        const failures = await assetErrors(candidate);
        if (failures.length)
          rejectedAssets.push({ candidate, queuedAt: date, reasons: failures });
        else usable.push(candidate);
      } else usable.push(candidate);
    }
    prepared = prepareEdition(usable, fresh, date);
    prepared.review.push(...rejectedAssets);
    if (prepared.edition) {
      const failures = validateEditions([...fresh, prepared.edition]);
      if (failures.length) throw new Error(failures.join("\n"));
    }
    const currentQueue = await json(queuePath);
    const combined = appendReview(currentQueue, prepared.review);
    appended = combined.length - currentQueue.length;
    // Recovery journal protects both accepted and rejected research across interruptions.
    await atomicJson(journalPath, prepared);
    await atomicJson(queuePath, combined);
    if (prepared.edition)
      await atomicJson(
        path.join(editionsDirectory, `${date}.json`),
        prepared.edition,
        true,
      );
    await unlink(journalPath);
  } finally {
    await unlink(lock);
  }
  console.log(
    prepared.edition
      ? `Published ${date}: ${prepared.edition.entries.filter((entry) => entry.kind === "game").length} games + ${prepared.edition.entries.filter((entry) => entry.kind === "app").length} apps.`
      : "No new edition published. Existing editions are unchanged.",
  );
  console.log(
    `${appended} new review records retained (${prepared.review.length} candidates require review).`,
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

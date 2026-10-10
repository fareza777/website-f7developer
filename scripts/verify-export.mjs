import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const files = [];
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.name.endsWith(".html")) files.push(absolute);
  }
}
await walk(root);
let references = 0;
const missing = new Set();
for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
    if (url.startsWith("//")) continue;
    const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
    let target = path.join(root, pathname);
    if (!path.extname(target)) target = path.join(target, "index.html");
    references++;
    try {
      await fs.access(target);
    } catch {
      missing.add(`${path.relative(root, file)}: ${url}`);
    }
  }
}
if (missing.size) {
  console.error([...missing].join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${files.length} HTML pages and ${references} internal page/asset references. No missing destinations.`,
  );
}

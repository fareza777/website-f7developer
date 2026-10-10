import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sources = JSON.parse(
  await fs.readFile(new URL("asset-sources.json", import.meta.url), "utf8"),
);
const directory = path.resolve("public/images/products");
await fs.mkdir(directory, { recursive: true });
let count = 0;
for (const [slug, source] of Object.entries(sources)) {
  const assets = [
    [slug, source.icon, "=s1024-rw"],
    ...source.screens.map((image, i) => [
      `${slug}-${i + 1}`,
      image,
      "=w720-rw",
    ]),
  ];
  await Promise.all(
    assets.map(async ([name, key, size]) => {
      const response = await fetch(
        `https://play-lh.googleusercontent.com/${key}${size}`,
      );
      if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      await sharp(bytes)
        .resize({ width: name === slug ? 800 : 720, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toFile(path.join(directory, `${name}.webp`));
      count++;
    }),
  );
  console.log(`Imported ${slug}`);
}
if (process.argv[2]) {
  await sharp(process.argv[2])
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile("public/images/studio-world.webp");
  await sharp(process.argv[2])
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 90 })
    .toFile("public/images/social.jpg");
}
console.log(`Saved ${count} official product assets.`);

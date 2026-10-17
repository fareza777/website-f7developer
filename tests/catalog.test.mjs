import test from "node:test";
import assert from "node:assert/strict";
import { filterCatalog, buildContactEmail } from "../src/lib/catalog.mjs";

const entries = [
  {
    name: "Shardfall",
    category: "Games",
    genre: "Card strategy",
    description: "A dark fantasy TCG",
  },
  {
    name: "Aeonfall",
    category: "Games",
    genre: "Roguelike RPG",
    description: "An RPG adventure",
  },
  {
    name: "Vocatim",
    category: "Apps",
    genre: "Productivity",
    description: "Private voice to text",
  },
];

test("search and category filters work together and ignore case or whitespace", () => {
  assert.deepEqual(
    filterCatalog(entries, "Games", "  RPG ").map((p) => p.name),
    ["Aeonfall"],
  );
  assert.equal(filterCatalog(entries, "All", "PRIVATE")[0].name, "Vocatim");
  assert.deepEqual(filterCatalog(entries, "Apps", "Shardfall"), []);
  assert.equal(filterCatalog(entries, "All", "").length, 3);
});

test("contact drafts preserve special characters without creating extra email headers", () => {
  const email = buildContactEmail({
    name: "A & B",
    email: "test@example.com",
    topic: "Game support",
    message: "Hello?\nI need help & details.",
  });
  const url = new URL(email);
  assert.equal(url.pathname, "fajar.mreza@f7developer.com");
  assert.equal(url.searchParams.get("subject"), "F7 Developer | Game support");
  assert.match(url.searchParams.get("body"), /A & B/);
  assert.match(
    url.searchParams.get("body"),
    /Hello\?\nI need help & details\./,
  );
  assert.equal([...url.searchParams.keys()].length, 2);
});

test("press and collaboration drafts go to the studio's business address", () => {
  const draft = buildContactEmail({
    name: "Alex",
    email: "alex@example.com",
    topic: "Press & collaboration",
    message: "Studio enquiry",
  });
  assert.equal(new URL(draft).pathname, "founder@wawasanai.com");
});

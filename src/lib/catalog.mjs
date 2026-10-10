/**
 * Search combines with either a category or a genre without mutating the catalogue.
 * @template {{name: string, category: string, genre: string, description: string}} T
 * @param {T[]} entries
 * @param {string} filter
 * @param {string} query
 * @returns {T[]}
 */
export function filterCatalog(entries, filter = "All", query = "") {
  const needle = query.trim().toLowerCase();
  return entries.filter(
    (entry) =>
      (filter === "All" ||
        entry.category === filter ||
        entry.genre === filter) &&
      `${entry.name} ${entry.genre} ${entry.description}`
        .toLowerCase()
        .includes(needle),
  );
}

/** Compose a local email draft; this does not submit or store visitor data. */
export function buildContactEmail({ name, email, topic, message }) {
  const subject = `F7 Developer | ${topic.replace(/[\r\n]/g, " ")}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const recipient =
    topic === "Press & collaboration"
      ? "founder@wawasanai.com"
      : "fajar.mreza@gmail.com";
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

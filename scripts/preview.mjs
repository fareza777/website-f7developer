import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT || 4177);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};
try {
  await fs.access(path.join(root, "index.html"));
} catch {
  console.error("Run npm run build before starting the preview.");
  process.exit(1);
}

http
  .createServer(async (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405);
      res.end();
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, `http://localhost:${port}`).pathname,
      );
      let file = path.resolve(root, `.${pathname}`);
      if (path.relative(root, file).startsWith("..")) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (!path.extname(file)) file = path.join(file, "index.html");
      let data;
      try {
        data = await fs.readFile(file);
      } catch {
        file = path.join(root, "404.html");
        data = await fs.readFile(file);
        res.statusCode = 404;
      }
      res.setHeader(
        "Content-Type",
        mime[path.extname(file)] || "application/octet-stream",
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
      res.setHeader("Cache-Control", "no-cache");
      res.end(req.method === "HEAD" ? undefined : data);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`F7 Developer preview: http://localhost:${port}`),
  );

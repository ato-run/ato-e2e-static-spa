// Zero-dependency static server for dist/ with SPA fallback — satisfies the
// detector's scripts.start requirement while keeping the app fully static.
import { createServer } from "node:http";
import { cpSync, rmSync, mkdirSync } from "node:fs";
// Build at boot so scripts.start stays a single plain argv (detector
// contract: no shell syntax like "a && b" in start/dev).
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("src", "dist", { recursive: true });
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";
const PORT = Number(process.env.PORT || 8080);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
createServer((req, res) => {
  const path = new URL(req.url, "http://localhost").pathname;
  let file = join("dist", path === "/" ? "index.html" : path.slice(1));
  if (!existsSync(file)) file = join("dist", "index.html"); // SPA fallback
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`static fixture on :${PORT}`));

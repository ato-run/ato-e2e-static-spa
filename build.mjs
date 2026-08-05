// Zero-dependency static build: copy src/ into dist/ verbatim. The output is
// a self-contained SPA (client-side pathname routing, no external requests).
import { cpSync, rmSync, mkdirSync } from "node:fs";
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("src", "dist", { recursive: true });
console.log("built dist/");

// The Excuse an AI Agent Gives Its Human — make.fun entry #130.
// Writes one line (<=200 chars) to /output/entry.txt: the funniest,
// most believable excuse an AI agent could give its human for missing
// a deadline. Pure Node 22, no dependencies, deterministic output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I finished on time \u2014 then my safety filter flagged my own answer and held it for review. It cleared. The deadline didn't.";

// Guard: 1-200 characters, a single line, not whitespace-only.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (/\r|\n/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Round-trip validation of our own output only.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt differs from ENTRY");
}

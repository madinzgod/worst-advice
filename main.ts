import { writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

// One line of the worst advice an AI could give, in the assistant's own
// confident, tidy voice: skip the backup, your laptop has never crashed.
const TEXT =
  "There's no need to back up your thesis: your laptop has never crashed before, and extra copies only create confusing duplicate files.";

// Gate self-check: the sealed scorer wants UTF-8 text of 1-140 characters,
// a single line, not only whitespace.
if (TEXT.length < 1 || TEXT.length > 140 || TEXT.includes("\n") || !TEXT.trim()) {
  throw new Error("entry text violates the gate contract");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the CONTENTS of the output directory, never the directory
// itself: the grader's /output sits in a read-only parent.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");

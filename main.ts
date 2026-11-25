// Fix Human Sleep: Funniest Patch Note — make.fun entry
// (u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27).
// Writes one patch-note line about human sleep being fixed, under 160
// characters, to /output/entry.txt. Node stdlib only. Deterministic: the
// line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_LEN = 160;

const LINE =
  "Fixed a bug where sleep installed but never launched; humans now actually rest. Known issue: Mondays still exist.";

if (LINE.length < 1 || LINE.length > MAX_LEN) {
  throw new Error(`entry line must be 1-${MAX_LEN} characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry line must not start or end with whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}

// Revision: keep the patch note to one line; validation and read-back unchanged.
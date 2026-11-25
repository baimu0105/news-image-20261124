// main.ts — entry for make.fun news-image-20261124.
// "24 November 2026 world news in one image".
//
// The program copies the entry image (entry.png, stored at this
// repository's root) into the grader's output directory as entry.png.
// The copy is byte-for-byte identical on every run, and the output file
// is left world-readable (mode 0644) so the grader can collect it.
//
// Runs on Node 22, standard library only; no network access.
// When MAKEFUN_OUTPUT_DIR is unset the grader's default /output is used.
import { copyFileSync, chmodSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(repoRoot, 'entry.png');
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
chmodSync(target, 0o644);

const { size } = statSync(target);
const srcSize = statSync(source).size;
if (size !== srcSize) throw new Error(`copy size mismatch: ${size} != ${srcSize}`);
console.log(`entry.png written to ${target} (${size} bytes)`);

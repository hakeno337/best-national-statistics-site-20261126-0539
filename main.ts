// DataNusa hand-in program (Node 22, standard library only).
//
// The site is plain static files under app/ next to this file, with 3-4
// screenshots of the running site under screenshots/. This program stages
// both into the output directory and writes dossier.json there, using the
// vendored make.fun library — the same library the scorer uses, so the
// dossier it writes here must match the scorer's byte for byte.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR set, e.g.
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader the output directory is /output.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Start from a clean output directory so stale files can never leak in.
// The output directory itself must survive: in the grader it is a mounted
// volume that cannot be removed, so clear its contents entry by entry.
mkdirSync(outputDir, { recursive: true });
for (const entry of readdirSync(outputDir)) {
  rmSync(join(outputDir, entry), { recursive: true, force: true });
}

cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// Caps from the scorer's reference: at most 160 KiB of dossier text, at most
// 4 screenshots of at most 256 KiB each, app/ within 993 entries / 16 MiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

import { mkdir, copyFile, cp, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = process.argv[2] || process.env.BASE_PATH;
if (!base || !base.startsWith('/') || !base.endsWith('/')) {
  throw new Error('Provide the GitHub Pages base path, for example /flashbit-ph-website/.');
}
const output = path.resolve(root, process.env.PAGES_OUTPUT_DIR || 'docs');
await mkdir(output, { recursive: true });
for (const file of ['styles.css', 'carousel.css', 'carousel.js']) {
  await copyFile(path.join(root, 'site/dist', file), path.join(output, file));
}
await cp(path.join(root, 'site/dist/assets'), path.join(output, 'assets'), { recursive: true });
execFileSync(process.execPath, [path.join(root, 'site/render.mjs')], {
  cwd: root,
  env: { ...process.env, BASE_PATH: base, OUTPUT_DIR: output },
  stdio: 'inherit',
});
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`GitHub Pages files: ${output}\nBase path: ${base}`);

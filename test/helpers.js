// Loads the pure helper functions straight out of index.html (between @core markers),
// so the tests exercise the code that actually ships.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const html = readFileSync(join(root, 'index.html'), 'utf8');

export function loadCore() {
  const parts = [...html.matchAll(/\/\* @core:start \*\/([\s\S]*?)\/\* @core:end \*\//g)].map((m) => m[1]);
  if (parts.length === 0) throw new Error('No @core regions found in index.html');
  return new Function(`${parts.join('\n')}\nreturn { uid, norm, esc, LANGS, langOf };`)();
}

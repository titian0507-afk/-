import { cpSync, mkdirSync, rmSync, statSync, readdirSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
if (dirname(output) !== root || basename(output) !== 'dist') throw new Error('Unsafe output path');
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const file of ['index.html', 'style.css', 'app.js', 'content.js', 'intro.js', 'cursor.js', 'spotlight.js']) {
  cpSync(resolve(root, file), resolve(output, file));
}
cpSync(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = resolve(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const files = walk(output);
const oversize = files.filter(file => statSync(file).size > 25 * 1024 * 1024);
if (oversize.length) throw new Error(`EdgeOne 25 MiB per-file limit exceeded: ${oversize.join(', ')}`);
console.log(`Prepared ${files.length} static files for EdgeOne Pages`);

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const collections = ['registros', 'fichas_pedagogicas', 'orientaciones_pedagogico_curriculares', 'fuentes'];

async function walk(relativeDirectory) {
  const entries = await readdir(path.join(root, relativeDirectory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.posix.join(relativeDirectory.replaceAll('\\', '/'), entry.name);
    if (entry.isDirectory()) files.push(...await walk(relativePath));
    else files.push(relativePath);
  }
  return files.sort((a, b) => a.localeCompare(b, 'es'));
}

async function digestCollection(relativeDirectory) {
  const files = await walk(relativeDirectory);
  const manifestLines = [];
  for (const relativePath of files) {
    const bytes = await readFile(path.join(root, relativePath));
    const fileSha256 = createHash('sha256').update(bytes).digest('hex');
    manifestLines.push(`${fileSha256}  ${relativePath}`);
  }
  return {
    archivos: files.length,
    sha256: createHash('sha256').update(manifestLines.join('\n'), 'utf8').digest('hex'),
    metodo: 'SHA-256 de líneas «sha256_archivo__dos_espacios__ruta_relativa_posix», ordenadas por ruta y unidas con LF',
  };
}

const result = {
  schema_version: '1.0',
  colecciones: {},
};

for (const collection of collections) {
  result.colecciones[collection] = await digestCollection(collection);
}

const outputDirectory = path.join(root, 'outputs', 'revision-sitio');
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, 'huellas-corpus.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');

console.log('HUELLAS DEL CORPUS GENERADAS');
for (const [collection, detail] of Object.entries(result.colecciones)) {
  console.log(`${collection}: ${detail.archivos} archivos · ${detail.sha256}`);
}

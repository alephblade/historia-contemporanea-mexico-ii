import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const outputDirectory = path.join(root, 'outputs', 'revision-sitio');
const sourceVerificationPath = path.join(root, 'verificaciones', 'fuentes_externas.json');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function routeForHtml(file) {
  const relative = path.relative(dist, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/index\.html$/, '')}`;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function plainText(html) {
  return decodeHtmlEntities(html)
    .replace(/\s+/g, ' ')
    .trim();
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function localTarget(href, sourceRoute) {
  const url = new URL(href, `https://sitio.local${sourceRoute}`);
  return decodeURIComponent(url.pathname).replace(/\/+/g, '/');
}

async function classifyLink({ href, sourceRoute, pageIds, verificationByUrl }) {
  const normalized = href.trim();
  if (!normalized || /^javascript:/i.test(normalized)) {
    return { tipo: 'marcador_incompleto', estado: 'requiere_correccion', destino: '', observacion: 'href vacío o JavaScript.' };
  }
  if (normalized === '#') {
    return { tipo: 'marcador_incompleto', estado: 'requiere_correccion', destino: '#', observacion: 'Ancla sin destino.' };
  }
  if (normalized.startsWith('#')) {
    const id = decodeURIComponent(normalized.slice(1));
    const valid = pageIds.has(id);
    return {
      tipo: 'ancla_en_pagina',
      estado: valid ? 'resuelto_localmente' : 'requiere_correccion',
      destino: normalized,
      observacion: valid ? '' : `No existe id="${id}" en la página.`,
    };
  }
  if (/^(?:mailto:|tel:)/i.test(normalized)) {
    return { tipo: 'contacto', estado: 'pendiente_revision_humana', destino: normalized, observacion: '' };
  }
  if (/^https?:\/\//i.test(normalized)) {
    const url = new URL(normalized);
    const verification = verificationByUrl.get(normalized);
    const state = verification?.estado === 'disponible'
      ? 'verificado_disponible'
      : verification?.estado === 'bloqueo_tecnico'
        ? 'verificado_bloqueo_tecnico'
        : verification?.estado === 'no_disponible'
          ? 'requiere_correccion'
          : 'pendiente_verificacion_externa';
    return {
      tipo: 'externo_institucional_o_fuente',
      estado: state,
      destino: normalized,
      observacion: verification?.evidencia ?? `Dominio: ${url.hostname}`,
    };
  }

  const pathname = localTarget(normalized, sourceRoute);
  const candidate = pathname.endsWith('/')
    ? path.join(dist, pathname, 'index.html')
    : path.join(dist, pathname);
  const fallback = path.join(dist, pathname, 'index.html');
  const valid = await exists(candidate) || await exists(fallback);
  return {
    tipo: 'ruta_interna',
    estado: valid ? 'resuelto_localmente' : 'requiere_correccion',
    destino: pathname,
    observacion: valid ? '' : 'El destino no existe en dist/.',
  };
}

function reviewerDecision(classification, sourceRoute) {
  if (classification.estado === 'resuelto_localmente') {
    return {
      decision_revisor: 'aprobado',
      evidencia_revisor: `${sourceRoute}: destino local presente en dist/.`,
    };
  }
  if (classification.estado === 'verificado_disponible') {
    return {
      decision_revisor: 'aprobado',
      evidencia_revisor: classification.observacion,
    };
  }
  if (classification.estado === 'verificado_bloqueo_tecnico') {
    return {
      decision_revisor: 'aprobado_con_observacion',
      evidencia_revisor: classification.observacion,
    };
  }
  return {
    decision_revisor: 'requiere_atencion',
    evidencia_revisor: classification.observacion || `${sourceRoute}: destino sin evidencia suficiente.`,
  };
}

async function main() {
  const sourceVerification = JSON.parse(await readFile(sourceVerificationPath, 'utf8'));
  const verificationByUrl = new Map(sourceVerification.fuentes.map((item) => [item.url_registrada, item]));
  const files = await walk(dist);
  const htmlFiles = files.filter((file) => file.endsWith('.html')).sort();
  const rows = [];

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    const sourceRoute = routeForHtml(htmlFile);
    const pageIds = new Set([...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]));
    const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];

    for (let index = 0; index < anchors.length; index += 1) {
      const attributes = anchors[index][1];
      const label = plainText(anchors[index][2]);
      const hrefMatch = attributes.match(/\bhref=(?:"([^"]*)"|'([^']*)')/i);
      const href = decodeHtmlEntities(hrefMatch ? (hrefMatch[1] ?? hrefMatch[2]) : '').trim();
      const classification = await classifyLink({ href, sourceRoute, pageIds, verificationByUrl });
      const decision = reviewerDecision(classification, sourceRoute);
      rows.push({
        pagina: sourceRoute,
        indice: index + 1,
        texto: label,
        href,
        ...classification,
        ...decision,
      });
    }
  }

  const summary = {
    schema_version: '1.0',
    paginas_html: htmlFiles.length,
    hipervinculos_totales: rows.length,
    rutas_internas_resueltas: rows.filter((row) => row.tipo === 'ruta_interna' && row.estado === 'resuelto_localmente').length,
    anclas_resueltas: rows.filter((row) => row.tipo === 'ancla_en_pagina' && row.estado === 'resuelto_localmente').length,
    externos_pendientes_revision: rows.filter((row) => row.estado === 'pendiente_verificacion_externa').length,
    urls_externas_activas_unicas: new Set(rows.filter((row) => row.tipo === 'externo_institucional_o_fuente').map((row) => row.destino)).size,
    fuentes_registradas_verificadas: sourceVerification.fuentes.length,
    fuentes_disponibles: sourceVerification.fuentes.filter((item) => item.estado === 'disponible').length,
    fuentes_con_bloqueo_tecnico: sourceVerification.fuentes.filter((item) => item.estado === 'bloqueo_tecnico').length,
    fuentes_no_disponibles: sourceVerification.fuentes.filter((item) => item.estado === 'no_disponible').length,
    marcadores_o_rutas_a_corregir: rows.filter((row) => row.estado === 'requiere_correccion').length,
    nota: 'Los recursos derivados planeados sin URL no son hipervínculos rotos; deben revisarse como estado editorial intencional.',
  };

  const headers = ['pagina', 'indice', 'texto', 'href', 'tipo', 'estado', 'destino', 'observacion', 'decision_revisor', 'evidencia_revisor'];
  const incompleteRows = rows.filter((row) => !row.decision_revisor || !row.evidencia_revisor);
  if (incompleteRows.length) throw new Error(`Hay ${incompleteRows.length} filas sin decisión o evidencia del revisor.`);
  const csv = `\uFEFF${[
    headers,
    ...rows.map((row) => headers.map((header) => row[header])),
  ].map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'inventario-hipervinculos.csv'), csv, 'utf8');
  await writeFile(path.join(outputDirectory, 'resumen-hipervinculos.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log('INVENTARIO DE HIPERVÍNCULOS GENERADO');
  console.log(`Páginas: ${summary.paginas_html} · Enlaces: ${summary.hipervinculos_totales} · Internos resueltos: ${summary.rutas_internas_resueltas} · Fuentes verificadas: ${summary.fuentes_registradas_verificadas} · Filas sin decisión: ${incompleteRows.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = normalizeBase(process.env.BASE_PATH || '/');

function normalizeBase(value) {
  if (!value || value === '/') return '/';
  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

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

function localPathFromHref(href, sourceRoute) {
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href) || href.startsWith('#')) return null;
  const resolved = new URL(href, `https://local.invalid${base === '/' ? '' : base.slice(0, -1)}${sourceRoute}`);
  let pathname = decodeURIComponent(resolved.pathname);
  if (base !== '/') {
    if (!pathname.startsWith(base)) return `__FUERA_DE_BASE__${pathname}`;
    pathname = `/${pathname.slice(base.length)}`;
  }
  return pathname.replace(/\/+/g, '/');
}

async function main() {
  const projection = JSON.parse(await readFile(path.join(root, 'data', 'proyeccion.publica.json'), 'utf8'));
  const sourceVerification = JSON.parse(await readFile(path.join(root, 'data', 'verificacion_fuentes.publica.json'), 'utf8'));
  const globalStyles = await readFile(path.join(root, 'src', 'styles', 'global.css'), 'utf8');
  for (const focusRule of [':focus-visible', '.skip-link:focus', 'main:focus']) {
    if (!globalStyles.includes(focusRule)) throw new Error(`Falta la regla global de foco ${focusRule}.`);
  }
  const readingById = new Map(projection.lecturas.map((reading) => [reading.id, reading]));
  const verificationByRoute = new Map(sourceVerification.fuentes.map((item) => {
    const reading = readingById.get(item.lectura_id);
    return [`/lecturas/${reading.slug}/`, item];
  }));
  const files = await walk(dist);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const forbidden = files.filter((file) => /(?:^|[\\/])fuentes(?:[\\/]|$)|\.(?:pdf|docx?|mp4|mov)$/i.test(path.relative(dist, file)));
  if (forbidden.length) throw new Error(`El artefacto contiene fuentes no publicables:\n${forbidden.join('\n')}`);

  const routes = new Set(htmlFiles.map(routeForHtml));
  const expectedCounts = {
    lecturas: [...routes].filter((route) => /^\/lecturas\/[^/]+\/$/.test(route)).length,
    unidades: [...routes].filter((route) => /^\/unidades\/[^/]+\/$/.test(route)).length,
    orientaciones: [...routes].filter((route) => /^\/orientaciones\/[^/]+\/$/.test(route)).length,
  };
  if (expectedCounts.lecturas !== projection.lecturas.length || expectedCounts.unidades !== projection.unidades.length || expectedCounts.orientaciones !== projection.orientaciones.length) {
    throw new Error(`Conteo de rutas inesperado: ${JSON.stringify(expectedCounts)}`);
  }

  const broken = [];
  const structuralIssues = [];
  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    const sourceRoute = routeForHtml(htmlFile);
    if (!html.includes('alt="Universidad Autónoma Chapingo"')) structuralIssues.push(`${sourceRoute}: falta el texto alternativo del logotipo institucional.`);
    if (!/<a\b[^>]*class="[^"]*skip-link[^"]*"[^>]*href="#contenido-principal"/i.test(html)) structuralIssues.push(`${sourceRoute}: falta el enlace de salto al contenido principal.`);
    if (!/<main\b[^>]*id="contenido-principal"[^>]*tabindex="-1"/i.test(html)) structuralIssues.push(`${sourceRoute}: el destino del enlace de salto no es enfocable.`);
    const expectedLogoPath = `${base === '/' ? '/' : base}identidad/logo-uach.png`;
    if (!html.includes(`src="${expectedLogoPath}"`)) structuralIssues.push(`${sourceRoute}: la ruta del logotipo no respeta BASE_PATH.`);
    if (!/<html\s[^>]*lang="es-MX"/i.test(html)) structuralIssues.push(`${sourceRoute}: falta lang="es-MX".`);
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    if (h1Count !== 1) structuralIssues.push(`${sourceRoute}: se esperaba un h1 y se encontraron ${h1Count}.`);
    const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
    for (let index = 1; index < headingLevels.length; index += 1) {
      if (headingLevels[index] > headingLevels[index - 1] + 1) {
        structuralIssues.push(`${sourceRoute}: salto de encabezado h${headingLevels[index - 1]} → h${headingLevels[index]}.`);
        break;
      }
    }
    const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length) structuralIssues.push(`${sourceRoute}: id duplicado ${[...new Set(duplicateIds)].join(', ')}.`);
    for (const table of html.match(/<table\b[\s\S]*?<\/table>/gi) ?? []) {
      if (!/<th\b/i.test(table)) structuralIssues.push(`${sourceRoute}: tabla sin encabezados th.`);
    }
    for (const control of html.match(/<(?:input|select|textarea)\b[^>]*>/gi) ?? []) {
      const id = control.match(/\bid="([^"]+)"/i)?.[1];
      if (!id || !new RegExp(`<label\\b[^>]*for="${id}"`, 'i').test(html)) structuralIssues.push(`${sourceRoute}: control de formulario sin etiqueta asociada${id ? ` (${id})` : ''}.`);
    }
    for (const match of html.matchAll(/\btabindex="([^"]+)"/gi)) {
      if (Number(match[1]) > 0) structuralIssues.push(`${sourceRoute}: tabindex positivo altera el orden secuencial (${match[1]}).`);
    }
    for (const link of html.match(/<a\b[^>]*target="_blank"[^>]*>/gi) ?? []) {
      const rel = link.match(/\brel="([^"]+)"/i)?.[1] ?? '';
      if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) structuralIssues.push(`${sourceRoute}: enlace en pestaña nueva sin noopener y noreferrer.`);
    }
    const hrefs = [...html.matchAll(/\bhref=(?:"([^"]*)"|'([^']*)')/gi)].map((match) => decodeHtmlEntities(match[1] ?? match[2]));
    for (const href of hrefs) {
      if (!href || href === '#' || /^javascript:/i.test(href)) {
        broken.push(`${sourceRoute} → ${href || '(vacío)'} (destino interactivo inválido)`);
        continue;
      }
      if (href.startsWith('#')) {
        const fragment = decodeURIComponent(href.slice(1));
        if (fragment && !ids.includes(fragment)) broken.push(`${sourceRoute} → ${href} (ancla inexistente)`);
        continue;
      }
      const pathname = localPathFromHref(href, sourceRoute);
      if (!pathname) continue;
      if (pathname.startsWith('__FUERA_DE_BASE__')) {
        broken.push(`${sourceRoute} → ${href} (fuera de BASE_PATH)`);
        continue;
      }
      const candidate = pathname.endsWith('/')
        ? path.join(dist, pathname, 'index.html')
        : path.join(dist, pathname);
      const fallback = path.join(dist, pathname, 'index.html');
      if (!(await exists(candidate)) && !(await exists(fallback))) broken.push(`${sourceRoute} → ${href}`);
    }
    if (/fuentes[\\/]lecturas|materiales_asociados_pendientes/i.test(html)) {
      broken.push(`${sourceRoute} expone una ruta local no publicable.`);
    }
    const verification = verificationByRoute.get(sourceRoute);
    if (verification) {
      if (!html.includes(`source-status-${verification.estado}`)) {
        structuralIssues.push(`${sourceRoute}: falta el estado operativo de la fuente ${verification.estado}.`);
      }
      const activeCanonicalLinks = hrefs.filter((href) => href === verification.url_registrada).length;
      if (verification.estado === 'no_disponible' && activeCanonicalLinks > 0) {
        broken.push(`${sourceRoute}: mantiene activa una fuente registrada como no disponible.`);
      }
      if (verification.estado !== 'no_disponible' && activeCanonicalLinks !== 2) {
        broken.push(`${sourceRoute}: se esperaban dos accesos descriptivos a la fuente activa y se encontraron ${activeCanonicalLinks}.`);
      }
    }
  }

  if (broken.length) throw new Error(`Enlaces o exposiciones inválidas:\n${broken.join('\n')}`);
  if (structuralIssues.length) throw new Error(`Accesibilidad estructural inválida:\n${structuralIssues.join('\n')}`);
  console.log('ENLACES INTERNOS APROBADOS');
  console.log(`HTML: ${htmlFiles.length} · Lecturas: ${expectedCounts.lecturas} · Unidades: ${expectedCounts.unidades} · Orientaciones: ${expectedCounts.orientaciones} · Fuentes locales: 0 · Estructura y foco por teclado: aprobados`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

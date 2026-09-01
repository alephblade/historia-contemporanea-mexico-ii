import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');

const canonicalUnits = [
  ['u1', 'Régimen Porfirista'],
  ['u2', 'Revolución Mexicana'],
  ['u3', 'Estado surgido de la Revolución'],
  ['u4', 'Consolidación del sistema político autoritario'],
  ['u5', 'Neoliberalismo y alternancia'],
];

const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const readText = async (relativePath) => readFile(path.join(root, relativePath), 'utf8');
const jsonText = (value) => `${JSON.stringify(value, null, 2)}\n`;
const sortedFiles = async (relativeDir, suffix) =>
  (await readdir(path.join(root, relativeDir)))
    .filter((name) => name.endsWith(suffix))
    .sort((a, b) => a.localeCompare(b, 'es'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function unique(values, label) {
  const seen = new Set();
  for (const value of values) {
    assert(!seen.has(value), `${label} duplicado: ${value}`);
    seen.add(value);
  }
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function unitRelations(record, unitByName) {
  const field = record.campos_1_a_1.unidad_tematica_uach;
  const names = [field.principal, ...(field.secundarias ?? [])];
  const alignments = [
    ...(record.conocimientos_habilidades_especificos ?? []),
    ...(record.aprendizajes_programa_apoyados ?? []),
  ].flatMap((item) => item.alineacion_curricular ?? []);

  return names.map((name, index) => {
    const unit = unitByName.get(name);
    assert(unit, `${record.id_recurso}: unidad desconocida «${name}»`);
    const scopes = alignments
      .filter((alignment) => alignment.unidad_id === unit.id)
      .map((alignment) => alignment.alcance)
      .filter(Boolean);
    return {
      id: unit.id,
      nombre: unit.nombre,
      slug: unit.slug,
      rol: index === 0 ? 'principal' : 'secundaria',
      alcances: [...new Set(scopes)].sort(),
    };
  });
}

function orientationUnitRelations(record, unitById) {
  return record.unidades.map((relation) => {
    const unit = unitById.get(relation.id);
    assert(unit, `${record.id_orientacion}: unidad desconocida ${relation.id}`);
    return {
      id: unit.id,
      nombre: unit.nombre,
      slug: unit.slug,
      rol: relation.rol === 'principal' ? 'principal' : 'secundaria',
      alcances: relation.alcance ? [relation.alcance] : [],
    };
  });
}

async function buildProjection() {
  const units = await readJson('data/unidades.json');
  const sourceVerificationRaw = await readText('verificaciones/fuentes_externas.json');
  const sourceVerification = JSON.parse(sourceVerificationRaw);
  assert(sourceVerification.schema_version === '1.0', 'La verificación de fuentes debe usar schema_version 1.0.');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(sourceVerification.fecha_revision), 'La verificación de fuentes debe tener una fecha ISO.');
  assert(Array.isArray(sourceVerification.fuentes), 'La verificación de fuentes debe contener un arreglo fuentes.');
  assert(units.length === 5, 'El catálogo público debe contener las cinco unidades canónicas.');
  canonicalUnits.forEach(([id, name], index) => {
    assert(units[index]?.id === id && units[index]?.nombre === name, `La unidad ${id} no coincide con el vocabulario canónico.`);
  });
  unique(units.map((unit) => unit.slug), 'Slug de unidad');
  const unitByName = new Map(units.map((unit) => [unit.nombre, unit]));
  const unitById = new Map(units.map((unit) => [unit.id, unit]));

  const recordFiles = await sortedFiles('registros', '.json');
  const orientationFiles = await sortedFiles('orientaciones_pedagogico_curriculares/registros', '.json');
  assert(recordFiles.length === 20, `Se esperaban 20 registros; se encontraron ${recordFiles.length}.`);
  assert(orientationFiles.length >= 1, 'Debe existir al menos una orientación.');

  const records = [];
  const sourceParts = [];
  for (const file of recordFiles) {
    const relativePath = `registros/${file}`;
    const raw = await readText(relativePath);
    sourceParts.push(`${relativePath}\n${raw}`);
    const record = JSON.parse(raw);
    assert(file === `${record.id_recurso}.json`, `${file}: el nombre no coincide con id_recurso.`);
    assert(record.schema_version === '2.0', `${record.id_recurso}: schema_version debe ser 2.0.`);
    assert(/^https?:\/\//.test(record.campos_1_a_1.fuente_url.valor), `${record.id_recurso}: fuente_url debe ser HTTP(S).`);
    records.push(record);
  }
  unique(records.map((record) => record.id_recurso), 'ID de lectura');
  unique(records.map((record) => record.slug), 'Slug de lectura');
  const recordById = new Map(records.map((record) => [record.id_recurso, record]));

  assert(sourceVerification.fuentes.length === records.length, 'Debe existir una verificación operativa por cada lectura.');
  unique(sourceVerification.fuentes.map((item) => item.lectura_id), 'ID de verificación de fuente');
  const allowedSourceStates = new Set(['disponible', 'bloqueo_tecnico', 'no_disponible']);
  const sourceVerificationByReadingId = new Map();
  for (const item of sourceVerification.fuentes) {
    const record = recordById.get(item.lectura_id);
    assert(record, `Verificación de fuente para lectura inexistente: ${item.lectura_id}.`);
    assert(item.url_registrada === record.campos_1_a_1.fuente_url.valor, `${item.lectura_id}: la URL verificada no coincide con el registro canónico.`);
    assert(allowedSourceStates.has(item.estado), `${item.lectura_id}: estado de verificación desconocido.`);
    assert(typeof item.evidencia === 'string' && item.evidencia.trim(), `${item.lectura_id}: falta evidencia de verificación.`);
    sourceVerificationByReadingId.set(item.lectura_id, item);
  }
  sourceParts.push(`verificaciones/fuentes_externas.json\n${sourceVerificationRaw}`);

  const orientationsRaw = [];
  for (const file of orientationFiles) {
    const relativePath = `orientaciones_pedagogico_curriculares/registros/${file}`;
    const raw = await readText(relativePath);
    sourceParts.push(`${relativePath}\n${raw}`);
    const orientation = JSON.parse(raw);
    assert(file === `${orientation.id_orientacion}.json`, `${file}: el nombre no coincide con id_orientacion.`);
    assert(orientation.schema_version === '1.1', `${orientation.id_orientacion}: schema_version debe ser 1.1.`);
    orientationsRaw.push(orientation);
  }
  unique(orientationsRaw.map((item) => item.id_orientacion), 'ID de orientación');
  unique(orientationsRaw.map((item) => item.slug), 'Slug de orientación');

  const orientationIdsByReading = new Map(records.map((record) => [record.id_recurso, []]));
  const orientations = [];
  for (const orientation of orientationsRaw) {
    const expectedContent = `orientaciones_pedagogico_curriculares/contenido/${orientation.id_orientacion}.md`;
    assert(orientation.contenido_path === expectedContent, `${orientation.id_orientacion}: contenido_path no coincide con la ruta estable esperada.`);
    const rawMarkdown = await readText(expectedContent);
    sourceParts.push(`${expectedContent}\n${rawMarkdown}`);
    const parsed = matter(rawMarkdown);
    assert(parsed.data.id_orientacion === orientation.id_orientacion, `${orientation.id_orientacion}: el frontmatter no coincide con el registro.`);
    assert(parsed.data.slug === orientation.slug, `${orientation.id_orientacion}: el slug del Markdown no coincide.`);
    assert(parsed.data.schema_version === orientation.schema_version, `${orientation.id_orientacion}: schema_version del Markdown no coincide con el registro.`);
    assert(parsed.content.trim().length > 0, `${orientation.id_orientacion}: contenido Markdown vacío.`);

    assert(Array.isArray(orientation.rutas_analisis) && orientation.rutas_analisis.length > 0, `${orientation.id_orientacion}: faltan rutas de análisis estructuradas.`);
    unique(orientation.rutas_analisis.map((route) => route.id), `${orientation.id_orientacion}: ID de ruta de análisis`);
    const routeIds = new Set(orientation.rutas_analisis.map((route) => route.id));
    for (const route of orientation.rutas_analisis) {
      assert(/^[A-Z]$/.test(route.id), `${orientation.id_orientacion}: ID de ruta inválido ${route.id}.`);
      for (const field of ['titulo', 'pregunta_guia', 'intervencion_didactica', 'evidencia_esperada']) {
        assert(typeof route[field] === 'string' && route[field].trim(), `${orientation.id_orientacion}: ruta ${route.id} sin ${field}.`);
      }
    }

    const linkedReadings = orientation.lecturas_vinculadas.map((link) => {
      const record = recordById.get(link.lectura_id);
      assert(record, `${orientation.id_orientacion}: lectura inexistente ${link.lectura_id}.`);
      const knownReferences = new Set([
        ...(record.conocimientos_habilidades_especificos ?? []).map((item) => item.id),
        ...(record.aprendizajes_programa_apoyados ?? []).map((item) => item.id),
        ...(record.referencias_tematicas ?? []).map((item) => item.id),
      ]);
      for (const reference of link.referencias_canonicas ?? []) {
        assert(knownReferences.has(reference), `${orientation.id_orientacion}: referencia inexistente ${link.lectura_id}/${reference}.`);
      }
      assert(Array.isArray(link.rutas_analisis) && link.rutas_analisis.length > 0, `${orientation.id_orientacion}: ${link.lectura_id} no declara rutas de análisis.`);
      unique(link.rutas_analisis, `${orientation.id_orientacion}: ruta de ${link.lectura_id}`);
      for (const routeId of link.rutas_analisis) {
        assert(routeIds.has(routeId), `${orientation.id_orientacion}: ${link.lectura_id} refiere una ruta inexistente ${routeId}.`);
      }
      orientationIdsByReading.get(link.lectura_id).push(orientation.id_orientacion);
      return {
        lectura_id: link.lectura_id,
        slug: record.slug,
        titulo: record.campos_1_a_1.titulo.valor,
        unidad_principal: record.campos_1_a_1.unidad_tematica_uach.principal,
        rutas_analisis: link.rutas_analisis,
        alcance: link.alcance,
        referencias_canonicas: link.referencias_canonicas ?? [],
      };
    });

    for (const routeId of routeIds) {
      assert(linkedReadings.some((link) => link.rutas_analisis.includes(routeId)), `${orientation.id_orientacion}: la ruta ${routeId} no tiene lecturas vinculadas.`);
    }
    for (const coverage of orientation.cobertura_curricular) {
      assert(Array.isArray(coverage.rutas_analisis), `${orientation.id_orientacion}: la cobertura «${coverage.aprendizaje}» no declara rutas_analisis.`);
      for (const routeId of coverage.rutas_analisis) {
        assert(routeIds.has(routeId), `${orientation.id_orientacion}: cobertura con ruta inexistente ${routeId}.`);
      }
    }

    orientations.push({
      id: orientation.id_orientacion,
      tipo: orientation.tipo_orientacion,
      titulo: orientation.titulo,
      slug: orientation.slug,
      audiencia: orientation.audiencia,
      estado_editorial: orientation.estado_editorial,
      unidades: orientationUnitRelations(orientation, unitById),
      descripcion: orientation.descripcion,
      proposito: orientation.proposito,
      rutas_analisis: orientation.rutas_analisis,
      lecturas_vinculadas: linkedReadings,
      evidencia_integradora: orientation.evidencia_integradora,
      cobertura_curricular: orientation.cobertura_curricular,
      accesibilidad: orientation.accesibilidad,
      licencia_y_creditos: orientation.licencia_y_creditos,
      markdown: parsed.content.trim(),
    });
  }

  const readings = [];
  for (const record of records) {
    const fichaPath = `fichas_pedagogicas/${record.id_recurso}_ficha_pedagogica.md`;
    const rawFicha = await readText(fichaPath);
    sourceParts.push(`${fichaPath}\n${rawFicha}`);
    const ficha = matter(rawFicha);
    assert(ficha.data.lectura_id === record.id_recurso, `${record.id_recurso}: lectura_id de la ficha no coincide.`);
    assert(ficha.data.slug === record.slug, `${record.id_recurso}: el slug de la ficha no coincide.`);
    assert(ficha.content.trim().length > 0, `${record.id_recurso}: ficha Markdown vacía.`);
    const resources = ficha.data.recursos_derivados ?? [];
    assert(resources.length === 3, `${record.id_recurso}: se esperaban tres recursos derivados planeados.`);
    for (const resource of resources) {
      assert(resource.estado === 'planeado', `${record.id_recurso}: ${resource.id} no puede proyectarse como disponible sin registro propio publicado.`);
      assert(resource.id.startsWith(`${record.id_recurso}_RD_`), `${record.id_recurso}: recurso derivado con prefijo incorrecto.`);
    }
    const fields = record.campos_1_a_1;
    readings.push({
      id: record.id_recurso,
      slug: record.slug,
      estado_editorial: record.estado_editorial,
      titulo: fields.titulo.valor,
      autoria: fields.autoria.valor,
      descripcion_fuente: fields.descripcion_fuente.valor,
      anio: fields.anio.valor ?? null,
      tipo_material: {
        codigo: fields.tipo_material.codigo ?? null,
        etiqueta: fields.tipo_material.valor,
      },
      acceso: fields.acceso.valor,
      fuente_url: fields.fuente_url.valor,
      resumen: fields.resumen_analitico.valor,
      unidades: unitRelations(record, unitByName),
      temas: fields.temas_conceptos_clave.valor,
      niveles: fields.nivel_sugerido.valor,
      ficha: {
        id: ficha.data.id_ficha,
        estado: ficha.data.estado_pedagogico,
        markdown: ficha.content.trim(),
        recursos_derivados: resources.map(({ id, tipo, estado }) => ({ id, tipo, estado })),
      },
      orientaciones_relacionadas: orientationIdsByReading.get(record.id_recurso).sort(),
    });
  }

  const projection = {
    schema_version: '1.0',
    generado_desde: 'registros_canónicos_y_markdown',
    unidades: units,
    lecturas: readings,
    orientaciones: orientations,
  };

  const schema = await readJson('schemas/proyeccion-publica.schema.json');
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  assert(validate(projection), `Proyección inválida:\n${ajv.errorsText(validate.errors, { separator: '\n' })}`);

  const sourceHash = createHash('sha256').update(sourceParts.sort().join('\n---\n')).digest('hex');
  const manifest = {
    schema_version: '1.0',
    source_sha256: sourceHash,
    conteos: { lecturas: readings.length, fichas: readings.length, orientaciones: orientations.length, unidades: units.length },
    exclusiones: ['fuentes/lecturas/', 'fuentes/materiales_asociados_pendientes/'],
  };
  const csvHeaders = ['id_recurso', 'slug', 'titulo', 'autoria', 'anio', 'tipo_material', 'acceso', 'fuente_url', 'resumen', 'unidad_principal', 'unidades_relacionadas', 'niveles', 'estado_editorial'];
  const csvRows = readings.map((reading) => [
    reading.id,
    reading.slug,
    reading.titulo,
    reading.autoria,
    reading.anio,
    reading.tipo_material.etiqueta,
    reading.acceso,
    reading.fuente_url,
    reading.resumen,
    reading.unidades.find((unit) => unit.rol === 'principal')?.nombre,
    reading.unidades.filter((unit) => unit.rol === 'secundaria').map((unit) => unit.nombre).join('|'),
    reading.niveles.join('|'),
    reading.estado_editorial,
  ]);
  const csv = `\uFEFF${[csvHeaders, ...csvRows].map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;

  return new Map([
    ['data/proyeccion.publica.json', jsonText(projection)],
    ['data/lecturas.publicas.json', jsonText(readings)],
    ['data/orientaciones.publicas.json', jsonText(orientations)],
    ['data/proyeccion.manifest.json', jsonText(manifest)],
    ['data/verificacion_fuentes.publica.json', jsonText({
      schema_version: sourceVerification.schema_version,
      revision_id: sourceVerification.revision_id,
      fecha_revision: sourceVerification.fecha_revision,
      anexo: sourceVerification.anexo,
      fuentes: records.map((record) => {
        const verification = sourceVerificationByReadingId.get(record.id_recurso);
        return {
          lectura_id: verification.lectura_id,
          url_registrada: verification.url_registrada,
          estado: verification.estado,
          evidencia: verification.evidencia,
        };
      }),
    })],
    ['exports/lecturas.csv', csv],
  ]);
}

async function main() {
  const outputs = await buildProjection();
  if (checkOnly) {
    for (const [relativePath, expected] of outputs) {
      let actual;
      try {
        actual = await readText(relativePath);
      } catch {
        throw new Error(`Falta la salida versionada ${relativePath}. Ejecute npm run project.`);
      }
      assert(actual === expected, `${relativePath} está desactualizado respecto del corpus canónico.`);
    }
    console.log('PROYECCIÓN PÚBLICA APROBADA');
    return;
  }

  for (const [relativePath, content] of outputs) {
    await mkdir(path.dirname(path.join(root, relativePath)), { recursive: true });
    await writeFile(path.join(root, relativePath), content, 'utf8');
  }
  const projection = JSON.parse(outputs.get('data/proyeccion.publica.json'));
  console.log('PROYECCIÓN PÚBLICA GENERADA');
  console.log(`Lecturas: ${projection.lecturas.length} · Unidades: ${projection.unidades.length} · Orientaciones: ${projection.orientaciones.length} · CSV: exports/lecturas.csv`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

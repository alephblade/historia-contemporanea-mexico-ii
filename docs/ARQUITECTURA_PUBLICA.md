# Arquitectura de la proyección pública

## Fuente de verdad y frontera de exposición

La aplicación no consulta directamente campos curatoriales internos. `scripts/proyectar_contenido.mjs` es la frontera explícita entre el corpus canónico y la interfaz. Selecciona título, autoría, descripción, año, tipología, acceso, URL institucional, resumen, unidades, temas, nivel y estado editorial; no proyecta evidencias, rutas locales, nombres físicos de PDF, revisiones internas ni notas técnicas del registro.

Las fichas y orientaciones se leen como Markdown con *frontmatter*. Sus identificadores y *slugs* deben coincidir con sus registros relacionados antes de incorporarse a la proyección.

La disponibilidad técnica de las fuentes se registra por separado en `verificaciones/fuentes_externas.json`. Es una observación operativa fechada: no modifica la URL canónica, la modalidad de acceso ni el estado editorial. El generador exige una correspondencia exacta entre cada verificación y su registro.

## Salidas deterministas

| Archivo | Función |
| --- | --- |
| `data/proyeccion.publica.json` | Paquete público completo que consume Astro. |
| `data/lecturas.publicas.json` | Vista de intercambio de las lecturas. |
| `data/orientaciones.publicas.json` | Vista de intercambio de las orientaciones. |
| `data/proyeccion.manifest.json` | Huella SHA-256 de las fuentes y conteos esperados. |
| `data/verificacion_fuentes.publica.json` | Estado operativo fechado de las 20 URL canónicas. |
| `exports/lecturas.csv` | Intercambio tabular versionado; no es editable como fuente primaria. |

El generador no añade una fecha de ejecución: el mismo corpus produce exactamente los mismos bytes. `npm run validate:projection` regenera en memoria las salidas y falla si los archivos versionados difieren.

## Validación

`schemas/proyeccion-publica.schema.json` define la forma ejecutable de la proyección. La compuerta comprueba además:

- 20 identificadores y *slugs* únicos de lectura;
- una ficha existente y coherente por lectura;
- cinco unidades con etiquetas canónicas y *slugs* estables;
- identificador, *slug*, contenido y relaciones válidas de cada orientación;
- rutas de análisis únicas, completas y efectivamente vinculadas a lecturas existentes;
- existencia de cada lectura y referencia canónica vinculada;
- tres recursos derivados por ficha, todavía `planeado` y sin URL;
- URL institucional HTTP(S) para cada lectura.
- una verificación operativa por lectura, con ID y URL idénticos al registro canónico.

## Relaciones curriculares

El rol `principal` o `secundaria` procede de `unidad_tematica_uach`. Los alcances `directo`, `contextual` y `secundario` se reúnen exclusivamente desde `alineacion_curricular`. Si una relación secundaria no declara alcance estructurado, la interfaz muestra “Alcance no explicitado”; no inventa una clasificación.

La orientación de Unidad 3 aporta sus propios alcances explícitos y no modifica la unidad principal de ninguna lectura. En el esquema 1.1, `rutas_analisis` es la fuente estructurada de títulos, preguntas guía, intervenciones y evidencias esperadas; los enlaces de lectura solo conservan los identificadores de las rutas que les corresponden.

## Renderizado Markdown

El Markdown se convierte durante la construcción y se sanea con una lista permitida de HTML. Los encabezados se desplazan un nivel para preservar un único `h1` por página. Las tablas conservan encabezados semánticos y se presentan dentro de una región desplazable por teclado en pantallas estrechas.

## Base de GitHub Pages

Todas las rutas internas pasan por `src/lib/paths.ts` y respetan `BASE_PATH`. `astro.config.mjs` usa salida `static`, barras finales y acepta `SITE_URL`/`BASE_PATH` solo cuando existan decisiones institucionales.

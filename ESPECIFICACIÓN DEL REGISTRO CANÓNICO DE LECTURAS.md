# Especificación del registro canónico de lecturas

**Versión 2.0 — 31 de agosto de 2026**

## Propósito

Este documento define la unidad de información verificable del repositorio: un registro por lectura. El registro canónico será la fuente de verdad para derivar, cuando corresponda, la hoja de cálculo, la ficha pedagógica del recurso y futuros formatos de consulta.

La hoja de cálculo existente se conserva como inventario de trabajo y como posible salida de interoperabilidad; no sustituye al registro canónico ni a la evidencia documental que lo respalda.

## Marco curricular canónico

Las unidades permitidas son exclusivamente:

1. Régimen Porfirista
2. Revolución Mexicana
3. Estado surgido de la Revolución
4. Consolidación del sistema político autoritario
5. Neoliberalismo y alternancia

Una lectura puede vincularse con más de una unidad. Se registra primero la unidad principal y las demás en orden de pertinencia, separadas por `|` en la hoja maestra.

## Campos bibliográficos y de curaduría (1:1)

| N.º | Campo | Regla |
| --- | --- | --- |
| 1 | `id_recurso` | Identificador único `HIST2_0000`; máximo 15 caracteres. |
| 2 | `Indice` | Control secuencial `lectura_N`; máximo 20 caracteres. |
| 3 | `Título` | Título oficial del recurso; máximo 150 caracteres. |
| 4 | `Nombre del archivo` | Nombre físico normalizado; máximo 60 caracteres. |
| 5 | `Autoría` | Autoría individual, colectiva o institucional verificable; máximo 200 caracteres. |
| 6 | `Descripción de la Fuente` | Contexto editorial y documental; máximo 300 caracteres. |
| 7 | `Año (si se conoce)` | Año de la edición o publicación consultada, con cuatro dígitos. |
| 8 | `Tipo de material` | Tipología documental concisa; máximo 60 caracteres. |
| 9 | `Acceso (abierto/institucional)` | `Abierto` o `Institucional`, salvo justificación documentada. |
| 10 | `Fuente / URL` | URL de procedencia o acceso; máximo 200 caracteres. |
| 11 | `Resumen analítico (≤6 líneas)` | Síntesis interpretativa de 80–110 palabras, máximo 750 caracteres. |
| 12 | `Unidad temática UACH` | Una o más unidades canónicas, separadas por `|`; máximo 150 caracteres. |
| 13 | `Temas y conceptos clave` | Descriptores separados por comas; máximo 500 caracteres. |
| 14 | `Nivel sugerido` | `introductorio`, `intermedio`, `avanzado` o combinación justificada; máximo 30 caracteres. |

## Control editorial y publicación

El registro canónico añade los siguientes atributos para permitir su validación y proyección hacia el repositorio web, sin alterar los catorce campos de la hoja maestra:

| Campo | Regla |
| --- | --- |
| `slug` | URL pública única, legible y estable. |
| `estado_editorial` | `borrador`, `en_revision`, `publicable`, `publicado` o `archivado`. |
| `version_registro` | Versión del contenido y de sus decisiones de curaduría. |
| `fecha_alta`, `fecha_modificacion` | Fechas ISO de control del registro, distintas de las fechas bibliográficas. |

El identificador se conserva como `HIST2_0000`; el `slug` es un dato separado y no reemplaza ni transforma ese identificador.

## Relaciones pedagógicas (1:N)

| Campo | Capacidad máxima | Unidad de captura |
| --- | ---: | --- |
| `conocimientos_habilidades_especificos` | 12 | `ch_1` a `ch_12` |
| `aprendizajes_programa_apoyados` | 9 | `aprendizaje_1` a `aprendizaje_9` |
| `referencias_tematicas` | 26 | `referencia_1` a `referencia_26` |

Los límites son capacidades, no cuotas. Un registro sin relación demostrable se conserva nulo; no se sustituye por la palabra “VACÍA”.

## Evidencia y estados de verificación

Todo dato nuevo o corregido debe conservar, fuera de la celda de presentación, un arreglo `evidencias` de objetos con estos atributos:

* `fuente`: nombre del PDF local o URL de origen.
* `localizador`: página, portada, índice, sección o fragmento identificable.
* `estado`: `verificado_fuente_primaria`, `verificado_fuente_institucional`, `derivado_de_texto_verificado`, `pendiente_revision` o `conflicto_detectado`.
* `nota`: explicación breve cuando exista ambigüedad o decisión de curaduría.

Los datos en conflicto no se incorporan a la hoja maestra como definitivos hasta resolverlos. Las unidades, niveles, resúmenes y relaciones pedagógicas son decisiones de curaduría: deben basarse en el texto y declararse como tales, no presentarse como metadatos editoriales.

Las relaciones de conocimientos, habilidades y aprendizajes pueden incluir un arreglo `alineacion_curricular` con `unidad_id`, `referente_programa`, `alcance` (`directo`, `contextual` o `secundario`) y `nota` opcional. Esta estructura sustituye la dependencia exclusiva de justificaciones curriculares en texto libre.

## Secuencia de trabajo

1. Verificar y completar los catorce campos 1:1 de las veinte lecturas.
2. Consolidar la hoja maestra como inventario revisado.
3. Migrar los pilotos aprobados al esquema vigente antes de tomarlos como modelo de automatización.
4. Repetir la captura relacional para las lecturas restantes y derivar las fichas pedagógicas solo después de aprobar la base curatorial.
5. Generar proyecciones públicas, CSV y Excel desde los registros canónicos validados.

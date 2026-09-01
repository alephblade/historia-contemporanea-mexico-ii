# Arquitectura y nomenclatura de recursos derivados

**Versión 1.0 — 31 de agosto de 2026**  
**Estado:** norma de planeación para la segunda etapa del repositorio

## 1. Propósito

Cada lectura puede articular un conjunto de recursos derivados que amplíen su mediación y evaluación. Para esta segunda etapa se prevé, por lectura, una tríada mínima: **video**, **infografía** y **cuestionario integrador**. La tríada no se considera publicada hasta que exista el recurso, se verifique su contenido y se actualice su estado.

El cuestionario no evalúa únicamente la lectura: recupera de manera explícita la lectura, el video y la infografía vinculados. Esta relación evita duplicar preguntas y permite valorar comprensión, integración y transferencia.

## 2. Identificadores y nombres

El identificador de la lectura es el prefijo estable. Cada recurso derivado usa el formato:

```text
HIST2_0001_RD_<TIPO>_<NÚMERO>
```

| Tipo | Código | Ejemplo de identificador | Nombre de archivo de contenido | Nombre sugerido de archivo publicado |
| --- | --- | --- | --- | --- |
| Video | `VID` | `HIST2_0001_RD_VID_01` | `HIST2_0001_RD_VID_01.md` | `hist2_0001-rd-vid-01.mp4` |
| Infografía | `INF` | `HIST2_0001_RD_INF_01` | `HIST2_0001_RD_INF_01.md` | `hist2_0001-rd-inf-01.pdf` o `.svg` |
| Cuestionario | `CUE` | `HIST2_0001_RD_CUE_01` | `HIST2_0001_RD_CUE_01.md` | `hist2_0001-rd-cue-01.pdf` o versión web |

El número permite versiones o recursos alternos del mismo tipo. Los identificadores conservan el guion bajo del registro canónico; los nombres públicos y URLs usan minúsculas y guiones medios.

## 3. Taxonomía y campos mínimos

Todo recurso derivado tendrá un registro propio, separado de la ficha pedagógica, con los siguientes campos:

| Campo | Función |
| --- | --- |
| `id_recurso_derivado` | Identificador único según la nomenclatura anterior. |
| `lectura_origen_id` | Lectura de la que se deriva, por ejemplo `HIST2_0001`. |
| `tipo` | `video`, `infografia` o `cuestionario`. |
| `titulo` | Título pedagógico visible. |
| `descriptor` | Resumen de 40–80 palabras: contenido, propósito y uso. |
| `estado_recurso` | `planeado`, `en_produccion`, `en_revision`, `publicado` o `archivado`. |
| `slug` | Ruta pública única. |
| `unidades` | Unidad principal y secundarias heredadas o justificadamente ajustadas. |
| `conocimientos_habilidades_ids` | Identificadores `ch_*` del registro canónico que moviliza. |
| `evidencias_desempeno` | Productos o desempeños que apoya. |
| `insumos_requeridos` | Lectura y otros recursos que deben revisarse antes de usarlo. |
| `relaciones` | Vínculos `se_deriva_de`, `complementa` o `evalua`. |
| `duracion_o_tiempo` | Duración del video o tiempo estimado de consulta y resolución. |
| `accesibilidad` | Subtítulos y transcripción para video; texto alternativo o versión legible para infografía; formato accesible para cuestionario. |
| `licencia_y_creditos` | Autoría, licencias de imágenes, música, datos y fuentes. |
| `url_publica` | Nula mientras el recurso no esté publicado. |

## 4. Relaciones de la tríada

| Recurso | Función pedagógica | Debe relacionarse con |
| --- | --- | --- |
| Video | Contextualizar y sintetizar un proceso; ofrecer un punto de entrada audiovisual. | Lectura de origen e infografía. |
| Infografía | Visualizar cronología, actores, conceptos o relaciones causales. | Lectura de origen y video. |
| Cuestionario integrador | Comprobar comprensión y articulación de los tres recursos, con reactivos identificados por su insumo. | Lectura de origen, video e infografía. |

Un cuestionario deberá declarar para cada reactivo el insumo principal (`lectura`, `video`, `infografia` o `integracion`) y la habilidad movilizada. Así podrá verificarse que no replica la lectura ni se limita a memoria literal.

## 5. Ejemplo de planeación para HIST2_0001

| ID | Título visible | Descriptor | Estado | Relación principal |
| --- | --- | --- | --- | --- |
| `HIST2_0001_RD_VID_01` | *El Porfiriato: modernización, control y contradicciones* | Cápsula audiovisual que contextualiza el orden y progreso, los mecanismos de control político y sus costos sociales. | `planeado` | Complementa la exposición digital. |
| `HIST2_0001_RD_INF_01` | *Modernización y contradicciones del Porfiriato* | Infografía que articula centralización, modernización, desigualdad, oposición y crisis de 1910. | `planeado` | Visualiza las relaciones de las láminas 6, 8, 9 y 10. |
| `HIST2_0001_RD_CUE_01` | *Comprensión integrada del Porfiriato* | Cuestionario que integra evidencias de la lectura, el video y la infografía para valorar comprensión y argumentación breve. | `planeado` | Evalúa la tríada completa. |

## 6. Organización recomendada en el repositorio

```text
registros/
  HIST2_0001.json                         # fuente canónica de la lectura
fichas_pedagogicas/
  HIST2_0001_ficha_pedagogica.md          # interfaz legible con metadatos YAML
recursos_derivados/
  registros/
    HIST2_0001_RD_VID_01.json
    HIST2_0001_RD_INF_01.json
    HIST2_0001_RD_CUE_01.json
  contenido/
    HIST2_0001_RD_VID_01.md
    HIST2_0001_RD_INF_01.md
    HIST2_0001_RD_CUE_01.md
public/media/
  hist2_0001-rd-inf-01.pdf                # solo si licencia y tamaño lo permiten
```

Los registros JSON son fuente de verdad y los Markdown son contenido o guion editable. Astro puede leer los metadatos YAML de las fichas y contenidos para crear rutas, filtros y tarjetas. Los recursos de video pesados no deben subir automáticamente al repositorio: la decisión de alojamiento deberá considerar derechos, tamaño, ancho de banda y estabilidad del servicio.

## 7. Regla para la ficha pedagógica

El apartado 14 mostrará una tabla de relación, no casillas vacías. Debe declarar identificador, tipo, descriptor breve, estado y vínculo pedagógico. Un recurso `planeado` se muestra como tal; nunca se presenta como disponible ni se le asigna URL pública antes de publicarse.

## 8. Validaciones futuras

Antes de publicar un recurso derivado, la automatización deberá comprobar:

1. Identificador, `slug` y lectura de origen existentes y únicos.
2. Coherencia entre unidades, conocimientos/habilidades y ficha pedagógica.
3. Existencia de créditos, licencia y atributos de accesibilidad requeridos para su tipo.
4. Que todo cuestionario integrador cite sus insumos y clasifique cada reactivo.
5. Que `url_publica` exista solo cuando el estado sea `publicado`.

## 9. Relación con orientaciones pedagógico-curriculares

Las orientaciones pedagógico-curriculares no son recursos derivados de una única lectura. Articulan varios registros, fichas y, cuando corresponda, recursos derivados para un propósito docente de unidad o transversalidad. Su modelo, nomenclatura, controles e interfaz se definen en `ARQUITECTURA DE ORIENTACIONES PEDAGÓGICO-CURRICULARES.md`.

Un video, infografía o cuestionario puede ser enlazado desde una orientación, pero conserva su propio registro y su relación de origen con la lectura. La orientación solo organiza su uso; no duplica ni altera la fuente de verdad de cada objeto.

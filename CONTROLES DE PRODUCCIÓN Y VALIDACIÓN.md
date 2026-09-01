# Controles de producción y validación

Repositorio de lecturas de Historia Contemporánea de México II · Preparatoria Agrícola · Universidad Autónoma Chapingo  
**Versión 1.0 — 31 de agosto de 2026**

Este documento convierte los criterios del Instrumento rector, la Especificación del registro canónico, el Vocabulario controlado y la plantilla de ficha pedagógica en compuertas obligatorias de producción. No los sustituye ni crea una segunda fuente normativa.

## Regla central

Un registro o ficha no se considera terminado porque tenga todos sus campos llenos. Solo puede pasar a `en_revision` cuando supera los controles automáticos y la revisión humana de evidencia, alcance curricular y límites de la fuente. Solo podrá pasar a `publicable` tras la revisión académica correspondiente.

## Compuerta 0. Preservación e identificación de la fuente

Antes de redactar un registro:

1. Confirmar que el archivo fuente se encuentra en `fuentes/lecturas/HIST2_XXXX/` y que su nombre físico coincide con el registro.
2. Revisar visualmente portada, créditos, índice, colofón, estructura y páginas de los apartados que sostendrán las relaciones curriculares.
3. Distinguir: datos de la fuente, metadatos técnicos, inferencias de curaduría y decisiones pedagógicas.
4. Cuando exista URL, verificar que sea institucional o identificable y anotar fecha o condición de la comprobación. Si no puede verificarse, registrar la limitación; no inventar un enlace.

## Compuerta 1. Integridad del registro canónico

El archivo `registros/HIST2_XXXX.json` debe:

- usar `schema_version: "2.0"`, identificador, índice, *slug*, estado y fechas de control;
- conservar los catorce campos 1:1 con `valor` y evidencia trazable;
- usar exclusivamente `evidencias` como arreglo; nunca el campo legado singular `evidencia`;
- emplear las cinco unidades canónicas y los valores del vocabulario controlado;
- incluir fuente, localizador y estado en cada evidencia;
- justificar cada relación de conocimiento/habilidad y aprendizaje mediante evidencia y alineación curricular estructurada;
- separar explícitamente las menciones marginales, los vacíos y las limitaciones de la fuente.

El script `scripts/validar_produccion.py` revisa esta compuerta de manera automática, pero no determina si una inferencia histórica es pertinente.

## Compuerta 2. Decisión curricular y de mediación

Antes de cerrar el registro, comprobar manualmente:

1. La unidad principal se desprende del foco dominante del texto, no solo de una palabra clave.
2. Una unidad secundaria tiene alcance `contextual` o `secundario` cuando la fuente no cubre el contenido completo.
3. Las relaciones 1:N son capacidades justificadas, no cuotas de llenado.
4. Los vacíos de mujeres/género, pueblos indígenas/territorio y desigualdad/derechos se declaran con precisión.
5. El nivel y modo de lectura reflejan extensión, vocabulario, densidad conceptual y público de origen.

## Compuerta 3. Producción de ficha pedagógica

Una ficha se deriva únicamente de un registro canónico validado. Debe:

- respetar las secciones 1 a 16 y el Anexo A de correspondencia con el programa;
- declarar YAML con `lectura_id`, *slug*, unidades y estado pedagógico;
- seleccionar solo 2 o 3 relaciones curriculares prioritarias;
- proponer actividades con modalidad, tiempo, operación cognitiva y producto observable;
- incluir términos de andamiaje previo cuando la lectura tenga conceptos de umbral;
- declarar, cuando corresponda, la clasificación de mediación de la Guía general; en fuentes primarias, testimonios o documentos históricos, priorizar crítica de fuentes y confrontación de discursos;
- declarar límites y complementariedades en las observaciones, y valores/actitudes en la sección 15;
- presentar los recursos derivados como `planeado` hasta que existan, con sus identificadores `HIST2_XXXX_RD_*`.

Para un recurso de nivel `avanzado`, la ficha debe añadir de forma obligatoria: lectura focalizada con localizadores verificables, entre tres y seis términos de andamiaje previo y una secuencia explícita que pase de comprensión guiada a análisis o argumentación. Cuando el recurso compare interpretaciones o perspectivas, incluirá un organizador de contraste (por ejemplo, matriz, mapa relacional o cuadro comparativo) y no propondrá lectura autónoma íntegra sin esos apoyos.

No deben introducirse en la ficha hechos, enlaces o autorías que no estén respaldados por el registro canónico o por una nueva evidencia documentada.

## Compuerta 3B. Orientaciones pedagógico-curriculares

Una orientación se registra en `orientaciones_pedagogico_curriculares/` conforme a `ARQUITECTURA DE ORIENTACIONES PEDAGÓGICO-CURRICULARES.md`. Antes de pasar a `en_revision`, debe:

- declarar identificador, tipo, título, *slug*, audiencia, estado y unidad o alcance transversal;
- enlazar solo lecturas, fichas o recursos existentes, usando sus identificadores estables;
- declarar una intervención docente, una evidencia integradora y límites explícitos de cobertura;
- distinguir una relación directa de una contextual y no reasignar artificialmente la unidad principal de una lectura;
- conservar contenido Markdown con *frontmatter* coherente con su registro; y
- especificar créditos, accesibilidad y condiciones de publicación.

Una orientación no se presenta como documento rector ni como recurso dirigido directamente al estudiantado si su audiencia declarada es docente. La automatización futura validará su registro, su contenido y sus enlaces antes de construir la vista correspondiente.

## Compuerta 4. Cambios y excepciones

- Un cambio de esquema, vocabulario, identificador o estructura requiere primero actualizar su documento rector y después migrar de forma controlada los registros afectados.
- Una corrección factual exige modificar la evidencia y la fecha de modificación; no basta con alterar el texto visible.
- Un recurso derivado heredado o externo queda en `fuentes/materiales_asociados_pendientes/` hasta que tenga revisión, créditos, accesibilidad y registro propio.
- Ante un conflicto no resuelto, el estado se mantiene en `borrador` o `en_revision`; nunca se completa con suposiciones.

## Ejecución obligatoria

Ejecutar después de cada alta o ajuste antes de informar que un registro o ficha está validado:

```powershell
python scripts/validar_produccion.py
```

Para comprobar un único registro y su ficha:

```powershell
python scripts/validar_produccion.py --registro HIST2_0004
```

Un resultado distinto de `VALIDACIÓN APROBADA` detiene el paso a la siguiente etapa hasta corregir o documentar la excepción.

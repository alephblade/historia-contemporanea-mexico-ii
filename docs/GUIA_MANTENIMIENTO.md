# Guía breve de mantenimiento

## Incorporar una lectura

1. Asignar el identificador estable siguiente y crear `registros/HIST2_XXXX.json` conforme a la especificación canónica 2.0.
2. Incorporar la fuente únicamente en `fuentes/lecturas/HIST2_XXXX/`; nunca en `public/`.
3. Crear `fichas_pedagogicas/HIST2_XXXX_ficha_pedagogica.md` con *frontmatter* 2.1 y el mismo `lectura_id` y `slug`.
4. Mantener `estado_editorial` y `estado_pedagogico` en el nivel autorizado; no promoverlos por completar campos.
5. Añadir una entrada fechada y documentada en `verificaciones/fuentes_externas.json`; la URL debe coincidir exactamente con el registro.
6. Ejecutar `npm test` y revisar los cambios deterministas en `data/` y `exports/`.

El transformador espera actualmente 20 lecturas porque esta versión documenta el corpus cerrado auditado. Al aprobar una lectura nueva, debe actualizarse el conteo esperado en `scripts/proyectar_contenido.mjs` y en la prueba de rutas como una decisión registrada, no como un arreglo incidental.

## Actualizar una ficha

1. Conservar sus secciones, identificador, `slug` y vínculo al registro.
2. No introducir autorías, hechos o enlaces sin respaldo canónico.
3. Mantener los recursos derivados como `planeado` hasta que tengan registro propio y publicación autorizada.
4. Ejecutar `npm run validate:corpus`, `npm run project` y `npm test`.

## Incorporar un recurso derivado

1. Crear primero su registro en `recursos_derivados/registros/` y su contenido conforme a la arquitectura vigente.
2. Verificar créditos, licencia, accesibilidad y `url_publica`.
3. No asignar `url_publica` mientras el estado no sea `publicado`.
4. Ampliar el esquema y el transformador público mediante una decisión documentada. La primera versión bloquea cualquier estado diferente de `planeado` porque todavía no existe la colección formal.

## Incorporar una orientación

1. Crear `orientaciones_pedagogico_curriculares/registros/ORI_....json` y su Markdown homónimo en `contenido/`.
2. Declarar audiencia, propósito, unidad, evidencia integradora, accesibilidad, créditos y límites.
3. Definir cada `ruta_analisis` con identificador estable, título público, pregunta guía, intervención didáctica y evidencia esperada.
4. Enlazar solo lecturas, rutas y referencias canónicas existentes; conservar el alcance de cada relación.
5. Mantener la orientación en `borrador` o `en_revision` hasta contar con aprobación académica expresa.
6. Ejecutar `npm test` y comprobar su ruta en `/orientaciones/:slug/` y en la unidad relacionada.

## Compuerta obligatoria

No se informa un contenido como validado si `npm test` falla. Una corrección factual o curricular debe modificar primero la fuente canónica y su evidencia, no únicamente la vista pública.

## Actualizar disponibilidad de una fuente

1. Revalidar la URL canónica y conservar fecha, resultado y evidencia.
2. Cambiar únicamente `verificaciones/fuentes_externas.json` cuando varíe la disponibilidad técnica.
3. No sustituir `fuente_url`, `acceso` ni una nota canónica sin decisión curatorial documentada.
4. Ejecutar `npm run project`, `npm test` y `npm run review:inventory`.
5. Confirmar que todas las filas del inventario conserven decisión y evidencia.

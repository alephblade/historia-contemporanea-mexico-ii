# Dictamen de revisión académica e institucional del sitio local

**Identificador de revisión:** `REVISION_LOCAL_HIST2_V1_2026-09`  
**Lista aplicable:** `docs/LISTA_FORMAL_ACEPTACION_ACADEMICA_LOCAL.md`  
**Estado:** revisión técnica y académica local concluida; aceptación para preparar GitHub comunicada mediante constancia el 2026-09-01  
**Corpus evaluado — SHA-256:** registros `b7c62b7258376641f09fa1e444b89047ef2e71eeecd92d751bf18a964fa2df73`; fichas `241ed6fd78730d0393631516e12f10e53e4d7474ad7c4a9bb31d6647a3f334d9`; orientaciones `b8fcbf07f0c5f046c2864ee09dda8b047a9aa2e2190af824b4816c12da8a8efb`  
**Fecha y hora de inicio:** 1 de septiembre de 2026, revisión local  
**Fecha y hora de cierre:** 1 de septiembre de 2026, revisión local

## 1. Resumen ejecutivo

La salida estática local construye, conserva la proyección pública de 20 lecturas, cinco unidades y una orientación, y no expone fuentes locales de terceros. El recorrido de las 31 páginas confirmó navegación principal, pie, migas, catálogo, filtros, tarjetas, rutas de lectura y Unidad 3. La orientación `ORI_HIST2_U3_TRAMA_01` presenta nueve lecturas y las cinco acometidas A–E; la Unidad 3 conserva explícitamente la brecha de Guerra Cristera y relaciones Estado–Iglesia.

Se registran cuatro hallazgos P1: las URL canónicas alojadas en `www.constitucion1917.gob.mx` no resuelven DNS al 1 de septiembre de 2026. No se sustituyeron, porque hacerlo requiere evidencia curatorial y autoridad institucional. También se documenta un bloqueo antibot de Historia Mexicana/Colmex. Los bloqueos reservados de identidad GitHub, licencia y aprobación académica impiden crear o publicar un remoto, aunque no son defectos que este revisor pueda resolver.

## 2. Resultado técnico reproducible

| Control | Resultado | Evidencia |
| --- | --- | --- |
| `npm run review:prepare` | Aprobado | `outputs/revision-sitio/review-prepare-transcript-2026-09-01.txt`: corpus 20/20, proyección, Astro, tipos y enlaces aprobados; inventario 536 enlaces. |
| Construcción de 31 páginas | Aprobado | Salida de `review:prepare`; Astro informó 31 páginas en `dist/`. |
| Rutas internas | Aprobado | 465 rutas y 31 anclas; comprobador y recorrido de navegador local. |
| Hipervínculos externos | Aprobado con hallazgos | 20 URL canónicas verificadas individualmente; véase `docs/ANEXO_REVISION_HIPERVINCULOS_2026-09-01.md`. |
| Exclusión de fuentes locales | Aprobado | `test:links` informó `Fuentes locales: 0`; inspección adicional de `dist/`: 0 archivos prohibidos. |
| Prueba con `BASE_PATH` | Aprobado | `outputs/revision-sitio/base-path-test-transcript-2026-09-01.txt`; reconstrucción de raíz en `outputs/revision-sitio/root-rebuild-transcript-2026-09-01.txt`. |

## 3. Cobertura de la lista formal

| Grupo | Aprobados | No aprobados | No aplicables | Evidencia |
| --- | ---: | ---: | ---: | --- |
| PRE — Preparación | 6 | 0 | 0 | Brief rector, huellas antes/después, `review:prepare`, preview local, inventario y este dictamen. |
| A — Integridad y trazabilidad | 6 | 0 | 0 | Proyección coincide con los 20 registros; 20 fichas con secciones 1–16 y Anexo A; estados en revisión. |
| B — Navegación e hipervínculos | 9 | 1 | 0 | B-07 no se aprueba: cuatro fuentes no abren. B-10 quedó subsanado en la ronda posterior con 528/528 filas decididas. |
| C — Coherencia académica | 6 | 0 | 0 | Proyección determinista, fichas, roles, alcances, autorías y audiencia revisados contra la fuente pública. |
| D — Unidad 3 | 5 | 0 | 0 | 5 acometidas, 9 lecturas, evidencia integradora y límite `no_acreditado_por_corpus` confirmados en las vistas de unidad y orientación. |
| E — Publicación y derechos | 5 | 0 | 0 | `dist/` sin fuentes ni materiales; sin remoto Git, Pages, CMS, OAuth, analítica, autenticación ni datos de producción. |
| F — Accesibilidad | 5 | 0 | 1 | Estructura, foco visible y adaptación responsiva verificados; F-02 conserva pendiente el recorrido humano secuencial completo por teclado. |
| G — Decisión institucional | 0 | 5 | 0 | Bloqueos reservados, fuera de autoridad del revisor; deben resolverse y firmarse antes de GitHub. |

## 4. Hallazgos

| ID | Severidad | Ruta o archivo | Elemento | Hallazgo verificable | Evidencia | Recomendación | Responsable sugerido | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P1-EXT-01 | P1 | `/lecturas/teorizando-revolucion-mexicana/` | Fuente institucional | URL canónica `TeorizandoSobreRevolucionMex.pdf` no resolvió DNS (`ERR_NAME_NOT_RESOLVED`). | Anexo de hipervínculos, fila correspondiente; prueba de navegador del 1-09-2026. | Curaduría debe confirmar URL vigente o autorizar sustitución documentada. | Curaduría académica e institucional | mitigado en interfaz; abierto en curaduría |
| P1-EXT-02 | P1 | `/lecturas/maderismo/` | Fuente institucional | URL canónica de *Tomo II: Maderismo* no resolvió DNS. | Anexo de hipervínculos; `ERR_NAME_NOT_RESOLVED`. | Confirmar URL vigente o autorizar sustitución. | Curaduría académica e institucional | mitigado en interfaz; abierto en curaduría |
| P1-EXT-03 | P1 | `/lecturas/crisis-del-porfirismo/` | Fuente institucional | URL canónica de *Tomo I: La crisis del Porfirismo* no resolvió DNS. | Anexo de hipervínculos; `ERR_NAME_NOT_RESOLVED`. | Confirmar URL vigente o autorizar sustitución. | Curaduría académica e institucional | mitigado en interfaz; abierto en curaduría |
| P1-EXT-04 | P1 | `/lecturas/revolucion-constitucionalista/` | Fuente institucional | URL canónica de *Tomo III: La revolución constitucionalista* no resolvió DNS. | Anexo de hipervínculos; `ERR_NAME_NOT_RESOLVED`. | Confirmar URL vigente o autorizar sustitución. | Curaduría académica e institucional | mitigado en interfaz; abierto en curaduría |
| OBS-EXT-01 | OBS | `/lecturas/elecciones-sistema-politico/` | Fuente institucional | Historia Mexicana/Colmex mostró verificación antibot, no el artículo. La URL sigue siendo canónica. | Anexo de hipervínculos; título observado «Un momento…». | Revalidar manualmente en red institucional antes del primer despliegue; no cambiar sin evidencia. | Curaduría académica | advertencia implementada; revalidación abierta |

## 5. Hipervínculos y funciones aparentes

La ronda posterior de mejora retiró las ocho anclas que apuntaban a las cuatro fuentes no disponibles, conservó las URL canónicas como evidencia no accionable y añadió una advertencia para el bloqueo técnico de Colmex. El inventario regenerado contiene 528 hipervínculos y completa decisión/evidencia en 528/528 filas. Los 60 recursos planeados permanecen sin URL.

## 6. Revisión académica focal

### Lecturas y fichas

Las 20 rutas muestran identificador canónico, estado `En revisión`, ficha pedagógica y separación entre fuente externa, ficha, orientación y recursos planeados. La comparación de la proyección pública contra los 20 JSON canónicos no arrojó discrepancias en ID, *slug*, título, resumen, URL ni estado. Las 20 fichas contienen las secciones 1–16 y Anexo A.

### Unidades y alcances

Las cinco unidades son alcanzables. Sus relaciones distinguen principal, secundaria, directo, contextual, secundario y, cuando falta la estructura de alcance, «Alcance no explicitado», sin inventar cobertura. El catálogo responde localmente: la búsqueda «Yaquis» mostró una tarjeta y el filtro Unidad 3 mostró nueve lecturas; «Limpiar filtros» restauró las 20.

### `ORI_HIST2_U3_TRAMA_01`

La ruta `/orientaciones/unidad-3-estado-surgido-de-la-revolucion/` presenta `ORI_HIST2_U3_TRAMA_01`, audiencia docente, cinco acometidas A–E, nueve lecturas vinculadas, alcance de cada vínculo, evidencia integradora y condición de acceso sin barrera estática.

### Guerra Cristera y límites de cobertura

La página de Unidad 3 y el detalle de la orientación indican textualmente que el corpus no acredita cobertura suficiente de Guerra Cristera ni de relaciones Estado–Iglesia. No se presenta como contenido ya resuelto.

## 7. Decisión recomendada por el agente revisor

- [ ] Aceptada para preparar GitHub.
- [x] Aceptada con observaciones.
- [ ] No aceptada.

**Justificación:** la aceptación es únicamente del artefacto local sujeto a observaciones: no hay P0; la salida construye y no publica insumos locales. Antes de crear un remoto o desplegar se deben resolver P1-EXT-01 a P1-EXT-04, confirmar el caso antibot y obtener las decisiones institucionales G-01 a G-05. Este resultado no promueve estados editoriales ni autoriza GitHub.

## 8. Decisión humana

El responsable académico e institucional debe revisar este dictamen, resolver los puntos G-01 a G-05 y dejar constancia antes de crear o publicar el repositorio remoto.

**Decisión:** pendiente de firma humana; el agente recomienda no crear ni publicar en GitHub todavía.  
**Responsable académica designada:** Mtra. María Luisa Saavedra Solá, profesora titular de Historia Contemporánea de México II.  
**Fecha:** pendiente.

## 9. Rectificación y estado posterior a mejoras

Una auditoría independiente posterior detectó que el inventario original mantenía vacías las columnas `decision_revisor` y `evidencia_revisor`, que la lista formal seguía como pendiente y que F-02/F-05 carecían de evidencia persistida suficiente. La ronda de mejora corrigió el inventario, decodificó entidades HTML en URL, añadió el registro operativo `verificaciones/fuentes_externas.json`, persistió pruebas responsivas y creó `docs/RESULTADO_ACEPTACION_ACADEMICA_LOCAL_2026-09-01.md`.

Estas mejoras no cierran los cuatro P1 curatoriales ni G-01 a G-05. El dictamen continúa siendo **Aceptada con observaciones** y la puerta hacia GitHub permanece cerrada.

## 10. Adenda de cierre de los cuatro P1 curatoriales

Después de la rectificación se confirmó que las cuatro ligas eran rutas institucionales reales en un dominio legado que dejó de resolver. Se localizaron los mismos archivos en el dominio oficial vigente del INEHRM y el responsable del proyecto autorizó rehabilitar los accesos. Los registros, fichas y la verificación operativa migraron de `www.constitucion1917.gob.mx` a `inehrm.gob.mx`, conservando el resto de cada ruta y documentando las URL históricas en el anexo.

Los hallazgos `P1-EXT-01` a `P1-EXT-04` quedan cerrados. El inventario actualizado contiene 536 hipervínculos con decisión y evidencia en 536/536 filas; hay 19 fuentes disponibles y una con bloqueo técnico. No se incorporaron los PDF locales a `dist/` ni se autorizó su redistribución. La recomendación sigue siendo **Aceptada con observaciones** y la puerta hacia GitHub permanece cerrada por las decisiones institucionales restantes y la firma humana, no por estos cuatro enlaces.

## 11. Adenda de responsable, GitHub y licencias

Se designó como responsable académica firmante a la **Mtra. María Luisa Saavedra Solá**, profesora titular de Historia Contemporánea de México II. La cuenta inicial prevista es `alephblade`, con repositorio público `historia-contemporanea-mexico-ii`. El contenido académico y editorial original queda bajo CC BY-SA 4.0; el código original, bajo MIT. Las fuentes y signos institucionales de terceros se excluyen y se rigen por `docs/POLITICA_DE_FUENTES_Y_DERECHOS.md`.

G-01, G-02 y G-03 quedan resueltos como decisiones preparatorias. G-05 quedó cerrado el 1 de septiembre de 2026 mediante la constancia de aceptación de la Mtra. María Luisa Saavedra Solá, transmitida fielmente por Arnoldo Prado y conservada en `docs/ACTA_ACEPTACION_ACADEMICA_LOCAL_2026-09-01.md`. La versión queda aceptada para preparar GitHub. Esta adenda no crea un remoto ni activa GitHub Pages.

## 12. Adenda de rutas de análisis

Después de la aceptación se sustituyó el término interno «acometida» por «ruta de análisis» y se añadió navegación accesible hacia cinco explicaciones estructuradas de la Unidad 3. La compuerta técnica volvió a aprobar 31 páginas, 20 lecturas, cinco unidades y una orientación, sin fuentes locales de terceros. El inventario vigente contiene 566 hipervínculos con 0 decisiones o evidencias vacías. El borrador para extender la estrategia a las unidades 1, 2, 4 y 5 no forma parte todavía del contenido aceptado ni publicado.

## 13. Adenda de formalización autorizada para Unidad 1

Un dictamen posterior de la Mtra. María Luisa Saavedra Solá autorizó formalizar dos rutas de Unidad 1. Se incorporaron `ORI_HIST2_U1_TRAMA_01` y `ORI_HIST2_U1_TRAMA_02` en `en_revision`, con pares JSON/Markdown, secuencias de 120 minutos, trabajo independiente, rúbricas y límites. La compuerta posterior aprobó 33 páginas, tres orientaciones y 620 hipervínculos sin decisiones vacías ni fuentes locales de terceros. La nueva redacción requiere todavía revisión académica antes de promover su estado.

## 14. Adenda de ratificación para U2 y U4

La Mtra. María Luisa Saavedra Solá ratificó el 1 de septiembre de 2026 la formalización de U2-A, U2-B y U4-A con ajustes didácticos y selección de fragmentos canónicos para evitar saturación cognitiva. Las tres orientaciones se incorporaron en `en_revision`; U1-D/E quedaron descartadas y el resto de las propuestas de U2, U4 y U5 permanece retenido. El expediente normalizado se conserva en `docs/DICTAMEN_RUTAS_ORIENTACIONES_FORMALES_U2_U4_2026-09-01.md`.

La verificación técnica posterior aprobó 36 páginas, seis orientaciones y 689 hipervínculos, con 0 errores de Astro, 0 rutas rotas y 0 fuentes locales de terceros publicadas.

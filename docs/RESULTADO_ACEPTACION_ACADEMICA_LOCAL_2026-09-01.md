# Resultado ejecutado de la lista formal de aceptación académica local

**Instrumento:** `ACEPTACION_LOCAL_HIST2_V1`  
**Ejecución:** `REVISION_LOCAL_HIST2_V1_2026-09`  
**Fecha de revisión y mejora:** 1 de septiembre de 2026  
**Estado:** aceptación académica comunicada mediante constancia; un control humano no bloqueante pendiente  
**Resultado:** **Aceptada para preparar GitHub**  
**Puerta hacia GitHub:** **abierta para preparación; creación del remoto y Pages requieren autorización operativa expresa**

Este documento registra la ejecución de `docs/LISTA_FORMAL_ACEPTACION_ACADEMICA_LOCAL.md` y la constancia transmitida por Arnoldo Prado en nombre de la responsable académica. La aceptación permite preparar GitHub, pero no constituye por sí sola una orden operativa para crear un remoto ni desplegar el sitio.

## Resumen de resultados

| Resultado | Controles |
| --- | ---: |
| Aprobados | 48 |
| No aprobados | 0 |
| Pendientes de verificación o decisión humana | 1 |
| Total | 49 |

No se detectó ningún P0. Los cuatro P1 curatoriales se cerraron después de localizar y registrar las rutas oficiales vigentes del INEHRM, autorizadas por el responsable del proyecto. Los PDF locales permanecen excluidos del sitio y del artefacto público.

## Preparación e integridad

| Control | Resultado | Evidencia |
| --- | --- | --- |
| PRE-01 a PRE-06 | Aprobados | Brief rector, dictamen, anexos y salidas en `outputs/revision-sitio/`. |
| A-01 a A-06 | Aprobados | `npm test`; 20 lecturas, 20 fichas, cinco unidades, una orientación y proyección determinista. |

## Navegación e hipervínculos

| Control | Resultado | Evidencia |
| --- | --- | --- |
| B-01 a B-06 | Aprobados | Construcción, rutas internas, anclas, filtros, raíz y `BASE_PATH`. |
| B-07 | **Aprobado tras rehabilitación** | 19 fuentes disponibles y una con bloqueo técnico; las cuatro rutas INEHRM migraron del dominio legado al oficial vigente. Registro: `verificaciones/fuentes_externas.json`. |
| B-08 | Aprobado tras mejora | Los accesos renderizados incorporan el título de la lectura en su nombre accesible. |
| B-09 | Aprobado | 60 recursos derivados permanecen como `planeado`, sin URL. |
| B-10 | Aprobado tras mejora | 536/536 filas del inventario regenerado contienen decisión y evidencia; 0 vacías. |

La reducción temporal de 536 a 528 hipervínculos correspondió a la desactivación precautoria de los cuatro destinos no resolubles. Tras la investigación y la actualización autorizada al dominio oficial vigente del INEHRM, esas ocho anclas vuelven a formar parte del sitio. Las URL históricas se conservan en el anexo de revisión.

## Coherencia académica y Unidad 3

| Control | Resultado | Evidencia |
| --- | --- | --- |
| C-01 a C-06 | Aprobados | Corpus y fichas no modificados; roles, alcances, autorías y audiencia conservados. |
| D-01 a D-05 | Aprobados | Unidad 3, `ORI_HIST2_U3_TRAMA_01`, cinco acometidas, nueve lecturas y brecha de Guerra Cristera preservadas. |

## Publicación, derechos y accesibilidad

| Control | Resultado | Evidencia |
| --- | --- | --- |
| E-01 a E-05 | Aprobados | `dist/` sin fuentes locales; sin remoto, Pages, CMS, OAuth ni datos de producción. |
| F-01 | Aprobado | `test:links`: idioma, un `h1` y jerarquía estructural. |
| F-02 | **Pendiente de recorrido humano completo** | Foco visible comprobado; el controlador no completó la secuencia Tab en esta sesión. |
| F-03 y F-04 | Aprobados | Estados por texto; tablas con encabezados y regiones desplazables. |
| F-05 | Aprobado | 320, 375, 768 y 1280 px sin desbordamiento; logo, navegación y avisos visibles. |
| F-06 | Aprobado | Página 404 con ruta de recuperación. |

Evidencia responsiva y funcional: `outputs/revision-sitio/evidencia-navegador-post-mejoras-2026-09-01.json`.

## Decisiones institucionales

| Control | Resultado | Acción requerida |
| --- | --- | --- |
| G-01 | Aprobado | Responsable académica designada: Mtra. María Luisa Saavedra Solá, profesora titular de Historia Contemporánea de México II. |
| G-02 | Aprobado como decisión preparatoria | Cuenta `alephblade`; repositorio previsto `historia-contemporanea-mexico-ii`; visibilidad pública; URL prevista documentada. No se creó remoto. |
| G-03 | Aprobado y ratificado | Contenido original CC BY-SA 4.0; código original MIT; terceros excluidos. La primera publicación enlazará los PDF oficiales del INEHRM y no alojará copias propias; el marco educativo revisado no se usa como licencia de redistribución. |
| G-04 | Aprobado | Los cuatro P1 se resolvieron mediante rutas oficiales vigentes del INEHRM; no se publicaron copias locales. |
| G-05 | Aprobado mediante constancia | Autorización de la Mtra. María Luisa Saavedra Solá comunicada fielmente por Arnoldo Prado el 2026-09-01 y conservada en el acta. No se presenta como firma autógrafa. |

## Constancias

| Rol | Identificador | Dictamen | Fecha | Constancia |
| --- | --- | --- | --- | --- |
| Agente revisor interno | Tarea Codex `01a05b9a-1c22-7202-954e-f3618c7c4a6b` | Aceptada con observaciones | 2026-09-01 | `docs/DICTAMEN_REVISION_ACADEMICA_LOCAL.md` |
| Responsable académico | Mtra. María Luisa Saavedra Solá | Aceptada para preparar GitHub | 2026-09-01 | Constancia transmitida por Arnoldo Prado; `docs/ACTA_ACEPTACION_ACADEMICA_LOCAL_2026-09-01.md` |
| Responsable institucional/técnico | Pendiente | Pendiente | Pendiente | Pendiente |

**Bloqueos P0:** 0.  
**Hallazgos P1 abiertos:** 0.  
**Fecha autorizada para preparar GitHub:** 1 de septiembre de 2026.

## Adenda técnica posterior: rutas de análisis

La mejora terminológica e interactiva de la Unidad 3 se verificó después de esta aceptación. El inventario vigente contiene 566 filas, 480 enlaces internos resueltos y 0 decisiones o evidencias vacías. Las cifras 536/536 anteriores se conservan como evidencia del corte de aceptación previo a la mejora; no describen el artefacto técnico actual.

## Adenda posterior: orientaciones formales de Unidad 1

Después del dictamen académico específico se integraron dos orientaciones de Unidad 1 en `en_revision`. El estado técnico vigente es de 33 páginas, tres orientaciones y 620 hipervínculos, con 526 rutas internas, 54 anclas resueltas y 0 decisiones o evidencias vacías. Esta adenda no promueve estados editoriales ni activa publicación.

## Adenda posterior: ratificación de U2-A, U2-B y U4-A

La responsable académica ratificó el 1 de septiembre de 2026 la formalización de tres rutas adicionales. Se incorporaron dos orientaciones de Unidad 2 y una de Unidad 4, todas en `en_revision`, con fragmentos canónicos acotados y límites explícitos. El sitio vigente construye 36 páginas y proyecta seis orientaciones; esta adenda no activa publicación ni modifica la política de fuentes.

La compuerta posterior aprobó 689 hipervínculos: 586 rutas internas y 63 anclas resueltas, sin decisiones ni evidencias vacías y sin fuentes locales de terceros en el artefacto.

## Adenda de preparación Git local

Se inicializó el repositorio Git local en la rama `main` y se confirmó `Arnoldo Prado <juliopao@gmail.com>` como identidad del commit inicial. La compuerta automatizada se amplió para comprobar enlace de salto, destino enfocable, etiquetas de formulario, orden de `tabindex`, seguridad de pestañas nuevas y destinos interactivos. El detalle y las huellas del corte se conservan en `docs/CIERRE_COMPUERTA_LOCAL_PRE_GITHUB_2026-09-01.md`. Permanece pendiente el recorrido humano completo mediante teclado físico.

## Adenda de creación del repositorio público

Arnoldo Prado autorizó expresamente el 1 de septiembre de 2026 crear el repositorio público y subir la rama `main`. El repositorio quedó disponible en `https://github.com/alephblade/historia-contemporanea-mexico-ii`; el commit inicial `d78d4e2cfbc14013b7a3e03775c41c97782957da` se publicó sin fuentes locales de terceros y el primer flujo remoto `Validación y construcción` concluyó correctamente. GitHub Pages no fue activado y conserva una autorización operativa separada.

## Adenda de recorrido humano y primera publicación

Arnoldo Prado informó posteriormente que completó el recorrido manual mediante teclado y autorizó activar GitHub Pages como primera versión evolutiva, sujeta a mejora, actualización y depuración, con propósito inmediato de constatación administrativa interna. El despliegue remoto aprobó y la URL `https://alephblade.github.io/historia-contemporanea-mexico-ii/` quedó operativa el 1 de septiembre de 2026. Esta adenda resuelve el único control humano pendiente y la autorización operativa de Pages; no modifica las cifras del corte histórico ni promueve estados académicos.

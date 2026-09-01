# Anexo estable de revisión de hipervínculos — 1 de septiembre de 2026

**Revisión:** `REVISION_LOCAL_HIST2_V1_2026-09`  
**Inventario base:** `outputs/revision-sitio/inventario-hipervinculos.csv`  
**Salida de preparación:** `outputs/revision-sitio/review-prepare-transcript-2026-09-01.txt`

Este anexo completa la decisión y evidencia del inventario regenerable. Se conserva separado para que una nueva ejecución de `npm run review:inventory` no borre el dictamen humano.

## Decisión por grupo de filas del inventario

| Filas | Decisión | Evidencia reproducible |
| --- | --- | --- |
| 465 rutas internas resueltas localmente | **Aprobadas** | `npm run review:prepare` terminó sin enlaces internos rotos; recorrido de las 31 páginas en `http://127.0.0.1:4321/` confirmó `h1`, `main`, destinos y ausencia de `href` vacío, `#` aislado o `javascript:`. |
| 31 anclas «Saltar al contenido principal» | **Aprobadas** | El comprobador verificó el ancla en todas las páginas; el destino visible es `main#contenido-principal`. |
| 40 filas de fuentes externas (20 URL únicas) | **Decididas individualmente** | Tabla siguiente. Cada URL coincide uno a uno con `campos_1_a_1.fuente_url.valor` de los 20 registros canónicos (`MISSING=0`, `EXTRA=0`). |

Los 60 recursos derivados en estado `planeado` se mostraron sin URL ni apariencia de descarga; no pertenecen a las filas de hipervínculos externos y **no** se clasifican como enlaces rotos.

## Fuentes externas únicas

| Ruta de origen | Etiqueta visible principal | Destino esperado y observado | Decisión / evidencia |
| --- | --- | --- | --- |
| `/lecturas/sistema-politico-etapa-clasica/` | Abrir fuente institucional de *El sistema político mexicano: la etapa clásica* | `https://archivos.juridicas.unam.mx/www/bjv/libros/1/181/4.pdf` → misma URL, PDF | **Disponible.** Navegador, `application/pdf`. |
| `/lecturas/porfirio-diaz-constitucion-dictadura-reeleccion/` | Abrir fuente institucional de *Porfirio Díaz (1830-1915)* | `https://archivos.juridicas.unam.mx/www/bjv/libros/9/4121/9.pdf` → misma URL, PDF | **Disponible.** Navegador, `application/pdf`. |
| `/lecturas/sistema-politico-mexicano/` | Abrir fuente institucional de *El sistema político mexicano* | `https://dmd.unadmexico.mx/contenidos/DCSA/MODULOS/AGP/M4_AGSPAM/U2/S4/descargables/AGP_M4_U2_S4_TA.pdf` → misma URL, PDF | **Disponible.** Navegador, `application/pdf`. |
| `/lecturas/elecciones-sistema-politico/` | Abrir fuente institucional de *Las elecciones y el sistema político* | `https://historiamexicana.colmex.mx/index.php/RHM/article/view/4313/4529` → misma URL | **Bloqueo técnico/antibot.** El navegador mostró «Verificación de seguridad en curso» y título «Un momento…»; URL canónica conservada. |
| `/lecturas/prensa-instrumento-cientifico-revolucion/` | Abrir fuente institucional de *La prensa como instrumento científico…* | `https://inehrm.gob.mx/es/inehrm/La_prensa_comoinstrumento_tiempos_de_revolucion` → misma URL | **Disponible.** Título observado: *La prensa como instrumento científico en tiempos de la Revolución*. |
| `/lecturas/relaciones-mexico-estados-unidos-1911-1918/` | Abrir fuente institucional de *Relaciones México-Estados Unidos, 1911-1918* | `https://inehrm.gob.mx/es/inehrm/Relaciones_Mexico-Estados_Unidos_1911-1918` → misma URL | **Disponible.** Título observado: *Relaciones México-Estados Unidos, 1911-1918*. |
| `/lecturas/historia-militar-revolucion-epoca-maderista-tomo-1/` | Abrir fuente institucional de Tomo I | `https://inehrm.gob.mx/recursos/Libros/HistoriaMilitarEpocaMaderistaT1.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/historia-militar-revolucion-epoca-maderista-tomo-2/` | Abrir fuente institucional de Tomo II | `https://inehrm.gob.mx/recursos/Libros/HistoriaMilitarEpocaMaderistaT2.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/historia-militar-revolucion-epoca-maderista-tomo-3/` | Abrir fuente institucional de Tomo III | `https://inehrm.gob.mx/recursos/Libros/HistoriaMilitarEpocaMaderistaT3.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/teorizando-revolucion-mexicana/` | Abrir fuente institucional de *Teorizando sobre la Revolución Mexicana…* | `https://www.constitucion1917.gob.mx/recursos/Libros/TeorizandoSobreRevolucionMex.pdf` → sin destino | **Destino no disponible.** `ERR_NAME_NOT_RESOLVED` de `www.constitucion1917.gob.mx`; P1-EXT-01. |
| `/lecturas/maderismo/` | Abrir fuente institucional de *La Revolución y los revolucionarios. Tomo II* | `https://www.constitucion1917.gob.mx/work/models/inehrm/Resource/455/1/images/LaRevolucionRevolucionarioTII.pdf` → sin destino | **Destino no disponible.** `ERR_NAME_NOT_RESOLVED`; P1-EXT-02. |
| `/lecturas/crisis-del-porfirismo/` | Abrir fuente institucional de *La Revolución y los revolucionarios. Tomo I* | `https://www.constitucion1917.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_I.pdf` → sin destino | **Destino no disponible.** `ERR_NAME_NOT_RESOLVED`; P1-EXT-03. |
| `/lecturas/revolucion-constitucionalista/` | Abrir fuente institucional de *La Revolución y los revolucionarios. Tomo III* | `https://www.constitucion1917.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_III.pdf` → sin destino | **Destino no disponible.** `ERR_NAME_NOT_RESOLVED`; P1-EXT-04. |
| `/lecturas/dictadura-porfirista/` | Abrir fuente institucional de *La dictadura porfirista* | `https://www.inehrm.gob.mx/es/inehrm/La_Dictadura_Porfirista` → misma URL | **Disponible.** Título observado: *La Dictadura Porfirista*. |
| `/lecturas/revolucion-mexicana-laboratorio-visual-fotografos-camaras/` | Abrir fuente institucional de *La Revolución Mexicana. Un laboratorio visual…* | `https://www.inehrm.gob.mx/es/inehrm/La_Revolucion_Mexicana_Un_laboratorio_visual_entre_fotografos_y_camaras` → misma URL | **Disponible.** Título observado: *La Revolución Mexicana. Un laboratorio visual entre fotógrafos y cámaras*. |
| `/lecturas/felipe-angeles-general-revolucionario-generoso-academico/` | Abrir fuente institucional de *Felipe Ángeles…* | `https://www.inehrm.gob.mx/recursos/Libros/2024_felipe_angeles_elgral_revolucionario_yel_generoso_academico.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/yaquis-memoria-territorio-participacion-politica/` | Abrir fuente institucional de *Yaquis…* | `https://www.inehrm.gob.mx/recursos/Libros/2025_yaquis_memoria_territorio_yparticipacion_politica.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/documentos-fundamentales-revolucion-mexicana/` | Abrir fuente institucional de *Documentos fundamentales…* | `https://www.inehrm.gob.mx/recursos/Libros/Documentos_fundamentales_de_la_Revolucion_Mexicana.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/sistema-politico-desarrollo-reacomodo-poder/` | Abrir fuente institucional de *Sistema político mexicano: desarrollo y reacomodo…* | `https://www.redalyc.org/pdf/2110/211015582008.pdf` → misma URL, PDF | **Disponible.** |
| `/lecturas/resena-loaeza-sombra-superpotencia/` | Abrir fuente institucional de *Sobre Soledad Loaeza…* | `https://www.scielo.org.mx/scielo.php?pid=S2448-65312024000300448&script=sci_arttext` → misma URL | **Disponible.** Título observado: *Sobre Soledad Loaeza, A la sombra de la superpotencia…* |

**Conteo:** 15 disponibles, 0 redirecciones válidas, 1 bloqueo técnico/antibot, 0 accesos restringidos y 4 destinos no disponibles. La revisión no modificó URL alguna ni infirió permisos.

## Adenda posterior a mejoras

La primera ronda posterior retiró de la interfaz las ocho anclas correspondientes a los cuatro destinos no disponibles y conservó sus URL como evidencia no accionable. El inventario regenerado contenía 528 hipervínculos: 465 rutas internas, 31 anclas de página y 32 apariciones activas de 16 URL externas únicas.

## Adenda de rehabilitación por migración de dominio

Una investigación posterior confirmó que las cuatro URL eran rutas institucionales reales del INEHRM, pero el dominio legado `www.constitucion1917.gob.mx` dejó de resolver. El mismo organismo mantiene los archivos en el dominio vigente `inehrm.gob.mx`, conservando el resto de cada ruta. Con autorización del responsable del proyecto, el 1 de septiembre de 2026 se actualizaron los registros canónicos, las fichas y la verificación operativa:

| Lectura | URL histórica no resoluble | URL oficial vigente |
| --- | --- | --- |
| `HIST2_0004` | `https://www.constitucion1917.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_I.pdf` | `https://inehrm.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_I.pdf` |
| `HIST2_0005` | `https://www.constitucion1917.gob.mx/work/models/inehrm/Resource/455/1/images/LaRevolucionRevolucionarioTII.pdf` | `https://inehrm.gob.mx/work/models/inehrm/Resource/455/1/images/LaRevolucionRevolucionarioTII.pdf` |
| `HIST2_0006` | `https://www.constitucion1917.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_III.pdf` | `https://inehrm.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_III.pdf` |
| `HIST2_0007` | `https://www.constitucion1917.gob.mx/recursos/Libros/TeorizandoSobreRevolucionMex.pdf` | `https://inehrm.gob.mx/recursos/Libros/TeorizandoSobreRevolucionMex.pdf` |

Las cuatro fuentes vuelven a presentarse como enlaces activos. Los hallazgos `P1-EXT-01` a `P1-EXT-04` quedan cerrados por rehabilitación oficial, no por publicación de copias locales. Los PDF locales continúan excluidos del artefacto público.

El inventario regenerado vuelve a contener 536 hipervínculos: 465 rutas internas, 31 anclas de página y 40 apariciones activas de 20 URL externas únicas. Las 536 filas tienen decisión y evidencia; no hay campos de revisión vacíos.

## Adenda de rutas de análisis

La migración pública de «acometida» a «ruta de análisis» añadió cinco explicaciones estructuradas y 15 enlaces internos descriptivos desde las lecturas vinculadas. El inventario posterior contiene 566 filas, 480 enlaces internos resueltos, 20 fuentes verificadas y 0 filas sin decisión. Esta cifra sustituye a 536 como estado técnico actual; la cifra anterior se conserva como evidencia de la revisión previa a la mejora.

## Adenda de orientaciones formales de Unidad 1

La incorporación autorizada de `ORI_HIST2_U1_TRAMA_01` y `ORI_HIST2_U1_TRAMA_02` elevó el inventario vigente a 620 filas: 526 rutas internas, 54 anclas de página, 20 fuentes verificadas y 0 filas sin decisión o evidencia. Las cifras anteriores permanecen como cortes históricos.

## Adenda posterior: orientaciones de U2 y U4

La formalización autorizada de `ORI_HIST2_U2_TRAMA_01`, `ORI_HIST2_U2_TRAMA_02` y `ORI_HIST2_U4_TRAMA_01` elevó el inventario vigente a 689 filas: 586 rutas internas, 63 anclas de página, 40 apariciones de enlaces institucionales o de fuente correspondientes a las 20 lecturas verificadas y 0 filas sin decisión o evidencia. Los cortes anteriores se conservan como evidencia histórica.

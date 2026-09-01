# Decisiones técnicas y bloqueos institucionales

## Decisiones técnicas de la versión 1

| Decisión | Resolución | Motivo |
| --- | --- | --- |
| Generación | Astro con salida estática y rutas con barra final. | Compatible con GitHub Pages y sin servidor. |
| Fuente pública | Proyección versionada desde registros y Markdown. | Evita duplicar metadatos en componentes. |
| Validación | Script canónico de Python, JSON Schema, controles relacionales, tipos Astro y prueba de enlaces. | Mantiene una compuerta reproducible antes de construir. |
| Filtros | JavaScript local y HTML previamente renderizado. | No requiere base de datos, cuenta ni servicio externo. |
| Unidad 3 | Vista transversal con `ORI_HIST2_U3_TRAMA_01`. | No existe lectura principal y no se debe reasignar una artificialmente. |
| Relaciones | Rol y alcance se muestran por separado. | Preserva principal/secundaria y directo/contextual/secundario. |
| Recursos derivados | Se bloquean como `planeado`, sin URL. | No existen registros propios publicados. |
| Fuentes | Exclusión por `.gitignore` y control del artefacto. | Impide publicar copias locales de terceros. |
| Repositorio GitHub | Repositorio público `alephblade/historia-contemporanea-mexico-ii`, con `main` como rama predeterminada y CI activo. Commit inicial `d78d4e2cfbc14013b7a3e03775c41c97782957da`, publicado el 2026-09-01. Pages permanece inactivo. | Arnoldo Prado autorizó expresamente crear el remoto y subir `main`; la activación de Pages conserva una orden operativa separada. |
| Aceptación académica | Mtra. María Luisa Saavedra Solá; aceptación para preparar GitHub comunicada mediante constancia textual transmitida por Arnoldo Prado el 2026-09-01. | Cierra G-05 sin representar la constancia como firma autógrafa. |
| Licencia del contenido propio | CC BY-SA 4.0 para contenido académico y editorial original cuyos titulares estén autorizados a licenciarlo; decisión ratificada el 2026-09-01. | Exige atribución y mantiene abiertas las adaptaciones bajo la misma licencia. |
| Licencia del código propio | MIT para componentes, estilos y scripts originales; decisión ratificada el 2026-09-01. | Creative Commons no recomienda sus licencias para software; se mantiene un alcance inequívoco. |
| Política de fuentes | Enlace oficial por defecto; ninguna copia de tercero sin licencia, permiso, dominio público o fundamento institucional documentado. | Evita confundir disponibilidad pública con autorización de reproducción. |
| Disponibilidad de fuentes | Registro operativo fechado, separado del corpus canónico. | Permite desactivar destinos caídos sin reescribir URL ni modalidad de acceso. |
| Rehabilitación de cuatro fuentes INEHRM | Migración autorizada del dominio legado `www.constitucion1917.gob.mx` al dominio oficial vigente `inehrm.gob.mx`, conservando las rutas de los archivos. | Restablece los accesos de `HIST2_0004` a `HIST2_0007` con evidencia institucional y trazabilidad de las URL históricas. |
| Copias PDF de respaldo | No se incorporan al sitio ni al futuro repositorio hasta resolver permiso de redistribución y política de terceros. | Que un PDF sea de acceso público no concede por sí solo autorización para republicarlo; la capacidad técnica de GitHub no sustituye esa autorización. |
| Inventario revisado | Las decisiones y evidencias se fusionan determinísticamente al regenerar el CSV. | Evita que `review:inventory` borre la revisión y satisface B-10. |
| Identidad pública | Emblema compacto obtenido del portal oficial de la UACh, optimizado a 5,724 bytes y mostrado en el extremo superior derecho; uso público autorizado por Arnoldo Prado el 2026-09-01. | Mejora legibilidad a escala de encabezado, conserva transparencia y trazabilidad; permanece excluido de CC BY-SA 4.0 y MIT. |
| Terminología de articulación curricular | La denominación pública y canónica pasa de `acometida` a `ruta de análisis`; la orientación de Unidad 3 usa el esquema 1.1 con cinco rutas A–E estructuradas. | Elimina vocabulario interno ambiguo y permite navegación accesible hacia pregunta guía, lecturas, intervención y evidencia esperada. Decisión aprobada por Arnoldo Prado el 2026-09-01. |
| Rutas para otras unidades | Los dictámenes de la Mtra. María Luisa Saavedra Solá aprobaron formalizar U1-A, U1-B, U2-A, U2-B y U4-A. Las cinco rutas dieron origen a orientaciones en `en_revision`; U2 y U4 usan selecciones focalizadas para evitar saturación cognitiva. | U1-C permanece retenida; U1-D y U1-E fueron descartadas; U2-C a U2-F, U4-B a U4-E y U5-A a U5-E permanecen retenidas y no proyectadas. No se incorporaron fuentes nuevas. |

## Bloqueos y decisiones pendientes

- Revisión académica de los 20 registros y fichas y promoción explícita de sus estados.
- Revisión editorial de los textos y rúbricas de las seis orientaciones formales antes de promoverlos más allá de `en_revision`.
- Autorización expresa posterior para activar GitHub Pages; la creación del remoto y el envío de `main` ya fueron autorizados y ejecutados.
- Permisos específicos para cualquier reproducción o copia descargable de fuentes de terceros.
- Fuente aprobada para cubrir Guerra Cristera y relaciones Estado–Iglesia en Unidad 3.
- Evaluación de los seis materiales heredados aislados en `fuentes/materiales_asociados_pendientes/`.
- Producción, accesibilidad, créditos y alojamiento de los 60 recursos derivados planeados.
- URL definitiva para metadatos canónicos e imagen social. El emblema público está resuelto, pero `og:image` se añadirá cuando exista el origen definitivo del sitio.
- Revalidación del bloqueo técnico de Historia Mexicana/Colmex desde una red institucional.
- Recorrido humano secuencial completo por teclado después de la ronda de mejoras.

Ninguno de estos bloqueos impide construir y probar localmente la versión estática. Sí impiden presentarla como publicación académica definitiva o activar un despliegue público.

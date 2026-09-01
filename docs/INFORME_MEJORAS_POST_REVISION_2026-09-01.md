# Informe de mejoras posteriores a la revisión académica local

**Fecha:** 1 de septiembre de 2026  
**Alcance:** corrección funcional y documental sobre la versión estática local  
**Publicación:** repositorio y GitHub Pages autorizados y activos como versión evolutiva

## Resultado

Se implementaron las observaciones técnicamente resolubles. En una primera ronda, los cuatro destinos caídos dejaron de presentarse como enlaces activos. Una investigación posterior encontró las mismas rutas bajo el dominio oficial vigente del INEHRM y, con autorización del responsable del proyecto, se actualizaron únicamente los campos de URL y los enlaces correspondientes de `HIST2_0004` a `HIST2_0007`. El caso Colmex mantiene su enlace con una advertencia de bloqueo técnico.

El inventario es ahora determinista y cerrable: después de incorporar las orientaciones autorizadas de las unidades 1, 2 y 4 contiene 689 filas, todas con decisión y evidencia. También se corrigió la decodificación de `&amp;` en la URL de SciELO y se añadieron nombres accesibles descriptivos a los enlaces de fuente incluidos en las fichas.

## Identidad institucional

La primera ronda utilizó el PNG completo proporcionado por el responsable del proyecto. Posteriormente se adoptó el emblema compacto publicado en el portal oficial de la UACh (`https://chapingo.mx/wp-content/uploads/2024/02/logo-chapingo-bco-redondo2.png`) porque elimina la leyenda circular y el lema, ilegibles al tamaño del encabezado. La copia local optimizada conserva transparencia, mide 107 × 95 px y pesa 5,724 bytes. Se presenta en la esquina superior derecha, con texto alternativo, dimensiones intrínsecas correctas y ruta compatible con `BASE_PATH`.

Archivo integrado: `public/identidad/logo-uach.png`.

Arnoldo Prado autorizó expresamente el uso público de los logotipos oficiales aportados y de la variante alojada en el portal institucional. El emblema permanece excluido de CC BY-SA 4.0 y MIT; su fuente y tratamiento se conservan documentados.

## Rutas de análisis

La denominación interna «acometida» fue sustituida por «ruta de análisis» en la orientación, las nueve fichas relacionadas, la proyección y la interfaz. `ORI_HIST2_U3_TRAMA_01` migró al esquema 1.1 y ahora contiene cinco rutas A–E estructuradas con título, pregunta guía, intervención didáctica y evidencia esperada.

Las etiquetas antes decorativas son enlaces internos descriptivos. Cada enlace conduce a la explicación completa de la ruta, que también enumera las lecturas y referencias canónicas relacionadas. La validación de enlaces comprueba que todos los fragmentos internos tengan un destino existente. Las rutas no aprobadas de U1 y las propuestas de U2, U4 y U5 se mantienen separadas y no se proyectarán públicamente sin validación académica.

### Orientaciones formalizadas para la Unidad 1

El dictamen de la Mtra. María Luisa Saavedra Solá autorizó convertir `PROP_U1_RUTA_A` y `PROP_U1_RUTA_B` en `ORI_HIST2_U1_TRAMA_01` y `ORI_HIST2_U1_TRAMA_02`. Cada objeto cuenta con registro 1.1, Markdown, meta de aprendizaje, secuencia presencial de 120 minutos, trabajo independiente de 60 minutos, evidencia integradora, rúbrica y límites. Permanecen en `en_revision` porque sus textos formalizados requieren el control académico posterior a la redacción.

La atribución «constitucionalización de la dictadura» quedó ligada exclusivamente a Imer B. Flores y `HIST2_0019`. No se incorporó la referencia a CMS contenida en el documento recibido. U1-C continúa retenida; U1-D y U1-E no fueron promovidas.

Una ratificación posterior descartó expresamente U1-D y U1-E y autorizó formalizar U2-A, U2-B y U4-A con fragmentos canónicos focalizados. Las demás rutas de U2 y U4 y todo el bloque U5 permanecen retenidos y fuera de la proyección.

## Arquitectura de la mejora

1. `verificaciones/fuentes_externas.json` registra una observación operativa fechada por lectura, separada del corpus académico.
2. `scripts/proyectar_contenido.mjs` valida que cada URL observada coincida exactamente con el registro canónico y genera `data/verificacion_fuentes.publica.json`.
3. Las páginas de lectura muestran disponibilidad, evidencia y fecha sin cambiar la modalidad declarada `Abierto`, `Institucional` o `Restringido`.
4. `scripts/validar_enlaces.mjs` falla si una fuente no disponible vuelve a aparecer como ancla activa o si el logotipo no respeta `BASE_PATH`.
5. `scripts/inventariar_hipervinculos.mjs` fusiona decisiones y evidencia verificable en cada fila y falla ante vacíos.

## Pruebas

| Control | Resultado |
| --- | --- |
| Validación del corpus | 20 registros y 20 fichas aprobados. |
| Proyección determinista | Aprobada, incluida la verificación operativa. |
| Astro y tipos | 36 páginas; 0 errores, 0 advertencias. |
| Enlaces y artefacto | 20 lecturas, cinco unidades, seis orientaciones, 0 fuentes locales publicadas. |
| Ruta base simulada | Aprobada con `/historia-contemporanea-mexico-ii/`, incluido el logotipo. |
| Inventario | 689 filas; 586 rutas internas y 63 anclas resueltas; 0 decisiones vacías; 0 evidencias vacías. |
| Fuentes | 19 disponibles y una con bloqueo técnico; las cuatro fuentes INEHRM rehabilitadas están activas. |
| Adaptación | 320, 375, 768 y 1280 px sin desbordamiento horizontal. |
| Logo | Visible en los cuatro anchos, con texto alternativo y ruta compatible con la base. |
| Catálogo | Búsqueda “Yaquis” devuelve una lectura. |
| Foco | Contorno sólido visible en el campo de búsqueda. |

La evidencia de navegador se conserva en `outputs/revision-sitio/evidencia-navegador-post-mejoras-2026-09-01.json`.

## Pendientes que no deben automatizarse

- Revalidar Colmex desde una red institucional.
- Completar un recorrido humano secuencial por teclado.
- Resolver por escrito el permiso y la política de redistribución antes de alojar copias de PDF de terceros en GitHub o en otro servicio.
- Incorporar, mediante curaduría, una fuente para Guerra Cristera y relaciones Estado–Iglesia.
- Evaluar seis materiales heredados y producir con créditos/accesibilidad los 60 recursos derivados planeados.

## Recomendación de puerta

La versión local fue aceptada académicamente para preparar GitHub mediante constancia transmitida por Arnoldo Prado en nombre de la Mtra. María Luisa Saavedra Solá. Los cuatro P1 curatoriales, la cuenta `alephblade`, la visibilidad pública, las licencias, la política de fuentes y el uso público del emblema oficial están resueltos. Arnoldo Prado informó que completó el recorrido humano por teclado y autorizó posteriormente GitHub Pages como versión evolutiva para constatación administrativa. El sitio quedó publicado sin promover estados académicos ni incorporar fuentes locales de terceros.

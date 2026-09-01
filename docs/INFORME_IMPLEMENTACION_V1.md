# Informe de implementación — versión estática 1

**Fecha:** 31 de agosto de 2026  
**Estado:** implementación local lista para revisión; publicación institucional pendiente.

## Resultado funcional

- Proyecto Astro estático en la raíz, sin mover ni reescribir el corpus.
- 31 páginas generadas: inicio, acerca, error 404, catálogo, 20 lecturas, cinco unidades, catálogo de orientaciones y una orientación.
- Catálogo de lecturas con búsqueda y filtros por unidad, nivel, tipo y estado.
- Rutas de lectura por *slug* con metadatos públicos, fuente institucional, ficha completa, relaciones curriculares, orientación relacionada y recursos planeados.
- Cinco vistas de unidad que separan relación principal/secundaria y los alcances declarados.
- Unidad 3 integrada con `ORI_HIST2_U3_TRAMA_01`, cinco acometidas, nueve lecturas, evidencia integradora y advertencia explícita sobre Guerra Cristera.
- Interfaz adaptable, navegación por teclado, foco visible, estados por texto, tablas semánticas desplazables e impresión legible.

## Proyección y seguridad editorial

- Proyección determinista con esquema JSON versionado y huella de fuentes.
- CSV de intercambio generado desde el corpus.
- Ningún componente duplica metadatos curatoriales.
- Ninguna carpeta o copia de `fuentes/` se incorpora a `dist/`.
- Los 60 recursos derivados permanecen `planeado`, sin URL pública.
- Los estados `en_revision` permanecen visibles y no se promovieron.

## Pruebas

La compuerta final se ejecuta con `npm test` y comprende:

1. `scripts/validar_produccion.py` antes de construir;
2. regeneración y validación de la proyección;
3. construcción estática de Astro;
4. comprobación de tipos y componentes;
5. validación de enlaces y conteo de rutas;
6. inspección del artefacto para impedir fuentes locales.

### Resultado de la compuerta final

| Control | Resultado |
| --- | --- |
| Validador canónico de Python | Aprobado: 20 registros y 20 fichas. |
| Proyección JSON/relaciones | Aprobada: 20 lecturas, cinco unidades y una orientación. |
| Construcción Astro 7.2.10 | Aprobada: 31 páginas estáticas. |
| Tipos y componentes | 0 errores, 0 advertencias y 0 sugerencias. |
| Enlaces y rutas | Aprobados: 20 rutas de lectura, cinco de unidad y una de orientación. |
| Accesibilidad estructural | Aprobada: idioma, un `h1`, jerarquía de encabezados, IDs únicos y encabezados de tabla. |
| Exclusión de fuentes | Aprobada: cero archivos locales de terceros en el artefacto. |
| Ruta base de Pages | Aprobada con `BASE_PATH=/repositorio-prueba` y un origen `.invalid` de prueba. |
| Prueba HTTP local | Siete rutas representativas respondieron 200 y mostraron su contenido esperado. |
| Dependencias npm | Auditoría de instalación: cero vulnerabilidades conocidas. |

La construcción final se repitió sin `BASE_PATH` para dejar `dist/` listo para la revisión local en raíz.

## CI y publicación

CI ejecuta la misma compuerta y conserva `dist/` como artefacto de revisión. La plantilla de Pages está inactiva y usa las acciones oficiales requeridas. No se creó remoto ni se activó Pages.

## Bloqueos

En el cierre inicial persistían decisiones sobre aprobación académica, licencia, identidad de GitHub y cobertura de Guerra Cristera. Las decisiones posteriores sobre responsable, aceptación mediante constancia, cuenta, visibilidad, licencias, política de fuentes y uso público del emblema oficial se registran en `docs/DECISIONES_Y_BLOQUEOS.md`; continúan pendientes la autorización operativa expresa para crear el remoto y la cobertura de Guerra Cristera.

## Adenda del 1 de septiembre de 2026 — orientaciones de Unidad 1

El dictamen académico posterior autorizó formalizar dos rutas de Unidad 1. El sitio vigente construye 33 páginas y proyecta tres orientaciones: `ORI_HIST2_U1_TRAMA_01`, `ORI_HIST2_U1_TRAMA_02` y `ORI_HIST2_U3_TRAMA_01`. Las dos nuevas permanecen en `en_revision`; esta adenda no altera las cifras históricas del corte inicial consignadas arriba.

## Adenda posterior: rutas autorizadas de las unidades 2 y 4

La ratificación de la Mtra. María Luisa Saavedra Solá del 1 de septiembre de 2026 autorizó formalizar U2-A, U2-B y U4-A con fragmentos canónicos acotados. Se incorporaron `ORI_HIST2_U2_TRAMA_01`, `ORI_HIST2_U2_TRAMA_02` y `ORI_HIST2_U4_TRAMA_01`, inicialmente en `en_revision`. El sitio construye ahora 36 páginas y proyecta seis orientaciones. No se activó GitHub Pages ni se alojaron fuentes locales de terceros.

# Cierre de compuerta local previa a GitHub

Repositorio educativo de Historia Contemporánea de México II · Universidad Autónoma Chapingo  
**Fecha:** 1 de septiembre de 2026  
**Alcance del corte:** preparación local; sin remoto y sin activación de GitHub Pages

## 1. Resultado

La versión local satisface las compuertas automáticas de corpus, proyección, construcción, tipos, rutas, accesibilidad estructural, inventario de hipervínculos y exclusión de fuentes. Las seis orientaciones formales conservan `en_revision`; esta revisión no promueve estados académicos.

| Control | Resultado |
| --- | --- |
| Corpus | 20 registros y 20 fichas aprobados. |
| Orientaciones | 6 pares JSON/Markdown coherentes; identificadores, slugs, unidades, lecturas y referencias válidos. |
| Construcción | 36 páginas estáticas; 0 errores, 0 advertencias y 0 indicaciones de Astro. |
| Enlaces | 689 enlaces inventariados; 586 rutas internas y 63 anclas resueltas; 0 filas sin decisión o evidencia. |
| Accesibilidad automatizable | Enlace de salto y destino enfocable en las 36 páginas; etiquetas de formulario; ausencia de `tabindex` positivo; foco global visible; tablas con encabezados; destinos interactivos no vacíos. |
| Adaptación visual | Catálogo y orientaciones verificadas sin desbordamiento en escritorio y 375 px. |
| Fuentes | 0 fuentes locales de terceros en `dist/`; `fuentes/lecturas/` y `fuentes/materiales_asociados_pendientes/` ignorados por Git. |
| CI | `.github/workflows/ci.yml` activo para validación y build; Pages permanece como plantilla `.example` inactiva. |
| Git local | Repositorio inicializado en la rama `main`; sin commits y sin remotos. |

## 2. Huellas del corte

- `registros`: 20 archivos · `0f47165688822fa5032829bb17f88d4dc773b0b30e4771dcc5fe2e494c07e614`
- `fichas_pedagogicas`: 20 archivos · `5d6b9af739c20068d022572ad9461851a72b65a0d567b6e58a380c4c2eb861bd`
- `orientaciones_pedagogico_curriculares`: 12 archivos · `c636228b952b1b7d2c87efd7e693c2041ec0eab98149933eea43c16f5be2ac49`
- `fuentes`: 28 archivos locales auditados · `f2b68deb5bc7dc95ee9c22063b381eb32fcfc61d492ad58765675b44dc8c06bb`

La huella de `fuentes` sirve para control local; no autoriza ni implica su incorporación al repositorio remoto.

## 3. Límites del cierre

La automatización comprobó la estructura de navegación por teclado y el contorno de foco visible. El recorrido secuencial completo mediante una tecla Tab física sigue siendo una prueba humana: el control de navegador disponible no reproduce de forma fiable ese avance desde el inicio del documento. Esta limitación se registra sin convertirla en aprobación simulada.

Arnoldo Prado confirmó y autorizó normalizar todas las constancias bajo el nombre Arnoldo Prado y usar `Arnoldo Prado <juliopao@gmail.com>` como identidad del commit inicial.

## 4. Próxima orden operativa

Con la identidad confirmada, el siguiente paso local autorizado es:

1. configurar `Arnoldo Prado <juliopao@gmail.com>` únicamente en este repositorio;
2. revisar el índice de archivos versionables;
3. crear el commit inicial reproducible; y
4. volver a ejecutar `npm run review:prepare` sobre el commit.

Crear el remoto público bajo `alephblade`, subir la rama y activar GitHub Pages siguen siendo acciones separadas que requieren autorización operativa expresa.

## 5. Adenda de publicación del repositorio

Arnoldo Prado autorizó expresamente crear el repositorio público y subir `main` el 1 de septiembre de 2026. Se ejecutaron y verificaron las siguientes acciones:

- repositorio público: `https://github.com/alephblade/historia-contemporanea-mexico-ii`;
- rama predeterminada y rama seguida: `main`;
- commit inicial publicado: `d78d4e2cfbc14013b7a3e03775c41c97782957da`, con autor `Arnoldo Prado <juliopao@gmail.com>`;
- primer flujo remoto `Validación y construcción`: concluido correctamente, ejecución `33492148718`; y
- GitHub Pages: no activado; la plantilla `.github/workflows/pages.yml.example` permanece inactiva.

La autorización para crear el repositorio no se interpretó como autorización para desplegar el sitio. El recorrido humano secuencial completo mediante teclado físico sigue pendiente y no se presenta como aprobado.

## 6. Adenda de activación de GitHub Pages

Arnoldo Prado informó posteriormente que completó el recorrido manual mediante teclado y autorizó activar GitHub Pages bajo el entendimiento de que la primera versión pública continuará sujeta a mejora, actualización y depuración. El flujo `Publicar en GitHub Pages` concluyó correctamente en la ejecución `33493202408` y el sitio quedó disponible en `https://alephblade.github.io/historia-contemporanea-mexico-ii/`, con HTTPS forzado.

La autorización y el resultado se documentan en `docs/AUTORIZACION_ACTIVACION_GITHUB_PAGES_2026-09-01.md`. Esta adenda resuelve el control humano pendiente y la autorización operativa de despliegue sin alterar los resultados históricos de las secciones anteriores.

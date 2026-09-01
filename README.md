# Repositorio educativo de Historia Contemporánea de México II

Primera versión estática para la Preparatoria Agrícola de la Universidad Autónoma Chapingo. El sitio permite consultar 20 lecturas curadas, sus fichas pedagógicas, las cinco unidades canónicas y seis orientaciones formales en revisión: dos para la Unidad 1, dos para la Unidad 2, una para la Unidad 3 y una para la Unidad 4.

Todo el corpus permanece en estado `en_revision`. El proyecto está publicado como repositorio de código abierto en [`alephblade/historia-contemporanea-mexico-ii`](https://github.com/alephblade/historia-contemporanea-mexico-ii), con `main` como rama predeterminada y CI activo. **GitHub Pages no está activado**.

## Requisitos

- Node.js 22.12 o posterior; CI usa Node.js 24.
- npm 10 o posterior.
- Python 3.10 o posterior para `scripts/validar_produccion.py`.

## Instalación y operación local

```powershell
npm ci
npm run dev
```

El servidor indicará la URL local, normalmente `http://localhost:4321/`.

Comandos de control:

```powershell
npm run validate:corpus      # valida los 20 JSON y las 20 fichas
npm run project              # regenera JSON públicos, manifiesto y CSV
npm run validate:projection  # comprueba que la proyección versionada esté al día
npm run build                # valida, proyecta y construye dist/
npm run check                # revisa tipos y componentes Astro
npm run test:links           # comprueba rutas, enlaces y exclusión de fuentes
npm test                     # ejecuta la compuerta completa
npm run review:hashes        # genera huellas reproducibles por colección
npm run review:prepare       # valida y genera el inventario formal de hipervínculos
```

## Flujo de datos

1. `registros/HIST2_XXXX.json` conserva la fuente curatorial de verdad.
2. `fichas_pedagogicas/*.md` aporta la mediación pedagógica legible.
3. `orientaciones_pedagogico_curriculares/` aporta objetos docentes independientes; desde el esquema 1.1, sus rutas de análisis se estructuran una sola vez y la interfaz deriva de ahí títulos, preguntas, intervenciones, evidencias y vínculos.
4. `verificaciones/fuentes_externas.json` conserva disponibilidad operativa fechada sin alterar URL ni estados canónicos.
5. `scripts/proyectar_contenido.mjs` valida relaciones, verifica la correspondencia exacta de URL y selecciona únicamente campos públicos.
6. `data/proyeccion.publica.json`, `data/verificacion_fuentes.publica.json`, sus vistas parciales y `exports/lecturas.csv` son salidas deterministas y versionadas.
7. Astro genera el sitio estático en `dist/`.

Los componentes no contienen copias manuales de los metadatos curatoriales. El CSV es una proyección de intercambio, nunca una fuente primaria de edición.

La disponibilidad observada de una fuente no sustituye la modalidad declarada en el registro. Una fuente puede conservar modalidad `Abierto` y estar temporalmente caída; el sitio muestra ambas condiciones por separado y desactiva únicamente el acceso observado como no disponible.

## Rutas

- `/` — inicio y orientación de uso.
- `/lecturas/` — catálogo con filtros locales.
- `/lecturas/:slug/` — detalle, fuente institucional, ficha y recursos planeados.
- `/unidades/:slug/` — cinco vistas curriculares con rol y alcance de relaciones.
- `/orientaciones/` — catálogo docente.
- `/orientaciones/:slug/` — detalle de cada orientación.
- `/acerca/` — método, estados y límites de publicación.

## Política de fuentes y publicación

`fuentes/lecturas/` y `fuentes/materiales_asociados_pendientes/` están excluidos mediante `.gitignore`. El comprobador del artefacto falla si encuentra `fuentes/`, PDFs, documentos o medios copiados en `dist/`. El sitio enlaza únicamente las URL institucionales registradas.

Los recursos derivados que aparecen en las fichas siguen en estado `planeado`; no se crea una URL ni una apariencia de disponibilidad sin registro propio publicado.

El contenido académico y editorial original se ofrece bajo CC BY-SA 4.0; el código original, bajo MIT. Las fuentes y signos institucionales de terceros están expresamente excluidos. Consulte [Licencias y alcance](LICENSE.md) y la [política de fuentes y derechos](docs/POLITICA_DE_FUENTES_Y_DERECHOS.md).

## CI y futura publicación

`.github/workflows/ci.yml` ejecuta la validación completa y conserva `dist/` como artefacto de revisión. `.github/workflows/pages.yml.example` es una plantilla **inactiva** que usa las acciones oficiales `configure-pages`, `upload-pages-artifact` y `deploy-pages`.

La aceptación académica para preparar GitHub consta desde el 1 de septiembre de 2026. La creación del repositorio público y el envío de `main` fueron autorizados y ejecutados ese mismo día. La activación de Pages permanece separada y requiere una nueva autorización operativa expresa; antes deberán configurarse `SITE_URL` y `BASE_PATH` y seguir [la guía de GitHub Pages](docs/GUIA_GITHUB_PAGES.md).

## Documentación

- [Arquitectura de la proyección pública](docs/ARQUITECTURA_PUBLICA.md)
- [Guía de mantenimiento de contenidos](docs/GUIA_MANTENIMIENTO.md)
- [Preparación futura de GitHub Pages](docs/GUIA_GITHUB_PAGES.md)
- [Decisiones y bloqueos institucionales](docs/DECISIONES_Y_BLOQUEOS.md)
- [Informe de implementación y pruebas](docs/INFORME_IMPLEMENTACION_V1.md)
- [Lista formal de aceptación académica local](docs/LISTA_FORMAL_ACEPTACION_ACADEMICA_LOCAL.md)
- [Plantilla de dictamen de revisión](docs/DICTAMEN_REVISION_ACADEMICA_LOCAL.md)
- [Resultado ejecutado de aceptación local](docs/RESULTADO_ACEPTACION_ACADEMICA_LOCAL_2026-09-01.md)
- [Informe de mejoras posteriores a la revisión](docs/INFORME_MEJORAS_POST_REVISION_2026-09-01.md)
- [Política de fuentes, licencias y reproducción](docs/POLITICA_DE_FUENTES_Y_DERECHOS.md)
- [Nota de verificación del convenio invocado para PDF del INEHRM](docs/NOTA_VERIFICACION_CONVENIO_INEHRM_UACH_2026-09-01.md)
- [Acta para la aceptación académica](docs/ACTA_ACEPTACION_ACADEMICA_LOCAL_2026-09-01.md)

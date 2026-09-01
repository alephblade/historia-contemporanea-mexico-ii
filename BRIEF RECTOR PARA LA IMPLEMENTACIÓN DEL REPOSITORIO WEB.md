# Brief rector para la implementación del repositorio web

Repositorio educativo de Historia Contemporánea de México II · Preparatoria Agrícola · Universidad Autónoma Chapingo  
**Versión 1.0 — 31 de agosto de 2026**  
**Estado:** insumo rector para el agente responsable de construir, probar y preparar el despliegue del sitio.

## 1. Misión

Construir una primera versión estática, accesible, versionable y verificable del repositorio educativo de Historia Contemporánea de México II. El sitio debe permitir consultar las 20 lecturas curadas, sus fichas pedagógicas y las orientaciones pedagógico-curriculares, sin exponer materiales de terceros que no estén autorizados para publicación.

La implementación no crea ni altera conclusiones históricas. Debe proyectar, de forma determinista, los datos y contenidos ya aprobados para revisión.

## 2. Jerarquía de fuentes del proyecto

Antes de implementar, el agente debe leer en este orden:

1. `INDICE_DEL_PROYECTO.md`.
2. `AUDITORÍA GENERAL DE PREPARACIÓN PARA DESPLIEGUE.md`.
3. `DICTAMEN DE COMPATIBILIDAD SEMÁNTICA Y ARQUITECTURA DEL REPOSITORIO.md`.
4. `ARQUITECTURA DE ORIENTACIONES PEDAGÓGICO-CURRICULARES.md`.
5. `ARQUITECTURA Y NOMENCLATURA DE RECURSOS DERIVADOS.md`.
6. `CONTROLES DE PRODUCCIÓN Y VALIDACIÓN.md`.
7. `ESPECIFICACIÓN DEL REGISTRO CANÓNICO DE LECTURAS.md`, `VOCABULARIO CONTROLADO DEL REGISTRO CANÓNICO.md` y `FICHA PEDAGÓGICA DEL RECURSO.md`.
8. Un registro, una ficha y la orientación `ORI_HIST2_U3_TRAMA_01` como ejemplos operativos.

En caso de conflicto, el instrumento rector, la especificación canónica, los controles y las decisiones documentadas tienen prioridad sobre convenciones de código o inferencias del agente.

## 3. Fuente de verdad y objetos del repositorio

| Objeto | Ubicación actual | Regla de consumo |
| --- | --- | --- |
| Registro canónico de lectura | `registros/HIST2_XXXX.json` | Fuente curatorial de verdad. No duplicar ni editar manualmente en componentes. |
| Ficha pedagógica | `fichas_pedagogicas/HIST2_XXXX_ficha_pedagogica.md` | Contenido derivado y legible de cada lectura. |
| Orientación pedagógico-curricular | `orientaciones_pedagogico_curriculares/registros/` y `contenido/` | Colección docente independiente; no es una lectura ni un recurso derivado. |
| Recursos derivados | Planeados en las fichas; registros futuros en `recursos_derivados/`. | Mostrar su estado real; no inventar URL ni disponibilidad. |
| Fuentes locales | `fuentes/` | Insumos de trabajo. No publicar ni incluir automáticamente en el sitio o el repositorio remoto. |

El proyecto contiene 20 registros, 20 fichas y una orientación formal en estado `en_revision`. La aplicación puede mostrarlos para prueba y revisión, pero debe preservar su estado editorial visible; no debe presentarlos como “publicados” o aprobados definitivamente.

## 4. Alcance de la primera versión

### Debe incluir

- Proyecto Astro estático en la raíz actual, sin mover ni reescribir los contenidos existentes.
- Proyección pública determinista desde los registros canónicos y los Markdown.
- Vista inicial y catálogo de lecturas con filtros locales por unidad, nivel, tipo de material y estado editorial.
- Ruta única por lectura basada en su *slug*, con metadatos, resumen, unidad, fuente institucional, ficha pedagógica y recursos derivados planeados.
- Vistas de las cinco unidades canónicas, que distingan relaciones principal, secundaria, directa y contextual.
- Colección y rutas de orientaciones: `/orientaciones/` y `/orientaciones/:slug/`.
- Integración de `ORI_HIST2_U3_TRAMA_01` como objeto docente, con acometidas, lecturas relacionadas, evidencia integradora y límite explícito de la Guerra Cristera.
- Navegación docente clara; la audiencia “docente” es una clasificación de uso, no una barrera de acceso en esta primera versión estática.
- Diseño adaptable, semántico y accesible.
- Documentación para instalación, validación, desarrollo local, construcción y futura publicación.

### No debe incluir en esta fase

- CMS, Decap CMS, OAuth, administración web o edición desde navegador.
- Sincronización con Google Sheets.
- Autenticación, perfiles de usuario, analítica, bases de datos o servidor propio.
- Publicación automática de PDFs, videos, imágenes o documentos en `fuentes/`.
- Recursos derivados simulados como disponibles.
- Cambios históricos, curriculares o pedagógicos no autorizados por la documentación vigente.

## 5. Arquitectura técnica requerida

- Usar Astro y generar un sitio estático apto para GitHub Pages.
- Mantener los directorios de contenido actuales como fuente; agregar `src/`, `data/`, `scripts/`, `public/` y `.github/` solo cuando sea necesario.
- Implementar un transformador o capa de datos tipada que lea los registros canónicos, las fichas y las orientaciones, y produzca una proyección pública. La interfaz no debe leer campos internos sin decisión explícita de exposición.
- Validar identificadores, *slugs*, rutas, relaciones de unidad y referencias a fichas u orientaciones antes de la construcción.
- Tratar los Markdown como contenido con *frontmatter* y mantener sus identificadores estables.
- Generar una salida CSV versionada como mecanismo mínimo de intercambio, solo si puede hacerse sin convertirlo en fuente primaria de edición.
- Excluir de control de versiones remoto y de artefactos de despliegue los insumos locales no autorizados, especialmente `fuentes/lecturas/` y `fuentes/materiales_asociados_pendientes/`.

## 6. Diseño de interfaz y experiencia

La interfaz debe priorizar lectura, orientación y trazabilidad, no una presentación decorativa.

### Rutas mínimas

```text
/                            inicio y orientación de uso
/lecturas/                   catálogo y filtros
/lecturas/:slug/             detalle de una lectura
/unidades/:slug/             vista de cada unidad canónica
/orientaciones/              catálogo docente de orientaciones
/orientaciones/:slug/        detalle de una orientación
/acerca/                     propósito, metodología y límites de publicación
```

### Reglas de presentación

- Mostrar el título, tipo, nivel, unidad principal, unidades relacionadas, estado editorial y enlace de fuente de cada lectura.
- Separar “fuente institucional” de “ficha pedagógica” y de “orientación docente relacionada”.
- Mostrar recursos derivados como `Planeado` mientras no exista su registro y URL pública.
- En las vistas de Unidad 3, presentar la trama como itinerario transversal curado y conservar la advertencia de cobertura insuficiente sobre Guerra Cristera.
- No convertir notas internas de curaduría o información técnica sensible en contenido público sin una decisión documentada.

### Accesibilidad obligatoria

- HTML semántico, encabezados jerárquicos, enlaces descriptivos, foco visible y navegación completa por teclado.
- Contraste suficiente y estados comunicados por texto, no solo por color.
- Diseño funcional en móvil y escritorio.
- Tablas responsivas, con encabezados correctos y alternativa de lectura cuando sean complejas.
- Preparar el modelo para subtítulos, transcripciones, texto alternativo y versiones accesibles de recursos derivados futuros.

## 7. Validación, pruebas y CI

La implementación debe incorporar, como mínimo:

1. Ejecución de `scripts/validar_produccion.py` antes de construir.
2. Validación de la capa de proyección: JSON válido, identificadores únicos, *slugs* únicos, una ficha por lectura y referencias existentes.
3. Validación de las orientaciones: identificador, *slug*, contenido, lecturas vinculadas y unidades existentes.
4. Construcción de Astro sin errores.
5. Prueba de enlaces internos y rutas generadas.
6. Flujo de integración continua que ejecute las validaciones y la construcción.

Para GitHub Pages se usarán exclusivamente las acciones oficiales `configure-pages`, `upload-pages-artifact` y `deploy-pages`. La configuración de secretos, dominio o repositorio remoto se hará solo después de que el responsable del proyecto los defina.

## 8. Entregables y criterio de aceptación

El agente debe entregar:

- Sitio Astro construible localmente.
- Proyección de datos documentada y reproducible.
- Rutas funcionales de lecturas, unidades y orientaciones.
- Interfaz de Unidad 3 que incluya la orientación `ORI_HIST2_U3_TRAMA_01` sin falsear alcances.
- Configuración de CI y preparación de GitHub Pages sin secretos codificados ni publicación no autorizada.
- `.gitignore` y política explícita para excluir fuentes no publicables.
- README de operación y una guía breve para incorporar una lectura, una ficha, un recurso derivado o una orientación nueva.
- Informe final de pruebas, decisiones técnicas y bloqueos institucionales que permanezcan.

La fase se acepta cuando el sitio construye localmente, no expone materiales no autorizados, mantiene el vínculo entre ruta pública e identificador canónico, supera las validaciones y cumple las reglas de accesibilidad esenciales.

## 9. Decisiones reservadas al responsable del proyecto

El agente no debe decidir por sí mismo:

- cuenta, organización, nombre, visibilidad, URL o dominio de GitHub;
- licencia del contenido propio;
- permisos de reproducción de fuentes de terceros;
- activación de CMS, OAuth o Google Sheets;
- promoción de estados editoriales de `en_revision` a `publicable` o `publicado`;
- incorporación de una fuente para cubrir la Guerra Cristera u otra brecha curricular.

Debe documentar estos elementos como bloqueos o decisiones pendientes, sin improvisar valores.

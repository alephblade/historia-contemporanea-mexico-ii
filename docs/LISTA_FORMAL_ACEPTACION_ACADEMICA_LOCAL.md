# Lista formal de aceptación académica e institucional del sitio local

**Identificador:** `ACEPTACION_LOCAL_HIST2_V1`  
**Versión:** 1.0  
**Fecha de emisión:** 1 de septiembre de 2026  
**Estado:** instrumento aplicado; resultado fechado en `docs/RESULTADO_ACEPTACION_ACADEMICA_LOCAL_2026-09-01.md`  
**Objeto:** primera versión estática local del repositorio educativo de Historia Contemporánea de México II · Preparatoria Agrícola · Universidad Autónoma Chapingo.

## 1. Propósito y autoridad

Esta lista gobierna la revisión previa a cualquier creación de remoto o activación de GitHub Pages. El agente revisor interno reúne evidencia técnica y académica; no promueve estados editoriales, no corrige el corpus y no sustituye el dictamen humano del responsable académico e institucional.

El resultado permitido es uno de estos tres:

- **Aceptada para preparar GitHub:** no existen bloqueos P0 o P1 y las decisiones institucionales obligatorias están resueltas.
- **Aceptada con observaciones:** no existen bloqueos P0; las observaciones pueden resolverse antes del primer despliegue de revisión.
- **No aceptada:** existe al menos un bloqueo P0 o una acumulación de hallazgos P1 que impide una evaluación confiable.

Las casillas siguientes se conservan como plantilla reutilizable del instrumento. La decisión y evidencia de la ejecución del 1 de septiembre de 2026 se registran en el resultado fechado, no mediante la alteración de esta plantilla.

## 2. Alcance de la revisión

La revisión cubre las 36 páginas estáticas, todos los hipervínculos renderizados, las 20 URL institucionales de lectura, las cinco unidades y las seis orientaciones formales vigentes: dos de Unidad 1, dos de Unidad 2, una de Unidad 3 y una de Unidad 4. Comprueba coherencia con el brief rector, los controles de producción, la arquitectura de orientaciones y las decisiones documentadas.

Quedan fuera de alcance: correcciones históricas no autorizadas, promoción de `en_revision`, licencia institucional, creación de GitHub, publicación de fuentes locales, producción de recursos derivados y activación de CMS, OAuth o Google Sheets.

## 3. Preparación obligatoria

- [ ] **PRE-01.** Leer el brief rector y la jerarquía documental que prescribe.
- [ ] **PRE-02.** Confirmar que los registros, fichas, orientaciones y `fuentes/` no tienen cambios atribuibles a la revisión.
- [ ] **PRE-03.** Ejecutar `npm run review:prepare` y conservar sus resultados.
- [ ] **PRE-04.** Servir `dist/` mediante `npm run preview` y anotar la URL local exacta.
- [ ] **PRE-05.** Abrir el inventario `outputs/revision-sitio/inventario-hipervinculos.csv`.
- [ ] **PRE-06.** Registrar cada hallazgo en `docs/DICTAMEN_REVISION_ACADEMICA_LOCAL.md` con ruta, elemento, evidencia, severidad y recomendación.

Si falla `npm run review:prepare`, la revisión se detiene y se registra un P0 técnico.

## 4. Regla específica para hipervínculos

No todo elemento sin URL es un defecto. El revisor debe distinguir:

| Categoría | Criterio de aceptación |
| --- | --- |
| Ruta interna | Debe resolver a una página o ancla existente, conservar el `BASE_PATH` y tener texto descriptivo. |
| Fuente institucional externa | Debe corresponder al registro canónico y abrir un recurso identificable. Redirecciones, bloqueos 403 o caídas se documentan; no se cambia la URL sin evidencia curatorial. |
| Control que aparenta navegación | Si parece accionable, debe tener destino, estado deshabilitado explicado o eliminarse de la interfaz. |
| Recurso derivado `planeado` | Debe mostrarse como no disponible y **no** debe tener URL. Esto es correcto, no un enlace roto. |
| Función futura no implementada | Debe declararse como futura o no aparecer como control activo. Un `href="#"`, un destino vacío o una interacción inerte es un hallazgo. |

La revisión es exhaustiva: todos los hipervínculos del inventario reciben una decisión; no se admite muestreo para rutas internas ni para las 20 fuentes institucionales.

## 5. Escala de severidad

| Nivel | Definición | Ejemplos |
| --- | --- | --- |
| **P0 — Bloqueo** | Impide revisar o contradice una restricción rectora. | Sitio no construye; fuente local publicada; ruta de lectura ausente; contenido canónico alterado. |
| **P1 — Mayor** | Afecta una función esencial o puede inducir una interpretación institucional incorrecta. | Fuente institucional equivocada; Unidad 3 sin límite de Guerra Cristera; control principal sin destino. |
| **P2 — Menor** | No impide la revisión, pero reduce claridad, accesibilidad o trazabilidad. | Texto de enlace ambiguo; foco deficiente; etiqueta incompleta. |
| **OBS — Observación** | Mejora recomendable sin incumplimiento actual. | Ajuste editorial, priorización visual o explicación adicional. |

## 6. Lista de aceptación

### A. Integridad, trazabilidad y estados

- [ ] **A-01.** Existen 20 rutas únicas de lectura y cada una muestra su `HIST2_XXXX` correcto.
- [ ] **A-02.** Cada ruta conserva título, tipo, nivel, unidad principal, relaciones, estado y URL del registro canónico.
- [ ] **A-03.** Cada lectura integra exactamente una ficha pedagógica coherente con su identificador y *slug*.
- [ ] **A-04.** Registros, fichas y orientaciones se muestran como `en_revision`; ninguno aparece aprobado o publicado.
- [ ] **A-05.** Los componentes no duplican manualmente metadatos curatoriales.
- [ ] **A-06.** La proyección y el CSV se regeneran determinísticamente y el manifiesto conserva su huella.

### B. Navegación e hipervínculos

- [ ] **B-01.** Inicio, navegación principal, pie, migas de pan y llamadas principales tienen destinos funcionales.
- [ ] **B-02.** Catálogo, filtros y enlaces de cada tarjeta conducen a la lectura esperada.
- [ ] **B-03.** Las cinco unidades son alcanzables y enlazan todas sus lecturas relacionadas.
- [ ] **B-04.** `/orientaciones/` y la ruta de `ORI_HIST2_U3_TRAMA_01` son alcanzables desde navegación y contenidos relacionados.
- [ ] **B-05.** No existen `href` vacíos, `href="#"`, JavaScript como destino ni controles que aparenten funcionar sin respuesta.
- [ ] **B-06.** Los enlaces internos funcionan tanto en raíz como con un `BASE_PATH` simulado.
- [ ] **B-07.** Las 20 fuentes externas corresponden a las URL canónicas y se clasifica su respuesta real.
- [ ] **B-08.** Los textos de enlace describen su destino fuera de contexto.
- [ ] **B-09.** Los recursos derivados planeados no tienen enlaces ni apariencia de descarga disponible.
- [ ] **B-10.** Cada fila del inventario de hipervínculos tiene decisión y evidencia del revisor.

### C. Coherencia académica y pedagógica

- [ ] **C-01.** Los resúmenes públicos coinciden con el registro y no añaden conclusiones históricas.
- [ ] **C-02.** Las fichas conservan propósito, actividades, evidencias, preguntas, límites y recursos planeados.
- [ ] **C-03.** Las unidades principal/secundaria y los alcances directo/contextual/secundario se distinguen sin inferencias nuevas.
- [ ] **C-04.** Una relación sin alcance estructurado aparece como no explicitada, no como cobertura inventada.
- [ ] **C-05.** Autorías pendientes o no identificadas no se atribuyen por inferencia a la institución de procedencia.
- [ ] **C-06.** La audiencia docente se presenta como clasificación de uso y no como barrera inexistente.

### D. Unidad 3 y orientación formal

- [ ] **D-01.** La Unidad 3 se presenta como itinerario transversal, no como lectura principal ficticia.
- [ ] **D-02.** `ORI_HIST2_U3_TRAMA_01` muestra cinco acometidas, nueve lecturas vinculadas y sus alcances.
- [ ] **D-03.** La evidencia integradora conserva sus requisitos y límites.
- [ ] **D-04.** La Guerra Cristera figura explícitamente como `no_acreditado_por_corpus`.
- [ ] **D-05.** Ningún texto o control sugiere que la brecha curricular ya fue resuelta.

### E. Publicación, fuentes y derechos

- [ ] **E-01.** `dist/` no contiene `fuentes/`, PDFs, documentos, videos ni materiales heredados.
- [ ] **E-02.** Las referencias externas se separan visual y semánticamente de fichas y orientaciones.
- [ ] **E-03.** No existe archivo de licencia inventado ni afirmación de permisos no otorgados.
- [ ] **E-04.** GitHub Pages permanece inactivo y no existe remoto creado por esta revisión.
- [ ] **E-05.** CMS, OAuth, Google Sheets, analítica, autenticación y datos de producción siguen ausentes.

### F. Accesibilidad y experiencia

- [ ] **F-01.** Todas las páginas tienen idioma, un `h1` y jerarquía de encabezados sin saltos.
- [ ] **F-02.** La navegación completa funciona con teclado y el foco es visible.
- [ ] **F-03.** Estados, alcances y advertencias se comunican por texto, no solo por color.
- [ ] **F-04.** Tablas tienen encabezados y pueden consultarse en pantalla estrecha.
- [ ] **F-05.** Catálogos y páginas de detalle son funcionales en móvil y escritorio.
- [ ] **F-06.** La página 404 ofrece una ruta de recuperación.

### G. Decisión institucional previa a GitHub

- [ ] **G-01.** Se identifica al responsable académico que aprobará o devolverá el dictamen.
- [ ] **G-02.** Se decide cuenta u organización, nombre, visibilidad y URL del futuro repositorio.
- [ ] **G-03.** Se decide la licencia del contenido propio y la política de fuentes de terceros.
- [ ] **G-04.** Se define si los hallazgos P1 deben resolverse antes de crear el remoto o antes del primer despliegue.
- [ ] **G-05.** Se firma un resultado de aceptación y se conserva la fecha del corpus evaluado.

## 7. Cierre y firmas

| Rol | Nombre o identificador | Dictamen | Fecha | Firma o constancia |
| --- | --- | --- | --- | --- |
| Agente revisor interno |  |  |  |  |
| Responsable académico |  |  |  |  |
| Responsable institucional/técnico |  |  |  |  |

**Resultado final:** pendiente.  
**Bloqueos P0:** pendiente.  
**Hallazgos P1:** pendiente.  
**Fecha autorizada para preparar GitHub:** pendiente.

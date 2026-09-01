# Arquitectura de orientaciones pedagógico-curriculares

Repositorio educativo de Historia Contemporánea de México II · Preparatoria Agrícola · Universidad Autónoma Chapingo  
**Versión 1.0 — 31 de agosto de 2026**  
**Estado:** norma de arquitectura y publicación para la fase de implementación.

## 1. Propósito

Las **orientaciones pedagógico-curriculares** son objetos docentes de consulta recurrente. Articulan lecturas, fichas pedagógicas y recursos derivados para atender un propósito, una unidad, una progresión o una necesidad de mediación del programa.

No sustituyen los registros canónicos de lectura ni duplican sus evidencias. Su función es convertir relaciones ya verificadas en rutas de uso, secuencias, matrices de cobertura o protocolos de acompañamiento docente.

## 2. Distinción de categorías

| Categoría | Audiencia y función | Fuente de verdad |
| --- | --- | --- |
| Documentación rectora | Equipo editorial y técnico; define normas, esquemas y controles. | Documentos rectores del proyecto. |
| Registro canónico de lectura | Curaduría y trazabilidad de una fuente seleccionada. | `registros/HIST2_XXXX.json`. |
| Ficha pedagógica | Docente y estudiante; media una lectura concreta. | Ficha derivada del registro canónico. |
| Recurso derivado | Docente y estudiante; video, infografía o cuestionario asociado a una lectura. | Registro propio de recurso derivado. |
| **Orientación pedagógico-curricular** | Principalmente docente; articula varios objetos para un uso curricular dirigido. | Registro propio de orientación y su contenido Markdown. |

Un documento rector no se convierte automáticamente en orientación. Solo pertenece a esta categoría si propone un uso docente recurrente de objetos del repositorio, declara audiencia, propósito, relaciones y límites.

## 3. Tipología inicial

| Tipo | Código | Uso principal |
| --- | --- | --- |
| Trama transversal | `TRAMA` | Articula relaciones secundarias de varias lecturas para cubrir una unidad o problema transversal. |
| Secuencia didáctica | `SECUENCIA` | Ordena sesiones, actividades, tiempos y evidencias para un propósito delimitado. |
| Guía docente | `GUIA` | Ofrece decisiones de mediación, adaptaciones, advertencias y criterios de acompañamiento. |
| Matriz de cobertura | `MATRIZ` | Mapea aprendizajes del programa con evidencias disponibles y límites del corpus. |
| Protocolo de uso | `PROTOCOLO` | Define un procedimiento repetible para recursos, fuentes, evaluación o accesibilidad. |

## 4. Identificadores, rutas y archivos

El identificador estable sigue el formato:

```text
ORI_HIST2_<UNIDAD_O_ALCANCE>_<TIPO>_<NÚMERO>
```

Ejemplo: `ORI_HIST2_U3_TRAMA_01`.

Los nombres de archivo conservan el identificador; los *slugs* y las rutas públicas usan minúsculas y guiones medios.

```text
orientaciones_pedagogico_curriculares/
  registros/
    ORI_HIST2_U3_TRAMA_01.json
  contenido/
    ORI_HIST2_U3_TRAMA_01.md
```

Rutas previstas para el sitio:

```text
/orientaciones/
/orientaciones/:slug/
/unidades/:unidad/                # incluye lecturas y orientaciones relacionadas
```

## 5. Registro mínimo de una orientación

Todo objeto de esta categoría contará con un registro JSON independiente y contenido Markdown. Campos mínimos:

| Campo | Función |
| --- | --- |
| `schema_version` | Versión del modelo de orientación. |
| `id_orientacion` | Identificador estable y único. |
| `tipo_orientacion` | Valor de la tipología controlada. |
| `titulo` y `slug` | Título visible y ruta pública única. |
| `audiencia` | `docente`, `estudiante` o `mixta`; una orientación debe declarar la intención docente cuando corresponda. |
| `estado_editorial` | `borrador`, `en_revision`, `publicable`, `publicado` o `archivado`. |
| `unidades` | Unidad principal y relaciones secundarias con alcance declarado. |
| `descripcion` y `proposito` | Qué articula, para qué y qué no pretende resolver. |
| `rutas_analisis` | Identificador estable, título público, pregunta guía, intervención didáctica y evidencia esperada de cada ruta. |
| `lecturas_vinculadas` | Identificadores `HIST2_XXXX`, rutas de análisis, referencias canónicas y alcance. |
| `evidencia_integradora` | Producto o desempeño que ayuda a organizar. |
| `cobertura_curricular` | Aprendizajes atendidos y vacíos declarados. |
| `contenido_path` | Ruta al Markdown del objeto. |
| `accesibilidad` | Estructura, lenguaje, alternativas y requisitos de uso. |
| `licencia_y_creditos` | Autoría, procedencia y condiciones de reutilización. |

El registro enlaza a los objetos existentes; no copia los resúmenes, evidencias o metadatos completos de las lecturas. Toda afirmación histórica permanece trazable al registro canónico correspondiente.

## 6. Contenido Markdown

El Markdown de una orientación debe incluir *frontmatter* YAML compatible con la proyección del sitio y, como mínimo:

1. propósito y audiencia;
2. problema o unidad que articula;
3. rutas de análisis, secuencias o criterios de uso;
4. lecturas relacionadas y papel de cada una;
5. evidencias integradoras;
6. límites de cobertura, complementariedades y advertencias;
7. regla de mantenimiento.

## 7. Interfaz y funcionamiento del repositorio

La interfaz deberá tratar las orientaciones como una colección diferente de las lecturas.

### Vista de índice `/orientaciones/`

- Tarjetas con título, tipo, audiencia, unidades, estado y descripción breve.
- Filtros por unidad, tipo y audiencia.
- Señalización visible de `en_revision`, `publicable` o `publicado`.
- Acceso desde la navegación docente, sin ocultar que un sitio estático no crea una barrera de autorización por sí solo.

### Vista de detalle `/orientaciones/:slug/`

- Encabezado con propósito, audiencia, unidad y estado.
- Itinerario o rutas de análisis como navegación interna accesible.
- Lecturas vinculadas como tarjetas o enlaces con identificador, título, unidad principal, alcance y papel dentro de la orientación.
- Evidencia integradora y criterios de uso.
- Bloque de límites: vacíos de cobertura, fuentes complementarias necesarias y advertencias contra inferencias no sustentadas.
- Enlaces a fichas pedagógicas y fuentes institucionales; nunca publicación automática de PDFs locales o materiales pendientes.

### Integración con las vistas de unidad y lectura

- La vista de cada unidad mostrará sus orientaciones relacionadas junto con las lecturas, distinguiendo ambas categorías visual y semánticamente.
- Una ficha individual puede mostrar la orientación como “articulación docente relacionada”, sin sustituir su ruta de lectura propia.
- Para una trama transversal, la interfaz mostrará el alcance de cada relación —directo, contextual o secundario—, nunca una cobertura ficticia.

### Accesibilidad y funcionamiento

- Usar HTML semántico, jerarquía correcta de encabezados, navegación por teclado, foco visible y contraste suficiente.
- Las tablas deberán contar con encabezados, versión legible en pantallas pequeñas y texto explicativo alternativo cuando su complejidad lo requiera.
- No depender solo de color o iconos para estados, alcances o vacíos de cobertura.
- El contenido debe poder imprimirse, compartirse mediante URL estable y consultarse sin autenticación en la fase estática inicial.

## 8. Primer objeto formal

| ID | Tipo | Título | Audiencia | Estado |
| --- | --- | --- | --- | --- |
| `ORI_HIST2_U3_TRAMA_01` | `trama_transversal` | *Trama transversal de la Unidad 3 — Estado surgido de la Revolución* | Docente | `en_revision` |

Este objeto organiza nueve lecturas con relaciones secundarias ya verificadas. Declara explícitamente que el corpus actual no acredita cobertura suficiente de la Guerra Cristera; el sitio deberá preservar ese límite.

## 9. Controles de publicación

Antes de promover una orientación a `publicable`, se debe verificar:

1. Identificador y *slug* únicos.
2. Existencia de cada lectura, ficha o recurso vinculado.
3. Coherencia entre unidad, alcance declarado y referencias canónicas.
4. Presencia de propósito, audiencia, evidencia integradora y límites explícitos.
5. Que no se declare como cubierto un aprendizaje que el corpus no acredita.
6. Integridad del *frontmatter*, enlaces internos y rutas públicas.
7. Revisión académica y editorial humana.

La futura automatización de CI deberá validar estos campos y detectar enlaces o identificadores rotos antes de construir el sitio.

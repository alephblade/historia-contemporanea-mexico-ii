# Auditoría general de preparación para despliegue

Repositorio educativo de Historia Contemporánea de México II · Preparatoria Agrícola · Universidad Autónoma Chapingo  
**Fecha de auditoría:** 31 de agosto de 2026  
**Alcance:** contenidos canónicos, fichas pedagógicas, trazabilidad, arquitectura de recursos derivados y preparación para la fase de implementación del sitio.

## Dictamen ejecutivo

El proyecto está **listo para iniciar el diseño, construcción y pruebas locales del repositorio web**. La base editorial y pedagógica está completa, validada y organizada para que un agente de implementación la consuma como fuente de verdad.

No está todavía listo para una publicación pública definitiva. Antes de esa promoción deberán resolverse las decisiones institucionales, licencias, revisión académica y configuración de GitHub indicadas en la sección 6.

## 1. Integridad y cobertura verificadas

| Control | Resultado | Dictamen |
| --- | ---: | --- |
| Registros canónicos JSON | 20 de 20 | Completo |
| Fichas pedagógicas Markdown | 20 de 20 | Completo |
| Carpetas de fuentes de lectura | 20 de 20 | Completo |
| PDFs fuente asociados | 20 de 20 | Completo |
| Identificadores `HIST2_XXXX` únicos | 20 de 20 | Aprobado |
| *Slugs* únicos | 20 de 20 | Aprobado |
| Recursos derivados planeados | 3 por ficha; 60 en total | Aprobado como planeación |
| Validación automática | 20 registros y 20 fichas aprobados | Aprobado |

La validación se ejecutó mediante `scripts/validar_produccion.py`. El resultado fue: **VALIDACIÓN APROBADA**, con 20 registros y 20 fichas revisados.

## 2. Consistencia editorial, curricular y pedagógica

- Los registros usan el esquema canónico 2.0 y las fichas el esquema pedagógico 2.1.
- Todos los registros y fichas permanecen en estado `en_revision`. Es correcto: expresa que superaron controles técnicos y de curaduría, pero aún requieren promoción académica explícita antes de quedar `publicable` o `publicado`.
- Se conservan las cinco unidades canónicas: Régimen Porfirista, Revolución Mexicana, Estado surgido de la Revolución, Consolidación del sistema político autoritario, y Neoliberalismo y alternancia.
- Cobertura por unidad principal: Régimen Porfirista, 4; Revolución Mexicana, 11; Estado surgido de la Revolución, 0; Consolidación del sistema político autoritario, 4; Neoliberalismo y alternancia, 1.
- La Unidad 3 no cuenta con lectura principal. Esta condición se atiende mediante la orientación `ORI_HIST2_U3_TRAMA_01`, cuyo contenido está en `orientaciones_pedagogico_curriculares/contenido/ORI_HIST2_U3_TRAMA_01.md`; organiza nueve vínculos secundarios ya verificados como acometidas de enseñanza. La trama conserva un límite explícito: el corpus no acredita cobertura suficiente de la Guerra Cristera.
- Todas las fichas declaran una ruta de lectura, andamiaje conceptual, actividades con producto observable, límites de alcance y la tríada de recursos derivados planeados.
- Los límites de acceso y de licencias se documentan de manera consistente: los PDFs fuente no deberán trasladarse al sitio público por defecto. La interfaz mostrará la referencia y la URL institucional, salvo autorización o licencia que permita otro tratamiento.

## 3. Arquitectura de contenidos apta para implementación

La arquitectura semántica vigente es coherente para una aplicación estática:

```text
registros/HIST2_XXXX.json                 fuente curatorial de verdad
fichas_pedagogicas/HIST2_XXXX_*.md        interfaz pedagógica legible
fuentes/lecturas/HIST2_XXXX/              insumos de trabajo; no publicación automática
fuentes/materiales_asociados_pendientes/  materiales heredados sin aprobar
scripts/validar_produccion.py             compuerta de control existente
```

El sitio deberá generar proyecciones públicas deterministas desde los registros canónicos, sin modificar los JSON ni reemplazarlos por hojas de cálculo, CSV o formularios. La información de curaduría interna y los PDFs locales no deben exponerse por defecto.

Los recursos derivados tienen identificación y relación pedagógica planeadas, pero no existen como recursos publicados ni como registros propios. Deben mostrarse como `planeado`, sin URL, enlace de descarga ni apariencia de disponibilidad.

## 4. Materiales heredados correctamente aislados

Se mantienen fuera del flujo de publicación automática en `fuentes/materiales_asociados_pendientes/`:

- Dos materiales asociados a `HIST2_0016`.
- Cuatro materiales asociados a `HIST2_0019`.

Estos seis archivos requieren evaluación de contenido, accesibilidad, créditos, licencia, registro propio y relación pedagógica antes de asociarse al sitio. No constituyen una omisión del despliegue inicial.

## 5. Estado de la infraestructura

La carpeta actual aún no es un repositorio Git y no contiene un proyecto Astro, directorios `src/`, `data/`, `public/`, configuración de despliegue ni flujos de integración continua. Esto es congruente con la secuencia del proyecto: la fase de contenido antecede a la implementación.

La siguiente fase deberá crear estos elementos sin alterar la fuente canónica. El stack previamente evaluado —GitHub + Astro + GitHub Pages— sigue siendo adecuado para una primera versión estática, versionada y de bajo costo.

## 6. Condiciones para pasar de pruebas a producción pública

| Decisión o condición | Responsable por definir | Efecto si falta |
| --- | --- | --- |
| Revisión académica de los 20 registros y fichas; promoción a `publicable` | Responsable académico del proyecto | El sitio puede probarse, pero no debe presentarse como versión final aprobada. |
| Cuenta u organización de GitHub, nombre, visibilidad y URL del repositorio | Titular institucional o responsable del proyecto | No se puede activar GitHub Pages ni establecer el remoto de producción. |
| Licencia del contenido propio del repositorio | Responsable institucional | No se debe publicar una licencia genérica ni reutilizar contenidos sin decisión expresa. |
| Política de enlaces y reproducción de fuentes de terceros | Curaduría y responsable institucional | Los PDFs locales no se publican; se enlazan a sus fuentes institucionales cuando corresponda. |
| Decisión sobre CMS | Responsable técnico e institucional | Decap CMS se pospone hasta aprobar OAuth, secretos y una persona responsable; no se considera capacidad automática de GitHub Pages. |
| Google Sheets | Responsable técnico e institucional | Se mantiene opcional; la salida mínima de intercambio será un CSV versionado. |

## 7. Encargo mínimo para el agente de despliegue

El agente responsable de la siguiente fase deberá:

1. Crear un proyecto Astro estático dentro de este directorio y preservar sin edición los registros, fichas y fuentes de trabajo.
2. Implementar una capa de proyección pública validada desde `registros/`, con tipos, esquema ejecutable y validación en CI.
3. Generar rutas por lectura con el *slug* público, además de vistas por las cinco unidades, búsqueda o filtrado local y enlaces seguros a las fuentes institucionales.
4. Consumir las fichas pedagógicas como contenido legible y los registros como datos estructurados; no duplicar manualmente metadatos en componentes.
5. Mostrar estado editorial y recursos derivados planeados sin simular que están publicados.
6. Incorporar accesibilidad desde el inicio: HTML semántico, navegación por teclado, contraste, encabezados jerárquicos, etiquetas, alternativas textuales y diseño adaptable.
7. Excluir PDFs locales y materiales pendientes del paquete público por defecto; enlazar únicamente las URL verificadas del registro.
8. Incorporar pruebas de construcción, enlaces internos, unicidad de rutas, validación de esquema y ejecución de `scripts/validar_produccion.py` en CI.
9. Configurar, solo tras definir el remoto de GitHub, un flujo de GitHub Pages con las acciones oficiales `configure-pages`, `upload-pages-artifact` y `deploy-pages`.
10. Documentar instalación, ejecución local, construcción, validación, despliegue, modelo de datos y procedimiento para incorporar una nueva lectura o recurso derivado.

## 8. Criterio de salida para la siguiente fase

La fase de implementación quedará lista para revisión cuando el sitio compile localmente, genere una ruta única para cada lectura, exponga las cinco unidades canónicas, conserve vínculos con los identificadores `HIST2_XXXX`, no incluya fuentes no autorizadas, supere validaciones automatizadas y cuente con documentación de operación.

La publicación pública definitiva quedará condicionada a las decisiones de la sección 6.

# Instrumento rector de extracción, verificación y curaduría de lecturas

Repositorio de lecturas de Historia Contemporánea de México II  
Preparatoria Agrícola, Universidad Autónoma Chapingo  
Versión 2.0 — 31 de agosto de 2026

## 1. Propósito y carácter del documento

Este instrumento es la referencia operativa para capturar, verificar, curar y documentar cada lectura del repositorio. Establece qué información se registra, cómo se acredita, qué parte corresponde a la fuente y qué parte es una decisión pedagógica razonada.

No sustituye al Plan de Estudios ni al Documento Base de Alineación y Criterios de Curaduría. Los traduce en un procedimiento de trabajo reproducible. Cuando exista una contradicción, prevalecen, en este orden:

1. El Plan de Estudios vigente.
2. El Documento Base de Alineación y Criterios de Curaduría.
3. Este instrumento rector.
4. La hoja de cálculo, las fichas y otros productos derivados.

Los valores cerrados de estado editorial, acceso, nivel, tipo de material, verificación y alcance curricular se rigen por el *VOCABULARIO CONTROLADO DEL REGISTRO CANÓNICO*.

La antigua *Ficha pedagógica tipo para el repositorio* no se utiliza como referencia curricular, porque conserva una organización anterior de unidades. La ficha vigente es *FICHA PEDAGÓGICA DEL RECURSO*.

## 2. Principios de trabajo

1. **Primacía de la evidencia.** Ningún dato editorial, bibliográfico o factual se registra como definitivo sin una fuente identificable.
2. **Curaduría explícita.** El resumen, el nivel, la unidad temática y las relaciones pedagógicas son decisiones de curaduría; deben ser congruentes con el texto y reconocerse como tales.
3. **Modelo relacional.** Una lectura se relaciona con múltiples conocimientos, aprendizajes y referencias temáticas. No se comprimen estas relaciones en una sola celda.
4. **No fabricación de completitud.** Las cotas de registros son capacidades máximas, nunca cuotas obligatorias. Un vínculo que no se puede justificar no se inventa.
5. **Trazabilidad.** Cada incorporación, corrección o conflicto debe conservar una fuente, un localizador y un estado de verificación.
6. **Accesibilidad y pertinencia.** La captura debe permitir al profesorado elegir materiales adecuados al grupo y al estudiantado comprender para qué, cómo y con qué dificultad trabajará una lectura.

## 3. Marco curricular canónico

Todas las lecturas se vinculan con una o más de las siguientes unidades, usando exactamente estas denominaciones:

1. Régimen Porfirista
2. Revolución Mexicana
3. Estado surgido de la Revolución
4. Consolidación del sistema político autoritario
5. Neoliberalismo y alternancia

Se registra una unidad principal y, solo cuando el texto lo justifique, una o más secundarias. En la hoja maestra se expresan en orden de pertinencia y separadas por `|`.

## 4. Arquitectura de la información

```text
Fuente local y/o institucional verificable
                ↓
Registro canónico por lectura
  ├─ Metadatos y curaduría 1:1
  ├─ Relaciones pedagógicas 1:N
  └─ Evidencias y estados de verificación
                ↓
Productos derivados
  ├─ Hoja maestra e intercambio en Excel
  ├─ Ficha pedagógica del recurso
  ├─ Preguntas, actividades y evaluación
  └─ Repositorio o interfaz futura
```

El **registro canónico por lectura** es la fuente de verdad. La hoja de cálculo funciona como inventario de trabajo e interoperabilidad; no sustituye la evidencia ni debe ser la única representación de los datos.

## 5. Estructura 1:1: metadatos y curaduría básica

Cada lectura tiene una sola instancia de los siguientes catorce campos.

| N.º | Campo | Regla de captura | Límite |
| ---: | --- | --- | ---: |
| 1 | `id_recurso` | Identificador único con formato `HIST2_0000`. | 15 caracteres |
| 2 | `Indice` | Secuencia de control con formato `lectura_N`. | 20 caracteres |
| 3 | `Título` | Título oficial de la fuente; no una paráfrasis. | 150 caracteres |
| 4 | `Nombre del archivo` | Nombre físico del recurso local, preferentemente normalizado. | 60 caracteres |
| 5 | `Autoría` | Autoría, coordinación, traducción o institución, según conste en la fuente. Si no consta, se declara la ausencia; no se infiere. | 200 caracteres |
| 6 | `Descripción de la Fuente` | Contexto editorial, institucional o documental breve. | 300 caracteres |
| 7 | `Año (si se conoce)` | Año de la edición consultada, de cuatro dígitos. Si solo existe fecha de creación del archivo, se registra como nota, no como año editorial definitivo. | 4 caracteres |
| 8 | `Tipo de material` | Tipología documental concreta: artículo académico, capítulo, antología documental, reseña, exposición digital, etc. | 60 caracteres |
| 9 | `Acceso` | `Abierto` o `Institucional`, confirmados desde una fuente de acceso. | 20 caracteres |
| 10 | `Fuente / URL` | Enlace de procedencia o acceso, con revisión de vigencia cuando sea posible. | 200 caracteres |
| 11 | `Resumen analítico` | Síntesis de 80–110 palabras sobre contenido, enfoque y relevancia histórica. No es copia de una sinopsis institucional. | 750 caracteres |
| 12 | `Unidad temática UACH` | Unidad principal y secundarias canónicas, separadas por `|` en Excel. | 150 caracteres |
| 13 | `Temas y conceptos clave` | Descriptores separados por comas, presentes o justificadamente inferidos del texto. | 500 caracteres |
| 14 | `Nivel sugerido` | `introductorio`, `intermedio`, `avanzado` o combinación justificada. | 30 caracteres |

### 5.1 Campos canónicos para publicación y flujo editorial

Los siguientes atributos no sustituyen los catorce campos de la hoja maestra. Pertenecen al registro canónico y permiten generar, validar y publicar las proyecciones del repositorio:

| Campo | Regla |
| --- | --- |
| `slug` | Identificador público único, legible y estable para la URL. No se infiere del identificador de recurso ni se reutiliza al archivar una lectura. |
| `estado_editorial` | Uno de: `borrador`, `en_revision`, `publicable`, `publicado`, `archivado`. Solo `publicable` y `publicado` pueden formar parte de la proyección pública. |
| `version_registro` | Versión semántica del registro, incrementada cuando una corrección cambia datos, relaciones o criterios. |
| `fecha_alta` y `fecha_modificacion` | Fechas ISO `AAAA-MM-DD` de control del registro; no sustituyen las fechas bibliográficas ni técnicas. |

El formato estable del identificador se conserva como `HIST2_0000`. El guion bajo no forma parte del `slug` y no se reemplaza por un guion medio en productos derivados.

## 6. Estructura 1:N: relaciones pedagógicas

Los siguientes campos representan relaciones independientes. Cada registro debe ocupar una clave propia y conservar su evidencia.

| N.º | Relación | Claves disponibles | Capacidad máxima | Regla |
| ---: | --- | --- | ---: | --- |
| 15 | Conocimientos y habilidades específicos | `ch_1` a `ch_12` | 12 | Formular con verbos observables y lenguaje del programa: analizar, comparar, explicar, relacionar, argumentar, etc. |
| 16 | Aprendizajes del programa apoyados | `aprendizaje_1` a `aprendizaje_9` | 9 | Expresar el aprendizaje que la lectura apoya y aclarar si la relación es principal o secundaria. |
| 17 | Referencias temáticas | `referencia_1` a `referencia_26` | 26 | Registrar conceptos, actores, procesos, instituciones, lugares o documentos; cada referencia debe tener localizador. |

Las claves sin una relación demostrable permanecen nulas. No se escriben palabras de relleno, por ejemplo, `VACÍA`, `N/A` o un contenido genérico.

## 7. Evidencia, localizadores y estados

Todo dato nuevo, corregido o curado conserva los atributos siguientes. En el JSON canónico se nombran siempre como `evidencias` y se almacenan como un arreglo, aun cuando haya una sola evidencia. Esto evita que los campos 1:1 y 1:N tengan formas incompatibles.

| Atributo | Contenido |
| --- | --- |
| `fuente` | Nombre del PDF, página institucional, libro o documento de referencia. |
| `localizador` | Página, lámina, sección, índice, portada, colofón o URL precisa. |
| `estado` | Uno de los estados definidos abajo. |
| `nota` | Explicación breve de una ambigüedad, conflicto o decisión de curaduría. |

Estados permitidos:

| Estado | Uso |
| --- | --- |
| `verificado_fuente_primaria` | El dato aparece en el PDF, documento original o recurso directamente consultado. |
| `verificado_fuente_institucional` | El dato procede de la página oficial de la institución editora, repositorio o revista. |
| `derivado_de_texto_verificado` | Síntesis, clasificación o mapeo curricular formulado a partir de evidencia comprobada. |
| `pendiente_revision` | El dato es plausible, pero falta una prueba suficiente para consolidarlo. |
| `conflicto_detectado` | Dos fuentes discrepan o la evidencia disponible impide elegir una versión. |

Un año editorial no se deduce automáticamente de los metadatos de creación del PDF. Tampoco se atribuye una autoría institucional solo porque una institución aloje el archivo.

### 7.1 Alineación curricular estructurada

Las relaciones de conocimientos, habilidades y aprendizajes pueden añadir `alineacion_curricular` como arreglo de objetos. Cada objeto indica, sin depender de una justificación en texto libre:

| Atributo | Contenido |
| --- | --- |
| `unidad_id` | `u1` a `u5`, conforme a las cinco unidades canónicas. |
| `referente_programa` | Conocimiento, habilidad u objetivo del programa que la lectura apoya. |
| `alcance` | `directo`, `contextual` o `secundario`. |
| `nota` | Precisión opcional que evita sobreatribuir alcance a la lectura. |

La justificación en prosa puede conservarse como nota editorial, pero no es el único soporte de la relación curricular.

### 7.2 Control de integridad temporal

Cada registro debe distinguir, cuando aplique, entre:

| Dato temporal | Uso |
| --- | --- |
| `periodo_historico_abordado` | Proceso, coyuntura o rango cronológico que estudia la lectura. |
| `anio_publicacion_recurso` | Año de la edición, reseña, artículo o material que se está capturando. |
| `anio_obra_analizada` | Año de una obra reseñada o discutida por la lectura, cuando no coincide con el recurso capturado. |
| `fecha_creacion_archivo` | Metadato técnico del archivo; nunca sustituye por sí mismo al año editorial. |

Este control evita anacronismos: una reseña contemporánea puede estudiar un periodo histórico anterior y comentar una obra publicada en otro año. Ninguna de esas fechas debe reemplazar a otra.

## 8. Distinción entre tipos de información

| Tipo | Ejemplos | Tratamiento |
| --- | --- | --- |
| Dato bibliográfico | título, autoría, edición, año, ISBN, editorial | Requiere evidencia directa. |
| Dato de acceso | URL, acceso abierto o institucional | Requiere comprobar el recurso o la página de procedencia. |
| Síntesis analítica | resumen, conceptos y alcance | Se redacta tras revisar el texto y se declara como curaduría derivada. |
| Mapeo curricular | unidad, conocimientos, aprendizajes | Se contrasta con el plan y se justifica mediante localizadores de la lectura. |
| Diseño didáctico | nivel, actividades, preguntas, evidencias | Se formula después de la captura, con base en la guía de mediación y la ficha vigente. |

## 9. Protocolo de captura por lectura

1. Abrir la fuente local y revisar visualmente portada, créditos, índice, colofón y estructura.
2. Extraer los metadatos verificables de los campos 1–10.
3. Contrastar el título, URL y acceso con la fuente institucional cuando exista.
4. Leer o muestrear secciones suficientes para elaborar el resumen, los temas y el nivel sugerido.
5. Identificar la unidad principal y, si procede, secundarias, usando solo el marco de cinco unidades.
6. Registrar conocimientos, aprendizajes y referencias en forma 1:N, sin agotar artificialmente las cotas.
7. Completar el control de integridad temporal y la revisión de cobertura de voces y perspectivas.
8. Añadir evidencia y estado a cada dato que no sea administrativo.
9. Marcar y aislar los conflictos; no resolverlos mediante suposición.
10. Actualizar la hoja maestra a partir del registro canónico validado.
11. Solo después, derivar la ficha pedagógica, preguntas, actividades, sugerencias de mediación y recursos complementarios.

## 10. Reglas de calidad antes de consolidar un registro

Un registro está listo cuando cumple todos los puntos siguientes:

- El identificador y el archivo local coinciden.
- Los campos 1:1 aplicables respetan sus límites de longitud.
- Toda ausencia justificada permanece nula o se declara como pendiente; no se rellena por apariencia de completitud.
- El resumen no confunde la voz de la fuente con la interpretación del repositorio.
- Las unidades emplean únicamente el vocabulario canónico.
- Cada relación 1:N es específica, no repetitiva y dispone de evidencia localizable.
- Las evidencias usan una misma forma de arreglo y las relaciones curriculares declaran unidad, referente y alcance.
- El `slug` es único y el estado editorial corresponde al nivel de validación realmente alcanzado.
- Los valores de nivel son decisiones pedagógicas explicables por extensión, lenguaje, densidad conceptual y necesidad de andamiaje.
- No hay relaciones, fechas o autorías importadas de otra lectura por analogía.

### 10.1 Dosificación de la densidad conceptual

El nivel sugerido debe orientar la complejidad de las relaciones pedagógicas, sin reducirlas a una lista mecánica de verbos.

| Nivel | Operaciones predominantes | Criterio de redacción |
| --- | --- | --- |
| Introductorio | identificar, describir, ubicar, reconocer | Priorizar conceptos, cronología y relaciones explícitas; ofrecer andamiaje. |
| Intermedio | explicar, comparar, relacionar, interpretar | Pedir relaciones entre procesos, causas, consecuencias y perspectivas. |
| Avanzado | contrastar fuentes, problematizar, evaluar, deconstruir discursos | Exigir análisis historiográfico, tensión entre interpretaciones y argumentación sustentada. |

Un registro con más de un nivel puede combinar operaciones, siempre que indique qué parte del texto requiere mayor andamiaje.

### 10.2 Revisión de cobertura de voces y perspectivas

Antes de consolidar una lectura, se revisa explícitamente si aborda:

- Mujeres, género y participación ciudadana.
- Pueblos indígenas, comunidades afrodescendientes u otras colectividades históricamente subordinadas.
- Desigualdad, derechos humanos, territorio, trabajo, memoria y diversidad cultural.

Si alguno de estos ejes aparece de manera sustantiva, debe tener al menos una relación visible en `ch_N`, `aprendizaje_N` o `referencia_N`, con su localizador. Si la fuente no lo aborda, se registra `ausente_en_fuente`; nunca se simula una presencia que el texto no contiene.

La revisión protege la diversidad de voces sin convertirla en una cuota ni desplazar el contenido dominante de la lectura.

## 11. Control de conflictos y correcciones

Cuando el Excel previo, una página web y el PDF discrepen:

1. Se conserva el dato procedente de la fuente más directa y documentada.
2. Se registra el conflicto en una nota, sin borrar su historia de decisión.
3. La hoja de cálculo se actualiza solo cuando el dato ya tenga un estado verificable o exista una decisión editorial explícita.
4. Si el conflicto afecta un campo crítico —autoría, año, tipo o unidad— se revisa antes de generar recursos derivados.

Ejemplos de alertas que este instrumento evita:

- Asociar el año de un libro reseñado al año de la reseña.
- Nombrar como antología una obra de un solo autor.
- Atribuir al PDF datos que pertenecen a otra lectura.
- Asignar una unidad por cercanía temática, sin considerar el periodo y el contenido dominante del texto.

## 12. Relación con los productos del proyecto

| Producto | Función respecto del instrumento |
| --- | --- |
| Registro canónico estructurado | Conserva datos, relaciones, evidencias y control editorial; es la fuente de verdad. |
| Proyección pública generada | Adapta el registro canónico a la interfaz sin perder el identificador ni crear nuevos datos. |
| Hoja maestra de Excel | Inventario editable e intercambio; contiene los catorce campos 1:1. |
| Hojas secundarias del Excel | Proyección matricial de las relaciones 1:N; no deben reducir ni duplicar el registro canónico. |
| Ficha pedagógica del recurso | Presentación didáctica para docentes y estudiantes, derivada del registro validado. |
| Recursos derivados | Preguntas, cuestionarios, mapas y videos generados después del mapeo curricular. |

## 13. Formato mínimo del registro canónico

El repositorio puede almacenar cada lectura como JSON, YAML u otra estructura equivalente. Debe conservar esta lógica:

```json
{
  "id_recurso": "HIST2_0001",
  "slug": "...",
  "estado_editorial": "en_revision",
  "campos_1_a_1": { "titulo": { "valor": "...", "evidencias": [] } },
  "control_temporal": {},
  "conocimientos_habilidades_especificos": [],
  "aprendizajes_programa_apoyados": [],
  "referencias_tematicas": [],
  "revision_cobertura": [],
  "observaciones": []
}
```

El registro piloto `HIST2_0001.json` muestra la aplicación práctica del esquema sin forzar relaciones inexistentes.

## 14. Mantenimiento y revisión

Este instrumento se revisará cuando ocurra alguno de estos eventos:

- Cambio del plan de estudios o de las unidades de aprendizaje.
- Incorporación de un tipo de fuente no contemplado.
- Identificación de una ambigüedad recurrente que requiera una regla nueva.
- Desarrollo de una plataforma que demande un ajuste técnico de interoperabilidad.

Las modificaciones deben registrar fecha, responsable, motivo y efecto sobre registros ya capturados. La estabilidad del instrumento es importante: no se altera para acomodar una excepción aislada.

## 15. Documentos relacionados

- Plan de Estudios — Historia Contemporánea de México II.
- Documento Base de Alineación y Criterios de Curaduría.
- Guía general para la mediación didáctica y pedagógica de lecturas.
- FICHA PEDAGÓGICA DEL RECURSO.
- Metadescriptores de la base de datos.
- Registro canónico piloto: `registros/HIST2_0001.json`.

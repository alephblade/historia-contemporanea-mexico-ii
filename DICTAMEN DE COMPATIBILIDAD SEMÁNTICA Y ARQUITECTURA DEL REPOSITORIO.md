# Dictamen de compatibilidad semántica y arquitectura del repositorio

**Estado:** propuesta de decisión tras la revisión del registro piloto `HIST2_0002` y del documento de stack tecnológico (31 de agosto de 2026).

## 1. Resolución central

El registro canónico de cada lectura será la **fuente curatorial de verdad**. El sitio web, los archivos CSV, Google Sheets y Excel serán proyecciones generadas de ese registro; no deberán sustituirlo ni simplificarlo de manera irreversible.

La unidad de edición recomendada es un archivo por lectura en `registros/`, no un único arreglo editable de veinte registros. Esta decisión conserva la evidencia, reduce conflictos de edición y permite revisar, aprobar y versionar cada lectura por separado.

```text
registro canónico por lectura ──validación──> proyección pública para Astro
              │                                      │
              ├──────────────> CSV / Excel ──────────┤
              └──────────────> vista de consulta ────┘
```

## 2. Decisiones semánticas vigentes

| Elemento | Decisión |
| --- | --- |
| Identificador estable | Se conserva `HIST2_0001`, con guion bajo, porque ya existe en la hoja maestra y en los registros piloto. No se cambia a `HIST2-0001`. |
| URL pública | Se incorpora un `slug` independiente, único y legible; nunca se deriva automáticamente del identificador. |
| Estado editorial | Se incorporará `estado_editorial`: `borrador`, `en_revision`, `publicable`, `publicado` o `archivado`. |
| Unidades | Se mantienen exclusivamente las cinco unidades canónicas acordadas. Cada relación curricular deberá declarar unidad principal/secundaria y alcance (`directo`, `contextual` o `secundario`). |
| Tipología | El vocabulario de `tipo_material` debe ampliarse para incluir, al menos, `exposición histórica digital` y `libro colectivo de investigación histórica`; no se forzarán equivalencias inexactas como “Libro digital”. |
| Pedagogía pendiente | Preguntas, actividades, sugerencias y evaluación permanecen ausentes o nulas hasta su diseño pedagógico posterior; no se fabrican para completar campos del CMS. |

## 3. Estructura de evidencia y alineación curricular

La versión siguiente del esquema canónico normalizará las dos relaciones que hoy tienen forma mixta:

1. Todo dato verificable usará `evidencias`, siempre como arreglo de objetos, incluso cuando haya una sola evidencia.
2. La relación con el programa no será texto libre. Cada elemento 1:N podrá llevar `alineacion_curricular`, un arreglo de objetos con `unidad_id`, `referente_programa`, `alcance` y, cuando sea pertinente, una nota.

Modelo mínimo:

```json
{
  "id": "ch_9",
  "valor": "Relacionar la defensa histórica del territorio con conflictos hídricos recientes.",
  "evidencias": [
    {
      "fuente": "yaquis-memoria-territorio-politica.pdf",
      "localizador": "pp. 153-155",
      "estado": "verificado_fuente_primaria"
    }
  ],
  "alineacion_curricular": [
    {
      "unidad_id": "u5",
      "referente_programa": "movimientos sociales y problemas actuales de una sociedad multiétnica y pluricultural",
      "alcance": "secundario"
    }
  ]
}
```

Esto atiende la observación metodológica del piloto 2: la justificación curricular deja de ser un texto sin semántica operativa. La localización de `ch_9` está completa en el piloto actual; la mejora requerida es estructural, no una ampliación ficticia de contenido.

## 4. Capas de datos

| Capa | Ubicación propuesta | Propósito |
| --- | --- | --- |
| Canónica | `registros/HIST2_0001.json` | Evidencia, control temporal, cobertura, decisiones de curaduría y trazabilidad. |
| Vocabularios | `data/unidades.json` y catálogos controlados | Valores válidos, slugs de unidades y etiquetas de presentación. |
| Pública generada | `data/lecturas.publicas.json` | Campos que Astro muestra y consulta, sin notas internas innecesarias. |
| Orientaciones docentes | `orientaciones_pedagogico_curriculares/registros/*.json` y `contenido/*.md` | Rutas, tramas, secuencias y matrices que articulan objetos existentes sin sustituir sus fuentes de verdad. |
| Intercambio | `exports/*.csv` y libro Excel generado | Consulta, respaldo e interoperabilidad; nunca edición primaria. |

La proyección pública podrá usar los nombres planos que espera una interfaz (`titulo`, `resumen`, `unidades`, `nivel_sugerido`), pero deberá conservar `id_recurso` y el vínculo al registro canónico. Las orientaciones docentes se proyectarán como colección independiente, con su propio identificador, audiencia, estado y relaciones. La transformación será determinista y validada en CI.

## 5. Ajustes necesarios al stack tecnológico

La combinación GitHub + Astro + GitHub Pages es adecuada para un repositorio estático, gratuito y versionado. No obstante, cuatro precisiones son necesarias antes de declararla definitiva:

1. **Decap CMS no queda resuelto solo con GitHub Pages.** Para autenticar y escribir en GitHub requiere un flujo OAuth y, normalmente, un proxy o servicio de autenticación adicional. La fase de CMS debe declarar y aprobar explícitamente ese componente, sus credenciales y su responsable; no puede presentarse como una capacidad automática de `/admin/`.
2. **El despliegue debe usar las acciones oficiales de GitHub Pages** (`configure-pages`, `upload-pages-artifact` y `deploy-pages`), no depender de una acción comunitaria como requisito del diseño.
3. **La sincronización hacia Google Sheets requiere credenciales y autorización de Google.** Se pospone como integración opcional: la salida mínima será un CSV versionado. Si se activa Sheets, las credenciales se guardarán como secretos de GitHub y la hoja se compartirá con la cuenta de servicio o el flujo OAuth correspondiente.
4. **Los PDFs de terceros no se publicarán automáticamente en GitHub.** Solo se alojarán copias cuando la licencia y la autorización lo permitan; en los demás casos el sitio mostrará la URL institucional de acceso y la referencia bibliográfica.

## 6. Validaciones obligatorias

La automatización tendrá dos niveles.

| Nivel | Verifica |
| --- | --- |
| Canónico | Identificadores, campos obligatorios según estado, vocabularios, unicidad de slug, límites, estructura de evidencias, fechas, relaciones curriculares y URLs. |
| Público | Que la proyección se genere sin pérdida de campos públicos, que las rutas sean únicas y que Astro construya el sitio sin enlaces internos rotos. |
| Orientaciones | Identificador, *slug*, audiencia, vínculos existentes, alcance curricular, límites de cobertura y rutas de contenido. |

Un JSON Schema versionado será la especificación ejecutable. Decap CMS ayudará a capturar valores, pero la validación de CI será la autoridad final.

## 7. Alcance inmediato

Antes de continuar con la lectura 3 se deberá publicar la versión 2.0 del instrumento rector, con este modelo de evidencia, alineación curricular, estado editorial y slug. Los pilotos 1 y 2 se migrarán de forma controlada a esa versión, sin reescribir sus conclusiones históricas. Las capas de mediación pedagógica se incorporarán después de completar y aprobar la base curatorial.

## 8. Datos que requieren confirmación académica o institucional

- Nombre de la persona responsable académica que aparecerá públicamente.
- Licencia del contenido propio del repositorio y permisos de enlace o reproducción de cada lectura.
- Cuenta u organización de GitHub, URL definitiva y carácter público o privado del repositorio.
- Si se aprueba un proveedor de autenticación OAuth para Decap CMS o si el CMS se deja para una fase posterior.

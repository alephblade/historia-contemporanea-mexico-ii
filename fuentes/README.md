# Fuentes locales de trabajo

Esta carpeta contiene los archivos originales seleccionados para la curaduría. Es una capa de **consulta y verificación local**; no es la fuente editorial de verdad ni debe publicarse automáticamente en un sitio web.

## Organización

```text
fuentes/
  lecturas/
    HIST2_0001/                 # un directorio por registro canónico
      nombre-normalizado.pdf    # archivo fuente principal
  materiales_asociados_pendientes/
    HIST2_0016/                 # apoyos heredados aún no auditados
    HIST2_0019/
```

Cada carpeta de `lecturas/` se nombra con el identificador canónico, no con su orden visual. El archivo contenido conserva su nombre físico normalizado. Esta separación permite que el orden, el título público o el *slug* cambien sin alterar la localización estable de la fuente.

## Regla de publicación

Los PDFs, videos u otros materiales de esta carpeta no se incorporan automáticamente al repositorio público. Antes se verifican acceso, derechos, licencia, tamaño y modalidad de alojamiento. El registro canónico en `registros/` conserva la evidencia y la URL de procedencia; la futura interfaz pública consume proyecciones aprobadas, no esta carpeta de trabajo.

Los materiales en `materiales_asociados_pendientes/` se preservan como antecedentes. No se consideran recursos derivados publicados ni sustituyen la tríada normativa de video, infografía y cuestionario integrador hasta que se revisen y se registren conforme a su nomenclatura.

**Normalización efectuada:** 31 de agosto de 2026.

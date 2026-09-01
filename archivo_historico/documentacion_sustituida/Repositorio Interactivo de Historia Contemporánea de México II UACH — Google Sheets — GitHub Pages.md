# **PLAN DE IMPLEMENTACIÓN EN DOS SEMANAS**

## **Repositorio Interactivo de Historia Contemporánea de México II — UACH**

Es viable publicar una primera versión funcional en dos semanas porque el proyecto ya se encuentra en una fase avanzada de consolidación: existen el plan curricular, la matriz de lecturas en Excel y una parte importante de las fichas pedagógicas (Pero hay que terminarlas, por ejemplo hay algunos campos de las tablas ue no se han terminado de capturar).

El objetivo no debe ser construir una plataforma académica compleja desde cero, sino publicar una **versión 1.0 navegable, académicamente coherente, técnicamente estable y sencilla de mantener**.

Tomando como fecha de inicio el **jueves 16 de julio de 2026** y como fecha de publicación el **miércoles 29 de julio de 2026**, se propone un esfuerzo aproximado de **50 a 56 horas efectivas**, dejando los sábados como margen de contingencia.

---

# **1\. OBJETIVO GENERAL DE LA IMPLEMENTACIÓN**

Publicar el **Repositorio Interactivo de Historia Contemporánea de México II — UACH** como un micrositio académico abierto, alojado mediante GitHub Pages, que permita:

* Consultar los materiales organizados por unidad temática.  
* Buscar recursos por título, autor o tema.  
* Filtrar por unidad, tipo de material, nivel y categoría.  
* Consultar una ficha pedagógica individual para cada recurso.  
* Mantener y ampliar el catálogo sin editar directamente el código.  
* Conservar un historial verificable de versiones y actualizaciones.  
* Automatizar la publicación cada vez que se actualice la base de datos.

---

# **2\. ARQUITECTURA TÉCNICA RECOMENDADA**

La arquitectura propuesta tendría cinco componentes principales:

## **2.1. Google Sheets como Catálogo Maestro Editorial**

La base de datos original en Excel se importará a una hoja estructurada de Google Sheets.

Google Sheets funcionará como:

* Base editorial principal.  
* Instrumento de mantenimiento.  
* Interfaz accesible para corregir registros.  
* Medio para agregar nuevas lecturas.  
* Sistema de control de campos y categorías.  
* Fuente de datos para el micrositio.

Esto permitirá que una persona responsable del contenido pueda mantener el catálogo sin necesidad de utilizar Git, editar archivos JSON o modificar código.

## **2.2. GitHub como repositorio técnico y documental**

GitHub almacenará:

* El código del micrositio.  
* Los componentes visuales.  
* Los scripts de validación.  
* Las configuraciones de publicación.  
* Copias exportadas del catálogo.  
* La documentación técnica.  
* El historial de cambios.  
* Las versiones publicadas.

## **2.3. Astro como generador del micrositio**

Astro se utilizará para construir el sitio estático.

Permitirá generar:

* Página principal.  
* Explorador de recursos.  
* Páginas de las cinco unidades.  
* Fichas individuales.  
* Filtros y buscador.  
* Guías para docentes y estudiantes.  
* Páginas de créditos, metodología y documentación.

## **2.4. GitHub Actions como mecanismo de automatización**

GitHub Actions se encargará de:

1. Obtener los datos desde Google Sheets.  
2. Validar la estructura de los registros.  
3. Detectar errores.  
4. Transformar los datos a JSON.  
5. Construir el sitio con Astro.  
6. Publicar la nueva versión en GitHub Pages.

## **2.5. GitHub Pages como alojamiento público**

GitHub Pages será el servicio encargado de publicar el micrositio en una dirección parecida a:

https://nombre-de-usuario.github.io/historia-contemporanea-mexico-ii-uach/

Posteriormente se podría conectar un dominio propio o institucional.

---

# **3\. FLUJO GENERAL DEL SISTEMA**

Excel original  
      ↓  
Importación y normalización  
      ↓  
Google Sheets  
Catálogo Maestro Editorial  
      ↓  
Exportación CSV o endpoint JSON  
      ↓  
GitHub Actions  
      ↓  
Validación y transformación  
      ↓  
Astro  
      ↓  
GitHub Pages  
      ↓  
Repositorio Interactivo público

El flujo cotidiano de actualización sería:

1\. La persona responsable modifica Google Sheets.  
2\. Cambia el estado del recurso a “Publicable”.  
3\. Se ejecuta la acción de actualización en GitHub.  
4\. GitHub descarga la versión actual del catálogo.  
5\. El sistema valida todos los registros.  
6\. Si no existen errores críticos, genera el sitio.  
7\. GitHub Pages publica la nueva versión.

---

# **4\. INSTRUMENTO DE MANTENIMIENTO**

## **Catálogo Maestro Editorial en Google Sheets**

La hoja de cálculo no debe funcionar simplemente como una tabla larga. Debe diseñarse como un instrumento editorial controlado.

El archivo podría llamarse:

HIST\_UACH\_Catalogo\_Maestro\_Editorial

Se recomienda dividirlo en las siguientes pestañas.

---

## **4.1. Pestaña `01_RECURSOS`**

Contendrá un registro por cada lectura, video, documento, mapa, podcast, sitio web o material académico.

Campos recomendados:

id  
slug  
estado\_publicacion  
titulo  
subtitulo  
autor  
institucion  
año  
unidad  
subunidad  
tipo\_de\_material  
nivel\_sugerido  
temas\_clave  
palabras\_clave  
url\_de\_acceso  
url\_alternativa  
descripcion\_breve  
resumen  
proposito\_pedagogico  
sugerencia\_didactica  
actividad\_sugerida  
preguntas\_guia  
producto\_esperado  
criterios\_de\_evaluacion  
duracion\_estimada  
modalidad  
consideraciones\_de\_accesibilidad  
derechos\_o\_condiciones\_de\_uso  
imagen  
fuente\_de\_imagen  
responsable\_del\_registro  
fecha\_de\_alta  
fecha\_de\_modificacion  
version  
observaciones

---

## **4.2. Pestaña `02_CATALOGOS_CONTROLADOS`**

Contendrá las categorías permitidas para evitar variantes de escritura.

Ejemplos:

UNIDADES  
TIPOS\_DE\_MATERIAL  
NIVELES\_SUGERIDOS  
MODALIDADES  
ESTADOS\_DE\_PUBLICACION  
TEMAS\_CLAVE  
TIPOS\_DE\_ACTIVIDAD

Los valores podrían ser:

### **Estados de publicación**

Borrador  
En revisión  
Publicable  
Publicado  
Requiere corrección  
Archivado

### **Tipos de material**

Artículo  
Capítulo de libro  
Libro  
Documento histórico  
Video  
Podcast  
Mapa  
Infografía  
Sitio web  
Archivo digital  
Fuente primaria  
Fuente secundaria  
Recurso docente

### **Modalidades**

Individual  
Parejas  
Equipo  
Grupal  
Presencial  
Virtual  
Híbrida

Esta pestaña alimentará listas desplegables y validaciones de datos dentro de `01_RECURSOS`.

---

## **4.3. Pestaña `03_UNIDADES_CURRICULARES`**

Contendrá la descripción general de las cinco unidades:

1. Régimen Porfirista.  
2. Revolución Mexicana.  
3. Estado surgido de la Revolución.  
4. Consolidación del sistema político autoritario.  
5. Neoliberalismo, alternancia y México contemporáneo.

Cada unidad puede tener:

id\_unidad  
numero  
nombre  
periodo\_historico  
descripcion  
objetivos  
aprendizajes\_esperados  
conceptos\_clave  
preguntas\_articuladoras  
imagen  
orden\_de\_publicacion

Esto permitirá que las páginas de unidad también se construyan automáticamente.

---

## **4.4. Pestaña `04_CONTROL_DE_CAMBIOS`**

Registrará modificaciones relevantes.

Campos:

fecha  
responsable  
id\_del\_recurso  
tipo\_de\_cambio  
descripcion\_del\_cambio  
version\_anterior  
version\_nueva  
estado  
observaciones

No todos los cambios menores tendrán que registrarse manualmente, pero sí:

* Correcciones conceptuales.  
* Cambio de URL.  
* Sustitución de materiales.  
* Modificación de criterios de evaluación.  
* Reclasificación de unidad.  
* Retiro o archivo de un recurso.

---

## **4.5. Pestaña `05_PENDIENTES_Y_QA`**

Contendrá incidencias detectadas durante la revisión.

Campos:

id\_incidencia  
id\_del\_recurso  
tipo\_de\_problema  
descripcion  
prioridad  
responsable  
fecha\_de\_deteccion  
fecha\_limite  
estado  
resolucion

Tipos de problema:

Enlace roto  
Información incompleta  
Duplicado  
Error de clasificación  
Falta de derechos  
Falta de accesibilidad  
Resumen insuficiente  
Actividad incompleta  
Error de autoría  
Error cronológico

---

## **4.6. Pestaña `06_CONFIGURACION`**

Contendrá datos generales del repositorio:

titulo\_del\_sitio  
subtitulo  
descripcion  
institucion  
curso  
responsable\_academico  
version\_actual  
correo\_de\_contacto  
url\_del\_repositorio  
url\_publica  
fecha\_de\_actualizacion  
licencia  
mensaje\_de\_portada

---

# **5\. REGLAS FUNDAMENTALES DEL CATÁLOGO**

## **5.1. Identificador inmutable**

Cada recurso debe tener un identificador único que nunca cambie.

Ejemplo:

HIST-UACH-0001  
HIST-UACH-0002  
HIST-UACH-0003

Aunque se modifique el título o la unidad, el identificador debe permanecer igual.

## **5.2. Slug único**

El slug se utilizará para construir la dirección web del recurso.

Ejemplo:

constitucion-politica-mexico-1917  
movimiento-estudiantil-1968  
tratado-libre-comercio-america-norte

La dirección resultante podría ser:

/recursos/movimiento-estudiantil-1968/

## **5.3. Estado de publicación**

Solamente los registros con estado:

Publicable

o:

Publicado

deberán aparecer en el sitio.

Los registros en estado `Borrador`, `En revisión` o `Requiere corrección` permanecerán ocultos.

## **5.4. Validación de campos**

El sistema comprobará automáticamente:

* Que exista un identificador.  
* Que el identificador no esté duplicado.  
* Que exista un título.  
* Que exista una unidad válida.  
* Que el tipo de material sea reconocido.  
* Que el slug no esté repetido.  
* Que las direcciones web tengan formato válido.  
* Que el estado de publicación sea correcto.  
* Que los recursos publicados tengan descripción.  
* Que los campos obligatorios estén completos.

## **5.5. Campos con listas desplegables**

Se utilizarán listas desplegables para:

* Unidad.  
* Tipo de material.  
* Estado de publicación.  
* Nivel sugerido.  
* Modalidad.  
* Prioridad.  
* Responsable.

Esto reducirá errores como:

Video  
video  
Vídeo  
Material audiovisual  
Recurso videográfico

Todos esos valores deberán normalizarse como una sola categoría.

---

# **6\. CONEXIÓN ENTRE GOOGLE SHEETS Y GITHUB**

Se contemplan dos modalidades.

## **Modalidad A. Hoja publicada como CSV**

Es la opción más sencilla para la versión inicial.

Google Sheets genera una dirección de exportación en formato CSV. GitHub Actions descarga ese archivo durante cada publicación.

Ventajas:

* Configuración rápida.  
* No requiere servidor.  
* No requiere credenciales complejas.  
* Adecuada para información académica pública.

Desventaja:

* La tabla debe estar disponible mediante una URL pública de exportación.

## **Modalidad B. Google Sheets API con credenciales privadas**

Es una modalidad más controlada.

GitHub Actions utiliza una cuenta de servicio para consultar la hoja sin hacerla pública.

Ventajas:

* El archivo maestro permanece restringido.  
* Mayor control de acceso.  
* Adecuado si existen datos internos o borradores delicados.

Desventajas:

* Requiere configurar Google Cloud.  
* Requiere una cuenta de servicio.  
* Se deben almacenar credenciales en GitHub Secrets.  
* Agrega complejidad técnica.

## **Recomendación para la versión 1.0**

Usar inicialmente la **Modalidad A**, siempre que el catálogo no contenga datos personales, información confidencial ni materiales restringidos.

La hoja pública de exportación debe contener únicamente los registros destinados al micrositio.

Los borradores o notas internas pueden permanecer en otra hoja privada.

---

# **7\. COPIA VERSIONADA DEL CATÁLOGO**

Aunque Google Sheets sea el instrumento de mantenimiento, GitHub deberá conservar una copia de cada versión publicada.

La estructura podría ser:

data/  
├── source/  
│   └── catalogo.csv  
├── generated/  
│   ├── recursos.json  
│   ├── unidades.json  
│   └── estadisticas.json  
└── archive/  
    ├── catalogo\_2026-07-20.csv  
    ├── catalogo\_2026-07-24.csv  
    └── catalogo\_2026-07-29.csv

Esto permitirá:

* Comparar versiones.  
* Recuperar datos eliminados.  
* Auditar modificaciones.  
* Identificar cuándo se publicó un cambio.  
* Evitar que Google Sheets sea el único lugar donde exista la información.  
* Conservar una memoria histórica del repositorio.

---

# **8\. ALCANCE DE LA VERSIÓN 1.0**

La versión inicial deberá incluir:

* Página de inicio.  
* Descripción del proyecto.  
* Explorador de lecturas.  
* Página individual para cada recurso.  
* Organización por las cinco unidades.  
* Filtros por unidad.  
* Filtros por tipo de material.  
* Filtros por nivel.  
* Búsqueda por título, autor o tema.  
* Guía de uso para docentes.  
* Guía de uso para estudiantes.  
* Recursos y plantillas.  
* Créditos.  
* Información de actualización.  
* Catálogo Maestro Editorial.  
* Proceso automatizado de publicación.  
* Documentación de mantenimiento.

Quedarán fuera de la versión 1.0:

* Cuentas de usuario.  
* Inicio de sesión.  
* Panel administrativo propio.  
* Comentarios.  
* Calificaciones.  
* Seguimiento individual de estudiantes.  
* Integración con Moodle.  
* Integración con Google Classroom.  
* Buscador semántico con IA.  
* Base de datos relacional.  
* Analítica avanzada.  
* Aplicación móvil.  
* Dominio personalizado.  
* Sistema interno de permisos editoriales.

---

# **9\. PLAN DE IMPLEMENTACIÓN DE DOS SEMANAS**

## **FASE 1\. CONGELAMIENTO DEL ALCANCE Y AUDITORÍA**

### **Día 1 — Jueves 16 de julio**

### **Tiempo estimado: 3 horas**

Definir formalmente qué significa “versión 1.0 publicable”.

Tareas:

* Confirmar secciones del sitio.  
* Confirmar las cinco unidades.  
* Definir campos obligatorios.  
* Definir qué materiales podrán publicarse.  
* Identificar materiales restringidos.  
* Definir responsabilidades.  
* Elaborar lista de funciones excluidas.

Entregable:

ALCANCE\_V1.md

---

### **Día 2 — Viernes 17 de julio**

### **Tiempo estimado: 5 horas**

Auditar los materiales existentes:

* Plan de Estudios 2025\.  
* Archivo Excel vigente.  
* Fichas pedagógicas.  
* Guías generales.  
* Recursos docentes.  
* Logotipos.  
* Imágenes.  
* Enlaces.  
* Créditos.  
* Información institucional.

Diseñar la estructura del Catálogo Maestro Editorial.

Entregables:

INVENTARIO\_DE\_INSUMOS.md  
MODELO\_DE\_DATOS.md  
DICCIONARIO\_DE\_CAMPOS.md  
LISTA\_DE\_INCONSISTENCIAS.md

---

### **Sábado 18 de julio**

Día de reserva.

No se debe colocar trabajo crítico. Puede utilizarse para recuperar retrasos o resolver inconsistencias de la auditoría.

---

## **FASE 2\. CATÁLOGO MAESTRO Y FUNDACIÓN TÉCNICA**

### **Día 4 — Domingo 19 de julio**

### **Tiempo estimado: 5 horas**

Crear el archivo:

HIST\_UACH\_Catalogo\_Maestro\_Editorial

Configurar:

* Pestaña de recursos.  
* Catálogos controlados.  
* Unidades curriculares.  
* Control de cambios.  
* Pendientes y QA.  
* Configuración general.  
* Listas desplegables.  
* Validación de datos.  
* Campos protegidos.  
* Identificadores únicos.

Importar una primera muestra de registros desde Excel.

Entregable:

* Catálogo Maestro funcional.  
* Al menos diez registros normalizados.  
* Instrucciones iniciales de captura.

---

### **Día 5 — Lunes 20 de julio**

### **Tiempo estimado: 5 horas**

Crear la estructura técnica:

historia-contemporanea-mexico-ii-uach/  
│  
├── .github/  
│   └── workflows/  
│       └── deploy.yml  
├── data/  
│   ├── source/  
│   ├── generated/  
│   └── archive/  
├── public/  
│   ├── images/  
│   └── documents/  
├── scripts/  
│   ├── fetch-catalog.js  
│   ├── validate-catalog.js  
│   └── transform-catalog.js  
├── src/  
│   ├── components/  
│   ├── data/  
│   ├── layouts/  
│   ├── pages/  
│   └── styles/  
├── README.md  
├── astro.config.mjs  
└── package.json

Tareas:

* Crear el repositorio.  
* Inicializar Astro.  
* Configurar GitHub Pages.  
* Configurar GitHub Actions.  
* Publicar una primera página provisional.  
* Probar una descarga de datos desde Google Sheets.

Hito crítico:

Al terminar el día debe existir una URL pública, aunque todavía muestre una versión provisional.

---

## **FASE 3\. NORMALIZACIÓN Y MIGRACIÓN DE DATOS**

### **Día 6 — Martes 21 de julio**

### **Tiempo estimado: 5 horas**

Transformar el Excel original.

Proceso:

Excel original  
      ↓  
Limpieza de encabezados  
      ↓  
Importación a Google Sheets  
      ↓  
Normalización de categorías  
      ↓  
Asignación de identificadores  
      ↓  
Asignación de slugs  
      ↓  
Validación

Detectar:

* Registros duplicados.  
* Títulos incompletos.  
* Enlaces incorrectos.  
* Categorías inconsistentes.  
* Años faltantes.  
* Autores incompletos.  
* Unidades incorrectas.  
* Slugs repetidos.  
* Campos obligatorios vacíos.

Entregables:

REPORTE\_DE\_MIGRACION.md  
REPORTE\_DE\_ERRORES.csv

---

### **Día 7 — Miércoles 22 de julio**

### **Tiempo estimado: 5 horas**

Migrar y revisar las primeras unidades:

1. Régimen Porfirista.  
2. Revolución Mexicana.

Comprobar que cada recurso genere:

* Una tarjeta.  
* Una dirección propia.  
* Metadatos.  
* Resumen.  
* Propuesta didáctica.  
* Preguntas.  
* Actividad.  
* Criterios de evaluación.  
* Enlace de consulta.

Arquitectura pedagógica:

Guía general  
      ↓  
Unidad curricular  
      ↓  
Ficha pedagógica  
      ↓  
Material base  
      ↓  
Actividad  
      ↓  
Evaluación  
      ↓  
Recursos complementarios

---

### **Día 8 — Jueves 23 de julio**

### **Tiempo estimado: 5 horas**

Migrar las unidades restantes:

3. Estado surgido de la Revolución.  
4. Consolidación del sistema político autoritario.  
5. Neoliberalismo, alternancia y México contemporáneo.

Cerrar el día con:

* Todos los registros importados.  
* Conteo por unidad.  
* Conteo por tipo.  
* Lista de registros incompletos.  
* Lista de registros rechazados.  
* Verificación de identificadores.  
* Verificación de slugs.

Hito crítico:

El catálogo completo debe poder transformarse desde Google Sheets hasta el formato utilizado por Astro.

---

## **FASE 4\. DESARROLLO DEL MICROSITIO E INTERACTIVIDAD**

### **Día 9 — Viernes 24 de julio**

### **Tiempo estimado: 5 horas**

Construir el sistema visual:

* Encabezado.  
* Navegación.  
* Pie de página.  
* Página de inicio.  
* Página sobre el proyecto.  
* Explorador.  
* Página individual.  
* Página de unidad.  
* Guía de uso.  
* Créditos.  
* Diseño móvil.

Definir:

* Tipografía.  
* Jerarquía.  
* Tarjetas.  
* Etiquetas.  
* Botones.  
* Navegación.  
* Anchura de lectura.  
* Estados de foco.

---

### **Sábado 25 de julio**

Segundo día de reserva.

Debe utilizarse únicamente para:

* Problemas de migración.  
* Problemas de despliegue.  
* Corrección de datos.  
* Errores críticos.

No debe utilizarse para agregar funciones nuevas.

---

### **Día 11 — Domingo 26 de julio**

### **Tiempo estimado: 6 horas**

Implementar el explorador interactivo:

* Búsqueda por título.  
* Búsqueda por autor.  
* Búsqueda por tema.  
* Filtro por unidad.  
* Filtro por tipo.  
* Filtro por nivel.  
* Filtro por modalidad.  
* Limpieza de filtros.  
* Conteo de resultados.  
* Mensaje sin coincidencias.

Completar:

* Descripciones de unidades.  
* Orientaciones docentes.  
* Orientaciones para estudiantes.  
* Etiquetas visuales.  
* Indicaciones de acceso.  
* Créditos.  
* Recursos complementarios.  
* Plantillas descargables.

---

## **FASE 5\. AUTOMATIZACIÓN EDITORIAL**

### **Día 12 — Lunes 27 de julio**

### **Tiempo estimado: 5 horas**

Configurar el flujo definitivo:

Google Sheets  
      ↓  
Descarga automatizada  
      ↓  
Validación de datos  
      ↓  
Generación de JSON  
      ↓  
Construcción de Astro  
      ↓  
Publicación en GitHub Pages

La acción deberá poder ejecutarse:

* Manualmente desde GitHub Actions.  
* Automáticamente cuando cambie el código.  
* Opcionalmente mediante una ejecución programada diaria.

La publicación deberá detenerse si:

* Existen identificadores duplicados.  
* Existen slugs duplicados.  
* Falta un título.  
* La unidad no es válida.  
* El estado de publicación es desconocido.  
* Existe un error estructural crítico.

Los errores no críticos deberán generar advertencias.

---

## **FASE 6\. CONTROL DE CALIDAD Y PUBLICACIÓN**

### **Día 13 — Martes 28 de julio**

### **Tiempo estimado: 5 horas**

Realizar QA técnico:

* Navegación completa.  
* URLs internas.  
* Enlaces externos.  
* Filtros combinados.  
* Búsqueda.  
* Vista móvil.  
* Navegación por teclado.  
* Encabezados jerárquicos.  
* Texto alternativo.  
* Contraste.  
* Estados de foco.  
* Página 404\.  
* Registros sin resultados.  
* Construcción automatizada.

Realizar QA de datos:

* Comparar Google Sheets con el sitio.  
* Verificar conteos.  
* Revisar registros ocultos.  
* Confirmar estados de publicación.  
* Revisar identificadores.  
* Revisar slugs.  
* Revisar enlaces.

---

### **Día 14 — Miércoles 29 de julio**

### **Tiempo estimado: 4 horas**

Realizar QA académico y editorial:

* Correspondencia con las unidades.  
* Autores.  
* Títulos.  
* Fechas.  
* Resúmenes.  
* Niveles.  
* Actividades.  
* Preguntas.  
* Evaluaciones.  
* Créditos.  
* Derechos.  
* Consistencia terminológica.

Preparar documentación:

README.md  
GUIA\_DE\_ACTUALIZACION.md  
MANUAL\_DEL\_CATALOGO\_MAESTRO.md  
MODELO\_DE\_DATOS.md  
DICCIONARIO\_DE\_CAMPOS.md  
PENDIENTES\_POSTERIORES.md  
HISTORIAL\_DE\_VERSIONES.md

Publicación formal:

* Resolver errores críticos.  
* Ejecutar la compilación definitiva.  
* Confirmar la URL pública.  
* Crear la versión `v1.0.0`.  
* Archivar el CSV publicado.  
* Registrar la fecha de actualización.  
* Abrir el backlog de la versión 1.1.

---

# **10\. DISTRIBUCIÓN DE ESFUERZO**

| Área | Horas estimadas |
| ----- | ----- |
| Alcance y auditoría | 8 |
| Catálogo Maestro Editorial | 7 |
| Arquitectura y despliegue | 7 |
| Migración y normalización | 13 |
| Desarrollo e interactividad | 11 |
| Automatización | 4 |
| QA, documentación y publicación | 8 |
| Margen absorbible | 2 |
| **Total estimado** | **58 horas máximas** |

Para mantener el proyecto dentro de dos semanas, la meta operativa debe ser de aproximadamente **50 a 56 horas**, utilizando el margen únicamente si aparecen problemas importantes en los datos.

---

# **11\. DIVISIÓN RECOMENDABLE ENTRE TÚ Y LOS AGENTES**

## **Tú**

* Validar el alcance académico.  
* Aprobar el modelo de datos.  
* Resolver ambigüedades curriculares.  
* Aprobar categorías.  
* Revisar fichas representativas.  
* Autorizar créditos.  
* Aprobar textos institucionales.  
* Decidir qué materiales pueden publicarse.  
* Validar la versión final.

## **Agente de datos**

* Importar el Excel.  
* Normalizar categorías.  
* Detectar duplicados.  
* Asignar identificadores.  
* Generar slugs.  
* Construir validaciones.  
* Documentar inconsistencias.  
* Preparar el Catálogo Maestro.

## **Agente de implementación**

* Configurar Astro.  
* Crear componentes.  
* Configurar GitHub Pages.  
* Configurar GitHub Actions.  
* Implementar filtros.  
* Generar páginas.  
* Resolver diseño responsive.  
* Implementar el flujo de datos.

## **Agente de documentación**

* Crear el diccionario de campos.  
* Documentar el procedimiento editorial.  
* Elaborar la guía de actualización.  
* Mantener el registro de decisiones.  
* Documentar el flujo de publicación.

## **Agente de QA**

* Comprobar enlaces.  
* Detectar campos vacíos.  
* Revisar navegación.  
* Verificar filtros.  
* Verificar accesibilidad.  
* Comparar el sitio con Google Sheets.  
* Comprobar la publicación.  
* Registrar incidencias.

---

# **12\. PROCEDIMIENTO DE MANTENIMIENTO POSTERIOR**

Una vez publicada la versión 1.0, el mantenimiento ordinario debería ser sencillo.

## **Para corregir un recurso**

1. Abrir Google Sheets.  
2. Buscar el identificador.  
3. Cambiar el estado a `En revisión`.  
4. Realizar la corrección.  
5. Actualizar la fecha de modificación.  
6. Registrar el cambio importante.  
7. Cambiar el estado a `Publicable`.  
8. Ejecutar la acción de publicación.  
9. Comprobar el resultado.

## **Para agregar un recurso**

1. Duplicar una fila modelo.  
2. Asignar un nuevo identificador.  
3. Crear un slug único.  
4. Completar los campos obligatorios.  
5. Seleccionar categorías mediante listas.  
6. Mantener el estado como `Borrador`.  
7. Revisar académicamente.  
8. Cambiar a `Publicable`.  
9. Ejecutar la publicación.  
10. Verificar la ficha.

## **Para retirar un recurso**

No se recomienda eliminar la fila.

Se debe cambiar el estado a:

Archivado

Así se conserva el historial sin mostrar el recurso públicamente.

---

# **13\. DEFINICIÓN ESTRICTA DE “TERMINADO”**

El proyecto puede considerarse publicado cuando:

1. La URL de GitHub Pages esté operativa.  
2. Las cinco unidades estén representadas.  
3. Los registros válidos aparezcan en el sitio.  
4. Cada recurso tenga una ficha propia.  
5. La búsqueda funcione.  
6. Los filtros funcionen.  
7. El sitio sea navegable en móvil.  
8. No existan enlaces internos rotos.  
9. Los registros incompletos estén documentados.  
10. Google Sheets funcione como Catálogo Maestro.  
11. La publicación pueda ejecutarse sin editar código.  
12. GitHub conserve una copia de la versión publicada.  
13. Exista una guía de mantenimiento.  
14. Un recurso nuevo pueda agregarse desde Google Sheets.  
15. La versión quede etiquetada como `v1.0.0`.

---

# **14\. RESULTADO FINAL ESPERADO**

Catálogo Maestro Editorial  
Google Sheets  
        ↓  
Correcciones, actualizaciones y ampliaciones  
        ↓  
GitHub Actions  
        ↓  
Validación y transformación  
        ↓  
Astro  
        ↓  
GitHub Pages  
        ↓  
Repositorio Interactivo de  
Historia Contemporánea de México II — UACH

La decisión técnica más importante es no convertir el archivo Excel en una base de datos compleja ni obligar a los responsables académicos a editar archivos dentro de GitHub.

La solución más equilibrada para esta primera versión es:

Google Sheets \= mantenimiento editorial  
GitHub \= control técnico y versionado  
Astro \= generación del sitio  
GitHub Actions \= automatización  
GitHub Pages \= publicación

También es fundamental no esperar hasta el final de las dos semanas para publicar por primera vez. La primera versión provisional debe estar en línea desde el **20 de julio**, de modo que todos los cambios posteriores se prueben dentro del mismo mecanismo que utilizará la versión definitiva.


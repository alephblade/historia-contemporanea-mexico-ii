A continuación se presenta la lista ordenada de los **14 campos (columnas)** que integran la tabla de la base de datos, incluyendo su nombre y una descripción de la información que contiene cada uno:

1. **id\_recurso**: Código alfanumérico que sirve como identificador único para cada recurso bibliográfico o lectura (por ejemplo, `HIST2_0001`).  
2. **Indice**: Etiqueta secuencial que indica el número de lectura o posición del recurso en la lista (por ejemplo, `lectura_1`, `lectura_2`).  
3. **Título**: Nombre o título completo del documento, artículo, libro o material académico.  
4. **Nombre del archivo**: Nombre del archivo digital vinculado al recurso (generalmente en formato `.pdf`).  
5. **Autoría**: Nombre de los autores individuales o la institución encargada de la elaboración del contenido.  
6. **Descripción de la Fuente**: Información detallada sobre el origen institucional, contexto de publicación o tipo de edición del material.  
7. **Año (si se conoce)**: Año en el que fue publicado o editado el recurso.  
8. **Tipo de material**: Clasificación según el formato o tipo de publicación (por ejemplo, *Artículo de divulgación*, *Libro digital*, *Texto de apoyo*).  
9. **Acceso (abierto/institucional)**: Modalidad de disponibilidad del contenido para los usuarios (por ejemplo, *Abierto*).  
10. **Fuente / URL**: Enlace o dirección web directa para acceder, consultar o descargar el material.  
11. **Resumen analítico (≤6 líneas)**: Síntesis ejecutiva que expone las ideas centrales, contexto histórico o temas abordados en la lectura.  
12. **Unidad temática UACH**: Clasificación curricular o temática del programa académico al que pertenece la lectura (las categorías pueden estar separadas por barras `|`).  
13. **Temas y conceptos clave**: Lista de palabras clave y conceptos principales analizados a lo largo del texto.  
14. **Nivel sugerido**: Nivel de profundidad o grado de dificultad académica recomendado para la lectura (por ejemplo, *introductorio*, *intermedio*, *avanzado*).

---

### **Análisis Detallado y Reglas Generales por Campo**

#### **1\. `id_recurso`**

* **Promedio actual:** 10.0 caracteres *(Mínimo: 10, Máximo: 10\)*.  
* **Registros evaluados:** 20 registros (ejemplos: `HIST2_0001`, `HIST2_0002`, `HIST2_0003`, `HIST2_0004`, `HIST2_0005`).  
* **Regla general (Límite máximo recomendado):** **15 caracteres.**  
* **Criterio:** Código de identificación único con formato alfanumérico estandarizado (`AAAAA_0000`).

#### **2\. `Índice`**

* **Promedio actual:** 9.6 caracteres *(Mínimo: 9, Máximo: 10, Mediana: 10.0)*.  
* **Registros evaluados:** 20 registros (ejemplos: `lectura_1`, `lectura_2`, `lectura_10`, `lectura_15`, `lectura_20`).  
* **Regla general (Límite máximo recomendado):** **20 caracteres.**  
* **Criterio:** Etiqueta o identificador secuencial breve (`lectura_N`).

#### **3\. `Título`**

* **Promedio actual:** 54.4 caracteres *(Mínimo: 23, Máximo: 114, Mediana: 53.5)*.  
* **Registros evaluados:** 20 registros (ejemplos: *"La dictadura porfirista"* \[23 car.\], *"La Revolución Mexicana (Tomo I)"* \[31 car.\], *"Yaquis: Memoria, Territorio y Participación Política"* \[52 car.\], *"Teorizando sobre la Revolución Mexicana"* \[39 car.\], *"Felipe Ángeles: El general revolucionario y el generoso académico..."* \[114 car.\]).  
* **Regla general (Límite máximo recomendado):** **150 caracteres.**  
* **Criterio:** Da margen suficiente para títulos y subtítulos académicos extensos sin truncar información.

#### **4\. `Nombre del archivo`**

* **Promedio actual:** 35.4 caracteres *(Mínimo: 24, Máximo: 44, Mediana: 36.5)*.  
* **Registros evaluados:** 20 registros (ejemplos: `dictadura-porfirista.pdf` \[24 car.\], `revolucion-mexicana-tomo-1.pdf` \[30 car.\], `modulo-sistema-politico-mexicano.pdf` \[36 car.\], `yaquis-memoria-territorio-politica.pdf` \[38 car.\], `angeles-felipe-milicia-matematicas.pdf` \[40 car.\]).  
* **Regla general (Límite máximo recomendado):** **60 caracteres.**  
* **Criterio:** Nombre de archivo normalizado (slug en minúsculas con guiones y extensión `.pdf`).

#### **5\. `Autoría`**

* **Promedio actual:** 26.3 caracteres *(Mínimo: 5, Máximo: 160, Mediana: 20.5)*.  
* **Registros evaluados:** 20 registros (ejemplos: `UNADM` \[5 car.\], `José C. Valadés` \[15 car.\], `INEHRM` \[6 car.\], `Miguel Ángel Sánchez Lamego` \[27 car.\], `Zulema Trejo Contreras, Regina Tapia, Edna Lucía García Rivera...` \[160 car.\]).  
* **Regla general (Límite máximo recomendado):** **200 caracteres.**  
* **Criterio:** Permite registrar coautorías múltiples completas o nombres institucionales solemnes.

#### **6\. `Descripción de la Fuente`**

* **Promedio actual:** 201.0 caracteres *(Mínimo: 140, Máximo: 264, Mediana: 200.5)*.  
* **Registros evaluados:** 8 registros con datos (ejemplos: *"Texto de apoyo académico de la Universidad Abierta y a Distancia de México..."* \[140 car.\], *"Instituto Nacional de Estudios Históricos de las Revoluciones de México..."* \[157 car.\], *"Tomo I de la obra póstuma La Revolución y los revolucionarios..."* \[163 car.\], *"Sin autoría individual especificada. Se trata de un texto conmemorativo..."* \[264 car.\]; hay 12 celdas vacías).  
* **Regla general (Límite máximo recomendado):** **300 caracteres.**  
* **Criterio:** Un párrafo corto que contextualice la edición, el sello editorial o el tipo de publicación.

#### **7\. `Año (si se conoce)`**

* **Promedio actual:** 4.0 caracteres *(Mínimo: 4, Máximo: 4\)*.  
* **Registros evaluados:** 15 registros con datos (ejemplos: `2015`, `2025`, `2016`, `2014`, `2021`; hay 5 celdas vacías).  
* **Regla general (Límite máximo recomendado):** **4 caracteres.**  
* **Criterio:** Campo estrictamente numérico de 4 dígitos para el año de publicación (`AAAA`).

#### **8\. `Tipo de material`**

* **Promedio actual:** 21.8 caracteres *(Mínimo: 13, Máximo: 55, Mediana: 18.0)*.  
* **Registros evaluados:** 19 registros con datos (ejemplos: `Libro digital` \[13 car.\], `Texto de apoyo` \[14 car.\], `Artículo histórico` \[18 car.\], `Artículo de divulgación` \[23 car.\], `Ensayo académico (ponencia revisada) en libro/colectivo` \[55 car.\]; hay 1 celda vacía).  
* **Regla general (Límite máximo recomendado):** **60 caracteres.**  
* **Criterio:** Clasificación o tipología documental corta.

#### **9\. `Acceso (abierto/institucional)`**

* **Promedio actual:** 7.0 caracteres *(Mínimo: 7, Máximo: 7\)*.  
* **Registros evaluados:** 20 registros (ejemplo constante: `Abierto` \[7 car.\]).  
* **Regla general (Límite máximo recomendado):** **20 caracteres.**  
* **Criterio:** Espacio holgado para categorías como `Abierto`, `Institucional`, `Restringido` o combinaciones.

#### **10\. `Fuente / URL`**

* **Promedio actual:** 80.8 caracteres *(Mínimo: 49, Máximo: 110, Mediana: 76.0)*.  
* **Registros evaluados:** 20 registros (ejemplos: `https://www.inehrm.gob.mx/es/inehrm/La_Dictadura_Porfirista` \[59 car.\], `https://www.inehrm.gob.mx/work/models/inehrm/Resource/455/1/images/Tomo_I.pdf` \[77 car.\], `https://dmd.unadmexico.mx/contenidos/DCSA/MODULOS/AGP/M4_AGSPAM/U2/S4/descargables/AGP_M4_U2_S4_TA.pdf` \[102 car.\]).  
* **Regla general (Límite máximo recomendado):** **200 caracteres.**  
* **Criterio:** Enlaces hipertextuales completos incluyendo rutas profundas y parámetros de consulta.

#### **11\. `Resumen analítico (≤6 líneas)`**

* **Promedio actual:** 497.7 caracteres *(Mínimo: 317, Máximo: 720, Mediana: 467.0)*.  
* **Registros evaluados:** 9 registros con datos (ejemplos: Resumen de *Prensa en la Revolución* \[317 car.\], Resumen de *La dictadura porfirista* \[404 car.\], Resumen de *Revolución Mexicana Tomo I* \[467 car.\], Resumen de *Teorizando sobre la Revolución Mexicana* \[720 car.\]; hay 11 celdas vacías).  
* **Regla general (Límite máximo recomendado):** **750 caracteres.**  
* **Criterio:** Cumple con la indicación de la cabecera (≤6 líneas de texto en prosa, equivalentes a entre 80 y 110 palabras).

#### **12\. `Unidad temática UACH`**

* **Promedio actual:** 28.1 caracteres *(Mínimo: 18, Máximo: 99, Mediana: 19.0)*.  
* **Registros evaluados:** 17 registros con datos (ejemplos: `Régimen Porfirista` \[18 car.\], `Revolución Mexicana` \[19 car.\], `Estado surgido de la Revolución` \[31 car.\], `Régimen Porfirista|Revolución Mexicana` \[38 car.\], `Régimen Porfirista|Revolución Mexicana|Estado surgido de la Revolución|Neoliberalismo y alternancia` \[99 car.\]; hay 3 celdas vacías).  
* **Regla general (Límite máximo recomendado):** **150 caracteres.**  
* **Criterio:** Permite encadenar hasta 4 o 5 unidades temáticas separadas por barra vertical (`|`).

#### **13\. `Temas y conceptos clave`**

* **Promedio actual:** 156.6 caracteres *(Mínimo: 35, Máximo: 480, Mediana: 49.0)*.  
* **Registros evaluados:** 17 registros con datos (ejemplos: `operaciones militares, fases revolucionarias` \[44 car.\], `Plan de San Luis, Plan de Guadalupe, Constitución` \[50 car.\], conceptos de *Dictadura porfirista* \[167 car.\], conceptos de *Módulo sistema político* \[464 car.\], conceptos de *Teorizando sobre la Revolución* \[480 car.\]; hay 3 celdas vacías).  
* **Regla general (Límite máximo recomendado):** **500 caracteres.**  
* **Criterio:** Da espacio para listas exhaustivas de palabras clave y etiquetas conceptuales separadas por comas.

#### **14\. `Nivel sugerido`**

* **Promedio actual:** 13.5 caracteres *(Mínimo: 8, Máximo: 24, Mediana: 10.0)*.  
* **Registros evaluados:** 16 registros con datos (ejemplos: `Avanzado` \[8 car.\], `introductorio` \[13 car.\], `intermedio|avanzado` \[19 car.\], `introductorio|intermedio` \[24 car.\]; hay 4 celdas vacías).  
* **Regla general (Límite máximo recomendado):** **30 caracteres.**  
* **Criterio:** Admite etiquetas de nivel individual o combinadas (`nivel1|nivel2`).

---

### **Tabla Resumen de Reglas por Campo**

| Campo / Columna | Longitud Promedio Actual | Longitud Máxima Actual | Regla General: Máximo Esperado |
| ----- | ----- | ----- | ----- |
| **id\_recurso** | 10.0 | 10 | **15** |
| **Indice** | 9.6 | 10 | **20** |
| **Título** | 54.4 | 114 | **150** |
| **Nombre del archivo** | 35.4 | 44 | **60** |
| **Autoría** | 26.3 | 160 | **200** |
| **Descripción de la Fuente** | 201.0 | 264 | **300** |
| **Año (si se conoce)** | 4.0 | 4 | **4** |
| **Tipo de material** | 21.8 | 55 | **60** |
| **Acceso (abierto/institucional)** | 7.0 | 7 | **20** |
| **Fuente / URL** | 80.8 | 110 | **200** |
| **Resumen analítico (≤6 líneas)** | 497.7 | 720 | **750** |
| **Unidad temática UACH** | 28.1 | 99 | **150** |
| **Temas y conceptos clave** | 156.6 | 480 | **500** |
| **Nivel sugerido** | 13.5 | 24 | **30** |


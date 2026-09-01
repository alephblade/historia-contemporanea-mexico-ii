## **Descripción de los Archivos en el Repositorio**

A continuación se describen los componentes analizados para el proyecto de gestión de lecturas de la asignatura **Historia Contemporánea de México II** de la Preparatoria Agrícola en la Universidad Autónoma Chapingo:

* **Metadescriptores de la base de datos (Doc):** Este archivo establece la estructura técnica del "cerebro" del repositorio (las Fichas Enriquecidas). Detalla los 14 campos obligatorios de la tabla de datos y define reglas estrictas de validación, como los límites máximos recomendados de caracteres para cada celda (por ejemplo, un tope de 150 caracteres para el título y 750 para el resumen analítico).  
* **Ficha pedagógica tipo para el repositorio / FICHA PEDAGÓGICA DEL RECURSO (Docs):** Son los formatos normativos e interactivos que acompañan individualmente a cada lectura. Funcionan como la interfaz de cara al usuario para que docentes y estudiantes identifiquen rápidamente la unidad didáctica, el nivel de profundidad, las preguntas orientadoras, las sugerencias de mediación y las evidencias de desempeño ligadas a cada material.  
* **Presentación Proyecto Repositorio Lecturas Historia II Uach (Doc):** Es el documento marco que justifica la necesidad del repositorio debido a la dispersión de materiales digitales en el aula. Define los objetivos generales, los cuatro componentes clave del proyecto (documento base, ficha pedagógica, mapeo enriquecido y recursos derivados) y los beneficios proyectados para el profesorado y el alumnado.  
* **DOCUMENTO BASE DE ALINEACIÓN Y CRITERIOS DE CURADURÍA (Doc):** Contiene las directrices político-académicas y los valores bajo los cuales la responsable del proyecto, María Luisa Saavedra Solá, norma la selección de las lecturas. Establece los 7 criterios de curaduría esenciales: pertinencia temática, calidad académica, diversidad de voces, accesibilidad, potencial didáctico, aporte a la evaluación y contribución a valores (como la equidad y justicia social).  
* **Guía general para la mediación didáctica y pedagógica (Doc):** Funciona como el puente interpretativo previo a la planeación didáctica. Ofrece al docente una tipología funcional de las lecturas (introductorias, de profundización, analíticas, fuentes primarias y de consulta focalizada) y sugiere estrategias específicas de mediación de acuerdo con la complejidad discursiva del texto.  
* **Fichas\_Enriquecidas\_Mapeo\_Lecturas\_HistoriaII\_UACH\_actualizado.xlsx (Sheet):** Es la base de datos operativa y matriz inteligente del repositorio. Contiene múltiples hojas de trabajo que cruzan cada recurso indexado (por ejemplo, `HIST2_0001 "La dictadura porfirista"`) con sus metadatos conceptuales, conocimientos y habilidades específicos apoyados, y preguntas orientadoras para los estudiantes.  
* **Plan de Estudios \- Historia contemporánea de México II.docx (Doc):** Es el documento curricular oficial y la fuente de verdad última de la asignatura. Define la competencia general del curso, las 5 unidades de aprendizaje estructuradas (desde el Régimen Porfirista hasta el Neoliberalismo y la alternancia) y el sistema formal de evaluación basado en un 100% de ponderación dividida en cuatro grandes evidencias integradoras.

---

## **Articulación y Relación entre los Archivos**

Los archivos no operan de forma aislada, sino que integran un ecosistema pedagógico perfectamente alineado de forma descendente:  
     \[Plan de Estudios (Estructura Curricular)\]  
                        │  
                        ▼  
    \[Presentación del Proyecto (Marco Conceptual)\]  
                        │  
                        ▼  
    \[Documento Base de Curaduría (Filtro de Selección)\]  
                        │  
                        ▼  
   \[Guía General de Mediación (Tipología Didáctica)\]  
                        │  
                        ▼  
  \[Metadescriptores de la BD (Reglas Técnicas de Captura)\]  
                        │  
                        ▼  
   \[Fichas Enriquecidas (Base de Datos Operativa)\]  
                        │  
                        ▼  
 \[Ficha Pedagógica Específica (Interfaz Final Docente/Alumno)\]

1. **La Fuente Normativa:** El *Plan de Estudios* dicta de manera estricta qué unidades, conocimientos y evidencias de desempeño se deben cubrir en el semestre. La *Presentación del Proyecto* toma este marco para dar una solución digital a la dispersión de lecturas.  
2. **El Filtro de Calidad:** Con el plan de estudios claro, el *Documento Base de Criterios de Curaduría* establece los estándares científicos y éticos para elegir qué textos entrarán al repositorio, asegurando que apoyen directamente las evidencias oficiales (ensayos, mapas, infografías).  
3. **La Clasificación y Mediación:** Una vez seleccionada una lectura bajo esos criterios, la *Guía General para la Mediación* le asigna una categoría dentro de su tipología didáctica (por ejemplo, determinando si es un texto introductorio o una fuente primaria compleja) para sugerir la mejor estrategia de enseñanza en el aula.  
4. **La Captura Técnica:** Los criterios de curaduría y mediación se vacían en la matriz de *Fichas Enriquecidas (Excel)*. Para que esta base de datos mantenga consistencia y legibilidad interna, el llenado de sus columnas debe respetar obligatoriamente las longitudes y formatos normalizados en los *Metadescriptores de la base de datos*.  
5. **El Producto Final Integrado:** Finalmente, la información sistematizada en la fila de una lectura dentro del Excel se traduce en una *Ficha Pedagógica del Recurso* individualizada. Así, cuando un docente abre una lectura, la ficha específica refleja con coherencia la dosificación de la Guía General, los filtros de la Curaduría y la estricta alineación con el Plan de Estudios vigente.
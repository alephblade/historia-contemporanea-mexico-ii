import projection from '../../data/proyeccion.publica.json';
import sourceVerificationProjection from '../../data/verificacion_fuentes.publica.json';

export type EditorialStatus = 'borrador' | 'en_revision' | 'publicable' | 'publicado' | 'archivado';
export type Scope = 'directo' | 'contextual' | 'secundario';
export type SourceAvailability = 'disponible' | 'bloqueo_tecnico' | 'no_disponible';

export interface SourceVerification {
  lectura_id: string;
  url_registrada: string;
  estado: SourceAvailability;
  evidencia: string;
}

export interface Unit {
  id: 'u1' | 'u2' | 'u3' | 'u4' | 'u5';
  numero: number;
  nombre: string;
  slug: string;
  descripcion: string;
}

export interface UnitRelation {
  id: Unit['id'];
  nombre: string;
  slug: string;
  rol: 'principal' | 'secundaria';
  alcances: Scope[];
}

export interface DerivedResource {
  id: string;
  tipo: 'video' | 'infografia' | 'cuestionario';
  estado: 'planeado';
}

export interface Reading {
  id: string;
  slug: string;
  estado_editorial: EditorialStatus;
  titulo: string;
  autoria: string;
  descripcion_fuente: string;
  anio: number | null;
  tipo_material: { codigo: string | null; etiqueta: string };
  acceso: 'Abierto' | 'Institucional' | 'Restringido';
  fuente_url: string;
  resumen: string;
  unidades: UnitRelation[];
  temas: string[];
  niveles: Array<'introductorio' | 'intermedio' | 'avanzado'>;
  ficha: {
    id: string;
    estado: EditorialStatus;
    markdown: string;
    recursos_derivados: DerivedResource[];
  };
  orientaciones_relacionadas: string[];
}

export interface LinkedReading {
  lectura_id: string;
  slug: string;
  titulo: string;
  unidad_principal: string;
  rutas_analisis: string[];
  alcance: Scope;
  referencias_canonicas: string[];
}

export interface AnalysisRoute {
  id: string;
  titulo: string;
  pregunta_guia: string;
  intervencion_didactica: string;
  evidencia_esperada: string;
}

export interface Orientation {
  id: string;
  tipo: string;
  titulo: string;
  slug: string;
  audiencia: string[];
  estado_editorial: EditorialStatus;
  unidades: UnitRelation[];
  descripcion: string;
  proposito: string;
  rutas_analisis: AnalysisRoute[];
  lecturas_vinculadas: LinkedReading[];
  evidencia_integradora: {
    tipo: string;
    titulo: string;
    requisitos: string[];
  };
  cobertura_curricular: Array<{
    aprendizaje: string;
    estado: string;
    rutas_analisis: string[];
  }>;
  accesibilidad: string;
  licencia_y_creditos: string;
  markdown: string;
}

export const units = projection.unidades as Unit[];
export const readings = projection.lecturas as Reading[];
export const orientations = projection.orientaciones as Orientation[];
export const sourceVerification = sourceVerificationProjection as {
  schema_version: '1.0';
  revision_id: string;
  fecha_revision: string;
  anexo: string;
  fuentes: SourceVerification[];
};

export const readingById = new Map(readings.map((reading) => [reading.id, reading]));
export const orientationById = new Map(orientations.map((orientation) => [orientation.id, orientation]));
export const sourceVerificationByReadingId = new Map(sourceVerification.fuentes.map((item) => [item.lectura_id, item]));

export const sourceAvailabilityLabel = (status: SourceAvailability) => ({
  disponible: 'Disponible en la última verificación',
  bloqueo_tecnico: 'Acceso sujeto a verificación de seguridad',
  no_disponible: 'Temporalmente no disponible',
})[status];

export const statusLabel = (status: EditorialStatus | 'planeado') => ({
  borrador: 'Borrador',
  en_revision: 'En revisión',
  publicable: 'Publicable',
  publicado: 'Publicado',
  archivado: 'Archivado',
  planeado: 'Planeado',
})[status];

export const scopeLabel = (scope: Scope) => ({
  directo: 'Alcance directo',
  contextual: 'Alcance contextual',
  secundario: 'Alcance secundario',
})[scope];

export const orientationTypeLabel = (type: string) => ({
  trama_transversal: 'Trama transversal',
  secuencia_didactica: 'Secuencia didáctica',
  guia_docente: 'Guía docente',
  matriz_cobertura: 'Matriz de cobertura',
  protocolo_uso: 'Protocolo de uso',
})[type] ?? type.replaceAll('_', ' ');

export const derivedTypeLabel = (type: DerivedResource['tipo']) => ({
  video: 'Video',
  infografia: 'Infografía',
  cuestionario: 'Cuestionario integrador',
})[type];

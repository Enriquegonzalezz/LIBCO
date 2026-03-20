export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  createdAt?: string;
}

export interface Component {
  id: string;
  nombre: string;
  descripcion: string;
  codigoEjemplo: string;
  categoria: Categoria;
  framework?: 'Angular' | 'Next.js' | 'Vue' | 'HTML/CSS' | 'React';
  isUIComponent?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComponentAudit {
  id: number;
  componentId: string;
  componentNombre: string;
  action: string;
  createdAt: string;
  lastVerifiedAt?: string;
}

export interface VerificationResponse {
  mensaje: string;
  totalNuevos: number;
  componentes: Array<{
    nombre: string;
    fechaCreacion: string;
  }>;
}

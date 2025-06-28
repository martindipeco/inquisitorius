import { z } from 'zod';

// Esquema para la respuesta del backend
export const certificationApiSchema = z.object({
  id: z.number(),
  usuarioId: z.number(),
  nombre: z.string(),
  institucion: z.string(),
  fechaEmision: z.string(),
});

// Esquema extendido para el frontend (con campos adicionales)
export const certificationSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  fechaObtencion: z.string(),
  imagen: z.string().optional(),
  logoCurso: z.string().optional(),
  codigoVerificacion: z.string(),
  horasCompletadas: z.number(),
  instructor: z.string(),
  institucion: z.string(),
  usuarioId: z.number(),
});

// Tipos derivados de los esquemas
export type CertificationApi = z.infer<typeof certificationApiSchema>;
export type Certification = z.infer<typeof certificationSchema>;

// Interfaz para crear una nueva certificación
export interface CreateCertificationData {
  nombre: string;
  institucion: string;
  fechaEmision: string;
}

// Interfaz para la respuesta del servicio
export interface CertificationServiceResponse {
  success: boolean;
  data?: Certification[];
  message?: string;
  error?: string;
} 
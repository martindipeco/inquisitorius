import { z } from 'zod';

export const registerSchema = z.object({
  usuario: z
    .string()
    .nonempty('El usuario es obligatorio')
    .min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .regex(/^\d+$/, 'La contraseña debe ser solo números')
    .min(1, 'La contraseña debe tener al menos 1 número'),
  confirmPassword: z
    .string()
    .nonempty('Debes confirmar la contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof registerSchema>;

export interface DatosRegistrarUsuario {
  usuario: string;
  password: string;
} 
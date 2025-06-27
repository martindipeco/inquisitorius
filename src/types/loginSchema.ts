import { z } from 'zod';

export const loginSchema = z.object({
  usuario: z
    .string()
    .nonempty('El usuario es obligatorio')
    .min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .regex(/^\d+$/, 'La contraseña debe ser solo números'),
});

export type LoginForm = z.infer<typeof loginSchema>; 
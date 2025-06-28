import { z } from 'zod';

export const loginSchema = z.object({
  usuario: z
    .string()
    .nonempty('El usuario es obligatorio')
    .min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(12, 'La contraseña debe tener máximo 12 caracteres')
    .regex(/^[a-zA-Z0-9]+$/, 'La contraseña debe contener solo letras y números'),
});

export type LoginForm = z.infer<typeof loginSchema>; 
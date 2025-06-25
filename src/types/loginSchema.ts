import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('El correo es obligatorio')
    .email('Correo inválido'),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
});

export type LoginForm = z.infer<typeof loginSchema>; 
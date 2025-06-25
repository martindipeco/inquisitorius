import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .nonempty('El correo es obligatorio')
    .email('Correo inválido')
    .min(5, 'El correo debe tener al menos 5 caracteres'),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z
    .string()
    .nonempty('Debes confirmar la contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof registerSchema>;

export interface DatosRegistrarUsuario {
  email: string;
  password: string;
  rol: 'USUARIO' | 'ADMIN';
} 
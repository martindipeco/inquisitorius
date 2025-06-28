import { z } from 'zod';

export const profileSchema = z.object({
  login: z.string()
    .min(3, { message: 'El usuario debe tener al menos 3 caracteres.' })
    .max(50, { message: 'El usuario no puede exceder los 50 caracteres.' }),
  
  clave: z.string()
    .min(1, { message: 'La contraseña es requerida.' })
    .regex(/^\d+$/, { message: 'La contraseña debe contener solo números.' }),
});

export type ProfileFormData = z.infer<typeof profileSchema>; 
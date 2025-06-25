import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const profileSchema = z.object({
  nombreCompleto: z.string()
    .min(3, { message: 'El nombre completo debe tener al menos 3 caracteres.' })
    .max(100, { message: 'El nombre completo no puede exceder los 100 caracteres.' })
    .optional(),
  
  email: z.string()
    .email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  
  bio: z.string()
    .max(500, { message: 'La biografía no puede exceder los 500 caracteres.' })
    .optional(),
  
  foto: z.any()
    .optional()
    .refine(
      (value) => {
        if (!value || typeof value === 'string') return true; // Permite URL inicial o campo vacío
        if (value instanceof File) return value.size <= MAX_FILE_SIZE;
        return false;
      },
      { message: `El tamaño máximo de la imagen es de 2MB.` }
    )
    .refine(
      (value) => {
        if (!value || typeof value === 'string') return true;
        if (value instanceof File) return ACCEPTED_IMAGE_TYPES.includes(value.type);
        return false;
      },
      { message: "Solo se aceptan formatos .jpg, .jpeg y .png." }
    ),
});

export type ProfileFormData = z.infer<typeof profileSchema>; 
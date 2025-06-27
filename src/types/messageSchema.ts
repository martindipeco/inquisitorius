import { z } from 'zod';

export const messageSchema = z.object({
  id: z.number(),
  contenido: z.string().min(1, 'El mensaje no puede estar vacío'),
  remitenteId: z.number(),
  receptorId: z.number(),
  fechaEnvio: z.string().datetime(),
  leido: z.boolean().default(false),
});

export const createMessageSchema = z.object({
  contenido: z.string().min(1, 'El mensaje no puede estar vacío'),
  remitenteId: z.number(),
  receptorId: z.number(),
});

export type Message = z.infer<typeof messageSchema> & {
  isOptimistic?: boolean;
};
export type CreateMessage = z.infer<typeof createMessageSchema>;

export interface Conversation {
  id: number;
  usuario1Id: number;
  usuario2Id: number;
  ultimoMensaje?: Message;
  mensajes: Message[];
} 
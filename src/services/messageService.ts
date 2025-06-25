import type { Message, CreateMessage, Conversation } from '../types/messageSchema';
import messagesData from '../mocks/messages.json';

// Simular base de datos en memoria
const messages: Message[] = [...messagesData.messages];
const conversations: Conversation[] = messagesData.conversations.map(conv => ({
  ...conv,
  mensajes: messages.filter(m => 
    (m.remitenteId === conv.usuario1Id && m.receptorId === conv.usuario2Id) ||
    (m.remitenteId === conv.usuario2Id && m.receptorId === conv.usuario1Id)
  )
}));
const users = messagesData.users;
let nextId = Math.max(...messages.map(m => m.id)) + 1;

export const messageService = {
  // Crear un nuevo mensaje
  async crearMensaje(datos: CreateMessage): Promise<Message> {
    const nuevoMensaje: Message = {
      id: nextId++,
      contenido: datos.contenido,
      remitenteId: datos.remitenteId,
      receptorId: datos.receptorId,
      fechaEnvio: new Date().toISOString(),
      leido: false,
    };

    messages.push(nuevoMensaje);
    
    // Actualizar conversación
    this.actualizarConversacion(nuevoMensaje);
    
    return nuevoMensaje;
  },

  // Obtener mensaje por ID
  async obtenerMensajePorId(id: number): Promise<Message | null> {
    return messages.find(m => m.id === id) || null;
  },

  // Obtener mensajes por receptor
  async obtenerMensajesPorReceptor(receptorId: number): Promise<Message[]> {
    return messages.filter(m => m.receptorId === receptorId);
  },

  // Obtener mensajes por remitente
  async obtenerMensajesPorRemitente(remitenteId: number): Promise<Message[]> {
    return messages.filter(m => m.remitenteId === remitenteId);
  },

  // Obtener conversación entre dos usuarios
  async obtenerConversacion(usuario1Id: number, usuario2Id: number): Promise<Message[]> {
    return messages.filter(m => 
      (m.remitenteId === usuario1Id && m.receptorId === usuario2Id) ||
      (m.remitenteId === usuario2Id && m.receptorId === usuario1Id)
    ).sort((a, b) => new Date(a.fechaEnvio).getTime() - new Date(b.fechaEnvio).getTime());
  },

  // Obtener todas las conversaciones de un usuario
  async obtenerConversacionesUsuario(usuarioId: number): Promise<Conversation[]> {
    return conversations.filter(c => 
      c.usuario1Id === usuarioId || c.usuario2Id === usuarioId
    );
  },

  // Obtener usuario por ID
  async obtenerUsuarioPorId(id: number) {
    return users.find(u => u.id === id) || null;
  },

  // Obtener todos los usuarios
  async obtenerUsuarios() {
    return users;
  },

  // Eliminar mensaje
  async eliminarMensaje(id: number): Promise<void> {
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      messages.splice(index, 1);
    }
  },

  // Marcar mensaje como leído
  async marcarComoLeido(id: number): Promise<void> {
    const mensaje = messages.find(m => m.id === id);
    if (mensaje) {
      mensaje.leido = true;
    }
  },

  // Función para actualizar conversación
  actualizarConversacion(mensaje: Message): void {
    const { remitenteId, receptorId } = mensaje;
    
    // Buscar conversación existente
    const conversacion = conversations.find(c => 
      (c.usuario1Id === remitenteId && c.usuario2Id === receptorId) ||
      (c.usuario1Id === receptorId && c.usuario2Id === remitenteId)
    );

    if (conversacion) {
      // Actualizar último mensaje
      conversacion.ultimoMensaje = mensaje;
    } else {
      // Crear nueva conversación
      const nuevaConversacion: Conversation = {
        id: conversations.length + 1,
        usuario1Id: remitenteId,
        usuario2Id: receptorId,
        ultimoMensaje: mensaje,
        mensajes: [mensaje],
      };
      conversations.push(nuevaConversacion);
    }
  },

  // Obtener mensajes no leídos de un usuario
  async obtenerMensajesNoLeidos(usuarioId: number): Promise<Message[]> {
    return messages.filter(m => 
      m.receptorId === usuarioId && !m.leido
    );
  },

  // Contar mensajes no leídos de un usuario
  async contarMensajesNoLeidos(usuarioId: number): Promise<number> {
    const mensajesNoLeidos = await this.obtenerMensajesNoLeidos(usuarioId);
    return mensajesNoLeidos.length;
  },
}; 
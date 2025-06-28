import type { Message, CreateMessage, Conversation } from '../types/messageSchema';
import { userService } from './userService';

// URL base de la API
const API_BASE_URL = 'https://inquisitorius.onrender.com';

// Interfaz para la respuesta de la API
interface ApiMessage {
  id: number;
  remitenteId: number;
  receptorId: number;
  contenido: string;
  fechaEnvio: string;
}

// Función para obtener el token de autenticación
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Función para mapear mensaje de API a mensaje del frontend
const mapearMensajeAPIaFrontend = (mensajeAPI: ApiMessage): Message => {
  return {
    id: mensajeAPI.id,
    contenido: mensajeAPI.contenido,
    remitenteId: mensajeAPI.remitenteId,
    receptorId: mensajeAPI.receptorId,
    fechaEnvio: mensajeAPI.fechaEnvio,
    leido: false // Por defecto no leído, se puede implementar lógica adicional
  };
};

export const messageService = {
  // Crear un nuevo mensaje
  async crearMensaje(datos: CreateMessage): Promise<Message> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/mensajes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          remitenteId: datos.remitenteId,
          receptorId: datos.receptorId,
          contenido: datos.contenido
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido');
        }
        throw new Error(`Error al crear mensaje: ${response.status}`);
      }

      const mensajeAPI: ApiMessage = await response.json();
      return mapearMensajeAPIaFrontend(mensajeAPI);
    } catch (error) {
      console.error('Error creando mensaje:', error);
      throw new Error('No se pudo enviar el mensaje');
    }
  },

  // Obtener mensaje por ID
  async obtenerMensajePorId(id: number): Promise<Message | null> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/mensajes/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido');
        }
        throw new Error(`Error al obtener mensaje: ${response.status}`);
      }

      const mensajeAPI: ApiMessage = await response.json();
      return mapearMensajeAPIaFrontend(mensajeAPI);
    } catch (error) {
      console.error('Error obteniendo mensaje:', error);
      throw new Error('No se pudo obtener el mensaje');
    }
  },

  // Obtener conversación entre dos usuarios
  async obtenerConversacion(usuario1Id: number, usuario2Id: number): Promise<Message[]> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(
        `${API_BASE_URL}/api/mensajes/conversacion?usuario1Id=${usuario1Id}&usuario2Id=${usuario2Id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido');
        }
        throw new Error(`Error al obtener conversación: ${response.status}`);
      }

      const mensajesAPI: ApiMessage[] = await response.json();
      return mensajesAPI.map(mapearMensajeAPIaFrontend);
    } catch (error) {
      console.error('Error obteniendo conversación:', error);
      throw new Error('No se pudo obtener la conversación');
    }
  },

  // Eliminar mensaje
  async eliminarMensaje(id: number): Promise<void> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/mensajes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido');
        }
        if (response.status === 404) {
          throw new Error('Mensaje no encontrado');
        }
        throw new Error(`Error al eliminar mensaje: ${response.status}`);
      }
    } catch (error) {
      console.error('Error eliminando mensaje:', error);
      throw new Error('No se pudo eliminar el mensaje');
    }
  },

  // Obtener mensajes por receptor (usando API específica)
  async obtenerMensajesPorReceptor(receptorId: number): Promise<Message[]> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/mensajes/receptor/${receptorId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido');
        }
        throw new Error(`Error al obtener mensajes por receptor: ${response.status}`);
      }

      const mensajesAPI: ApiMessage[] = await response.json();
      return mensajesAPI.map(mapearMensajeAPIaFrontend);
    } catch (error) {
      console.error('Error obteniendo mensajes por receptor:', error);
      throw new Error('No se pudieron obtener los mensajes');
    }
  },

  // Obtener mensajes por remitente (usando API específica)
  async obtenerMensajesPorRemitente(remitenteId: number): Promise<Message[]> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/mensajes/remitente/${remitenteId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido');
        }
        throw new Error(`Error al obtener mensajes por remitente: ${response.status}`);
      }

      const mensajesAPI: ApiMessage[] = await response.json();
      return mensajesAPI.map(mapearMensajeAPIaFrontend);
    } catch (error) {
      console.error('Error obteniendo mensajes por remitente:', error);
      throw new Error('No se pudieron obtener los mensajes');
    }
  },

  // Obtener todas las conversaciones de un usuario (optimizado)
  async obtenerConversacionesUsuario(usuarioId: number): Promise<Conversation[]> {
    try {
      // Obtener todos los mensajes del usuario (como remitente y receptor)
      const [mensajesEnviados, mensajesRecibidos] = await Promise.all([
        this.obtenerMensajesPorRemitente(usuarioId),
        this.obtenerMensajesPorReceptor(usuarioId)
      ]);

      // Combinar todos los mensajes
      const todosLosMensajes = [...mensajesEnviados, ...mensajesRecibidos];

      // Agrupar mensajes por conversación
      const conversacionesMap = new Map<string, Message[]>();

      todosLosMensajes.forEach(mensaje => {
        // Determinar el otro usuario en la conversación
        const otroUsuario = mensaje.remitenteId === usuarioId ? mensaje.receptorId : mensaje.remitenteId;
        const key = `${Math.min(usuarioId, otroUsuario)}-${Math.max(usuarioId, otroUsuario)}`;
        
        if (!conversacionesMap.has(key)) {
          conversacionesMap.set(key, []);
        }
        conversacionesMap.get(key)!.push(mensaje);
      });

      // Convertir el mapa a array de conversaciones
      const conversaciones: Conversation[] = [];
      let conversacionId = 1;

      conversacionesMap.forEach((mensajes, key) => {
        // Ordenar mensajes por fecha
        mensajes.sort((a, b) => new Date(a.fechaEnvio).getTime() - new Date(b.fechaEnvio).getTime());
        
        const [usuario1, usuario2] = key.split('-').map(Number);
        const ultimoMensaje = mensajes[mensajes.length - 1];

        conversaciones.push({
          id: conversacionId++,
          usuario1Id: usuario1,
          usuario2Id: usuario2,
          ultimoMensaje,
          mensajes
        });
      });

      // Obtener todos los usuarios para crear conversaciones completas
      try {
        const todosLosUsuarios = await userService.getAllUsers();
        
        // Crear un Set con los IDs de usuarios que ya tienen conversaciones
        const usuariosConConversacion = new Set<number>();
        conversaciones.forEach(conv => {
          usuariosConConversacion.add(conv.usuario1Id);
          usuariosConConversacion.add(conv.usuario2Id);
        });
        
        // Agregar conversaciones vacías para usuarios que no tienen conversación
        todosLosUsuarios.forEach(usuario => {
          const userId = parseInt(usuario.id);
          // No crear conversación con uno mismo
          if (userId !== usuarioId) {
            // Verificar si ya existe una conversación con este usuario
            const conversacionExistente = conversaciones.find(conv => 
              (conv.usuario1Id === Math.min(usuarioId, userId) && conv.usuario2Id === Math.max(usuarioId, userId))
            );
            
            // Solo agregar si no existe
            if (!conversacionExistente) {
              conversaciones.push({
                id: conversacionId++,
                usuario1Id: Math.min(usuarioId, userId),
                usuario2Id: Math.max(usuarioId, userId),
                ultimoMensaje: undefined,
                mensajes: []
              });
            }
          }
        });
      } catch (error) {
        console.error('Error obteniendo usuarios para crear conversaciones vacías:', error);
      }

      // Ordenar conversaciones: primero las que tienen mensajes (más reciente primero), luego las vacías
      conversaciones.sort((a, b) => {
        // Si ambas tienen mensajes, ordenar por fecha del último mensaje
        if (a.ultimoMensaje && b.ultimoMensaje) {
          return new Date(b.ultimoMensaje.fechaEnvio).getTime() - new Date(a.ultimoMensaje.fechaEnvio).getTime();
        }
        // Si solo una tiene mensajes, la que tiene mensajes va primero
        if (a.ultimoMensaje && !b.ultimoMensaje) return -1;
        if (!a.ultimoMensaje && b.ultimoMensaje) return 1;
        // Si ambas están vacías, mantener el orden original
        return 0;
      });

      return conversaciones;
    } catch (error) {
      console.error('Error obteniendo conversaciones:', error);
      // Retornar array vacío en lugar de lanzar error para mejor UX
      return [];
    }
  },

  // Obtener usuario por ID (usando el servicio de usuarios real)
  async obtenerUsuarioPorId(id: number) {
    try {
      const usuario = await userService.getUserById(id.toString());
      if (usuario) {
        return {
          id: parseInt(usuario.id),
          nombre: usuario.nombre,
          avatarUrl: usuario.avatarUrl || null
        };
      }
      // Fallback si no se encuentra el usuario
      return {
        id,
        nombre: `Usuario ${id}`,
        avatarUrl: null
      };
    } catch (error) {
      console.error('Error obteniendo usuario por ID:', error);
      // Fallback a datos hardcodeados
      return {
        id,
        nombre: `Usuario ${id}`,
        avatarUrl: null
      };
    }
  },

  // Obtener todos los usuarios (usando el servicio de usuarios real con cache)
  async obtenerUsuarios() {
    try {
      const usuarios = await userService.getAllUsers();
      return usuarios.map(usuario => ({
        id: parseInt(usuario.id),
        nombre: usuario.nombre,
        avatarUrl: usuario.avatarUrl || null
      }));
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      // Fallback a usuarios hardcodeados si falla la API
      const usuarios = [];
      for (let i = 1; i <= 20; i++) {
        usuarios.push({
          id: i,
          nombre: `Usuario ${i}`,
          avatarUrl: null
        });
      }
      return usuarios;
    }
  },

  // Marcar mensaje como leído (implementación local por ahora)
  async marcarComoLeido(): Promise<void> {
    // Esta funcionalidad se puede implementar cuando el backend la soporte
  },

  // Obtener mensajes no leídos de un usuario
  async obtenerMensajesNoLeidos(usuarioId: number): Promise<Message[]> {
    try {
      const mensajes = await this.obtenerMensajesPorReceptor(usuarioId);
      return mensajes.filter(m => !m.leido);
    } catch (error) {
      console.error('Error obteniendo mensajes no leídos:', error);
      throw new Error('No se pudieron obtener los mensajes no leídos');
    }
  },

  // Contar mensajes no leídos de un usuario
  async contarMensajesNoLeidos(usuarioId: number): Promise<number> {
    try {
      const mensajesNoLeidos = await this.obtenerMensajesNoLeidos(usuarioId);
      return mensajesNoLeidos.length;
    } catch (error) {
      console.error('Error contando mensajes no leídos:', error);
      return 0;
    }
  },
}; 
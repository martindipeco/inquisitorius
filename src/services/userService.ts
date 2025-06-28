import usersData from '../mocks/users.json';
import type { ProfileFormData } from '../types/profileSchema';

export interface User {
  id: string;
  nombre: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

// Tipo para los datos del mock
interface MockUser {
  id: number;
  email: string;
  password: string;
  nombre: string | null;
  apellido: string | null;
  rol: 'USUARIO' | 'ADMIN';
}

// Tipo para usuarios de la API
interface ApiUser {
  id: number;
  login: string;
}

const API_BASE_URL = 'https://inquisitorius.onrender.com/api';

// Cache mejorado para usuarios
let usersCache: User[] | null = null;
let usersCacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

class UserService {
  /**
   * Obtiene todos los usuarios desde la API con cache
   */
  async getAllUsers(): Promise<User[]> {
    // Verificar si tenemos cache válido
    const now = Date.now();
    if (usersCache && (now - usersCacheTimestamp) < CACHE_DURATION) {
      return usersCache;
    }

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/usuarios`, {
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
        throw new Error(`Error al obtener usuarios: ${response.status}`);
      }

      const apiUsers: ApiUser[] = await response.json();
      
      const mappedUsers = apiUsers.map(apiUser => ({
        id: apiUser.id.toString(),
        nombre: apiUser.login.split('@')[0] || `Usuario ${apiUser.id}`,
        email: apiUser.login,
        bio: '',
        avatarUrl: undefined
      }));

      // Actualizar cache
      usersCache = mappedUsers;
      usersCacheTimestamp = now;

      return mappedUsers;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw new Error('No se pudieron obtener los usuarios');
    }
  }

  /**
   * Limpia el cache de usuarios (útil para forzar refrescar datos)
   */
  clearCache(): void {
    usersCache = null;
    usersCacheTimestamp = 0;
  }

  /**
   * Obtiene los datos de un usuario por su ID.
   * En una app real, este ID vendría del estado de autenticación.
   * @param userId - El ID del usuario a obtener.
   */
  async getUserById(userId: string): Promise<User | null> {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      const user = (usersData as MockUser[]).find((u: MockUser) => u.id.toString() === userId);
      
      if (!user) return null;
      
      return {
        id: user.id.toString(),
        nombre: user.nombre || '',
        email: user.email,
        bio: '',
        avatarUrl: undefined
      };
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      throw new Error('No se pudieron cargar los datos del usuario.');
    }
  }

  /**
   * Actualiza los datos de un perfil de usuario.
   * En una app real, esto haría una petición PATCH o PUT a la API.
   * @param userId - El ID del usuario a actualizar.
   * @param data - Los nuevos datos del perfil.
   */
  async updateUserProfile(userId: string, data: ProfileFormData): Promise<User> {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`[UserService] Actualizando perfil para usuario ${userId} con:`, data);

      // Esta parte es solo para la simulación. En una app real,
      // el backend se encargaría de actualizar y devolver los datos.
      const userIndex = (usersData as MockUser[]).findIndex((u: MockUser) => u.id.toString() === userId);
      if (userIndex === -1) {
        throw new Error('Usuario no encontrado.');
      }
      
      const currentUser = (usersData as MockUser[])[userIndex];
      const updatedUser = {
        id: currentUser.id.toString(),
        nombre: data.usuario || currentUser.nombre || '',
        email: data.usuario, // Usar usuario como email
        bio: '',
        avatarUrl: undefined
      };

      console.log('[UserService] Datos que serían guardados:', updatedUser);

      return updatedUser;
    } catch (error) {
      console.error('Error actualizando el perfil:', error);
      throw new Error('No se pudo actualizar el perfil.');
    }
  }
}

// Exportar instancia singleton
export const userService = new UserService(); 
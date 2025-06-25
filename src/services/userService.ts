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

class UserService {
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
        nombre: data.nombreCompleto || currentUser.nombre || '',
        email: data.email,
        bio: data.bio || '',
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
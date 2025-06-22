import usersData from '../mocks/users.json';
import type { ProfileFormData } from '../types/profileSchema';

export interface User {
  id: string;
  nombre: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
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
      const user = usersData.users.find(u => u.id === userId);
      return user || null;
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
      const userIndex = usersData.users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        throw new Error('Usuario no encontrado.');
      }
      
      const updatedUser = {
        ...usersData.users[userIndex],
        ...data,
      };

      // usersData.users[userIndex] = updatedUser; // Esto no funcionará en memoria.
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
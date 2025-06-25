import type { DatosRegistrarUsuario } from '../types/registerSchema';

// Simular base de datos de usuarios registrados
let registeredUsers: Array<DatosRegistrarUsuario & { id: number; fechaRegistro: string }> = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'Test1234',
    rol: 'USUARIO',
    fechaRegistro: '2024-01-01T00:00:00Z'
  }
];

let nextId = 2;

export const registerService = {
  // Registrar un nuevo usuario
  async registrarUsuario(datos: DatosRegistrarUsuario): Promise<{ success: boolean; message?: string }> {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar si el usuario ya existe
      const usuarioExistente = registeredUsers.find(user => user.email === datos.email);
      if (usuarioExistente) {
        return {
          success: false,
          message: 'El correo electrónico ya está registrado'
        };
      }

      // Crear nuevo usuario
      const nuevoUsuario = {
        id: nextId++,
        ...datos,
        rol: 'USUARIO' as const, // Por defecto es USUARIO
        fechaRegistro: new Date().toISOString()
      };

      registeredUsers.push(nuevoUsuario);

      return {
        success: true,
        message: 'Usuario registrado exitosamente'
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: 'Error interno del servidor'
      };
    }
  },

  // Verificar si un email ya está registrado
  async verificarEmailExistente(email: string): Promise<boolean> {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return registeredUsers.some(user => user.email === email);
    } catch (error) {
      console.error('Error verificando email:', error);
      return false;
    }
  },

  // Obtener todos los usuarios (para debugging)
  async obtenerUsuarios() {
    return registeredUsers.map(user => ({
      id: user.id,
      email: user.email,
      rol: user.rol,
      fechaRegistro: user.fechaRegistro
    }));
  },

  // Limpiar datos de prueba
  async limpiarDatosPrueba() {
    registeredUsers = [];
    nextId = 1;
  }
}; 
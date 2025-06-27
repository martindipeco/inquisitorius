import type { DatosRegistrarUsuario } from '../types/registerSchema';

// URL base de la API
const API_BASE_URL = 'https://inquisitorius.onrender.com';

// Interfaz para el payload que espera la API
interface RegisterPayload {
  login: string;
  clave: string;
  rol: string;
}

export const registerService = {
  // Registrar un nuevo usuario
  async registrarUsuario(datos: DatosRegistrarUsuario): Promise<{ success: boolean; message?: string }> {
    try {
      // Mapear los datos del formulario a la estructura que espera la API
      const payload: RegisterPayload = {
        login: datos.usuario,
        clave: datos.password,
        rol: 'USER' // Asignar automáticamente el rol USER a todos los registros
      };

      const response = await fetch(`${API_BASE_URL}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Manejar diferentes códigos de estado
      switch (response.status) {
        case 200:
          return {
            success: true,
            message: 'Usuario registrado exitosamente'
          };
        
        case 400:
          return {
            success: false,
            message: 'El usuario ya está registrado'
          };
        
        case 403:
          return {
            success: false,
            message: 'Acceso denegado. Verifica tus credenciales.'
          };
        
        case 404:
          return {
            success: false,
            message: 'Servicio de registro no disponible.'
          };
        
        case 500:
          return {
            success: false,
            message: 'Error interno del servidor. Intenta más tarde.'
          };
        
        default:
          return {
            success: false,
            message: `Error inesperado (${response.status}). Intenta de nuevo.`
          };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      
      // Manejar errores de red específicos
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Error de conexión. Verifica tu conexión a internet.'
        };
      }
      
      return {
        success: false,
        message: 'Error interno del servidor'
      };
    }
  },

  // Verificar si un usuario ya está registrado
  async verificarUsuarioExistente(usuario: string): Promise<boolean> {
    try {
      // Intentar registrar un usuario temporal para verificar si el usuario existe
      // La API devolverá 400 si el usuario ya está registrado
      const payload: RegisterPayload = {
        login: usuario,
        clave: 'temp_password_for_check', // Contraseña temporal
        rol: 'USER'
      };

      const response = await fetch(`${API_BASE_URL}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Si devuelve 400, significa que el usuario ya existe
      return response.status === 400;
    } catch (error) {
      console.error('Error verificando usuario:', error);
      return false; // En caso de error, permitir el registro
    }
  },

  // Método para probar la conectividad con la API
  async probarConexion(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/registro`, {
        method: 'OPTIONS', // Usar OPTIONS para verificar conectividad sin enviar datos
      });
      
      return {
        success: response.ok,
        message: response.ok ? 'Conexión exitosa' : `Error de conexión: ${response.status}`
      };
    } catch (error) {
      console.error('Error probando conexión:', error);
      return {
        success: false,
        message: 'No se pudo conectar con el servidor'
      };
    }
  }
}; 
// URL base de la API
const API_BASE_URL = 'https://inquisitorius.onrender.com';

export interface User {
  id: number;
  usuario: string;
  password: string;
  nombre: string | null;
  apellido: string | null;
  rol: 'USUARIO' | 'ADMIN';
}

export interface LoginCredentials {
  usuario: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: Omit<User, 'password'>;
  token?: string;
}

// Interfaz para el payload que espera la API
interface LoginPayload {
  login: string;
  clave: string;
}

// Interfaz para la respuesta de la API
interface ApiLoginResponse {
  jwToken: string;
}

// Función para decodificar JWT y extraer información del usuario
const decodeJWT = (token: string): { usuario: string; role: string; id: number } | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const payload = JSON.parse(jsonPayload);
    return {
      usuario: payload.sub,
      role: payload.role,
      id: payload.id
    };
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

export const authService = {
  // Iniciar sesión
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Mapear los datos del formulario a la estructura que espera la API
      const payload: LoginPayload = {
        login: credentials.usuario,
        clave: credentials.password
      };

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data: ApiLoginResponse = await response.json();
        
        // Decodificar el JWT para obtener información del usuario
        const userInfo = decodeJWT(data.jwToken);
        
        if (!userInfo) {
          return {
            success: false,
            message: 'Error procesando la respuesta del servidor'
          };
        }

        // Crear objeto usuario
        const user: Omit<User, 'password'> = {
          id: userInfo.id,
          usuario: userInfo.usuario,
          nombre: null, // La API no proporciona nombre/apellido
          apellido: null,
          rol: userInfo.role === 'USER' ? 'USUARIO' : 'ADMIN'
        };

        // Guardar token y usuario en localStorage
        localStorage.setItem('authToken', data.jwToken);
        localStorage.setItem('user', JSON.stringify(user));

        return {
          success: true,
          message: 'Inicio de sesión exitoso',
          user,
          token: data.jwToken
        };
      } else {
        // Manejar diferentes códigos de estado
        switch (response.status) {
          case 400:
            return {
              success: false,
              message: 'Credenciales incorrectas. Verifica tu usuario y contraseña.'
            };
          
          case 401:
            return {
              success: false,
              message: 'Credenciales inválidas.'
            };
          
          case 403:
            return {
              success: false,
              message: 'Acceso denegado. Verifica tus credenciales o contacta al administrador.'
            };
          
          case 404:
            return {
              success: false,
              message: 'Servicio de autenticación no disponible.'
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
      }
    } catch (error) {
      console.error('Error en login:', error);
      
      // Manejar errores de red específicos
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Error de conexión. Verifica tu conexión a internet.'
        };
      }
      
      return {
        success: false,
        message: 'Error de conexión. Intenta de nuevo.'
      };
    }
  },

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    // Verificar si el JWT no ha expirado
    const userInfo = decodeJWT(token);
    if (!userInfo) return false;
    
    return true;
  },

  // Obtener usuario actual
  getCurrentUser(): Omit<User, 'password'> | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Obtener token actual
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  // Verificar si el token es válido
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const userInfo = decodeJWT(token);
    return userInfo !== null;
  },

  // Renovar token (si es necesario)
  refreshToken(): boolean {
    // En este caso, el JWT se renueva automáticamente desde el backend
    // Solo verificamos que el token actual sea válido
    return this.isTokenValid();
  },

  // Obtener todos los usuarios (para debugging)
  getAllUsers(): Omit<User, 'password'>[] {
    // Implementa la lógica para obtener todos los usuarios
    // Este método debería ser implementado en la nueva implementación
    throw new Error('getAllUsers method not implemented');
  }
}; 
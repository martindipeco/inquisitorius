import usersData from '../mocks/users.json';

export interface User {
  id: number;
  email: string;
  password: string;
  nombre: string | null;
  apellido: string | null;
  rol: 'USUARIO' | 'ADMIN';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: Omit<User, 'password'>;
  token?: string;
}

// Simular base de datos de usuarios
const users: User[] = usersData as User[];

// Generar token simple (en producción usar JWT)
const generateToken = (userId: number): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${userId}_${timestamp}_${random}`;
};

// Verificar token
const verifyToken = (token: string): number | null => {
  try {
    const parts = token.split('_');
    if (parts.length !== 3) return null;
    
    const userId = parseInt(parts[0]);
    const timestamp = parseInt(parts[1]);
    const now = Date.now();
    
    // Token válido por 24 horas
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      return null;
    }
    
    return userId;
  } catch {
    return null;
  }
};

export const authService = {
  // Iniciar sesión
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = users.find(u => 
        u.email.toLowerCase() === credentials.email.toLowerCase() && 
        u.password === credentials.password
      );

      if (!user) {
        return {
          success: false,
          message: 'Credenciales incorrectas. Verifica tu correo y contraseña.'
        };
      }

      const token = generateToken(user.id);
      
      // Guardar token en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol
      }));

      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          rol: user.rol
        },
        token
      };
    } catch (error) {
      console.error('Error en login:', error);
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
    
    const userId = verifyToken(token);
    return userId !== null;
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
    
    return verifyToken(token) !== null;
  },

  // Renovar token (si es necesario)
  refreshToken(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const newToken = generateToken(user.id);
    localStorage.setItem('authToken', newToken);
    return true;
  },

  // Obtener todos los usuarios (para debugging)
  getAllUsers(): Omit<User, 'password'>[] {
    return users.map(user => ({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol
    }));
  }
}; 
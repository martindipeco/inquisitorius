// URL base de la API
const API_BASE_URL = 'https://inquisitorius.onrender.com';

// Interfaz para la respuesta de la API
export interface CursoAPI {
  id: number;
  titulo: string;
  descripcion: string;
  duracionHoras: number;
  nivel: 'Inicial' | 'Intermedio' | 'Avanzado';
}

// Interfaz extendida para el frontend con campos adicionales
export interface Curso {
  id: string;
  nombre: string; // Mapeado desde titulo
  descripcion: string;
  profesor: string; // Generado automáticamente
  duracion: number; // Mapeado desde duracionHoras
  imagen: string; // Generado automáticamente
  logoCurso: string; // Generado automáticamente
  nivel: 'Inicial' | 'Intermedio' | 'Avanzado'; // Nuevo campo
}

export interface CursosResponse {
  cursos: Curso[];
}

// Función para obtener el token de autenticación
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Función para generar imagen basada en el título del curso
const generarImagen = (titulo: string): string => {
  const imagenes = [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  ];
  
  // Generar índice basado en el título para consistencia
  const index = titulo.length % imagenes.length;
  return imagenes[index];
};

// Función para generar logo basado en el título del curso
const generarLogo = (titulo: string): string => {
  const logos = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  ];
  
  // Generar índice basado en el título para consistencia
  const index = titulo.length % logos.length;
  return logos[index];
};

// Función para generar profesor basado en el título del curso
const generarProfesor = (titulo: string): string => {
  const profesores = [
    'María González',
    'Carlos Rodríguez',
    'Ana Martínez',
    'Luis Fernández',
    'Sofia López',
    'Diego Silva'
  ];
  
  // Generar índice basado en el título para consistencia
  const index = titulo.length % profesores.length;
  return profesores[index];
};

// Función para mapear curso de API a curso del frontend
const mapearCursoAPIaFrontend = (cursoAPI: CursoAPI): Curso => {
  return {
    id: cursoAPI.id.toString(),
    nombre: cursoAPI.titulo,
    descripcion: cursoAPI.descripcion,
    profesor: generarProfesor(cursoAPI.titulo),
    duracion: cursoAPI.duracionHoras,
    imagen: generarImagen(cursoAPI.titulo),
    logoCurso: generarLogo(cursoAPI.titulo),
    nivel: cursoAPI.nivel
  };
};

class CursosService {
  /**
   * Obtiene todos los cursos disponibles
   * @returns Promise<Curso[]> Lista de cursos
   */
  async obtenerCursos(): Promise<Curso[]> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/cursos`, {
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
        throw new Error(`Error al obtener cursos: ${response.status}`);
      }

      const cursosAPI: CursoAPI[] = await response.json();
      
      // Mapear cursos de la API al formato del frontend
      return cursosAPI.map(mapearCursoAPIaFrontend);
    } catch (error) {
      console.error('Error obteniendo cursos:', error);
      throw new Error('No se pudieron cargar los cursos');
    }
  }

  /**
   * Obtiene un curso específico por ID
   * @param id ID del curso
   * @returns Promise<Curso | null> Curso encontrado o null
   */
  async obtenerCursoPorId(id: string): Promise<Curso | null> {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/api/cursos/${id}`, {
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
        throw new Error(`Error al obtener curso: ${response.status}`);
      }

      const cursoAPI: CursoAPI = await response.json();
      return mapearCursoAPIaFrontend(cursoAPI);
    } catch (error) {
      console.error('Error obteniendo curso:', error);
      throw new Error('No se pudo cargar el curso');
    }
  }

  /**
   * Busca cursos por término
   * @param termino Término de búsqueda
   * @returns Promise<Curso[]> Cursos que coinciden con la búsqueda
   */
  async buscarCursos(termino: string): Promise<Curso[]> {
    try {
      // Primero obtenemos todos los cursos
      const todosLosCursos = await this.obtenerCursos();
      
      // Luego filtramos localmente
      const terminoLower = termino.toLowerCase();
      return todosLosCursos.filter(curso => 
        curso.nombre.toLowerCase().includes(terminoLower) ||
        curso.descripcion.toLowerCase().includes(terminoLower) ||
        curso.profesor.toLowerCase().includes(terminoLower) ||
        curso.nivel.toLowerCase().includes(terminoLower)
      );
    } catch (error) {
      console.error('Error buscando cursos:', error);
      throw new Error('No se pudo realizar la búsqueda');
    }
  }

  /**
   * Preload de imágenes para mejorar performance
   * @param cursos Lista de cursos cuyas imágenes preloadear
   */
  async preloadImagenes(cursos: Curso[]): Promise<void> {
    const imagePromises = cursos.map((curso) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = curso.imagen;
      });
    });

    const logoPromises = cursos.map((curso) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = curso.logoCurso;
      });
    });

    await Promise.all([...imagePromises, ...logoPromises]);
  }
}

// Exportar instancia singleton
export const cursosService = new CursosService(); 
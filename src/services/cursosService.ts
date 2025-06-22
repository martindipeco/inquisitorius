import cursosData from '../mocks/cursos.json';

export interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  imagen: string;
  logoCurso: string;
}

export interface CursosResponse {
  cursos: Curso[];
}

class CursosService {
  /**
   * Obtiene todos los cursos disponibles
   * @returns Promise<Curso[]> Lista de cursos
   */
  async obtenerCursos(): Promise<Curso[]> {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En un caso real, aquí harías fetch a tu API
      // const response = await fetch('/api/cursos');
      // const data: CursosResponse = await response.json();
      // return data.cursos;
      
      // Por ahora retornamos datos del mock
      return cursosData.cursos;
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
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // En un caso real, aquí harías fetch a tu API
      // const response = await fetch(`/api/cursos/${id}`);
      // const curso: Curso = await response.json();
      // return curso;
      
      // Por ahora buscamos en el mock
      const curso = cursosData.cursos.find(c => c.id === id);
      return curso || null;
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
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const terminoLower = termino.toLowerCase();
      return cursosData.cursos.filter(curso => 
        curso.nombre.toLowerCase().includes(terminoLower) ||
        curso.descripcion.toLowerCase().includes(terminoLower) ||
        curso.profesor.toLowerCase().includes(terminoLower)
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
import type { 
  CertificationApi, 
  Certification, 
  CreateCertificationData,
  CertificationServiceResponse 
} from '../types/certificationSchema';

// Función para obtener el token de autenticación
const getAuthToken = (): string | null => {
  // Intentar obtener el token del localStorage
  return localStorage.getItem('authToken');
};

// Generar código de verificación único
const generateVerificationCode = (id: number, nombre: string): string => {
  const timestamp = Date.now().toString(36);
  const nameHash = nombre.replace(/\s+/g, '').toUpperCase().substring(0, 3);
  return `${nameHash}-${id}-${timestamp}`.toUpperCase();
};

// Generar horas completadas basadas en el tipo de curso
const generateHoursCompleted = (nombre: string): number => {
  const lowerNombre = nombre.toLowerCase();
  
  if (lowerNombre.includes('fundamentals') || lowerNombre.includes('básico')) {
    return Math.floor(Math.random() * 10) + 8; // 8-18 horas
  } else if (lowerNombre.includes('advanced') || lowerNombre.includes('avanzado')) {
    return Math.floor(Math.random() * 15) + 25; // 25-40 horas
  } else if (lowerNombre.includes('aws') || lowerNombre.includes('cloud')) {
    return Math.floor(Math.random() * 8) + 20; // 20-28 horas
  } else {
    return Math.floor(Math.random() * 12) + 15; // 15-27 horas
  }
};

// Generar instructor basado en el tipo de curso
const generateInstructor = (nombre: string): string => {
  const lowerNombre = nombre.toLowerCase();
  
  if (lowerNombre.includes('react') || lowerNombre.includes('frontend')) {
    return 'Prof. Carlos Rodríguez';
  } else if (lowerNombre.includes('spring') || lowerNombre.includes('backend')) {
    return 'Dr. María González';
  } else if (lowerNombre.includes('sql') || lowerNombre.includes('base de datos')) {
    return 'Ing. Ana Martínez';
  } else if (lowerNombre.includes('docker') || lowerNombre.includes('devops')) {
    return 'MSc. Luis Pérez';
  } else if (lowerNombre.includes('machine learning') || lowerNombre.includes('ai')) {
    return 'Dr. Carmen López';
  } else if (lowerNombre.includes('ciberseguridad') || lowerNombre.includes('seguridad')) {
    return 'Lic. Roberto Silva';
  } else if (lowerNombre.includes('aws') || lowerNombre.includes('cloud')) {
    return 'AWS Certified Instructor';
  } else if (lowerNombre.includes('ágil') || lowerNombre.includes('scrum')) {
    return 'Certified Scrum Master';
  } else {
    const instructors = [
      'Dr. María González',
      'Prof. Carlos Rodríguez',
      'Ing. Ana Martínez',
      'Lic. Luis Pérez',
      'MSc. Carmen López'
    ];
    return instructors[Math.floor(Math.random() * instructors.length)];
  }
};

// Función para generar logo basado en el nombre de la certificación
const generarLogo = (nombre: string): string => {
  const lowerNombre = nombre.toLowerCase();
  
  if (lowerNombre.includes('react') || lowerNombre.includes('frontend')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
  } else if (lowerNombre.includes('spring') || lowerNombre.includes('backend')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
  } else if (lowerNombre.includes('sql') || lowerNombre.includes('base de datos')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg';
  } else if (lowerNombre.includes('docker') || lowerNombre.includes('devops')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg';
  } else if (lowerNombre.includes('machine learning') || lowerNombre.includes('ai')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
  } else if (lowerNombre.includes('ciberseguridad') || lowerNombre.includes('seguridad')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg';
  } else if (lowerNombre.includes('aws') || lowerNombre.includes('cloud')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg';
  } else if (lowerNombre.includes('ágil') || lowerNombre.includes('scrum')) {
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg';
  } else {
    // Logos por defecto
    const logos = [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
    ];
    return logos[Math.floor(Math.random() * logos.length)];
  }
};

// Función para generar imagen de certificado basada en el tipo
const generarImagenCertificado = (nombre: string): string => {
  const lowerNombre = nombre.toLowerCase();
  
  if (lowerNombre.includes('react') || lowerNombre.includes('frontend')) {
    return 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('spring') || lowerNombre.includes('backend')) {
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('sql') || lowerNombre.includes('base de datos')) {
    return 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('docker') || lowerNombre.includes('devops')) {
    return 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('machine learning') || lowerNombre.includes('ai')) {
    return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('ciberseguridad') || lowerNombre.includes('seguridad')) {
    return 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('aws') || lowerNombre.includes('cloud')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop';
  } else if (lowerNombre.includes('ágil') || lowerNombre.includes('scrum')) {
    return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop';
  } else {
    // Imágenes por defecto relacionadas con tecnología
    const imagenes = [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    ];
    return imagenes[Math.floor(Math.random() * imagenes.length)];
  }
};

// Transformar datos del backend al formato del frontend
const transformCertificationData = (apiData: CertificationApi): Certification => {
  return {
    id: apiData.id.toString(),
    nombre: apiData.nombre,
    fechaObtencion: apiData.fechaEmision,
    imagen: generarImagenCertificado(apiData.nombre),
    logoCurso: generarLogo(apiData.nombre),
    codigoVerificacion: generateVerificationCode(apiData.id, apiData.nombre),
    horasCompletadas: generateHoursCompleted(apiData.nombre),
    instructor: generateInstructor(apiData.nombre),
    institucion: apiData.institucion,
    usuarioId: apiData.usuarioId,
  };
};

class CertificationService {
  private baseURL = 'https://inquisitorius.onrender.com/api'; // URL actualizada

  // Función helper para crear headers con autenticación
  private getHeaders(): HeadersInit {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Obtener todas las certificaciones del usuario
  async obtenerCertificacionesUsuario(usuarioId: number): Promise<CertificationServiceResponse> {
    try {
      const response = await fetch(`${this.baseURL}/certificaciones`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CertificationApi[] = await response.json();
      
      // Filtrar solo las certificaciones del usuario autenticado
      const userCertifications = data.filter(cert => cert.usuarioId === usuarioId);
      
      // Transformar los datos del backend al formato del frontend
      const transformedData: Certification[] = userCertifications.map(transformCertificationData);

      return {
        success: true,
        data: transformedData,
        message: 'Certificaciones obtenidas exitosamente',
      };
    } catch (error) {
      console.error('Error obteniendo certificaciones:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudieron obtener las certificaciones',
      };
    }
  }

  // Obtener una certificación específica por ID
  async obtenerCertificacion(id: number): Promise<CertificationServiceResponse> {
    try {
      const response = await fetch(`${this.baseURL}/certificaciones/${id}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CertificationApi = await response.json();
      const transformedData = transformCertificationData(data);

      return {
        success: true,
        data: [transformedData],
        message: 'Certificación obtenida exitosamente',
      };
    } catch (error) {
      console.error('Error obteniendo certificación:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo obtener la certificación',
      };
    }
  }

  // Crear una nueva certificación
  async crearCertificacion(certificationData: CreateCertificationData): Promise<CertificationServiceResponse> {
    try {
      const response = await fetch(`${this.baseURL}/certificaciones`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(certificationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CertificationApi = await response.json();
      const transformedData = transformCertificationData(data);

      return {
        success: true,
        data: [transformedData],
        message: 'Certificación creada exitosamente',
      };
    } catch (error) {
      console.error('Error creando certificación:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo crear la certificación',
      };
    }
  }

  // Eliminar una certificación
  async eliminarCertificacion(id: number): Promise<CertificationServiceResponse> {
    try {
      const response = await fetch(`${this.baseURL}/certificaciones/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: 'Certificación eliminada exitosamente',
      };
    } catch (error) {
      console.error('Error eliminando certificación:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo eliminar la certificación',
      };
    }
  }

  // Verificar una certificación por código (simulación)
  async verificarCertificacion(codigoVerificacion: string): Promise<CertificationServiceResponse> {
    try {
      // Simular verificación - en un caso real, esto iría al backend
      console.log('Verificando certificado con código:', codigoVerificacion);
      
      // Simular delay de verificación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular verificación exitosa
      return {
        success: true,
        message: 'Certificación verificada exitosamente',
      };
    } catch (error) {
      console.error('Error verificando certificación:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo verificar la certificación',
      };
    }
  }

  // Descargar certificación como PDF (simulación)
  async descargarCertificacion(id: number): Promise<CertificationServiceResponse> {
    try {
      // Simular descarga de PDF
      console.log(`Descargando certificación ${id} como PDF...`);
      
      // Aquí iría la lógica real para descargar el PDF
      // Por ahora solo simulamos el proceso
      
      return {
        success: true,
        message: 'Certificación descargada exitosamente',
      };
    } catch (error) {
      console.error('Error descargando certificación:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo descargar la certificación',
      };
    }
  }
}

// Exportar una instancia del servicio
export const certificationService = new CertificationService(); 
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ImageWithFallback } from '../ImageWithFallback';
import enrolledCoursesData from '../../mocks/enrolledCourses.json';

interface EnrolledCourse {
  id: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  imagen: string;
  logoCurso: string;
  progreso: number;
  fechaInscripcion: string;
  ultimaActividad: string;
  estado: 'en_progreso' | 'completado' | 'pendiente';
}

export const MyCoursesContent = () => {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde el archivo JSON
  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setCourses(enrolledCoursesData.enrolledCourses as EnrolledCourse[]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'en_progreso':
        return 'bg-blue-100 text-blue-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'Completado';
      case 'en_progreso':
        return 'En Progreso';
      case 'pendiente':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon icon="mdi:loading" className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Mis Cursos</h3>
        <p className="text-sm text-gray-500">Gestiona tus cursos inscritos y sigue tu progreso.</p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white p-4 sm:p-8 rounded-lg border border-gray-200 text-center">
          <Icon icon="mdi:book-open-variant" className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tienes cursos inscritos</h3>
          <p className="text-sm text-gray-500 mb-4">Explora nuestro catálogo y encuentra el curso perfecto para ti.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Explorar Cursos
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Logo del curso */}
                <div className="flex justify-center sm:justify-start">
                  <ImageWithFallback
                    src={course.logoCurso}
                    alt={`Logo de ${course.nombre}`}
                    size="md"
                    shape="rounded"
                    skeletonClassName="border border-gray-200"
                  />
                </div>

                {/* Información del curso */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900">{course.nombre}</h4>
                      <p className="text-sm text-gray-600">Prof. {course.profesor}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.estado)} self-start sm:self-auto`}>
                      {getStatusText(course.estado)}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{course.descripcion}</p>

                  {/* Progreso */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span>{course.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progreso}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                      <span>{course.duracion} horas</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon icon="mdi:calendar" className="w-4 h-4" />
                      <span>Inscrito el {new Date(course.fechaInscripcion).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                  <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Continuar
                  </button>
                  <button className="flex-1 sm:flex-none text-gray-600 hover:text-gray-800 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300 sm:border-0">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 
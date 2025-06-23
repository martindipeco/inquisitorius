import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Curso as CursoComponent } from '../components/Curso';
import { Footer } from '../components/Footer';
import { cursosService, type Curso } from '../services/cursosService';
import { PROTECTED_ROUTES } from '../routes/routes';

// Componente de skeleton para evitar layout shifts
const CursoSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden animate-pulse">
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

export const HomePage = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoizar el cálculo de estadísticas
  const estadisticas = useMemo(() => ({
    totalCursos: cursos.length,
    estudiantesActivos: 1000,
    instructores: 50
  }), [cursos.length]);

  // Cargar cursos y preloadear imágenes
  useEffect(() => {
    const cargarCursos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener cursos del servicio
        const cursosData = await cursosService.obtenerCursos();
        setCursos(cursosData);
        
        // Preloadear imágenes para mejorar performance
        await cursosService.preloadImagenes(cursosData);
      } catch (error) {
        console.error('Error cargando cursos:', error);
        setError('No se pudieron cargar los cursos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    cargarCursos();
  }, []);

  const handleCursoSelect = (curso: Curso) => {
    console.log('Curso seleccionado:', curso);
    // Aquí puedes agregar navegación al detalle del curso
  };

  const handleCursoClick = (curso: Curso) => {
    console.log('Curso clickeado:', curso);
    // Aquí puedes agregar navegación al detalle del curso
  };

  const handleConfiguracionesClick = () => {
    navigate(PROTECTED_ROUTES.CONFIGURACIONES_PERFIL);
  };

  // Renderizar skeletons mientras carga
  const renderSkeletons = () => (
    <div className="grid-optimized">
      {Array.from({ length: 6 }).map((_, index) => (
        <CursoSkeleton key={index} />
      ))}
    </div>
  );

  // Renderizar mensaje de error
  const renderError = () => (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar 
        cursos={cursos} 
        onCursoSelect={handleCursoSelect} 
        onConfiguracionesClick={handleConfiguracionesClick}
      />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Bienvenido a <span className="text-blue-600">Mentora</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              Tu plataforma para el aprendizaje continuo. Descubre cursos, sigue tu progreso y alcanza tus metas.
            </p>
          </div>
        </section>

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-4 py-8 content-visibility-auto">
          {/* Sección de cursos - Altura mínima para evitar layout shifts */}
          <section className="min-h-[600px] layout-stable">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Cursos Disponibles
              </h2>
              <div className="text-sm text-gray-600">
                {loading ? 'Cargando...' : `${cursos.length} cursos disponibles`}
              </div>
            </div>

            {loading ? (
              renderSkeletons()
            ) : error ? (
              renderError()
            ) : (
              <div className="grid-optimized">
                {cursos.map((curso) => (
                  <CursoComponent
                    key={curso.id}
                    {...curso}
                    onClick={() => handleCursoClick(curso)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Sección de estadísticas - Altura fija para evitar layout shifts */}
          <section className="mt-16 bg-white rounded-lg shadow-sm p-8 min-h-[200px] layout-stable">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Nuestros Números
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {estadisticas.totalCursos}+
                </div>
                <div className="text-gray-600">Cursos Disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {estadisticas.estudiantesActivos.toLocaleString()}+
                </div>
                <div className="text-gray-600">Estudiantes Activos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {estadisticas.instructores}+
                </div>
                <div className="text-gray-600">Instructores Expertos</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}; 
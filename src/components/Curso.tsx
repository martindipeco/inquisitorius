import { ImageWithFallback } from './ImageWithFallback';
import { useToast } from '../contexts/ToastContext';

interface CursoProps {
  id: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  imagen: string;
  logoCurso: string;
  nivel: 'Inicial' | 'Intermedio' | 'Avanzado';
  onClick?: () => void;
}

// Función para obtener el color del nivel
const getNivelColor = (nivel: string) => {
  switch (nivel) {
    case 'Inicial':
      return 'bg-green-100 text-green-800';
    case 'Intermedio':
      return 'bg-yellow-100 text-yellow-800';
    case 'Avanzado':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const Curso = ({ 
  nombre, 
  descripcion, 
  profesor, 
  duracion, 
  imagen, 
  logoCurso,
  nivel,
  onClick 
}: CursoProps) => {
  const { showInfo } = useToast();

  const handleAgregarCurso = (e: React.MouseEvent) => {
    e.stopPropagation();
    showInfo(
      'Agregar curso',
      `La funcionalidad para agregar el curso "${nombre}" está en desarrollo. Pronto podrás inscribirte en este curso.`
    );
  };

  return (
    <div 
      className="card-optimized hover-lift cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header con logo del curso y nombre */}
        <div className="flex items-center space-x-4 mb-4">
          <ImageWithFallback
            src={logoCurso}
            alt={`Logo de ${nombre}`}
            size="md"
            shape="rounded"
            skeletonClassName="border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {nombre}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getNivelColor(nivel)}`}>
                {nivel}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {duracion} horas
            </p>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {descripcion}
        </p>

        {/* Footer con profesor y botón agregar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <ImageWithFallback
              src={imagen}
              alt={`Profesor ${profesor}`}
              size="sm"
              shape="rounded-full"
              skeletonClassName="border border-gray-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Prof. {profesor}</p>
            </div>
          </div>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={handleAgregarCurso}
          >
            Agregar curso
          </button>
        </div>
      </div>
    </div>
  );
}; 
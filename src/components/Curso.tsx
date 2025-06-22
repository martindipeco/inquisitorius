import { ImageWithFallback } from './ImageWithFallback';

interface CursoProps {
  id: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  imagen: string;
  logoCurso: string;
  onClick?: () => void;
}

export const Curso = ({ 
  nombre, 
  descripcion, 
  profesor, 
  duracion, 
  imagen, 
  logoCurso,
  onClick 
}: CursoProps) => {
  const handleAgregarCurso = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Agregando curso:', nombre);
    // Aquí iría la lógica para agregar el curso
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
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {nombre}
            </h3>
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
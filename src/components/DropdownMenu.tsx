import { ImageWithFallback } from './ImageWithFallback';

interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  imagen: string;
  logoCurso: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  cursos?: Curso[];
  onCursoSelect?: (curso: Curso) => void;
  onClose: () => void;
  onConfiguracionesClick?: () => void;
  onAboutClick?: () => void;
  onHelpClick?: () => void;
  onLogout?: () => void;
}

export const DropdownMenu = ({ 
  isOpen, 
  cursos = [], 
  onCursoSelect, 
  onClose, 
  onConfiguracionesClick, 
  onAboutClick, 
  onHelpClick,
  onLogout
}: DropdownMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50">
      {/* Configuraciones */}
      <button 
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer w-full text-left"
        onClick={() => {
          onConfiguracionesClick?.();
          onClose();
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Configuraciones</span>
      </button>

      {/* Temas */}
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer w-full text-left">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
        <span>Temas</span>
      </button>

      <div className="h-px bg-gray-200 my-1" />

      {/* Cursos */}
      {cursos.length > 0 && (
        <>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Cursos Disponibles
          </div>
          {cursos.map((curso) => (
            <button
              key={curso.id}
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer w-full text-left"
              onClick={() => {
                onCursoSelect?.(curso);
                onClose();
              }}
            >
              <ImageWithFallback
                src={curso.logoCurso}
                alt={curso.nombre}
                size="sm"
                shape="rounded-full"
                skeletonClassName="border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{curso.nombre}</div>
                <div className="text-xs text-gray-500 truncate">
                  {curso.profesor}
                </div>
              </div>
            </button>
          ))}
          <div className="h-px bg-gray-200 my-1" />
        </>
      )}

      {/* Acerca de */}
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer w-full text-left"
        onClick={() => {
          onAboutClick?.();
          onClose();
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Acerca de</span>
      </button>

      {/* Ayuda */}
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer w-full text-left"
        onClick={() => {
          onHelpClick?.();
          onClose();
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Ayuda</span>
      </button>

      <div className="h-px bg-gray-200 my-1" />

      {/* Cerrar Sesión */}
      <button 
        className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 rounded hover:bg-red-50 cursor-pointer w-full text-left"
        onClick={() => {
          onLogout?.();
          onClose();
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
}; 
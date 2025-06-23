import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu } from './DropdownMenu';
import { PUBLIC_ROUTES } from '../routes/routes';

interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  imagen: string;
  logoCurso: string;
}

interface NavbarProps {
  cursos?: Curso[];
  onCursoSelect?: (curso: Curso) => void;
  onConfiguracionesClick?: () => void;
}

export const Navbar = ({ cursos = [], onCursoSelect, onConfiguracionesClick }: NavbarProps) => {
  const logo = '/logo.svg';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate(PUBLIC_ROUTES.HOME);
  };

  const handleConfiguracionesClick = () => {
    onConfiguracionesClick?.();
    navigate('/configuraciones');
  };

  const handleAboutClick = () => {
    navigate('/acerca');
  };

  const handleHelpClick = () => {
    navigate('/ayuda');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Icono */}
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Ir al inicio"
          >
            <img 
              src={logo} 
              alt="Mentora Logo" 
              className="h-8 w-auto" 
              width="1752" 
              height="573" 
            />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-gray-700 font-medium">Menú</span>
          </button>

          <DropdownMenu
            isOpen={isMenuOpen}
            cursos={cursos}
            onCursoSelect={onCursoSelect}
            onClose={() => setIsMenuOpen(false)}
            onConfiguracionesClick={handleConfiguracionesClick}
            onAboutClick={handleAboutClick}
            onHelpClick={handleHelpClick}
          />
        </div>
      </div>
    </nav>
  );
}; 
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { DropdownMenu } from './DropdownMenu';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../routes/routes';
import { messageService } from '../services/messageService';

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
  currentUserId?: number;
}

export const Navbar = ({ 
  cursos = [], 
  onCursoSelect, 
  onConfiguracionesClick,
  currentUserId = 1 
}: NavbarProps) => {
  const logo = '/logo.svg';
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const count = await messageService.contarMensajesNoLeidos(currentUserId);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error loading unread count:', error);
      }
    };

    loadUnreadCount();
    // Actualizar cada 30 segundos
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [currentUserId]);

  const handleLogoClick = () => {
    navigate(PUBLIC_ROUTES.HOME);
  };

  const handleConfiguracionesClick = () => {
    onConfiguracionesClick?.();
    navigate('/configuraciones');
  };

  const handleChatClick = () => {
    navigate(PROTECTED_ROUTES.CHAT);
  };

  const handleAboutClick = () => {
    navigate('/acerca');
  };

  const handleHelpClick = () => {
    navigate('/ayuda');
  };

  const isChatActive = location.pathname === PROTECTED_ROUTES.CHAT;

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

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Chat/Mensajes */}
          <button
            onClick={handleChatClick}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative ${
              isChatActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="Mensajes"
          >
            <Icon icon="mdi:chat-outline" className="text-lg" />
            <span className="font-medium">Mensajes</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-2 py-1 text-xs bg-red-500 text-white rounded-full min-w-[20px] text-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* Desktop Menu Button */}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-gray-700 font-medium">Menú</span>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full min-w-[20px] text-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
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
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { DropdownMenu } from './DropdownMenu';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../routes/routes';
import { messageService } from '../services/messageService';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToast } from '../contexts/ToastContext';
import type { Curso } from '../services/cursosService';

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
  currentUserId 
}: NavbarProps) => {
  const logo = '/logo.svg';
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, isAuthenticated, logout } = useAuthContext();
  const { showInfo } = useToast();

  // Usar el ID del usuario autenticado o el proporcionado como prop
  const userId = currentUserId || user?.id || 1;

  useEffect(() => {
    const loadUnreadCount = async () => {
      if (!isAuthenticated) return;
      
      try {
        const count = await messageService.contarMensajesNoLeidos(userId);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error loading unread count:', error);
      }
    };

    loadUnreadCount();
    // Actualizar cada 30 segundos
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [userId, isAuthenticated]);

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate(PROTECTED_ROUTES.HOME);
    } else {
      navigate(PUBLIC_ROUTES.WELCOME);
    }
  };

  const handleConfiguracionesClick = () => {
    onConfiguracionesClick?.();
    navigate(PROTECTED_ROUTES.CONFIGURACIONES);
  };

  const handleChatClick = () => {
    navigate(PROTECTED_ROUTES.CHAT);
  };

  const handleAboutClick = () => {
    navigate(PUBLIC_ROUTES.ABOUT);
  };

  const handleHelpClick = () => {
    navigate(PUBLIC_ROUTES.HELP);
  };

  const handleLogout = () => {
    showInfo(
      'Sesión cerrada',
      'Has cerrado sesión exitosamente. Gracias por usar nuestra plataforma.'
    );
    
    // Pequeño delay para que se vea el toast antes de redirigir
    setTimeout(() => {
      logout();
      navigate(PUBLIC_ROUTES.WELCOME);
    }, 1000);
  };

  const isChatActive = location.pathname === PROTECTED_ROUTES.CHAT;

  // Si no está autenticado, no mostrar el navbar
  if (!isAuthenticated) {
    return null;
  }

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
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Chat/Mensajes - Visible en todas las pantallas */}
          <button
            onClick={handleChatClick}
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative ${
              isChatActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="Mensajes"
          >
            <Icon icon="mdi:chat-outline" className="text-lg" />
            <span className="font-medium text-sm sm:text-base hidden sm:inline">Mensajes</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-red-500 text-white rounded-full min-w-[16px] sm:min-w-[20px] text-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* User Info - Solo visible en desktop */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 text-gray-700">
            <Icon icon="mdi:account-circle" className="text-lg" />
            <span className="font-medium text-sm">
              {user?.rol}
            </span>
          </div>

          {/* Desktop Menu Button - Solo visible en desktop */}
          <div className="hidden md:block relative">
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
              onLogout={handleLogout}
            />
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
            </button>

            <DropdownMenu
              isOpen={isMenuOpen}
              cursos={cursos}
              onCursoSelect={onCursoSelect}
              onClose={() => setIsMenuOpen(false)}
              onConfiguracionesClick={handleConfiguracionesClick}
              onAboutClick={handleAboutClick}
              onHelpClick={handleHelpClick}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../routes/routes';
import { useAuthContext } from '../hooks/useAuthContext';
import { DropdownMenu } from './DropdownMenu';

export const WelcomeNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Icono */}
        <div className="flex items-center">
          <button
            onClick={() => navigate(PUBLIC_ROUTES.WELCOME)}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Ir al inicio"
          >
            <img 
              src="/logo.svg" 
              alt="Mentora Logo" 
              className="h-6 sm:h-8 w-auto" 
              width="1752" 
              height="573" 
            />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-600 text-xs sm:text-sm hidden sm:inline">
                ¡Hola, {user?.usuario}!
              </span>
              <button
                onClick={() => navigate(PROTECTED_ROUTES.HOME)}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-[10px] hover:bg-blue-700 transition-all duration-200 font-semibold text-xs sm:text-sm"
              >
                Ir al Home
              </button>
              
              {/* Desktop Menu Button */}
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
                  cursos={[]}
                  onClose={() => setIsMenuOpen(false)}
                  onConfiguracionesClick={() => navigate(PROTECTED_ROUTES.CONFIGURACIONES)}
                  onAboutClick={() => navigate(PUBLIC_ROUTES.ABOUT)}
                  onHelpClick={() => navigate(PUBLIC_ROUTES.HELP)}
                  onLogout={() => {
                    logout();
                    navigate(PUBLIC_ROUTES.WELCOME);
                  }}
                />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden relative">
                <button 
                  className="flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm">Menú</span>
                </button>

                <DropdownMenu
                  isOpen={isMenuOpen}
                  cursos={[]}
                  onClose={() => setIsMenuOpen(false)}
                  onConfiguracionesClick={() => navigate(PROTECTED_ROUTES.CONFIGURACIONES)}
                  onAboutClick={() => navigate(PUBLIC_ROUTES.ABOUT)}
                  onHelpClick={() => navigate(PUBLIC_ROUTES.HELP)}
                  onLogout={() => {
                    logout();
                    navigate(PUBLIC_ROUTES.WELCOME);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate(PUBLIC_ROUTES.REGISTER)}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-[10px] hover:bg-blue-700 transition-all duration-200 font-semibold text-xs sm:text-sm"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}; 
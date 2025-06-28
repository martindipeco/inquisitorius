import { PUBLIC_ROUTES } from '../routes/routes';
import { Icon } from '@iconify/react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-indigo-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 bg-purple-200 rounded-full opacity-25 animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-10 w-14 h-14 sm:w-24 sm:h-24 bg-blue-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Animated SVG shapes */}
        <svg className="absolute top-4 sm:top-10 left-1/4 w-10 h-10 sm:w-16 sm:h-16 text-blue-300 opacity-30 animate-spin" style={{ animationDuration: '20s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        
        <svg className="absolute bottom-4 sm:bottom-10 right-1/4 w-12 h-12 sm:w-20 sm:h-20 text-indigo-300 opacity-25 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>

      <div className="text-center relative z-10 w-full max-w-2xl">
        {/* Main 404 illustration */}
        <div className="mb-6 sm:mb-8">
          <div className="relative inline-block">
            {/* Animated 404 text */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4 relative">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                404
              </span>
            </h1>
          </div>
        </div>

        {/* Error message */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            ¡Oops! Página no encontrada
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
            La página que buscas no existe o ha sido movida. 
            No te preocupes, te ayudamos a encontrar el camino correcto.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
          <a 
            href={PUBLIC_ROUTES.WELCOME} 
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:home" className="w-4 h-4 sm:w-5 sm:h-5" />
            Volver al inicio
          </a>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:arrow-left" className="w-4 h-4 sm:w-5 sm:h-5" />
            Volver atrás
          </button>
        </div>

        {/* Additional help section */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Icon icon="mdi:lightbulb-on" className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">¿Necesitas ayuda?</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            Si crees que esto es un error, puedes contactar a nuestro equipo de soporte.
          </p>
          <a 
            href="mailto:soporte@inquisitorius.com" 
            className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm hover:underline transition-colors"
          >
            Contactar soporte →
          </a>
        </div>
      </div>
    </div>
  );
};
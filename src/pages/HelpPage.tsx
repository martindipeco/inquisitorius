import { Navbar } from '../components/Navbar';
import { Icon } from '@iconify/react';

const HelpPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div className="flex-1 flex items-center justify-center py-6 sm:py-10 animate-fade-in px-4">
      <div className="max-w-2xl w-full p-4 sm:p-8 rounded-lg shadow-2xl border border-gray-100 bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <Icon icon="mdi:help-circle" className="text-blue-400 text-4xl sm:text-5xl mb-2" />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">Ayuda & Soporte</h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2 text-center max-w-lg">
            ¿Tienes dudas o necesitas ayuda? Encuentra respuestas rápidas o contáctanos.
          </p>
        </div>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Preguntas Frecuentes</h2>
          <div className="grid gap-3 sm:gap-4">
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm hover:scale-105 transition-transform">
              <strong className="text-blue-700 text-sm sm:text-base">¿Cómo me inscribo en un curso?</strong>
              <div className="text-gray-600 text-xs sm:text-sm mt-1">Ve a la sección de cursos y haz clic en "Inscribirse" en el curso que te interese.</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm hover:scale-105 transition-transform">
              <strong className="text-blue-700 text-sm sm:text-base">¿Cómo edito mi perfil?</strong>
              <div className="text-gray-600 text-xs sm:text-sm mt-1">Accede a Configuraciones &gt; Editar Perfil para actualizar tu información personal.</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm hover:scale-105 transition-transform">
              <strong className="text-blue-700 text-sm sm:text-base">¿A quién contacto si tengo problemas?</strong>
              <div className="text-gray-600 text-xs sm:text-sm mt-1">Puedes escribirnos a nuestro correo de soporte.</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="mdi:email" className="text-blue-400 text-lg sm:text-xl" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Soporte</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700">¿No encontraste lo que buscabas? Escríbenos a <a href="mailto:soporte@inquisitorius.com" className="text-blue-600 hover:underline font-medium">soporte@inquisitorius.com</a></p>
        </div>
        <div className="text-center text-gray-400 text-xs mt-6 sm:mt-8 select-none">
          &copy; {new Date().getFullYear()} Inquisitorius
        </div>
      </div>
    </div>
  </div>
);

export default HelpPage; 
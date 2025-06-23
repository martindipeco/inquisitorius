import { Navbar } from '../components/Navbar';
import { Icon } from '@iconify/react';

const logo = '/logo.svg';
const AboutPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div className="flex-1 flex items-center justify-center py-10 animate-fade-in">
      <div className="max-w-2xl w-full p-8 rounded-lg shadow-2xl border border-gray-100 bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo Inquisitorius" className="w-24 h-24 mb-3 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">Inquisitorius</h1>
          <span className="text-base text-blue-600 font-semibold">v1.0.0</span>
        </div>
        <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
          Plataforma educativa para potenciar tu aprendizaje y gestión de cursos en línea.<br/>
          <span className="text-blue-600 font-semibold">Explora, aprende y crece con nosotros.</span>
        </p>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="mdi:account-group" className="text-blue-400 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">Equipo de desarrollo</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm hover:scale-105 transition-transform">
              <div className="font-semibold text-blue-700">Nombre 1</div>
              <div className="text-xs text-gray-700">Frontend</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm hover:scale-105 transition-transform">
              <div className="font-semibold text-blue-700">Nombre 2</div>
              <div className="text-xs text-gray-700">Backend</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm hover:scale-105 transition-transform">
              <div className="font-semibold text-blue-700">Nombre 3</div>
              <div className="text-xs text-gray-700">UI/UX</div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="mdi:github" className="text-gray-700 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">Enlaces útiles</h2>
          </div>
          <a href="https://github.com/tu-repo" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium shadow hover:bg-blue-200 transition-colors">
            Repositorio en GitHub
          </a>
        </div>
        <div className="text-center text-gray-400 text-xs mt-8 select-none">
          &copy; {new Date().getFullYear()} Inquisitorius. Todos los derechos reservados.
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage; 
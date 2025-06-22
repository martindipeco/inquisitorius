import { Icon } from '@iconify/react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información del proyecto */}
          <div>
            <h2 className="text-xl font-bold mb-4">Mentora</h2>
            <p className="text-gray-300 mb-4">
              Proyecto desarrollado durante la hackathon de Alura. 
              Una plataforma educativa innovadora para el aprendizaje online.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/alumnithon" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:github" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Equipo de desarrollo */}
          <div>
            <h2 className="text-xl font-bold mb-4">Equipo de Desarrollo</h2>
            <div className="space-y-4 text-gray-300">
              {/* Frontend */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon icon="mdi:account-tie" className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Desarrollador Frontend:</span>
                </div>
                <div className="ml-7 space-y-1">
                  <p>• Juan Pérez</p>
                  <p>• María García</p>
                </div>
              </div>
              
              {/* Backend */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon icon="mdi:server" className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Desarrollador Backend:</span>
                </div>
                <div className="ml-7 space-y-1">
                  <p>• Carlos López</p>
                  <p>• Ana Rodríguez</p>
                </div>
              </div>
              
              {/* UI/UX */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon icon="mdi:palette" className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">Diseñador UI/UX:</span>
                </div>
                <div className="ml-7 space-y-1">
                  <p>• Sofia Martínez</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Mentora. Desarrollado con 
              <Icon icon="mdi:heart" className="w-4 h-4 text-red-500 inline mx-1" />
              para la hackathon de Alura.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Icon icon="mdi:school" className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Alura Hackathon 2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 
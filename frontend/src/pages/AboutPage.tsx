import { Navbar } from '../components/Navbar';
import { WelcomeNavbar } from '../components/WelcomeNavbar';
import { useAuthContext } from '../hooks/useAuthContext';
import { Icon } from '@iconify/react';

const logo = '/logo.svg';

const teamMembers = [
  { name: 'Sandra Vela', role: 'Backend Developer' },
  { name: 'Martin Di Peco', role: 'Backend Developer' },
  { name: 'Ángeles Escudero', role: 'Backend Developer' },
  { name: 'Camilo', role: 'Backend Developer' },
  { name: 'Brayan', role: 'Frontend Developer' }
];

const TeamMemberCard = ({ name, role }: { name: string; role: string }) => (
  <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm hover:scale-105 transition-transform">
    <div className="font-semibold text-blue-700">{name}</div>
    <div className="text-xs text-gray-700">{role}</div>
  </div>
);

const AboutPage = () => {
  const { isAuthenticated } = useAuthContext();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated ? <Navbar /> : <WelcomeNavbar />}
      <div className="flex-1 flex items-center justify-center py-6 sm:py-10 animate-fade-in px-4">
        <div className="max-w-2xl w-full p-4 sm:p-8 rounded-lg shadow-2xl border border-gray-100 bg-gradient-to-br from-white via-blue-50 to-blue-100">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img src={logo} alt="Logo Inquisitorius" className="w-16 h-16 sm:w-24 sm:h-24 mb-3 drop-shadow-lg" />
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">Inquisitorius</h1>
            <span className="text-sm sm:text-base text-blue-600 font-semibold">v1.0.0</span>
          </div>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center leading-relaxed">
            Plataforma educativa para potenciar tu aprendizaje y gestión de cursos en línea.<br/>
            <span className="text-blue-600 font-semibold">Explora, aprende y crece con nosotros.</span>
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-2">
              <Icon icon="mdi:account-group" className="text-blue-400 text-lg sm:text-xl" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Equipo de desarrollo</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} role={member.role} />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-2">
              <Icon icon="mdi:github" className="text-gray-700 text-lg sm:text-xl" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Enlaces útiles</h2>
            </div>
            <a href="https://github.com/martindipeco/inquisitorius" target="_blank" rel="noopener noreferrer" className="inline-block px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium shadow hover:bg-blue-200 transition-colors text-sm sm:text-base">
              Repositorio en GitHub
            </a>
          </div>
          <div className="text-center text-gray-400 text-xs mt-6 sm:mt-8 select-none">
            &copy; {new Date().getFullYear()} Inquisitorius. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 
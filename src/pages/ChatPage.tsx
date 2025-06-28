import { Chat } from '../components/chat/Chat';
import { Navbar } from '../components/Navbar';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../routes/routes';

export const ChatPage = () => {
  const { user, isAuthenticated, isLoading } = useAuthContext();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirigir si no está autenticado
  if (!isAuthenticated || !user) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar currentUserId={user.id} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 w-full h-full">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mensajes</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Chatea con otros usuarios de la plataforma
            </p>
          </div>
          
          <div className="flex-1 min-h-0 h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)]">
            <Chat currentUserId={user.id} />
          </div>
        </div>
      </main>
    </div>
  );
}; 
import { Chat } from '../components/chat/Chat';
import { Navbar } from '../components/Navbar';

export const ChatPage = () => {
  // Por ahora usamos un ID fijo, en el futuro esto vendría del contexto de autenticación
  const currentUserId = 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar currentUserId={currentUserId} />
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mensajes</h1>
            <p className="text-gray-600">
              Chatea con otros usuarios de la plataforma
            </p>
          </div>
          
          <div className="h-[calc(100vh-200px)]">
            <Chat currentUserId={currentUserId} />
          </div>
        </div>
      </main>
    </div>
  );
}; 
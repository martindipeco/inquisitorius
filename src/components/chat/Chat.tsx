import { useState, useEffect } from 'react';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import type { Conversation } from '../../types/messageSchema';
import { messageService } from '../../services/messageService';
import { useToast } from '../../contexts/ToastContext';

interface ChatProps {
  currentUserId: number;
}

interface User {
  id: number;
  nombre: string;
  avatarUrl: string | null;
}

export const Chat = ({ currentUserId }: ChatProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConversationList, setShowConversationList] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const { showInfo } = useToast();

  useEffect(() => {
    loadConversations();
    loadUsers();
  }, [currentUserId]);

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const usersData = await messageService.obtenerUsuarios();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  const loadConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      const userConversations = await messageService.obtenerConversacionesUsuario(currentUserId);
      setConversations(userConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setError('No se pudieron cargar las conversaciones. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowConversationList(false);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowConversationList(true);
  };

  const handleRetry = () => {
    loadConversations();
  };

  // Función optimizada para actualizar solo la conversación específica
  const handleMessageSent = async (newMessage: any) => {
    // Actualizar la conversación seleccionada localmente sin recargar todo
    setConversations(prev => prev.map(conv => {
      const isSelectedConversation = 
        (conv.usuario1Id === selectedConversation?.usuario1Id && conv.usuario2Id === selectedConversation?.usuario2Id) ||
        (conv.usuario1Id === selectedConversation?.usuario2Id && conv.usuario2Id === selectedConversation?.usuario1Id);
      
      if (isSelectedConversation) {
        return {
          ...conv,
          ultimoMensaje: newMessage,
          mensajes: [...(conv.mensajes || []), newMessage]
        };
      }
      return conv;
    }));

    // Mover la conversación actualizada al principio de la lista
    setConversations(prev => {
      const updatedConversations = [...prev];
      const selectedIndex = updatedConversations.findIndex(conv => 
        (conv.usuario1Id === selectedConversation?.usuario1Id && conv.usuario2Id === selectedConversation?.usuario2Id) ||
        (conv.usuario1Id === selectedConversation?.usuario2Id && conv.usuario2Id === selectedConversation?.usuario1Id)
      );
      
      if (selectedIndex > 0) {
        const [selectedConv] = updatedConversations.splice(selectedIndex, 1);
        updatedConversations.unshift(selectedConv);
      }
      
      return updatedConversations;
    });
  };

  const handleNewConversationInfo = () => {
    showInfo(
      'Nueva conversación',
      'Esta funcionalidad está en desarrollo. Pronto podrás crear nuevas conversaciones.'
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <div className="text-6xl mb-4">
          <span role="img" aria-label="error">⚠️</span>
        </div>
        <h3 className="text-xl font-medium mb-2">Error al cargar conversaciones</h3>
        <p className="text-sm mb-4 text-center">{error}</p>
        <button 
          onClick={handleRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Conversation List - Hidden on mobile when chat is open */}
        <div className={`${showConversationList ? 'block' : 'hidden'} md:block h-full`}>
          <ConversationList
            conversations={conversations}
            currentUserId={currentUserId}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            users={users}
            usersLoading={usersLoading}
          />
        </div>

        {/* Chat Window */}
        <div className={`${!showConversationList ? 'block' : 'hidden'} md:block flex-1 h-full`}>
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              currentUserId={currentUserId}
              onBack={handleBackToList}
              onMessageSent={handleMessageSent}
            />
          ) : (
            <div 
              className="flex flex-col items-center justify-center h-full text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
              onClick={handleNewConversationInfo}
            >
              <div className="text-6xl mb-4">
                <span role="img" aria-label="chat">💬</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Selecciona una conversación</h3>
              <p className="text-sm">Elige una conversación para comenzar a chatear</p>
              <p className="text-xs mt-2 text-blue-500">Haz clic aquí para más información</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
import { Icon } from '@iconify/react';
import type { Conversation } from '../../types/messageSchema';
import { messageService } from '../../services/messageService';
import { useState, useEffect } from 'react';

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: number;
  selectedConversationId?: number;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation?: () => void;
}

interface User {
  id: number;
  nombre: string;
  avatarUrl: string;
}

export const ConversationList = ({
  conversations,
  currentUserId,
  selectedConversationId,
  onSelectConversation,
  onNewConversation
}: ConversationListProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await messageService.obtenerUsuarios();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  const getOtherUserId = (conversation: Conversation) => {
    return conversation.usuario1Id === currentUserId 
      ? conversation.usuario2Id 
      : conversation.usuario1Id;
  };

  const getOtherUser = (conversation: Conversation) => {
    const otherUserId = getOtherUserId(conversation);
    return users.find(u => u.id === otherUserId);
  };

  const getUnreadCount = (conversation: Conversation) => {
    return conversation.mensajes.filter(m => 
      m.receptorId === currentUserId && !m.leido
    ).length;
  };

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Mensajes</h2>
          {onNewConversation && (
            <button
              onClick={onNewConversation}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Nueva conversación"
            >
              <Icon icon="mdi:plus" className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Icon icon="mdi:chat-outline" className="text-4xl mx-auto mb-2" />
            <p>No hay conversaciones</p>
          </div>
        ) : (
          conversations.map((conversation) => {
            const otherUser = getOtherUserId(conversation);
            const userData = getOtherUser(conversation);
            const unreadCount = getUnreadCount(conversation);
            const isSelected = selectedConversationId === conversation.id;
            
            return (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {userData?.avatarUrl ? (
                      <img 
                        src={userData.avatarUrl} 
                        alt={userData.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm ${userData?.avatarUrl ? 'hidden' : ''}`}>
                      {otherUser}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 truncate">
                        {userData?.nombre || `Usuario ${otherUser}`}
                      </h3>
                      {conversation.ultimoMensaje && (
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatTime(conversation.ultimoMensaje.fechaEnvio)}
                        </span>
                      )}
                    </div>
                    
                    {conversation.ultimoMensaje && (
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate flex-1">
                          {conversation.ultimoMensaje.contenido}
                        </p>
                        {unreadCount > 0 && (
                          <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full min-w-[20px] text-center flex-shrink-0">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}; 
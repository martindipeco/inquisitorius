import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import type { Message, Conversation } from '../../types/messageSchema';
import { messageService } from '../../services/messageService';

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: number;
  onBack?: () => void;
}

interface User {
  id: number;
  nombre: string;
  avatarUrl: string;
}

export const ChatWindow = ({ conversation, currentUserId, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUserId = conversation.usuario1Id === currentUserId 
    ? conversation.usuario2Id 
    : conversation.usuario1Id;

  useEffect(() => {
    loadMessages();
    loadUsers();
  }, [conversation.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const conversationMessages = await messageService.obtenerConversacion(
        conversation.usuario1Id,
        conversation.usuario2Id
      );
      setMessages(conversationMessages);
      
      // Marcar mensajes como leídos
      conversationMessages
        .filter(m => m.receptorId === currentUserId && !m.leido)
        .forEach(m => messageService.marcarComoLeido(m.id));
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const usersData = await messageService.obtenerUsuarios();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const getOtherUser = () => {
    return users.find(u => u.id === otherUserId);
  };

  const handleSendMessage = async (content: string) => {
    try {
      const newMessage = await messageService.crearMensaje({
        contenido: content,
        remitenteId: currentUserId,
        receptorId: otherUserId,
      });
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await messageService.eliminarMensaje(messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const otherUser = getOtherUser();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <Icon icon="mdi:arrow-left" className="text-lg" />
            </button>
          )}
          
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            {otherUser?.avatarUrl ? (
              <img 
                src={otherUser.avatarUrl} 
                alt={otherUser.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm ${otherUser?.avatarUrl ? 'hidden' : ''}`}>
              {otherUserId}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">
              {otherUser?.nombre || `Usuario ${otherUserId}`}
            </h3>
            <p className="text-sm text-gray-500">
              {messages.length > 0 ? 'En línea' : 'Sin mensajes'}
            </p>
          </div>
          
          <button
            onClick={scrollToBottom}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title="Ir al final"
          >
            <Icon icon="mdi:arrow-down" className="text-lg" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Icon icon="mdi:chat-outline" className="text-6xl mb-4" />
            <p className="text-lg font-medium">No hay mensajes</p>
            <p className="text-sm">Comienza la conversación enviando un mensaje</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.remitenteId === currentUserId}
                onDelete={handleDeleteMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={loading}
        placeholder="Escribe un mensaje..."
      />
    </div>
  );
}; 
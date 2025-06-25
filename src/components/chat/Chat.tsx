import { useState, useEffect } from 'react';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import type { Conversation } from '../../types/messageSchema';
import { messageService } from '../../services/messageService';

interface ChatProps {
  currentUserId: number;
}

export const Chat = ({ currentUserId }: ChatProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConversationList, setShowConversationList] = useState(true);

  useEffect(() => {
    loadConversations();
  }, [currentUserId]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const userConversations = await messageService.obtenerConversacionesUsuario(currentUserId);
      setConversations(userConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
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

  const handleNewConversation = () => {
    // Por ahora, creamos una conversación con un usuario ficticio
    const newConversation: Conversation = {
      id: Date.now(),
      usuario1Id: currentUserId,
      usuario2Id: Math.floor(Math.random() * 100) + 10, // Usuario aleatorio
      mensajes: [],
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    setShowConversationList(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Chat Window */}
        <div className={`${!showConversationList ? 'block' : 'hidden'} md:block flex-1 h-full`}>
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              currentUserId={currentUserId}
              onBack={handleBackToList}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4">
                <span role="img" aria-label="chat">💬</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Selecciona una conversación</h3>
              <p className="text-sm">Elige una conversación para comenzar a chatear</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
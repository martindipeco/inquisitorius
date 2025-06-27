import { Icon } from '@iconify/react';
import type { Message } from '../../types/messageSchema';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  onDelete?: (messageId: number) => void;
}

export const MessageBubble = ({ message, isOwnMessage, onDelete }: MessageBubbleProps) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isOwnMessage 
          ? 'bg-blue-500 text-white rounded-br-md' 
          : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
      } shadow-sm ${message.isOptimistic ? 'opacity-70' : ''}`}>
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-sm break-words leading-relaxed">{message.contenido}</p>
            <div className={`flex items-center gap-1 mt-2 ${
              isOwnMessage ? 'text-blue-100' : 'text-gray-500'
            }`}>
              <span className="text-xs">{formatTime(message.fechaEnvio)}</span>
              {isOwnMessage && (
                <>
                  {message.isOptimistic ? (
                    <div className="animate-spin rounded-full h-3 w-3 border border-blue-200 border-t-transparent"></div>
                  ) : (
                    <Icon 
                      icon={message.leido ? 'mdi:check-all' : 'mdi:check'} 
                      className={`text-xs ${message.leido ? 'text-blue-300' : 'text-blue-200'}`}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {isOwnMessage && onDelete && !message.isOptimistic && (
            <button
              onClick={() => onDelete(message.id)}
              className="text-blue-200 hover:text-white transition-colors flex-shrink-0"
              title="Eliminar mensaje"
            >
              <Icon icon="mdi:delete-outline" className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Icon } from '@iconify/react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  sending?: boolean;
}

export const MessageInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Escribe un mensaje...",
  sending = false
}: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled && !sending) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={sending ? "Enviando mensaje..." : placeholder}
            disabled={disabled || sending}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled || sending}
          className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 flex-shrink-0"
          style={{ height: '44px' }}
        >
          {sending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span className="hidden sm:inline">Enviando...</span>
            </>
          ) : (
            <>
              <Icon icon="mdi:send" className="text-sm" />
              <span className="hidden sm:inline">Enviar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}; 
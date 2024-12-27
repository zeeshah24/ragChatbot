import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-slate-50' : ''} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-600' : 'bg-slate-600'
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500 mb-1">
          {isBot ? 'AI Assistant' : 'You'}
        </p>
        <p className="text-slate-700">{message.content}</p>
      </div>
    </div>
  );
}
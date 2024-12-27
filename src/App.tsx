import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { Message } from './types/chat';
import { Brain } from 'lucide-react';
import { sendMessage } from './services/api';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await sendMessage(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Handle error appropriately
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center gap-3">
            <Brain className="w-8 h-8 text-white" />
            <h1 className="text-xl font-semibold text-white">RAG-Powered AI Assistant</h1>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500">
                Start a conversation to see RAG-enhanced responses
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
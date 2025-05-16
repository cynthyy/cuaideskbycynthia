
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, BookOpen, Clock, Lightbulb } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your Covenant University AI Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI response (in real app, you'd call an API here)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content: "I'm working on providing the best answer for you. This is a simulated response for the demo.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-covenant-primary/5 to-covenant-accent/5 rounded-lg shadow-lg">
      <div className="p-4 bg-covenant-primary text-white rounded-t-lg">
        <h2 className="text-xl font-playfair font-semibold">AI Assistant</h2>
        <p className="text-sm opacity-80">Ask me anything about your studies or schedule</p>
      </div>
      
      {/* Quick command buttons */}
      <div className="flex gap-2 p-3 bg-covenant-primary/10 overflow-x-auto scrollbar-none">
        <Button size="sm" variant="outline" className="flex gap-1 whitespace-nowrap">
          <BookOpen size={16} /> Summarize Notes
        </Button>
        <Button size="sm" variant="outline" className="flex gap-1 whitespace-nowrap">
          <Clock size={16} /> Set Reminder
        </Button>
        <Button size="sm" variant="outline" className="flex gap-1 whitespace-nowrap">
          <Lightbulb size={16} /> Study Tips
        </Button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-covenant-primary text-white rounded-tr-none' 
                  : 'bg-white border border-covenant-accent/20 rounded-tl-none'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 block mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t">
        <form 
          className="flex gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-covenant-primary hover:bg-covenant-primary/90">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;

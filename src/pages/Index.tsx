
import { useState, useEffect } from 'react';
import Header from "@/components/Layout/Header";
import ChatPanel from "@/components/ChatPanel";
import NotesPanel from "@/components/NotesPanel";
import TodoPanel from "@/components/TodoPanel";
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, ListTodo } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('chat');

  // Animation control
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-covenant-background flex flex-col w-full">
        <Header />
        
        <div className={`flex-1 pt-16 pb-2 px-2 md:px-4 lg:px-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Desktop Layout */}
          <div className="hidden md:grid h-[calc(100vh-5rem)] grid-cols-3 gap-4">
            <div className="col-span-1 animate-slide-in">
              <ChatPanel />
            </div>
            <div className="col-span-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <NotesPanel />
            </div>
            <div className="col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <TodoPanel />
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden h-[calc(100vh-7rem)]">
            {activeTab === 'chat' && <ChatPanel />}
            {activeTab === 'notes' && <NotesPanel />}
            {activeTab === 'todo' && <TodoPanel />}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around bg-covenant-primary text-white p-2 shadow-lg z-10">
            <Button 
              variant="ghost" 
              className={`text-white ${activeTab === 'chat' ? 'bg-white/20' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare size={20} className="mb-1" />
              <span className="text-xs">Chat</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white ${activeTab === 'notes' ? 'bg-white/20' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <BookOpen size={20} className="mb-1" />
              <span className="text-xs">Notes</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white ${activeTab === 'todo' ? 'bg-white/20' : ''}`}
              onClick={() => setActiveTab('todo')}
            >
              <ListTodo size={20} className="mb-1" />
              <span className="text-xs">Tasks</span>
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;

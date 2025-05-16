
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Edit, Save, ChevronDown, ChevronUp } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  timestamp: Date;
  isExpanded: boolean;
  isEditing: boolean;
}

const colors = [
  'border-purple-400',
  'border-blue-400',
  'border-green-400',
  'border-yellow-400',
  'border-red-400',
];

const NotesPanel = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Biochemistry Study Plan',
      content: 'Review chapter 5-7 for the upcoming quiz. Focus on metabolic pathways and enzyme kinetics.',
      color: colors[0],
      timestamp: new Date(),
      isExpanded: true,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Physics Formulas',
      content: 'Remember: F=ma, E=mc², PV=nRT',
      color: colors[1],
      timestamp: new Date(),
      isExpanded: false,
      isEditing: false,
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: colors[0] });

  const handleAddNote = () => {
    if (newNote.title.trim() === '') return;
    
    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      color: newNote.color,
      timestamp: new Date(),
      isExpanded: true,
      isEditing: false,
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', color: colors[0] });
    setIsCreating(false);
  };

  const toggleExpand = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isExpanded: !note.isExpanded } : note
    ));
  };

  const toggleEdit = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isEditing: !note.isEditing } : note
    ));
  };

  const updateNote = (id: number, title: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, title, content, isEditing: false } : note
    ));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const changeColor = (id: number) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        const currentIndex = colors.indexOf(note.color);
        const nextIndex = (currentIndex + 1) % colors.length;
        return { ...note, color: colors[nextIndex] };
      }
      return note;
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white/50 rounded-lg shadow-lg">
      <div className="p-4 bg-covenant-primary text-white rounded-t-lg flex justify-between items-center">
        <h2 className="text-xl font-playfair font-semibold">Notes</h2>
        <Button 
          variant="outline" 
          size="icon" 
          className="text-white border-white hover:bg-white/20 hover:text-white"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? <X size={18} /> : <Plus size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* New Note Form */}
        {isCreating && (
          <div className="card-note border-l-4 border-covenant-accent mb-5 animate-pop">
            <Input
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              className="mb-2 font-medium"
            />
            <Textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              className="mb-2"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {colors.map((color, index) => (
                  <button 
                    key={index}
                    onClick={() => setNewNote({...newNote, color})}
                    className={`w-5 h-5 rounded-full border ${color} ${newNote.color === color ? 'ring-2 ring-covenant-primary' : ''}`}
                  />
                ))}
              </div>
              <Button 
                size="sm" 
                onClick={handleAddNote}
                className="bg-covenant-primary hover:bg-covenant-primary/90"
              >
                <Save size={16} className="mr-1" /> Save
              </Button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {notes.map((note) => (
          <div 
            key={note.id} 
            className={`card-note ${note.color} animate-fade-in`}
          >
            <div className="flex justify-between items-center">
              {note.isEditing ? (
                <Input
                  value={note.title}
                  onChange={(e) => updateNote(note.id, e.target.value, note.content)}
                  className="font-medium"
                />
              ) : (
                <h3 className="font-medium flex-1">{note.title}</h3>
              )}
              
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => toggleExpand(note.id)}
                >
                  {note.isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => toggleEdit(note.id)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" 
                  onClick={() => deleteNote(note.id)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {note.isExpanded && (
              <>
                {note.isEditing ? (
                  <Textarea
                    value={note.content}
                    onChange={(e) => updateNote(note.id, note.title, e.target.value)}
                    className="my-2"
                    rows={3}
                  />
                ) : (
                  <p className="my-2 whitespace-pre-line">{note.content}</p>
                )}
                
                <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                  <span>
                    {note.timestamp.toLocaleDateString()} {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {note.isEditing && (
                    <div className="flex gap-1">
                      <div className="flex gap-1">
                        {colors.map((color, index) => (
                          <button 
                            key={index}
                            onClick={() => changeColor(note.id)}
                            className={`w-4 h-4 rounded-full border ${color} ${note.color === color ? 'ring-1 ring-covenant-primary' : ''}`}
                          />
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => toggleEdit(note.id)}
                        className="bg-covenant-primary hover:bg-covenant-primary/90 h-6 text-xs"
                      >
                        <Save size={12} className="mr-1" /> Save
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
        
        {notes.length === 0 && !isCreating && (
          <div className="flex flex-col items-center justify-center p-8 text-gray-400">
            <p>No notes yet</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => setIsCreating(true)}
            >
              <Plus size={16} className="mr-1" /> Create your first note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPanel;


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const SummarizeNotesPage = () => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call (replace with your FastAPI endpoint)
    setTimeout(() => {
      setSummary("This is a sample summary. Your FastAPI backend will process the notes and return a comprehensive summary here.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-purple-800 mb-2 font-serif"
          >
            📝 Smart Notes Summarizer
          </motion.h1>
          <p className="text-purple-600">Transform your lengthy notes into concise summaries</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full shadow-xl border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={24} />
                  Your Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="Paste or type your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[400px] border-purple-200 focus:border-purple-500 resize-none"
                />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {notes.length} characters
                  </span>
                  <Button
                    onClick={handleSummarize}
                    disabled={isLoading || !notes.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain size={18} />
                      </motion.div>
                    ) : (
                      <Sparkles size={18} />
                    )}
                    {isLoading ? 'Summarizing...' : 'Summarize Notes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full shadow-xl border-amber-100">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Brain size={24} />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1.2 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                      className="text-purple-600"
                    >
                      <Brain size={48} />
                    </motion.div>
                  </div>
                ) : summary ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose max-w-none"
                  >
                    <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg">
                      <p className="text-gray-800 leading-relaxed">{summary}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px] text-gray-400">
                    <div className="text-center">
                      <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Your summary will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SummarizeNotesPage;


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  category: string;
}

const TodoPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    // Sample tasks
    setTasks([
      {
        id: '1',
        title: 'Complete Data Structures Assignment',
        completed: false,
        priority: 'high',
        dueDate: '2024-06-01',
        category: 'Academic'
      },
      {
        id: '2',
        title: 'Prepare for Chemistry Exam',
        completed: true,
        priority: 'high',
        dueDate: '2024-05-28',
        category: 'Study'
      },
      {
        id: '3',
        title: 'Join Study Group Meeting',
        completed: false,
        priority: 'medium',
        dueDate: '2024-05-30',
        category: 'Social'
      }
    ]);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: 'medium',
      category: 'General'
    };

    setTasks(prev => [task, ...prev]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-purple-800 mb-2 font-serif"
          >
            ✅ Task Manager
          </motion.h1>
          <p className="text-purple-600">Stay organized and productive</p>
        </div>

        {/* Add Task Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-xl border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus size={24} />
                Add New Task
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  placeholder="What do you need to do?"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1 border-purple-200 focus:border-purple-500"
                />
                <Button
                  onClick={addTask}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus size={18} />
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 mb-6 justify-center"
        >
          {(['all', 'pending', 'completed'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              onClick={() => setFilter(filterType)}
              className={filter === filterType ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200 text-purple-600 hover:bg-purple-50"}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </motion.div>

        {/* Tasks List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-purple-100'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className="text-purple-600 border-purple-200">
                            {task.category}
                          </Badge>
                          {task.dueDate && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar size={14} />
                              {task.dueDate}
                            </div>
                          )}
                        </div>
                      </div>
                      {task.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-500"
                        >
                          <CheckCircle2 size={24} />
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Clock size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No tasks found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TodoPage;

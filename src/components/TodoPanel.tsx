
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Star, Check, Trash } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: number; // 1-3, with 3 being highest
}

const categories = ["Today", "Academic", "Health", "Fitness"];

const TodoPanel = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Complete Mathematics Assignment", completed: false, category: "Academic", priority: 3 },
    { id: 2, text: "Read Chapter 5 for Biology", completed: false, category: "Academic", priority: 2 },
    { id: 3, text: "Go to the gym", completed: false, category: "Fitness", priority: 1 },
    { id: 4, text: "Drink 2L of water", completed: true, category: "Health", priority: 2 },
    { id: 5, text: "Team project meeting", completed: false, category: "Today", priority: 3 },
  ]);

  const [newTask, setNewTask] = useState('');
  const [activeCategory, setActiveCategory] = useState('Today');
  const [newTaskCategory, setNewTaskCategory] = useState('Today');
  const [newTaskPriority, setNewTaskPriority] = useState(2); // Medium priority by default

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      category: newTaskCategory,
      priority: newTaskPriority,
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const togglePriority = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        // Cycle through priority levels: 1 -> 2 -> 3 -> 1
        const newPriority = (task.priority % 3) + 1;
        return { ...task, priority: newPriority };
      }
      return task;
    }));
  };

  // Filter tasks by active category
  const filteredTasks = tasks.filter(task => task.category === activeCategory);
  
  // Calculate progress for each category
  const calculateProgress = (category: string) => {
    const categoryTasks = tasks.filter(task => task.category === category);
    if (categoryTasks.length === 0) return 0;
    
    const completedTasks = categoryTasks.filter(task => task.completed).length;
    return Math.round((completedTasks / categoryTasks.length) * 100);
  };

  // Calculate overall progress
  const overallProgress = tasks.length > 0 
    ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100)
    : 0;

  return (
    <div className="flex flex-col h-full bg-white/50 rounded-lg shadow-lg">
      <div className="p-4 bg-covenant-primary text-white rounded-t-lg">
        <h2 className="text-xl font-playfair font-semibold">To-Do List</h2>
        <div className="mt-2">
          <Progress value={overallProgress} className="h-2 bg-white/20" />
          <p className="text-sm mt-1">{overallProgress}% Complete</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto p-2 bg-covenant-primary/5">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 mx-1 rounded-md whitespace-nowrap ${
              activeCategory === category
                ? 'bg-covenant-primary text-white'
                : 'bg-white/70 hover:bg-covenant-accent/20'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
            <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
              {tasks.filter(t => t.category === category).length}
            </span>
          </button>
        ))}
      </div>

      {/* Add Task Form */}
      <div className="p-3 border-b">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <div className="flex gap-2">
            <Input
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              className="bg-covenant-primary hover:bg-covenant-primary/90"
            >
              <Plus size={18} />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Select defaultValue={newTaskCategory} onValueChange={setNewTaskCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select 
                defaultValue={newTaskPriority.toString()} 
                onValueChange={(val) => setNewTaskPriority(parseInt(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low</SelectItem>
                  <SelectItem value="2">Medium</SelectItem>
                  <SelectItem value="3">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </div>

      {/* Category Progress */}
      <div className="p-3 bg-covenant-accent/10">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{activeCategory}</h3>
          <span className="text-sm text-covenant-primary">
            {calculateProgress(activeCategory)}% Complete
          </span>
        </div>
        <Progress value={calculateProgress(activeCategory)} className="mt-1 h-1.5" />
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredTasks.length > 0 ? (
          <ul className="space-y-2">
            {filteredTasks
              .sort((a, b) => {
                // Sort by priority (high to low) then by completion status
                if (a.completed && !b.completed) return 1;
                if (!a.completed && b.completed) return -1;
                return b.priority - a.priority;
              })
              .map((task) => (
                <li 
                  key={task.id} 
                  className={`flex items-center p-2 rounded-lg ${
                    task.completed 
                      ? 'bg-gray-100 text-gray-500' 
                      : 'bg-white'
                  } animate-fade-in`}
                >
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={() => toggleCompletion(task.id)}
                    className="mr-3"
                  />
                  
                  <span 
                    className={`flex-1 ${task.completed ? 'line-through' : ''}`}
                  >
                    {task.text}
                  </span>
                  
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => togglePriority(task.id)}
                      className="h-8 w-8"
                    >
                      <Star 
                        size={16} 
                        className={task.priority >= 1 ? 'fill-yellow-400' : ''}
                        fill={task.priority >= 1 ? "currentColor" : "none"}
                      />
                      {task.priority > 1 && (
                        <Star 
                          size={14} 
                          className={`absolute translate-x-1 translate-y-1 ${task.priority >= 2 ? 'fill-yellow-400' : ''}`}
                          fill={task.priority >= 2 ? "currentColor" : "none"}
                        />
                      )}
                      {task.priority > 2 && (
                        <Star 
                          size={12} 
                          className={`absolute translate-x-2 translate-y-2 ${task.priority >= 3 ? 'fill-yellow-400' : ''}`}
                          fill={task.priority >= 3 ? "currentColor" : "none"}
                        />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" 
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <Check size={40} className="mb-2" />
            <p>No {activeCategory.toLowerCase()} tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoPanel;

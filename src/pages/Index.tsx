
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Bot, 
  BookOpen, 
  CheckSquare, 
  Bell, 
  GraduationCap,
  Heart,
  Calculator,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import NotesPanel from "@/components/NotesPanel";
import TodoPanel from "@/components/TodoPanel";
import ChatPanel from "@/components/ChatPanel";

const Index = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Chatbot",
      description: "Get instant help with your studies and questions",
      path: "/chatbot",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BookOpen,
      title: "Notes Summarizer",
      description: "Transform lengthy notes into concise summaries",
      path: "/summarize",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckSquare,
      title: "Task Manager",
      description: "Stay organized with your academic tasks",
      path: "/todo",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss important deadlines",
      path: "/reminders",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: GraduationCap,
      title: "Study Tips",
      description: "Improve your learning with proven strategies",
      path: "/study-tips",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Heart,
      title: "Health Tips",
      description: "Maintain your wellbeing during studies",
      path: "/health-tips",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Calculator,
      title: "Calculator",
      description: "Quick calculations for your academic work",
      path: "/calculator",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-3 font-serif text-center">
            Welcome to CU AI Desk
          </h1>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto text-center">
            Your intelligent companion for academic success and personal wellbeing
          </p>
        </motion.div>

        {/* Quick Access Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <Link to={feature.path} className="block h-full">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-purple-100 group">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-3">
                      {feature.description}
                    </CardDescription>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Get Started <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Panels */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-1">
            <TodoPanel />
          </div>
          <div className="lg:col-span-1">
            <NotesPanel />
          </div>
          <div className="lg:col-span-1">
            <ChatPanel />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;

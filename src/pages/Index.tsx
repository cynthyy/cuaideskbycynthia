
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import { 
  Bot, 
  BookOpen, 
  CheckSquare, 
  Bell, 
  GraduationCap,
  TrendingUp,
  Calendar,
  Brain
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Chatbot",
      description: "Get instant help with your studies",
      icon: Bot,
      path: "/chatbot",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Summarize Notes",
      description: "Transform lengthy notes into concise summaries",
      icon: BookOpen,
      path: "/summarize",
      color: "from-green-500 to-blue-500"
    },
    {
      title: "To-Do Manager",
      description: "Stay organized with smart task tracking",
      icon: CheckSquare,
      path: "/todo",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Smart Reminders",
      description: "Never miss important deadlines",
      icon: Bell,
      path: "/reminders",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Study Tips",
      description: "Proven strategies to boost your performance",
      icon: GraduationCap,
      path: "/study-tips",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const stats = [
    { label: "Study Sessions", value: "24", icon: Brain },
    { label: "Tasks Completed", value: "156", icon: CheckSquare },
    { label: "Notes Summarized", value: "43", icon: BookOpen },
    { label: "Active Reminders", value: "8", icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <Header />
      
      <main className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent mb-6 font-serif"
            >
              Welcome to CU Aide Desk
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Your comprehensive academic companion designed specifically for Covenant University students. 
              Streamline your studies, boost productivity, and achieve academic excellence.
            </motion.p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center shadow-lg border-purple-100 hover:shadow-xl transition-all duration-300">
                    <CardContent className="pt-6">
                      <Icon size={32} className="mx-auto text-purple-600 mb-3" />
                      <div className="text-3xl font-bold text-purple-800 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid lg:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full shadow-xl border-0 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                    <CardHeader className={`bg-gradient-to-r ${feature.color} text-white relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      />
                      <div className="relative z-10">
                        <Icon size={48} className="mb-4" />
                        <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                      <Button
                        onClick={() => navigate(feature.path)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Excel?</h2>
            <p className="text-lg mb-6 opacity-90">
              Start your productive study session with CU Aide Desk today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/chatbot')}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg"
              >
                <Bot className="mr-2" size={20} />
                Ask AI Assistant
              </Button>
              <Button
                onClick={() => navigate('/todo')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold"
              >
                <TrendingUp className="mr-2" size={20} />
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Bot, 
  BookOpen, 
  CheckSquare, 
  Bell, 
  GraduationCap,
  Menu,
  Home
} from "lucide-react";
import { motion } from "framer-motion";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/chatbot', label: 'AI Chatbot', icon: Bot },
    { path: '/summarize', label: 'Summarize Notes', icon: BookOpen },
    { path: '/todo', label: 'To-Do List', icon: CheckSquare },
    { path: '/reminders', label: 'Reminders', icon: Bell },
    { path: '/study-tips', label: 'Study Tips', icon: GraduationCap },
  ];

  const NavLink = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link to={item.path} onClick={() => mobile && setIsOpen(false)}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive 
              ? 'bg-white text-purple-700 shadow-md' 
              : 'text-white hover:bg-white/20'
          } ${mobile ? 'w-full' : ''}`}
        >
          <Icon size={20} />
          <span className="font-medium">{item.label}</span>
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2">
        {navItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-gradient-to-b from-purple-600 to-purple-800 border-none">
          <div className="py-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-white mb-8"
            >
              CU Aide Desk
            </motion.h2>
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink item={item} mobile />
                </motion.div>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigation;

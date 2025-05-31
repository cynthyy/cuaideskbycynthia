
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import UserDropdown from "../UserDropdown";
import Navigation from "./Navigation";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username, display_name')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }

          if (data) {
            setUsername(data.username || data.display_name || user.email?.split('@')[0] || '');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="cu-gradient shadow-xl sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <motion.img 
                src="/lovable-uploads/be140c00-8e6f-44bd-ba21-52a2e9a0090e.png" 
                alt="CU Logo" 
                className="h-10 w-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <div>
                <h1 className="text-xl font-bold text-white font-playfair">CU AI Desk</h1>
                <div className="flex items-center space-x-1 text-purple-100 text-xs">
                  <GraduationCap className="w-3 h-3" />
                  <span>Covenant University</span>
                </div>
              </div>
            </div>
            
            {username && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden md:flex items-center space-x-2 text-purple-100 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Welcome back, {username}! 😊
                </span>
              </motion.div>
            )}
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Navigation />
            {user ? (
              <UserDropdown />
            ) : (
              <Button 
                onClick={() => window.location.href = '/auth'}
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

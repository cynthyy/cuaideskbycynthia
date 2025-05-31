
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import UserDropdown from "../UserDropdown";
import Navigation from "./Navigation";

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
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white font-serif">CU AI Desk</h1>
            {username && (
              <span className="text-purple-100 text-sm">
                Welcome back, {username}!
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Navigation />
            {user ? (
              <UserDropdown />
            ) : (
              <Button 
                onClick={() => window.location.href = '/auth'}
                variant="outline" 
                className="text-purple-600 border-white hover:bg-white/10"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full bg-covenant-primary text-white py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="lg:hidden">
          {/* Mobile menu button */}
          <Button variant="ghost" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </div>
        
        <h1 className="text-center text-2xl md:text-3xl font-bold font-cinzel flex-1 animate-fade-in">
          Covenant University AI Desk
        </h1>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
    </header>
  );
};

export default Header;

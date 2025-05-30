
import Navigation from "./Navigation";
import UserDropdown from "../UserDropdown";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 text-white py-4 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="text-3xl">🎓</div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif">
              CU AI Desk
            </h1>
            <p className="text-xs lg:text-sm opacity-90 font-light">
              by Cynthia
            </p>
          </div>
        </motion.div>
        
        <Navigation />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <UserDropdown />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;

import React from 'react';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
import { motion } from 'motion/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-brand-black font-sans selection:bg-brand-red selection:text-white">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 min-h-[calc(100vh-200px)]"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;

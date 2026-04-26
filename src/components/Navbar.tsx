import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { motion, AnimatePresence } from 'motion/react';

import { useTheme } from '../context/ThemeContext.tsx';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-white/80 backdrop-blur-md border-b border-brand-gray/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
        {/* Iconic Gangster Fedora Logo */}
        <Link to="/" className="flex items-center space-x-3 group relative">
          <div className="relative">
            <motion.div 
              className="w-14 h-12 relative flex items-center justify-center rotate-[-12deg] group-hover:rotate-0 transition-all duration-700 pointer-events-none"
            >
              {/* Detailed Fedora SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                {/* Fedora Crown */}
                <path d="M20,60 C20,30 35,20 50,20 C65,20 80,30 80,60 L20,60 Z" />
                {/* Fedora Ribbon */}
                <rect x="20" y="52" width="60" height="8" className="fill-brand-red opacity-90" />
                {/* Fedora Brim */}
                <path d="M10,60 H90 L95,68 H5 L10,60 Z" />
                {/* The "Mafia" Dent/Pinch */}
                <path d="M40,25 Q50,15 60,25" className="fill-none stroke-brand-white/20 stroke-2" />
                {/* Initials */}
                <text x="50" y="58" textAnchor="middle" className="fill-white font-tech font-bold text-[8px] tracking-widest translate-y-[1px]">AH</text>
              </svg>
            </motion.div>
            <div className="absolute top-2 -right-1 w-3.5 h-3.5 bg-brand-red rounded-full border-2 border-brand-white animate-pulse"></div>
          </div>
          <div className="flex flex-col -space-y-1.5 pt-1">
            <span className="text-xl lg:text-2xl font-display font-black tracking-tighter text-brand-black leading-none group-hover:tracking-normal transition-all duration-500">
              APPLE<span className="text-brand-red">HEAD</span>
            </span>
            <span className="text-[6px] font-tech font-bold text-brand-silver tracking-[0.4em] uppercase opacity-60">Iconic Streetwear</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {['Shop', 'Hats', 'Jackets', 'Clothes', 'Shoes', 'Costumes'].map((item) => (
            <Link 
              key={item}
              to={item === 'Shop' ? '/shop' : `/shop?category=${item}`} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40 hover:text-brand-red transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Action Icons + Theme Switcher */}
        <div className="flex items-center space-x-5 lg:space-x-6">
          {/* Theme Switcher Dots */}
          <div className="hidden md:flex items-center space-x-2 mr-4 bg-brand-gray/50 p-2 rounded-full border border-brand-gray/20">
            {[
              { id: 'default', color: '#ff3b30' },
              { id: 'chrome', color: '#86868b' },
              { id: 'titanium', color: '#121212' },
              { id: 'voltage', color: '#ff0000' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${theme === t.id ? 'ring-2 ring-brand-red scale-110' : 'opacity-40'}`}
                style={{ backgroundColor: t.color }}
                title={`Switch to ${t.id} theme`}
              />
            ))}
          </div>

          <Link to="/cart" className="relative text-brand-black hover:text-brand-red transition-colors">
            <ShoppingBag size={20} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-silver hidden xl:inline">Account: {user.name}</span>
              <button 
                onClick={() => { logout(); navigate('/login'); }}
                className="text-brand-black hover:text-brand-red transition-colors"
                title="Logout"
              >
                <LogOut size={20} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-brand-black hover:text-brand-red transition-colors">
              <User size={20} strokeWidth={2} />
            </Link>
          )}

          <button 
            className="lg:hidden text-brand-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 overflow-hidden lg:hidden"
          >
            <div className="py-8 px-6 flex flex-col space-y-6">
              {['Shop All', 'Hats', 'Jackets', 'Clothes', 'Shoes', 'Costumes'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'Shop All' ? '/shop' : `/shop?category=${item}`} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-lg font-bold uppercase tracking-widest text-brand-black hover:text-brand-red transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

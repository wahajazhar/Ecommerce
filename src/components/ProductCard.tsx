import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types.ts';
import { useCart } from '../context/CartContext.tsx';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

import { useTheme } from '../context/ThemeContext.tsx';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { theme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product._id}`} className={`block overflow-hidden bg-brand-gray aspect-[3/4] rounded-2xl relative transition-all duration-500 ${theme === 'titanium' || theme === 'voltage' ? 'ring-1 ring-white/10' : ''}`}>
        <img 
          src={product.image} 
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${theme === 'chrome' || theme === 'titanium' ? 'grayscale group-hover:grayscale-0' : 'grayscale-[40%] group-hover:grayscale-0'}`}
        />
        <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors" />
        
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
           <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-2xl transition-all transform active:scale-95 ${
              theme === 'voltage' ? 'bg-brand-red text-white hover:bg-white hover:text-red-600' :
              theme === 'chrome' ? 'bg-white text-black hover:bg-brand-black hover:text-white' :
              'bg-brand-white text-brand-black hover:bg-brand-red hover:text-white'
            }`}
           >
             <ShoppingBag size={20} strokeWidth={2} />
           </button>
        </div>
      </Link>
      
      <div className="mt-5 space-y-1.5 px-1">
        <div className="flex justify-between items-start">
          <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors max-w-[70%] ${theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h3>
          <span className={`text-[12px] font-tech font-bold ${theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>${product.price}</span>
        </div>
        <p className="text-[8px] font-tech font-bold uppercase tracking-[0.3em] text-brand-silver">
          {product.category}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

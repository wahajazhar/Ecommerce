import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useTheme } from '../context/ThemeContext.tsx';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const categories = ['All', 'Hats', 'Jackets', 'Clothes', 'Shoes', 'Costumes'];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) setActiveCategory(category);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'All' ? '/api/products' : `/api/products?category=${activeCategory}`;
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const filteredProducts = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className={`py-32 px-6 max-w-7xl mx-auto transition-colors duration-700 ${theme === 'titanium' || theme === 'voltage' ? 'bg-brand-black min-h-screen' : ''}`}>
      <div className="flex flex-col space-y-12 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
          <div className="space-y-4">
             <div className="flex items-center space-x-3">
               <div className="w-8 h-[2px] bg-brand-red" />
               <span className="text-[10px] font-tech font-bold uppercase tracking-[0.4em] text-brand-red">{activeCategory}</span>
             </div>
            <h1 className={`text-6xl lg:text-9xl font-display font-black tracking-tighter leading-none ${theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>THE COLLECTIONS</h1>
            <p className="text-[10px] font-tech font-bold uppercase tracking-[0.4em] text-brand-silver">
              {filteredProducts.length} Items Indexed / AH-Global
            </p>
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.4em] px-10 py-5 rounded-full transition-all shadow-2xl active:scale-95 ${
              theme === 'voltage' ? 'bg-brand-red text-white hover:bg-white hover:text-red-700' :
              theme === 'chrome' ? 'bg-white text-black hover:bg-brand-gray' :
              'bg-brand-black text-white hover:bg-brand-red'
            }`}
          >
            <SlidersHorizontal size={14} />
            <span>Refine Search</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar scroll-smooth">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-12 py-5 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                activeCategory === cat 
                ? 'bg-brand-red text-white shadow-2xl shadow-brand-red/40 scale-105' 
                : theme === 'titanium' || theme === 'voltage' 
                  ? 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                  : 'bg-brand-gray text-brand-black/40 hover:bg-gray-200 hover:text-brand-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-20 overflow-hidden"
          >
            <div className="bg-brand-gray rounded-3xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-brand-black">Price Range</h4>
                 <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-brand-red" 
                    />
                    <div className="flex justify-between text-[11px] font-bold text-brand-silver uppercase tracking-widest">
                      <span>$0</span>
                      <span className="text-brand-black">Max: ${priceRange[1]}</span>
                    </div>
                 </div>
               </div>
               <div className="flex flex-col justify-center items-end">
                 <button 
                  onClick={() => { setPriceRange([0, 2000]); setActiveCategory('All'); }}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-red hover:underline underline-offset-8"
                 >
                   Reset Filters
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-brand-gray rounded-2xl animate-pulse" />
          ))
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
      
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-40 bg-brand-gray rounded-3xl border border-dashed border-gray-200">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-silver">No items found.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

import { useTheme } from '../context/ThemeContext.tsx';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get('/api/products');
        setFeaturedProducts(response.data.filter((p: Product) => p.featured).slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className={`overflow-hidden transition-colors duration-700 bg-brand-white`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images.jfif" 
            alt="Hero"
            className={`w-full h-full object-cover ${theme === 'chrome' || theme === 'titanium' ? 'grayscale brightness-50' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${theme === 'voltage' ? 'bg-black/40' : 'bg-brand-white/10'}`} />
          {/* Theme Specific Glows */}
          {theme === 'voltage' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/20 blur-[120px] rounded-full pointer-events-none" />
          )}
        </div>

        <div className="relative z-10 text-center space-y-6 px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="h-[2px] w-16 bg-brand-red" />
              <span className={`text-[10px] font-tech font-bold uppercase tracking-[0.8em] ${theme === 'chrome' || theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-red'}`}>
                {theme === 'chrome' ? 'Metallic Flow' : theme === 'voltage' ? 'Voltage High' : 'Archive 2026'}
              </span>
              <div className="h-[2px] w-16 bg-brand-red" />
            </div>
            <h1 className={`text-7xl lg:text-[12rem] font-display font-black tracking-tighter leading-[0.75] ${theme === 'chrome' || theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>
              APPLE<span className="text-brand-red">HEAD</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-12"
          >
            <p className={`max-w-xl mx-auto text-base lg:text-lg font-medium leading-relaxed tracking-tight ${theme === 'chrome' || theme === 'titanium' || theme === 'voltage' ? 'text-white/80' : 'text-brand-black'}`}>
              Industrial luxury engineered for the elite. Multi-faceted aesthetic directions for the modern icon.
            </p>
            
            <Link 
              to="/shop" 
              className={`inline-flex items-center space-x-6 px-16 py-7 text-[11px] uppercase tracking-[0.4em] font-black transition-all group rounded-full ${
                theme === 'chrome' ? 'bg-white text-black hover:bg-brand-gray' :
                theme === 'voltage' ? 'bg-brand-red text-white hover:bg-white hover:text-red-600' :
                'bg-brand-black text-white hover:bg-brand-red'
              }`}
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-brand-red" size={32} />
        </div>
      </section>

      {/* Modern Bento Category Grid */}
      <section className={`py-40 px-6 max-w-7xl mx-auto transition-colors duration-700`}>
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="space-y-4">
              <span className="text-[10px] font-tech font-bold uppercase tracking-[0.5em] text-brand-red">The Catalog</span>
              <h2 className={`text-6xl lg:text-8xl font-display font-black tracking-tighter leading-none ${theme === 'chrome' || theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>UNIQUE STYLES</h2>
            </div>
            <p className="text-[10px] font-black text-brand-silver uppercase tracking-widest pb-3 hidden md:block">Selected Directions / 01-04</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[900px]">
             {/* Large Featured */}
             <Link 
                to="/shop?category=Jackets"
                className={`md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[3rem] ${theme === 'titanium' || theme === 'voltage' ? 'ring-1 ring-white/10' : ''}`}
              >
                <img 
                  src="/images_13.jfif" 
                  className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme === 'chrome' || theme === 'titanium' ? 'grayscale' : ''}`} 
                  alt="Jackets"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t ${theme === 'voltage' ? 'from-red-900/80' : 'from-black/60'} to-transparent`}>
                  <span className={`text-[10px] font-tech font-bold uppercase tracking-[0.4em] mb-3 block ${theme === 'voltage' ? 'text-white' : 'text-white/60'}`}>Industrial Grade</span>
                  <h3 className="text-5xl font-display font-black uppercase tracking-tighter text-white">THE OUTERWEAR</h3>
                </div>
              </Link>

              {/* Medium 1 */}
              <Link 
                to="/shop?category=Shoes"
                className={`md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-[3rem] ${theme === 'titanium' || theme === 'voltage' ? 'ring-1 ring-white/10' : ''}`}
              >
                <img 
                  src="/images_18.jfif" 
                  className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme === 'chrome' || theme === 'titanium' ? 'grayscale' : ''}`} 
                  alt="Shoes"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/40 transition-colors flex items-center justify-center`}>
                   <h3 className="text-4xl font-display font-black uppercase tracking-tighter text-white italic -rotate-3 group-hover:rotate-0 transition-transform duration-500">FOOTWEAR</h3>
                </div>
              </Link>

              {/* Small 1 */}
              <Link 
                to="/shop?category=Hats"
                className={`group relative overflow-hidden rounded-[3rem] ${theme === 'titanium' || theme === 'voltage' ? 'ring-1 ring-white/10' : ''}`}
              >
                <img 
                  src="/images_4.jfif" 
                  className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme === 'chrome' || theme === 'titanium' ? 'grayscale' : ''}`} 
                  alt="Hats"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                   <h3 className="text-xl font-display font-black uppercase tracking-widest text-white leading-tight">THE<br/>ICONIC</h3>
                </div>
              </Link>

              {/* Medium 2 */}
              <Link 
                to="/shop?category=Clothes"
                className={`group relative overflow-hidden rounded-[3rem] ${theme === 'titanium' || theme === 'voltage' ? 'ring-1 ring-white/10' : ''}`}
              >
                <img 
                  src="/images_2.jfif" 
                  className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme === 'chrome' || theme === 'titanium' ? 'grayscale' : ''}`} 
                  alt="Clothes"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-brand-red/90 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-white">ESSENTIALS</h3>
                </div>
              </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className={`py-40 transition-colors duration-700 ${theme === 'titanium' || theme === 'voltage' ? 'bg-brand-black/90' : 'bg-brand-gray'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-6 md:space-y-0">
            <div className="space-y-4">
              <span className="text-[10px] font-tech font-bold uppercase tracking-[0.5em] text-brand-red">Curated Drop</span>
              <h2 className={`text-5xl lg:text-7xl font-display font-black tracking-tighter ${theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>BEST SELLERS</h2>
            </div>
            <Link to="/shop" className={`text-xs font-tech font-bold uppercase tracking-[0.2em] border-b-2 border-brand-red pb-2 hover:tracking-widest transition-all ${theme === 'titanium' || theme === 'voltage' ? 'text-white' : 'text-brand-black'}`}>
              Browse Entire Index
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-white rounded-2xl animate-pulse" />
              ))
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Product Banner */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative h-[600px] rounded-3xl overflow-hidden group">
          <img 
            src="/images_15.jfif" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Feature"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-black/30 flex items-center justify-center text-center p-12">
            <div className="max-w-xl space-y-8">
              <h2 className="text-4xl lg:text-6xl font-display font-black text-white tracking-tighter uppercase leading-tight">Elevated <br/> Everyday <span className="text-brand-red">Essentials</span></h2>
              <p className="text-white/80 text-sm font-medium tracking-wide">Crafted from the finest materials with an obsessive eye for detail.</p>
              <Link to="/shop" className="inline-block px-12 py-5 bg-white text-brand-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-brand-red hover:text-white transition-all rounded-full shadow-2xl shadow-black/20">Explore More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray border-t border-gray-100 pt-20 pb-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-8">
          <Link to="/" className="text-xl lg:text-2xl font-black tracking-tighter text-brand-black">
            APPLE<span className="text-brand-red">HEAD</span>
          </Link>
          <p className="text-xs font-medium text-brand-silver leading-relaxed max-w-xs">
            Luxury essentials for the modern pioneer. Minimalist design meets futuristic fashion. Engineered for high-performance lifestyle.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-3 bg-white rounded-full text-brand-black hover:bg-brand-red hover:text-white transition-all shadow-sm"><Instagram size={18} strokeWidth={2} /></a>
            <a href="#" className="p-3 bg-white rounded-full text-brand-black hover:bg-brand-red hover:text-white transition-all shadow-sm"><Twitter size={18} strokeWidth={2} /></a>
            <a href="#" className="p-3 bg-white rounded-full text-brand-black hover:bg-brand-red hover:text-white transition-all shadow-sm"><Facebook size={18} strokeWidth={2} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-brand-black text-[11px] uppercase tracking-[0.2em] font-black mb-10">Collections</h4>
          <ul className="space-y-5">
            {['Hats', 'Jackets', 'Clothes', 'Shoes', 'Costumes'].map(cat => (
              <li key={cat}><Link to={`/shop?category=${cat}`} className="text-[11px] font-bold text-brand-silver hover:text-brand-red uppercase tracking-widest transition-colors">{cat}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-brand-black text-[11px] uppercase tracking-[0.2em] font-black mb-10">Support</h4>
          <ul className="space-y-5">
            <li><Link to="/" className="text-[11px] font-bold text-brand-silver hover:text-brand-red uppercase tracking-widest transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/" className="text-[11px] font-bold text-brand-silver hover:text-brand-red uppercase tracking-widest transition-colors">Order Status</Link></li>
            <li><Link to="/" className="text-[11px] font-bold text-brand-silver hover:text-brand-red uppercase tracking-widest transition-colors">Terms of Use</Link></li>
            <li><Link to="/" className="text-[11px] font-bold text-brand-silver hover:text-brand-red uppercase tracking-widest transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-black text-[11px] uppercase tracking-[0.2em] font-black mb-10">Stay Updated</h4>
          <p className="text-[10px] font-bold text-brand-silver uppercase tracking-widest mb-6">Join our exclusive newsletter.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="YOUR@EMAIL.COM" 
              className="w-full bg-white border border-gray-100 rounded-full px-6 py-4 text-[10px] font-bold outline-none focus:border-brand-red transition-all" 
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-black text-white p-2 rounded-full hover:bg-brand-red transition-all">
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200/50 space-y-4 md:space-y-0">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-silver/50">
          © 2024 APPLEHEAD COLLECTIVE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] font-black text-brand-silver/50">
          <span>CURATED IN CALIFORNIA</span>
          <span>APPLEHEAD.STORE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

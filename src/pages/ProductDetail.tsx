import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types.ts';
import { useCart } from '../context/CartContext.tsx';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-brand-red rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-white">
      <h2 className="text-3xl font-black tracking-tighter uppercase">Product Not Found</h2>
      <button onClick={() => navigate('/shop')} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-brand-red pb-1 hover:text-brand-red transition-all">Back to Collection</button>
    </div>
  );

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto bg-white">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-brand-silver hover:text-brand-black transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        <span>Return</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-gray aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red">{product.category}</span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-brand-black">{product.name}</h1>
            <p className="text-3xl font-black text-brand-black">${product.price}</p>
          </div>

          <div className="space-y-6 border-y border-gray-100 py-10">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-black">Description</h4>
            <p className="text-sm lg:text-base leading-relaxed text-brand-silver font-medium">
              {product.description}
            </p>
          </div>

          <div className="space-y-8">
            <button 
              onClick={() => addToCart(product)}
              className="w-full py-6 bg-brand-red text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full flex items-center justify-center space-x-4 hover:bg-brand-red-hover transition-all active:scale-[0.98] shadow-lg shadow-brand-red/20"
            >
              <ShoppingBag size={18} />
              <span>Add to Bag</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-gray-100">
              <div className="flex flex-col space-y-2 text-brand-silver">
                <Truck size={20} strokeWidth={2} className="text-brand-red" />
                <span className="text-[9px] font-black uppercase tracking-widest">Express Delivery</span>
              </div>
              <div className="flex flex-col space-y-2 text-brand-silver">
                <ShieldCheck size={20} strokeWidth={2} className="text-brand-red" />
                <span className="text-[9px] font-black uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex flex-col space-y-2 text-brand-silver">
                <RefreshCw size={20} strokeWidth={2} className="text-brand-red" />
                <span className="text-[9px] font-black uppercase tracking-widest">Global Returns</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;

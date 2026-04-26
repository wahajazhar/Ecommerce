import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-6 bg-white">
        <div className="p-10 bg-brand-gray rounded-full text-brand-red mb-4">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase text-brand-black">Your Bag is Empty</h2>
          <p className="text-xs font-bold text-brand-silver uppercase tracking-widest max-w-xs mx-auto">
            Explore our curated collections and find your next essential pieces.
          </p>
        </div>
        <Link to="/shop" className="px-12 py-5 bg-brand-red text-white text-[11px] font-black uppercase tracking-widest hover:bg-brand-red-hover transition-all rounded-full shadow-lg shadow-brand-red/20">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-6xl font-black tracking-tighter mb-20 text-center">SHOPPING BAG</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-7 space-y-10">
          {cart.map((item) => (
            <motion.div 
              layout
              key={item._id}
              className="flex items-center space-x-6 pb-10 border-b border-gray-100 last:border-0"
            >
              <div className="w-24 lg:w-32 aspect-[3/4] overflow-hidden bg-brand-gray rounded-2xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale-[30%]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex-1 flex flex-col h-full py-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-black">{item.name}</h3>
                    <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">{item.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-brand-silver hover:text-brand-red transition-colors p-2">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center bg-brand-gray rounded-full px-4 py-2 space-x-6">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-brand-black hover:text-brand-red transition-all p-1">
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-brand-black hover:text-brand-red transition-all p-1">
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-silver block mb-1">Price</span>
                    <span className="text-lg font-black tracking-tighter text-brand-black">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
          <div className="bg-brand-gray p-10 rounded-[2.5rem] space-y-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-black">Order Summary</h4>
            <div className="space-y-5">
              <div className="flex justify-between text-brand-silver font-bold text-[11px] uppercase tracking-widest">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-brand-black">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-brand-silver font-bold text-[11px] uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-brand-red">Free</span>
              </div>
              <div className="flex justify-between text-brand-silver font-bold text-[11px] uppercase tracking-widest">
                <span>Tax</span>
                <span className="text-brand-black">Included</span>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-200/50 flex justify-between items-center">
              <span className="text-sm font-black uppercase tracking-widest text-brand-black">Total Due</span>
              <span className="text-3xl font-black tracking-tighter text-brand-red font-mono">${totalPrice}</span>
            </div>
            <Link 
              to="/checkout" 
              className="w-full py-6 bg-brand-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full flex items-center justify-center space-x-4 hover:bg-brand-red transition-all shadow-xl shadow-brand-black/10 active:scale-[0.98]"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

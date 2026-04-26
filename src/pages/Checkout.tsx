import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const Checkout: React.FC = () => {
  const { totalPrice, clearCart } = useCart();
  const [success, setSuccess] = React.useState(false);

  const handlePayment = () => {
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 px-6 bg-white">
        <CheckCircle2 size={100} className="text-brand-red mb-4 animate-in zoom-in duration-700" strokeWidth={1} />
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase text-brand-black">Order Confirmed</h2>
          <p className="text-xs font-bold text-brand-silver uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
            Your transaction has been processed successfully. You will receive a confirmation email shortly.
          </p>
        </div>
        <Link to="/" className="px-12 py-5 bg-brand-red text-white text-[11px] font-black uppercase tracking-widest hover:bg-brand-red-hover transition-all rounded-full shadow-lg shadow-brand-red/20">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto bg-white">
      <Link to="/cart" className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-brand-silver hover:text-brand-black transition-colors mb-12">
        <ChevronLeft size={14} />
        <span>Back to Bag</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-6">
            <h1 className="text-5xl font-black tracking-tighter text-brand-black">CHECKOUT</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Secure Transaction</p>
          </div>

          <section className="space-y-10">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center space-x-4 text-brand-black">
               <span className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">1</span>
               <span>Shipping Details</span>
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="col-span-1 bg-brand-gray border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
              <input type="text" placeholder="Last Name" className="col-span-1 bg-brand-gray border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
              <input type="text" placeholder="Address line 1" className="col-span-2 bg-brand-gray border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
              <input type="text" placeholder="City" className="col-span-1 bg-brand-gray border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
              <input type="text" placeholder="Postal Code" className="col-span-1 bg-brand-gray border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
            </div>
          </section>

          <section className="space-y-10">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center space-x-4 text-brand-black">
               <span className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">2</span>
               <span>Payment Method</span>
            </h3>
            <div className="bg-brand-gray rounded-[2rem] p-10 space-y-8">
               <div className="flex items-center space-x-4 pb-6 border-b border-gray-200/50">
                 <CreditCard className="text-brand-red" size={24} />
                 <span className="text-[10px] uppercase font-black tracking-widest text-brand-black">Credit / Debit Card</span>
               </div>
               <div className="space-y-4 pt-4">
                 <input type="text" placeholder="Card Number" className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
                 <div className="grid grid-cols-2 gap-4">
                   <input type="text" placeholder="MM/YY" className="bg-white border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
                   <input type="text" placeholder="CVV" className="bg-white border border-gray-100 rounded-full px-8 py-5 text-[11px] font-bold outline-none focus:border-brand-red transition-all" />
                 </div>
               </div>
            </div>
          </section>

          <button 
            onClick={handlePayment}
            className="w-full py-6 bg-brand-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-brand-red transition-all shadow-xl shadow-brand-black/10 active:scale-[0.98]"
          >
            Finalize Payment — ${totalPrice}
          </button>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-32 space-y-10">
            <div className="bg-brand-gray p-10 rounded-[2.5rem] space-y-8">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-black">Cart Overview</h4>
                <p className="text-[11px] font-bold text-brand-silver leading-relaxed uppercase tracking-widest">
                  Standard express shipping is applied to all orders over $200. Estimated delivery: 3-5 business days.
                </p>
              </div>
              
              <div className="space-y-6 pt-6 border-t border-gray-200/50">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-brand-silver">Subtotal</span>
                  <span className="text-brand-black">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-brand-silver">Total Charge</span>
                  <span className="text-3xl font-black tracking-tighter text-brand-red font-mono">${totalPrice}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-8 border border-dashed border-gray-200 rounded-[2rem] justify-center">
              <Truck size={18} className="text-brand-red" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-silver">Complimentary Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

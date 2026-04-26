import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.tsx';
import { ArrowRight, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/register', { email, password, name });
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black tracking-tighter uppercase text-brand-black">Join Us</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Become part of the AppleHead collective</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-[10px] font-bold text-brand-red text-center uppercase tracking-widest">{error}</p>}
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-black">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-silver" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-gray border border-gray-100 rounded-full px-14 py-5 text-[11px] font-bold focus:border-brand-red transition-all outline-none"
                placeholder="JOHN DOE"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-black">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-silver" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-gray border border-gray-100 rounded-full px-14 py-5 text-[11px] font-bold focus:border-brand-red transition-all outline-none"
                placeholder="EMAIL@EXAMPLE.COM"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-black">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-silver" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-gray border border-gray-100 rounded-full px-14 py-5 text-[11px] font-bold focus:border-brand-red transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-red text-white py-5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-brand-red-hover transition-all disabled:opacity-50 shadow-lg shadow-brand-red/20"
          >
            {loading ? 'Processing...' : (
              <>
                <span>Create Account</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-brand-silver">
          Already a member? <Link to="/login" className="text-brand-red hover:underline underline-offset-8 font-black">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

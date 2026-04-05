import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-brand-dark px-6 py-12 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-green/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-50 dark:bg-white/5 p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 relative z-10"
      >
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
            </div>
            <span className="font-bold text-2xl tracking-tight text-brand-dark dark:text-white">Educax</span>
          </div>
          <h1 className="text-4xl font-black text-brand-dark dark:text-white leading-tight">Join Educax Today</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Start your journey to skills mastery in just 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest pl-2">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                required
                className="w-full bg-white dark:bg-brand-dark text-brand-dark dark:text-white border-none rounded-2xl p-5 pl-12 shadow-sm focus:ring-2 focus:ring-brand-green transition-all"
                placeholder="John Doe"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest pl-2">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                required
                className="w-full bg-white dark:bg-brand-dark text-brand-dark dark:text-white border-none rounded-2xl p-5 pl-12 shadow-sm focus:ring-2 focus:ring-brand-green transition-all"
                placeholder="name@example.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest pl-2">Create Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-white dark:bg-brand-dark text-brand-dark dark:text-white border-none rounded-2xl p-5 pl-12 pr-12 shadow-sm focus:ring-2 focus:ring-brand-green transition-all"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-green transition-colors"
                name="toggle-password-visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              name="signup-button"
              className="w-full py-5 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl shadow-brand-green/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign Up"}
              {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /> }
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
            Already have an account? <Link to="/login" name="signin-link" className="text-brand-green font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

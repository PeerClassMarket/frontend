import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-brand-dark px-6 py-12 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-50 dark:bg-white/5 p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 relative z-10"
      >
        <div className="mb-8">
          <button 
            onClick={() => navigate('/login')} 
            className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-brand-green transition-colors"
            name="back-to-login"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </div>

        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl font-black text-brand-dark dark:text-white">Reset Password</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            {submitted 
              ? "We've sent a password reset link to your email." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <button 
              type="submit" 
              disabled={loading}
              name="reset-button"
              className="w-full py-5 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl shadow-brand-green/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Link"}
              {!loading && <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" /> }
            </button>
          </form>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-5 bg-brand-dark text-white font-black rounded-2xl hover:bg-brand-green hover:text-brand-dark transition-all shadow-xl"
            name="done-button"
          >
            Return to Sign In
          </button>
        )}
      </motion.div>
    </div>
  );
}

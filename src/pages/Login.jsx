import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const DEMO_ACCOUNTS = [
  { label: 'Demo Student (A/L)',   role: 'student',    grade: 'grade12-13', name: 'Amaya Silva',      email: 'student@demo.lk'    },
  { label: 'Demo Instructor',      role: 'instructor', level: 'undergraduate', name: 'Kavindi Perera', email: 'instructor@demo.lk' },
];

export default function Login() {
  const navigate = useNavigate();
  const { mockLogin, setGrade, setInstLevel } = useContext(AppContext);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      mockLogin('student', { name: 'Demo Student', email });
      setGrade('grade12-13');
      navigate('/student-dashboard');
    }, 1200);
  };

  const handleDemo = (acc) => {
    mockLogin(acc.role, { name: acc.name, email: acc.email });
    if (acc.role === 'student') setGrade(acc.grade);
    if (acc.role === 'instructor') setInstLevel(acc.level);
    navigate(acc.role === 'instructor' ? '/tutor-dashboard' : '/student-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 py-16 relative overflow-hidden">
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-brand-green/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/30">
            <GraduationCap className="w-6 h-6 text-brand-dark" />
          </div>
          <div>
            <span className="font-black text-2xl text-white">PeerClass</span>
            <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] block -mt-1">Sri Lanka</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-white text-center mb-2">Welcome back</h1>
        <p className="text-neutral-400 text-center text-sm mb-8">Sign in to continue your learning journey.</p>

        {/* Demo shortcuts */}
        <div className="mb-6">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center mb-3">Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map(acc => (
              <button
                key={acc.email}
                onClick={() => handleDemo(acc)}
                className="py-2.5 px-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:border-brand-green/40 hover:text-brand-green transition-all text-center"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-neutral-500">or sign in with email</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-neutral-500"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          </div>

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 pl-12 pr-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-neutral-500"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-brand-green">
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/reset-password" className="text-xs text-brand-green font-bold hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-green/20 disabled:opacity-40 text-base"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-brand-dark/40 border-t-brand-dark rounded-full animate-spin" />
            ) : (
              <> Sign In <ArrowRight className="w-5 h-5" /> </>
            )}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-green font-bold hover:underline">Join Free</Link>
        </p>
      </motion.div>
    </div>
  );
}

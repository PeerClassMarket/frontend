import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, User, Eye, EyeOff, ArrowRight, GraduationCap,
  BookOpen, ChevronDown
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { ALL_SUBJECTS, SL_SUBJECTS, GRADE_CATEGORIES, INSTRUCTOR_LEVELS } from '../data/mockData';

const GRADE_OPTIONS = GRADE_CATEGORIES.map(g => ({ value: g.id, label: g.label }));
const INST_OPTIONS  = INSTRUCTOR_LEVELS.map(l => ({ value: l.id, label: l.label }));

export default function Register() {
  const navigate  = useNavigate();
  const { mockLogin, setGrade, setInstLevel } = useContext(AppContext);

  const [role, setRole]           = useState(null); // 'student' | 'instructor'
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', password: '',
    gradeCategory: '', instLevel: '',
    subjects: [],
  });

  const toggleSubject = (sub) => {
    setForm(p => ({
      ...p,
      subjects: p.subjects.includes(sub)
        ? p.subjects.filter(s => s !== sub)
        : [...p.subjects, sub],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) return;
    setLoading(true);

    // Persist mock role
    if (role === 'instructor') setInstLevel(form.instLevel || 'undergraduate');

    mockLogin(role, { name: form.name || 'New User', email: form.email, subjects: role === 'instructor' ? form.subjects : [] });

    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 py-16 relative overflow-hidden">
      {/* bg glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-brand-green/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/5 p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 relative z-10"
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

        <h1 className="text-3xl font-black text-white text-center mb-2">Create your account</h1>
        <p className="text-neutral-400 text-center text-sm mb-8">Join Sri Lanka's peer-learning community.</p>

        {/* ── Role Picker ── */}
        <div className="mb-8">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 text-center">I am a…</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'student', label: 'Student', sub: 'I want to learn', icon: <BookOpen className="w-6 h-6" /> },
              { id: 'instructor', label: 'Instructor', sub: 'I want to teach', icon: <GraduationCap className="w-6 h-6" /> },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  role === r.id
                    ? 'border-brand-green bg-brand-green/10 text-brand-green'
                    : 'border-white/10 text-neutral-400 hover:border-white/30'
                }`}
              >
                {r.icon}
                <span className="font-black text-white">{r.label}</span>
                <span className="text-xs">{r.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Full Name"
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-neutral-500"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="Email address"
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-neutral-500"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="Create password"
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 pl-12 pr-12 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-neutral-500"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-brand-green">
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* ── Role-specific fields ── */}
          <AnimatePresence>
            {role === 'student' && (
              <motion.div key="student-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                <p className="text-sm text-neutral-400 text-center py-2 bg-white/5 rounded-2xl border border-white/10">
                  You can select your grade and subjects anytime later in the system.
                </p>
              </motion.div>
            )}

            {role === 'instructor' && (
              <motion.div key="inst-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                <div className="relative">
                  <select
                    value={form.instLevel}
                    onChange={e => setForm(p => ({ ...p, instLevel: e.target.value }))}
                    className="w-full appearance-none bg-white/5 text-white border border-white/10 rounded-2xl p-4 pl-5 pr-10 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                  >
                    <option value="" disabled className="bg-gray-900">Select your level</option>
                    {INST_OPTIONS.map(o => (
                      <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>

                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Subjects you can teach</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-neutral-400 mb-2 font-bold">Grade 6-9 & O/L</p>
                      <div className="flex flex-wrap gap-2">
                        {SL_SUBJECTS.ol_and_lower.map(sub => (
                          <button key={sub} type="button" onClick={() => toggleSubject(sub)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${form.subjects.includes(sub) ? 'bg-brand-green text-brand-dark border-brand-green' : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/30'}`}>
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-2 font-bold">A/L Science Stream</p>
                      <div className="flex flex-wrap gap-2">
                        {SL_SUBJECTS.al_stream_science.map(sub => (
                          <button key={sub} type="button" onClick={() => toggleSubject(sub)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${form.subjects.includes(sub) ? 'bg-brand-green text-brand-dark border-brand-green' : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/30'}`}>
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-2 font-bold">A/L Technology Stream</p>
                      <div className="flex flex-wrap gap-2">
                        {SL_SUBJECTS.al_stream_technology.map(sub => (
                          <button key={sub} type="button" onClick={() => toggleSubject(sub)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${form.subjects.includes(sub) ? 'bg-brand-green text-brand-dark border-brand-green' : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/30'}`}>
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-2 font-bold">A/L Commerce Stream</p>
                      <div className="flex flex-wrap gap-2">
                        {SL_SUBJECTS.al_stream_commerce.map(sub => (
                          <button key={sub} type="button" onClick={() => toggleSubject(sub)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${form.subjects.includes(sub) ? 'bg-brand-green text-brand-dark border-brand-green' : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/30'}`}>
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !role}
            className="w-full py-4 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-green/20 disabled:opacity-40 disabled:cursor-not-allowed text-base"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-brand-dark/40 border-t-brand-dark rounded-full animate-spin" />
            ) : (
              <> Create Account <ArrowRight className="w-5 h-5" /> </>
            )}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-green font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}

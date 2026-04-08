import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Video, Clock, Calendar, BookOpen,
  TrendingUp, Star, ArrowRight, GraduationCap, CheckCircle2, XCircle
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { mockStudentSessions, SESSION_TYPES, GRADE_CATEGORIES } from '../data/mockData';

const STATUS_STYLE = {
  CONFIRMED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  PENDING:   'bg-amber-500/15 text-amber-400 border-amber-500/20',
  COMPLETED: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20',
  CANCELLED: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

export default function StudentDashboard() {
  const { mockUser, studentGrade } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const gradeInfo  = GRADE_CATEGORIES.find(g => g.id === studentGrade);
  const firstName  = mockUser?.name?.split(' ')[0] || 'Student';

  const upcoming  = mockStudentSessions.filter(s => s.status === 'CONFIRMED' || s.status === 'PENDING');
  const completed = mockStudentSessions.filter(s => s.status === 'COMPLETED');
  const displayed = activeTab === 'upcoming' ? upcoming : completed;

  const STATS = [
    { label: 'Sessions Booked',   value: mockStudentSessions.length, icon: <BookOpen className="w-5 h-5" />,  color: 'text-brand-green' },
    { label: 'Sessions Completed',value: completed.length,           icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-violet-400' },
    { label: 'Instructors',        value: new Set(mockStudentSessions.map(s => s.instructorId)).size, icon: <GraduationCap className="w-5 h-5" />, color: 'text-cyan-400' },
    { label: 'Hours Learned',      value: `${mockStudentSessions.reduce((a,s) => a + (s.duration/60), 0).toFixed(1)}h`, icon: <Clock className="w-5 h-5" />, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-20 space-y-10">

        {/* Welcome banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-brand-green/20 to-emerald-500/5 border border-brand-green/20 rounded-3xl p-8 overflow-hidden">
          <div className="absolute right-6 top-6 text-7xl opacity-10 select-none">🎓</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm text-brand-green font-bold uppercase tracking-widest mb-1">Welcome back</p>
              <h1 className="text-3xl md:text-4xl font-black text-white">{firstName}! 👋</h1>
              {gradeInfo && (
                <p className="text-neutral-400 mt-2">
                  {gradeInfo.label} · {gradeInfo.description}
                </p>
              )}
            </div>
            <Link
              to="/find-instructors"
              className="flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all shadow-lg shadow-brand-green/20 flex-shrink-0"
            >
              <Search className="w-4 h-4" /> Find Instructors
            </Link>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className={`flex items-center gap-2 mb-2 ${s.color}`}>
                {s.icon}
                <span className="text-2xl font-black text-white">{s.value}</span>
              </div>
              <p className="text-sm text-neutral-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Sessions section */}
        <div>
          {/* Tab bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
              {['upcoming', 'completed'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-brand-green text-brand-dark' : 'text-neutral-400 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <Link to="/find-instructors" className="flex items-center gap-1.5 text-sm text-brand-green font-bold hover:gap-2.5 transition-all">
              Browse More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {displayed.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white/5 border border-dashed border-white/10 rounded-3xl p-16 text-center">
              <p className="text-5xl mb-4">📚</p>
              <h3 className="text-xl font-black text-white mb-2">No sessions yet</h3>
              <p className="text-neutral-400 mb-6">Find an instructor and book your first session.</p>
              <Link to="/find-instructors" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all">
                Find Instructors <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {displayed.map((session, i) => {
                const st = SESSION_TYPES.find(t => t.id === session.sessionType);
                return (
                  <motion.div key={session.id}
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-5 hover:border-brand-green/20 transition-all">

                    <div className="flex items-center gap-5">
                      {/* Session type icon */}
                      <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        {st?.icon || '📖'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-white">{session.subject}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${STATUS_STYLE[session.status]}`}>
                            {session.status}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 mt-0.5">
                          {st?.label} · with <span className="text-white font-semibold">{session.instructorName}</span>
                        </p>
                        <div className="flex items-center gap-4 mt-1.5 text-xs text-neutral-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{session.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{session.time} · {session.duration} min</span>
                          <span className="font-bold text-neutral-400">LKR {session.priceTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {session.status === 'CONFIRMED' && (
                        <button
                          onClick={() => navigate(`/video-session/${session.meetingChannel}`)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all text-sm shadow-lg shadow-brand-green/20"
                        >
                          <Video className="w-4 h-4" /> Join Session
                        </button>
                      )}
                      {session.status === 'PENDING' && (
                        <span className="text-xs text-amber-400 font-bold">Awaiting confirmation</span>
                      )}
                      {session.status === 'COMPLETED' && (
                        <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                          <Star className="w-4 h-4 text-amber-400" />
                          <span>Rate session</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick tip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
          <TrendingUp className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white text-sm">Pro Tip</p>
            <p className="text-sm text-neutral-400 mt-0.5">
              For best results, mention the specific paper year and question numbers when you book a Paper Discussion session.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

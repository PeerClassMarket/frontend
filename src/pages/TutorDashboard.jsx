import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video, Calendar, Clock, CheckCircle, XCircle,
  Users, BookOpen, Inbox, GraduationCap, ArrowRight, Star
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { mockInstructorRequests, SESSION_TYPES } from '../data/mockData';
import { toast } from 'react-toastify';

const STATUS_STYLE = {
  CONFIRMED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  PENDING:   'bg-amber-500/15 text-amber-400 border-amber-500/20',
  CANCELLED: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

const GRADE_LABEL = {
  'grade6-9': 'Grade 6–9',
  'grade10-11': 'Grade 10–11 (O/L)',
  'grade12-13': 'Grade 12–13 (A/L)',
};

export default function TutorDashboard() {
  const { mockUser, instructorLevel } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests]   = useState(mockInstructorRequests);

  const firstName = mockUser?.name?.split(' ')[0] || 'Instructor';
  const pending   = requests.filter(r => r.status === 'PENDING').length;
  const confirmed = requests.filter(r => r.status === 'CONFIRMED').length;

  const STATS = [
    { label: 'Pending Requests', value: pending,   icon: <Inbox className="w-5 h-5" />,      color: 'text-amber-400'  },
    { label: 'Confirmed',        value: confirmed,  icon: <CheckCircle className="w-5 h-5" />, color: 'text-brand-green'},
    { label: 'Total Students',   value: requests.length, icon: <Users className="w-5 h-5" />, color: 'text-violet-400' },
    { label: 'Rating',           value: '4.9 ★',    icon: <Star className="w-5 h-5" />,        color: 'text-amber-400'  },
  ];

  const handleStatus = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(status === 'CONFIRMED' ? 'Session accepted! 🎉' : 'Session declined.');
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-20 space-y-10">

        {/* Welcome banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-violet-500/15 to-purple-600/5 border border-violet-500/20 rounded-3xl p-8 overflow-hidden">
          <div className="absolute right-6 top-6 text-7xl opacity-10 select-none">📚</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm text-violet-400 font-bold uppercase tracking-widest mb-1">Instructor Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-black text-white">Hello, {firstName}! 👋</h1>
              <p className="text-neutral-400 mt-2">
                {instructorLevel === 'undergraduate' ? 'Undergraduate Instructor' : 'GCE A/L Student Instructor'} · PeerClass Sri Lanka
              </p>
            </div>
            {pending > 0 && (
              <div className="flex items-center gap-2 px-5 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold text-amber-400">{pending} pending request{pending > 1 ? 's' : ''}</span>
              </div>
            )}
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

        {/* Tab bar */}
        <div>
          <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 w-fit mb-6">
            {[
              { id: 'requests', label: 'Booking Requests', count: pending },
              { id: 'sessions', label: 'My Sessions', count: confirmed },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-brand-green text-brand-dark' : 'text-neutral-400 hover:text-white'}`}>
                {tab.label}
                {tab.count > 0 && (
                  <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${activeTab === tab.id ? 'bg-brand-dark text-brand-green' : 'bg-white/10 text-white'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Requests list */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
                  <p className="text-5xl mb-4">📬</p>
                  <h3 className="text-xl font-black text-white mb-2">No requests yet</h3>
                  <p className="text-neutral-400">Students will appear here once they book a session with you.</p>
                </div>
              ) : (
                requests.map((req, i) => {
                  const st = SESSION_TYPES.find(t => t.id === req.sessionType);
                  return (
                    <motion.div key={req.id}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/20 transition-all">

                      <div className="flex flex-wrap items-start justify-between gap-5">
                        {/* Left: student info */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.studentName}`} alt={req.studentName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-black text-white">{req.studentName}</h3>
                              <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded-full text-[11px] font-bold">
                                {GRADE_LABEL[req.studentGrade] || req.studentGrade}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${STATUS_STYLE[req.status]}`}>
                                {req.status}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-400">
                              <span className="text-white font-semibold">{req.subject}</span> · {st?.icon} {st?.label}
                            </p>
                            <div className="flex items-center gap-4 mt-1.5 text-xs text-neutral-500">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{req.requestedDate}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{req.requestedTime} · {req.duration} min</span>
                            </div>
                            {/* Notes */}
                            {req.notes && (
                              <div className="mt-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-400 max-w-md">
                                💬 <span className="text-neutral-300">&quot;{req.notes}&quot;</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right: actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {req.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleStatus(req.id, 'CONFIRMED')}
                                className="flex items-center gap-2 px-5 py-2.5 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-xl hover:bg-brand-green hover:text-brand-dark font-bold transition-all text-sm"
                              >
                                <CheckCircle className="w-4 h-4" /> Accept
                              </button>
                              <button
                                onClick={() => handleStatus(req.id, 'CANCELLED')}
                                className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white font-bold transition-all text-sm"
                              >
                                <XCircle className="w-4 h-4" /> Decline
                              </button>
                            </>
                          )}
                          {req.status === 'CONFIRMED' && (
                            <button
                              onClick={() => navigate(`/video-session/peerclass-${req.id}`)}
                              className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all text-sm shadow-lg shadow-brand-green/20"
                            >
                              <Video className="w-4 h-4" /> Start Session
                            </button>
                          )}
                          {req.status === 'CANCELLED' && (
                            <span className="text-xs text-rose-400 font-bold">Declined</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          )}

          {/* My Sessions (confirmed only) */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              {requests.filter(r => r.status === 'CONFIRMED').length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
                  <p className="text-5xl mb-4">📅</p>
                  <h3 className="text-xl font-black text-white mb-2">No confirmed sessions yet</h3>
                  <p className="text-neutral-400">Accept a booking request to see it here.</p>
                </div>
              ) : (
                requests.filter(r => r.status === 'CONFIRMED').map((req, i) => {
                  const st = SESSION_TYPES.find(t => t.id === req.sessionType);
                  return (
                    <motion.div key={req.id}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="bg-white/5 border border-brand-green/20 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
                          {st?.icon || '📖'}
                        </div>
                        <div>
                          <p className="font-black text-white">{req.studentName} · <span className="text-brand-green">{req.subject}</span></p>
                          <p className="text-sm text-neutral-400">{st?.label} · {GRADE_LABEL[req.studentGrade]}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-neutral-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{req.requestedDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{req.requestedTime}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/video-session/peerclass-${req.id}`)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all text-sm"
                      >
                        <Video className="w-4 h-4" /> Start Session
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

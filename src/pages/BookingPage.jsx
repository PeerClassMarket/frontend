import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, Star, MessageSquare } from 'lucide-react';
import { mockInstructors, SESSION_TYPES, DURATIONS } from '../data/mockData';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContext);
  const inst = mockInstructors.find(i => i.id === Number(id));

  const [sessionType, setSessionType] = useState('');
  const [duration, setDuration]       = useState(60);
  const [notes, setNotes]             = useState('');
  const [date, setDate]               = useState('');
  const [time, setTime]               = useState('');
  const [loading, setLoading]         = useState(false);

  if (!inst) return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white gap-4">
      <p className="text-5xl">😕</p>
      <h2 className="text-2xl font-black">Instructor not found</h2>
    </div>
  );

  const selectedDuration = DURATIONS.find(d => d.value === Number(duration)) || DURATIONS[1];
  const totalPrice = Math.round(inst.pricePerHour * selectedDuration.price_factor);

  const handleBook = (e) => {
    e.preventDefault();
    if (!isLoggedin) {
      toast.info('Please sign in to book a session.');
      navigate('/login');
      return;
    }
    if (!sessionType) { toast.error('Please select a session type.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Booking request sent! Waiting for instructor confirmation.');
      navigate('/student-dashboard');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-10 pb-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to profile
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — Instructor summary */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-widest border border-brand-green/20 mb-4">
                Book a Session
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Session with<br />
                <span className="text-brand-green">{inst.name}</span>
              </h1>
              <p className="text-neutral-400 mt-3">{inst.institution}</p>
            </div>

            {/* Instructor card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/10 flex-shrink-0">
                <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-white">{inst.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{inst.alResults}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-white">{inst.rating}</span>
                  <span className="text-xs text-neutral-400">· {inst.studentsHelped} students</span>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Subjects Covered</p>
              <div className="flex flex-wrap gap-2">
                {inst.subjects.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm text-neutral-300 font-medium">{s}</span>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-4 text-sm text-neutral-400">
              📅 Available: <strong className="text-white">{inst.availability.join(', ')}</strong><br />
              Instructor will confirm the exact time after receiving your request.
            </div>
          </motion.div>

          {/* Right — Booking Form */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <form onSubmit={handleBook} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-black text-white">Configure your session</h2>

              {/* Session Type */}
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-3">Session Type *</label>
                <div className="space-y-2">
                  {SESSION_TYPES.filter(t => inst.sessionTypes.includes(t.id)).map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSessionType(t.id)}
                      className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                        sessionType === t.id
                          ? 'border-brand-green bg-brand-green/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-2xl">{t.icon}</span>
                      <div>
                        <p className={`font-bold text-sm ${sessionType === t.id ? 'text-brand-green' : 'text-white'}`}>{t.label}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">{t.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-3">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DURATIONS.map(d => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDuration(d.value)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        Number(duration) === d.value
                          ? 'border-brand-green bg-brand-green/10 text-brand-green'
                          : 'border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />Preferred Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1" />Notes for Instructor
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. I need help with integration topics in Combined Maths. Specifically 2023 A/L past paper Section B."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none text-sm resize-none"
                />
              </div>

              {/* Price summary */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Rate</span>
                  <span className="text-white font-bold">LKR {inst.pricePerHour.toLocaleString()} / hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Duration</span>
                  <span className="text-white font-bold">{selectedDuration.label}</span>
                </div>
                <div className="h-px bg-white/10 my-1" />
                <div className="flex justify-between">
                  <span className="font-black text-white">Total</span>
                  <span className="font-black text-brand-green text-lg">LKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-green/20 disabled:opacity-50 text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-brand-dark/40 border-t-brand-dark rounded-full animate-spin" />
                ) : (
                  <> Send Booking Request <ArrowRight className="w-5 h-5" /> </>
                )}
              </button>
              <p className="text-center text-xs text-neutral-500">No payment until instructor confirms your session.</p>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

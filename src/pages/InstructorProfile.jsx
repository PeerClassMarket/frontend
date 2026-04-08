import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, Calendar, Clock, BookOpen, CheckCircle2, MapPin, Award } from 'lucide-react';
import { mockInstructors, SESSION_TYPES, DURATIONS } from '../data/mockData';

const LEVEL_LABELS = { 'al-student': 'A/L Student', 'undergraduate': 'Undergraduate' };
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function InstructorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inst = mockInstructors.find(i => i.id === Number(id));
  const [activeTab, setActiveTab] = useState('about');

  if (!inst) return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white gap-4">
      <p className="text-5xl">😕</p>
      <h2 className="text-2xl font-black">Instructor not found</h2>
      <Link to="/find-instructors" className="text-brand-green font-bold hover:underline">← Back to Find Instructors</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Hero */}
      <section className="pt-10 pb-0 px-6 lg:px-10 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to results
          </button>

          <div className="flex flex-col md:flex-row items-start gap-8 pb-10">
            {/* Avatar */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden ring-4 ring-brand-green/20 flex-shrink-0 shadow-2xl">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${inst.avatar}&backgroundColor=b6e3f4,ffd5dc,c0aede`}
                alt={inst.name} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-xl text-xs font-black ${inst.level === 'undergraduate' ? 'bg-violet-500/20 text-violet-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {LEVEL_LABELS[inst.level]}
                </span>
                <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-xl text-xs font-bold border border-brand-green/20">
                  ✅ Verified
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white">{inst.name}</h1>
              <p className="text-neutral-400 mt-1">{inst.institution}</p>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-black text-white">{inst.rating}</span>
                  <span className="text-sm text-neutral-400">({inst.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  {inst.district}
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                  <Award className="w-4 h-4 text-brand-green" />
                  {inst.badge}
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                  <BookOpen className="w-4 h-4" />
                  {inst.studentsHelped} students helped
                </div>
              </div>
            </motion.div>

            {/* Booking CTA — right side on desktop */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="w-full md:w-72 bg-white/5 border border-white/10 rounded-2xl p-5 flex-shrink-0">
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-1">Starting from</p>
              <p className="text-3xl font-black text-white mb-1">
                LKR {inst.pricePerHour.toLocaleString()}
                <span className="text-sm text-neutral-400 font-normal"> /hour</span>
              </p>
              <p className="text-xs text-neutral-500 mb-4">Price varies by session type &amp; duration</p>
              <Link
                to={`/booking/${inst.id}`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-green/20"
              >
                Book a Session <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-neutral-500 mt-3">No charge until instructor confirms</p>
            </motion.div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 border-b border-white/5 -mx-6 lg:-mx-10 px-6 lg:px-10">
            {['about', 'subjects', 'availability'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-bold capitalize border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-brand-green text-brand-green' : 'border-transparent text-neutral-400 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-10 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">

          {activeTab === 'about' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-3">About</h3>
                  <p className="text-neutral-300 leading-relaxed">{inst.bio}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">GCE Results</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{inst.alResults}</p>
                      {inst.zScore && <p className="text-sm text-neutral-400">Z-Score: {inst.zScore}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Session Types Offered</h3>
                  <div className="space-y-3">
                    {SESSION_TYPES.filter(t => inst.sessionTypes.includes(t.id)).map(t => (
                      <div key={t.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                        <span className="text-2xl">{t.icon}</span>
                        <div>
                          <p className="font-bold text-white text-sm">{t.label}</p>
                          <p className="text-xs text-neutral-400">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Session Duration & Pricing</h3>
                  <div className="space-y-2">
                    {DURATIONS.map(d => (
                      <div key={d.value} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm text-neutral-300">{d.label}</span>
                        </div>
                        <span className="font-bold text-white text-sm">
                          LKR {(inst.pricePerHour * d.price_factor).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'subjects' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid md:grid-cols-2 gap-4">
                {inst.subjects.map(sub => (
                  <div key={sub} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-green/20 transition-all">
                    <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-brand-green" />
                    </div>
                    <p className="font-bold text-white">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'availability' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-neutral-400 mb-6 text-sm">Days this instructor is generally available (exact times confirmed on booking).</p>
              <div className="grid grid-cols-7 gap-3">
                {DAYS.map(day => (
                  <div key={day} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-sm font-bold transition-all ${
                    inst.availability.includes(day)
                      ? 'bg-brand-green/10 border-brand-green/30 text-brand-green'
                      : 'bg-white/5 border-white/5 text-neutral-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    {day}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-neutral-400">
                💡 Booking requests are sent to the instructor — they accept &amp; confirm the exact time with you.
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

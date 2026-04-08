import React, { useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Filter, ChevronDown, X, ArrowRight } from 'lucide-react';
import { mockInstructors, ALL_SUBJECTS, SESSION_TYPES } from '../data/mockData';
import { AppContext } from '../context/AppContext';

const LEVEL_LABELS = { 'al-student': 'A/L Student', 'undergraduate': 'Undergraduate' };

export default function FindInstructors() {
  const { studentGrade } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const [search, setSearch]       = useState('');
  const [subject, setSubject]     = useState(searchParams.get('subject') || '');
  const [level, setLevel]         = useState('');
  const [sessionType, setSession] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockInstructors.filter(inst => {
    const matchSearch  = !search  || inst.name.toLowerCase().includes(search.toLowerCase()) || inst.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchSubject = !subject || inst.subjects.includes(subject);
    const matchLevel   = !level   || inst.level === level;
    const matchSession = !sessionType || inst.sessionTypes.includes(sessionType);
    return matchSearch && matchSubject && matchLevel && matchSession;
  });

  const clearFilters = () => { setSearch(''); setSubject(''); setLevel(''); setSession(''); };
  const hasFilters = search || subject || level || sessionType;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Header */}
      <section className="pt-10 pb-16 px-6 lg:px-10 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black mb-3">
              Find an <span className="text-brand-green">Instructor</span>
            </h1>
            <p className="text-neutral-400 max-w-xl">
              Browse verified A/L high-performers and undergraduates — Sri Lanka's best peer tutors.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[240px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by name or subject…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(p => !p)}
              className={`flex items-center gap-2 px-5 py-4 rounded-2xl border font-bold text-sm transition-all ${showFilters ? 'bg-brand-green text-brand-dark border-brand-green' : 'bg-white/5 border-white/10 text-white hover:border-white/30'}`}
            >
              <Filter className="w-4 h-4" /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-brand-green" />}
            </button>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-4 py-4 text-sm text-neutral-400 hover:text-rose-400 transition-colors">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </motion.div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5"
            >
              {/* Subject */}
              <div className="relative">
                <select value={subject} onChange={e => setSubject(e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-3 px-4 pr-10 text-white focus:ring-2 focus:ring-brand-green outline-none">
                  <option value="" className="bg-gray-900">All Subjects</option>
                  {ALL_SUBJECTS.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>
              {/* Level */}
              <div className="relative">
                <select value={level} onChange={e => setLevel(e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-3 px-4 pr-10 text-white focus:ring-2 focus:ring-brand-green outline-none">
                  <option value="" className="bg-gray-900">All Instructor Levels</option>
                  <option value="al-student" className="bg-gray-900">A/L Student</option>
                  <option value="undergraduate" className="bg-gray-900">Undergraduate</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>
              {/* Session Type */}
              <div className="relative">
                <select value={sessionType} onChange={e => setSession(e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-3 px-4 pr-10 text-white focus:ring-2 focus:ring-brand-green outline-none">
                  <option value="" className="bg-gray-900">All Session Types</option>
                  {SESSION_TYPES.map(t => <option key={t.id} value={t.id} className="bg-gray-900">{t.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-neutral-400 mb-8">
            Showing <span className="text-white font-bold">{filtered.length}</span> instructor{filtered.length !== 1 ? 's' : ''}
            {subject && <> for <span className="text-brand-green font-bold">{subject}</span></>}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-2xl font-black text-white mb-2">No instructors found</h3>
              <p className="text-neutral-400 mb-6">Try adjusting your filters.</p>
              <button onClick={clearFilters} className="px-6 py-3 bg-brand-green text-brand-dark font-bold rounded-xl">Clear Filters</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((inst, i) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green/5 transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-brand-green/30 transition-all flex-shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${inst.avatar}&backgroundColor=b6e3f4,ffd5dc,c0aede`} alt={inst.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-white text-lg leading-tight group-hover:text-brand-green transition-colors truncate">{inst.name}</h3>
                      <p className="text-xs text-neutral-400 truncate">{inst.institution}</p>
                      <span className="inline-block mt-1 text-xs font-bold text-amber-400">{inst.badge}</span>
                    </div>
                  </div>

                  {/* Level badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${inst.level === 'undergraduate' ? 'bg-violet-500/20 text-violet-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      {LEVEL_LABELS[inst.level]}
                    </span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-neutral-400">{inst.district}</span>
                  </div>

                  {/* A/L Results */}
                  <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/5">
                    <p className="text-xs text-neutral-500 mb-0.5">GCE Results</p>
                    <p className="text-sm font-bold text-white">{inst.alResults}</p>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {inst.subjects.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-lg text-xs font-bold">{s}</span>
                    ))}
                  </div>

                  {/* Session Types */}
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {inst.sessionTypes.map(t => {
                      const st = SESSION_TYPES.find(s => s.id === t);
                      return st ? (
                        <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] text-neutral-400">
                          {st.icon} {st.label}
                        </span>
                      ) : null;
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs text-neutral-500">From</p>
                      <p className="font-black text-white">LKR {inst.pricePerHour.toLocaleString()}<span className="text-xs text-neutral-400 font-normal">/hr</span></p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-xl">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-black text-white">{inst.rating}</span>
                      <span className="text-xs text-neutral-500">({inst.reviewCount})</span>
                    </div>
                  </div>

                  <Link
                    to={`/instructor/${inst.id}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-brand-green hover:text-brand-dark hover:border-brand-green transition-all text-sm"
                  >
                    View Profile <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

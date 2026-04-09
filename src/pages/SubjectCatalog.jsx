import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, ArrowRight, Activity, Cpu, TrendingUp } from 'lucide-react';
import { SL_SUBJECTS, GRADE_CATEGORIES } from '../data/mockData';

export default function SubjectCatalog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('activeTab') || 'grade6-9';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    // Sync active state back to URL for easy sharing
    if (activeTab !== searchParams.get('activeTab')) {
       setSearchParams({ activeTab });
    }
  }, [activeTab, searchParams, setSearchParams]);

  const handleSubjectClick = (gradeId, subject) => {
    navigate(`/find-instructors?grade=${gradeId}&subject=${encodeURIComponent(subject)}`);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, delay }
  });

  const getEmoji = (sub) => {
    const emojis = {
      "Mathematics": "📐", "Science": "🔬", "English": "📝", "ICT": "💻",
      "Combine Mathematics": "🔢", "Physics": "⚛️", "Chemistry": "🧪", "Biology": "🧬",
      "Science for Technology": "⚙️", "Engineering Technology": "🛠️", "Bio Systems Technology": "🌱", "Information Communication Technology (ICT)": "💻",
      "Economics": "📊", "Business Studies": "💼", "Accounting": "🧾", "Business Statistics": "📈"
    };
    return emojis[sub] || "📚";
  };

  const SubjectCard = ({ subject, gradeId }) => (
    <div 
      onClick={() => handleSubjectClick(gradeId, subject)}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-brand-green/10 hover:border-brand-green/30 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
        {getEmoji(subject)}
      </div>
      <div>
        <h4 className="font-bold text-white group-hover:text-brand-green transition-colors leading-tight mb-1">{subject}</h4>
        <span className="text-xs text-neutral-500 flex items-center gap-1 group-hover:text-brand-green/70">
          Find Instructors <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-10 pb-24 px-6 lg:px-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp()} className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-6 transition-colors">
            &larr; Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-brand-green rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/20">
              <BookOpen className="w-6 h-6 text-brand-dark" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Subject Catalog</h1>
          </div>
          <p className="text-neutral-400 max-w-2xl text-lg">
            Browse our comprehensive collection of subjects offered. Select a grade category and subject to instantly find the absolute best peer instructors.
          </p>
        </motion.div>

        {/* ── Tabs Navigation ── */}
        <div className="flex flex-wrap gap-4 mb-10 border-b border-white/10 pb-4">
          {GRADE_CATEGORIES.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setActiveTab(grade.id)}
              className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all border outline-none 
                ${activeTab === grade.id 
                  ? 'bg-brand-green text-brand-dark border-brand-green shadow-lg shadow-brand-green/20' 
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'}`}
            >
              <GraduationCap className={`w-5 h-5 ${activeTab === grade.id ? 'text-brand-dark' : 'text-neutral-500'}`} />
              {grade.label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {activeTab === 'grade6-9' && (
              <motion.div key="g69" {...fadeUp()}>
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white">Middle School Level</h2>
                  <p className="text-sm text-neutral-500">Foundational subjects</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SL_SUBJECTS.ol_and_lower.map(sub => (
                    <SubjectCard key={sub} subject={sub} gradeId="grade6-9" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'grade10-11' && (
              <motion.div key="g1011" {...fadeUp()}>
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white">GCE Ordinary Level</h2>
                  <p className="text-sm text-neutral-500">Core examination subjects</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SL_SUBJECTS.ol_and_lower.map(sub => (
                    <SubjectCard key={sub} subject={sub} gradeId="grade10-11" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'grade12-13' && (
              <motion.div key="g1213" {...fadeUp()}>
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-white">GCE Advanced Level</h2>
                  <p className="text-sm text-neutral-500">Specialized High School Streams</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Science */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-rose-400" />
                        <h3 className="text-xl font-bold text-white">Science</h3>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {SL_SUBJECTS.al_stream_science.map(sub => (
                        <SubjectCard key={`sc-${sub}`} subject={sub} gradeId="grade12-13" />
                      ))}
                    </div>
                  </div>

                  {/* Technology */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-xl font-bold text-white">Technology</h3>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {SL_SUBJECTS.al_stream_technology.map(sub => (
                        <SubjectCard key={`te-${sub}`} subject={sub} gradeId="grade12-13" />
                      ))}
                    </div>
                  </div>

                  {/* Commerce */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                       <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <h3 className="text-xl font-bold text-white">Commerce</h3>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {SL_SUBJECTS.al_stream_commerce.map(sub => (
                        <SubjectCard key={`co-${sub}`} subject={sub} gradeId="grade12-13" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

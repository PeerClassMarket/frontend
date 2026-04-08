import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { GRADE_CATEGORIES, INSTRUCTOR_LEVELS } from '../data/mockData';

export default function Onboarding() {
  const { userRole, setGrade, setInstLevel, studentGrade, instructorLevel } = useContext(AppContext);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const handleContinue = () => {
    setDone(true);
    setTimeout(() => {
      if (userRole === 'instructor') navigate('/tutor-dashboard');
      else navigate('/student-dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/30">
            <GraduationCap className="w-6 h-6 text-brand-dark" />
          </div>
          <div>
            <span className="font-black text-2xl text-white">PeerClass</span>
            <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] block -mt-1">Sri Lanka</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {userRole === 'student' ? (
                <>
                  <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-3">
                    What grade are you in?
                  </h1>
                  <p className="text-neutral-400 text-center mb-10">
                    We'll match you with instructors suited to your level.
                  </p>
                  <div className="grid gap-4">
                    {GRADE_CATEGORIES.map((cat) => (
                      <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGrade(cat.id)}
                        className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left ${
                          studentGrade === cat.id
                            ? 'border-brand-green bg-brand-green/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <h3 className={`text-xl font-black ${studentGrade === cat.id ? 'text-brand-green' : 'text-white'}`}>
                            {cat.label}
                          </h3>
                          <p className="text-sm text-neutral-400 mt-1">{cat.description}</p>
                          <p className="text-xs text-neutral-500 mt-2">
                            Taught by: {cat.matchedInstructorLevels.includes('undergraduate') ? 'Undergraduates' : 'A/L High Performers'}
                          </p>
                        </div>
                        {studentGrade === cat.id && (
                          <CheckCircle2 className="w-7 h-7 text-brand-green flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-3">
                    What's your level?
                  </h1>
                  <p className="text-neutral-400 text-center mb-10">
                    This determines which students you can teach.
                  </p>
                  <div className="grid gap-4">
                    {INSTRUCTOR_LEVELS.map((lvl) => (
                      <motion.button
                        key={lvl.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInstLevel(lvl.id)}
                        className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left ${
                          instructorLevel === lvl.id
                            ? 'border-brand-green bg-brand-green/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <h3 className={`text-xl font-black ${instructorLevel === lvl.id ? 'text-brand-green' : 'text-white'}`}>
                            {lvl.label}
                          </h3>
                          <p className="text-sm text-neutral-400 mt-1">{lvl.description}</p>
                        </div>
                        {instructorLevel === lvl.id && (
                          <CheckCircle2 className="w-7 h-7 text-brand-green flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleContinue}
                disabled={userRole === 'student' ? !studentGrade : !instructorLevel}
                className="mt-8 w-full py-5 bg-brand-green text-brand-dark font-black rounded-2xl flex items-center justify-center gap-2 text-lg shadow-xl shadow-brand-green/20 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue to Dashboard <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center shadow-2xl shadow-brand-green/40"
              >
                <CheckCircle2 className="w-12 h-12 text-brand-dark" />
              </motion.div>
              <h2 className="text-3xl font-black text-white">You're all set! 🎉</h2>
              <p className="text-neutral-400">Taking you to your dashboard…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

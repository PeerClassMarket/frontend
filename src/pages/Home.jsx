import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Users, Star, CheckCircle2,
  GraduationCap, Award, Zap, TrendingUp
} from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick Your Grade",
    desc: "Tell us your school level — Grade 6–9, O/L (10–11), or A/L (12–13). We match you to the right instructors.",
    color: "from-violet-500 to-purple-600",
    icon: <GraduationCap className="w-7 h-7" />,
  },
  {
    step: "02",
    title: "Choose an Instructor",
    desc: "Browse top A/L students and undergraduates who excelled in your subject. Filter by subject, session type, and price.",
    color: "from-blue-500 to-cyan-500",
    icon: <Users className="w-7 h-7" />,
  },
  {
    step: "03",
    title: "Book a Session",
    desc: "Select Paper Discussion or Theory class. Pick your preferred time and duration. Send the booking request.",
    color: "from-emerald-500 to-teal-500",
    icon: <BookOpen className="w-7 h-7" />,
  },
];

const SUBJECTS = [
  { name: "Combined Maths", emoji: "🔢", count: "18 instructors" },
  { name: "Physics", emoji: "⚛️", count: "14 instructors" },
  { name: "Chemistry", emoji: "🧪", count: "12 instructors" },
  { name: "Biology", emoji: "🧬", count: "11 instructors" },
  { name: "English", emoji: "📝", count: "9 instructors" },
  { name: "Economics", emoji: "📊", count: "8 instructors" },
  { name: "ICT", emoji: "💻", count: "10 instructors" },
  { name: "History", emoji: "📜", count: "6 instructors" },
];

const STATS = [
  { value: "500+", label: "Students Connected", icon: <Users className="w-5 h-5" /> },
  { value: "80+", label: "Verified Instructors", icon: <Award className="w-5 h-5" /> },
  { value: "1,200+", label: "Sessions Completed", icon: <Zap className="w-5 h-5" /> },
  { value: "4.8★", label: "Average Rating", icon: <Star className="w-5 h-5" /> },
];

const INSTRUCTORS_PREVIEW = [
  {
    name: "Kavindi Perera",
    badge: "🏆 Island Rank 12",
    institution: "University of Colombo",
    subjects: ["Combined Maths", "Physics"],
    price: 800,
    rating: 4.9,
    avatar: "Kavindi",
  },
  {
    name: "Tharindu Rajapaksha",
    badge: "🏆 Island Rank 8",
    institution: "Univ. of Peradeniya — Engineering",
    subjects: ["Physics", "ICT"],
    price: 900,
    rating: 4.8,
    avatar: "Tharindu",
  },
  {
    name: "Nethmi Amarasinghe",
    badge: "⭐ Top Biology Student",
    institution: "Visakha Vidyalaya",
    subjects: ["Biology", "Chemistry"],
    price: 600,
    rating: 4.7,
    avatar: "Nethmi",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-28 px-6 lg:px-10 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Pill tag */}
          <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold border border-brand-green/20">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              Built for Sri Lanka O/L &amp; A/L Students
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight tracking-tight"
          >
            Learn from{" "}
            <span className="text-brand-green relative">
              Top Students
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            Who've Been There
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-8 text-lg md:text-xl text-neutral-400 text-center max-w-2xl mx-auto leading-relaxed"
          >
            Connect with high-ranking A/L students &amp; undergraduates for{" "}
            <strong className="text-white">paper discussions, theory classes</strong> and more.
            Real peer learning. Sri Lanka's exam system, explained by those who aced it.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-brand-green/20 text-lg"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/find-instructors"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg"
            >
              Browse Instructors
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {STATS.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 text-brand-green mb-1">
                  {s.icon}
                  <span className="text-2xl font-black text-white">{s.value}</span>
                </div>
                <p className="text-sm text-neutral-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 lg:px-10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black">How It Works</h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              Three simple steps to your next great study session.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)} className="relative group">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full hover:border-brand-green/30 transition-all hover:shadow-xl hover:shadow-brand-green/5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-white/5 absolute top-6 right-8">{step.step}</span>
                  <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-neutral-600 z-10">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subject Categories ───────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black">Browse by Subject</h2>
              <p className="mt-3 text-neutral-400 max-w-md">
                Sri Lanka O/L and A/L curriculum subjects — all covered.
              </p>
            </div>
            <Link
              to="/find-instructors"
              className="flex items-center gap-2 text-brand-green font-bold hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUBJECTS.map((sub, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}>
                <Link
                  to={`/find-instructors?subject=${encodeURIComponent(sub.name)}`}
                  className="group flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-green/40 hover:bg-brand-green/5 transition-all cursor-pointer text-center"
                >
                  <span className="text-4xl">{sub.emoji}</span>
                  <h3 className="font-black text-white group-hover:text-brand-green transition-colors">{sub.name}</h3>
                  <span className="text-xs text-neutral-500">{sub.count}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Instructors ─────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black">Meet Top Instructors</h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              Every instructor on PeerClass has proven results — A/L stars and university students who aced it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {INSTRUCTORS_PREVIEW.map((inst, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green/5 transition-all group">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-brand-green/20 flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${inst.avatar}&backgroundColor=b6e3f4`}
                        alt={inst.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg group-hover:text-brand-green transition-colors">{inst.name}</h3>
                      <p className="text-xs text-neutral-400">{inst.institution}</p>
                      <span className="text-xs font-bold text-brand-green">{inst.badge}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {inst.subjects.map((s) => (
                      <span key={s} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Starting from</p>
                      <p className="font-black text-white">LKR {inst.price.toLocaleString()}<span className="text-neutral-400 font-normal text-xs">/hr</span></p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-bold text-white">{inst.rating}</span>
                    </div>
                  </div>

                  <Link
                    to="/find-instructors"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-brand-green hover:text-brand-dark hover:border-brand-green transition-all text-sm"
                  >
                    View Profile <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-10">
            <Link
              to="/find-instructors"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-white transition-all shadow-xl shadow-brand-green/20"
            >
              Browse All Instructors <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Who Can Join ─────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Who is <span className="text-brand-green">PeerClass</span> for?
            </h2>
            <p className="mt-5 text-neutral-400 leading-relaxed">
              Whether you're a student looking for guidance or a top student wanting to share knowledge and earn — PeerClass is your platform.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: "Grade 6–9 Students", desc: "Get tutored by high-performing A/L students" },
                { label: "O/L Students (Grade 10–11)", desc: "Paper discussions &amp; theory with top A/L achievers" },
                { label: "A/L Students (Grade 12–13)", desc: "Learn from university undergraduates who aced A/L" },
                { label: "Instructors (A/L &amp; Undergrads)", desc: "Share knowledge, build experience, earn income" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-bold text-white" dangerouslySetInnerHTML={{ __html: item.label }} />
                    <p className="text-sm text-neutral-400" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-10">
              <Link to="/register" className="flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all">
                Join as Student
              </Link>
              <Link to="/register" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                Join as Instructor
              </Link>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
            {[
              { emoji: "🎯", title: "Paper Discussion", desc: "Work through past papers together with an instructor who's done it before." },
              { emoji: "📖", title: "Theory Classes", desc: "Master concepts from the Sri Lanka O/L & A/L syllabus, explained clearly." },
              { emoji: "⏱️", title: "Flexible Duration", desc: "30 min, 1 hour or 2 hours — book exactly what you need." },
              { emoji: "💳", title: "Affordable Rates", desc: "Sessions from LKR 300 — quality guidance at peer-level prices." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-green/20 transition-all">
                <span className="text-3xl">{card.emoji}</span>
                <h4 className="font-black text-white mt-3 mb-1 text-sm">{card.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="py-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-green rounded-xl flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-brand-dark" />
            </div>
            <div>
              <span className="font-black text-lg text-white">PeerClass</span>
              <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] block -mt-1">Sri Lanka</span>
            </div>
          </div>
          <p className="text-neutral-500 text-sm">© 2026 PeerClass Lanka (Pvt) Ltd. All rights reserved.</p>
          <div className="flex gap-6 text-neutral-400 text-sm">
            <a href="#" className="hover:text-brand-green transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-green transition-colors">Terms</a>
            <Link to="/contact" className="hover:text-brand-green transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

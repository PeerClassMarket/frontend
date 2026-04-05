import React from "react";
import { 
  Play, 
  Search, 
  Database, 
  Languages, 
  PieChart, 
  PenTool, 
  Code, 
  Palette, 
  Settings, 
  Briefcase,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

// Import images (using the filenames from src/assets)
import HeroImg1 from "../assets/hero_student_1_curly_1775389604653.png";
import HeroImg2 from "../assets/hero_student_2_yellow_1775389626749.png";
import HeroImg3 from "../assets/hero_student_3_pink_1775389739518.png";
import AboutImg from "../assets/about_us_student_thumbup_1775389821032.png";

export default function Home() {
  const categories = [
    { name: "Data Science", icon: <Database className="w-8 h-8 text-indigo-600" />, bg: "bg-brand-purple" },
    { name: "English", icon: <Languages className="w-8 h-8 text-cyan-600" />, bg: "bg-brand-cyan" },
    { name: "Finance", icon: <PieChart className="w-8 h-8 text-pink-600" />, bg: "bg-brand-pink" },
    { name: "Content Writing", icon: <PenTool className="w-8 h-8 text-blue-600" />, bg: "bg-brand-blue" },
    { name: "Development", icon: <Code className="w-8 h-8 text-emerald-600" />, bg: "bg-brand-green-light" },
    { name: "Art & Design", icon: <Palette className="w-8 h-8 text-rose-600" />, bg: "bg-brand-rose" },
    { name: "Management", icon: <Settings className="w-8 h-8 text-purple-600" />, bg: "bg-brand-purple-light" },
    { name: "Business", icon: <Briefcase className="w-8 h-8 text-green-600" />, bg: "bg-brand-emerald" },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-32 px-8 overflow-hidden">
        {/* Background Illustrations (Subtle SVGs/Icons) */}
        <div className="absolute top-20 right-10 animate-float opacity-20">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.5-1 1-4c2 0 3 .5 3 .5"/><path d="M15 15v5s-1 .5-4 1c0-2 .5-3 .5-3"/></svg>
        </div>
        <div className="absolute bottom-40 left-10 animate-float-delayed opacity-20">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
              Grow Your <span className="text-brand-green">Skills</span> to Advance Your Career path.
            </h1>
            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
              Educating, Inspiring, & Transforming Young Women. A Tuition-Free Private Middle School dedicated to excellence.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <button className="px-10 py-5 bg-brand-green text-brand-dark font-black rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-brand-green/20">
                Get Started
              </button>
              <button className="flex items-center gap-3 font-bold group">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Play className="h-6 w-6 text-brand-green fill-brand-green" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-brand-dark bg-slate-800 flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Avatar${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-brand-dark bg-brand-green flex items-center justify-center text-brand-dark font-bold text-xs ring-2 ring-brand-green/20">
                  +12k
                </div>
              </div>
              <div>
                <p className="font-bold text-lg">365k+ <span className="text-neutral-500 font-normal">enrolled students</span></p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center gap-6"
          >
            <div className="space-y-6 pt-20">
              <div className="arched-image w-48 h-72 md:w-56 md:h-80">
                <img src={HeroImg1} className="w-full h-full object-cover" alt="Student" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="arched-image w-48 h-72 md:w-56 md:h-80 ring-8 ring-brand-green/20">
                <img src={HeroImg2} className="w-full h-full object-cover" alt="Student" />
              </div>
            </div>
            <div className="space-y-6 pt-20">
              <div className="arched-image w-48 h-72 md:w-56 md:h-80">
                <img src={HeroImg3} className="w-full h-full object-cover" alt="Student" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-8 bg-slate-100 dark:bg-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
            <div className="space-y-6 max-w-xl">
              <h2 className="text-5xl font-black text-brand-dark dark:text-white">Explore Our Categories</h2>
              <p className="text-neutral-500 dark:text-neutral-400">
                Discover the perfect course tailored to your goals. Our curated categories span the most in-demand industry skills.
              </p>
              <button className="px-8 py-4 bg-brand-dark dark:bg-white/5 border border-slate-200 dark:border-white/20 text-white font-bold rounded-xl hover:bg-brand-green hover:text-brand-dark hover:border-brand-green transition-all">
                Explore Categories
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`${cat.bg} p-8 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer transition-shadow hover:shadow-xl`}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-brand-dark font-black text-xl whitespace-nowrap">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-8 bg-white dark:bg-brand-dark transition-colors duration-500 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-green/20 blur-3xl rounded-full" />
            <div className="relative rounded-[3rem] overflow-hidden bg-brand-accent p-8 aspect-[4/5] max-w-md mx-auto">
              <img 
                src={AboutImg} 
                alt="Student" 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
              <div className="absolute bottom-16 right-[-2rem] bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 ring-1 ring-slate-100">
                <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-brand-dark fill-brand-dark" />
                </div>
                <div className="pr-4">
                  <p className="text-brand-dark text-xs font-bold">Watch Video</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl font-black leading-tight text-brand-dark dark:text-white">
                We Are Maximize Your <br />
                <span className="text-brand-green">Learning Growth</span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                Our approach combines practical training with expert guidance to ensure you reach your maximum potential.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Training Services",
                "Expert Trainer",
                "Big Experience",
                "Lifetime access"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 border-2 border-brand-green rounded-md flex items-center justify-center group-hover:bg-brand-green transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-brand-green group-hover:text-brand-dark" />
                  </div>
                  <span className="font-bold text-lg text-brand-dark dark:text-white">{item}</span>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 px-10 py-5 bg-brand-green text-brand-dark font-black rounded-full hover:bg-white transition-all transform hover:scale-105">
              Explore More + <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer (Simplified matching design) */}
      <footer className="py-12 border-t border-white/5 bg-brand-dark/50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-dark rounded-full"></div>
            </div>
            <span className="font-bold text-xl text-white">Educax</span>
          </div>
          <p className="text-neutral-500 text-sm">© 2026 Educax. All rights reserved.</p>
          <div className="flex gap-8 text-neutral-400 text-sm">
            <a href="#" className="hover:text-brand-green">Privacy</a>
            <a href="#" className="hover:text-brand-green">Terms</a>
            <a href="#" className="hover:text-brand-green">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

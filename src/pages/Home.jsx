import React from "react";
import { useNavigate } from "react-router-dom";

import { 
  BookOpen, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  GraduationCap, 
  Layers,
  Award
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();


  const categories = [
    { name: "Computer Science", courses: 120, icon: <Layers className="text-indigo-400" /> },
    { name: "Mathematics", courses: 85, icon: <BookOpen className="text-pink-400" /> },
    { name: "Business & Finance", courses: 95, icon: <Award className="text-amber-400" /> },
    { name: "Digital Arts", courses: 70, icon: <GraduationCap className="text-emerald-400" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 font-sans">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium">
              <Star className="h-4 w-4 fill-indigo-400 text-indigo-400" />
              <span>The Next Generation Peer-to-Peer Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Master New Skills with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
                Verified Peer Mentors
              </span>
            </h1>
            
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Join a community of 50,000+ students learning directly from industry experts. 
              Interactive classes, peer feedback, and career-ready certifications.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2">
                Explore Courses <ArrowRight className="h-5 w-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
                Become a Mentor
              </button>
            </div>

            <div className="pt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Industry Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Expert Mentors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Popular Categories</h2>
              <p className="text-neutral-400 max-w-md">Explore our most popular learning paths and start your journey today.</p>
            </div>
            <button className="text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1 transition-colors">
              View all categories <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
                <p className="text-sm text-neutral-500 font-medium">{cat.courses} Courses available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Why Us Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-600/20 blur-2xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                  alt="Learning Community" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-bold leading-tight">
                Why PeerClassMarket is the <br />
                <span className="text-indigo-400">Best Choice for You</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Collaborative Learning</h4>
                    <p className="text-neutral-400 text-sm">Learn in cohorts with students from around the world. Build projects together.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Peer Assessments</h4>
                    <p className="text-neutral-400 text-sm">Get real-world feedback from your peers and mentors on every assignment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Vetted Mentors</h4>
                    <p className="text-neutral-400 text-sm">Every mentor goes through a rigorous vetting process to ensure quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-800 p-12 md:p-20 overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white">Ready to start your journey?</h2>
              <p className="text-indigo-100 text-lg max-w-xl mx-auto">
                Join thousands of students who are already learning and growing with PeerClassMarket.
              </p>
              <div className="pt-6">
                <button className="px-10 py-5 bg-white text-indigo-600 font-black rounded-2xl hover:bg-neutral-100 transition-all hover:scale-105 shadow-2xl">
                  Sign Up for Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg">
                <BookOpen className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white">PeerClassMarket</span>
            </div>
            
            <div className="flex gap-8 text-neutral-500 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            
            <p className="text-neutral-500 text-sm">© 2024 PeerClassMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Settings, User } from 'lucide-react';

export default function NavBar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    alert('Logout clicked');
    // Implement redirect to login or clear simple state if needed
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="p-2 bg-indigo-600 rounded-lg">
          <BookOpen className="text-white h-6 w-6" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">PeerClass<span className="text-indigo-400">Market</span></span>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Courses</button>
          <button onClick={() => navigate('/')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Mentors</button>
          <button onClick={() => navigate('/')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Resources</button>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <img
              src={'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
              alt="avatar"
              className="h-8 w-8 rounded-full bg-indigo-500"
            />
            <span className="text-sm font-medium text-white hidden sm:inline">Guest User</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-white/5 mb-2">
                <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Account</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <User className="h-4 w-4 text-indigo-400" /> Profile
              </button>
              <button
                onClick={() => alert('Settings coming soon!')}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Settings className="h-4 w-4 text-emerald-400" /> Settings
              </button>
              <div className="my-1 border-t border-white/5"></div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

import React, { useContext, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, GraduationCap } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, isLoggedin, mockLogout, logout, userRole, mockUser } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/categories' },
    { name: 'Find Instructors', path: '/find-instructors' },
    { name: 'Contact', path: '/contact' },
  ];

  const dashboardPath = userRole === 'instructor' ? '/tutor-dashboard' : '/student-dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">

        {/* Left: Logo */}
        <div
          className="flex-1 flex items-center gap-2.5 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-brand-dark" />
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-xl tracking-tight text-white block leading-tight">TopTutors</span>
            <span className="text-[10px] text-brand-green font-extrabold uppercase tracking-[0.2em] block">Sri Lanka</span>
          </div>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-xs px-5 py-2 rounded-full font-bold transition-all ${isActive
                  ? 'bg-brand-green text-brand-dark shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {!isLoggedin ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-neutral-400 font-bold hover:text-white transition-colors px-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all text-sm shadow-xl shadow-brand-green/10"
              >
                Join Free
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              {/* Profile Shortcut */}
              <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 font-black text-xs">
                  {mockUser?.name?.[0] || 'U'}
                </div>
                <div className="hidden xl:block">
                  <p className="text-[11px] font-black text-white leading-none">{mockUser?.name?.split(' ')[0]}</p>
                  <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">{userRole}</p>
                </div>
              </div>

              <Link
                to={dashboardPath}
                className="px-4 py-2 text-xs text-white font-bold bg-white/5 border border-white/10 rounded-lg hover:bg-brand-green hover:text-brand-dark hover:border-brand-green transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-neutral-500 hover:text-rose-400 transition-all rounded-lg hover:bg-rose-500/10"
                title="Logout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 p-6 space-y-4 lg:hidden shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block text-white text-lg font-black hover:text-brand-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-white/10 space-y-3">
            {!isLoggedin ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center py-4 border border-white/10 text-white font-black rounded-xl">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-center py-4 bg-brand-green text-brand-dark font-black rounded-xl">Join Free</Link>
              </>
            ) : (
              <>
                <Link to={dashboardPath} onClick={() => setMobileOpen(false)} className="block text-center py-4 bg-white/5 text-white font-black rounded-xl border border-white/10">My Dashboard</Link>
                <button onClick={handleLogout} className="w-full py-4 text-rose-400 font-bold rounded-xl border border-rose-500/20 bg-rose-500/5">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

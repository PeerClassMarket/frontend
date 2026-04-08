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
    { name: 'Find Instructors', path: '/find-instructors' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  const dashboardPath = userRole === 'instructor' ? '/tutor-dashboard' : '/student-dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-6 lg:px-10 py-4 bg-brand-dark sticky top-0 z-50 border-b border-white/5">
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/30">
          <GraduationCap className="w-5 h-5 text-brand-dark" />
        </div>
        <div>
          <span className="font-black text-xl tracking-tight text-white">PeerClass</span>
          <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] block -mt-1">Sri Lanka</span>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${isActive ? 'text-brand-green' : 'text-neutral-400 hover:text-white'}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-green hover:text-brand-dark transition-all"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {!isLoggedin ? (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-white font-semibold hover:text-brand-green transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 bg-brand-green text-brand-dark font-black rounded-xl hover:bg-white transition-all text-sm shadow-lg shadow-brand-green/20"
            >
              Join Free
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            {/* Role badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-bold text-white capitalize">
                {mockUser?.name?.split(' ')[0] || 'User'}
              </span>
              <span className="text-[10px] text-neutral-400 capitalize">· {userRole || 'member'}</span>
            </div>
            <Link
              to={dashboardPath}
              className="px-4 py-2 text-sm text-white font-bold bg-white/10 rounded-xl hover:bg-brand-green hover:text-brand-dark transition-all"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white font-bold rounded-xl hover:bg-rose-500/20 hover:text-rose-400 transition-all"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark border-t border-white/5 p-6 space-y-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block text-white font-semibold hover:text-brand-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-3">
            {!isLoggedin ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center py-3 border border-white/10 text-white font-bold rounded-xl hover:border-brand-green">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-center py-3 bg-brand-green text-brand-dark font-black rounded-xl">Join Free</Link>
              </>
            ) : (
              <>
                <Link to={dashboardPath} onClick={() => setMobileOpen(false)} className="block text-center py-3 border border-white/10 text-white font-bold rounded-xl">Dashboard</Link>
                <button onClick={handleLogout} className="w-full py-3 text-rose-400 font-bold rounded-xl border border-rose-500/20">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

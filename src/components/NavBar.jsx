import React, { useContext } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, isLoggedin, login, logout } = useContext(AppContext);

  const navLinks = [
    { name: 'Home', path: '/', hasDropdown: true },
    { name: 'Courses', path: '/courses', hasDropdown: true },
    { name: 'Blogs', path: '/blogs', hasDropdown: true },
    { name: 'Pages', path: '/pages', hasDropdown: true },
    { name: 'Contact Us', path: '/contact', hasDropdown: false },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-brand-dark sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-brand-dark rounded-full"></div>
        </div>
        <span className="font-bold text-2xl tracking-tight text-white">Educax</span>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <NavLink 
            key={link.name} 
            to={link.path}
            className={({ isActive }) => `flex items-center gap-1 cursor-pointer group transition-colors ${isActive ? 'text-brand-green' : 'text-neutral-300'}`}
          >
            <span className="text-sm font-semibold group-hover:text-brand-green">
              {link.name}
            </span>
            {link.hasDropdown && (
              <ChevronDown className="h-4 w-4 text-neutral-400 group-hover:text-brand-green transition-colors" />
            )}
          </NavLink>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-green hover:text-brand-dark transition-all shadow-xl"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="hidden sm:flex items-center gap-4">
          {!isLoggedin ? (
            <>
              <button 
                onClick={login} 
                className="text-white font-bold hover:text-brand-green transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={login}
                className="px-8 py-3 bg-brand-green text-brand-dark font-black rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-brand-green/20"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <Link to="/student-dashboard" className="text-white font-bold hover:text-brand-green transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-rose-500 hover:text-white transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

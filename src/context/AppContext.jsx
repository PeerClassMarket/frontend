import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Mock Role State ─────────────────────────────────────────
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("pc_role") || null; // 'student' | 'instructor' | null
  });
  const [studentGrade, setStudentGrade] = useState(() => {
    return localStorage.getItem("pc_grade") || null; // 'grade6-9' | 'grade10-11' | 'grade12-13'
  });
  const [instructorLevel, setInstructorLevel] = useState(() => {
    return localStorage.getItem("pc_inst_level") || null; // 'al-student' | 'undergraduate'
  });
  const [mockUser, setMockUser] = useState(() => {
    const saved = localStorage.getItem("pc_mock_user");
    return saved ? JSON.parse(saved) : null;
  });
  // ───────────────────────────────────────────────────────────

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  // Supabase Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Axios Interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, [session]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // ── Mock Auth Helpers ────────────────────────────────────────
  const mockLogin = (role, user) => {
    setUserRole(role);
    setMockUser(user);
    localStorage.setItem("pc_role", role);
    localStorage.setItem("pc_mock_user", JSON.stringify(user));
  };

  const mockLogout = () => {
    setUserRole(null);
    setMockUser(null);
    setStudentGrade(null);
    setInstructorLevel(null);
    localStorage.removeItem("pc_role");
    localStorage.removeItem("pc_mock_user");
    localStorage.removeItem("pc_grade");
    localStorage.removeItem("pc_inst_level");
  };

  const setGrade = (grade) => {
    setStudentGrade(grade);
    localStorage.setItem("pc_grade", grade);
  };

  const setInstLevel = (level) => {
    setInstructorLevel(level);
    localStorage.setItem("pc_inst_level", level);
  };
  // ───────────────────────────────────────────────────────────

  // Derived: treat mock login OR supabase session as "logged in"
  const isLoggedin = !!session || !!mockUser;

  const value = {
    backendUrl,
    isLoggedin,
    userData: mockUser || userData || session?.user,
    setUserData,
    isDarkMode,
    toggleTheme,
    isLoading,

    // Mock role state
    userRole,       // 'student' | 'instructor' | null
    studentGrade,   // 'grade6-9' | 'grade10-11' | 'grade12-13'
    instructorLevel, // 'al-student' | 'undergraduate'
    mockUser,
    mockLogin,
    mockLogout,
    setGrade,
    setInstLevel,

    // Legacy supabase helpers (kept for backward compat)
    login:  () => supabase.auth.signInWithOAuth({ provider: "google" }),
    logout: () => {
      mockLogout();
      supabase.auth.signOut();
    },
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

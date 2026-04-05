import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usage, setUsage] = useState(null);

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

  // Axios Interceptor to add Supabase Token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, [session]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const getUserData = async () => {
    if (!session) {
      setUserData(null);
      return;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      setUserData(session.user);
    }
  };

  const getUsage = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/usage/stats`);
      if (data.success) {
        setUsage(data.data);
      }
    } catch (err) {
      console.warn("Usage fetch failed");
    }
  };

  useEffect(() => {
    if (session) {
      getUserData();
      getUsage();
    }
  }, [session]);

  const value = {
    backendUrl,
    isLoggedin: !!session,
    userData: userData || session?.user,
    setUserData,
    getUserData,
    usage,
    getUsage,
    isDarkMode,
    toggleTheme,
    isLoading,
    login: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
    logout: () => supabase.auth.signOut()
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

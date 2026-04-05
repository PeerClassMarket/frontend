import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [usage, setUsage] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const toggleTheme = () => {
    console.log("Toggling theme to:", !isDarkMode ? "dark" : "light");
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
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedin(true);
      } else {
        setUserData(null);
        setIsLoggedin(false);
      }
    } catch (error) {
      setUserData(null);
      setIsLoggedin(false);
    }
  };

  const getUsage = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/usage/stats`, {
        withCredentials: true,
      });
      if (data.success) {
        setUsage(data.data);
      }
    } catch (err) {
      console.warn("Usage fetch failed (backend possibly down)");
    }
  };

  useEffect(() => {
    getUserData();
    getUsage();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    usage,
    getUsage,
    isDarkMode,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

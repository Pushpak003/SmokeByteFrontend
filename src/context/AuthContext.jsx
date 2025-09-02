// src/context/AuthContext.jsx

import { createContext, useState, useEffect } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const checkUserLoggedIn = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const response = await api.get('/user/me');
          setUser(response.data);
        } catch (error) {
          console.error("Auth check failed, interceptor will handle logout.", error);
          setUser(null); 
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const { accessToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    setUser(user);
    return user;
  };

  const signup = async (userData) => {
    await api.post('/auth/signup', userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    api.post('/auth/logout');
  };

  const authContextValue = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
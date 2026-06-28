import { createContext, useState, useEffect } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const res = await api.get("/user/me");
          setUser(res.data);
        } catch {
          setUser(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const { accessToken, refreshToken, user } = res.data;
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    setUser(user);
    return user;
  };

  const signup = async (userData) => {
    const res = await api.post("/auth/signup", userData);
    const { accessToken, refreshToken, user } = res.data;
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    setUser(user);
    return user;
  };

  // Called by OAuthCallbackPage after Google redirect
  const loginWithTokens = async (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    // FIX: send refreshToken in body so backend can delete it
    if (refreshToken) api.post("/auth/logout", { refreshToken }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithTokens, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
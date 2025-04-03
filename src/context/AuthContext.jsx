import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (storedToken && storedUserId && tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      if (expirationDate > new Date()) {
        setUser({ token: storedToken, userId: storedUserId });
        setToken(storedToken);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("userId");
      }
    }
  }, []);

  const login = (newToken, userId) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14);
    localStorage.setItem("tokenExpiration", expirationDate.toISOString());

    setUser({ token: newToken, userId });
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
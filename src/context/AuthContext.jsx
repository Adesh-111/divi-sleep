import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (storedToken && tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      if (expirationDate > new Date()) {
        setUser({ token: storedToken });
        setToken(storedToken);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14); // Set expiration time to 2 weeks
    localStorage.setItem("tokenExpiration", expirationDate.toISOString());
    setUser(token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
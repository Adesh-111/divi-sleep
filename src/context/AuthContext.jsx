import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (token && tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      if (expirationDate > new Date()) {
        setUser(token);
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
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
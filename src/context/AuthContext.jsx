import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (storedToken && storedUserId && tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      if (expirationDate > new Date()) {
        setUser({ token: storedToken, userId: storedUserId });
      } else {
        logout();
      }
    }
    setLoading(false); // Ensure loading completes
  }, []);

  const login = (newToken, userId) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14);

    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("tokenExpiration", expirationDate.toISOString());

    setUser({ token: newToken, userId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

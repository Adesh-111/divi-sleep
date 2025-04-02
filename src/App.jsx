import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import SleepTracker from "./pages/SleepTracker/SleepTracker";
import SleepHistory from "./pages/SleepHistory/SleepHistory";
import Welcome from "./pages/Welcome/Welcome";
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tracker" element={<SleepTracker />} />
          <Route path="/history" element={<SleepHistory />} />
          <Analytics />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
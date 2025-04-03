import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SleepTracker from './pages/SleepTracker/SleepTracker';
import SleepHistory from './pages/SleepHistory/SleepHistory';
import Welcome from './pages/Welcome/Welcome';
import { Analytics } from '@vercel/analytics/react';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute element={<Welcome />} />} />
          <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/tracker" element={<ProtectedRoute element={<SleepTracker />} />} />
          <Route path="/history" element={<ProtectedRoute element={<SleepHistory />} />} />
        </Routes>
      </Router>
      <Analytics />
    </AuthProvider>
  );
};

export default App;

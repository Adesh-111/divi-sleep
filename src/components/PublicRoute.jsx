import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // ✅ Prevents issues during state initialization
  }

  return user ? <Navigate to="/dashboard" /> : element; // ✅ Redirect logged-in users
};

export default PublicRoute;

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext.jsx';
import {useAuth} from './hooks/useAuth.js'
import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './features/auth/routes/LoginPage.jsx';
import SignupPage from './features/auth/routes/SignupPage.jsx';
import DashboardPage from './features/conversion/routes/Dashboard.jsx';
import HistoryPage from './features/history/routes/HIstoryPage.jsx';
import './index.css';
// ProtectedRoute component to guard dashboard and history
const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    // If no user, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // If user exists, render the child route (Dashboard, etc.)
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
          
          {/* Fallback Route for any other path */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
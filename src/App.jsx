// src/App.jsx - FINAL VERSION
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './features/auth/routes/LoginPage.jsx';
import SignupPage from './features/auth/routes/SignupPage.jsx';
import DashboardPage from './features/conversion/routes/Dashboard.jsx';
import HistoryPage from './features/history/routes/HIstoryPage.jsx'
import SupportedFormatsPage from './pages/SupportedFormatsPage.jsx';

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) { return <Navigate to="/login" replace />; }
  return <Outlet />;
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
          <Route path="formats" element={<SupportedFormatsPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
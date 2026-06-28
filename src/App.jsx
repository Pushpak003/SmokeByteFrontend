import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider, useToastContext } from './context/ToastContext';
import { ActiveJobProvider, useActiveJobContext } from './context/ActiveJobContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './features/auth/routes/LoginPage.jsx';
import SignupPage from './features/auth/routes/SignupPage.jsx';
import OAuthCallbackPage from './features/auth/routes/OAuthCallbackPage.jsx';
import DashboardPage from './features/conversion/routes/Dashboard.jsx';
import HistoryPage from './features/history/routes/HIstoryPage.jsx';
import SupportedFormatsPage from './pages/SupportedFormatsPage.jsx';
import { ToastContainer } from './components/ui/Toast';
import useConversionPoller, { sendBrowserNotif } from './hooks/useConversionPoller';

const GuestRoute = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

// Reads from shared ActiveJobContext — always sees the latest jobId
const GlobalPoller = () => {
  const { jobId, clearJob } = useActiveJobContext();
  const toast = useToastContext();

  useConversionPoller({
    jobId,
    onTick: () => {},
    onDone: (data) => {
      clearJob();
      if (data.status === 'completed') {
        toast.success('✅ File converted! Go to Dashboard to download.');
        sendBrowserNotif('SmokeByte — Done!', `${data.filename || 'Your file'} is ready to download.`);
      } else {
        toast.error('❌ Conversion failed. Please try again.');
        sendBrowserNotif('SmokeByte — Failed', data.error || 'Conversion failed.');
      }
    },
  });

  return null;
};

const GlobalToastContainer = () => {
  const { toasts, remove } = useToastContext();
  return <ToastContainer toasts={toasts} remove={remove} />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ActiveJobProvider>
          <GlobalPoller />
          <GlobalToastContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="formats" element={<SupportedFormatsPage />} />
              <Route path="auth/callback" element={<OAuthCallbackPage />} />

              <Route element={<GuestRoute />}>
                <Route path="login"  element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="history"   element={<HistoryPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </ActiveJobProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
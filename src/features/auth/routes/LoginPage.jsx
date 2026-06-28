import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import { FcGoogle } from 'react-icons/fc';

const GOOGLE_URL = `${import.meta.env.VITE_API_URL}/auth/google`;

const LoginPage = () => {
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();
  const [searchParams]        = useSearchParams();
  const oauthError            = searchParams.get('error');

  const handleLogin = async (credentials) => {
    setError('');
    setLoading(true);
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Welcome Back!</h2>
      <p className="auth-subtitle">Sign in to your SmokeByte account</p>

      {oauthError && (
        <p className="error-message" style={{ marginBottom: '1rem' }}>
          Google sign-in failed. Please try again.
        </p>
      )}

      <a href={GOOGLE_URL} className="btn-google">
        <FcGoogle size={20} />
        Continue with Google
      </a>

      <div className="auth-divider"><span>or</span></div>

      <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
      <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginPage;
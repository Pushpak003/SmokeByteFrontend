import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm.jsx';
import { FcGoogle } from 'react-icons/fc';

const GOOGLE_URL = `${import.meta.env.VITE_API_URL}/auth/google`;

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { signup }            = useAuth();
  const navigate              = useNavigate();

  const handleSignup = async (credentials) => {
    setError('');
    setLoading(true);
    try {
      await signup(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create an Account</h2>
      <p className="auth-subtitle">Join SmokeByte — it's free</p>

      <a href={GOOGLE_URL} className="btn-google">
        <FcGoogle size={20} />
        Sign up with Google
      </a>

      <div className="auth-divider"><span>or</span></div>

      <SignupForm onSubmit={handleSignup} error={error} loading={loading} />
      <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;
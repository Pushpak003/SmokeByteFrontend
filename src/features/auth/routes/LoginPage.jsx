// src/features/auth/routes/LoginPage.jsx

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setError('');
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Welcome Back!</h2>
      <LoginForm onSubmit={handleLogin} error={error} />
      <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginPage;
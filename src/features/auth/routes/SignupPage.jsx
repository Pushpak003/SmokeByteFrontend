// src/features/auth/routes/LoginPage.jsx

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm.jsx';

const SignupPage = () => {
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (credentials) => {
    setError('');
    try {
      await signup(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create an Account</h2>
      <SignupForm onSubmit={handleSignup} error={error} />
      <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;

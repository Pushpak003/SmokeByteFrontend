import { useState } from 'react';
import { FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '../../../components/ui/Input';

const SignupForm = ({ onSubmit, error, loading }) => {
  const [username, setUsername]           = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirm]     = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [localError, setLocalError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (password !== confirmPassword) { setLocalError('Passwords do not match!'); return; }
    setLocalError('');
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className="password-field">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span onClick={() => setShowPassword(s => !s)} className="password-toggle-icon">
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      <div className="password-field">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <span onClick={() => setShowPassword(s => !s)} className="password-toggle-icon">
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      {(error || localError) && <p className="error-message">{error || localError}</p>}
      <button type="submit" className="auth-button" disabled={loading}>
        <FiUserPlus /> {loading ? 'Creating Account…' : 'Create Account'}
      </button>
    </form>
  );
};

export default SignupForm;
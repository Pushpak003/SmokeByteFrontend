// src/features/auth/components/LoginForm.jsx

import { useState } from 'react';
import { FiLogIn, FiUser, FiEye,FiEyeOff,FiLock } from 'react-icons/fi';
import Input from '../../../components/ui/Input'; // Hamara naya component

const LoginForm = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon={<FiUser />}
        required
      />
      <div className="password-field">
        <Input
          type={showPassword ? 'text' : 'password'} // Dynamic type
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<FiLock />}
          required
        />
        <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <button type="submit" className="auth-button">
        <FiLogIn /> Login
      </button>
    </form>
  );
};

export default LoginForm;
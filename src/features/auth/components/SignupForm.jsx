// src/features/auth/components/SignupForm.jsx

import { useState } from "react";
import { FiUserPlus, FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../../../components/ui/Input";
const SignupForm = ({ onSubmit, error, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [showPassword, setShowPassword] = useState(false); // New state for visibility
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }
    setLocalError("");
    onSubmit({ username, password });
  };
  // ... baaki ka component logic
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-icon"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      <div className="password-field">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-icon"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      {(error || localError) && (
        <p className="error-message">{error || localError}</p>
      )}
      <button type="submit" className="auth-button" disabled={loading}>
        <FiUserPlus />
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;

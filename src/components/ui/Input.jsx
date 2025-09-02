// src/components/ui/Input.jsx
import './Input.css';

const Input = ({ type = 'text', placeholder, value, onChange, icon, ...props }) => {
  return (
    <div className="input-wrapper">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`custom-input ${icon ? 'has-icon' : ''}`} // Ye class add karein
        {...props}
      />
    </div>
  );
};
export default Input;
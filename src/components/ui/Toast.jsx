import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'success', onClose, duration = 5000, onClick }) => {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`toast toast--${type} ${onClick ? 'toast--clickable' : ''}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <span className="toast-icon">
        {type === 'success' ? <FiCheckCircle size={17} /> : <FiXCircle size={17} />}
      </span>
      <span className="toast-msg">{message}</span>
      <button
        className="toast-close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <FiX size={13} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, remove }) => {
  const navigate = useNavigate();

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => remove(t.id)}
          onClick={t.onClick ? () => { t.onClick(navigate); remove(t.id); } : undefined}
        />
      ))}
    </div>
  );
};

export default Toast;
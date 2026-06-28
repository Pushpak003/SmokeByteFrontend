import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast-icon">
        {type === 'success' ? <FiCheckCircle size={17} /> : <FiXCircle size={17} />}
      </span>
      <span className="toast-msg">{message}</span>
      <button className="toast-close" onClick={onClose}><FiX size={13} /></button>
    </div>
  );
};

export const ToastContainer = ({ toasts, remove }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <Toast key={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />
    ))}
  </div>
);

export default Toast;
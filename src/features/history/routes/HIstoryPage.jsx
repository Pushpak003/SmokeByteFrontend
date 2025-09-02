// src/features/history/routes/HistoryPage.jsx

import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import HistoryItem from '../components/HistoryItem'; // We will create this component next
import Spinner from '../../../components/ui/Spinner';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/user/history');
        setHistory(response.data);
      } catch (err) {
        setError('Could not fetch conversion history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="history-container">
      <h2>Your Conversion History</h2>
      {history.length > 0 ? (
        <div className="history-list">
          {history.map((item) => (
            <HistoryItem key={item.jobId} item={item} />
          ))}
        </div>
      ) : (
        <p>You have no conversion history yet.</p>
      )}
    </div>
  );
};

export default HistoryPage; // <-- This line fixes the error
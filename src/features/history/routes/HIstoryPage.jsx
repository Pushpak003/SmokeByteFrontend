import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Spinner from '../../../components/ui/Spinner';
import HistoryRow from '../components/HistoryRow'; // Hum naya HistoryRow component use karenge

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/user/history');
        if (response.data && Array.isArray(response.data.data)) {
          setHistory(response.data.data);
        }
      } catch (err) {
        setError('Could not fetch conversion history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) { return <div className="history-container"><Spinner /></div>; }
  if (error) { return <div className="history-container"><p className="error-message">{error}</p></div>; }

  return (
    <div className="history-container">
      <h2>Your Conversion History</h2>
      {history.length > 0 ? (
        <table className="history-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <HistoryRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no conversion history yet.</p>
      )}
    </div>
  );
};

export default HistoryPage;
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Spinner from '../../../components/ui/Spinner';
import HistoryRow from '../components/HistoryRow';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    api.get('/user/history')
      .then(res => { if (Array.isArray(res.data?.data)) setHistory(res.data.data); })
      .catch(() => setError('Could not fetch conversion history.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="history-page-wrapper" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <Spinner />
    </div>
  );

  return (
    <div className="history-page-wrapper">
      <div className="history-hero">
        <h1>Conversion History</h1>
        <p>Your last 50 conversions</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!error && history.length === 0 && (
        <div className="history-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-2)' }}>
          No conversions yet. <a href="/dashboard">Convert a file</a> to get started.
        </div>
      )}

      {history.length > 0 && (
        <div className="history-card">
          <table className="history-table">
            <thead>
              <tr>
                <th style={{ width: '64px' }}>Type</th>
                <th>File Details</th>
                <th style={{ width: '90px' }}>Format</th>
                <th style={{ width: '130px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map(item => <HistoryRow key={item.id} item={item} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
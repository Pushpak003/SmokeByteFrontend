import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../../../components/ui/Spinner';

const OAuthCallbackPage = () => {
  const navigate          = useNavigate();
  const { loginWithTokens } = useAuth();

  useEffect(() => {
    const params       = new URLSearchParams(window.location.search);
    const accessToken  = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const error        = params.get('error');

    if (error || !accessToken) {
      navigate('/login?error=oauth_failed', { replace: true });
      return;
    }

    loginWithTokens(accessToken, refreshToken).then(() => {
      navigate('/dashboard', { replace: true });
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1rem' }}>
      <Spinner />
      <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>Signing you in…</p>
    </div>
  );
};

export default OAuthCallbackPage;
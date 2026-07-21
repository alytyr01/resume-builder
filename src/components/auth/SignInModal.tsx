import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { csrf } from '@/lib/auth/csrf';

export function SignInModal() {
  const { isAuthenticated, user, login, logout, error, isLoading, clearError } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Generate CSRF token on mount
  useEffect(() => {
    const token = csrf.generateToken();
    setCsrfToken(token);
  }, []);

  // Reset form when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setEmail('');
      setPassword('');
      clearError();
    }
  }, [isModalOpen, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login(email, password, csrfToken);
    
    if (result.success) {
      setIsModalOpen(false);
    }
  };

  // If authenticated, show user info with logout button
  if (isAuthenticated && user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{user.name}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{user.email}</div>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 500,
            color: '#0f172a',
            background: '#fff',
            border: '1.5px solid #0f172a',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'sans-serif',
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Show sign-in button
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: '8px 16px',
          fontSize: 14,
          fontWeight: 600,
          color: '#fff',
          background: '#0f172a',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontFamily: 'sans-serif',
        }}
      >
        Sign In
      </button>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#fff',
            padding: 32,
            borderRadius: 16,
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#0f172a',
                margin: 0,
              }}>Sign In</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 0,
                  width: 32,
                  height: 32,
                }}
              >
                ×
              </button>
            </div>

            {error && (
              <div style={{
                padding: 12,
                background: '#FEE2E2',
                border: '1px solid #DC2626',
                borderRadius: 8,
                marginBottom: 16,
                color: '#DC2626',
                fontSize: 14,
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#334155',
                  marginBottom: 8,
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 14,
                    border: '1.5px solid #E2E8F0',
                    borderRadius: 8,
                    color: '#0f172a',
                    fontFamily: 'sans-serif',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#334155',
                  marginBottom: 8,
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 14,
                    border: '1.5px solid #E2E8F0',
                    borderRadius: 8,
                    color: '#0f172a',
                    fontFamily: 'sans-serif',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#fff',
                  background: '#0f172a',
                  border: 'none',
                  borderRadius: 8,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontFamily: 'sans-serif',
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div style={{
              marginTop: 20,
              padding: 12,
              background: '#F1F5F9',
              borderRadius: 8,
              fontSize: 12,
              color: '#475569',
            }}>
              <strong>Demo credentials:</strong><br />
              Email: demo@example.com<br />
              Password: Demo1234
            </div>
          </div>
        </div>
      )}
    </>
  );
}
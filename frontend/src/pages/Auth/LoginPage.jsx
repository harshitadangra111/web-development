import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expired = searchParams.get('expired');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setLoading(true);
    try {
      await login({ email: demoEmail, password: demoPass });
      navigate('/menu');
    } catch (err) {
      setError('Could not login with demo account. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-surface-container-low p-8 rounded-3xl border border-surface-container shadow-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto text-secondary-fixed shadow-md">
            <span className="material-symbols-outlined text-[24px]">dark_mode</span>
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Welcome to the Nocturne</h1>
          <p className="text-body-sm text-on-surface-variant">Sign in to your Luna &amp; Latte patron account</p>
        </div>

        {expired && (
          <div className="p-3 bg-secondary-container/40 border border-secondary/30 rounded-xl text-secondary text-body-sm text-center">
            Your session has expired. Please sign in again.
          </div>
        )}

        {error && (
          <div className="p-3 bg-error-container/30 border border-error/20 rounded-xl text-error text-body-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[12px] font-medium text-on-surface-variant">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@sanctuary.com"
              className="w-full bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-on-surface-variant">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-md uppercase tracking-wider font-semibold hover:bg-secondary transition-all shadow-md disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* 1-Click Demo Buttons */}
        <div className="space-y-2 pt-2 border-t border-surface-container">
          <p className="text-[11px] uppercase tracking-wider text-outline text-center font-bold">
            1-Click Demo Access
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('maya@nocturne.studio', 'password123')}
              className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-label-sm font-semibold transition-all text-center border border-surface-container-high"
            >
              Demo Patron
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@lunaandlatte.com', 'password123')}
              className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-label-sm font-semibold transition-all text-center border border-surface-container-high"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Registration Link */}
        <div className="text-center text-body-sm text-on-surface-variant pt-2">
          New to our sanctuary?{' '}
          <Link to="/register" className="text-secondary font-semibold hover:underline">
            Create Patron Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

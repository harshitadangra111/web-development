import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ fullName, email, phoneNumber, password });
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not register account');
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
            <span className="material-symbols-outlined text-[24px]">local_cafe</span>
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Join the Nocturne Circle</h1>
          <p className="text-body-sm text-on-surface-variant">Earn 50 bonus Nocturne Beans upon registration</p>
        </div>

        {error && (
          <div className="p-3 bg-error-container/30 border border-error/20 rounded-xl text-error text-body-sm text-center">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[12px] font-medium text-on-surface-variant">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Maya Sengupta"
              className="w-full bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
            />
          </div>

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
            <label className="text-[12px] font-medium text-on-surface-variant">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 98200 XXXXX"
              className="w-full bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/60 text-body-sm mt-1 focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-on-surface-variant">Password (6+ characters)</label>
            <input
              type="password"
              required
              minLength={6}
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
            {loading ? 'Creating Account...' : 'Become a Patron'}
          </button>
        </form>

        <div className="text-center text-body-sm text-on-surface-variant pt-2">
          Already registered?{' '}
          <Link to="/login" className="text-secondary font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

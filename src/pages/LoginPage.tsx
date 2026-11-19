import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { useAppStore } from '../store';
import { Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('AlexMorgan');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your username or registered email.');
      return;
    }
    setError('');
    login(identifier, password);
    navigate('/dashboard');
  };

  const handleQuickDemo = (user: string) => {
    setIdentifier(user);
    setPassword('demo123');
    login(user, 'demo123');
    navigate('/dashboard');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setForgotModalOpen(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <BrandLogo size="lg" className="justify-center mb-4" />
        <h2 className="font-display font-extrabold text-2xl text-charcoal">
          Sign In to Federation
        </h2>
        <p className="mt-1 text-xs text-charcoal-muted">
          Access your tactical profile, challenges, and competition ladders
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-surface py-8 px-6 sm:px-10 rounded-panel border border-stone-200/90 shadow-card space-y-6">
          {/* Quick Demo Fill Pill */}
          <div className="bg-forest-50 border border-forest-200 rounded-xl p-3 text-xs text-forest-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <div>
                <strong>Demo Mode Active:</strong> Quick sign in available
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleQuickDemo('AlexMorgan')}
              className="px-2.5 py-1 rounded bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-[11px] transition-colors"
            >
              Sign In as Alex
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all"
                  placeholder="AlexMorgan or alex@futbolino.org"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-semibold text-forest-700 hover:text-forest-800"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-10 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-charcoal"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-forest-600 focus:ring-forest-500 border-stone-300"
                />
                <span className="text-charcoal-muted">Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-sm shadow-subtle transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration link */}
          <div className="pt-4 border-t border-stone-100 text-center text-xs text-charcoal-muted">
            New to the Federation?{' '}
            <Link to="/register" className="font-semibold text-forest-700 hover:text-forest-800">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Simulated Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-surface rounded-panel p-6 max-w-sm w-full border border-stone-200 shadow-modal space-y-4">
            <h3 className="font-display font-bold text-base text-charcoal">
              Reset Security Credentials
            </h3>
            <p className="text-xs text-charcoal-muted">
              Enter your registered Federation email to receive a simulated recovery token.
            </p>

            {resetSent ? (
              <div className="p-3 bg-forest-50 border border-forest-200 rounded-xl text-xs text-forest-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Simulated recovery instructions sent to {resetEmail || 'your email'}.</span>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="alex.morgan@futbolino-fed.org"
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl px-3 py-2 text-charcoal"
                  required
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-charcoal-muted hover:text-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

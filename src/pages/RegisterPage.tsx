import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { useAppStore } from '../store';
import { Eye, EyeOff, Lock, User, Mail, Globe, ArrowRight, ShieldCheck, Check } from 'lucide-react';

const COUNTRIES = [
  'United Kingdom',
  'England',
  'Brazil',
  'Spain',
  'Germany',
  'France',
  'Portugal',
  'United States',
  'Italy',
  'Argentina',
  'Netherlands',
  'Japan',
  'Canada'
];

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAppStore();
  const navigate = useNavigate();

  // Password strength logic
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: 'Empty', color: 'bg-stone-200' };
    if (pwd.length < 6) return { level: 1, label: 'Weak', color: 'bg-red-400' };
    if (pwd.length < 10) return { level: 2, label: 'Moderate', color: 'bg-amber-400' };
    return { level: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Federation bylaws and fair play policy.');
      return;
    }

    setError('');
    register({ username, email, country });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <BrandLogo size="lg" className="justify-center mb-4" />
        <h2 className="font-display font-extrabold text-2xl text-charcoal">
          Join the Federation
        </h2>
        <p className="mt-1 text-xs text-charcoal-muted">
          Register your competitive player handle and claim your 1,000 baseline Elo rating
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-surface py-8 px-6 sm:px-10 rounded-panel border border-stone-200/90 shadow-card space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Player Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all"
                  placeholder="e.g. VictorBlade"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Federation Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all"
                  placeholder="tactician@domain.com"
                  required
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Representing Country
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Globe className="w-4 h-4" />
                </div>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all appearance-none cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-10 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all font-mono"
                  placeholder="Min 6 characters"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-charcoal-muted">
                    <span>Password Strength:</span>
                    <span className="font-semibold">{strength.label}</span>
                  </div>
                  <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${strength.level >= 1 ? strength.color : 'bg-stone-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.level >= 2 ? strength.color : 'bg-stone-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.level >= 3 ? strength.color : 'bg-stone-200'}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs bg-warm-bg border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all font-mono"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-muted leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-forest-600 focus:ring-forest-500 border-stone-300"
                />
                <span>
                  I accept the FUTBOLIÑO Federation Charter, Elo fair play guidelines, and tournament terms.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-sm shadow-subtle transition-all flex items-center justify-center gap-2"
            >
              <span>Initialize Profile & Enter Federation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 text-center text-xs text-charcoal-muted">
            Already have a player profile?{' '}
            <Link to="/login" className="font-semibold text-forest-700 hover:text-forest-800">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

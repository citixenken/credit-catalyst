import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function SignIn() {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const user = await signIn(email, password);
      navigate(user.onboarded ? '/dashboard' : '/onboarding');
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-surface px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
            <p className="text-sm text-text-secondary mt-1">Sign in to your Credit Catalyst account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="you@business.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-light font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:text-primary-light transition-colors">
              Create one
            </Link>
          </p>
        </div>

        {/* Persona login hints */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 text-center">Demo Accounts</p>
          <div className="space-y-2.5">
            {[
              {
                label: 'Good Merchant',
                status: 'Excellent Merchant',
                name: 'Amina Wanjiku',
                business: 'Wanjiku Fresh Produce',
                score: '812',
                tier: 'Platinum',
                email: 'amina@wanjikufresh.co.ke',
                pw: 'Amina2026!',
                hex: '#10B981',
                bgLight: '#10B98112',
                border: '#10B98130',
                initials: 'AW',
              },
              {
                label: 'Medium Merchant',
                status: 'Good Merchant',
                name: 'James Kariuki',
                business: 'Kariuki Electronics',
                score: '712',
                tier: 'Gold',
                email: 'james@karielec.co.ke',
                pw: 'James2026!',
                hex: '#F59E0B',
                bgLight: '#F59E0B12',
                border: '#F59E0B30',
                initials: 'JK',
              },
              {
                label: 'Struggling Merchant',
                status: 'Needs Attention',
                name: 'Peter Odhiambo',
                business: "Pete's Mobile Repair",
                score: '598',
                tier: 'Bronze',
                email: 'peter@petesmobile.co.ke',
                pw: 'Peter2026!',
                hex: '#EF4444',
                bgLight: '#EF444412',
                border: '#EF444430',
                initials: 'PO',
              },
            ].map((a) => (
              <button
                key={a.email}
                type="button"
                onClick={() => { setEmail(a.email); setPassword(a.pw); }}
                className="w-full text-left rounded-2xl border p-4 hover:shadow-sm transition-all group"
                style={{ backgroundColor: a.bgLight, borderColor: a.border }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm text-white" style={{ backgroundColor: a.hex }}>
                    {a.initials}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-text-primary truncate">{a.name}</p>
                      <span className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: a.hex }}>{a.tier}</span>
                    </div>
                    <p className="text-xs text-text-muted truncate">{a.business}</p>
                    <p className="text-[10px] font-semibold mt-1" style={{ color: a.hex }}>{a.status} · Score {a.score}</p>
                  </div>
                  {/* Credentials */}
                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <p className="text-[11px] font-mono text-text-muted">{a.email}</p>
                    <p className="text-[11px] font-mono text-text-muted mt-0.5">{'•'.repeat(a.pw.length)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-[11px] text-text-muted mt-3">Click a card to auto-fill credentials</p>
        </div>
      </motion.div>
    </div>
  );
}

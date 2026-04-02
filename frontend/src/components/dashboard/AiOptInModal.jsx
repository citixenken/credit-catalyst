import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Zap, ShieldCheck, RefreshCw, Bell,
  ToggleLeft, ToggleRight, X, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { getPersonaKey } from '../../data/personaData';

const features = [
  { icon: RefreshCw, label: 'Flex-Pay Repayments', desc: 'Auto-adjusts payments based on your real-time cash flow — lower in slow months, higher when strong.', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: ShieldCheck, label: 'Auto-Restructure', desc: 'Credit Catalyst Engine proactively restructures your loan if revenue drops, preventing defaults before they happen.', color: 'text-success', bg: 'bg-success/10' },
  { icon: Zap, label: 'Real-Time Score Updates', desc: 'Credit score updates after every qualifying transaction instead of the standard monthly cycle.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Bell, label: 'Cash Flow Alerts', desc: 'Proactive warnings when Credit Catalyst Engine detects patterns that could affect your repayments or score.', color: 'text-warning', bg: 'bg-warning/10' },
];

export default function AiOptInModal() {
  const { user, updateAiOptIn } = useAuth();
  const [optIn, setOptIn] = useState(false);

  // Only show if the user hasn't decided yet, and not for struggling merchants
  if (!user || user.aiOptInDecided || getPersonaKey(user?.email) === 'struggling') return null;

  const handleConfirm = () => {
    updateAiOptIn(optIn);
  };

  const handleSkip = () => {
    updateAiOptIn(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
            <button onClick={handleSkip} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Brain size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Upgrade to Credit Catalyst-powered Credit Offering</h2>
                <p className="text-sm text-white/70">Smart features that adapt to your business</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <p className="text-sm text-text-secondary">
              We now offer Credit Catalyst-powered credit management. Opt in to let our system automatically optimise your loan repayments, score updates, and alerts — or keep the standard fixed-term experience.
            </p>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setOptIn(!optIn)}
              className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all ${
                optIn
                  ? 'border-accent bg-accent/5'
                  : 'border-border bg-white hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className={optIn ? 'text-accent' : 'text-text-muted'} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-text-primary">Enable Credit Catalyst Engine Insights</p>
                  <p className="text-xs text-text-secondary">
                    {optIn ? 'Smart features active — your loan adapts to your cash flow' : 'Standard fixed-term loan product applies'}
                  </p>
                </div>
              </div>
              {optIn
                ? <ToggleRight size={26} className="text-accent flex-shrink-0" />
                : <ToggleLeft size={26} className="text-gray-300 flex-shrink-0" />
              }
            </button>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feat) => (
                <div key={feat.label} className={`p-3 rounded-xl border transition-all ${
                  optIn ? 'border-border bg-white' : 'border-dashed border-gray-200 bg-gray-50 opacity-50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 rounded-lg ${feat.bg} flex items-center justify-center`}>
                      <feat.icon size={12} className={feat.color} />
                    </div>
                    <p className="text-xs font-semibold text-text-primary">{feat.label}</p>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            {!optIn && (
              <p className="text-xs text-text-muted text-center bg-gray-50 rounded-lg p-2">
                Without Credit Catalyst Engine Insights, loan drawdown and repayment will follow a standard fixed schedule.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex items-center gap-3">
            <button
              onClick={handleSkip}
              className="flex-1 py-2.5 text-sm font-medium text-text-secondary border border-border rounded-xl hover:bg-gray-50 transition-all"
            >
              Keep Standard
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                optIn
                  ? 'bg-accent text-white hover:bg-accent-light shadow-sm'
                  : 'bg-primary text-white hover:bg-primary-light'
              }`}
            >
              {optIn ? 'Enable' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-[11px] text-text-muted text-center pb-4 px-6">
            You can change this anytime from your dashboard under Smart Features.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

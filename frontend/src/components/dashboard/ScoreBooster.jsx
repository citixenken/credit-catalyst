import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target, Zap, Brain, Trophy, TrendingUp, Gift,
  Eye, CheckCircle, Clock, Lock, ArrowUpRight,
  ChevronRight, Star, AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { getPersonaByEmail, getPersonaKey } from '../../data/personaData';
import InfoPopup from '../common/InfoPopup';

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const formatFull = (n) => `KES ${n.toLocaleString()}`;

const difficultyColors = {
  'Easy': 'text-success bg-success/10',
  'Medium': 'text-warning bg-warning/10',
  'Hard': 'text-danger bg-danger/10',
};

const effortColors = {
  'Low effort': 'text-success bg-success/10',
  'Medium effort': 'text-warning bg-warning/10',
  'High effort': 'text-danger bg-danger/10',
};

export default function ScoreBooster() {
  const { user } = useAuth();
  const data = getPersonaByEmail(user?.email);
  const {
    creditProfile: mockCreditProfile,
    scoreMilestones: mockScoreMilestones,
    scoreIncentives: mockScoreIncentives,
    aiAdvice: mockAIAdvice,
    challenges: mockChallenges,
    businessImpact: mockBusinessImpact,
    partnerRewards: mockPartnerRewards,
    scoreHistory: mockScoreHistory,
    theme: personaTheme,
  } = data;
  const personaKey = getPersonaKey(user?.email);
  const isStruggling = personaKey === 'struggling';
  const [selectedAdvice, setSelectedAdvice] = useState(null);
  const [selectedIncentive, setSelectedIncentive] = useState(null);

  const currentScore = mockCreditProfile.creditScore;
  const nextMilestone = mockScoreMilestones.find((m) => m.score > currentScore);
  const ptsToNext = nextMilestone ? nextMilestone.score - currentScore : 0;

  return (
    <div className="space-y-6">
      {/* ── 1. Score Milestone Track ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0} className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target size={18} className="text-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Your Score Path</h2>
            </div>
            <p className="text-sm text-text-secondary">
              You&apos;re <span className="font-semibold" style={{ color: personaTheme.hex }}>{ptsToNext} points</span> away from unlocking{' '}
              <span className="font-semibold text-accent">{nextMilestone?.label} Tier</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold leading-none" style={{ color: personaTheme.hex }}>{currentScore}</p>
            <p className="text-xs text-text-muted mt-1">of 850</p>
          </div>
        </div>

        {/* Track */}
        <div className="mt-6 relative">
          <div className="absolute top-4 left-0 right-0 h-1.5 bg-gray-100 rounded-full" />
          <div
            className="absolute top-4 left-0 h-1.5 rounded-full transition-all duration-700"
            style={{ width: `${((currentScore - 600) / (850 - 600)) * 100}%`, backgroundColor: personaTheme.hex }}
          />
          <div className="relative flex justify-between">
            {mockScoreMilestones.map((m) => (
              <div key={m.label} className="flex flex-col items-center gap-2" style={{ width: '20%' }}>
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                  m.current
                    ? `${personaTheme.border} ${personaTheme.bg} shadow-lg`
                    : m.achieved
                      ? `${personaTheme.border} ${personaTheme.bg}`
                      : 'border-gray-200 bg-white'
                }`}>
                  {m.achieved || m.current
                    ? <CheckCircle size={16} className="text-white" />
                    : <Lock size={14} className="text-gray-300" />
                  }
                </div>
                <p className={`text-xs font-semibold ${m.current || m.achieved ? personaTheme.tw : 'text-text-muted'}`}>{m.label}</p>
                <p className="text-[10px] text-text-muted text-center leading-tight hidden sm:block">
                  {m.achieved || m.current ? m.limitLabel : '🔒 Reach tier to reveal'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {nextMilestone && (
          <div className={`mt-6 p-4 rounded-xl ${personaTheme.bgLight} border`} style={{ borderColor: `${personaTheme.hex}20` }}>
            <p className="text-sm font-medium" style={{ color: personaTheme.hex }}>
              🎯 Next unlock: <span className="font-bold">{nextMilestone.label} Tier</span> — reach {nextMilestone.score} pts to reveal your new limit
            </p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, ((currentScore - (nextMilestone.score - 100)) / 100) * 100)}%`, backgroundColor: personaTheme.hex }}
              />
            </div>
            <p className="text-xs text-text-muted mt-1">{currentScore} / {nextMilestone.score} — {ptsToNext} pts to go</p>
          </div>
        )}
      </motion.div>

      {/* ── 2. Quick Win Incentives ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} className="text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Quick Win Actions</h2>
          <span className="ml-auto text-xs text-text-muted">Tap to learn more</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockScoreIncentives.map((item, i) => (
            <motion.button
              key={item.id}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={i}
              onClick={() => setSelectedIncentive(item)}
              className="text-left bg-white rounded-2xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColors[item.difficulty] || 'text-text-muted bg-gray-100'}`}>
                  {item.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: personaTheme.hex }}>
                  +{item.scorePoints} pts
                </div>
              </div>
              <p className="text-sm font-medium text-text-primary mb-2 leading-snug">{item.action}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                  <Gift size={11} className="text-accent" />
                </div>
                <span className="text-xs text-accent font-medium">{item.reward}</span>
              </div>
              {item.daysLeft !== null && (
                <div className="flex items-center gap-1 mt-2">
                  <Clock size={11} className="text-text-muted" />
                  <span className="text-xs text-text-muted">{item.daysLeft} days left</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── 3 + 4. AI Advice & Challenges side by side ── */}
      <div className={`grid ${!isStruggling && mockAIAdvice.length > 0 ? 'lg:grid-cols-2' : ''} gap-6`}>
        {/* AI Advice — hidden for struggling merchants */}
        {!isStruggling && mockAIAdvice.length > 0 && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2} className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Customer Recommendations</h2>
          </div>
          <div className="space-y-3">
            {mockAIAdvice.map((advice) => (
              <button
                key={advice.id}
                onClick={() => setSelectedAdvice(advice)}
                className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-text-primary">{advice.title}</p>
                  <ChevronRight size={14} className="text-text-muted flex-shrink-0" />
                </div>
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{advice.body}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-success">
                    <ArrowUpRight size={12} /> +{advice.scoreImpact} pts potential
                  </span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${effortColors[advice.effort] || ''}`}>
                    {advice.effort}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
        )}

        {/* Challenges */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3} className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-warning" />
            <h2 className="text-lg font-semibold text-text-primary">Score Challenges</h2>
          </div>
          <div className="space-y-4">
            {mockChallenges.map((ch) => {
              const pct = Math.min(100, (ch.progress / ch.target) * 100);
              const done = ch.status === 'completed';
              return (
                <div key={ch.id} className={`p-4 rounded-xl border transition-all ${done ? 'border-success/20 bg-success/5' : 'border-border'}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-text-primary leading-snug">{ch.title}</p>
                    {done
                      ? <span className="flex items-center gap-1 text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full whitespace-nowrap"><CheckCircle size={11} /> Done</span>
                      : ch.daysLeft !== null && <span className="text-xs text-text-muted whitespace-nowrap flex items-center gap-1"><Clock size={11} /> {ch.daysLeft}d left</span>
                    }
                  </div>
                  <p className="text-xs text-text-secondary mb-3 leading-relaxed">{ch.description}</p>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${done ? 'bg-success' : ''}`}
                      style={!done ? { width: `${pct}%`, backgroundColor: personaTheme.hex } : { width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted mt-1">
                    <span>{ch.progress} / {ch.target} {ch.unit}</span>
                    <span className="text-accent font-medium">{ch.reward}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── 5. Business Impact ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4} className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={18} className="text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Score → Business Growth</h2>
        </div>
        <p className="text-sm text-text-secondary mb-5">Improving your score directly unlocks better capital and faster stock cycles.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(() => {
            const currentIdx = mockBusinessImpact.findIndex((t) => t.current);
            return mockBusinessImpact.map((tier, i) => {
              const isLocked = i > currentIdx;
              return (
                <div
                  key={tier.label}
                  className={`relative rounded-2xl border p-5 transition-all ${
                    tier.current
                      ? `${personaTheme.border} ${personaTheme.bgLight} shadow-sm`
                      : isLocked
                        ? 'border-dashed border-gray-200 bg-gray-50/60'
                        : 'border-border opacity-80'
                  }`}
                >
                  {tier.current && (
                    <span className={`absolute -top-2.5 left-4 text-[10px] font-bold px-2 py-0.5 ${personaTheme.bg} text-white rounded-full`}>You are here</span>
                  )}
                  {isLocked && (
                    <span className="absolute -top-2.5 left-4 text-[10px] font-bold px-2 py-0.5 bg-gray-400 text-white rounded-full flex items-center gap-1">
                      <Lock size={8} /> Locked
                    </span>
                  )}
                  <p className="text-sm font-semibold text-text-primary mb-4">{tier.label}</p>
                  {isLocked ? (
                    <div className="space-y-2.5">
                      {['Credit Limit', 'Est. Revenue Growth', 'Stock Restock Cycle'].map((label) => (
                        <div key={label}>
                          <p className="text-xs text-text-muted">{label}</p>
                          <div className="mt-1 h-5 w-24 bg-gray-200 rounded-md animate-pulse" />
                        </div>
                      ))}
                      <p className="text-[11px] text-text-muted pt-1">Unlock this tier to reveal</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div>
                        <p className="text-xs text-text-muted">Credit Limit</p>
                        <p className={`text-lg font-bold ${tier.current ? personaTheme.tw : 'text-text-secondary'}`}>{formatFull(tier.limit)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Est. Revenue Growth</p>
                        <p className={`text-base font-bold ${tier.current ? (tier.growthRate < 0 ? 'text-danger' : 'text-success') : 'text-text-secondary'}`}>
                          {tier.growthRate < 0 ? '-' : '+'}KES {Math.abs(tier.growthRate).toLocaleString()} / yr
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Stock Restock Cycle</p>
                        <p className={`text-base font-semibold ${tier.current ? 'text-text-primary' : 'text-text-secondary'}`}>{tier.stockCycle}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })()}
        </div>
        <p className="text-xs text-text-muted mt-4 flex items-center gap-1">
          <Star size={11} className="text-warning" /> Top-tier merchants grow 30–38% faster with increased working capital access.
        </p>
      </motion.div>

      {/* ── 6. Partner Rewards ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5} className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-2">
          <Gift size={18} className="text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Partner Rewards & Ecosystem</h2>
        </div>
        <p className="text-sm text-text-secondary mb-5">Your score unlocks real-world benefits across our partner network.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockPartnerRewards.map((r) => (
            <div
              key={r.id}
              className={`relative p-4 rounded-xl border transition-all ${
                r.active
                  ? 'border-accent/20 bg-accent/5'
                  : 'border-dashed border-gray-200 bg-gray-50 opacity-70'
              }`}
            >
              {!r.active && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-[1px] z-10">
                  <div className="flex flex-col items-center gap-1">
                    <Lock size={16} className="text-text-muted" />
                    <span className="text-[10px] font-semibold text-text-muted">{r.tier} required</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-primary">{r.logo}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">{r.partner}</p>
                  <span className={`text-[10px] font-medium ${r.active ? 'text-accent' : 'text-text-muted'}`}>{r.tier}</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{r.benefit}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── 7. Score Transparency Log ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6} className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-5">
          <Eye size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">{isStruggling ? 'Monthly Score History' : 'Why Your Score Changed'}</h2>
        </div>
        <div className="space-y-3">
          {mockScoreHistory.map((entry, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* Timeline dot */}
              <div className="flex flex-col items-center pt-1">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  entry.change > 0 ? 'border-success bg-success/10' : 'border-danger bg-danger/10'
                }`}>
                  {entry.change > 0
                    ? <ArrowUpRight size={13} className="text-success" />
                    : <AlertCircle size={13} className="text-danger" />
                  }
                </div>
                {i < mockScoreHistory.length - 1 && (
                  <div className="w-px h-6 bg-border mt-1" />
                )}
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-text-primary leading-snug">{entry.reason}</p>
                  <span className={`text-sm font-bold flex-shrink-0 ${entry.change > 0 ? 'text-success' : 'text-danger'}`}>
                    {entry.change > 0 ? '+' : ''}{entry.change}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-text-muted">{entry.date}</span>
                  <span className="text-xs text-text-muted">→ Score: <b className="text-text-primary">{entry.score}</b></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Popups */}
      <InfoPopup
        isOpen={!!selectedAdvice}
        onClose={() => setSelectedAdvice(null)}
        title={selectedAdvice?.title || ''}
        message={selectedAdvice?.body || ''}
        type="info"
        details={selectedAdvice ? [
          { label: 'Score potential', value: `+${selectedAdvice.scoreImpact} points` },
          { label: 'Effort level', value: selectedAdvice.effort },
        ] : null}
        actions={[
          { label: 'Dismiss', onClick: () => setSelectedAdvice(null) },
          { label: 'Take Action', onClick: () => setSelectedAdvice(null), primary: true },
        ]}
      />

      <InfoPopup
        isOpen={!!selectedIncentive}
        onClose={() => setSelectedIncentive(null)}
        title={selectedIncentive?.action || ''}
        message={`Complete this action to earn the reward below. Difficulty: ${selectedIncentive?.difficulty}.`}
        type="action"
        details={selectedIncentive ? [
          { label: 'Reward', value: selectedIncentive.reward },
          { label: 'Score points', value: `+${selectedIncentive.scorePoints} pts` },
          { label: 'Time limit', value: selectedIncentive.daysLeft ? `${selectedIncentive.daysLeft} days` : 'No deadline' },
        ] : null}
        actions={[
          { label: 'Later', onClick: () => setSelectedIncentive(null) },
          { label: 'Do It Now', onClick: () => setSelectedIncentive(null), primary: true },
        ]}
      />
    </div>
  );
}

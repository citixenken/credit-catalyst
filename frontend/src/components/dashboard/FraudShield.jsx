import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle,
  Lock, Unlock, Eye, Clock, TrendingUp, TrendingDown, Users, Activity,
  ChevronRight, ChevronDown, Info, Layers, Fingerprint,
  Banknote, AlertCircle, XCircle, Gauge, History,
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

const statusColors = {
  pass: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', icon: CheckCircle, label: 'Pass' },
  flagged: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', icon: AlertTriangle, label: 'Flagged' },
  review: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: Eye, label: 'Review' },
  fail: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20', icon: XCircle, label: 'Fail' },
  clear: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', icon: CheckCircle, label: 'Clear' },
};

const vestingStatusColors = {
  vested: { bg: 'bg-success/10', text: 'text-success', label: 'Vested' },
  partial: { bg: 'bg-warning/10', text: 'text-warning', label: 'In Progress' },
  locked: { bg: 'bg-gray-100', text: 'text-gray-400', label: 'Locked' },
};

function AnimatedScore({ score, color }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score]);

  const circumference = 264;
  const dash = (displayed / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.05s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-text-primary">{displayed}</span>
        <span className="text-[10px] text-text-muted">of 100</span>
      </div>
    </div>
  );
}

export default function FraudShield() {
  const { user } = useAuth();
  const data = getPersonaByEmail(user?.email);
  const { fraudShield: shield } = data;
  const personaKey = getPersonaKey(user?.email);

  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [selectedTrigger, setSelectedTrigger] = useState(null);

  const toggleSection = (section) =>
    setExpandedSection((prev) => (prev === section ? null : section));

  const trustColor = shield.overallTrust.riskScore < 25
    ? '#10B981'
    : shield.overallTrust.riskScore < 50
      ? '#F59E0B'
      : '#EF4444';

  const trustIcon = shield.overallTrust.riskScore < 25
    ? ShieldCheck
    : shield.overallTrust.riskScore < 50
      ? ShieldAlert
      : Shield;

  const TrustIcon = trustIcon;

  return (
    <div className="space-y-6">
      {/* ── Header: Overall Trust Assessment ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}
        className="bg-white rounded-2xl border border-border p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrustIcon size={20} style={{ color: trustColor }} />
          <h2 className="text-lg font-semibold text-text-primary">Trust Shield — Anti-Gaming Intelligence</h2>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: trustColor + '15', color: trustColor }}
          >
            Internal View
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Trust Score Ring */}
          <div className="flex flex-col items-center">
            <AnimatedScore score={100 - shield.overallTrust.riskScore} color={trustColor} />
            <p className="text-sm font-semibold mt-2" style={{ color: trustColor }}>
              {shield.overallTrust.level}
            </p>
            <p className="text-[11px] text-text-muted mt-0.5">
              {shield.overallTrust.flags} flag{shield.overallTrust.flags !== 1 ? 's' : ''} / {shield.overallTrust.totalChecks} checks
            </p>
          </div>

          {/* Summary */}
          <div className="flex-1">
            <div className="p-4 rounded-xl bg-surface border border-border">
              <p className="text-sm text-text-secondary leading-relaxed">
                {shield.overallTrust.recommendation}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Authenticity', value: `${shield.authenticityScore}/100`, color: shield.authenticityScore >= 80 ? 'text-success' : shield.authenticityScore >= 60 ? 'text-warning' : 'text-danger' },
                { label: 'Vested Limit', value: formatFull(shield.limitVesting.vestedLimit), color: 'text-primary' },
                { label: 'Max Single Loan', value: formatFull(shield.disbursementCap.maxSingleLoan), color: 'text-text-primary' },
                { label: 'Tenure', value: `${shield.limitVesting.currentTenureMonths} months`, color: 'text-text-primary' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2.5 rounded-xl bg-gray-50 border border-border">
                  <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 1. Behavioral Authenticity Score ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('authenticity')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${statusColors[shield.authenticityStatus].bg}`}>
              <Fingerprint size={18} className={statusColors[shield.authenticityStatus].text} />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Behavioral Authenticity Score</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Detects manufactured behavior vs. genuine merchant activity patterns
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[shield.authenticityStatus].bg} ${statusColors[shield.authenticityStatus].text}`}>
              {shield.authenticityScore}/100 — {shield.authenticityLabel}
            </span>
            {expandedSection === 'authenticity'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'authenticity' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            <div className="space-y-3">
              {shield.authenticityFactors.map((factor) => {
                const sc = statusColors[factor.status];
                const ScIcon = sc.icon;
                return (
                  <button
                    key={factor.name}
                    onClick={() => setSelectedFactor(factor)}
                    className={`w-full text-left p-4 rounded-xl border ${sc.border} ${sc.bg} hover:shadow-sm transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ScIcon size={16} className={sc.text} />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{factor.name}</p>
                          <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1">{factor.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-sm font-bold ${sc.text}`}>{factor.score}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                          {sc.label}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {personaKey === 'good' && (
              <div className="mt-4 p-4 rounded-xl bg-warning/5 border border-warning/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Gaming Risk Assessment</p>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      This merchant&apos;s behavior pattern is &quot;too perfect&quot; — a key indicator of potential score farming.
                      Genuine businesses exhibit natural variance in transaction timing, amounts, and revenue cycles.
                      The system has flagged 3 signals: unusually low transaction entropy, unnaturally smooth revenue growth,
                      and robotic payment timing. These don&apos;t confirm fraud, but warrant elevated monitoring.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* ── 2. Graduated Limit Vesting ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('vesting')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Layers size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Graduated Limit Vesting</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Credit limits unlock over time — not all at once. Prevents rapid limit farming.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-primary">
              {formatFull(shield.limitVesting.vestedLimit)} of {formatFull(shield.limitVesting.totalApprovedLimit)} vested
            </span>
            {expandedSection === 'vesting'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'vesting' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            {/* Vesting Timeline */}
            <div className="space-y-3">
              {shield.limitVesting.vestingSchedule.map((v, i) => {
                const vc = vestingStatusColors[v.status];
                return (
                  <div key={i} className={`flex items-center gap-4 p-3.5 rounded-xl border ${v.status === 'locked' ? 'border-dashed border-gray-200 bg-gray-50/60' : 'border-border'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${vc.bg}`}>
                      {v.status === 'vested' ? <Unlock size={16} className={vc.text} /> :
                       v.status === 'partial' ? <Clock size={16} className={vc.text} /> :
                       <Lock size={16} className={vc.text} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{v.label}</p>
                      <p className="text-xs text-text-muted">{v.month}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${vc.text}`}>{formatFull(v.amount)}</p>
                      <p className={`text-[10px] font-semibold ${vc.text}`}>{vc.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cooling Period */}
            <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-primary" />
                <p className="text-sm font-medium text-text-primary">Cooling Period Policy</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                After each tier upgrade, a <span className="font-semibold">{shield.limitVesting.coolingPeriodDays}-day cooling period</span> must
                elapse before the new limit can be drawn. This prevents merchants from immediately maxing out a
                newly increased facility.
                {shield.limitVesting.lastTierUpgrade && (
                  <> Last tier upgrade: <span className="font-semibold">{shield.limitVesting.lastTierUpgrade}</span>.
                  Status: <span className={`font-semibold ${shield.limitVesting.coolingComplete ? 'text-success' : 'text-warning'}`}>
                    {shield.limitVesting.coolingComplete ? 'Cooling complete' : 'In cooling period'}
                  </span>.</>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── 3. Disbursement Controls ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('disbursement')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10">
              <Banknote size={18} className="text-accent" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Disbursement Controls</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Single-loan caps + staggered release prevents &quot;take-all-and-run&quot; scenarios
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-accent">
              Max single: {formatFull(shield.disbursementCap.maxSingleLoan)} ({shield.disbursementCap.maxSingleLoanPercent}% of limit)
            </span>
            {expandedSection === 'disbursement'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'disbursement' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            {/* Key figures */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Max Single Loan', value: formatFull(shield.disbursementCap.maxSingleLoan), desc: `${shield.disbursementCap.maxSingleLoanPercent}% cap` },
                { label: 'Currently Outstanding', value: formatFull(shield.disbursementCap.currentOutstanding), desc: 'Active loans' },
                { label: 'Available to Draw', value: formatFull(shield.disbursementCap.availableForNewLoan), desc: 'After caps applied' },
                { label: 'Staggered Release', value: shield.disbursementCap.staggeredRelease ? 'Active' : 'Not required', desc: shield.disbursementCap.staggeredRelease ? 'Multi-tranche' : 'Single release' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-surface border border-border">
                  <p className="text-sm font-bold text-text-primary">{item.value}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{item.label}</p>
                  <p className="text-[10px] text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Tranche schedule if applicable */}
            {shield.disbursementCap.staggeredRelease && shield.disbursementCap.trancheSchedule && (
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={14} className="text-accent" />
                  <p className="text-sm font-medium text-text-primary">Staggered Release Schedule</p>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  Large loans are released in tranches. Each subsequent tranche requires continued healthy business activity.
                </p>
                <div className="space-y-2">
                  {shield.disbursementCap.trancheSchedule.map((t) => (
                    <div key={t.tranche} className="flex items-center justify-between p-3 rounded-lg bg-white border border-border">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">{t.tranche}</span>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{formatFull(t.amount)}</p>
                          <p className="text-[11px] text-text-muted">{t.condition}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-text-secondary">{t.release}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* ── 4. Exit Velocity Triggers ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('exit-velocity')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-danger/10">
              <TrendingUp size={18} className="text-danger" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Exit Velocity Triggers</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Real-time signals that detect &quot;build-score-then-bolt&quot; patterns
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {(() => {
              const flagged = shield.exitVelocityTriggers.filter((t) => t.status === 'flagged').length;
              return flagged > 0
                ? <span className="px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning">{flagged} flagged</span>
                : <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">All clear</span>;
            })()}
            {expandedSection === 'exit-velocity'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'exit-velocity' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            <div className="space-y-3">
              {shield.exitVelocityTriggers.map((trigger) => {
                const sc = statusColors[trigger.status];
                const ScIcon = sc.icon;
                return (
                  <button
                    key={trigger.id}
                    onClick={() => setSelectedTrigger(trigger)}
                    className={`w-full text-left p-4 rounded-xl border ${sc.border} hover:shadow-sm transition-all`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <ScIcon size={16} className={sc.text} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-primary">{trigger.trigger}</p>
                          <p className="text-[11px] text-text-muted mt-0.5">{trigger.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                          {sc.label}
                        </span>
                        <span className="text-[10px] text-text-muted">{trigger.lastChecked}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="font-semibold">How it works:</span> The system continuously monitors for behavioral patterns
                  consistent with bust-out fraud — where a merchant builds an excellent track record specifically to
                  maximize their credit limit, then draws the maximum facility and exits. Flagged triggers don&apos;t block
                  transactions but escalate to enhanced review and may apply additional disbursement controls.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── 5. Post-Disbursement Monitoring ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('post-disbursement')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-info/10">
              <Eye size={18} className="text-info" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Post-Disbursement Monitoring</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Continuous monitoring after every credit draw — catches activity drops post-loan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              shield.postDisbursementMonitoring.checksFailed > 0 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
            }`}>
              {shield.postDisbursementMonitoring.checksPassed}/{shield.postDisbursementMonitoring.checksCompleted} passed
            </span>
            {expandedSection === 'post-disbursement'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'post-disbursement' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            {/* Monitoring summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Loan', value: shield.postDisbursementMonitoring.loanId },
                { label: 'Monitoring Level', value: shield.postDisbursementMonitoring.monitoringLevel },
                { label: 'Days Since Draw', value: `${shield.postDisbursementMonitoring.daysSinceDisbursement}d` },
                { label: 'Checks', value: `${shield.postDisbursementMonitoring.checksPassed}/${shield.postDisbursementMonitoring.checksCompleted} passed` },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-surface border border-border text-center">
                  <p className="text-sm font-bold text-text-primary">{item.value}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Metric checks */}
            <div className="space-y-2">
              {shield.postDisbursementMonitoring.metrics.map((metric) => {
                const sc = statusColors[metric.status];
                const ScIcon = sc.icon;
                return (
                  <div key={metric.name} className={`flex items-start gap-3 p-3.5 rounded-xl border ${sc.border} ${sc.bg}`}>
                    <ScIcon size={16} className={`${sc.text} mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{metric.name}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{metric.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── 6. Security Escalation ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('security')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Lock size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Security & Collateral Escalation</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Higher limits require progressively more verification — skin in the game
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {shield.securityTier.current} tier
            </span>
            {expandedSection === 'security'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'security' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            <div className="space-y-2">
              {shield.securityTier.requirements.map((req) => (
                <div key={req.requirement} className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                  req.status === 'completed' ? 'border-success/20 bg-success/5' :
                  req.status === 'pending' ? 'border-warning/20 bg-warning/5' :
                  'border-dashed border-gray-200 bg-gray-50/60'
                }`}>
                  {req.icon === 'check' ? <CheckCircle size={16} className="text-success flex-shrink-0" /> :
                   req.icon === 'alert' ? <AlertCircle size={16} className="text-warning flex-shrink-0" /> :
                   <Lock size={16} className="text-gray-400 flex-shrink-0" />}
                  <p className={`text-sm ${req.status === 'completed' ? 'text-text-primary' : 'text-text-muted'}`}>
                    {req.requirement}
                  </p>
                  <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    req.status === 'completed' ? 'bg-success/10 text-success' :
                    req.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {req.status === 'completed' ? 'Done' : req.status === 'pending' ? 'Required' : 'Future'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
              <p className="text-xs text-text-secondary leading-relaxed">
                <span className="font-semibold">Escalation logic:</span> As credit limits grow, the platform requires progressively
                stronger verification. Bronze/Silver merchants need basic KYC. Gold requires trade references. Platinum requires
                personal guarantees and physical inspection. Diamond requires registered asset security. This creates real cost to
                gaming — a fraudster would need to fabricate verifiable business infrastructure.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── 7. Bust-Out Risk Score ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={7}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('bust-out-score')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              shield.bustOutRiskScore.total < 26 ? 'bg-success/10' :
              shield.bustOutRiskScore.total < 51 ? 'bg-warning/10' : 'bg-danger/10'
            }`}>
              <Gauge size={18} className={
                shield.bustOutRiskScore.total < 26 ? 'text-success' :
                shield.bustOutRiskScore.total < 51 ? 'text-warning' : 'text-danger'
              } />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Bust-Out Risk Score</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Composite heuristic model across 5 weighted indicators — trajectory over snapshot
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              shield.bustOutRiskScore.total < 26 ? 'bg-success/10 text-success' :
              shield.bustOutRiskScore.total < 51 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
            }`}>
              {shield.bustOutRiskScore.total}/100 — {shield.bustOutRiskScore.level}
            </span>
            {expandedSection === 'bust-out-score'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'bust-out-score' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            {/* Score gauge bar */}
            <div className="mb-5">
              <div className="flex justify-between text-[10px] text-text-muted mb-1.5">
                <span>Low Risk (0)</span>
                <span>Moderate (50)</span>
                <span>Critical (100)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${shield.bustOutRiskScore.total}%`,
                    backgroundColor:
                      shield.bustOutRiskScore.total < 26 ? '#10B981' :
                      shield.bustOutRiskScore.total < 51 ? '#F59E0B' : '#EF4444',
                  }}
                />
                {/* Threshold markers */}
                <div className="absolute top-0 left-[25%] h-full w-px bg-gray-300" />
                <div className="absolute top-0 left-[50%] h-full w-px bg-gray-300" />
                <div className="absolute top-0 left-[75%] h-full w-px bg-gray-300" />
              </div>
            </div>

            {/* Component breakdown */}
            <div className="space-y-3">
              {shield.bustOutRiskScore.components.map((comp) => {
                const weightedScore = Math.round((comp.score * comp.weight) / 100);
                const barColor =
                  comp.score < 26 ? '#10B981' :
                  comp.score < 51 ? '#F59E0B' : '#EF4444';
                return (
                  <div key={comp.name} className="p-3.5 rounded-xl border border-border bg-gray-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{comp.name}</p>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">{comp.detail}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="text-sm font-bold" style={{ color: barColor }}>{comp.score}</p>
                        <p className="text-[10px] text-text-muted">×{(comp.weight / 100).toFixed(2)} weight</p>
                        <p className="text-[10px] font-semibold text-text-secondary">= {weightedScore} pts</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${comp.score}%`, backgroundColor: barColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formula note */}
            <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-text-primary mb-1">Scoring Formula</p>
                  <p className="text-[11px] text-text-secondary font-mono leading-relaxed">
                    (Utilization Velocity × 0.30) + (Repayment Cycling × 0.25) +<br />
                    (Cross-Product Exposure × 0.20) + (Cash Flow Decline × 0.15) +<br />
                    (Device / Identity Risk × 0.10)
                  </p>
                  {personaKey === 'struggling' && (
                    <p className="text-[11px] text-warning mt-2 leading-relaxed">
                      ⚠ This merchant&apos;s elevated score is driven by genuine distress (utilization + cash flow decline), not gaming intent.
                      Cross-reference with BAS score of {shield.authenticityScore}/100 confirms authentic patterns.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── 8. Trust Dynamics ── */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={8}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <button
          onClick={() => toggleSection('trust-decay')}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${shield.trustDecayLog.length > 0 ? 'bg-warning/10' : 'bg-success/10'}`}>
              <History size={18} className={shield.trustDecayLog.length > 0 ? 'text-warning' : 'text-success'} />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-text-primary">Trust Dynamics</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Trust builds slowly, decays fast — opportunistic patterns reduce trust even without missed payments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {shield.trustDecayLog.length > 0
              ? <span className="px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning">
                  {shield.trustDecayLog.length} decay event{shield.trustDecayLog.length !== 1 ? 's' : ''}
                </span>
              : <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                  No decay events
                </span>
            }
            {expandedSection === 'trust-decay'
              ? <ChevronDown size={18} className="text-text-muted" />
              : <ChevronRight size={18} className="text-text-muted" />
            }
          </div>
        </button>

        {expandedSection === 'trust-decay' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
            {shield.trustDecayLog.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-text-primary">No trust decay detected</p>
                  <p className="text-xs text-text-secondary mt-0.5">Behavioral patterns are organic. No opportunistic signals have reduced trust score.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {shield.trustDecayLog.map((entry, i) => (
                  <div key={i} className="p-4 rounded-xl border border-warning/20 bg-warning/5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <TrendingDown size={16} className="text-warning mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-primary">{entry.event}</p>
                          <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{entry.detail}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-danger">{entry.decay} pts</p>
                        <p className="text-[10px] text-text-muted">{entry.date}</p>
                        <p className="text-[10px] text-text-secondary">Trust: {entry.trustAfter}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="font-semibold">Trust Decay Principle:</span> Unlike the credit score which only
                  accumulates on good behavior, the Trust Score decays when patterns look opportunistic — even without
                  a missed payment. Early repayments timed before limit reviews, rapid borrow-repay cycling, and
                  score growth without revenue growth are all decay triggers. Trust builds over months but can decay in days.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── Scenario Explainer: Amina's Case ── */}
      {personaKey === 'good' && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={7}
          className="bg-gradient-to-br from-primary/5 to-warning/5 rounded-2xl border border-primary/20 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={20} className="text-primary" />
            <h3 className="text-base font-semibold text-text-primary">
              Scenario: What If Amina Is Gaming the System?
            </h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-border">
              <p className="text-sm font-medium text-text-primary mb-2">The Attack Pattern</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Amina builds a perfect credit history over 48 months. Her score climbs from 650 → 812. Her limit grows to
                KES 5M. She aims to hit Diamond (KES 10M), draw the maximum loan, and exit the platform.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-border">
              <p className="text-sm font-medium text-text-primary mb-2">How Trust Shield Stops This</p>
              <div className="space-y-3 mt-3">
                {[
                  { num: '1', title: 'She can\'t access the full limit', detail: `Even with KES 5M approved, only KES ${(shield.limitVesting.vestedLimit / 1000000).toFixed(1)}M is vested. The remaining KES ${(shield.limitVesting.unvestedLimit / 1000000).toFixed(1)}M is locked until more tenure accrues.` },
                  { num: '2', title: 'Single-loan cap limits exposure', detail: `Maximum single loan is KES ${(shield.disbursementCap.maxSingleLoan / 1000000).toFixed(0)}M (${shield.disbursementCap.maxSingleLoanPercent}% of limit) — she can never draw the full facility at once.` },
                  { num: '3', title: 'Staggered release catches drop-off', detail: 'Large loans are released in 3 tranches over 60 days. If her business activity drops after tranche 1, tranches 2 and 3 are frozen.' },
                  { num: '4', title: 'Behavioral authenticity flags are active', detail: `Her authenticity score is ${shield.authenticityScore}/100 — flagged for "too perfect" patterns. Transaction entropy, revenue smoothness, and payment timing are all under elevated monitoring.` },
                  { num: '5', title: '90-day cooling period after tier upgrades', detail: 'She can\'t immediately draw increased limits after reaching a new tier. Must wait 90 days with maintained activity.' },
                  { num: '6', title: 'Security escalation blocks anonymous exit', detail: 'At Platinum, she\'s signed personal guarantees, had physical business inspection, and provided trade references. Diamond requires asset registration. Exit has real consequences.' },
                  { num: '7', title: 'Post-disbursement monitoring catches intent', detail: 'After any significant draw, the system monitors transaction continuity, fund retention, and revenue maintenance. Activity drops trigger immediate review and facility freezes.' },
                ].map((step) => (
                  <div key={step.num} className="flex gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{step.num}</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{step.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
              <p className="text-sm font-medium text-text-primary mb-1">Net Effect</p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Even if Amina&apos;s intent is to game the system, the maximum she could ever draw at once is
                <span className="font-semibold text-text-primary"> KES {(shield.disbursementCap.maxSingleLoan / 1000000).toFixed(0)}M</span> (not KES 5M or 10M).
                And even that amount would be released in tranches, with each tranche conditional on continued business activity.
                Her personal guarantee and verified trade references create legal and social accountability.
                The system turns a potential KES 10M loss into a manageable KES 500K first-tranche exposure with
                multiple circuit breakers before any further release.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info Popups */}
      <InfoPopup
        isOpen={!!selectedFactor}
        onClose={() => setSelectedFactor(null)}
        title={selectedFactor?.name || ''}
        message={selectedFactor?.detail || ''}
        type={selectedFactor?.status === 'pass' ? 'positive' : selectedFactor?.status === 'flagged' ? 'warning' : 'info'}
        details={selectedFactor ? [
          { label: 'Score', value: `${selectedFactor.score}/100` },
          { label: 'Status', value: statusColors[selectedFactor.status]?.label || selectedFactor.status },
        ] : []}
      />

      <InfoPopup
        isOpen={!!selectedTrigger}
        onClose={() => setSelectedTrigger(null)}
        title={selectedTrigger?.trigger || ''}
        message={selectedTrigger?.description || ''}
        type={selectedTrigger?.status === 'clear' ? 'positive' : 'warning'}
        details={selectedTrigger ? [
          { label: 'Status', value: statusColors[selectedTrigger.status]?.label || selectedTrigger.status },
          { label: 'Last Checked', value: selectedTrigger.lastChecked },
        ] : []}
      />
    </div>
  );
}

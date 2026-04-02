import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, CreditCard, Activity, Calendar,
  ArrowUpRight, ArrowDownRight, Zap, Eye,
  Lightbulb, ChevronRight, Target, RefreshCw, ToggleLeft, ToggleRight,
  Shield,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import InfoPopup from '../common/InfoPopup';
import CreditScoreRing from './CreditScoreRing';
import ScoreBooster from './ScoreBooster';
import FraudShield from './FraudShield';
import AiOptInModal from './AiOptInModal';
import NewCustomerDashboard from './NewCustomerDashboard';
import { useAuth } from '../../context/useAuth';
import { getPersonaByEmail, getPersonaKey, PERSONA_CREDENTIALS } from '../../data/personaData';

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
};

// const formatKES = (n) => `KES ${(n / 1000).toFixed(0)}K`;
const formatFull = (n) => `KES ${n.toLocaleString()}`;

function HealthRing({ score, color }) {
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

  const circumference = 264; // 2π × 42 ≈ 264
  const dash = (displayed / 100) * circumference;

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="relative w-24 h-24">
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">{displayed}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  // New customers (non-persona accounts) see a different landing page
  const isPersona = PERSONA_CREDENTIALS.some((c) => c.email === user?.email);
  if (!isPersona) return <NewCustomerDashboard />;

  const data = getPersonaByEmail(user?.email);
  const {
    merchant: mockMerchant, creditProfile: mockCreditProfile,
    transactions: mockTransactions, revenueData: mockRevenueData,
    loan: mockLoan, creditOffer: mockCreditOffer,
    insights: mockInsights, performanceMetrics: mockPerformanceMetrics,
    smartFeatures: mockSmartFeatures,
    theme: personaTheme,
    fraudShield: mockFraudShield,
  } = data;
  const personaKey = getPersonaKey(user?.email);
  const isStruggling = personaKey === 'struggling';
  const merchantName = user?.businessName || mockMerchant.name;
  const ownerName = user?.name || mockMerchant.ownerName;
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [showOffer, setShowOffer] = useState(false);
  const [showScoreDetail, setShowScoreDetail] = useState(false);
  const [showLoanDetail, setShowLoanDetail] = useState(false);
  const [showCreditDetail, setShowCreditDetail] = useState(false);
  const [showRevenueDetail, setShowRevenueDetail] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshed(new Date());
    }, 1200);
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0} className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              {greeting()}, {ownerName.split(' ')[0]}
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Here&apos;s how {merchantName} is performing today.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all disabled:opacity-60"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin text-primary' : ''} />
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
            <p className="text-[11px] text-text-muted">
              Updated {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 p-1 bg-white border border-border rounded-2xl w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'score-hub', label: 'Score Hub', icon: Target },
            { id: 'trust-shield', label: 'Trust Shield', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              {tab.id === 'score-hub' && activeTab !== 'score-hub' && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
              {tab.id === 'trust-shield' && activeTab !== 'trust-shield' && (
                <span className="w-2 h-2 rounded-full bg-warning" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'score-hub' && <ScoreBooster />}

        {activeTab === 'trust-shield' && <FraudShield />}

        {activeTab === 'overview' && <>

        {/* Credit Offer Banner */}
        {mockCreditOffer && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1} className="mb-6">
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/15 rounded-xl">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="font-semibold">Pre-approved credit offer available</p>
                  <p className="text-sm text-white/70">
                    Up to {formatFull(mockCreditOffer.amount)} at {mockCreditOffer.interestRate}% — Credit Catalyst Engine confidence: {mockCreditOffer.aiConfidence}%
                  </p>
                </div>
              </div>
              <button onClick={() => setShowOffer(true)} className="px-5 py-2.5 bg-white text-primary font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 whitespace-nowrap">
                View Offer <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Credit Score',
              value: mockCreditProfile.creditScore,
              sub: `of ${mockCreditProfile.maxScore}`,
              detail: `${800 - mockCreditProfile.creditScore} pts to Platinum`,
              progress: Math.round((mockCreditProfile.creditScore / mockCreditProfile.maxScore) * 100),
              progressColor: personaTheme.bg,
              icon: Activity, color: personaTheme.tw, bg: personaTheme.bgLight,
              trend: '+4', trendUp: true,
              onClick: () => setShowScoreDetail(true),
            },
            {
              label: 'Available Credit',
              value: formatFull(mockCreditProfile.availableCredit),
              sub: mockFraudShield?.limitVesting?.unvestedLimit > 0
                ? `of ${formatFull(mockFraudShield.limitVesting.vestedLimit)} vested`
                : `of ${formatFull(mockCreditProfile.creditLimit)}`,
              detail: mockFraudShield?.limitVesting?.unvestedLimit > 0
                ? `${Math.round((mockCreditProfile.usedCredit / mockCreditProfile.creditLimit) * 100)}% utilised · ${formatFull(mockFraudShield.limitVesting.unvestedLimit)} in progressive vesting`
                : `${Math.round((mockCreditProfile.usedCredit / mockCreditProfile.creditLimit) * 100)}% utilised · ${formatFull(mockCreditProfile.usedCredit)} in use`,
              progress: Math.round((mockCreditProfile.availableCredit / mockCreditProfile.creditLimit) * 100),
              progressColor: 'bg-accent',
              icon: CreditCard, color: 'text-accent', bg: 'bg-accent/5',
              onClick: () => setShowCreditDetail(true),
            },
            {
              label: 'Monthly Revenue',
              value: formatFull(mockRevenueData[5].revenue),
              sub: `${mockPerformanceMetrics.monthlyGrowth}% vs last month`,
              detail: `Daily avg: ${formatFull(mockPerformanceMetrics.dailyAvgRevenue)}`,
              progress: Math.round((mockRevenueData[5].revenue / 2000000) * 100),
              progressColor: 'bg-success',
              icon: TrendingUp, color: 'text-success', bg: 'bg-success/5',
              trend: `+${mockPerformanceMetrics.monthlyGrowth}%`, trendUp: true,
              onClick: () => setShowRevenueDetail(true),
            },
            {
              label: 'Next Payment',
              value: formatFull(mockLoan.nextPayment),
              sub: `Due ${mockLoan.nextPaymentDate}`,
              detail: `${mockPerformanceMetrics.daysUntilNextPayment} days away · ${mockLoan.monthsRemaining} months left`,
              progress: Math.round(((mockLoan.term - mockLoan.monthsRemaining) / mockLoan.term) * 100),
              progressColor: 'bg-warning',
              icon: Calendar, color: 'text-warning', bg: 'bg-warning/5',
              onClick: () => setShowLoanDetail(true),
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={i + 2}
              onClick={stat.onClick}
              className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                {stat.trend && (
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.trendUp ? 'text-success' : 'text-danger'}`}>
                    {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-secondary mt-0.5">{stat.sub}</p>
              <p className="text-xs text-text-muted mt-0.5">{stat.detail}</p>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${stat.progressColor}`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column (2-wide) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Revenue Overview</h2>
                  <p className="text-xs text-text-secondary">Last 6 months performance</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: personaTheme.hex }} /> Revenue</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Profit</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={mockRevenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={personaTheme.hex} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={personaTheme.hex} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A86B" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#00A86B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(v) => formatFull(v)} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }} />
                  <Area type="monotone" dataKey="revenue" stroke={personaTheme.hex} strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="profit" stroke="#00A86B" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Repayment Schedule */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={7} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Repayment Schedule</h2>
                  <p className="text-xs text-text-secondary">Loan {mockLoan.id} — {mockLoan.monthsRemaining} months remaining</p>
                </div>
                <div className="flex items-center gap-2">
                  {mockLoan.flexPayEnabled
                    ? <span className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"><Zap size={12} /> Flex-Pay On</span>
                    : <span className="text-xs text-text-muted px-3 py-1 bg-gray-50 border border-dashed border-gray-200 rounded-full">Standard schedule</span>
                  }
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-2 py-0.5 bg-gray-100 rounded-full">Opt-in</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockLoan.repaymentSchedule}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v) => formatFull(v)} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }} />
                  <Bar
                    dataKey={(d) => d.adjustedAmount || d.amount}
                    radius={[8, 8, 0, 0]}
                    fill={personaTheme.hex}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: personaTheme.hex }} /> Standard</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Adjusted by Flex-Pay</span>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={8} className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Transactions</h2>
              <div className="space-y-3">
                {mockTransactions.slice(0, 6).map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.type === 'credit' ? 'bg-success/10' : 'bg-danger/10'}`}>
                        {txn.type === 'credit' ? <ArrowDownRight size={18} className="text-success rotate-180" /> : <ArrowUpRight size={18} className="text-danger" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{txn.description}</p>
                        <p className="text-xs text-text-muted">{txn.date} · {txn.channel}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${txn.type === 'credit' ? 'text-success' : 'text-text-primary'}`}>
                      {txn.type === 'credit' ? '+' : ''}{formatFull(txn.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Credit Score Ring */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Credit Score</h2>
                <button onClick={() => setShowScoreDetail(true)} className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
                  <Eye size={14} /> Details
                </button>
              </div>
              <CreditScoreRing score={mockCreditProfile.creditScore} maxScore={mockCreditProfile.maxScore} themeColor={personaTheme.ring} />
              <div className="mt-4 space-y-2">
                {mockCreditProfile.factors.slice(0, 3).map((f) => (
                  <div key={f.name} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{f.name}</span>
                    <span className={`font-medium ${f.impact === 'positive' ? 'text-success' : f.impact === 'negative' ? 'text-danger' : 'text-text-muted'}`}>
                      {f.impact === 'positive' ? '↑' : f.impact === 'negative' ? '↓' : '—'} {f.weight}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Insights — hidden for struggling merchants (conventional servicing) */}
            {!isStruggling && mockInsights.length > 0 && (
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={7} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} className="text-accent" />
                <h2 className="text-lg font-semibold text-text-primary">Customer Insights</h2>
              </div>
              <div className="space-y-3">
                {mockInsights.map((insight) => (
                  <button
                    key={insight.id}
                    onClick={() => setSelectedInsight(insight)}
                    className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-sm ${
                      insight.impact === 'positive'
                        ? 'border-success/20 bg-success/5 hover:border-success/40'
                        : insight.impact === 'action'
                          ? 'border-accent/20 bg-accent/5 hover:border-accent/40'
                          : 'border-border hover:border-primary/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">{insight.category}</p>
                        <p className="text-sm font-medium text-text-primary">{insight.title}</p>
                      </div>
                      <ChevronRight size={14} className="text-text-muted mt-1 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
            )}

            {/* Smart Features (Opt-In) */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={8} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={17} className="text-primary" />
                <h2 className="text-lg font-semibold text-text-primary">{isStruggling ? 'Loan Servicing' : 'Smart Features'}</h2>
              </div>
              {isStruggling ? (
                <div className="mt-3">
                  <p className="text-xs text-text-muted mb-4">Your loan is serviced using standard terms — fixed monthly repayments and monthly credit score recalculation.</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Repayment Type', value: 'Fixed monthly — KES 18,000/month', icon: Calendar },
                      { label: 'Score Update Cycle', value: 'Monthly recalculation', icon: Activity },
                      { label: 'Interest Rate', value: '18.0% p.a. (standard)', icon: CreditCard },
                    ].map((item) => (                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-gray-50/60">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <item.icon size={14} className="text-text-muted" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-muted">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted mt-4 leading-relaxed">
                    Improve your credit score to unlock AI-powered features such as Flex-Pay repayments, Auto-restructure of loans, and real-time score updates.
                  </p>
                  {/* Self-Healing Engagement Callout */}
                  <div className="mt-4 p-4 rounded-xl bg-warning/5 border border-warning/20">
                    <div className="flex items-start gap-2 mb-2">
                      <RefreshCw size={15} className="text-warning mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-semibold text-text-primary">Self-Healing Loan Available</p>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">
                      Your revenue and repayment pattern qualifies you for a self-healing loan restructure —
                      reduced monthly payments and an extended term while your business recovers.
                      Engaging with restructuring prevents a default from permanently affecting your credit.
                    </p>
                    <button
                      className="w-full px-4 py-2 bg-warning text-white text-xs font-semibold rounded-xl hover:bg-warning/90 transition-all"
                      onClick={() => {}}
                    >
                      Talk to Your Relationship Manager
                    </button>
                  </div>
                </div>
              ) : user?.aiOptIn ? (
                <>
                  <p className="text-xs text-text-muted mb-4">Credit Catalyst-powered features are active on your account.</p>
                  <div className="space-y-3">
                    {mockSmartFeatures.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFeature(f)}
                        className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl border border-border hover:border-primary/20 hover:bg-gray-50/60 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-text-primary truncate">{f.label}</p>
                            <span className={`flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                              f.enabled ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-text-muted'
                            }`}>{f.enabled ? 'On' : 'Off'}</span>
                          </div>
                          <p className="text-[11px] text-text-muted mt-0.5">{f.category} · Default: {f.default}</p>
                        </div>
                        {f.enabled
                          ? <ToggleRight size={22} className="text-accent flex-shrink-0" />
                          : <ToggleLeft size={22} className="text-gray-300 flex-shrink-0" />
                        }
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <ToggleLeft size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-text-muted mb-1">Credit Catalyst features are not enabled</p>
                  <p className="text-xs text-text-muted">Loan drawdown and repayment use standard terms. Enable Credit Catalyst Engine Insights to unlock Flex-Pay, Auto-restructure of loans, and more.</p>
                </div>
              )}
            </motion.div>

            {/* Health Score */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={9} className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Business Health</h2>
              <HealthRing score={mockPerformanceMetrics.healthScore} color={personaTheme.hex} />
              <div className="space-y-3 mt-4">
                {[
                  { label: 'Daily Avg Revenue', value: formatFull(mockPerformanceMetrics.dailyAvgRevenue) },
                  { label: 'Payment Success', value: `${mockPerformanceMetrics.paymentSuccessRate}%` },
                  { label: 'Weekly Growth', value: `+${mockPerformanceMetrics.weeklyGrowth}%` },
                ].map((m) => (
                  <div key={m.label} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{m.label}</span>
                    <span className="font-medium text-text-primary">{m.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        </> /* end overview tab */}
      </div>

      {/* Info Popups */}
      <InfoPopup
        isOpen={!!selectedInsight}
        onClose={() => setSelectedInsight(null)}
        title={selectedInsight?.title || ''}
        message={selectedInsight?.description || ''}
        type={selectedInsight?.impact || 'info'}
      />

      {mockCreditOffer && <InfoPopup
        isOpen={showOffer}
        onClose={() => setShowOffer(false)}
        title="Pre-Approved Credit Offer"
        message={mockCreditOffer.explanation}
        type="positive"
        details={[
          { label: 'Amount', value: formatFull(mockCreditOffer.amount) },
          { label: 'Interest Rate', value: `${mockCreditOffer.interestRate}%` },
          { label: 'Term', value: `${mockCreditOffer.term} months` },
          { label: 'Monthly Payment', value: formatFull(mockCreditOffer.monthlyPayment) },
          { label: 'Credit Catalyst Confidence', value: `${mockCreditOffer.aiConfidence}%` },
          { label: 'Expires', value: mockCreditOffer.expiresAt },
          ...(mockFraudShield?.disbursementCap?.staggeredRelease && mockFraudShield?.disbursementCap?.trancheSchedule ? [
            { label: '─── Disbursement Policy ───', value: 'Staggered release applies' },
            ...mockFraudShield.disbursementCap.trancheSchedule.map((t) => ({
              label: `Tranche ${t.tranche} — ${t.release}`,
              value: `${formatFull(t.amount)} (on: ${t.condition})`,
            })),
          ] : []),
        ]}
        actions={[
          { label: 'Decline', onClick: () => setShowOffer(false) },
          { label: 'Accept Offer', onClick: () => setShowOffer(false), primary: true },
        ]}
      />}

      <InfoPopup
        isOpen={showScoreDetail}
        onClose={() => setShowScoreDetail(false)}
        title="Credit Score Breakdown"
        message="Your credit score is calculated using multiple factors from your business performance and payment history."
        type="info"
        details={mockCreditProfile.factors.map((f) => ({
          label: f.name,
          value: `${f.weight}% — ${f.impact}`,
        }))}
      />

      <InfoPopup
        isOpen={showLoanDetail}
        onClose={() => setShowLoanDetail(false)}
        title="Active Loan Details"
        message={`Loan ${mockLoan.id} — ${mockLoan.flexPayEnabled ? 'Flex-Pay is active and adjusting your repayments based on cash flow.' : 'Standard repayment schedule.'}`}
        type="info"
        details={[
          { label: 'Original Amount', value: formatFull(mockLoan.amount) },
          { label: 'Outstanding Balance', value: formatFull(mockLoan.balance) },
          { label: 'Amount Repaid', value: formatFull(mockLoan.amount - mockLoan.balance) },
          { label: 'Repaid', value: `${Math.round(((mockLoan.amount - mockLoan.balance) / mockLoan.amount) * 100)}% of loan` },
          { label: 'Interest Rate', value: `${mockLoan.interestRate}% p.a.` },
          { label: 'Next Payment', value: `${formatFull(mockLoan.nextPayment)} on ${mockLoan.nextPaymentDate}` },
          { label: 'Days Until Due', value: `${mockPerformanceMetrics.daysUntilNextPayment} days` },
          { label: 'Remaining Term', value: `${mockLoan.monthsRemaining} of ${mockLoan.term} months` },
          { label: 'Flex-Pay', value: mockLoan.flexPayEnabled ? 'Active — adjusts to cash flow' : 'Not active' },
        ]}
      />

      <InfoPopup
        isOpen={showCreditDetail}
        onClose={() => setShowCreditDetail(false)}
        title="Available Credit Breakdown"
        message="Your credit facility is based on your AI credit score and business performance. Keeping utilisation below 40% maintains your low-risk rating."
        type="info"
        details={[
          { label: 'Approved Limit', value: formatFull(mockCreditProfile.creditLimit) },
          ...(mockFraudShield?.limitVesting?.unvestedLimit > 0 ? [
            { label: 'Vested (Drawable)', value: formatFull(mockFraudShield.limitVesting.vestedLimit) },
            { label: 'In Progressive Vesting', value: `${formatFull(mockFraudShield.limitVesting.unvestedLimit)} — unlocks over time` },
          ] : []),
          { label: 'Amount in Use', value: formatFull(mockCreditProfile.usedCredit) },
          { label: 'Available Now', value: formatFull(mockCreditProfile.availableCredit) },
          { label: 'Utilisation Rate', value: `${Math.round((mockCreditProfile.usedCredit / mockCreditProfile.creditLimit) * 100)}% — Low risk` },
          { label: 'Current Tier', value: `${mockMerchant.tier} — Up to ${formatFull(mockCreditProfile.creditLimit)}` },
          { label: 'Risk Level', value: mockCreditProfile.riskLevel },
          { label: 'Utilisation Tip', value: 'Staying below 40% can add +5 pts to your score' },
          { label: 'Next Review', value: 'June 2026 (based on growth targets)' },
        ]}
      />

      <InfoPopup
        isOpen={showRevenueDetail}
        onClose={() => setShowRevenueDetail(false)}
        title="Monthly Revenue Overview"
        message="Revenue is tracked across all payment channels — LOOP, POS, bank transfers, and e-commerce. Consistent growth directly improves your credit score."
        type="positive"
        details={[
          { label: 'This Month (Mar)', value: formatFull(mockRevenueData[5].revenue) },
          { label: 'Last Month (Feb)', value: formatFull(mockRevenueData[4].revenue) },
          { label: 'Month-on-Month', value: `+${formatFull(mockRevenueData[5].revenue - mockRevenueData[4].revenue)} (+${mockPerformanceMetrics.monthlyGrowth}%)` },
          { label: 'Net Profit (Mar)', value: formatFull(mockRevenueData[5].profit) },
          { label: 'Profit Margin', value: `${Math.round((mockRevenueData[5].profit / mockRevenueData[5].revenue) * 100)}%` },
          { label: 'Daily Average', value: formatFull(mockPerformanceMetrics.dailyAvgRevenue) },
          { label: 'Weekly Growth', value: `+${mockPerformanceMetrics.weeklyGrowth}%` },
          { label: 'Best Month (6mo)', value: `Dec — ${formatFull(mockRevenueData[2].revenue)}` },
          { label: 'YTD (Jan–Mar)', value: formatFull(mockRevenueData[3].revenue + mockRevenueData[4].revenue + mockRevenueData[5].revenue) },
          { label: '6-Month Avg', value: formatFull(Math.round(mockRevenueData.reduce((s, r) => s + r.revenue, 0) / mockRevenueData.length)) },
        ]}
      />

      <AiOptInModal />

      <InfoPopup
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.label || ''}
        message={selectedFeature?.description || ''}
        type="info"
        details={selectedFeature ? [
          { label: 'Category', value: selectedFeature.category },
          { label: 'Default behaviour', value: selectedFeature.default },
          { label: 'Status', value: selectedFeature.enabled ? 'Enabled — you have opted in' : 'Disabled — default behaviour applies' },
        ] : null}
        actions={[
          { label: 'Close', onClick: () => setSelectedFeature(null) },
          {
            label: selectedFeature?.enabled ? 'Turn Off' : 'Enable Feature',
            onClick: () => setSelectedFeature(null),
            primary: !selectedFeature?.enabled,
          },
        ]}
      />
    </div>
  );
}

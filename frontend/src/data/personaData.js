// ─────────────────────────────────────────────
// Three merchant personas with full data sets
// ─────────────────────────────────────────────

// ═══════════════════════════════════════════════
//  1. GOOD MERCHANT — Amina Wanjiku, Wanjiku Fresh Produce
// ═══════════════════════════════════════════════
const goodMerchant = {
  id: 'MCH-2024-001',
  name: 'Wanjiku Fresh Produce',
  ownerName: 'Amina Wanjiku',
  email: 'amina@wanjikufresh.co.ke',
  phone: '+254 712 345 678',
  businessType: 'Wholesale Agriculture',
  location: 'Nairobi, Kenya',
  registrationDate: '2022-03-10',
  tier: 'Platinum',
  kycStatus: 'verified',
  avatar: null,
};

const goodCreditProfile = {
  creditScore: 812,
  maxScore: 850,
  creditLimit: 5000000,
  availableCredit: 4200000,
  usedCredit: 800000,
  riskLevel: 'Very Low',
  scoreHistory: [
    { month: 'Oct', score: 778 },
    { month: 'Nov', score: 789 },
    { month: 'Dec', score: 795 },
    { month: 'Jan', score: 801 },
    { month: 'Feb', score: 808 },
    { month: 'Mar', score: 812 },
  ],
  factors: [
    { name: 'Payment History', impact: 'positive', weight: 35, detail: 'Perfect repayment record — 14 consecutive on-time payments' },
    { name: 'Revenue Consistency', impact: 'positive', weight: 25, detail: 'Consistent 18% monthly revenue growth over 12 months' },
    { name: 'Credit Utilization', impact: 'positive', weight: 20, detail: 'Only 16% of available credit in use — excellent management' },
    { name: 'Business Age', impact: 'positive', weight: 10, detail: 'Operating for 4+ years with strong track record' },
    { name: 'Industry Risk', impact: 'positive', weight: 10, detail: 'Agriculture wholesale — essential goods, low sector risk' },
  ],
};

const goodTransactions = [
  { id: 'TXN-001', date: '2026-03-25', description: 'LOOP Collection — Bulk Order', amount: 185000, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-002', date: '2026-03-25', description: 'Supplier Payment — Twiga Foods', amount: -95000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-003', date: '2026-03-24', description: 'POS Sales — Retail Counter', amount: 127500, type: 'credit', channel: 'POS' },
  { id: 'TXN-004', date: '2026-03-24', description: 'Loan Repayment — March', amount: -52000, type: 'debit', channel: 'Auto-debit' },
  { id: 'TXN-005', date: '2026-03-23', description: 'E-commerce Order — Jumia B2B', amount: 92100, type: 'credit', channel: 'E-commerce' },
  { id: 'TXN-006', date: '2026-03-23', description: 'LOOP Collection — Regular', amount: 148900, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-007', date: '2026-03-22', description: 'Rent Payment', amount: -65000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-008', date: '2026-03-22', description: 'POS Sale — Wholesale Buyer', amount: 215000, type: 'credit', channel: 'POS' },
];

const goodRevenueData = [
  { month: 'Oct', revenue: 2800000, expenses: 1900000, profit: 900000 },
  { month: 'Nov', revenue: 3100000, expenses: 2050000, profit: 1050000 },
  { month: 'Dec', revenue: 3600000, expenses: 2300000, profit: 1300000 },
  { month: 'Jan', revenue: 3200000, expenses: 2100000, profit: 1100000 },
  { month: 'Feb', revenue: 3450000, expenses: 2200000, profit: 1250000 },
  { month: 'Mar', revenue: 3800000, expenses: 2350000, profit: 1450000 },
];

const goodLoan = {
  id: 'LN-2025-0018',
  amount: 2000000,
  balance: 800000,
  interestRate: 9.5,
  term: 18,
  monthsRemaining: 6,
  nextPayment: 52000,
  nextPaymentDate: '2026-04-01',
  status: 'active',
  flexPayEnabled: true,
  selfHealingActive: false,
  repaymentSchedule: [
    { month: 'Jan', amount: 52000, status: 'paid', adjustedAmount: null },
    { month: 'Feb', amount: 52000, status: 'paid', adjustedAmount: null },
    { month: 'Mar', amount: 52000, status: 'paid', adjustedAmount: null },
    { month: 'Apr', amount: 52000, status: 'upcoming', adjustedAmount: null },
    { month: 'May', amount: 52000, status: 'upcoming', adjustedAmount: null },
    { month: 'Jun', amount: 52000, status: 'upcoming', adjustedAmount: null },
  ],
};

const goodCreditOffer = {
  id: 'OFFER-2026-008',
  amount: 3000000,
  interestRate: 8.5,
  term: 24,
  monthlyPayment: 140000,
  expiresAt: '2026-04-30',
  type: 'Pre-approved',
  aiConfidence: 97,
  explanation: 'Your exceptional payment history, 18% revenue growth, and Platinum tier status qualify you for our premium credit facility at the lowest available rate.',
};

const goodInsights = [
  { id: 1, category: 'Revenue', title: 'Exceptional Growth Trajectory', description: 'Your revenue has grown 18% MoM — you\'re in the top 5% of merchants on the platform. You could reach Diamond tier by Q3 2026.', impact: 'positive' },
  { id: 2, category: 'Repayment', title: 'Perfect Repayment Streak', description: '14 consecutive on-time payments. This track record has unlocked your preferential 9.5% interest rate — 3% below standard.', impact: 'positive' },
  { id: 3, category: 'Opportunity', title: 'Eligible for Premium Partner Benefits', description: 'Platinum merchants get access to LOOP BIZ reduced LOOP fees. This could save you KES 45,000/month in transaction costs.', impact: 'positive' },
  { id: 4, category: 'Action', title: 'Reach Diamond Tier', description: 'You\'re only 38 points away from Diamond. Maintaining current trajectory for 3 more months should get you there.', impact: 'action' },
];

const goodPerformanceMetrics = {
  dailyAvgRevenue: 126700,
  weeklyGrowth: 4.8,
  monthlyGrowth: 18.2,
  paymentSuccessRate: 100,
  daysUntilNextPayment: 6,
  healthScore: 95,
};

const goodSmartFeatures = [
  { id: 'flex-pay', label: 'Flex-Pay Repayments', description: 'Automatically adjusts your monthly repayment based on real-time cash flow — lower in slow months, higher when business is strong.', enabled: true, category: 'Repayment', default: 'Fixed monthly repayment' },
  { id: 'self-healing', label: 'Auto-restructure of Loans', description: 'Credit Catalyst Engine proactively restructures your loan if revenue drops significantly, preventing defaults before they happen.', enabled: false, category: 'Repayment', default: 'Standard fixed terms' },
  { id: 'realtime-score', label: 'Real-Time Score Updates', description: 'Credit score updates after every qualifying transaction instead of the standard monthly cycle.', enabled: true, category: 'Scoring', default: 'Monthly score recalculation' },
  { id: 'ai-alerts', label: 'Cash Flow Alerts', description: 'Proactive notifications when Credit Catalyst Engine detects patterns that could affect your repayments or score.', enabled: true, category: 'Intelligence', default: 'Standard payment reminders only' },
];

const goodScoreMilestones = [
  { score: 650, label: 'Bronze', limitLabel: 'KES 500K', achieved: true },
  { score: 700, label: 'Silver', limitLabel: 'KES 1M + 1% interest rate reduction', achieved: true },
  { score: 742, label: 'Gold', limitLabel: 'KES 2.5M + 0.5% interest rate reduction', achieved: true },
  { score: 800, label: 'Platinum', limitLabel: 'KES 5M + 2% interest rate reduction', achieved: true, current: true },
  { score: 850, label: 'Diamond', limitLabel: 'KES 10M + 5% interest rate reduction', achieved: false },
];

const goodScoreIncentives = [
  { id: 1, action: 'Maintain perfect repayment for 2 more months', reward: 'Diamond Tier unlock', scorePoints: 20, difficulty: 'Easy', daysLeft: 60 },
  { id: 2, action: 'Diversify into 4th payment channel', reward: '+KES 500,000 credit limit', scorePoints: 15, difficulty: 'Medium', daysLeft: null },
  { id: 3, action: 'Grow monthly revenue past KES 4M', reward: '1% interest reduction', scorePoints: 10, difficulty: 'Medium', daysLeft: 30 },
  { id: 4, action: 'Connect additional LOOP till', reward: '+10 pts + partner rewards', scorePoints: 10, difficulty: 'Easy', daysLeft: null },
  { id: 5, action: 'Refer another merchant to the platform', reward: '+KES 200K limit + 5 pts', scorePoints: 5, difficulty: 'Easy', daysLeft: null },
];

const goodAIAdvice = [
  { id: 1, title: 'Maximize Diamond Tier path', body: 'You\'re 38 points from Diamond. Your current trajectory gets you there by August 2026. Consider connecting your second LOOP Till for an instant +10 points boost.', scoreImpact: 10, effort: 'Low effort' },
  { id: 2, title: 'Optimize cash reserve strategy', body: 'Your minimum float is KES 280K — well above the recommended KES 50K. Consider investing idle capital in short-term instruments via NCBA.', scoreImpact: 5, effort: 'Medium effort' },
  { id: 3, title: 'Leverage Platinum partner benefits', body: 'You\'re eligible for Safaricom Business reduced fees but haven\'t activated them. This could save KES 540K annually on LOOP transaction costs.', scoreImpact: 8, effort: 'Low effort' },
  { id: 4, title: 'Early repayment bonus', body: 'You\'re already paying on time. Shifting payments 5 days earlier could add a +5 consistency bonus and demonstrate premium creditworthiness.', scoreImpact: 5, effort: 'Low effort' },
];

const goodChallenges = [
  { id: 1, title: 'Diamond Countdown', description: 'Reach 850 credit score within the next 6 months', progress: 812, target: 850, unit: 'pts', reward: 'KES 10M limit + 5% interest rate reduction', status: 'active', daysLeft: 180 },
  { id: 2, title: 'Perfect Repayment Streak', description: 'Make all repayments on time for 6 consecutive months', progress: 6, target: 6, unit: 'months', reward: '+30 pts + 1.5% rate discount', status: 'completed', daysLeft: null },
  { id: 3, title: 'Revenue Champion', description: 'Exceed KES 4M monthly revenue', progress: 3.8, target: 4, unit: 'M KES', reward: '+15 pts + premium partner access', status: 'active', daysLeft: 30 },
  { id: 4, title: 'Multi-Channel Master', description: 'Process transactions through 4 different payment channels', progress: 3, target: 4, unit: 'channels', reward: '+18 pts + KES 500K limit', status: 'active', daysLeft: null },
];

const goodBusinessImpact = [
  { label: 'Gold (742)', limit: 2500000, growthRate: 10900000, stockCycle: '18 days', current: false },
  { label: 'You (812)', limit: 5000000, growthRate: 14600000, stockCycle: '10 days', current: true },
  { label: 'Diamond (850)', limit: 10000000, growthRate: 17300000, stockCycle: '8 days', current: false },
];

const goodPartnerRewards = [
  { id: 1, partner: 'Twiga Foods', benefit: '5% discount on bulk purchases', tier: 'Silver+', active: true, logo: 'TF' },
  { id: 2, partner: 'NCBA Insurance', benefit: 'Business insurance at 15% off', tier: 'Gold+', active: true, logo: 'NI' },
  { id: 3, partner: 'DHL Express', benefit: 'Free delivery on orders above KES 5,000', tier: 'Gold+', active: true, logo: 'DHL' },
  { id: 4, partner: 'Safaricom Business', benefit: 'Reduced LOOP transaction fees (0.5%)', tier: 'Platinum', active: true, logo: 'SAF' },
  { id: 5, partner: 'Jumia B2B', benefit: 'Priority listing + 3% cashback on restocking', tier: 'Platinum', active: true, logo: 'JB2' },
];

const goodScoreHistory = [
  { date: 'Mar 26', change: +4, reason: 'Perfect payment consistency for 14th consecutive month', score: 812 },
  { date: 'Mar 19', change: +3, reason: 'Revenue exceeded KES 3.5M monthly threshold', score: 808 },
  { date: 'Mar 12', change: +2, reason: 'Multi-channel transaction diversity bonus', score: 805 },
  { date: 'Mar 5', change: +5, reason: 'Completed 6-month on-time repayment challenge', score: 803 },
  { date: 'Feb 26', change: +1, reason: 'Low credit utilization maintained under 20%', score: 798 },
  { date: 'Feb 19', change: +3, reason: 'Business insurance added through NCBA partner', score: 797 },
];

const goodNotifications = [
  { id: 1, type: 'success', title: 'Credit Score Updated', message: 'Your score increased by 4 points to 812. You\'re 38 points from Diamond!', time: '2 hours ago', read: false },
  { id: 2, type: 'info', title: 'Premium Credit Offer', message: 'You have a pre-approved credit offer of KES 3,000,000 at 8.5% — our best rate.', time: '5 hours ago', read: false },
  { id: 3, type: 'success', title: 'Platinum Perks Unlocked', message: 'You now have access to LOOP BIZ reduced LOOP fees.', time: '1 day ago', read: true },
  { id: 4, type: 'info', title: 'Challenge Completed!', message: 'You completed the Perfect Repayment Streak challenge. +30 pts credited.', time: '3 days ago', read: true },
];

// ── TRUST SHIELD: Anti-Gaming / Bust-Out Fraud Prevention ──
const goodFraudShield = {
  // Behavioral Authenticity Score — measures how "organic" merchant behavior appears
  // Too-perfect behavior is itself a signal. Real businesses have natural variance.
  authenticityScore: 72,
  authenticityLabel: 'Moderate',
  authenticityStatus: 'review',
  authenticityFactors: [
    { name: 'Transaction Entropy', score: 58, status: 'flagged', detail: 'Transaction amounts show unusually low variance — 92% fall within a narrow KES 85K–215K band. Genuine wholesale merchants typically show 40–60% variance.' },
    { name: 'Revenue Volatility', score: 65, status: 'flagged', detail: 'Revenue growth is unnaturally smooth (18% MoM with <2% deviation). Real agricultural businesses show seasonal dips of 10–25%.' },
    { name: 'Counterparty Diversity', score: 88, status: 'pass', detail: '14 unique counterparties in last 90 days. Healthy diversity — not consistent with circular transaction patterns.' },
    { name: 'Payment Timing Pattern', score: 61, status: 'flagged', detail: 'All 14 payments made exactly 1 day before due date. Natural variation would show 5–15 day spread. Possible automated optimization.' },
    { name: 'Channel Consistency', score: 92, status: 'pass', detail: '3 active channels (LOOP, POS, E-commerce) with organic distribution. No suspicious concentration.' },
    { name: 'Peer Cohort Comparison', score: 70, status: 'review', detail: 'Score trajectory is 2.1σ above peer cohort mean. Top 3% acceleration — consistent with either exceptional performance or score farming.' },
  ],

  // Graduated Limit Vesting — credit limit doesn't unlock all at once
  limitVesting: {
    totalApprovedLimit: 5000000,
    vestedLimit: 3500000,       // what she can actually draw
    unvestedLimit: 1500000,     // locked until more tenure accrues
    vestingSchedule: [
      { month: 'Month 1–6', amount: 500000, status: 'vested', label: 'Initial facility' },
      { month: 'Month 7–12', amount: 1000000, status: 'vested', label: 'First increase' },
      { month: 'Month 13–24', amount: 1000000, status: 'vested', label: 'Growth tranche' },
      { month: 'Month 25–36', amount: 1000000, status: 'vested', label: 'Tenure reward' },
      { month: 'Month 37–48', amount: 1000000, status: 'partial', label: 'In vesting (60%)' },
      { month: 'Month 49+', amount: 500000, status: 'locked', label: 'Future unlock' },
    ],
    currentTenureMonths: 48,
    coolingPeriodDays: 90,      // must wait 90 days after tier upgrade before drawing new limit
    lastTierUpgrade: '2026-01-15',
    coolingComplete: true,
  },

  // Maximum Single Disbursement Cap — can't take it all and run
  disbursementCap: {
    maxSingleLoan: 2000000,             // 40% of total limit
    maxSingleLoanPercent: 40,
    currentOutstanding: 800000,
    availableForNewLoan: 1200000,        // lesser of: vested-outstanding or maxSingle
    staggeredRelease: true,              // large loans released in tranches
    trancheSchedule: [
      { tranche: 1, amount: 500000, release: 'Immediate', condition: 'On approval' },
      { tranche: 2, amount: 350000, release: '30 days', condition: 'Continued revenue activity' },
      { tranche: 3, amount: 350000, release: '60 days', condition: 'No negative signals' },
    ],
  },

  // Exit Velocity Triggers — patterns that would trigger enhanced review
  exitVelocityTriggers: [
    { id: 1, trigger: 'Sudden max-limit loan request', status: 'clear', description: 'Loan > 70% of limit within 30 days of tier upgrade', lastChecked: '2026-03-30' },
    { id: 2, trigger: 'Score acceleration anomaly', status: 'flagged', description: 'Score growth 2.1σ above peer cohort — under monitoring', lastChecked: '2026-03-30' },
    { id: 3, trigger: 'Revenue pattern break', status: 'clear', description: 'No significant deceleration in transaction activity post-disbursement', lastChecked: '2026-03-30' },
    { id: 4, trigger: 'Fund outflow spike', status: 'clear', description: 'No unusual transfer-out volume after last disbursement', lastChecked: '2026-03-30' },
    { id: 5, trigger: 'Counterparty concentration shift', status: 'clear', description: 'Transaction counterparties remain diverse and organic', lastChecked: '2026-03-30' },
  ],

  // Post-Disbursement Monitoring — active monitoring after any significant credit draw
  postDisbursementMonitoring: {
    active: true,
    loanId: 'LN-2025-0018',
    monitoringLevel: 'Standard',
    daysSinceDisbursement: 365,
    checksCompleted: 12,
    checksPassed: 11,
    checksFailed: 1,
    failedCheck: 'Revenue volatility below expected range — flagged for review',
    metrics: [
      { name: 'Transaction continuity', status: 'pass', detail: 'Transactions maintained post-disbursement at 95% of pre-disbursement volume' },
      { name: 'Fund retention', status: 'pass', detail: '78% of disbursed funds retained in business operations (threshold: 60%)' },
      { name: 'Revenue maintenance', status: 'review', detail: 'Revenue maintained but growth pattern unusually smooth — monitoring' },
      { name: 'Account balance pattern', status: 'pass', detail: 'No suspicious zero-balance or bulk-withdrawal patterns detected' },
    ],
  },

  // Security Escalation — additional requirements at higher tiers
  securityTier: {
    current: 'Enhanced',
    requirements: [
      { requirement: 'KYC Level 3 Verification', status: 'completed', icon: 'check' },
      { requirement: 'Business registration certificate', status: 'completed', icon: 'check' },
      { requirement: 'KRA PIN certificate', status: 'completed', icon: 'check' },
      { requirement: 'Personal guarantee signed', status: 'completed', icon: 'check' },
      { requirement: 'Trade references verified (3 suppliers)', status: 'completed', icon: 'check' },
      { requirement: 'Physical business inspection', status: 'completed', icon: 'check' },
      { requirement: 'Asset registration (for Diamond tier)', status: 'pending', icon: 'lock' },
    ],
  },

  // Overall Trust Assessment
  overallTrust: {
    level: 'Elevated Monitoring',
    riskScore: 35,      // 0=no risk, 100=max risk
    recommendation: 'Merchant shows strong performance metrics but behavioral authenticity patterns warrant continued monitoring. Score trajectory and payment timing are flagged. Limit increases should follow standard vesting schedule — no acceleration recommended.',
    flags: 2,
    totalChecks: 24,
  },

  // Bust-Out Risk Score — MVP heuristic model
  bustOutRiskScore: {
    total: 42,
    level: 'Moderate',
    components: [
      { name: 'Utilization Velocity', score: 35, weight: 30, detail: 'Credit utilization has remained stable at 16% — no acceleration detected over last 90 days.' },
      { name: 'Repayment Cycling', score: 52, weight: 25, detail: '3 instances of repayment followed by same-day or next-day borrowing in last 6 months. Pattern warrants monitoring.' },
      { name: 'Cross-Product Exposure', score: 20, weight: 20, detail: 'Single product (LOOP Credit) in use. No cross-product stacking detected across BNPL, Device Finance, or CaaS.' },
      { name: 'Cash Flow Decline', score: 0, weight: 15, detail: 'Revenue growing consistently — no cash flow decline signal.' },
      { name: 'Device / Identity Risk', score: 5, weight: 10, detail: 'Unique device fingerprint. No shared SIM, device, or identity flags.' },
    ],
  },

  // Trust Decay Log — tracks events where trust decayed due to opportunistic patterns
  trustDecayLog: [
    { date: 'Mar 19', event: 'Early repayment timed pre-review cycle', decay: -5, trustAfter: 71, detail: 'Payment made 14 days early — 4th consecutive early repayment timed directly before the monthly limit review cycle. Pattern suggests strategic optimization rather than organic cash flow surplus.' },
    { date: 'Mar 5', event: 'Score growth without proportional revenue growth', decay: -10, trustAfter: 76, detail: 'Credit score rose 5 points; revenue growth was 0% that week. Score improvement driven entirely by payment timing signals, not underlying business performance.' },
    { date: 'Feb 26', event: 'Rapid borrow-repay-borrow cycle', decay: -8, trustAfter: 86, detail: 'New facility opened 36 hours after full repayment of prior loan. Classic cycling behavior — repaying to clear utilization then re-borrowing immediately to build repayment history.' },
    { date: 'Feb 12', event: 'Channel added during incentive window', decay: -3, trustAfter: 94, detail: 'E-commerce channel connected the same week a multi-channel score bonus was announced. Timing suggests incentive optimization rather than organic business expansion.' },
  ],
};


// ═══════════════════════════════════════════════
//  2. MEDIUM MERCHANT — James Kariuki, Kariuki Electronics
// ═══════════════════════════════════════════════
const mediumMerchant = {
  id: 'MCH-2024-047',
  name: 'Kariuki Electronics',
  ownerName: 'James Kariuki',
  email: 'james@karielec.co.ke',
  phone: '+254 722 456 789',
  businessType: 'Retail Electronics',
  location: 'Nairobi, Kenya',
  registrationDate: '2023-06-15',
  tier: 'Gold',
  kycStatus: 'verified',
  avatar: null,
};

const mediumCreditProfile = {
  creditScore: 712,
  maxScore: 850,
  creditLimit: 2500000,
  availableCredit: 1500000,
  usedCredit: 1000000,
  riskLevel: 'Moderate',
  scoreHistory: [
    { month: 'Oct', score: 688 },
    { month: 'Nov', score: 695 },
    { month: 'Dec', score: 705 },
    { month: 'Jan', score: 698 },
    { month: 'Feb', score: 707 },
    { month: 'Mar', score: 712 },
  ],
  factors: [
    { name: 'Payment History', impact: 'neutral', weight: 35, detail: 'Mostly on-time — 1 late payment in the last 6 months' },
    { name: 'Revenue Consistency', impact: 'neutral', weight: 25, detail: 'Moderate fluctuations — revenue varies 10–15% monthly' },
    { name: 'Credit Utilization', impact: 'negative', weight: 20, detail: 'Using 40% of available credit — approaching risk threshold' },
    { name: 'Business Age', impact: 'positive', weight: 10, detail: 'Operating for 2+ years with steady presence' },
    { name: 'Industry Risk', impact: 'neutral', weight: 10, detail: 'Electronics retail — moderate sector risk' },
  ],
};

const mediumTransactions = [
  { id: 'TXN-001', date: '2026-03-25', description: 'LOOP Collection', amount: 45200, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-002', date: '2026-03-25', description: 'Supplier Payment', amount: -28000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-003', date: '2026-03-24', description: 'POS Sale', amount: 67500, type: 'credit', channel: 'POS' },
  { id: 'TXN-004', date: '2026-03-24', description: 'Loan Repayment', amount: -68750, type: 'debit', channel: 'Auto-debit' },
  { id: 'TXN-005', date: '2026-03-23', description: 'Online Sale', amount: 32100, type: 'credit', channel: 'E-commerce' },
  { id: 'TXN-006', date: '2026-03-23', description: 'LOOP Collection', amount: 58900, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-007', date: '2026-03-22', description: 'Rent Payment', amount: -45000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-008', date: '2026-03-22', description: 'POS Sale', amount: 89300, type: 'credit', channel: 'POS' },
];

const mediumRevenueData = [
  { month: 'Oct', revenue: 1200000, expenses: 890000, profit: 310000 },
  { month: 'Nov', revenue: 1350000, expenses: 920000, profit: 430000 },
  { month: 'Dec', revenue: 1800000, expenses: 1100000, profit: 700000 },
  { month: 'Jan', revenue: 1250000, expenses: 950000, profit: 300000 },
  { month: 'Feb', revenue: 1480000, expenses: 980000, profit: 500000 },
  { month: 'Mar', revenue: 1560000, expenses: 1020000, profit: 540000 },
];

const mediumLoan = {
  id: 'LN-2025-0042',
  amount: 750000,
  balance: 562500,
  interestRate: 12.5,
  term: 12,
  monthsRemaining: 9,
  nextPayment: 68750,
  nextPaymentDate: '2026-04-01',
  status: 'active',
  flexPayEnabled: true,
  selfHealingActive: false,
  repaymentSchedule: [
    { month: 'Jan', amount: 68750, status: 'paid', adjustedAmount: null },
    { month: 'Feb', amount: 68750, status: 'paid', adjustedAmount: 45000 },
    { month: 'Mar', amount: 68750, status: 'paid', adjustedAmount: null },
    { month: 'Apr', amount: 68750, status: 'upcoming', adjustedAmount: null },
    { month: 'May', amount: 68750, status: 'upcoming', adjustedAmount: null },
    { month: 'Jun', amount: 68750, status: 'upcoming', adjustedAmount: null },
  ],
};

const mediumCreditOffer = {
  id: 'OFFER-2026-047',
  amount: 500000,
  interestRate: 13.0,
  term: 12,
  monthlyPayment: 47500,
  expiresAt: '2026-04-15',
  type: 'Pre-approved',
  aiConfidence: 78,
  explanation: 'Based on your improving revenue trend and Gold tier status, you qualify for additional credit. Reducing your credit utilization below 30% could unlock better rates.',
};

const mediumInsights = [
  { id: 1, category: 'Revenue', title: 'Revenue Recovering', description: 'Your revenue dropped in January but is back on an upward trend. Consistency over the next 2 months could add +15 points to your score.', impact: 'neutral' },
  { id: 2, category: 'Repayment', title: 'Flex-Pay Helped in February', description: 'The Flex-Pay engine reduced your Feb payment by KES 23,750 when daily sales dipped, keeping your repayment streak intact.', impact: 'positive' },
  { id: 3, category: 'Risk', title: 'Credit Utilization Warning', description: 'You\'re using 40% of your credit limit. Reducing to below 30% could add +8 points. Consider paying down KES 250,000 of your balance.', impact: 'action' },
  { id: 4, category: 'Action', title: 'Upload KRA PIN Certificate', description: 'This missing document is costing you up to 15 potential score points. Upload it for an instant boost.', impact: 'action' },
];

const mediumPerformanceMetrics = {
  dailyAvgRevenue: 52000,
  weeklyGrowth: 2.1,
  monthlyGrowth: 5.4,
  paymentSuccessRate: 94.5,
  daysUntilNextPayment: 6,
  healthScore: 72,
};

const mediumSmartFeatures = [
  { id: 'flex-pay', label: 'Flex-Pay Repayments', description: 'Automatically adjusts your monthly repayment based on real-time cash flow — lower in slow months, higher when business is strong.', enabled: true, category: 'Repayment', default: 'Fixed monthly repayment' },
  { id: 'self-healing', label: 'Auto-restructure of Loans', description: 'Credit Catalyst Engine proactively restructures your loan if revenue drops significantly, preventing defaults before they happen.', enabled: false, category: 'Repayment', default: 'Standard fixed terms' },
  { id: 'realtime-score', label: 'Real-Time Score Updates', description: 'Credit score updates after every qualifying transaction instead of the standard monthly cycle.', enabled: false, category: 'Scoring', default: 'Monthly score recalculation' },
  { id: 'ai-alerts', label: 'Cash Flow Alerts', description: 'Proactive notifications when Credit Catalyst Engine detects patterns that could affect your repayments or score.', enabled: true, category: 'Intelligence', default: 'Standard payment reminders only' },
];

const mediumScoreMilestones = [
  { score: 650, label: 'Bronze', limitLabel: 'KES 500K', achieved: true },
  { score: 700, label: 'Silver', limitLabel: 'KES 1M + 1% interest rate reduction', achieved: true },
  { score: 742, label: 'Gold', limitLabel: 'KES 2.5M + 0.5% interest rate reduction', achieved: false },
  { score: 800, label: 'Platinum', limitLabel: 'KES 5M + 2% interest rate reduction', achieved: false },
  { score: 850, label: 'Diamond', limitLabel: 'KES 10M + 5% interest rate reduction', achieved: false },
];

const mediumScoreIncentives = [
  { id: 1, action: 'Maintain stable revenue for 2 more weeks', reward: '+KES 50,000 credit limit', scorePoints: 15, difficulty: 'Easy', daysLeft: 5 },
  { id: 2, action: 'Repay next loan on time (April 1st)', reward: '2% interest reduction on next loan', scorePoints: 20, difficulty: 'Easy', daysLeft: 6 },
  { id: 3, action: 'Reduce credit utilization below 30%', reward: '+8 score points', scorePoints: 8, difficulty: 'Medium', daysLeft: 14 },
  { id: 4, action: 'Upload KRA PIN certificate', reward: '+15 score points instantly', scorePoints: 15, difficulty: 'Easy', daysLeft: null },
  { id: 5, action: 'Connect LOOP statement (3 months)', reward: '+25 pts + KES 100K limit', scorePoints: 25, difficulty: 'Medium', daysLeft: null },
];

const mediumAIAdvice = [
  { id: 1, title: 'Reduce credit utilization urgently', body: 'You\'re at 40% utilization — the risk threshold. Paying down KES 250K would drop you to 30% and could add +8 points immediately.', scoreImpact: 8, effort: 'Medium effort' },
  { id: 2, title: 'Stabilize January revenue dips', body: 'AI detected a 30% revenue drop in January. Building a KES 200K reserve during December peaks can smooth out these seasonal patterns.', scoreImpact: 12, effort: 'High effort' },
  { id: 3, title: 'Diversify payment channels', body: 'You\'re using 3 channels. Adding e-commerce payments could increase your revenue consistency score by 10%. Merchants with 4+ channels average 15% higher scores.', scoreImpact: 15, effort: 'Medium effort' },
  { id: 4, title: 'Pay early, not just on time', body: 'Early repayments (3+ days before due date) add a 5-point consistency bonus. You\'ve been paying on time — going earlier costs nothing extra.', scoreImpact: 5, effort: 'Low effort' },
];

const mediumChallenges = [
  { id: 1, title: '7-Day Consistency Challenge', description: 'Maintain daily transactions above KES 30,000 for 7 days straight', progress: 4, target: 7, unit: 'days', reward: '+20 pts + KES 25,000 limit', status: 'active', daysLeft: 3 },
  { id: 2, title: 'No Late Repayment Streak', description: 'Make all repayments on or before due date for 3 consecutive months', progress: 1, target: 3, unit: 'months', reward: '+30 pts + 1.5% rate discount', status: 'active', daysLeft: 60 },
  { id: 3, title: 'Revenue Growth Sprint', description: 'Grow monthly revenue by 15% compared to last month', progress: 5.4, target: 15, unit: '%', reward: '+15 pts + Gold Tier badge', status: 'active', daysLeft: 5 },
  { id: 4, title: 'Credit Utilization Fix', description: 'Bring credit utilization below 30% for 30 days', progress: 0, target: 30, unit: 'days', reward: '+8 pts + rate improvement', status: 'active', daysLeft: 30 },
];

const mediumBusinessImpact = [
  { label: 'You (712)', limit: 2500000, growthRate: 3700000, stockCycle: '22 days', current: true },
  { label: 'Platinum (800)', limit: 5000000, growthRate: 6200000, stockCycle: '12 days', current: false },
  { label: 'Diamond (850)', limit: 10000000, growthRate: 7800000, stockCycle: '8 days', current: false },
];

const mediumPartnerRewards = [
  { id: 1, partner: 'Twiga Foods', benefit: '5% discount on bulk purchases', tier: 'Silver+', active: true, logo: 'TF' },
  { id: 2, partner: 'NCBA Insurance', benefit: 'Business insurance at 15% off', tier: 'Gold+', active: false, logo: 'NI' },
  { id: 3, partner: 'DHL Express', benefit: 'Free delivery on orders above KES 5,000', tier: 'Gold+', active: false, logo: 'DHL' },
  { id: 4, partner: 'Safaricom Business', benefit: 'Reduced M-Pes transaction fees (0.5%)', tier: 'Platinum', active: false, logo: 'SAF' },
  { id: 5, partner: 'Jumia B2B', benefit: 'Priority listing + 3% cashback on restocking', tier: 'Platinum', active: false, logo: 'JB2' },
];

const mediumScoreHistory = [
  { date: 'Mar 26', change: +5, reason: 'Revenue recovery — consistent growth for 2 consecutive months', score: 712 },
  { date: 'Mar 19', change: +3, reason: 'On-time loan repayment — March installment', score: 707 },
  { date: 'Mar 12', change: -2, reason: 'High credit utilization — 40% of limit in use', score: 704 },
  { date: 'Mar 5', change: +4, reason: 'Monthly revenue exceeded KES 1.5M target', score: 706 },
  { date: 'Feb 26', change: -7, reason: 'Late payment detected — January installment was 3 days late', score: 702 },
  { date: 'Feb 19', change: +2, reason: 'Flex-Pay adjustment prevented February default risk', score: 709 },
];

const mediumNotifications = [
  { id: 1, type: 'success', title: 'Credit Score Updated', message: 'Your score increased by 5 points to 712. Keep going!', time: '2 hours ago', read: false },
  { id: 2, type: 'info', title: 'New Credit Offer', message: 'You have a pre-approved credit offer of KES 500,000.', time: '5 hours ago', read: false },
  { id: 3, type: 'warning', title: 'Payment Reminder', message: 'Next repayment of KES 68,750 is due on April 1st.', time: '1 day ago', read: true },
  { id: 4, type: 'warning', title: 'Credit Utilization Alert', message: 'Your credit utilization is at 40%. Reduce to below 30% for a score boost.', time: '2 days ago', read: true },
];

// ── TRUST SHIELD: Anti-Gaming / Bust-Out Fraud Prevention ──
const mediumFraudShield = {
  authenticityScore: 89,
  authenticityLabel: 'High',
  authenticityStatus: 'pass',
  authenticityFactors: [
    { name: 'Transaction Entropy', score: 85, status: 'pass', detail: 'Natural transaction variance — amounts range from KES 28K to KES 89K across channels. Consistent with retail electronics business.' },
    { name: 'Revenue Volatility', score: 78, status: 'pass', detail: 'Revenue shows natural seasonal variation (10–15% monthly fluctuation). January dip of 30% is consistent with post-holiday cycles.' },
    { name: 'Counterparty Diversity', score: 92, status: 'pass', detail: '22 unique counterparties in last 90 days. Strong diversity across suppliers and customers.' },
    { name: 'Payment Timing Pattern', score: 88, status: 'pass', detail: 'Payments show natural spread — between 1 and 5 days before due date. One late payment is actually a positive authenticity signal.' },
    { name: 'Channel Consistency', score: 90, status: 'pass', detail: '3 active channels with organic transaction distribution. No anomalies.' },
    { name: 'Peer Cohort Comparison', score: 95, status: 'pass', detail: 'Score trajectory within 0.8σ of peer cohort mean. Normal growth pattern for Gold-tier electronics merchant.' },
  ],

  limitVesting: {
    totalApprovedLimit: 2500000,
    vestedLimit: 2500000,
    unvestedLimit: 0,
    vestingSchedule: [
      { month: 'Month 1–6', amount: 500000, status: 'vested', label: 'Initial facility' },
      { month: 'Month 7–12', amount: 750000, status: 'vested', label: 'First increase' },
      { month: 'Month 13–24', amount: 750000, status: 'vested', label: 'Growth tranche' },
      { month: 'Month 25–33', amount: 500000, status: 'vested', label: 'Tenure reward' },
    ],
    currentTenureMonths: 33,
    coolingPeriodDays: 60,
    lastTierUpgrade: '2025-11-01',
    coolingComplete: true,
  },

  disbursementCap: {
    maxSingleLoan: 1000000,
    maxSingleLoanPercent: 40,
    currentOutstanding: 562500,
    availableForNewLoan: 437500,
    staggeredRelease: false,
    trancheSchedule: null,
  },

  exitVelocityTriggers: [
    { id: 1, trigger: 'Sudden max-limit loan request', status: 'clear', description: 'No large loan requests near tier upgrades', lastChecked: '2026-03-30' },
    { id: 2, trigger: 'Score acceleration anomaly', status: 'clear', description: 'Score growth within normal range for cohort', lastChecked: '2026-03-30' },
    { id: 3, trigger: 'Revenue pattern break', status: 'clear', description: 'Revenue patterns organic with natural variance', lastChecked: '2026-03-30' },
    { id: 4, trigger: 'Fund outflow spike', status: 'clear', description: 'Normal fund flow patterns maintained', lastChecked: '2026-03-30' },
    { id: 5, trigger: 'Counterparty concentration shift', status: 'clear', description: 'Diverse and stable counterparty relationships', lastChecked: '2026-03-30' },
  ],

  postDisbursementMonitoring: {
    active: true,
    loanId: 'LN-2025-0042',
    monitoringLevel: 'Standard',
    daysSinceDisbursement: 90,
    checksCompleted: 3,
    checksPassed: 3,
    checksFailed: 0,
    failedCheck: null,
    metrics: [
      { name: 'Transaction continuity', status: 'pass', detail: 'Transactions maintained at 102% of pre-disbursement volume' },
      { name: 'Fund retention', status: 'pass', detail: '85% of funds retained in business operations' },
      { name: 'Revenue maintenance', status: 'pass', detail: 'Revenue showing natural growth post-disbursement' },
      { name: 'Account balance pattern', status: 'pass', detail: 'Healthy balance patterns — no suspicious activity' },
    ],
  },

  securityTier: {
    current: 'Standard',
    requirements: [
      { requirement: 'KYC Level 2 Verification', status: 'completed', icon: 'check' },
      { requirement: 'Business registration certificate', status: 'completed', icon: 'check' },
      { requirement: 'KRA PIN certificate', status: 'pending', icon: 'alert' },
      { requirement: 'Personal guarantee signed', status: 'completed', icon: 'check' },
      { requirement: 'Trade references verified (2 suppliers)', status: 'completed', icon: 'check' },
    ],
  },

  overallTrust: {
    level: 'Trusted',
    riskScore: 15,
    recommendation: 'Merchant exhibits authentic business patterns with natural revenue variation and organic growth. No gaming signals detected. Eligible for standard limit progression.',
    flags: 0,
    totalChecks: 18,
  },

  bustOutRiskScore: {
    total: 18,
    level: 'Low',
    components: [
      { name: 'Utilization Velocity', score: 30, weight: 30, detail: 'Utilization fluctuates naturally between 30–40%. No concerning upward acceleration detected.' },
      { name: 'Repayment Cycling', score: 5, weight: 25, detail: 'No cycling detected. One late payment is actually an authenticity signal — real merchants miss deadlines.' },
      { name: 'Cross-Product Exposure', score: 15, weight: 20, detail: 'Single product in use. No stacking across LOOP, BNPL, or Device Finance.' },
      { name: 'Cash Flow Decline', score: 12, weight: 15, detail: 'January revenue dip was genuine and seasonal — consistent with post-holiday electronics retail patterns.' },
      { name: 'Device / Identity Risk', score: 0, weight: 10, detail: 'Unique device and identity profile. No shared account signals detected.' },
    ],
  },

  trustDecayLog: [],
};


// ═══════════════════════════════════════════════
//  3. STRUGGLING MERCHANT — Peter Odhiambo, Pete's Mobile Repair
// ═══════════════════════════════════════════════
const strugglingMerchant = {
  id: 'MCH-2024-112',
  name: 'Pete\'s Mobile Repair',
  ownerName: 'Peter Odhiambo',
  email: 'peter@petesmobile.co.ke',
  phone: '+254 733 567 890',
  businessType: 'Services — Mobile Repair',
  location: 'Kisumu, Kenya',
  registrationDate: '2024-01-20',
  tier: 'Bronze',
  kycStatus: 'pending',
  avatar: null,
};

const strugglingCreditProfile = {
  creditScore: 598,
  maxScore: 850,
  creditLimit: 250000,
  availableCredit: 50000,
  usedCredit: 200000,
  riskLevel: 'High',
  scoreHistory: [
    { month: 'Oct', score: 635 },
    { month: 'Nov', score: 628 },
    { month: 'Dec', score: 618 },
    { month: 'Jan', score: 605 },
    { month: 'Feb', score: 595 },
    { month: 'Mar', score: 598 },
  ],
  factors: [
    { name: 'Payment History', impact: 'negative', weight: 35, detail: '3 late payments in the last 6 months — significant drag on score' },
    { name: 'Revenue Consistency', impact: 'negative', weight: 25, detail: 'Revenue declined 22% over 6 months — flagged as high risk' },
    { name: 'Credit Utilization', impact: 'negative', weight: 20, detail: 'Using 80% of available credit — critically high utilization' },
    { name: 'Business Age', impact: 'neutral', weight: 10, detail: 'Operating for 2 years — still building track record' },
    { name: 'Industry Risk', impact: 'negative', weight: 10, detail: 'Mobile repair — high competition, informal sector pressure' },
  ],
};

const strugglingTransactions = [
  { id: 'TXN-001', date: '2026-03-25', description: 'LOOP Collection', amount: 8500, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-002', date: '2026-03-25', description: 'Parts Purchase', amount: -12000, type: 'debit', channel: 'LOOP' },
  { id: 'TXN-003', date: '2026-03-24', description: 'Walk-in Repair', amount: 4500, type: 'credit', channel: 'Cash' },
  { id: 'TXN-004', date: '2026-03-23', description: 'LOOP Collection', amount: 6200, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-005', date: '2026-03-22', description: 'Loan Repayment — Overdue', amount: -18000, type: 'debit', channel: 'Auto-debit' },
  { id: 'TXN-006', date: '2026-03-21', description: 'Screen Repair Service', amount: 7800, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-007', date: '2026-03-20', description: 'Rent Payment', amount: -15000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-008', date: '2026-03-19', description: 'LOOP Collection', amount: 5100, type: 'credit', channel: 'Mobile' },
];

const strugglingRevenueData = [
  { month: 'Oct', revenue: 320000, expenses: 280000, profit: 40000 },
  { month: 'Nov', revenue: 290000, expenses: 270000, profit: 20000 },
  { month: 'Dec', revenue: 350000, expenses: 310000, profit: 40000 },
  { month: 'Jan', revenue: 240000, expenses: 260000, profit: -20000 },
  { month: 'Feb', revenue: 220000, expenses: 250000, profit: -30000 },
  { month: 'Mar', revenue: 260000, expenses: 245000, profit: 15000 },
];

const strugglingLoan = {
  id: 'LN-2025-0089',
  amount: 200000,
  balance: 185000,
  interestRate: 18.0,
  term: 12,
  monthsRemaining: 11,
  nextPayment: 18000,
  nextPaymentDate: '2026-04-01',
  status: 'at-risk',
  flexPayEnabled: false,
  selfHealingActive: false,
  repaymentSchedule: [
    { month: 'Jan', amount: 18000, status: 'late', adjustedAmount: null },
    { month: 'Feb', amount: 18000, status: 'late', adjustedAmount: null },
    { month: 'Mar', amount: 18000, status: 'paid', adjustedAmount: null },
    { month: 'Apr', amount: 18000, status: 'upcoming', adjustedAmount: null },
    { month: 'May', amount: 18000, status: 'upcoming', adjustedAmount: null },
    { month: 'Jun', amount: 18000, status: 'upcoming', adjustedAmount: null },
  ],
};

const strugglingCreditOffer = null; // No pre-approved offers for struggling merchants

const strugglingInsights = []; // No AI insights — struggling merchants use conventional loan servicing

const strugglingPerformanceMetrics = {
  dailyAvgRevenue: 8700,
  weeklyGrowth: -1.8,
  monthlyGrowth: -5.2,
  paymentSuccessRate: 72.0,
  daysUntilNextPayment: 6,
  healthScore: 38,
};

const strugglingSmartFeatures = [
  { id: 'flex-pay', label: 'Flex-Pay Repayments', description: 'Automatically adjusts your monthly repayment based on real-time cash flow — lower in slow months, higher when business is strong.', enabled: false, category: 'Repayment', default: 'Fixed monthly repayment' },
  { id: 'self-healing', label: 'Auto-restructure of Loans', description: 'Credit Catalyst Engine proactively restructures your loan if revenue drops significantly, preventing defaults before they happen.', enabled: false, category: 'Repayment', default: 'Standard fixed terms' },
  { id: 'realtime-score', label: 'Real-Time Score Updates', description: 'Credit score updates after every qualifying transaction instead of the standard monthly cycle.', enabled: false, category: 'Scoring', default: 'Monthly score recalculation' },
  { id: 'ai-alerts', label: 'Cash Flow Alerts', description: 'Proactive notifications when Credit Catalyst Engine detects patterns that could affect your repayments or score.', enabled: false, category: 'Intelligence', default: 'Standard payment reminders only' },
];

const strugglingScoreMilestones = [
  { score: 650, label: 'Bronze', limitLabel: 'KES 500K', achieved: false },
  { score: 700, label: 'Silver', limitLabel: 'KES 1M + 1% interest rate reduction', achieved: false },
  { score: 742, label: 'Gold', limitLabel: 'KES 2.5M + 0.5% interest rate reduction', achieved: false },
  { score: 800, label: 'Platinum', limitLabel: 'KES 5M + 2% interest rate reduction', achieved: false },
  { score: 850, label: 'Diamond', limitLabel: 'KES 10M + 5% interest rate reduction', achieved: false },
];

const strugglingScoreIncentives = [
  { id: 1, action: 'Make next payment on time (April 1st)', reward: 'Prevent further score decline', scorePoints: 10, difficulty: 'Easy', daysLeft: 6 },
  { id: 2, action: 'Complete KYC — upload business registration', reward: '+20 pts + KES 100K limit', scorePoints: 20, difficulty: 'Easy', daysLeft: null },
  { id: 3, action: 'Reduce credit utilization to 60%', reward: '+12 score points', scorePoints: 12, difficulty: 'Hard', daysLeft: 30 },
  { id: 4, action: 'Maintain 7 consecutive days of revenue', reward: '+8 pts + unlock Flex-Pay', scorePoints: 8, difficulty: 'Medium', daysLeft: 7 },
  { id: 5, action: 'Enable Flex-Pay repayments', reward: 'Lower monthly payments + safety net', scorePoints: 5, difficulty: 'Easy', daysLeft: null },
];

const strugglingAIAdvice = []; // No AI advice — struggling merchants use conventional loan servicing

const strugglingChallenges = [
  { id: 1, title: 'Recovery Sprint', description: 'Make 3 consecutive on-time payments', progress: 1, target: 3, unit: 'payments', reward: '+15 pts + loan restructure option', status: 'active', daysLeft: 90 },
  { id: 2, title: '7-Day Revenue Streak', description: 'Earn at least KES 5,000 every day for 7 consecutive days', progress: 3, target: 7, unit: 'days', reward: '+8 pts + Flex-Pay unlock', status: 'active', daysLeft: 4 },
  { id: 3, title: 'Utilization Reduction', description: 'Reduce credit utilization from 80% to below 60%', progress: 20, target: 40, unit: '% reduction', reward: '+12 pts + lower interest rate', status: 'active', daysLeft: 30 },
  { id: 4, title: 'Complete Verification', description: 'Upload all required KYC documents', progress: 1, target: 4, unit: 'documents', reward: '+20 pts + KES 100K limit', status: 'active', daysLeft: null },
];

const strugglingBusinessImpact = [
  { label: 'You (598)', limit: 250000, growthRate: -155000, stockCycle: '35 days', current: true },
  { label: 'Bronze (650)', limit: 500000, growthRate: 248000, stockCycle: '25 days', current: false },
  { label: 'Silver (700)', limit: 1000000, growthRate: 465000, stockCycle: '18 days', current: false },
];

const strugglingPartnerRewards = [
  { id: 1, partner: 'Twiga Foods', benefit: '5% discount on bulk purchases', tier: 'Silver+', active: false, logo: 'TF' },
  { id: 2, partner: 'NCBA Insurance', benefit: 'Business insurance at 15% off', tier: 'Gold+', active: false, logo: 'NI' },
  { id: 3, partner: 'DHL Express', benefit: 'Free delivery on orders above KES 5,000', tier: 'Gold+', active: false, logo: 'DHL' },
  { id: 4, partner: 'Safaricom Business', benefit: 'Reduced M-Pesa transaction fees (0.5%)', tier: 'Platinum', active: false, logo: 'SAF' },
  { id: 5, partner: 'Jumia B2B', benefit: 'Priority listing + 3% cashback on restocking', tier: 'Platinum', active: false, logo: 'JB2' },
];

const strugglingScoreHistory = [
  { date: 'Mar 1', change: +3, reason: 'Monthly score recalculation — March payment received', score: 598 },
  { date: 'Feb 1', change: -7, reason: 'Monthly score recalculation — late payment recorded, revenue decline', score: 595 },
  { date: 'Jan 1', change: -10, reason: 'Monthly score recalculation — late payment, high utilisation', score: 602 },
  { date: 'Dec 1', change: -3, reason: 'Monthly score recalculation — revenue decline noted', score: 612 },
  { date: 'Nov 1', change: -7, reason: 'Monthly score recalculation — increased credit utilisation', score: 615 },
  { date: 'Oct 1', change: -5, reason: 'Monthly score recalculation — payment consistency dropped', score: 622 },
];

const strugglingNotifications = [
  { id: 1, type: 'warning', title: 'Score Declining', message: 'Your credit score has dropped 37 points over 6 months. Contact your relationship manager for support.', time: '1 hour ago', read: false },
  { id: 2, type: 'warning', title: 'Payment Overdue', message: 'Your February payment of KES 18,000 was received late. Late payments negatively affect your credit score.', time: '4 hours ago', read: false },
  { id: 3, type: 'warning', title: 'Payment Due Soon', message: 'Your next repayment of KES 18,000 is due April 1st. Ensure sufficient M-Pesa balance.', time: '1 day ago', read: true },
  { id: 4, type: 'warning', title: 'KYC Incomplete', message: 'Complete your business verification to unlock KES 100,000 additional credit.', time: '3 days ago', read: true },
];

// ── TRUST SHIELD: Anti-Gaming / Bust-Out Fraud Prevention ──
const strugglingFraudShield = {
  authenticityScore: 94,
  authenticityLabel: 'Very High',
  authenticityStatus: 'pass',
  authenticityFactors: [
    { name: 'Transaction Entropy', score: 95, status: 'pass', detail: 'High natural variance in transaction amounts (KES 4.5K–15K). Consistent with walk-in mobile repair business.' },
    { name: 'Revenue Volatility', score: 88, status: 'pass', detail: 'Revenue shows genuine decline pattern — not manufactured. This is authentic distress, not manipulation.' },
    { name: 'Counterparty Diversity', score: 90, status: 'pass', detail: 'Walk-in customers provide natural diversity. No suspicious patterns.' },
    { name: 'Payment Timing Pattern', score: 96, status: 'pass', detail: 'Late payments are genuinely late (not strategically timed). Pattern is consistent with cash flow difficulties.' },
    { name: 'Channel Consistency', score: 92, status: 'pass', detail: '2 channels (LOOP, Cash). Limited but authentic for a mobile repair shop.' },
    { name: 'Peer Cohort Comparison', score: 98, status: 'pass', detail: 'Score trajectory is within 0.3σ of peer cohort for struggling small service businesses.' },
  ],

  limitVesting: {
    totalApprovedLimit: 250000,
    vestedLimit: 250000,
    unvestedLimit: 0,
    vestingSchedule: [
      { month: 'Month 1–6', amount: 100000, status: 'vested', label: 'Initial facility' },
      { month: 'Month 7–12', amount: 100000, status: 'vested', label: 'First increase' },
      { month: 'Month 13–26', amount: 50000, status: 'vested', label: 'Tenure addition' },
    ],
    currentTenureMonths: 26,
    coolingPeriodDays: 30,
    lastTierUpgrade: null,
    coolingComplete: true,
  },

  disbursementCap: {
    maxSingleLoan: 200000,
    maxSingleLoanPercent: 80,
    currentOutstanding: 185000,
    availableForNewLoan: 0,
    staggeredRelease: false,
    trancheSchedule: null,
  },

  exitVelocityTriggers: [
    { id: 1, trigger: 'Sudden max-limit loan request', status: 'clear', description: 'Limit is small — no high-value exit risk', lastChecked: '2026-03-30' },
    { id: 2, trigger: 'Score acceleration anomaly', status: 'clear', description: 'Score is declining — not farming', lastChecked: '2026-03-30' },
    { id: 3, trigger: 'Revenue pattern break', status: 'flagged', description: 'Revenue declining — genuine distress signal, not gaming', lastChecked: '2026-03-30' },
    { id: 4, trigger: 'Fund outflow spike', status: 'clear', description: 'Low volume, no suspicious transfers', lastChecked: '2026-03-30' },
    { id: 5, trigger: 'Counterparty concentration shift', status: 'clear', description: 'Walk-in model maintains natural diversity', lastChecked: '2026-03-30' },
  ],

  postDisbursementMonitoring: {
    active: true,
    loanId: 'LN-2025-0089',
    monitoringLevel: 'Enhanced',
    daysSinceDisbursement: 60,
    checksCompleted: 4,
    checksPassed: 2,
    checksFailed: 2,
    failedCheck: 'Revenue decline and late payments detected',
    metrics: [
      { name: 'Transaction continuity', status: 'review', detail: 'Transaction volume dropped 35% post-disbursement — concerning but consistent with genuine distress' },
      { name: 'Fund retention', status: 'pass', detail: 'Funds used for parts and business expenses — legitimate usage' },
      { name: 'Revenue maintenance', status: 'fail', detail: 'Revenue down 22% — self-healing loan recommended' },
      { name: 'Account balance pattern', status: 'review', detail: 'Multiple zero-balance days detected — cash flow stress' },
    ],
  },

  securityTier: {
    current: 'Basic',
    requirements: [
      { requirement: 'KYC Level 1 Verification', status: 'completed', icon: 'check' },
      { requirement: 'Business registration certificate', status: 'pending', icon: 'alert' },
      { requirement: 'KRA PIN certificate', status: 'pending', icon: 'alert' },
      { requirement: 'Personal guarantee signed', status: 'pending', icon: 'alert' },
    ],
  },

  overallTrust: {
    level: 'Genuine Distress',
    riskScore: 55,
    recommendation: 'Merchant is NOT gaming the system — pattern analysis confirms authentic business distress. High authenticity score indicates real challenges. Recommend self-healing loan activation rather than punitive measures.',
    flags: 0,
    totalChecks: 14,
  },

  bustOutRiskScore: {
    total: 62,
    level: 'High',
    components: [
      { name: 'Utilization Velocity', score: 85, weight: 30, detail: 'Utilization at 80% — critically elevated, but driven by repayment stress on an existing loan, not extraction behavior. Context: no new drawdowns in 60 days.' },
      { name: 'Repayment Cycling', score: 0, weight: 25, detail: 'No cycling. Borrowing is static with no new drawdowns — opposite of gaming pattern.' },
      { name: 'Cross-Product Exposure', score: 15, weight: 20, detail: 'Single product only. No stacking across channels.' },
      { name: 'Cash Flow Decline', score: 100, weight: 15, detail: 'Revenue declining 22% over 6 months — genuine distress confirmed by decreasing transaction volume and late payments.' },
      { name: 'Device / Identity Risk', score: 0, weight: 10, detail: 'Unique device and SIM. No identity or shared-account flags.' },
    ],
  },

  // NOTE: High risk score here reflects genuine distress, not gaming intent.
  // BAS (94/100) confirms authenticity. Score elevated by utilization + cash flow decline — not fraud signals.
  trustDecayLog: [],
};


// ═══════════════════════════════════════════════
//  PERSONA REGISTRY — maps persona key to full data
// ═══════════════════════════════════════════════
export const PERSONA_CREDENTIALS = [
  { email: 'amina@wanjikufresh.co.ke', password: 'Amina2026!', persona: 'good', label: 'Good Merchant', name: 'Amina Wanjiku', business: 'Wanjiku Fresh Produce' },
  { email: 'james@karielec.co.ke', password: 'James2026!', persona: 'medium', label: 'Medium Merchant', name: 'James Kariuki', business: 'Kariuki Electronics' },
  { email: 'peter@petesmobile.co.ke', password: 'Peter2026!', persona: 'struggling', label: 'Struggling Merchant', name: 'Peter Odhiambo', business: 'Pete\'s Mobile Repair' },
];

// ═══════════════════════════════════════════════
//  PERSONA THEME COLORS
// ═══════════════════════════════════════════════
const personaThemes = {
  good: {
    hex: '#10B981',        // green
    hexLight: '#10B98120',
    tw: 'text-success',
    bg: 'bg-success',
    bgLight: 'bg-success/10',
    border: 'border-success',
    gradient: 'from-emerald-500 to-green-600',
    ring: '#10B981',
    label: 'Excellent',
  },
  medium: {
    hex: '#F59E0B',        // amber
    hexLight: '#F59E0B20',
    tw: 'text-warning',
    bg: 'bg-warning',
    bgLight: 'bg-warning/10',
    border: 'border-warning',
    gradient: 'from-amber-400 to-orange-500',
    ring: '#F59E0B',
    label: 'Good',
  },
  struggling: {
    hex: '#EF4444',        // red
    hexLight: '#EF444420',
    tw: 'text-danger',
    bg: 'bg-danger',
    bgLight: 'bg-danger/10',
    border: 'border-danger',
    gradient: 'from-red-400 to-red-600',
    ring: '#EF4444',
    label: 'Needs Attention',
  },
};

export const personas = {
  good: {
    merchant: goodMerchant,
    creditProfile: goodCreditProfile,
    transactions: goodTransactions,
    revenueData: goodRevenueData,
    loan: goodLoan,
    creditOffer: goodCreditOffer,
    insights: goodInsights,
    performanceMetrics: goodPerformanceMetrics,
    smartFeatures: goodSmartFeatures,
    scoreMilestones: goodScoreMilestones,
    scoreIncentives: goodScoreIncentives,
    aiAdvice: goodAIAdvice,
    challenges: goodChallenges,
    businessImpact: goodBusinessImpact,
    partnerRewards: goodPartnerRewards,
    scoreHistory: goodScoreHistory,
    notifications: goodNotifications,
    fraudShield: goodFraudShield,
    theme: personaThemes.good,
  },
  medium: {
    merchant: mediumMerchant,
    creditProfile: mediumCreditProfile,
    transactions: mediumTransactions,
    revenueData: mediumRevenueData,
    loan: mediumLoan,
    creditOffer: mediumCreditOffer,
    insights: mediumInsights,
    performanceMetrics: mediumPerformanceMetrics,
    smartFeatures: mediumSmartFeatures,
    scoreMilestones: mediumScoreMilestones,
    scoreIncentives: mediumScoreIncentives,
    aiAdvice: mediumAIAdvice,
    challenges: mediumChallenges,
    businessImpact: mediumBusinessImpact,
    partnerRewards: mediumPartnerRewards,
    scoreHistory: mediumScoreHistory,
    notifications: mediumNotifications,
    fraudShield: mediumFraudShield,
    theme: personaThemes.medium,
  },
  struggling: {
    merchant: strugglingMerchant,
    creditProfile: strugglingCreditProfile,
    transactions: strugglingTransactions,
    revenueData: strugglingRevenueData,
    loan: strugglingLoan,
    creditOffer: strugglingCreditOffer,
    insights: strugglingInsights,
    performanceMetrics: strugglingPerformanceMetrics,
    smartFeatures: strugglingSmartFeatures,
    scoreMilestones: strugglingScoreMilestones,
    scoreIncentives: strugglingScoreIncentives,
    aiAdvice: strugglingAIAdvice,
    challenges: strugglingChallenges,
    businessImpact: strugglingBusinessImpact,
    partnerRewards: strugglingPartnerRewards,
    scoreHistory: strugglingScoreHistory,
    notifications: strugglingNotifications,
    fraudShield: strugglingFraudShield,
    theme: personaThemes.struggling,
  },
};

/** Get persona data by email. Falls back to medium persona. */
export function getPersonaByEmail(email) {
  const cred = PERSONA_CREDENTIALS.find((c) => c.email === email);
  return personas[cred?.persona || 'medium'];
}

/** Get persona key by email */
export function getPersonaKey(email) {
  const cred = PERSONA_CREDENTIALS.find((c) => c.email === email);
  return cred?.persona || 'medium';
}

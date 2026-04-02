export const mockMerchant = {
  id: 'MCH-2024-001',
  name: 'Kariuki Electronics',
  ownerName: 'James Kariuki',
  email: 'james@karielec.co.ke',
  phone: '+254 712 345 678',
  businessType: 'Retail Electronics',
  location: 'Nairobi, Kenya',
  registrationDate: '2023-06-15',
  tier: 'Gold',
  kycStatus: 'verified',
  avatar: null,
};

export const mockCreditProfile = {
  creditScore: 742,
  maxScore: 850,
  creditLimit: 2500000,
  availableCredit: 1750000,
  usedCredit: 750000,
  riskLevel: 'Low',
  scoreHistory: [
    { month: 'Oct', score: 688 },
    { month: 'Nov', score: 701 },
    { month: 'Dec', score: 715 },
    { month: 'Jan', score: 725 },
    { month: 'Feb', score: 738 },
    { month: 'Mar', score: 742 },
  ],
  factors: [
    { name: 'Payment History', impact: 'positive', weight: 35, detail: 'On-time payments for 8 consecutive months' },
    { name: 'Revenue Consistency', impact: 'positive', weight: 25, detail: 'Steady monthly revenue growth of 12%' },
    { name: 'Credit Utilization', impact: 'neutral', weight: 20, detail: 'Currently using 30% of available credit' },
    { name: 'Business Age', impact: 'positive', weight: 10, detail: 'Operating for 2+ years' },
    { name: 'Industry Risk', impact: 'neutral', weight: 10, detail: 'Electronics retail — moderate sector risk' },
  ],
};

export const mockTransactions = [
  { id: 'TXN-001', date: '2025-03-25', description: 'LOOP Collection', amount: 45200, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-002', date: '2025-03-25', description: 'Supplier Payment', amount: -28000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-003', date: '2025-03-24', description: 'POS Sale', amount: 67500, type: 'credit', channel: 'POS' },
  { id: 'TXN-004', date: '2025-03-24', description: 'Loan Repayment', amount: -15000, type: 'debit', channel: 'Auto-debit' },
  { id: 'TXN-005', date: '2025-03-23', description: 'Online Sale', amount: 32100, type: 'credit', channel: 'E-commerce' },
  { id: 'TXN-006', date: '2025-03-23', description: 'LOOP Collection', amount: 58900, type: 'credit', channel: 'Mobile' },
  { id: 'TXN-007', date: '2025-03-22', description: 'Rent Payment', amount: -45000, type: 'debit', channel: 'Bank Transfer' },
  { id: 'TXN-008', date: '2025-03-22', description: 'POS Sale', amount: 89300, type: 'credit', channel: 'POS' },
];

export const mockRevenueData = [
  { month: 'Oct', revenue: 1200000, expenses: 890000, profit: 310000 },
  { month: 'Nov', revenue: 1350000, expenses: 920000, profit: 430000 },
  { month: 'Dec', revenue: 1800000, expenses: 1100000, profit: 700000 },
  { month: 'Jan', revenue: 1450000, expenses: 950000, profit: 500000 },
  { month: 'Feb', revenue: 1580000, expenses: 980000, profit: 600000 },
  { month: 'Mar', revenue: 1720000, expenses: 1020000, profit: 700000 },
];

export const mockLoan = {
  id: 'LN-2025-0042',
  amount: 750000,
  balance: 562500,
  interestRate: 12.5,
  term: 12,
  monthsRemaining: 9,
  nextPayment: 68750,
  nextPaymentDate: '2025-04-01',
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

export const mockCreditOffer = {
  id: 'OFFER-2025-018',
  amount: 1000000,
  interestRate: 11.0,
  term: 18,
  monthlyPayment: 62500,
  expiresAt: '2025-04-15',
  type: 'Pre-approved',
  aiConfidence: 94,
  explanation: 'Based on your consistent revenue growth of 12% over the last 6 months and perfect repayment history, you qualify for an increased credit facility at a preferential rate.',
};

export const mockNotifications = [
  { id: 1, type: 'success', title: 'Credit Score Updated', message: 'Your credit score increased by 4 points to 742.', time: '2 hours ago', read: false },
  { id: 2, type: 'info', title: 'New Credit Offer', message: 'You have a pre-approved credit offer of KES 1,000,000.', time: '5 hours ago', read: false },
  { id: 3, type: 'warning', title: 'Payment Reminder', message: 'Your next repayment of KES 68,750 is due on April 1st.', time: '1 day ago', read: true },
  { id: 4, type: 'info', title: 'Flex-Pay Adjustment', message: 'February repayment was adjusted to KES 45,000 based on your cash flow.', time: '3 days ago', read: true },
];

export const mockInsights = [
  { id: 1, category: 'Revenue', title: 'Revenue Trend Up', description: 'Your revenue has grown 12% month-over-month. At this pace, you could qualify for a higher credit limit by June.', impact: 'positive' },
  { id: 2, category: 'Repayment', title: 'Flex-Pay Saved You', description: 'The Flex-Pay engine reduced your February payment by KES 23,750 when your daily sales dipped below average.', impact: 'positive' },
  { id: 3, category: 'Risk', title: 'Seasonal Pattern Detected', description: 'AI detected higher sales in December. Consider building reserves during peak months to cover slower periods.', impact: 'neutral' },
  { id: 4, category: 'Action', title: 'Complete Business Verification', description: 'Uploading your latest business certificate could improve your credit score by up to 15 points.', impact: 'action' },
];

export const mockPerformanceMetrics = {
  dailyAvgRevenue: 57300,
  weeklyGrowth: 3.2,
  monthlyGrowth: 12.1,
  paymentSuccessRate: 98.5,
  daysUntilNextPayment: 6,
  healthScore: 87,
};

export const mockSmartFeatures = [
  {
    id: 'flex-pay',
    label: 'Flex-Pay Repayments',
    description: 'Automatically adjusts your monthly repayment based on real-time cash flow — lower in slow months, higher when business is strong. Default is a fixed monthly schedule.',
    enabled: true,
    category: 'Repayment',
    default: 'Fixed monthly repayment',
  },
  {
    id: 'self-healing',
    label: 'Auto-restructure of Loans',
    description: 'Credit Catalyst Engine proactively restructures your loan if revenue drops significantly, preventing defaults before they happen. Default is standard loan terms with manual renegotiation.',
    enabled: false,
    category: 'Repayment',
    default: 'Standard fixed terms',
  },
  {
    id: 'realtime-score',
    label: 'Real-Time Score Updates',
    description: 'Credit score updates after every qualifying transaction instead of the standard monthly cycle. Lets you see the impact of actions immediately.',
    enabled: false,
    category: 'Scoring',
    default: 'Monthly score recalculation',
  },
  {
    id: 'ai-alerts',
    label: 'Cash Flow Alerts',
    description: 'Proactive notifications when AI detects patterns that could affect your repayments or score — e.g. a revenue dip before a payment due date.',
    enabled: true,
    category: 'Intelligence',
    default: 'Standard payment reminders only',
  },
];

export const mockScoreMilestones = [
  { score: 650, label: 'Bronze', limitLabel: 'KES 500K', achieved: true },
  { score: 700, label: 'Silver', limitLabel: 'KES 1M + 1% interest interest rate reduction', achieved: true },
  { score: 742, label: 'Gold', limitLabel: 'KES 2.5M + 0.5% interest interest rate reduction', achieved: true, current: true },
  { score: 800, label: 'Platinum', limitLabel: 'KES 5M + 2% interest interest rate reduction', achieved: false },
  { score: 850, label: 'Diamond', limitLabel: 'KES 10M + 5% interest interest rate reduction', achieved: false },
];

export const mockScoreIncentives = [
  { id: 1, action: 'Maintain stable income for 2 more weeks', reward: '+KES 50,000 credit limit', scorePoints: 15, difficulty: 'Easy', daysLeft: 5 },
  { id: 2, action: 'Repay next loan on time (April 1st)', reward: '2% interest reduction on next loan', scorePoints: 20, difficulty: 'Easy', daysLeft: 6 },
  { id: 3, action: 'Reduce cash withdrawal frequency by 40%', reward: '+10–15 score points', scorePoints: 12, difficulty: 'Medium', daysLeft: 14 },
  { id: 4, action: 'Upload KRA PIN certificate', reward: '+15 score points instantly', scorePoints: 15, difficulty: 'Easy', daysLeft: null },
  { id: 5, action: 'Connect LOOP statement (last 3 months)', reward: '+25 pts + KES 100K limit', scorePoints: 25, difficulty: 'Medium', daysLeft: null },
];

export const mockAIAdvice = [
  { id: 1, title: 'Reduce cash-out frequency', body: 'Your income is consistent, but high cash withdrawals reduce your score. Switching from daily to bi-weekly cash-out can improve your score by 10–15 points.', scoreImpact: 13, effort: 'Low effort' },
  { id: 2, title: 'Diversify payment channels', body: 'Merchants using 3+ payment channels (LOOP, POS, bank) score 18% higher on average. Activating your online channel could unlock better rates.', scoreImpact: 18, effort: 'Medium effort' },
  { id: 3, title: 'Build a minimum cash reserve', body: 'AI detected zero-balance days in 3 of the last 6 months. Keeping a minimum float of KES 50,000 stabilizes your risk score significantly.', scoreImpact: 10, effort: 'High effort' },
  { id: 4, title: 'Pay early, not just on time', body: 'Early repayments (3+ days before due date) add a 5-point consistency bonus. You\'ve been paying on time — going a step earlier costs nothing.', scoreImpact: 5, effort: 'Low effort' },
];

export const mockChallenges = [
  { id: 1, title: '7-Day Consistency Challenge', description: 'Maintain daily transactions above KES 30,000 for 7 days straight', progress: 5, target: 7, unit: 'days', reward: '+20 pts + KES 25,000 limit', status: 'active', daysLeft: 2 },
  { id: 2, title: 'No Late Repayment Streak', description: 'Make all repayments on or before due date for 3 consecutive months', progress: 3, target: 3, unit: 'months', reward: '+30 pts + 1.5% rate discount', status: 'completed', daysLeft: null },
  { id: 3, title: 'Revenue Growth Sprint', description: 'Grow monthly revenue by 15% compared to last month', progress: 12.1, target: 15, unit: '%', reward: '+15 pts + Gold Tier badge', status: 'active', daysLeft: 5 },
  { id: 4, title: 'Multi-Channel Merchant', description: 'Process transactions through 3 different payment channels in one week', progress: 2, target: 3, unit: 'channels', reward: '+18 pts + partner discount', status: 'active', daysLeft: 4 },
];

export const mockBusinessImpact = [
  { label: 'You (742)', limit: 2500000, growthRate: 4900000, stockCycle: '18 days', current: true },
  { label: 'Platinum (800)', limit: 5000000, growthRate: 6200000, stockCycle: '12 days', current: false },
  { label: 'Diamond (850)', limit: 10000000, growthRate: 7800000, stockCycle: '8 days', current: false },
];

export const mockPartnerRewards = [
  { id: 1, partner: 'Twiga Foods', benefit: '5% discount on bulk purchases', tier: 'Silver+', active: true, logo: 'TF' },
  { id: 2, partner: 'NCBA Insurance', benefit: 'Business insurance at 15% off', tier: 'Gold+', active: true, logo: 'NI' },
  { id: 3, partner: 'DHL Express', benefit: 'Free delivery on orders above KES 5,000', tier: 'Gold+', active: true, logo: 'DHL' },
  { id: 4, partner: 'Safaricom Business', benefit: 'Reduced LOOP transaction fees (0.5%)', tier: 'Platinum', active: false, logo: 'SAF' },
  { id: 5, partner: 'Jumia B2B', benefit: 'Priority listing + 3% cashback on restocking', tier: 'Platinum', active: false, logo: 'JB2' },
];

export const mockScoreHistory = [
  { date: 'Mar 26', change: +4, reason: 'Consistent revenue for 7 consecutive days', score: 742 },
  { date: 'Mar 19', change: +3, reason: 'On-time loan repayment — March installment', score: 738 },
  { date: 'Mar 12', change: -2, reason: 'High cash withdrawal frequency detected by AI', score: 735 },
  { date: 'Mar 5', change: +6, reason: 'Monthly revenue growth exceeded 10% threshold', score: 737 },
  { date: 'Feb 26', change: +2, reason: 'Business registration document verified', score: 731 },
  { date: 'Feb 19', change: -1, reason: 'Missed transaction activity for 2 consecutive days', score: 729 },
];

export const onboardingSteps = [
  { id: 1, title: 'Business Information', description: 'Tell us about your business' },
  { id: 2, title: 'Owner Details', description: 'Personal identification' },
  { id: 3, title: 'Financial Information', description: 'Connect your financial data' },
  { id: 4, title: 'Document Upload', description: 'Upload required documents' },
  { id: 5, title: 'Credit Catalyst-Powered Services', description: 'Opt in to smart credit features' },
  { id: 6, title: 'Review & Submit', description: 'Verify and submit your application' },
];

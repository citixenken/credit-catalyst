import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard, FileText, CheckCircle, ArrowRight,
  Building2, ShieldCheck, Clock,
  Sparkles, HelpCircle, Phone, PartyPopper,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function NewCustomerDashboard() {
  const { user } = useAuth();
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(1);
  const allDone = completedSteps === 4;

  // Sequentially mark each step green: step 1 already done, then +1.5s each
  useEffect(() => {
    const timers = [1500, 3000, 4500].map((delay, i) =>
      setTimeout(() => setCompletedSteps(i + 2), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const ownerName = user?.name || 'there';
  const businessName = user?.businessName || 'your business';

  const applicationSteps = [
    { icon: CheckCircle, label: 'Application Submitted', description: 'Your business profile and documents have been received.' },
    { icon: ShieldCheck, label: 'KYC Verification', description: 'Identity and business documents verified successfully.' },
    { icon: Sparkles, label: 'Credit Assessment', description: 'AI-powered analysis of your business potential completed.' },
    { icon: CreditCard, label: 'Credit Offer Ready', description: 'Your personalised credit terms are ready. Apply now to proceed.' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0} className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">
            Welcome, {ownerName.split(' ')[0]}!
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Your application for {businessName} has been submitted successfully. Here&apos;s what happens next.
          </p>
        </motion.div>

        {/* Application Progress */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1} className="bg-white rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-text-primary">Application Progress</h2>
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={allDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full"
            >
              <CheckCircle size={12} /> All checks passed
            </motion.span>
          </div>

          {/* All-clear banner — appears only once all steps are done */}
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={allDone ? { opacity: 1, height: 'auto', marginBottom: 20 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 bg-success/8 border border-success/20 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-success/15 flex items-center justify-center flex-shrink-0">
                <PartyPopper size={18} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-success">You&apos;re approved to apply!</p>
                <p className="text-xs text-text-secondary mt-0.5">All verification checks have passed. Your term loan application is ready to be submitted.</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {applicationSteps.map((step, i) => {
              const done = i < completedSteps;
              const active = i === completedSteps;
              return (
                <motion.div
                  key={step.label}
                  className="flex items-start gap-4"
                  initial={false}
                >
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    animate={{
                      backgroundColor: done ? 'rgba(16,185,129,0.12)' : active ? 'rgba(99,102,241,0.08)' : 'rgba(243,244,246,1)',
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ scale: done ? [1, 1.25, 1] : 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CheckCircle
                        size={18}
                        className={done ? 'text-success' : active ? 'text-primary' : 'text-gray-300'}
                        style={{ transition: 'color 0.4s' }}
                      />
                    </motion.div>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-sm font-medium transition-colors duration-500"
                        style={{ color: done ? '#10B981' : active ? '#374151' : '#9CA3AF' }}
                      >
                        {step.label}
                      </p>
                      {!done && active && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          <Clock size={10} /> Verifying…
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 transition-opacity duration-500" style={{ opacity: done || active ? 1 : 0.45 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Apply for Term Loan CTA — fades in once all done */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={allDone ? 'visible' : 'hidden'}
          custom={2}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/15 rounded-xl">
                  <CreditCard size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Apply for a Term Loan</p>
                  <p className="text-sm text-white/80 mt-1">
                    Get funding for your business growth. Competitive rates from 9.5% p.a. with flexible repayment terms of up to 24 months.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApplyConfirm(true)}
                className="px-6 py-3 bg-white text-primary font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 whitespace-nowrap shadow-sm animate-pulse hover:animate-none"
              >
                Apply Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Your Profile Summary */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={3} className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={18} className="text-primary" />
              <h2 className="text-base font-semibold text-text-primary">Your Business Profile</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Business', value: user?.businessName || '—' },
                { label: 'Type', value: user?.businessType || '—' },
                { label: 'Location', value: user?.location || '—' },
                { label: 'Owner', value: user?.name || '—' },
                { label: 'Monthly Revenue', value: user?.monthlyRevenue ? `KES ${Number(user.monthlyRevenue).toLocaleString()}` : '—' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-medium text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={4} className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={18} className="text-accent" />
              <h2 className="text-base font-semibold text-text-primary">What to Expect</h2>
            </div>
            <div className="space-y-3">
              {[
                { icon: ShieldCheck, text: 'KYC verification completes within 24 hours' },
                { icon: Sparkles, text: 'AI credit assessment runs automatically once KYC is approved' },
                { icon: CreditCard, text: 'Pre-approved credit offer generated based on your business profile' },
                { icon: Clock, text: 'Funds disbursed within 48 hours of loan acceptance' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <item.icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-text-secondary">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Loan Products */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={5} className="bg-white rounded-2xl p-6 border border-border mb-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Available Loan Products</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Working Capital', range: 'KES 50K – 500K', rate: 'From 12% p.a.', term: '3–12 months', desc: 'Short-term funding for day-to-day operations and inventory.' },
              { name: 'Term Loan', range: 'KES 200K – 5M', rate: 'From 9.5% p.a.', term: '6–24 months', desc: 'Medium-term financing for business expansion and equipment.', featured: true },
              { name: 'Asset Finance', range: 'KES 500K – 10M', rate: 'From 11% p.a.', term: '12–48 months', desc: 'Long-term financing for vehicles, machinery and property.' },
            ].map((product) => (
              <div key={product.name} className={`p-4 rounded-xl border ${product.featured ? 'border-primary/30 bg-primary/5 ring-1 ring-primary/10' : 'border-border'}`}>
                {product.featured && (
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2 inline-block">Recommended</span>
                )}
                <h3 className="text-sm font-semibold text-text-primary">{product.name}</h3>
                <p className="text-xs text-text-muted mt-1">{product.desc}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-text-secondary"><span className="font-medium">Amount:</span> {product.range}</p>
                  <p className="text-xs text-text-secondary"><span className="font-medium">Rate:</span> {product.rate}</p>
                  <p className="text-xs text-text-secondary"><span className="font-medium">Term:</span> {product.term}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Help */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={6} className="bg-gray-50 rounded-2xl p-5 border border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle size={20} className="text-text-muted" />
            <div>
              <p className="text-sm font-medium text-text-primary">Need help with your application?</p>
              <p className="text-xs text-text-muted">Our support team is available Mon–Fri, 8am–6pm EAT.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/30 transition-all whitespace-nowrap">
            <Phone size={14} />
            Contact Support
          </button>
        </motion.div>
      </div>

      {/* Apply Confirmation Modal */}
      {showApplyConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowApplyConfirm(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <CreditCard size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Term Loan Application</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 p-3 bg-success/8 border border-success/20 rounded-xl">
              <CheckCircle size={16} className="text-success flex-shrink-0" />
              <p className="text-sm font-medium text-success">All checks passed — you&apos;re pre-approved!</p>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Your KYC has been verified and your AI credit assessment is complete. Submit your term loan application below to receive your personalised offer.
            </p>
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-5 space-y-2">
              {[
                { label: 'Indicative Amount', value: 'Up to KES 2,000,000' },
                { label: 'Rate', value: 'From 9.5% p.a.' },
                { label: 'Term', value: 'Up to 24 months' },
                { label: 'Disbursement', value: '~48 hours after acceptance' },
              ].map((d) => (
                <div key={d.label} className="flex justify-between text-sm">
                  <span className="text-text-secondary">{d.label}</span>
                  <span className="font-medium text-text-primary">{d.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowApplyConfirm(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-text-secondary font-medium text-sm rounded-xl hover:bg-gray-200 transition-all">
                Cancel
              </button>
              <button onClick={() => setShowApplyConfirm(false)} className="flex-1 px-4 py-2.5 bg-primary text-white font-medium text-sm rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2">
                Submit Application <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Shield, TrendingUp, BarChart3, Activity,
  ArrowRight, RefreshCw, Brain, Smartphone, Building2,
  ChevronRight, Star,
} from 'lucide-react';
import Footer from '../common/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const features = [
  { icon: Brain, title: 'AI Risk Scoring', description: 'Dynamic credit limits powered by real-time transaction analysis and machine learning models.' },
  { icon: RefreshCw, title: 'Flex-Pay Engine', description: 'Repayments that adapt to your cash flow. Pay more when business is booming, less when it dips.' },
  { icon: Shield, title: 'Adjustable Repayments', description: 'Automatic pause during zero-revenue periods. Resumes seamlessly when sales stabilize.' },
  { icon: Activity, title: 'Pulse API', description: 'Real-time transaction monitoring with event-driven anomaly detection and revenue tracking.' },
  { icon: BarChart3, title: 'Transparent Decisions', description: 'Full explainability for every credit decision. Know exactly why and how your score is calculated.' },
  { icon: Smartphone, title: 'Headless UI', description: 'Access Credit Catalyst from any channel — mobile app, web dashboard, or partner portal.' },
];

const steps = [
  { step: '01', title: 'Onboard & Verify', description: 'Quick KYC process with automated document verification. Get started in under 10 minutes.' },
  { step: '02', title: 'Connect Data', description: 'Link your transaction channels. Our Pulse API starts analyzing your revenue patterns immediately.' },
  { step: '03', title: 'Get Credit Catalyst-Powered Offer', description: 'Receive a tailored credit offer based on your unique business performance and risk profile.' },
  { step: '04', title: 'Flexible Repayment', description: 'Repay on your terms with Credit Catalyst-managed schedules that adapt to your daily cash flow.' },
];

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '< 30s', label: 'Credit Decision' },
  { value: '40%', label: 'Lower Defaults' },
  { value: '10K+', label: 'Merchants' },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap size={14} /> Credit Catalyst-Powered Credit Platform
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
              Credit that adapts{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                to your business
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Credit Catalyst uses AI-powered insights to deliver flexible, always-on merchant credit with repayments that move with your cash flow. No rigid schedules. No surprises.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-3.5 border-2 border-gray-200 text-text-primary font-semibold rounded-xl hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                See How It Works
              </a>
            </motion.div>
          </div>

          {/* Hero visual - Dashboard preview */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-border p-1">
              <div className="bg-surface rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-danger" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="ml-2 text-xs text-text-muted">Credit Catalyst Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-xs text-text-muted mb-1">Credit Score</p>
                    <p className="text-2xl font-bold text-primary">742</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp size={12} className="text-success" />
                      <span className="text-xs text-success font-medium">+4 pts</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-xs text-text-muted mb-1">Available Credit</p>
                    <p className="text-2xl font-bold text-accent">KES 1.75M</p>
                    <p className="text-xs text-text-muted mt-1">of KES 2.5M limit</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-xs text-text-muted mb-1">Health Score</p>
                    <p className="text-2xl font-bold text-success">87%</p>
                    <p className="text-xs text-text-muted mt-1">Excellent</p>
                  </div>
                </div>
                <div className="mt-4 bg-white rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-text-primary">Revenue Trend (6 months)</p>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {[40, 50, 70, 55, 62, 68].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary/40" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((m) => (
                      <span key={m} className="flex-1 text-center text-[10px] text-text-muted">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
              <Star size={14} /> Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Everything you need to grow</h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              A complete credit orchestration platform that works as hard as you do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <f.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">How it works</h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              From onboarding to adaptive repayments in four simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="relative">
                <span className="text-5xl font-bold text-primary/10">{s.step}</span>
                <h3 className="text-lg font-semibold text-text-primary mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={24} className="hidden lg:block absolute top-8 -right-4 text-primary/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-12 md:p-16 text-center text-white">
            <Building2 size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to transform your business credit?</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Join thousands of merchants who already use Credit Catalyst-powered credit that works with their business, not against it.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg group">
              Start Your Application
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

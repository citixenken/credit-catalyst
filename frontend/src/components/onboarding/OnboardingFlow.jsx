import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2, User, Banknote, FileText, CheckCircle,
  ArrowRight, ArrowLeft, Loader2, Upload, Check, Zap,
  Brain, RefreshCw, Bell, ToggleLeft, ToggleRight, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { onboardingSteps } from '../../data/mockData';

const stepIcons = [Building2, User, Banknote, FileText, Zap, CheckCircle];

export default function OnboardingFlow() {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '', businessType: '', registrationNumber: '', location: '',
    fullName: '', idNumber: '', phone: '', dob: '',
    bankName: '', accountNumber: '', monthlyRevenue: '', transactionChannels: [],
    documents: [],
    aiOptIn: false,
  });

  const update = (field) => (e) => setFormData((f) => ({ ...f, [field]: e.target.value }));

  const toggleChannel = (channel) => {
    setFormData((f) => ({
      ...f,
      transactionChannels: f.transactionChannels.includes(channel)
        ? f.transactionChannels.filter((c) => c !== channel)
        : [...f.transactionChannels, channel],
    }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, onboardingSteps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    completeOnboarding(formData);
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Business Name</label>
              <input type="text" value={formData.businessName} onChange={update('businessName')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Kariuki Electronics" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Business Type</label>
              <select value={formData.businessType} onChange={update('businessType')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option value="">Select type</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="services">Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="hospitality">Hospitality</option>
                <option value="agriculture">Agriculture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Registration Number</label>
              <input type="text" value={formData.registrationNumber} onChange={update('registrationNumber')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="PVT-2023-XXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Business Location</label>
              <input type="text" value={formData.location} onChange={update('location')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Nairobi, Kenya" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
              <input type="text" value={formData.fullName} onChange={update('fullName')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="James Kariuki" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">National ID Number</label>
              <input type="text" value={formData.idNumber} onChange={update('idNumber')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="12345678" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={update('phone')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+254 7XX XXX XXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Date of Birth</label>
              <input type="date" value={formData.dob} onChange={update('dob')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Primary Bank</label>
              <select value={formData.bankName} onChange={update('bankName')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option value="">Select bank</option>
                <option value="ncba">NCBA Bank</option>
                <option value="equity">Equity Bank</option>
                <option value="kcb">KCB Bank</option>
                <option value="cooperative">Co-operative Bank</option>
                <option value="stanbic">Stanbic Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Account Number</label>
              <input type="text" value={formData.accountNumber} onChange={update('accountNumber')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="XXXX-XXXX-XXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Average Monthly Revenue</label>
              <input type="text" value={formData.monthlyRevenue} onChange={update('monthlyRevenue')} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="KES 1,500,000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Transaction Channels</label>
              <div className="grid grid-cols-2 gap-3">
                {['LOOP', 'POS Terminal', 'Bank Transfer', 'E-commerce'].map((ch) => (
                  <button key={ch} type="button" onClick={() => toggleChannel(ch)} className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.transactionChannels.includes(ch) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-text-secondary hover:border-primary/30'}`}>
                    {formData.transactionChannels.includes(ch) && <Check size={14} className="inline mr-1" />}
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <p className="text-sm text-text-secondary">Upload the following documents to complete verification:</p>
            {['Business Registration Certificate', 'National ID (Front & Back)', 'Latest Bank Statement (3 months)', 'KRA PIN Certificate'].map((doc) => (
              <div key={doc} className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto text-text-muted mb-2" />
                <p className="text-sm font-medium text-text-primary">{doc}</p>
                <p className="text-xs text-text-muted mt-1">PDF, JPG, or PNG — Max 5MB</p>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Brain size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">Credit Catalyst-Powered Credit Services</h3>
              <p className="text-sm text-text-secondary">Opt in to smart features that adapt your loan to your business. You can change this anytime.</p>
            </div>

            {/* Master opt-in toggle */}
            <button
              type="button"
              onClick={() => setFormData((f) => ({ ...f, aiOptIn: !f.aiOptIn }))}
              className={`w-full flex items-center justify-between gap-4 p-5 rounded-2xl border-2 transition-all ${
                formData.aiOptIn
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-white hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.aiOptIn ? 'bg-accent/10' : 'bg-gray-100'}`}>
                  <ShieldCheck size={20} className={formData.aiOptIn ? 'text-accent' : 'text-text-muted'} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-text-primary">Enable Credit Catalyst-Powered Services</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {formData.aiOptIn ? 'Smart features are active — your loan adapts to your cash flow' : 'Standard fixed-term loan product will apply'}
                  </p>
                </div>
              </div>
              {formData.aiOptIn
                ? <ToggleRight size={28} className="text-accent flex-shrink-0" />
                : <ToggleLeft size={28} className="text-gray-300 flex-shrink-0" />
              }
            </button>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: RefreshCw, label: 'Flex-Pay Repayments', desc: 'Auto-adjusts payments based on your real-time cash flow', color: 'text-accent', bg: 'bg-accent/10' },
                { icon: ShieldCheck, label: 'Adjustable Loan Repayments', desc: 'Credit Catalyst Engine restructures your loan before you miss a payment', color: 'text-success', bg: 'bg-success/10' },
                { icon: Zap, label: 'Real-Time Score Updates', desc: 'Score updates after each transaction, not monthly', color: 'text-primary', bg: 'bg-primary/10' },
                { icon: Bell, label: 'Cash Flow Alerts', desc: 'Proactive warnings when patterns could affect repayments', color: 'text-warning', bg: 'bg-warning/10' },
              ].map((feat) => (
                <div key={feat.label} className={`p-4 rounded-xl border transition-all ${
                  formData.aiOptIn ? 'border-border bg-white' : 'border-dashed border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-7 h-7 rounded-lg ${feat.bg} flex items-center justify-center`}>
                      <feat.icon size={14} className={feat.color} />
                    </div>
                    <p className="text-sm font-medium text-text-primary">{feat.label}</p>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            {!formData.aiOptIn && (
              <p className="text-xs text-text-muted text-center bg-gray-50 rounded-xl p-3">
                Without Credit Catalyst Engine Insights, your loan will use a standard fixed repayment schedule with monthly score recalculation.
              </p>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-success" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Ready to submit</h3>
              <p className="text-sm text-text-secondary">Review your information below. You can go back to make changes.</p>
            </div>
            <div className="bg-surface rounded-xl p-5 space-y-3">
              {[
                { label: 'Business', value: formData.businessName || 'Kariuki Electronics' },
                { label: 'Type', value: formData.businessType || 'Retail' },
                { label: 'Owner', value: formData.fullName || 'James Kariuki' },
                { label: 'Location', value: formData.location || 'Nairobi, Kenya' },
                { label: 'Bank', value: formData.bankName || 'NCBA Bank' },
                { label: 'Channels', value: formData.transactionChannels.length > 0 ? formData.transactionChannels.join(', ') : 'LOOP, POS Terminal' },
                { label: 'AI Services', value: formData.aiOptIn ? 'Enabled' : 'Standard (no AI)' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className={`font-medium ${item.label === 'AI Services' && formData.aiOptIn ? 'text-accent' : 'text-text-primary'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Get Started</h1>
          <p className="text-sm text-text-secondary mb-6">Complete your merchant onboarding to access Credit Catalyst-powered credit.</p>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {onboardingSteps.map((step, i) => {
              const Icon = stepIcons[i];
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isCompleted ? 'bg-success text-white' : isActive ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted'}`}>
                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  {i < onboardingSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 rounded transition-colors ${isCompleted ? 'bg-success' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3">
            <p className="text-sm font-semibold text-text-primary">{onboardingSteps[currentStep].title}</p>
            <p className="text-xs text-text-secondary">{onboardingSteps[currentStep].description}</p>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {currentStep < onboardingSteps.length - 1 ? (
            <button onClick={next} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-all shadow-sm">
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-light transition-all shadow-sm disabled:opacity-50">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <> Submit Application <ArrowRight size={16} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

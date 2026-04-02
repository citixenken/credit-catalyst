import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertTriangle, Info, CheckCircle, Lightbulb } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  positive: TrendingUp,
  neutral: Info,
  action: Lightbulb,
};

const colorMap = {
  success: 'text-success bg-success/10 border-success/20',
  warning: 'text-warning bg-warning/10 border-warning/20',
  info: 'text-info bg-info/10 border-info/20',
  positive: 'text-success bg-success/10 border-success/20',
  neutral: 'text-info bg-info/10 border-info/20',
  action: 'text-accent bg-accent/10 border-accent/20',
};

export default function InfoPopup({ isOpen, onClose, title, message, type = 'info', details, actions }) {
  const Icon = iconMap[type] || Info;
  const colors = colorMap[type] || colorMap.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden mx-4">
              {/* Header */}
              <div className={`flex items-center gap-3 p-5 border-b border-border ${colors}`}>
                <div className="p-2 rounded-xl bg-white/60">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-text-primary flex-1">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-black/5 transition-colors text-text-muted"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
                {details && (
                  <div className="mt-4 p-4 rounded-xl bg-surface text-sm text-text-secondary space-y-2">
                    {details.map((d, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{d.label}</span>
                        <span className="font-medium text-text-primary">{d.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              {actions && (
                <div className="flex gap-3 p-5 pt-0">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={action.onClick}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                        action.primary
                          ? 'bg-primary text-white hover:bg-primary-light'
                          : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from 'react';

export default function CreditScoreRing({ score, maxScore, themeColor }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    // Animate from 0 to score over ~1.2s using rAF
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score]);

  const percentage = (displayed / maxScore) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  const getColor = () => {
    if (themeColor) return themeColor;
    if (percentage >= 80) return '#10B981';
    if (percentage >= 60) return '#003366';
    if (percentage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getLabel = () => {
    if ((score / maxScore) * 100 >= 80) return 'Excellent';
    if ((score / maxScore) * 100 >= 60) return 'Good';
    if ((score / maxScore) * 100 >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-text-primary">{displayed}</span>
          <span className="text-xs text-text-muted">of {maxScore}</span>
        </div>
      </div>
      <span
        className="mt-2 px-3 py-1 rounded-full text-xs font-medium"
        style={{ color: getColor(), backgroundColor: `${getColor()}15` }}
      >
        {getLabel()}
      </span>
    </div>
  );
}

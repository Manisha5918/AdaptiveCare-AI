import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { ProgressRing } from '../common/ProgressRing';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, TrendingUp } from 'lucide-react';

export default function HealthScore() {
  const { getActiveProfile } = useApp();
  const profile = getActiveProfile();
  const score = profile?.healthScore || 85;
  const accent = profile?.theme?.accent || '#ef4444';

  const getWellnessStatus = (sc) => {
    if (sc >= 92) return { text: 'Optimal Vitality', sub: 'Your metrics look excellent today!' };
    if (sc >= 85) return { text: 'Good Balance', sub: 'Just a few items pending completion.' };
    return { text: 'Attention Advised', sub: 'Check outstanding alerts or schedule.' };
  };

  const status = getWellnessStatus(score);

  return (
    <GlassCard className="flex flex-col sm:flex-row items-center justify-between gap-6 h-full">
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 text-charcoal-400 dark:text-charcoal-500">
          <ShieldCheck size={18} className="text-emerald-500 animate-soft-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">Overall Health Index</span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-charcoal-900 dark:text-slate-100">
          {status.text}
        </h3>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1 max-w-[200px] sm:max-w-none">
          {status.sub}
        </p>
        
        <div className="flex items-center gap-1.5 justify-center sm:justify-start mt-4 text-xs font-medium text-emerald-500">
          <TrendingUp size={14} />
          <span>+2% improvement since yesterday</span>
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <ProgressRing value={score} color={accent} size={110} strokeWidth={8} subtitle="Index" />
      </div>
    </GlassCard>
  );
}

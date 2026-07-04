import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Sparkles, Brain, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIRecommendationCard() {
  const { currentProfileId, getActiveProfile } = useApp();
  const profile = getActiveProfile();
  const accent = profile?.theme?.accent || '#3b82f6';

  const getAIRecommendation = (profId) => {
    switch (profId) {
      case 'senior':
        return {
          title: 'Acoustic & Wearable Synced',
          text: 'Blood pressure levels checked: 122/80 mmHg (Optimal). Please remember to verify hearing aid battery states. SOS wearable has active cellular coverage.',
          action: 'Test Emergency Dial'
        };
      case 'diabetic':
        return {
          title: 'Glycemic Trend: Neutral',
          text: 'Blood glucose current average (108 mg/dL) remains in healthy ranges. Glycemic dinner targets: check salad logs and maintain low-carb meal plans.',
          action: 'Review Meal Carbs'
        };
      case 'fitness':
        return {
          title: 'Hydration Target Variance',
          text: 'Active calorie burn indexes are advancing. Water logs currently sit at 5/8 cups. Consume 3 more glasses of water to balance cardio workouts.',
          action: 'Add Water Log'
        };
      case 'caregiver':
        return {
          title: 'Compliance Warnings: Mom',
          text: 'Evelyn has not logged her morning Atorvastatin (due at 8:00 AM). Consider pushing a wristwatch reminder before general check-ins.',
          action: 'Ping Compliance Watch'
        };
      default:
        return {
          title: 'Awaiting Vitals Sync',
          text: 'Log metrics to trigger real-time AI recommendation feeds.',
          action: 'Open Logger'
        };
    }
  };

  const rec = getAIRecommendation(currentProfileId);

  return (
    <GlassCard className="h-full flex flex-col justify-between overflow-hidden group relative">
      {/* Decorative neon gradient orb inside the card */}
      <div 
        className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity"
        style={{ backgroundColor: accent }}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div 
              className="p-1.5 rounded-lg flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: accent }}
            >
              <Brain size={14} className="animate-soft-pulse" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500">
              AI Health Intelligence
            </h3>
          </div>
          <span className="text-[9px] font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest animate-pulse">
            Live Copilot
          </span>
        </div>

        <h4 className="text-base font-black text-charcoal-900 dark:text-slate-100 mb-2 leading-tight">
          {rec.title}
        </h4>
        <p className="text-xs text-charcoal-550 dark:text-charcoal-400 font-semibold leading-relaxed">
          {rec.text}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-charcoal-850 flex justify-end">
        <button 
          className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:opacity-85 active:scale-95 transition-all"
          style={{ color: accent }}
        >
          {rec.action} <ArrowUpRight size={12} />
        </button>
      </div>
    </GlassCard>
  );
}

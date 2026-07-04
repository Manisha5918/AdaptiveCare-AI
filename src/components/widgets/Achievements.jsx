import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';

export default function Achievements() {
  const { getActiveProfile } = useApp();
  const profile = getActiveProfile();
  const achievements = profile?.achievements || [];

  if (achievements.length === 0) return null;

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500 animate-bounce" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Milestones & Badges</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-100/50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">
            Fitness HUD
          </span>
        </div>

        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
          {achievements.map((ach) => (
            <div 
              key={ach.id}
              className={`flex items-start justify-between p-3 rounded-[18px] border transition-all ${
                ach.unlocked 
                  ? 'bg-yellow-500/5 border-yellow-500/10 dark:bg-yellow-950/10 dark:border-yellow-900/20' 
                  : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-200/60 dark:border-charcoal-800'
              }`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {ach.unlocked ? (
                    <Trophy className="text-yellow-500" size={16} />
                  ) : (
                    <Circle className="text-charcoal-300 dark:text-charcoal-700" size={16} />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${
                    ach.unlocked ? 'text-charcoal-900 dark:text-slate-100' : 'text-charcoal-400 dark:text-charcoal-500'
                  }`}>
                    {ach.title}
                  </h4>
                  <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400 mt-0.5 leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
              </div>

              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ml-2 whitespace-nowrap ${
                ach.unlocked 
                  ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400' 
                  : 'bg-slate-100 dark:bg-charcoal-800 text-charcoal-400'
              }`}>
                {ach.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

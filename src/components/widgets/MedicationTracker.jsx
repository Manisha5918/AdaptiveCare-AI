import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Pill, Check, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MedicationTracker() {
  const { currentProfileId, getActiveProfile, toggleMedication } = useApp();
  const profile = getActiveProfile();
  const medications = profile?.medications || [];

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pill className="text-rose-500 animate-bounce" size={20} />
          <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Medication Schedule</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-rose-100/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400">
          {medications.filter(m => m.taken).length}/{medications.length} Done
        </span>
      </div>

      {medications.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center text-charcoal-400">
          <p className="text-sm">No prescription schedule set for this profile.</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {medications.map((med) => (
              <motion.div
                key={med.id}
                layoutId={`med-card-${med.id}`}
                whileHover={{ x: 2 }}
                onClick={() => toggleMedication(currentProfileId, med.id)}
                className={`flex items-center justify-between p-3.5 rounded-[18px] cursor-pointer border transition-colors duration-250 select-none ${
                  med.taken
                    ? 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-950/10 dark:border-emerald-900/30'
                    : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-200/60 dark:border-charcoal-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {med.taken ? (
                      <motion.div
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <Circle size={20} className="text-slate-400 dark:text-charcoal-600" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold tracking-tight leading-tight transition-all duration-200 ${
                      med.taken ? 'text-charcoal-400 dark:text-charcoal-600 line-through' : 'text-charcoal-900 dark:text-slate-100'
                    }`}>
                      {med.name}
                    </h4>
                    <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mt-0.5">
                      {med.dosage} &bull; {med.time}
                    </p>
                  </div>
                </div>
                
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  med.taken
                    ? 'bg-emerald-100/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-charcoal-800 text-charcoal-500 dark:text-charcoal-400'
                }`}>
                  {med.taken ? 'Taken' : 'Pending'}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </GlassCard>
  );
}

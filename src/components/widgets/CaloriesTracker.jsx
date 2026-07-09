import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Flame, Apple, GlassWater, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaloriesTracker() {
  const { getActiveProfile, logWaterCup } = useApp();
  const profile = getActiveProfile();
  const calories = profile?.calories;

  if (!calories) return null;

  const burnPercentage = Math.round((calories.burned / calories.targetBurned) * 100);
  const consumePercentage = Math.round((calories.consumed / calories.targetConsumed) * 100);

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-emerald-500 fill-emerald-500 animate-bounce" size={20} />
          <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Daily Calorie Balance</h3>
        </div>

        {/* Burned Vs Consumed Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/10 rounded-[18px] p-3">
            <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
              <Flame size={14} />
              <span className="text-[10px] uppercase font-bold tracking-wider">Burned</span>
            </div>
            <p className="text-xl font-black text-charcoal-900 dark:text-slate-100">{calories.burned}</p>
            <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 mt-0.5">Target: {calories.targetBurned} kcal</p>
            <div className="w-full bg-slate-200 dark:bg-charcoal-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-emerald-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, burnPercentage)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="bg-sky-500/5 dark:bg-sky-950/10 border border-sky-500/10 rounded-[18px] p-3">
            <div className="flex items-center gap-1.5 text-sky-500 mb-1">
              <Apple size={14} />
              <span className="text-[10px] uppercase font-bold tracking-wider">Consumed</span>
            </div>
            <p className="text-xl font-black text-charcoal-900 dark:text-slate-100">{calories.consumed}</p>
            <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 mt-0.5">Target: {calories.targetConsumed} kcal</p>
            <div className="w-full bg-slate-200 dark:bg-charcoal-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-sky-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, consumePercentage)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Water logging */}
      <div className="border-t border-slate-200/60 dark:border-charcoal-800 pt-4 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GlassWater className="text-sky-400" size={18} />
            <span className="text-xs font-semibold text-charcoal-700 dark:text-slate-200">Hydration Tracker</span>
          </div>
          <span className="text-xs font-bold text-sky-500">{calories.water} / {calories.targetWater} cups</span>
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="flex gap-1.5 flex-1 items-center justify-start py-1">
            {Array.from({ length: calories.targetWater }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-3.5 h-6 rounded-md border transition-all duration-350 ${
                  i < calories.water 
                    ? 'bg-sky-400 border-sky-400 shadow-sm shadow-sky-300 dark:shadow-none' 
                    : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-300 dark:border-charcoal-800'
                }`}
              />
            ))}
          </div>

          <button
            onClick={logWaterCup}
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white p-2 rounded-[12px] transition-all flex items-center justify-center gap-1 text-xs font-semibold"
          >
            <Plus size={14} /> Log Cup
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

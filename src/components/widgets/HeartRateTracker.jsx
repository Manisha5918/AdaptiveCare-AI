import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Heart, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeartRateTracker() {
  const { vitalsHistory, getActiveProfile, addBurnedCalories, addNotification } = useApp();
  const profile = getActiveProfile();
  const hrData = profile?.heartRate;

  const [currentBpm, setCurrentBpm] = useState(hrData?.current || 72);
  const [isWorkingOut, setIsWorkingOut] = useState(false);
  const [localHistory, setLocalHistory] = useState(vitalsHistory.heartRate);

  useEffect(() => {
    if (hrData) {
      setCurrentBpm(hrData.current);
    }
  }, [hrData]);

  // Sync with global context values
  useEffect(() => {
    setLocalHistory(vitalsHistory.heartRate);
  }, [vitalsHistory]);

  // Drift simulation + active calorie burner linkage
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBpm(prev => {
        const offset = isWorkingOut 
          ? Math.floor(Math.random() * 5) - 2 + (prev < 135 ? 3 : -1)
          : Math.floor(Math.random() * 3) - 1;
        
        const finalVal = Math.min(160, Math.max(50, prev + offset));
        
        if (isWorkingOut && finalVal > 100) {
          addBurnedCalories(Math.floor((finalVal - 85) / 10));
        }

        // Add to history trace dynamically
        setLocalHistory(prevHist => {
          const tail = prevHist.slice(1);
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return [...tail, { name: time, bpm: finalVal, resting: 58, threshold: 120 }];
        });

        return finalVal;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isWorkingOut]);

  if (!hrData) return null;

  const toggleWorkout = () => {
    setIsWorkingOut(prev => {
      const next = !prev;
      if (next) {
        addNotification('Workout Session Active', 'Active cardiac pulse zones triggered. Calorie burn sync enabled.', 'success');
      } else {
        addNotification('Workout Completed', 'Cardio cooldown sequence active.', 'info');
      }
      return next;
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 rounded-xl shadow-lg text-[11px] font-semibold text-charcoal-900 dark:text-slate-100">
          <p className="text-emerald-500">Pulse: {payload[0].value} BPM</p>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="text-emerald-500 fill-emerald-500 animate-soft-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Heart Rate</h3>
          </div>
          {isWorkingOut && (
            <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white uppercase animate-pulse">
              <Zap size={10} /> Active Zone
            </span>
          )}
        </div>

        {/* Big display */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <motion.div
              animate={{ scale: isWorkingOut ? [1, 1.25, 1] : [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: isWorkingOut ? 0.45 : 0.95, ease: "easeInOut" }}
              className="absolute inset-0 bg-emerald-500/10 rounded-full blur"
            />
            <motion.div
              animate={{ scale: isWorkingOut ? [1, 1.12, 1] : [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: isWorkingOut ? 0.45 : 0.95, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-500/20"
            >
              <Heart className="text-emerald-500 fill-emerald-500" size={22} />
            </motion.div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold tracking-tight text-charcoal-900 dark:text-slate-100">
                {currentBpm}
              </span>
              <span className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-500">BPM</span>
            </div>
            <p className="text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-500">
              Resting: {hrData.resting} BPM &bull; Peak: {hrData.max} BPM
            </p>
          </div>
        </div>

        {/* Recharts Vital Area Chart */}
        <div className="my-2 bg-slate-50/50 dark:bg-charcoal-900/20 rounded-[18px] p-3 border border-slate-200/40 dark:border-charcoal-800/40 text-xs">
          <div className="w-full h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={localHistory} margin={{ top: 5, right: 5, left: -45, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} className="fill-charcoal-400 font-semibold" />
                <Tooltip content={<CustomTooltip />} />
                {/* Aerobic Threshold Line */}
                <ReferenceLine y={120} stroke="#10b981" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="bpm" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPulse)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-200/60 dark:border-charcoal-800 pt-4">
        <button
          onClick={toggleWorkout}
          className={`w-full text-xs font-bold py-2.5 px-4 rounded-[14px] transition-all flex items-center justify-center gap-2 ${
            isWorkingOut
              ? 'bg-rose-500 hover:bg-rose-600 active:scale-95 text-white'
              : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white'
          }`}
        >
          <Activity size={14} />
          {isWorkingOut ? 'End Workout' : 'Start Workout Simulator'}
        </button>
      </div>
    </GlassCard>
  );
}

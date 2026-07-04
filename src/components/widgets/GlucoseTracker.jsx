import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, Plus, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlucoseTracker() {
  const { vitalsHistory, getActiveProfile, addGlucoseReading } = useApp();
  const profile = getActiveProfile();
  const glucoseData = profile?.glucoseData;
  
  const [inputValue, setInputValue] = useState('');

  if (!glucoseData) return null;

  // Adapt charts dataset from context
  const chartData = vitalsHistory.glucose;

  const handleLog = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    addGlucoseReading(inputValue);
    setInputValue('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'low': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
    }
  };

  // Custom tooltips styling for dark/light mode
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 rounded-xl shadow-lg text-[11px] font-semibold text-charcoal-900 dark:text-slate-100">
          <p className="font-bold border-b border-slate-100 dark:border-charcoal-850 pb-1 mb-1">{label}</p>
          <p className="text-sky-500">
            Sugar Level: {payload[0].value} mg/dL
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-sky-500 animate-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Glucose Level</h3>
          </div>
          <span className={`text-xs px-2.5 py-1 border rounded-full font-semibold capitalize transition-colors duration-300 ${getStatusColor(glucoseData.status)}`}>
            {glucoseData.status === 'in-range' ? 'Optimal' : glucoseData.status}
          </span>
        </div>

        {/* Current glucose display */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-extrabold tracking-tight text-charcoal-900 dark:text-slate-50">
            {glucoseData.current}
          </span>
          <span className="text-sm font-semibold text-charcoal-400 dark:text-charcoal-500">
            {glucoseData.unit}
          </span>
          <span className="text-xs text-charcoal-400 dark:text-charcoal-500 ml-auto font-medium">
            Synced: Just now
          </span>
        </div>

        {/* Recharts Area Graph */}
        <div className="my-2 bg-slate-50/50 dark:bg-charcoal-900/20 rounded-[18px] p-3 border border-slate-250/30 dark:border-charcoal-800/40 text-xs">
          <div className="w-full h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} className="fill-charcoal-400 font-semibold" />
                <YAxis domain={[60, 180]} tickLine={false} axisLine={false} className="fill-charcoal-400 font-semibold" />
                <Tooltip content={<CustomTooltip />} />
                {/* Safe Threshold Lines */}
                <ReferenceLine y={140} stroke="#f59e0b" strokeDasharray="3 3" />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="level" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGlucose)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Logging interactions */}
      <div className="mt-4 border-t border-slate-200/60 dark:border-charcoal-800 pt-4">
        <form onSubmit={handleLog} className="flex gap-2 mb-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Log blood sugar (mg/dL)..."
            className="flex-1 px-4 py-2.5 text-xs bg-white/60 dark:bg-charcoal-900/60 border border-slate-200 dark:border-charcoal-800 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-charcoal-950 dark:text-slate-100 placeholder-charcoal-400 font-medium"
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white p-2.5 rounded-[14px] transition-all flex items-center justify-center font-bold"
          >
            <Plus size={18} />
          </button>
        </form>

        {/* Demo presets to easily trigger alert shifts */}
        <div className="flex gap-2 items-center">
          <span className="text-[9px] uppercase font-extrabold text-charcoal-450 dark:text-charcoal-550">Presets:</span>
          <button
            onClick={() => addGlucoseReading(95)}
            className="text-[10px] px-2.5 py-1 bg-sky-100 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-900/30 transition-colors font-bold"
          >
            Optimal (95)
          </button>
          <button
            onClick={() => addGlucoseReading(165)}
            className="text-[10px] px-2.5 py-1 bg-amber-100 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/30 transition-colors font-bold"
          >
            High (165)
          </button>
          <button
            onClick={() => addGlucoseReading(62)}
            className="text-[10px] px-2.5 py-1 bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-900/30 transition-colors font-bold"
          >
            Low (62)
          </button>
        </div>
      </div>
    </GlassCard>
  );
}


import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Flame, Apple } from 'lucide-react';

// Custom tooltips styling for dark/light mode
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 rounded-xl shadow-lg text-[11px] font-semibold text-charcoal-900 dark:text-slate-100">
        <p className="font-bold border-b border-slate-100 dark:border-charcoal-800 pb-1 mb-1">{label}</p>
        <p className="text-emerald-500 flex items-center gap-1">
          <Flame size={12} /> Active: {payload[0].value} kcal
        </p>
        <p className="text-sky-500 flex items-center gap-1 mt-0.5">
          <Apple size={12} /> Intake: {payload[1].value} kcal
        </p>
      </div>
    );
  }
  return null;
};

export default function WeeklySummary() {
  const { vitalsHistory, getActiveProfile } = useApp();
  const profile = getActiveProfile();
  const accent = profile?.theme?.accent || '#3b82f6';
  
  const chartData = vitalsHistory.calories;


  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-500 animate-soft-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Weekly Energy Analysis</h3>
          </div>
          <span 
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `${accent}15`, color: accent }}
          >
            Telemetry Summary
          </span>
        </div>

        {/* Recharts Area Graph */}
        <div className="w-full h-[160px] text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-charcoal-850" />
              <XAxis dataKey="name" tickLine={false} className="fill-charcoal-400 font-semibold" />
              <YAxis tickLine={false} axisLine={false} className="fill-charcoal-400 font-semibold" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="burned" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorBurned)" />
              <Area type="monotone" dataKey="consumed" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorConsumed)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Legend and Sync status */}
      <div className="border-t border-slate-100 dark:border-charcoal-850 pt-3 mt-4 flex items-center justify-between text-xs font-semibold">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-emerald-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Active Burn
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Calorie Intake
          </span>
        </div>
        <span className="text-[10px] text-charcoal-450 italic">Aggregated Sync Today</span>
      </div>
    </GlassCard>
  );
}

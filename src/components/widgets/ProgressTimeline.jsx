import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Activity, CheckCircle, Circle, Calendar, Pill } from 'lucide-react';

export default function ProgressTimeline() {
  const { currentProfileId, getActiveProfile } = useApp();
  const profile = getActiveProfile();
  const accent = profile?.theme?.accent || '#3b82f6';

  const getTimelineItems = (profId) => {
    switch (profId) {
      case 'senior':
        return [
          { time: '08:00 AM', title: 'Blood Pressure Dose', completed: false, type: 'med', desc: 'Amlodipine 5mg' },
          { time: '10:30 AM', title: 'Cardiologist Checkup', completed: false, type: 'apt', desc: 'Dr. Sarah Jenkins' },
          { time: '12:00 PM', title: 'Multivitamin Capsule', completed: true, type: 'med', desc: 'Taken' },
          { time: '08:00 PM', title: 'Cholesterol Dose', completed: false, type: 'med', desc: 'Atorvastatin 20mg' }
        ];
      case 'diabetic':
        return [
          { time: 'Breakfast', title: 'Metformin Intake', completed: true, type: 'med', desc: '850mg Taken' },
          { time: 'Lunch', title: 'Carb Control Log', completed: true, type: 'med', desc: 'Salad Logged (12g Carbs)' },
          { time: '02:00 PM', title: 'Vitals Sync', completed: true, type: 'apt', desc: 'Checked: 108 mg/dL' },
          { time: '10:00 PM', title: 'Lantus Insulin Dose', completed: false, type: 'med', desc: '15 units pending' }
        ];
      case 'fitness':
        return [
          { time: '07:00 AM', title: 'Heart Rate Sync', completed: true, type: 'apt', desc: 'Captured resting: 58 BPM' },
          { time: '11:00 AM', title: 'Hydration Tally', completed: true, type: 'med', desc: 'Water cup milestone met' },
          { time: '02:30 PM', title: 'Active Burn Target', completed: false, type: 'med', desc: 'Burned 620/800 kcal' },
          { time: '06:00 PM', title: 'Stretch Core', completed: true, type: 'med', desc: 'Completed' }
        ];
      default:
        return [
          { time: '08:00 AM', title: 'Evelyn BP Check', completed: false, type: 'med', desc: 'BP compliance monitor' },
          { time: '10:30 AM', title: 'Evelyn Doctor Visit', completed: false, type: 'apt', desc: 'Heart & Vascular Center' },
          { time: '02:00 PM', title: 'Tommy Glucose Check', completed: true, type: 'med', desc: 'Tommy synced (142 mg/dL)' }
        ];
    }
  };

  const items = getTimelineItems(currentProfileId);

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-sky-500 animate-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Progress Timeline</h3>
          </div>
          <span 
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `${accent}15`, color: accent }}
          >
            Chronological
          </span>
        </div>

        <div className="space-y-4 relative pl-3.5">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-[20px] top-3 bottom-3 w-[1.5px] bg-slate-200 dark:bg-charcoal-850" />

          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 relative">
              
              {/* Node Icon */}
              <div className="w-5 h-5 rounded-full bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-850 flex items-center justify-center flex-shrink-0 z-10">
                {item.completed ? (
                  <CheckCircle className="text-emerald-500 fill-emerald-500/10" size={14} />
                ) : item.type === 'apt' ? (
                  <Calendar className="text-violet-500" size={12} />
                ) : (
                  <Pill className="text-slate-400" size={12} />
                )}
              </div>

              {/* Node Details */}
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className={`text-xs font-bold ${
                    item.completed ? 'text-charcoal-400 dark:text-charcoal-550 line-through' : 'text-charcoal-900 dark:text-slate-100'
                  }`}>
                    {item.title}
                  </h4>
                  <span className="text-[9px] font-bold text-charcoal-400 dark:text-charcoal-500 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 font-semibold mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

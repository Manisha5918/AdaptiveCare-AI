import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, Droplet, Dumbbell, Activity } from 'lucide-react';

export default function ActivityTimeline() {
  const { currentProfileId, getActiveProfile } = useApp();
  const profile = getActiveProfile();

  // Dynamically assemble timeline events based on state variables
  const getDynamicEvents = () => {
    const events = [];

    if (currentProfileId === 'senior') {
      const meds = profile?.medications || [];
      meds.forEach(m => {
        if (m.taken) {
          events.push({
            id: `med-${m.id}`,
            time: m.time,
            title: `Medication Logged`,
            desc: `Took ${m.name} (${m.dosage})`,
            icon: <CheckCircle2 className="text-emerald-500" size={12} />,
            color: 'border-emerald-500'
          });
        }
      });
      events.push({
        id: 'base-1',
        time: '8:15 AM',
        title: 'Morning Vitals Sync',
        desc: 'Blood pressure checked: 122/80 mmHg (Normal)',
        icon: <Activity className="text-sky-500" size={12} />,
        color: 'border-sky-500'
      });
    }

    if (currentProfileId === 'diabetic') {
      const meds = profile?.medications || [];
      meds.forEach(m => {
        if (m.taken) {
          events.push({
            id: `med-${m.id}`,
            time: 'Scheduled',
            title: `Medication Logged`,
            desc: `Took ${m.name} (${m.dosage})`,
            icon: <CheckCircle2 className="text-emerald-500" size={12} />,
            color: 'border-emerald-500'
          });
        }
      });

      const meals = profile?.meals || [];
      meals.forEach(meal => {
        if (meal.logged) {
          events.push({
            id: `meal-${meal.id}`,
            time: 'Logged Today',
            title: `${meal.type} Registered`,
            desc: `${meal.food} (${meal.carbs})`,
            icon: <CheckCircle2 className="text-amber-500" size={12} />,
            color: 'border-amber-500'
          });
        }
      });

      events.push({
        id: 'glu-base',
        time: '2:15 PM',
        title: 'Glucose Logged',
        desc: `Value logged: ${profile?.glucoseData?.current} mg/dL`,
        icon: <Activity className="text-sky-500" size={12} />,
        color: 'border-sky-500'
      });
    }

    if (currentProfileId === 'fitness') {
      const cal = profile?.calories;
      if (cal && cal.water > 0) {
        events.push({
          id: 'dyn-water',
          time: 'Hydration Updates',
          title: 'Water Logged',
          desc: `Logged ${cal.water} / ${cal.targetWater} cups of water`,
          icon: <Droplet className="text-sky-400" size={12} />,
          color: 'border-sky-400'
        });
      }
      if (cal && cal.burned > 0) {
        events.push({
          id: 'dyn-burn',
          time: 'Active Workout',
          title: 'Active Calories Synced',
          desc: `Active burn index reaches ${cal.burned} kcal`,
          icon: <Dumbbell className="text-emerald-500" size={12} />,
          color: 'border-emerald-500'
        });
      }
      events.push({
        id: 'base-fit-1',
        time: '7:00 AM',
        title: 'Resting Heart Rate Sync',
        desc: `Basal rate captured: ${profile?.heartRate?.resting} BPM`,
        icon: <Activity className="text-emerald-500 animate-soft-pulse" size={12} />,
        color: 'border-emerald-500'
      });
    }

    if (currentProfileId === 'caregiver') {
      const patients = profile?.patients || [];
      patients.forEach(pat => {
        events.push({
          id: `pat-${pat.id}`,
          time: pat.lastSync,
          title: `${pat.name} Status Checked`,
          desc: `Vitals: ${pat.status}. Medication compliance: ${pat.medsStatus}`,
          icon: <CheckCircle2 className="text-purple-500" size={12} />,
          color: 'border-purple-500'
        });
      });
    }

    return events;
  };

  const timelineEvents = getDynamicEvents();

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-charcoal-400 animate-spin" style={{ animationDuration: '6s' }} size={20} />
        <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Live Health Timeline</h3>
      </div>

      {timelineEvents.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center text-charcoal-400">
          <p className="text-sm">No events logged in this session yet.</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {timelineEvents.map((evt, idx) => (
            <div key={evt.id} className="flex gap-3 relative">
              {idx !== timelineEvents.length - 1 && (
                <div className="absolute left-[9px] top-6 bottom-[-16px] w-[1.5px] bg-slate-200 dark:bg-charcoal-800" />
              )}
              
              <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 flex items-center justify-center flex-shrink-0 z-10">
                {evt.icon}
              </div>
              
              <div className="flex-1 pb-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-xs font-bold text-charcoal-900 dark:text-slate-100">{evt.title}</h4>
                  <span className="text-[9px] font-semibold text-charcoal-400 dark:text-charcoal-500 whitespace-nowrap">{evt.time}</span>
                </div>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5 leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

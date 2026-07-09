import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { Users, AlertCircle, CheckCircle, BellRing } from 'lucide-react';

export default function FamilyOverview() {
  const { getActiveProfile, addNotification } = useApp();
  const profile = getActiveProfile();
  const patients = profile?.patients || [];

  if (patients.length === 0) return null;

  const handleSendReminder = (name) => {
    addNotification(
      'Reminder Broadcasted',
      `Sent a medication reminder notification directly to ${name}'s smartwatch.`,
      'success'
    );
  };

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="text-purple-500 animate-soft-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Family Health Overview</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded">
            Monitoring
          </span>
        </div>

        {/* Patients Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {patients.map((pat) => (
            <div 
              key={pat.id}
              className="bg-white/40 dark:bg-charcoal-900/40 border border-slate-200/60 dark:border-charcoal-800 rounded-[18px] p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-charcoal-900 dark:text-slate-100">{pat.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    pat.medsWarning 
                      ? 'bg-amber-100/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' 
                      : 'bg-emerald-100/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {pat.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-charcoal-500 dark:text-charcoal-400 mb-4">
                  <p className="font-semibold text-charcoal-400 dark:text-charcoal-500 text-[10px] uppercase tracking-wider">Condition</p>
                  <p className="truncate font-medium">{pat.condition}</p>
                  
                  <div className="flex items-center gap-1.5 mt-2.5">
                    {pat.medsWarning ? (
                      <AlertCircle size={12} className="text-amber-500" />
                    ) : (
                      <CheckCircle size={12} className="text-emerald-500" />
                    )}
                    <span className="font-medium">Meds: {pat.medsStatus}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-charcoal-800/40 pt-3">
                <span className="text-[10px] text-charcoal-400 font-semibold italic">Sync: {pat.lastSync}</span>
                {pat.medsWarning && (
                  <button
                    onClick={() => handleSendReminder(pat.name)}
                    className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white py-1 px-2.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    <BellRing size={10} /> Ping Reminder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

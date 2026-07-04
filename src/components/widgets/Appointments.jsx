import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { CalendarDays, Video, MapPin, ExternalLink } from 'lucide-react';

export default function Appointments() {
  const { getActiveProfile, addNotification } = useApp();
  const profile = getActiveProfile();
  const appointments = profile?.appointments || [];

  const handleLaunchTelehealth = (doctor) => {
    addNotification(
      'Telehealth Session Initialized',
      `Launching secured video link with ${doctor}. Ready in waiting room.`,
      'success'
    );
  };

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-violet-500 animate-soft-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Doctor Appointments</h3>
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase bg-violet-100/50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded">
            Calendar
          </span>
        </div>

        {appointments.length === 0 ? (
          <div className="py-6 text-center text-charcoal-400">
            <p className="text-sm">No scheduled visits in the next 14 days.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {appointments.map((apt) => (
              <div 
                key={apt.id}
                className="bg-white/40 dark:bg-charcoal-900/40 border border-slate-200/60 dark:border-charcoal-800 rounded-[18px] p-3.5 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-900 dark:text-slate-100">{apt.doctor}</h4>
                      <p className="text-xs text-violet-500 dark:text-violet-400 font-semibold">{apt.specialty}</p>
                    </div>
                    <span className="text-[11px] font-bold text-charcoal-500 dark:text-charcoal-400 bg-slate-100 dark:bg-charcoal-800 px-2 py-0.5 rounded-md">
                      {apt.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-charcoal-400 dark:text-charcoal-500 mt-2">
                    <MapPin size={12} />
                    <span className="truncate">{apt.location}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleLaunchTelehealth(apt.doctor)}
                    className="flex-1 bg-violet-500 hover:bg-violet-600 active:scale-95 text-white py-1.5 px-3 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Video size={13} /> Launch Telehealth
                  </button>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-100 dark:bg-charcoal-800 hover:bg-slate-200 dark:hover:bg-charcoal-700 text-charcoal-700 dark:text-slate-300 p-2 rounded-[12px] flex items-center justify-center transition-all border border-slate-200/20"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
